// === DATA: Kana & Vocabulary ===

const KATAKANA = [
    // ア行
    { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' },
    { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
    // カ行
    { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' },
    { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
    // サ行
    { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' },
    { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
    // タ行
    { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' },
    { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
    // ナ行
    { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' },
    { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
    // ハ行
    { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' },
    { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
    // マ行
    { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' },
    { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
    // ヤ行
    { char: 'ヤ', romaji: 'ya' }, { char: ' ', romaji: '' }, { char: 'ユ', romaji: 'yu' },
    { char: ' ', romaji: '' }, { char: 'ヨ', romaji: 'yo' },
    // ラ行
    { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' },
    { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
    // ワ行 + ン
    { char: 'ワ', romaji: 'wa' }, { char: ' ', romaji: '' }, { char: 'ン', romaji: 'n' },
    { char: ' ', romaji: '' }, { char: 'ヲ', romaji: 'wo' },
];

const HIRAGANA = [
    // あ行
    { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' },
    { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
    // か行
    { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' },
    { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
    // さ行
    { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' },
    { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
    // た行
    { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' },
    { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
    // な行
    { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' },
    { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
    // は行
    { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' },
    { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
    // ま行
    { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' },
    { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
    // や行
    { char: 'や', romaji: 'ya' }, { char: ' ', romaji: '' }, { char: 'ゆ', romaji: 'yu' },
    { char: ' ', romaji: '' }, { char: 'よ', romaji: 'yo' },
    // ら行
    { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' },
    { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
    // わ行 + ん
    { char: 'わ', romaji: 'wa' }, { char: ' ', romaji: '' }, { char: 'ん', romaji: 'n' },
    { char: ' ', romaji: '' }, { char: 'を', romaji: 'wo' },
];

const VOCABULARY = [
    // 📱 日常生活
    {
        word: 'テレビ', reading: 'terebi', meaning: '电视', category: '日常',
        exampleJp: 'テレビを見ます。', exampleCn: '看电视。'
    },
    {
        word: 'コーヒー', reading: 'kōhī', meaning: '咖啡', category: '饮食',
        exampleJp: 'コーヒーを飲みます。', exampleCn: '喝咖啡。'
    },
    {
        word: 'カメラ', reading: 'kamera', meaning: '相机', category: '物品',
        exampleJp: '新しいカメラを買いました。', exampleCn: '买了新相机。'
    },
    {
        word: 'ウイスキー', reading: 'uisukī', meaning: '威士忌', category: '饮食',
        exampleJp: 'ウイスキーが好きです。', exampleCn: '喜欢威士忌。'
    },
    {
        word: 'スマホ', reading: 'sumaho', meaning: '智能手机', category: '日常',
        exampleJp: 'スマホで写真を撮ります。', exampleCn: '用手机拍照。'
    },
    {
        word: 'サービス', reading: 'sābisu', meaning: '服务', category: '商务',
        exampleJp: 'このサービスは便利です。', exampleCn: '这个服务很方便。'
    },
    {
        word: 'パソコン', reading: 'pasokon', meaning: '电脑', category: '日常',
        exampleJp: 'パソコンで仕事をします。', exampleCn: '用电脑工作。'
    },
    {
        word: 'レストラン', reading: 'resutoran', meaning: '餐厅', category: '场所',
        exampleJp: 'レストランで食べます。', exampleCn: '在餐厅吃饭。'
    },
    {
        word: 'タクシー', reading: 'takushī', meaning: '出租车', category: '交通',
        exampleJp: 'タクシーに乗ります。', exampleCn: '坐出租车。'
    },
    {
        word: 'ホテル', reading: 'hoteru', meaning: '酒店', category: '场所',
        exampleJp: 'ホテルを予約しました。', exampleCn: '预订了酒店。'
    },
    {
        word: 'アルバイト', reading: 'arubaito', meaning: '兼职/打工', category: '商务',
        exampleJp: 'アルバイトを探しています。', exampleCn: '在找兼职。'
    },
    {
        word: 'ビール', reading: 'bīru', meaning: '啤酒', category: '饮食',
        exampleJp: 'ビールを一杯ください。', exampleCn: '请给我一杯啤酒。'
    },
    {
        word: 'ニュース', reading: 'nyūsu', meaning: '新闻', category: '日常',
        exampleJp: 'ニュースを見ましたか？', exampleCn: '看新闻了吗？'
    },
    {
        word: 'エレベーター', reading: 'erebētā', meaning: '电梯', category: '场所',
        exampleJp: 'エレベーターで五階に行きます。', exampleCn: '坐电梯去五楼。'
    },
    {
        word: 'プレゼント', reading: 'purezento', meaning: '礼物', category: '物品',
        exampleJp: '誕生日のプレゼントです。', exampleCn: '这是生日礼物。'
    },
    // 🆕 新增词汇
    {
        word: 'コンビニ', reading: 'konbini', meaning: '便利店', category: '场所',
        exampleJp: 'コンビニでおにぎりを買います。', exampleCn: '在便利店买饭团。'
    },
    {
        word: 'シャワー', reading: 'shawā', meaning: '淋浴', category: '日常',
        exampleJp: 'シャワーを浴びます。', exampleCn: '洗澡。'
    },
    {
        word: 'エアコン', reading: 'eakon', meaning: '空调', category: '物品',
        exampleJp: 'エアコンをつけてください。', exampleCn: '请开空调。'
    },
    {
        word: 'ストレス', reading: 'sutoresu', meaning: '压力', category: '情感',
        exampleJp: '最近ストレスが多いです。', exampleCn: '最近压力很大。'
    },
    {
        word: 'アプリ', reading: 'apuri', meaning: 'App/应用', category: '日常',
        exampleJp: 'このアプリは便利です。', exampleCn: '这个App很方便。'
    },
    {
        word: 'ラーメン', reading: 'rāmen', meaning: '拉面', category: '饮食',
        exampleJp: 'ラーメンを食べに行きましょう。', exampleCn: '去吃拉面吧。'
    },
    {
        word: 'マンション', reading: 'manshon', meaning: '公寓', category: '场所',
        exampleJp: 'マンションに住んでいます。', exampleCn: '住在公寓里。'
    },
    {
        word: 'デート', reading: 'dēto', meaning: '约会', category: '情感',
        exampleJp: '週末デートしましょう。', exampleCn: '周末约会吧。'
    },
    {
        word: 'トレーニング', reading: 'torēningu', meaning: '训练/健身', category: '运动',
        exampleJp: 'ジムでトレーニングします。', exampleCn: '在健身房训练。'
    },
    {
        word: 'テニス', reading: 'tenisu', meaning: '网球', category: '运动',
        exampleJp: '週末テニスをします。', exampleCn: '周末打网球。'
    },
    {
        word: 'インターネット', reading: 'intānetto', meaning: '互联网', category: '日常',
        exampleJp: 'インターネットで調べます。', exampleCn: '在网上查。'
    },
    {
        word: 'チケット', reading: 'chiketto', meaning: '票/券', category: '物品',
        exampleJp: '映画のチケットを買いました。', exampleCn: '买了电影票。'
    },
    {
        word: 'カラオケ', reading: 'karaoke', meaning: '卡拉OK', category: '娱乐',
        exampleJp: 'カラオケに行きたいです。', exampleCn: '想去唱K。'
    },
    {
        word: 'スーパー', reading: 'sūpā', meaning: '超市', category: '场所',
        exampleJp: 'スーパーで野菜を買います。', exampleCn: '在超市买蔬菜。'
    },
    {
        word: 'ダイエット', reading: 'daietto', meaning: '减肥', category: '日常',
        exampleJp: 'ダイエット中です。', exampleCn: '正在减肥。'
    },
    {
        word: 'メッセージ', reading: 'messēji', meaning: '消息/短信', category: '日常',
        exampleJp: 'メッセージを送りました。', exampleCn: '发了消息。'
    },
];

// 成就定义
const ACHIEVEMENTS = [
    { id: 'first_word', name: '初心者', desc: '学会第一个词汇', icon: '🌱', condition: (s) => s.wordsLearned.length >= 1 },
    { id: 'ten_words', name: '积少成多', desc: '学会10个词汇', icon: '📚', condition: (s) => s.wordsLearned.length >= 10 },
    { id: 'twenty_words', name: '词汇达人', desc: '学会20个词汇', icon: '🏆', condition: (s) => s.wordsLearned.length >= 20 },
    { id: 'kana_half', name: '假名入门', desc: '掌握25个假名', icon: '✍️', condition: (s) => s.kanaMastered.length >= 25 },
    { id: 'kana_all', name: '假名大师', desc: '掌握所有假名', icon: '👑', condition: (s) => s.kanaMastered.length >= 46 },
    { id: 'streak_3', name: '三日坊主？不！', desc: '连续学习3天', icon: '🔥', condition: (s) => s.streak >= 3 },
    { id: 'streak_7', name: '一周达成', desc: '连续学习7天', icon: '⭐', condition: (s) => s.streak >= 7 },
    { id: 'streak_30', name: '月度冠军', desc: '连续学习30天', icon: '💎', condition: (s) => s.streak >= 30 },
    { id: 'perfect_quiz', name: '完美答卷', desc: '测验全部答对', icon: '💯', condition: (s) => s.perfectQuiz },
    { id: 'night_owl', name: '夜猫子', desc: '深夜学习（23点后）', icon: '🦉', condition: (s) => s.nightStudy },
];
