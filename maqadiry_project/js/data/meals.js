const MEALS = [
  {
    id: "kabsa",
    name: "مقادير كبسة الدجاج",
    category: "سعودي",
    badge: "الأكثر شيوعًا",
    pricePerServing: 22,
    prepTime: 45,
    popularity: 98,
    image: "assets/kabsa.jpg",
    shortDescription: "أرز بسمتي متبل مع دجاج ومكونات أساسية مجهزة للطبخ المنزلي.",
    basicIngredients: ["دجاج", "أرز بسمتي", "بصل", "طماطم", "بهارات كبسة", "مكسرات"],
    servingSize: "حصة واحدة",
    allergens: "يحتوي على: مكسرات",
    nutrition: {
      calories: "520 سعرة",
      protein: "35 جم",
      carbs: "62 جم",
      fat: "14 جم",
      sodium: "720 ملجم",
      fiber: "4 جم"
    },
    hiddenExactQuantities: [
      "250 جم دجاج",
      "180 جم أرز بسمتي",
      "60 جم بصل",
      "70 جم طماطم",
      "12 جم بهارات كبسة",
      "15 جم مكسرات"
    ],
    hiddenRecipeSteps: [
      "اغسل الأرز وانقعه لفترة قصيرة.",
      "شوّح البصل ثم أضف قطع الدجاج والبهارات.",
      "أضف الطماطم ثم الأرز والماء واتركه حتى يكتمل النضج.",
      "زيّن الطبق بالمكسرات قبل التقديم."
    ]
  },
  {
    id: "mandi",
    name: "مقادير مندي اللحم",
    category: "سعودي",
    badge: "مميز",
    pricePerServing: 29,
    prepTime: 60,
    popularity: 92,
    image: "assets/mandi.jpg",
    shortDescription: "لحم متبل مع أرز بسمتي ومكونات مجهزة لتجربة مندي منزلية.",
    basicIngredients: ["لحم", "أرز بسمتي", "بصل", "طماطم", "بهارات مندي"],
    servingSize: "حصة واحدة",
    allergens: "لا توجد مسببات حساسية شائعة مذكورة",
    nutrition: {
      calories: "610 سعرة",
      protein: "33 جم",
      carbs: "58 جم",
      fat: "25 جم",
      sodium: "760 ملجم",
      fiber: "3 جم"
    },
    hiddenExactQuantities: [
      "240 جم لحم",
      "170 جم أرز بسمتي",
      "55 جم بصل",
      "60 جم طماطم",
      "10 جم بهارات مندي"
    ],
    hiddenRecipeSteps: [
      "تبّل اللحم واتركه ليتشرب النكهات.",
      "حضّر قاعدة البصل والطماطم والبهارات.",
      "أضف الأرز مع السائل المناسب واتركه حتى ينضج مع اللحم.",
      "قدّم الطبق بعد الراحة القصيرة."
    ]
  },
  {
    id: "jareesh",
    name: "جريش",
    category: "سعودي",
    badge: "تقليدي",
    pricePerServing: 18,
    prepTime: 55,
    popularity: 85,
    image: "assets/jareesh.jpg",
    shortDescription: "جريش مع لبن وبصل ومكونات أساسية متوازنة لطبخ منزلي سهل.",
    basicIngredients: ["جريش", "لبن", "بصل", "زبدة", "بهارات"],
    servingSize: "حصة واحدة",
    allergens: "يحتوي على: حليب، قمح",
    nutrition: {
      calories: "430 سعرة",
      protein: "16 جم",
      carbs: "54 جم",
      fat: "15 جم",
      sodium: "680 ملجم",
      fiber: "6 جم"
    },
    hiddenExactQuantities: [
      "170 جم جريش",
      "220 مل لبن",
      "45 جم بصل",
      "12 جم زبدة",
      "6 جم بهارات"
    ],
    hiddenRecipeSteps: [
      "اغسل الجريش جيدًا قبل الطبخ.",
      "اطبخ البصل ثم أضف الجريش والسائل.",
      "أضف اللبن والبهارات مع التحريك حتى يتجانس القوام.",
      "أنهِ الطبق بلمسة زبدة قبل التقديم."
    ]
  },
  {
    id: "burger",
    name: "مقادير البرجر",
    category: "غربي",
    badge: "مفضل للعائلة",
    pricePerServing: 24,
    prepTime: 25,
    popularity: 95,
    image: "assets/burger.jpg",
    shortDescription: "لحم برجر، خبز، وخضار ومكونات أساسية مجهزة للطبخ والتجميع.",
    basicIngredients: ["لحم برجر", "خبز برجر", "جبن", "خس", "طماطم", "صلصة"],
    servingSize: "حصة واحدة",
    allergens: "يحتوي على: حليب، قمح",
    nutrition: {
      calories: "560 سعرة",
      protein: "28 جم",
      carbs: "39 جم",
      fat: "30 جم",
      sodium: "810 ملجم",
      fiber: "3 جم"
    },
    hiddenExactQuantities: [
      "160 جم لحم برجر",
      "1 خبز برجر",
      "25 جم جبن",
      "20 جم خس",
      "25 جم طماطم",
      "18 جم صلصة"
    ],
    hiddenRecipeSteps: [
      "شكّل اللحم واطهه حتى يصل للنضج المناسب.",
      "حمّص الخبز بخفة.",
      "رتّب الخضار والجبن والصلصة داخل الخبز.",
      "قدّم مع الإضافات الجانبية المرفقة."
    ]
  },
  {
    id: "ribeye",
    name: "مقادير ريب آي ستيك",
    category: "غربي",
    badge: "فاخر",
    pricePerServing: 46,
    prepTime: 35,
    popularity: 78,
    image: "assets/steak.jpg",
    shortDescription: "قطعة ريب آي مع خضار وزبدة متبلة ومقادير مجهزة للطبخ.",
    basicIngredients: ["ريب آي", "فلفل", "زبدة", "ثوم", "بطاطس صغيرة"],
    servingSize: "حصة واحدة",
    allergens: "يحتوي على: حليب",
    nutrition: {
      calories: "640 سعرة",
      protein: "41 جم",
      carbs: "24 جم",
      fat: "42 جم",
      sodium: "590 ملجم",
      fiber: "3 جم"
    },
    hiddenExactQuantities: [
      "230 جم ريب آي",
      "18 جم زبدة",
      "8 جم ثوم",
      "90 جم بطاطس صغيرة",
      "20 جم فلفل ملون"
    ],
    hiddenRecipeSteps: [
      "اترك الستيك في حرارة الغرفة قليلًا ثم تبّله.",
      "حمّر الستيك على حرارة عالية حسب درجة النضج المطلوبة.",
      "أضف الزبدة والثوم في النهاية.",
      "قدّم مع البطاطس والخضار بعد الراحة القصيرة."
    ]
  },
  {
    id: "chicken-rice",
    name: "مقادير دجاج وأرز",
    category: "غربي",
    badge: "متوازن",
    pricePerServing: 21,
    prepTime: 30,
    popularity: 83,
    image: "assets/chicken-rice.jpg",
    shortDescription: "قطع دجاج مع أرز وخضار وتتبيلة خفيفة جاهزة للطبخ اليومي.",
    basicIngredients: ["دجاج", "أرز", "خضار مشكلة", "ثوم", "بهارات خفيفة"],
    servingSize: "حصة واحدة",
    allergens: "لا توجد مسببات حساسية شائعة مذكورة",
    nutrition: {
      calories: "490 سعرة",
      protein: "31 جم",
      carbs: "52 جم",
      fat: "15 جم",
      sodium: "620 ملجم",
      fiber: "4 جم"
    },
    hiddenExactQuantities: [
      "210 جم دجاج",
      "160 جم أرز",
      "80 جم خضار مشكلة",
      "7 جم ثوم",
      "6 جم بهارات"
    ],
    hiddenRecipeSteps: [
      "اطهُ الدجاج مع التتبيلة حتى يأخذ اللون المناسب.",
      "حضّر الأرز في قدر منفصل.",
      "أضف الخضار في آخر المرحلة للحفاظ على القوام.",
      "قدّم الدجاج فوق الأرز."
    ]
  },
  {
    id: "alfredo",
    name: "مقادير باستا ألفريدو",
    category: "إيطالي",
    badge: "كريمي",
    pricePerServing: 26,
    prepTime: 30,
    popularity: 88,
    image: "assets/alfredo.jpg",
    shortDescription: "باستا مع صلصة كريمية ودجاج وفطر ومقادير مجهزة للطبخ.",
    basicIngredients: ["باستا", "دجاج", "كريمة طبخ", "فطر", "جبن بارميزان"],
    servingSize: "حصة واحدة",
    allergens: "يحتوي على: حليب، قمح",
    nutrition: {
      calories: "590 سعرة",
      protein: "30 جم",
      carbs: "49 جم",
      fat: "28 جم",
      sodium: "770 ملجم",
      fiber: "3 جم"
    },
    hiddenExactQuantities: [
      "120 جم باستا",
      "140 جم دجاج",
      "95 مل كريمة طبخ",
      "60 جم فطر",
      "20 جم جبن بارميزان"
    ],
    hiddenRecipeSteps: [
      "اسلق الباستا حتى تنضج مع الاحتفاظ بقليل من ماء السلق.",
      "حضّر الدجاج والفطر في المقلاة.",
      "أضف الكريمة والجبن حتى تتماسك الصلصة.",
      "اخلط الباستا بالصلصة وقدّمها مباشرة."
    ]
  },
  {
    id: "sushi",
    name: "مقادير سوشي",
    category: "آسيوي",
    badge: "آسيوي",
    pricePerServing: 38,
    prepTime: 50,
    popularity: 76,
    image: "assets/sushi.jpg",
    shortDescription: "أرز سوشي، ورق نوري، وخضار ومكونات أساسية مجهزة للّف والتحضير.",
    basicIngredients: ["أرز سوشي", "ورق نوري", "خيار", "أفوكادو", "سمك أو بديل حسب الخيار"],
    servingSize: "حصة واحدة",
    allergens: "يحتوي على: سمك، صويا",
    nutrition: {
      calories: "410 سعرة",
      protein: "19 جم",
      carbs: "55 جم",
      fat: "11 جم",
      sodium: "700 ملجم",
      fiber: "5 جم"
    },
    hiddenExactQuantities: [
      "150 جم أرز سوشي",
      "4 أوراق نوري",
      "35 جم خيار",
      "40 جم أفوكادو",
      "110 جم سمك أو بديل"
    ],
    hiddenRecipeSteps: [
      "حضّر أرز السوشي حسب التعليمات المرسلة بعد الطلب.",
      "رتّب المكونات فوق ورق النوري.",
      "لف الرول بإحكام ثم قطعه لقطع متساوية.",
      "قدّمه مع الصلصات الجانبية المرفقة."
    ]
  },
  {
    id: "caesar",
    name: "مقادير سلطة سيزر",
    category: "إيطالي",
    badge: "خفيف",
    pricePerServing: 19,
    prepTime: 20,
    popularity: 81,
    image: "assets/caesar.jpg",
    shortDescription: "خس ودجاج وقطع خبز محمصة مع صلصة سيزر ومقادير مجهزة للتقديم.",
    basicIngredients: ["خس روماني", "دجاج", "خبز محمص", "جبن بارميزان", "صلصة سيزر"],
    servingSize: "حصة واحدة",
    allergens: "يحتوي على: بيض، حليب، قمح",
    nutrition: {
      calories: "360 سعرة",
      protein: "24 جم",
      carbs: "18 جم",
      fat: "20 جم",
      sodium: "690 ملجم",
      fiber: "4 جم"
    },
    hiddenExactQuantities: [
      "110 جم خس روماني",
      "120 جم دجاج",
      "30 جم خبز محمص",
      "15 جم جبن بارميزان",
      "28 جم صلصة سيزر"
    ],
    hiddenRecipeSteps: [
      "حضّر الدجاج حسب الدرجة المفضلة لديك.",
      "اخلط الخس مع الصلصة بخفة.",
      "أضف الخبز المحمص والجبن في النهاية.",
      "رتّب المكونات في طبق التقديم."
    ]
  }
];

function getMeals() {
  return MEALS.slice();
}

function getMealById(id) {
  return MEALS.find((meal) => meal.id === id) || null;
}
