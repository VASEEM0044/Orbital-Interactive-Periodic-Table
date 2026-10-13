export type SupportedLanguage = 'en' | 'hi' | 'ur' | 'ta' | 'te' | 'mr';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', dir: 'rtl' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr' },
];

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Header & Brand
    appTitle: 'Periodic Table',
    appSubtitle: 'Interactive IUPAC Atomic Trends Visualizer',
    pageHeading: 'Periodic Table Explorer',
    elementsCount: '118 Elements',
    liveStatus: 'LIVE 118',
    searchPlaceholder: 'Search symbol, name, #...',

    // Top Navigation
    navTable: 'Periodic Table',
    navTrends: 'Atomic Trends',
    navCompare: 'Compare',
    navChallenge: 'Trends Challenge',

    // Top Actions
    actionShare: 'Share',
    actionReport: 'Report',
    actionPrint: 'Print',

    // Scrubber
    thermalScrubber: 'THERMAL TIMELINE SCRUBBER',
    absZero: 'Abs. Zero',
    liquidN2: 'Liquid N₂',
    iceMelts: 'Ice Melts',
    roomTemp: 'Room Temp',
    waterBoils: 'Water Boils',
    ironMelts: 'Iron Melts',
    tungstenMelts: 'Tungsten Melts',
    solarPhotosphere: 'Solar Photosphere',

    // Left Column
    phaseDistribution: 'PHASE DISTRIBUTION',
    solid: 'Solid',
    liquid: 'Liquid',
    gas: 'Gas',
    atomicTrend: 'ATOMIC TREND',
    defaultView: 'Default View',
    electronegativity: 'Electronegativity',
    atomicRadius: 'Atomic Radius',
    ionizationEnergy: 'Ionization Energy',
    electronAffinity: 'Electron Affinity',
    meltingPoint: 'Melting Point',
    density: 'Density',
    orbitalBlocks: 'ORBITAL BLOCKS',
    chemicalFamily: 'CHEMICAL FAMILY',
    allFamilies: 'All Chemical Families (118)',

    // Right Column & Tooltip
    atomicMass: 'ATOMIC MASS',
    specimen: 'Specimen',
    bohrAtom: 'Bohr Atom',
    orbitals: 'Orbitals',
    properties: 'Properties',
    naturalAppearance: 'NATURAL PHYSICAL APPEARANCE',
    didYouKnow: 'DID YOU KNOW?',
    electronShells: 'Electron Shells Breakdown',
    expandedConfig: 'Expanded Electron Configuration',
    compareWith: 'Compare',
    fullSpecs: 'Full Specs',
    shells: 'Shells',
    config: 'Config',
    phase: 'Phase',

    // Canvas Toolbar
    iupacGrid: 'IUPAC Standard 18-Column Grid',
    fit: 'Fit',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',

    // Trend Chart Modal
    trendsModalTitle: 'Atomic Trends Periodicity Curve',
    trendsModalSubtitle: 'across periods and atomic numbers',
    filterPeriod: 'Filter Period',
    all: 'All',
    elementsPlotted: 'elements plotted',
    atomicNumberAxis: 'Atomic Number (Z)',
    periodicBehaviorHeading: 'PERIODIC BEHAVIOR & ELECTRON SHIELDING',

    // Element Compare Modal
    compareModalTitle: 'Side-by-Side Element Comparison',
    compareModalSubtitle: 'Compare atomic structure, bond polarity, and electronic configurations',
    presetPairs: 'PRESET PAIRS:',
    elementA: 'ELEMENT A',
    elementB: 'ELEMENT B',
    predictedBond: 'Predicted Bond Character:',
    bondIonic: 'Predominantly Ionic Bond (Δχ ≥ 1.7)',
    bondPolarCovalent: 'Polar Covalent Bond (0.4 ≤ Δχ < 1.7)',
    bondNonpolarCovalent: 'Nonpolar Covalent Bond (Δχ < 0.4)',
    property: 'Property',
    firstIonizationEnergy: '1st Ionization Energy',
    valenceConfig: 'Valence Configuration',
    shellsLabel: 'Shells (K, L, M...)',
    standardState: 'Standard State (STP)',
    bohrShells: 'Bohr Shells',

    // Chemistry Quiz Modal
    quizModalTitle: 'Chemistry Trends Challenge',
    quizModalSubtitle: 'Test your mastery of periodic laws & quantum configurations',
    questionProgress: 'Question',
    of: 'of',
    scoreLabel: 'Score:',
    explanationLabel: 'Explanation:',
    inspectElement: 'Inspect in periodic table →',
    nextQuestion: 'Next Question',
    viewResults: 'View Results',
    challengeCompleted: 'Challenge Completed!',
    scoreSummary: 'You scored',
    tryAgain: 'Try Again',
    backToTable: 'Back to Periodic Table',

    // Element Detail Modal
    physicalSpecimen: 'Physical Specimen',
    aufbauOrbitals: 'Aufbau Orbitals',
    atomicTrendsTab: 'Atomic Trends',
    applications: 'Applications',
    chemicalBehavior: 'Chemical & Physical Behavior:',
    groundStateConfig: 'Ground State Electron Configuration',
    totalElectrons: 'Total Electrons',
    electronsInShells: 'Electrons in Shells',
    expandedNotation: 'Full Expanded Subshell Notation',
  },

  hi: {
    // Header & Brand
    appTitle: 'आवर्त सारणी',
    appSubtitle: 'इंटरैक्टिव IUPAC परमाणु रुझान और क्वांटम ऑर्बिटल',
    pageHeading: 'आवर्त सारणी एक्सप्लोरर',
    elementsCount: '118 तत्व',
    liveStatus: 'सक्रिय 118',
    searchPlaceholder: 'प्रतीक, नाम, परमाणु सं. खोजें...',

    // Top Navigation
    navTable: 'आवर्त सारणी',
    navTrends: 'परमाणु रुझान',
    navCompare: 'तुलना करें',
    navChallenge: 'रुझान चुनौती (क्विज़)',

    // Top Actions
    actionShare: 'शेयर',
    actionReport: 'रिपोर्ट',
    actionPrint: 'प्रिंट',

    // Scrubber
    thermalScrubber: 'तापमान समय-रेखा स्क्रबर',
    absZero: 'परम शून्य',
    liquidN2: 'तरल नाइट्रोजन',
    iceMelts: 'बर्फ पिघलना',
    roomTemp: 'कक्ष तापमान',
    waterBoils: 'जल क्वथनांक',
    ironMelts: 'लोहा पिघलना',
    tungstenMelts: 'टंगस्टन पिघलना',
    solarPhotosphere: 'सूर्य सतह ताप',

    // Left Column
    phaseDistribution: 'अवस्था वितरण',
    solid: 'ठोस',
    liquid: 'द्रव',
    gas: 'गैस',
    atomicTrend: 'परमाणु रुझान (हीटमैप)',
    defaultView: 'सामान्य दृश्य',
    electronegativity: 'विद्युत-ऋणात्मकता',
    atomicRadius: 'परमाणु त्रिज्या',
    ionizationEnergy: 'आयनन ऊर्जा',
    electronAffinity: 'इलेक्ट्रॉन बंधुता',
    meltingPoint: 'गलनांक',
    density: 'घनत्व',
    orbitalBlocks: 'कक्षक ब्लॉक',
    chemicalFamily: 'रासायनिक परिवार',
    allFamilies: 'सभी रासायनिक परिवार (118)',

    // Right Column & Tooltip
    atomicMass: 'परमाणु द्रव्यमान',
    specimen: 'भौतिक नमूना',
    bohrAtom: 'बोहर परमाणु',
    orbitals: 'ऑर्बिटल (कक्षक)',
    properties: 'गुणधर्म',
    naturalAppearance: 'प्राकृतिक भौतिक स्वरूप',
    didYouKnow: 'क्या आप जानते हैं?',
    electronShells: 'इलेक्ट्रॉन कोश विभाजन',
    expandedConfig: 'विस्तृत इलेक्ट्रॉनिक विन्यास',
    compareWith: 'तुलना करें',
    fullSpecs: 'पूर्ण विवरण',
    shells: 'कोश',
    config: 'विन्यास',
    phase: 'अवस्था',

    // Canvas Toolbar
    iupacGrid: 'IUPAC मानक 18-स्तंभ ग्रिड',
    fit: 'फ़िट',
    zoomIn: 'ज़ूम इन',
    zoomOut: 'ज़ूम आउट',

    // Trend Chart Modal
    trendsModalTitle: 'परमाणु रुझान आवर्तिता वक्र',
    trendsModalSubtitle: 'आवर्तों और परमाणु संख्याओं के आधार पर मान',
    filterPeriod: 'आवर्त फ़िल्टर करें',
    all: 'सभी',
    elementsPlotted: 'तत्व आलेखित',
    atomicNumberAxis: 'परमाणु क्रमांक (Z)',
    periodicBehaviorHeading: 'आवर्ती व्यवहार और इलेक्ट्रॉन परिरक्षण प्रभाव',

    // Element Compare Modal
    compareModalTitle: 'तत्वों की तुलना (आमने-सामने)',
    compareModalSubtitle: 'परमाणु संरचना, रासायनिक बंध ध्रुवीयता और इलेक्ट्रॉनिक विन्यास की तुलना करें',
    presetPairs: 'प्रमुख तुलना जोड़े',
    elementA: 'तत्व A',
    elementB: 'तत्व B',
    predictedBond: 'अनुमानित बंध प्रकृति:',
    bondIonic: 'मुख्यतः आयनिक बंध (Δχ ≥ 1.7)',
    bondPolarCovalent: 'ध्रुवीय सहसंयोजक बंध (0.4 ≤ Δχ < 1.7)',
    bondNonpolarCovalent: 'अध्रुवीय सहसंयोजक बंध (Δχ < 0.4)',
    property: 'गुणधर्म',
    firstIonizationEnergy: 'प्रथम आयनन ऊर्जा',
    valenceConfig: 'संयोजी विन्यास',
    shellsLabel: 'कोश (K, L, M...)',
    standardState: 'मानक अवस्था (STP)',
    bohrShells: 'बोहर कोश',

    // Chemistry Quiz Modal
    quizModalTitle: 'रसायन विज्ञान रुझान चुनौती (क्विज़)',
    quizModalSubtitle: 'आवर्ती नियमों और क्वांटम विन्यास में अपनी दक्षता परखें',
    questionProgress: 'प्रश्न',
    of: 'का',
    scoreLabel: 'स्कोर:',
    explanationLabel: 'व्याख्या:',
    inspectElement: 'आवर्त सारणी में देखें →',
    nextQuestion: 'अगला प्रश्न',
    viewResults: 'परिणाम देखें',
    challengeCompleted: 'चुनौती पूर्ण हुई!',
    scoreSummary: 'आपने प्राप्त किए',
    tryAgain: 'पुनः प्रयास करें',
    backToTable: 'आवर्त सारणी पर लौटें',

    // Element Detail Modal
    physicalSpecimen: 'भौतिक नमूना',
    aufbauOrbitals: 'ऑफबाऊ कक्षक',
    atomicTrendsTab: 'परमाणु रुझान',
    applications: 'उपयोग व अनुप्रयोग',
    chemicalBehavior: 'रासायनिक एवं भौतिक व्यवहार:',
    groundStateConfig: 'मूल अवस्था इलेक्ट्रॉनिक विन्यास',
    totalElectrons: 'कुल इलेक्ट्रॉन',
    electronsInShells: 'कोशों में इलेक्ट्रॉन',
    expandedNotation: 'विस्तृत उपकोश संकेतन',
  },

  ur: {
    // Header & Brand
    appTitle: 'دوری جدول',
    appSubtitle: 'انٹرایکٹو IUPAC ایٹمی رجحانات اور کوانٹم ماڈل',
    pageHeading: 'دوری جدول ایکسپلورر',
    elementsCount: '118 عناصر',
    liveStatus: 'لائیو 118',
    searchPlaceholder: 'علامت، نام یا نمبر تلاش کریں...',

    // Top Navigation
    navTable: 'دوری جدول',
    navTrends: 'ایٹمی رجحانات',
    navCompare: 'موازنہ',
    navChallenge: 'رجحانات کوئز',

    // Top Actions
    actionShare: 'شیئر',
    actionReport: 'رپورٹ',
    actionPrint: 'پرنٹ',

    // Scrubber
    thermalScrubber: 'تھرمل ٹائم لائن اسکربر',
    absZero: 'مطلق صفر',
    liquidN2: 'مائع نائٹروجن',
    iceMelts: 'برف پگھلنا',
    roomTemp: 'کمرے کا درجہ حرارت',
    waterBoils: 'پانی کا ابال',
    ironMelts: 'لوہا پگھلنا',
    tungstenMelts: 'ٹنگسٹن پگھلنا',
    solarPhotosphere: 'سورج کی سطح کا درجہ حرارت',

    // Left Column
    phaseDistribution: 'مرحلہ تقسیم',
    solid: 'ٹھوس',
    liquid: 'مائع',
    gas: 'گیس',
    atomicTrend: 'ایٹمی رجحان',
    defaultView: 'پہلے سے طے شدہ',
    electronegativity: 'الیکٹرو نیگیٹیویٹی',
    atomicRadius: 'ایٹمی رداس',
    ionizationEnergy: 'آئنائزیشن توانائی',
    electronAffinity: 'الیکٹران کی کشش',
    meltingPoint: 'نقطہ پگھلاؤ',
    density: 'کثافت',
    orbitalBlocks: 'مداری بلاکس',
    chemicalFamily: 'کیمیائی خاندان',
    allFamilies: 'تمام کیمیائی خاندان (118)',

    // Right Column & Tooltip
    atomicMass: 'ایٹمی کمیت',
    specimen: 'اصل نمونہ',
    bohrAtom: 'بوہر ماڈل',
    orbitals: 'مدارات',
    properties: 'خصوصیات',
    naturalAppearance: 'قدرتی جسمانی ساخت',
    didYouKnow: 'کیا آپ جانتے ہیں؟',
    electronShells: 'الیکٹران شیلز تفصیل',
    expandedConfig: 'مکمل الیکٹرانک تشکیل',
    compareWith: 'موازنہ کریں',
    fullSpecs: 'مکمل تفصیلات',
    shells: 'شیلز',
    config: 'تشکیل',
    phase: 'حالت',

    // Canvas Toolbar
    iupacGrid: 'IUPAC معیاری 18 کالم گرڈ',
    fit: 'فٹ',
    zoomIn: 'بڑا کریں',
    zoomOut: 'چھوٹا کریں',

    // Trend Chart Modal
    trendsModalTitle: 'ایٹمی رجحانات کا دوری منحنی',
    trendsModalSubtitle: 'دور اور ایٹمی نمبروں کے لحاظ سے اقدار',
    filterPeriod: 'دور فلٹر کریں',
    all: 'سب',
    elementsPlotted: 'عناصر دکھائے گئے',
    atomicNumberAxis: 'ایٹمی نمبر (Z)',
    periodicBehaviorHeading: 'دوری طرز عمل اور الیکٹران شیلڈنگ کا اثر',

    // Element Compare Modal
    compareModalTitle: 'عناصر کا باہمی موازنہ',
    compareModalSubtitle: 'ایٹمی ساخت، بانڈ کی قطبیت اور الیکٹرانک تشکیل کا موازنہ کریں',
    presetPairs: 'اہم موازنہ جوڑے',
    elementA: 'عنصر A',
    elementB: 'عنصر B',
    predictedBond: 'متوقع بانڈ کی نوعیت:',
    bondIonic: 'بنیادی طور پر آئونک بانڈ (Δχ ≥ 1.7)',
    bondPolarCovalent: 'پولر ہم آہنگی بانڈ (0.4 ≤ Δχ < 1.7)',
    bondNonpolarCovalent: 'نان پولر ہم آہنگی بانڈ (Δχ < 0.4)',
    property: 'خصوصیت',
    firstIonizationEnergy: 'پہلی آئنائزیشن توانائی',
    valenceConfig: 'ویلنس تشکیل',
    shellsLabel: 'شیلز (K, L, M...)',
    standardState: 'معیاری حالت (STP)',
    bohrShells: 'بوہر شیلز',

    // Chemistry Quiz Modal
    quizModalTitle: 'کیمسٹری رجحانات چیلنج (کوئز)',
    quizModalSubtitle: 'دوری قوانین اور کوانٹم تشکیل میں اپنی مہارت آزمائیں',
    questionProgress: 'سوال',
    of: 'از',
    scoreLabel: 'اسکور:',
    explanationLabel: 'وضاحت:',
    inspectElement: 'دوری جدول میں معائنہ کریں ←',
    nextQuestion: 'اگلا سوال',
    viewResults: 'نتائج دیکھیں',
    challengeCompleted: 'چیلنج مکمل ہوا!',
    scoreSummary: 'آپ کا اسکور',
    tryAgain: 'دوبارہ کوشش کریں',
    backToTable: 'دوری جدول پر واپس جائیں',

    // Element Detail Modal
    physicalSpecimen: 'اصل نمونہ',
    aufbauOrbitals: 'آفباؤ مدارات',
    atomicTrendsTab: 'ایٹمی رجحانات',
    applications: 'استعمال اور اطلاقات',
    chemicalBehavior: 'کیمیائی اور طبعی خصوصیات:',
    groundStateConfig: 'بنیادی الیکٹرانک تشکیل',
    totalElectrons: 'کل الیکٹران',
    electronsInShells: 'شیلز میں الیکٹران',
    expandedNotation: 'مکمل ذیلی شیل نوٹیشن',
  },

  ta: {
    // Header & Brand
    appTitle: 'தனிம வரிசை அட்டவணை',
    appSubtitle: 'ஊடாடும் IUPAC அணு போக்குகள் மற்றும் குவாண்டம் காட்சிப்படுத்தி',
    pageHeading: 'தனிம வரிசை அட்டவணை உலாவி',
    elementsCount: '118 தனிமங்கள்',
    liveStatus: 'நேரலை 118',
    searchPlaceholder: 'குறியீடு, பெயர், எண் தேடவும்...',

    // Top Navigation
    navTable: 'தனிம அட்டவணை',
    navTrends: 'அணு போக்குகள்',
    navCompare: 'ஒப்பிடுக',
    navChallenge: 'போக்குகள் சவால் (வினாடி வினா)',

    // Top Actions
    actionShare: 'பகிர்',
    actionReport: 'அறிக்கை',
    actionPrint: 'அச்சிடு',

    // Scrubber
    thermalScrubber: 'வெப்பநிலை காலவரிசை அளவி',
    absZero: 'முழுமையான பூஜ்ஜியம்',
    liquidN2: 'திரவ நைட்ரஜன்',
    iceMelts: 'பனி உருகுதல்',
    roomTemp: 'அறை வெப்பநிலை',
    waterBoils: 'நீர் கொதிநிலை',
    ironMelts: 'இரும்பு உருகுதல்',
    tungstenMelts: 'டங்ஸ்டன் உருகுதல்',
    solarPhotosphere: 'சூரிய மேற்பரப்பு வெப்பம்',

    // Left Column
    phaseDistribution: 'பருப்பொருள் நிலை விநியோகம்',
    solid: 'திண்மம்',
    liquid: 'திரவம்',
    gas: 'வாயு',
    atomicTrend: 'அணு போக்கு (வெப்ப வரைபடம்)',
    defaultView: 'இயல்புநிலை பார்வை',
    electronegativity: 'எலக்ட்ரான் கவர் திறன்',
    atomicRadius: 'அணு ஆரம்',
    ionizationEnergy: 'அயனியாக்கும் ஆற்றல்',
    electronAffinity: 'எலக்ட்ரான் நாட்டம்',
    meltingPoint: 'உருகுநிலை',
    density: 'அடர்த்தி',
    orbitalBlocks: 'ஆர்பிட்டால் தொகுதிகள்',
    chemicalFamily: 'வேதியியல் குடும்பம்',
    allFamilies: 'அனைத்து வேதியியல் குடும்பங்கள் (118)',

    // Right Column & Tooltip
    atomicMass: 'அணு நிறை',
    specimen: 'உண்மையான மாதிரி',
    bohrAtom: 'போர் அணு மாதிரி',
    orbitals: 'ஆர்பிட்டால்கள்',
    properties: 'பண்புகள்',
    naturalAppearance: 'இயற்கை தோற்றம்',
    didYouKnow: 'உங்களுக்குத் தெரியுமா?',
    electronShells: 'எலக்ட்ரான் கூடுகள்',
    expandedConfig: 'விரிவான எலக்ட்ரான் அமைப்பு',
    compareWith: 'ஒப்பிடுக',
    fullSpecs: 'முழு விவரங்கள்',
    shells: 'கூடுகள்',
    config: 'அமைப்பு',
    phase: 'நிலை',

    // Canvas Toolbar
    iupacGrid: 'IUPAC நிலையான 18-நெடுவரிசை கட்டம்',
    fit: 'பொருத்து',
    zoomIn: 'பெரிதாக்கு',
    zoomOut: 'சிறிதாக்கு',

    // Trend Chart Modal
    trendsModalTitle: 'அணு போக்குகளின் காலமுறை வளைவு',
    trendsModalSubtitle: 'தொடர்கள் மற்றும் அணு எண்களின் அடிப்படையில்',
    filterPeriod: 'தொடர் வடிகட்டி',
    all: 'அனைத்தும்',
    elementsPlotted: 'தனிமங்கள் குறிக்கப்பட்டுள்ளன',
    atomicNumberAxis: 'அணு எண் (Z)',
    periodicBehaviorHeading: 'காலமுறை பண்புகள் & எலக்ட்ரான் மறைப்பு விளைவு',

    // Element Compare Modal
    compareModalTitle: 'தனிமங்களின் ஒப்பீடு (பக்கவாட்டில்)',
    compareModalSubtitle: 'அணு அமைப்பு, பிணைப்பு துருவமுனைப்பு மற்றும் எலக்ட்ரான் அமைப்பை ஒப்பிடுக',
    presetPairs: 'முக்கிய ஒப்பீட்டு ஜோடிகள்',
    elementA: 'தனிமம் A',
    elementB: 'தனிமம் B',
    predictedBond: 'கணிக்கப்பட்ட பிணைப்பு வகை:',
    bondIonic: 'அயனிப் பிணைப்பு (Δχ ≥ 1.7)',
    bondPolarCovalent: 'துருவ சகப்பிணைப்பு (0.4 ≤ Δχ < 1.7)',
    bondNonpolarCovalent: 'துருவமற்ற சகப்பிணைப்பு (Δχ < 0.4)',
    property: 'பண்பு',
    firstIonizationEnergy: 'முதல் அயனியாக்கும் ஆற்றல்',
    valenceConfig: 'இணைதிறன் அமைப்பு',
    shellsLabel: 'கூடுகள் (K, L, M...)',
    standardState: 'நிலையான நிலை (STP)',
    bohrShells: 'போர் கூடுகள்',

    // Chemistry Quiz Modal
    quizModalTitle: 'வேதியியல் போக்குகள் சவால் (வினாடி வினா)',
    quizModalSubtitle: 'தனிம வரிசை விதிகள் மற்றும் குவாண்டம் அமைப்பில் உங்கள் திறமையை சோதிக்கவும்',
    questionProgress: 'கேள்வி',
    of: 'இல்',
    scoreLabel: 'மதிப்பெண்:',
    explanationLabel: 'விளக்கம்:',
    inspectElement: 'தனிம அட்டவணையில் பார்க்க →',
    nextQuestion: 'அடுத்த கேள்வி',
    viewResults: 'முடிவுகளைக் காண்க',
    challengeCompleted: 'சவால் முடிந்தது!',
    scoreSummary: 'உங்கள் மதிப்பெண்',
    tryAgain: 'மீண்டும் முயற்சிக்கவும்',
    backToTable: 'தனிம அட்டவணைக்குத் திரும்பு',

    // Element Detail Modal
    physicalSpecimen: 'உண்மையான மாதிரி',
    aufbauOrbitals: 'ஆஃப்பாவ் ஆர்பிட்டால்கள்',
    atomicTrendsTab: 'அணு போக்குகள்',
    applications: 'பயன்பாடுகள்',
    chemicalBehavior: 'வேதியியல் மற்றும் இயற்பியல் நடத்தை:',
    groundStateConfig: 'அடிமட்ட எலக்ட்ரான் அமைப்பு',
    totalElectrons: 'மொத்த எலக்ட்ரான்கள்',
    electronsInShells: 'கூடுகளில் எலக்ட்ரான்கள்',
    expandedNotation: 'முழு விரிவான ஆர்பிட்டால் குறியீடு',
  },

  te: {
    // Header & Brand
    appTitle: 'ఆవర్తన పట్టిక',
    appSubtitle: 'ఇంటరాక్టివ్ IUPAC పరమాణు ధోరణులు మరియు క్వాంటం విజువలైజర్',
    pageHeading: 'ఆవర్తన పట్టిక ఎక్స్‌ప్లోరర్',
    elementsCount: '118 మూలకాలు',
    liveStatus: 'లైవ్ 118',
    searchPlaceholder: 'గుర్తు, పేరు లేదా సంఖ్య శోధించండి...',

    // Top Navigation
    navTable: 'ఆవర్తన పట్టిక',
    navTrends: 'పరమాణు ధోరణులు',
    navCompare: 'పోల్చండి',
    navChallenge: 'ధోరణుల క్విజ్ ఛాలెంజ్',

    // Top Actions
    actionShare: 'షేర్',
    actionReport: 'నివేదిక',
    actionPrint: 'ప్రింట్',

    // Scrubber
    thermalScrubber: 'ఉష్ణోగ్రత టైమ్‌లైన్ స్క్రబ్బర్',
    absZero: 'సంపూర్ణ శూన్యం',
    liquidN2: 'ద్రవ నైట్రోజన్',
    iceMelts: 'మంచు కరుగుట',
    roomTemp: 'గది ఉష్ణోగ్రత',
    waterBoils: 'నీటి మరిగే స్థానం',
    ironMelts: 'ఇనుము కరుగుట',
    tungstenMelts: 'టంగ్‌స్టన్ కరుగుట',
    solarPhotosphere: 'సూర్యుని ఉపరితల ఉష్ణోగ్రత',

    // Left Column
    phaseDistribution: 'స్థితి పంపిణీ',
    solid: 'ఘన',
    liquid: 'ద్రవ',
    gas: 'వాయువు',
    atomicTrend: 'పరమాణు ధోరణి',
    defaultView: 'డిఫాల్ట్ వీక్షణ',
    electronegativity: 'ఋణవిద్యుదాత్మకత',
    atomicRadius: 'పరమాణు వ్యాసార్థం',
    ionizationEnergy: 'అయనీకరణ శక్తి',
    electronAffinity: 'ఎలక్ట్రాన్ అనుబంధం',
    meltingPoint: 'ద్రవీభవన స్థానం',
    density: 'సాంద్రత',
    orbitalBlocks: 'ఆర్బిటాల్ బ్లాకులు',
    chemicalFamily: 'రసాయన కుటుంబం',
    allFamilies: 'అన్ని రసాయన కుటుంబాలు (118)',

    // Right Column & Tooltip
    atomicMass: 'పరమాణు ద్రవ్యరాశి',
    specimen: 'అసలు నమూనా',
    bohrAtom: 'బోర్ పరమాణువు',
    orbitals: 'ఆర్బిటాళ్లు',
    properties: 'లక్షణాలు',
    naturalAppearance: 'సహజ భౌతిక రూపం',
    didYouKnow: 'మీకు తెలుసా?',
    electronShells: 'ఎలక్ట్రాన్ కక్ష్యలు',
    expandedConfig: 'విస్తరించిన ఎలక్ట్రాన్ అమరిక',
    compareWith: 'పోల్చండి',
    fullSpecs: 'పూర్తి వివరాలు',
    shells: 'కక్ష్యలు',
    config: 'అమరిక',
    phase: 'స్థితి',

    // Canvas Toolbar
    iupacGrid: 'IUPAC ప్రామాణిక 18-నిలువు వరుసల గ్రిడ్',
    fit: 'సరిపోల్చు',
    zoomIn: 'జూమ్ ఇన్',
    zoomOut: 'జూమ్ అవుట్',

    // Trend Chart Modal
    trendsModalTitle: 'పరమాణు ధోరణుల ఆవర్తన వక్రరేఖ',
    trendsModalSubtitle: 'పీరియడ్లు మరియు పరమాణు సంఖ్యల ఆధారంగా విలువలు',
    filterPeriod: 'పీరియడ్ ఫిల్టర్',
    all: 'అన్నీ',
    elementsPlotted: 'మూలకాలు ప్లాట్ చేయబడ్డాయి',
    atomicNumberAxis: 'పరమాణు సంఖ్య (Z)',
    periodicBehaviorHeading: 'ఆవర్తన ప్రవర్తన మరియు ఎలక్ట్రాన్ షీల్డింగ్ ప్రభావం',

    // Element Compare Modal
    compareModalTitle: 'మూలకాల పోలిక (పక్కపక్కనే)',
    compareModalSubtitle: 'పరమాణు నిర్మాణం, బంధ ధ్రువణత మరియు ఎలక్ట్రాన్ అమరికను పోల్చండి',
    presetPairs: 'ముఖ్యమైన జంటలు',
    elementA: 'మూలకం A',
    elementB: 'మూలకం B',
    predictedBond: 'అంచనా వేయబడిన బంధ స్వభావం:',
    bondIonic: 'అయానిక్ బంధం (Δχ ≥ 1.7)',
    bondPolarCovalent: 'ధ్రువ సమయోజనీయ బంధం (0.4 ≤ Δχ < 1.7)',
    bondNonpolarCovalent: 'అధ్రువ సమయోజనీయ బంధం (Δχ < 0.4)',
    property: 'లక్షణం',
    firstIonizationEnergy: 'మొదటి అయనీకరణ శక్తి',
    valenceConfig: 'వేలెన్సీ అమరిక',
    shellsLabel: 'కక్ష్యలు (K, L, M...)',
    standardState: 'ప్రామాణిక స్థితి (STP)',
    bohrShells: 'బోర్ కక్ష్యలు',

    // Chemistry Quiz Modal
    quizModalTitle: 'రసాయన శాస్త్ర ధోరణుల ఛాలెంజ్ (క్విజ్)',
    quizModalSubtitle: 'ఆవర్తన నియమాలు మరియు క్వాంటం అమరికలపై మీ నైపుణ్యాన్ని పరీక్షించండి',
    questionProgress: 'ప్రశ్న',
    of: 'లో',
    scoreLabel: 'స్కోర్:',
    explanationLabel: 'వివరణ:',
    inspectElement: 'ఆవర్తన పట్టికలో చూడండి →',
    nextQuestion: 'తదుపరి ప్రశ్న',
    viewResults: 'ఫలితాలు చూడండి',
    challengeCompleted: 'ఛాలెంజ్ పూర్తయింది!',
    scoreSummary: 'మీ స్కోర్',
    tryAgain: 'మళ్లీ ప్రయత్నించండి',
    backToTable: 'ఆవర్తన పట్టికకు తిరిగి వెళ్ళు',

    // Element Detail Modal
    physicalSpecimen: 'అసలు నమూనా',
    aufbauOrbitals: 'ఆఫ్‌బా ఆర్బిటాళ్లు',
    atomicTrendsTab: 'పరమాణు ధోరణులు',
    applications: 'అనువర్తనాలు & ఉపయోగాలు',
    chemicalBehavior: 'రసాయన మరియు భౌతిక ప్రవర్తన:',
    groundStateConfig: 'భూస్థాయి ఎలక్ట్రాన్ అమరిక',
    totalElectrons: 'మొత్తం ఎలక్ట్రాన్లు',
    electronsInShells: 'కక్ష్యలలో ఎలక్ట్రాన్లు',
    expandedNotation: 'పూర్తి సబ్‌షెల్ సంకేతనం',
  },

  mr: {
    // Header & Brand
    appTitle: 'आवर्त सारणी',
    appSubtitle: 'इंटरॅक्टिव्ह IUPAC अणू प्रवृत्ती आणि क्वांटम ऑर्बिटल',
    pageHeading: 'आवर्त सारणी एक्सप्लोरर',
    elementsCount: '118 मूलद्रव्ये',
    liveStatus: 'थेट 118',
    searchPlaceholder: 'संज्ञा, नाव, अणू क्र. शोधा...',

    // Top Navigation
    navTable: 'आवर्त सारणी',
    navTrends: 'अणू प्रवृत्ती',
    navCompare: 'तुलना करा',
    navChallenge: 'प्रवृत्ती आव्हान (क्विझ)',

    // Top Actions
    actionShare: 'शेअर करा',
    actionReport: 'अहवाल',
    actionPrint: 'प्रिंट',

    // Scrubber
    thermalScrubber: 'तापमान टाइमलाइन स्क्रबर',
    absZero: 'परम शून्य',
    liquidN2: 'द्रवरूप नायट्रोजन',
    iceMelts: 'बर्फ वितळणे',
    roomTemp: 'खोलीचे तापमान',
    waterBoils: 'पाण्याचा उत्कलन बिंदू',
    ironMelts: 'लोखंड वितळणे',
    tungstenMelts: 'टंगस्टन वितळणे',
    solarPhotosphere: 'सूर्य पृष्ठभाग तापमान',

    // Left Column
    phaseDistribution: 'अवस्था वितरण',
    solid: 'स्थायू',
    liquid: 'द्रव',
    gas: 'वायू',
    atomicTrend: 'अणू प्रवृत्ती (हीटमॅप)',
    defaultView: 'मूळ दृश्य',
    electronegativity: 'विद्युत-ऋणता',
    atomicRadius: 'अणू त्रिज्या',
    ionizationEnergy: 'आयनीकरण ऊर्जा',
    electronAffinity: 'इलेक्ट्रॉन बंधुता',
    meltingPoint: 'वितळण बिंदू',
    density: 'घनता',
    orbitalBlocks: 'कक्षक ब्लॉक',
    chemicalFamily: 'रासायनिक कुल',
    allFamilies: 'सर्व रासायनिक कुले (118)',

    // Right Column & Tooltip
    atomicMass: 'अणू वस्तुमान',
    specimen: 'प्रत्यक्ष नमुना',
    bohrAtom: 'बोहर अणू मॉडेल',
    orbitals: 'ऑर्बिटल्स (कक्षक)',
    properties: 'गुणधर्म',
    naturalAppearance: 'नैसर्गिक भौतिक स्वरूप',
    didYouKnow: 'तुम्हाला माहिती आहे का?',
    electronShells: 'इलेक्ट्रॉन कवचांची विभागणी',
    expandedConfig: 'सविस्तर इलेक्ट्रॉन संरूपण',
    compareWith: 'तुलना करा',
    fullSpecs: 'संपूर्ण तपशील',
    shells: 'कवचे',
    config: 'संरूपण',
    phase: 'अवस्था',

    // Canvas Toolbar
    iupacGrid: 'IUPAC मानक 18-स्तंभ ग्रिड',
    fit: 'बसवा',
    zoomIn: 'झूम इन',
    zoomOut: 'झूम आउट',

    // Trend Chart Modal
    trendsModalTitle: 'अणू प्रवृत्ती आवर्तिता वक्र',
    trendsModalSubtitle: 'आवर्त आणि अणू क्रमांकांनुसार मूल्ये',
    filterPeriod: 'आवर्त फिल्टर करा',
    all: 'सर्व',
    elementsPlotted: 'मूलद्रव्ये दाखवली',
    atomicNumberAxis: 'अणू क्रमांक (Z)',
    periodicBehaviorHeading: 'आवर्ती वर्तन आणि इलेक्ट्रॉन शिल्डिंग प्रभाव',

    // Element Compare Modal
    compareModalTitle: 'मूलद्रव्यांची तुलना (शेजारी शेजारी)',
    compareModalSubtitle: 'अणू रचना, रासायनिक बंध ध्रुवीयता आणि इलेक्ट्रॉन संरूपणाची तुलना करा',
    presetPairs: 'महत्त्वाच्या जोड्या',
    elementA: 'मूलद्रव्य A',
    elementB: 'मूलद्रव्य B',
    predictedBond: 'अंदाजित बंध स्वरूप:',
    bondIonic: 'प्रामुख्याने आयनिक बंध (Δχ ≥ 1.7)',
    bondPolarCovalent: 'ध्रुवीय सहसंयुज बंध (0.4 ≤ Δχ < 1.7)',
    bondNonpolarCovalent: 'अध्रुवीय सहसंयुज बंध (Δχ < 0.4)',
    property: 'गुणधर्म',
    firstIonizationEnergy: 'पहिली आयनीकरण ऊर्जा',
    valenceConfig: 'संयुजा संरूपण',
    shellsLabel: 'कवचे (K, L, M...)',
    standardState: 'प्रमाणित अवस्था (STP)',
    bohrShells: 'बोहर कवचे',

    // Chemistry Quiz Modal
    quizModalTitle: 'रसायनशास्त्र प्रवृत्ती आव्हान (क्विझ)',
    quizModalSubtitle: 'आवर्ती नियम आणि क्वांटम संरूपणावरील आपले ज्ञान तपासा',
    questionProgress: 'प्रश्न',
    of: 'पैकी',
    scoreLabel: 'गुण:',
    explanationLabel: 'स्पष्टीकरण:',
    inspectElement: 'आवर्त सारणीत पहा →',
    nextQuestion: 'पुढील प्रश्न',
    viewResults: 'निकाल पहा',
    challengeCompleted: 'आव्हान पूर्ण झाले!',
    scoreSummary: 'आपले गुण',
    tryAgain: 'पुन्हा प्रयत्न करा',
    backToTable: 'आवर्त सारणीवर परत जा',

    // Element Detail Modal
    physicalSpecimen: 'प्रत्यक्ष नमुना',
    aufbauOrbitals: 'ऑफबाऊ कक्षक',
    atomicTrendsTab: 'अणू प्रवृत्ती',
    applications: 'उपयोग व अनुप्रयोग',
    chemicalBehavior: 'रासायनिक आणि भौतिक वर्तन:',
    groundStateConfig: 'मूलभूत अवस्था इलेक्ट्रॉन संरूपण',
    totalElectrons: 'एकूण इलेक्ट्रॉन्स',
    electronsInShells: 'कवचांमधील इलेक्ट्रॉन्स',
    expandedNotation: 'सविस्तर उपकक्षक संकेतन',
  },
};
