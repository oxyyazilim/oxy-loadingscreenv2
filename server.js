// Discord API entegrasyonu için server.js
const fs = require('fs');
const path = require('path');
const https = require('https');

// Yapılandırma dosyası yolu
const configPath = GetResourcePath(GetCurrentResourceName()) + '/config.js';

// Yapılandırmayı oku (basit bir şekilde, regex ile)
function readConfig() {
    const content = LoadResourceFile(GetCurrentResourceName(), 'config.js');
    
    // Discord token ve sunucu ID'sini çıkart
    const tokenMatch = content.match(/botToken:\s*["'](.+?)["']/);
    const serverIdMatch = content.match(/serverId:\s*["'](.+?)["']/);
    
    if (!tokenMatch || !serverIdMatch) {
        console.error('Discord token veya server ID bulunamadı!');
        return null;
    }
    
    // Team dizisini çıkart (basit bir regex ile)
    const teamMatch = content.match(/Team:\s*\[([\s\S]*?)\]/);
    if (!teamMatch) {
        console.error('Team dizisi bulunamadı!');
        return null;
    }
    
    // Team dizisini ayırıp her bir kullanıcıyı çıkart
    const teamStr = teamMatch[1];
    const teamMembers = [];
    
    // Her bir üye için Discord ID'yi çıkart
    const memberMatches = teamStr.matchAll(/{[^}]*discordId:\s*["'](.+?)["'][^}]*}/g);
    for (const match of memberMatches) {
        const memberStr = match[0];
        const discordId = match[1];
        
        // Rol ve isim bilgilerini çıkart
        const nameMatch = memberStr.match(/name:\s*["'](.+?)["']/);
        const roleMatch = memberStr.match(/role:\s*["'](.+?)["']/);
        
        teamMembers.push({
            discordId: discordId,
            name: nameMatch ? nameMatch[1] : "",
            role: roleMatch ? roleMatch[1] : ""
        });
    }
    
    return {
        botToken: tokenMatch[1],
        serverId: serverIdMatch[1],
        teamMembers: teamMembers
    };
}

// Discord API isteği yap
function fetchDiscordUser(discordId, token, callback) {
    const options = {
        hostname: 'discord.com',
        path: `/api/v9/users/${discordId}`,
        headers: {
            'Authorization': `Bot ${token}`
        }
    };
    
    https.get(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.error(`Discord API Hatası: ${res.statusCode}`);
                callback(null);
                return;
            }
            
            try {
                const user = JSON.parse(data);
                callback({
                    name: user.username,
                    avatar: user.avatar ? 
                        `https://cdn.discordapp.com/avatars/${discordId}/${user.avatar}${user.avatar.startsWith('a_') ? '.gif' : '.png'}` :
                        null
                });  // Bu kapanış parantezi eksikti
            } catch (e) {
                console.error('JSON ayrıştırma hatası:', e);
                callback(null);
            }
        });
    }).on('error', (e) => {
        console.error('Discord API isteği hatası:', e);
        callback(null);
    });
}


// Yapılandırmayı güncelle
function updateConfig(teamData) {
    let content = LoadResourceFile(GetCurrentResourceName(), 'config.js');
    
    // Her bir takım üyesi için yapılandırmayı güncelle
    teamData.forEach(member => {
        // İlgili Discord ID'ye sahip üyeyi bul ve güncelle
        const regex = new RegExp(`({[^}]*discordId:\\s*["']${member.discordId}["'][^}]*})`, 'g');
        const replacement = `{name: "${member.name}", role: "${member.role}", discordId: "${member.discordId}", image: "${member.avatar || ''}"}`;
        
        content = content.replace(regex, replacement);
    });
    
    // Dosyayı kaydet
    SaveResourceFile(GetCurrentResourceName(), 'config.js', content, -1);
    console.log('Config dosyası Discord kullanıcı verileriyle güncellendi.');
}

// Ana fonksiyon
function fetchDiscordTeamMembers() {
    const config = readConfig();
    if (!config) return;
    
    const { botToken, teamMembers } = config;
    const updatedTeam = [];
    let pendingRequests = teamMembers.length;
    
    teamMembers.forEach(member => {
        fetchDiscordUser(member.discordId, botToken, (userData) => {
            if (userData) {
                updatedTeam.push({
                    discordId: member.discordId,
                    name: userData.name,
                    role: member.role, // Rol bilgisini koru
                    avatar: userData.avatar
                });
            } else {
                // Veri çekilemezse, mevcut verileri koru
                updatedTeam.push(member);
            }
            
            pendingRequests--;
            if (pendingRequests === 0) {
                // Tüm istekler tamamlandığında yapılandırmayı güncelle
                updateConfig(updatedTeam);
            }
        });
    });
}

// Sunucu başlangıcında çalıştır
on('onResourceStart', (resourceName) => {
    if (resourceName === GetCurrentResourceName()) {
        fetchDiscordTeamMembers();
    }
});

// Periyodik olarak güncelleme (her 24 saatte bir)
setInterval(fetchDiscordTeamMembers, 24 * 60 * 60 * 1000);