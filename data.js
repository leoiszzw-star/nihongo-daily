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
    {
        word: 'テレビ', reading: 'terebi', meaning: '电视',
        exampleJp: 'テレビを見ます。', exampleCn: '看电视。'
    },
    {
        word: 'コーヒー', reading: 'kōhī', meaning: '咖啡',
        exampleJp: 'コーヒーを飲みます。', exampleCn: '喝咖啡。'
    },
    {
        word: 'カメラ', reading: 'kamera', meaning: '相机',
        exampleJp: '新しいカメラを買いました。', exampleCn: '买了新相机。'
    },
    {
        word: 'ウイスキー', reading: 'uisukī', meaning: '威士忌',
        exampleJp: 'ウイスキーが好きです。', exampleCn: '喜欢威士忌。'
    },
    {
        word: 'スマホ', reading: 'sumaho', meaning: '智能手机',
        exampleJp: 'スマホで写真を撮ります。', exampleCn: '用手机拍照。'
    },
    {
        word: 'サービス', reading: 'sābisu', meaning: '服务',
        exampleJp: 'このサービスは便利です。', exampleCn: '这个服务很方便。'
    },
    {
        word: 'パソコン', reading: 'pasokon', meaning: '电脑',
        exampleJp: 'パソコンで仕事をします。', exampleCn: '用电脑工作。'
    },
    {
        word: 'レストラン', reading: 'resutoran', meaning: '餐厅',
        exampleJp: 'レストランで食べます。', exampleCn: '在餐厅吃饭。'
    },
    {
        word: 'タクシー', reading: 'takushī', meaning: '出租车',
        exampleJp: 'タクシーに乗ります。', exampleCn: '坐出租车。'
    },
    {
        word: 'ホテル', reading: 'hoteru', meaning: '酒店',
        exampleJp: 'ホテルを予約しました。', exampleCn: '预订了酒店。'
    },
    {
        word: 'アルバイト', reading: 'arubaito', meaning: '兼职/打工',
        exampleJp: 'アルバイトを探しています。', exampleCn: '在找兼职。'
    },
    {
        word: 'ビール', reading: 'bīru', meaning: '啤酒',
        exampleJp: 'ビールを一杯ください。', exampleCn: '请给我一杯啤酒。'
    },
    {
        word: 'ニュース', reading: 'nyūsu', meaning: '新闻',
        exampleJp: 'ニュースを見ましたか？', exampleCn: '看新闻了吗？'
    },
    {
        word: 'エレベーター', reading: 'erebētā', meaning: '电梯',
        exampleJp: 'エレベーターで五階に行きます。', exampleCn: '坐电梯去五楼。'
    },
    {
        word: 'プレゼント', reading: 'purezento', meaning: '礼物',
        exampleJp: '誕生日のプレゼントです。', exampleCn: '这是生日礼物。'
    },
];
