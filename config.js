// config.js - Sunucu ayarları ve içerik yapılandırması
const config = {
    serverName: "Oxy Loading Screen",
    serverSlogan: "Hayallerinizin ötesinde bir roleplay deneyimi",
    serverLogo: "assets/images/logo.png",
    
    youtubeApiKey: "APIKEYHERE", // GOOGLE APİ KEY
    
    discord: {
        botToken: "BOTTOKENHERE",  // Bu token güvenlik için sadece sunucu tarafında kullanılacak
        serverId: "GUILDIDHERE"
    },
    
    // Arkaplan ayarları
    backgroundType: "youtube", // "youtube" veya "images" olabilir
    youtubeVideoId: "f1MAEDPcUC0", // Arka plan video ID
    
    // Müzik ayarları
    music: {
        youtubeVideoId: "f1MAEDPcUC0", 
        volume: 30, 
        autoplay: true 
    },
    

    backgroundImages: [
        "assets/images/background1.png",
        "assets/images/background2.png",
        "assets/images/background3.png"
    ],
    
 
    customCursor: "assets/cursors/cursor.png",
    customCursorPointer: "assets/cursors/cursor-pointer.png",
    

    galleryImages: [
        "assets/images/gallery1.png",
        "assets/images/gallery2.png",
        "assets/images/gallery3.png"
    ],
    

socialIcons: [
    { name: "Discord", icon: "fab fa-discord", url: "https://discord.gg/oxyworkshop", tooltip: "Discord sunucumuza katılın" },
    { name: "Website", icon: "fas fa-globe", url: "https://oxyworkshop.com", tooltip: "Web sitemizi ziyaret edin" },
    { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com/oxyworkshop", tooltip: "YouTube kanalımızı takip edin" },
    { name: "Tebex", icon: "fas fa-shopping-cart", url: "https://tebex.io/oxyworkshop", tooltip: "Mağazamızı ziyaret edin" },
    { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com/oxyworkshop", tooltip: "Instagram sayfamızı takip edin" }
],
    

    serverRules: [
        {
            title: "Roleplay Kuralları",
            text: "Sunucumuzda roleplay yaparken karakterinize sadık kalın ve gerçekçi davranın. Meta-gaming ve powergaming yasaktır."
        },
        {
            title: "Saygı ve İletişim",
            text: "Tüm oyunculara saygılı olun. Irkçılık, cinsiyetçilik veya diğer ayrımcılık içeren davranışlara izin verilmez."
        },
        {
            title: "Hile ve Buglar",
            text: "Hile kullanımı ve bug suistimali kalıcı yasaklama sebebidir. Bir bug bulursanız yetkililere bildirin."
        }
    ],
    

    announcements: [
        {
            title: "Yeni Güncelleme: Polis Sistemi",
            text: "Polis departmanına yeni araçlar ve ekipmanlar eklendi. Daha detaylı bilgi için Discord sunucumuzu ziyaret edin."
        },
        {
            title: "Hafta Sonu Etkinliği",
            text: "Bu hafta sonu şehir meydanında büyük bir yarış etkinliği düzenlenecek. Katılımcılara özel ödüller verilecek."
        },
        {
            title: "Yeni İş İmkanları",
            text: "Şehrimize yeni işler eklendi. Artık taksi şoförü, çiftçi veya madenci olarak çalışabilirsiniz."
        }
    ],
    

    Team: [
        {name: "", role: "kurucu", discordId: "discordidhere", image: ""}, //sadece discordid girin veriler otomatik güncellenecektir.
    ],
    
    keyboardShortcuts: [
        {
            key: "F1",
            description: "Ana Menü",
            keyCode: 112
        },
        {
            key: "F2",
            description: "Envanter",
            keyCode: 113
        },
        {
            key: "F3",
            description: "Telefon",
            keyCode: 114
        },
        {
            key: "F4",
            description: "Animasyonlar",
            keyCode: 115
        },
        {
            key: "F5",
            description: "GPS",
            keyCode: 116
        },
        {
            key: "F6",
            description: "Emote Menüsü",
            keyCode: 117
        },
        {
            key: "F7",
            description: "Kıyafet Menüsü",
            keyCode: 118
        },
        {
            key: "M",
            description: "Harita",
            keyCode: 77
        },
        {
            key: "T",
            description: "Sohbet",
            keyCode: 84
        },
        {
            key: "L",
            description: "Araç Kilidi",
            keyCode: 76
        },
        {
            key: "I",
            description: "Görev Menüsü",
            keyCode: 73
        },
        {
            key: "X",
            description: "El Kaldır",
            keyCode: 88
        }
    ],
    

    defaultColors: {
        primaryColor: "#a855f7", // Mor
        backgroundColor: "#000000", // Siyah
        textColor: "#ffffff", // Beyaz
        gradientIntensity: 0.7 // Gradyan yoğunluğu (0-1 arası)
    }
};