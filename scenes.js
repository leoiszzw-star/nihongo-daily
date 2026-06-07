// === SCENES DATA: Japanese Drama Clips for Learning ===

const SCENES = [
    {
        id: 'terrace-house-intro',
        title: '初次见面的自我介绍',
        source: 'テラスハウス (Terrace House)',
        level: '入门',
        youtubeId: 'NtEcMsRhq6s',
        startTime: 0,
        dialogue: [
            {
                jp: 'はじめまして。',
                romaji: 'Hajimemashite.',
                cn: '初次见面。',
            },
            {
                jp: '私の名前は翔平です。',
                romaji: 'Watashi no namae wa Shōhei desu.',
                cn: '我的名字是翔平。',
            },
            {
                jp: 'よろしくお願いします。',
                romaji: 'Yoroshiku onegaishimasu.',
                cn: '请多关照。',
            },
        ],
        tip: '💡 「はじめまして」是日本人初次见面时的必备问候语，比"你好"更正式。「よろしくお願いします」几乎在所有场合都能用。',
        keywords: ['はじめまして', '名前', 'よろしくお願いします'],
    },
    {
        id: 'kodoku-gourmet-order',
        title: '餐厅点餐',
        source: '孤独のグルメ (孤独的美食家)',
        level: '初级',
        youtubeId: 'pCHMIaMeoQ4',
        startTime: 0,
        dialogue: [
            {
                jp: 'すみません、注文いいですか？',
                romaji: 'Sumimasen, chūmon ii desu ka?',
                cn: '不好意思，可以点餐吗？',
            },
            {
                jp: 'これをください。',
                romaji: 'Kore o kudasai.',
                cn: '请给我这个。',
            },
            {
                jp: 'ビールも一つお願いします。',
                romaji: 'Bīru mo hitotsu onegaishimasu.',
                cn: '再来一杯啤酒。',
            },
            {
                jp: 'ごちそうさまでした。',
                romaji: 'Gochisōsama deshita.',
                cn: '谢谢款待（吃完后说）。',
            },
        ],
        tip: '💡 在日本餐厅，用「すみません」叫服务员，指着菜单说「これをください」就能点餐。吃完说「ごちそうさまでした」是基本礼仪。',
        keywords: ['すみません', 'ください', 'お願いします', 'ごちそうさま'],
    },
    {
        id: 'nigeru-haji-daily',
        title: '下班回家的日常对话',
        source: '逃げ恥 (逃避虽可耻但有用)',
        level: '初级',
        youtubeId: 'k2bH0xBbfHI',
        startTime: 0,
        dialogue: [
            {
                jp: 'ただいま。',
                romaji: 'Tadaima.',
                cn: '我回来了。',
            },
            {
                jp: 'おかえりなさい。',
                romaji: 'Okaerinasai.',
                cn: '欢迎回来。',
            },
            {
                jp: '今日は疲れた。',
                romaji: 'Kyō wa tsukareta.',
                cn: '今天好累啊。',
            },
            {
                jp: 'ご飯、できてるよ。',
                romaji: 'Gohan, dekiteru yo.',
                cn: '饭做好了哦。',
            },
        ],
        tip: '💡 「ただいま」和「おかえり」是日本人回家必说的一对用语。即使一个人住，进门也会说「ただいま」——这是一种生活仪式感。',
        keywords: ['ただいま', 'おかえり', '疲れた', 'ご飯'],
    },
    {
        id: 'convenience-store',
        title: '便利店购物',
        source: '日常会话',
        level: '入门',
        youtubeId: 'tFN8dMnaBs8',
        startTime: 0,
        dialogue: [
            {
                jp: 'いらっしゃいませ。',
                romaji: 'Irasshaimase.',
                cn: '欢迎光临。',
            },
            {
                jp: '袋はいりますか？',
                romaji: 'Fukuro wa irimasu ka?',
                cn: '需要袋子吗？',
            },
            {
                jp: 'いいえ、大丈夫です。',
                romaji: 'Iie, daijōbu desu.',
                cn: '不用了，没关系。',
            },
            {
                jp: 'ありがとうございます。',
                romaji: 'Arigatō gozaimasu.',
                cn: '谢谢。',
            },
        ],
        tip: '💡 日本便利店结账时，店员会问要不要袋子（收费¥3-5）。回答「大丈夫です」意思是"不需要/没关系"，这是日常超高频用语！',
        keywords: ['いらっしゃいませ', '大丈夫', 'ありがとう'],
    },
    {
        id: 'train-station',
        title: '电车站问路',
        source: '旅行会话',
        level: '初级',
        youtubeId: 'zhWTiPHBkWs',
        startTime: 0,
        dialogue: [
            {
                jp: 'すみません、渋谷駅はどこですか？',
                romaji: 'Sumimasen, Shibuya-eki wa doko desu ka?',
                cn: '不好意思，涩谷站在哪里？',
            },
            {
                jp: 'この電車に乗ってください。',
                romaji: 'Kono densha ni notte kudasai.',
                cn: '请坐这趟电车。',
            },
            {
                jp: '三つ目の駅です。',
                romaji: 'Mittsu-me no eki desu.',
                cn: '第三站就是。',
            },
            {
                jp: 'ありがとうございます！助かりました。',
                romaji: 'Arigatō gozaimasu! Tasukarimashita.',
                cn: '谢谢！帮大忙了。',
            },
        ],
        tip: '💡 「〜はどこですか？」是问路万能句型。「助かりました」表示"帮了大忙"，比单说谢谢更亲切，日本人很喜欢听到这句。',
        keywords: ['どこですか', '電車', '駅', '助かりました'],
    },
];
