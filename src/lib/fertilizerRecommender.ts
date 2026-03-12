// ── Fertilizer Recommendation Engine ──
// Rule-based system that recommends organic & inorganic fertilizers
// based on soil NPK values, pH, and soil type.

export interface SoilInput {
  n_value: number;
  p_value: number;
  k_value: number;
  ph_value: number;
  soil_type: string;
}

export interface Fertilizer {
  name: string;
  description: string;
  application: string;
}

export interface FertilizerRecommendation {
  organic: Fertilizer[];
  inorganic: Fertilizer[];
  soilAmendments: { name: string; description: string }[];
  tips: string[];
  nutrientLevels: {
    nitrogen: "Low" | "Medium" | "High";
    phosphorus: "Low" | "Medium" | "High";
    potassium: "Low" | "Medium" | "High";
  };
}

// ── Nutrient Level Thresholds ──
function classifyNitrogen(n: number): "Low" | "Medium" | "High" {
  if (n < 20) return "Low";
  if (n < 50) return "Medium";
  return "High";
}

function classifyPhosphorus(p: number): "Low" | "Medium" | "High" {
  if (p < 10) return "Low";
  if (p < 25) return "Medium";
  return "High";
}

function classifyPotassium(k: number): "Low" | "Medium" | "High" {
  if (k < 110) return "Low";
  if (k < 280) return "Medium";
  return "High";
}

// ── Fertilizer Database ──
const NITROGEN_FERTILIZERS = {
  organic: [
    {
      name: "Vermicompost",
      description: "Worm-castings rich in nitrogen and beneficial microbes. Improves soil structure and water retention.",
      application: "Apply 2-4 tonnes per acre, mix into topsoil before sowing.",
    },
    {
      name: "Neem Cake (Neem Khali)",
      description: "By-product of neem oil extraction. Provides slow-release nitrogen and acts as a natural pest repellent.",
      application: "Apply 200-400 kg per acre. Mix into soil 2-3 weeks before planting.",
    },
    {
      name: "Green Manure (Dhaincha / Sesbania)",
      description: "Leguminous cover crops that fix atmospheric nitrogen into the soil through root nodules.",
      application: "Grow for 45-60 days, then plough into soil 2-3 weeks before main crop sowing.",
    },
    {
      name: "Farm Yard Manure (FYM)",
      description: "Well-decomposed mixture of cattle dung, urine, and crop residues. A balanced source of nutrients.",
      application: "Apply 8-10 tonnes per acre, spread evenly and incorporate into soil.",
    },
  ],
  inorganic: [
    {
      name: "Urea (46-0-0)",
      description: "Highest solid nitrogen fertilizer. Quickly soluble and fast-acting. Most cost-effective nitrogen source.",
      application: "Apply 50-100 kg per acre in 2-3 split doses during crop growth stages.",
    },
    {
      name: "DAP (18-46-0)",
      description: "Di-Ammonium Phosphate provides both nitrogen and phosphorus. Ideal as a basal dose.",
      application: "Apply 50-100 kg per acre at sowing time. Place in furrows near seed zone.",
    },
    {
      name: "Ammonium Sulphate (21-0-0-24S)",
      description: "Provides nitrogen along with sulphur. Suitable for sulphur-deficient soils.",
      application: "Apply 80-120 kg per acre. Best for crops needing sulphur like mustard and onion.",
    },
    {
      name: "Calcium Ammonium Nitrate (CAN 25-0-0)",
      description: "Contains both ammonium and nitrate nitrogen. Less prone to volatilization than urea.",
      application: "Apply 80-120 kg per acre as a top-dressing during vegetative growth stages.",
    },
  ],
};

const PHOSPHORUS_FERTILIZERS = {
  organic: [
    {
      name: "Bone Meal",
      description: "Ground animal bones rich in phosphorus (up to 20% P₂O₅). Slow-release, ideal for root development.",
      application: "Apply 100-200 kg per acre during land preparation.",
    },
    {
      name: "Rock Phosphate",
      description: "Natural mineral source of phosphorus. Works best in acidic soils where it dissolves gradually.",
      application: "Apply 200-400 kg per acre. Mix into acidic soils for best results.",
    },
    {
      name: "Phospho-compost",
      description: "Compost enriched with rock phosphate. Provides phosphorus with improved soil biology.",
      application: "Apply 2-3 tonnes per acre before sowing, mix into topsoil.",
    },
  ],
  inorganic: [
    {
      name: "Single Super Phosphate (SSP 0-16-0)",
      description: "Contains 16% phosphorus plus calcium and sulphur. The most affordable phosphatic fertilizer.",
      application: "Apply 150-250 kg per acre as basal dose before sowing.",
    },
    {
      name: "DAP (18-46-0)",
      description: "High phosphorus content. Most popular phosphatic fertilizer in India.",
      application: "Apply 50-100 kg per acre at sowing. Band-place near the root zone.",
    },
    {
      name: "Triple Super Phosphate (TSP 0-46-0)",
      description: "Concentrated phosphorus source without nitrogen. For soils that only need phosphorus.",
      application: "Apply 40-80 kg per acre as basal application.",
    },
  ],
};

const POTASSIUM_FERTILIZERS = {
  organic: [
    {
      name: "Wood Ash",
      description: "Rich source of potassium (5-10% K₂O) and calcium. Also raises soil pH in acidic soils.",
      application: "Apply 400-600 kg per acre. Spread evenly and mix into topsoil.",
    },
    {
      name: "Banana Stem / Peel Compost",
      description: "Composted banana waste is naturally rich in potassium. Great for vegetable gardens.",
      application: "Apply 1-2 tonnes per acre as mulch or mix into soil.",
    },
    {
      name: "Seaweed Extract",
      description: "Marine-based organic fertilizer rich in potassium, trace minerals, and growth hormones.",
      application: "Foliar spray 2-3 ml per litre of water, or soil drench 5 litres per acre.",
    },
  ],
  inorganic: [
    {
      name: "Muriate of Potash (MOP 0-0-60)",
      description: "Most concentrated and economical potassium fertilizer. Contains 60% K₂O.",
      application: "Apply 30-60 kg per acre as basal dose. Avoid for chloride-sensitive crops.",
    },
    {
      name: "Sulphate of Potash (SOP 0-0-50)",
      description: "Chloride-free potassium source. Preferred for fruits, vegetables, and tobacco.",
      application: "Apply 40-80 kg per acre. Safe for chloride-sensitive crops.",
    },
    {
      name: "NPK Complex (10-26-26)",
      description: "Balanced complex fertilizer with emphasis on phosphorus and potassium.",
      application: "Apply 75-125 kg per acre as basal dose at sowing.",
    },
  ],
};

// ── pH-Based Soil Amendments ──
function getPhAmendments(ph: number): { name: string; description: string }[] {
  const amendments: { name: string; description: string }[] = [];

  if (ph < 5.5) {
    amendments.push(
      { name: "Agricultural Lime (CaCO₃)", description: "Apply 1-2 tonnes per acre to raise pH in strongly acidic soils. Apply 2-3 weeks before sowing." },
      { name: "Dolomite Lime", description: "Provides both calcium and magnesium while raising soil pH. Ideal for magnesium-deficient acidic soils." }
    );
  } else if (ph < 6.5) {
    amendments.push(
      { name: "Agricultural Lime (CaCO₃)", description: "Apply 500 kg - 1 tonne per acre for mildly acidic soils. Improves nutrient availability." }
    );
  } else if (ph > 8.5) {
    amendments.push(
      { name: "Gypsum (CaSO₄)", description: "Apply 1-2 tonnes per acre to reduce alkalinity and improve soil structure. Essential for sodic soils." },
      { name: "Elemental Sulphur", description: "Apply 200-400 kg per acre. Soil bacteria convert it to sulfuric acid, lowering pH over 2-3 months." },
      { name: "Iron Sulphate (FeSO₄)", description: "Apply 100-200 kg per acre for faster pH reduction. Also corrects iron deficiency." }
    );
  } else if (ph > 7.5) {
    amendments.push(
      { name: "Gypsum (CaSO₄)", description: "Apply 500 kg - 1 tonne per acre to manage slight alkalinity and improve calcium availability." },
      { name: "Organic Matter / Compost", description: "Adding 4-5 tonnes of compost per acre gradually lowers pH and improves buffering capacity." }
    );
  }

  return amendments;
}

// ── Soil-Type Specific Tips ──
function getSoilTypeTips(soilType: string): string[] {
  const type = soilType.toLowerCase();

  if (type.includes("clay")) {
    return [
      "Clay soils retain water and nutrients well but can become waterlogged. Ensure proper drainage.",
      "Add organic matter (FYM/compost) to improve clay soil aeration and workability.",
      "Avoid working clay soil when wet — it compacts easily. Till when slightly moist.",
      "Potassium is generally well-retained in clay soils; focus on nitrogen and phosphorus needs.",
    ];
  }
  if (type.includes("sandy")) {
    return [
      "Sandy soils drain quickly and lose nutrients fast. Apply fertilizers in smaller, more frequent split doses.",
      "Add heavy organic matter (FYM, compost) to improve water and nutrient retention.",
      "Mulching is highly recommended for sandy soils to reduce moisture evaporation.",
      "Consider slow-release fertilizers like neem-coated urea to reduce nutrient leaching.",
    ];
  }
  if (type.includes("loam")) {
    return [
      "Loamy soil is ideal for most crops — it has balanced drainage and nutrient retention.",
      "Maintain organic matter levels with regular compost or green manure applications.",
      "Follow standard recommended fertilizer doses for your specific crop.",
    ];
  }
  if (type.includes("silt")) {
    return [
      "Silty soils are fertile but can crust on the surface. Mulching helps prevent crusting.",
      "Good moisture retention but can get compacted. Add organic matter periodically.",
      "Silty soils are well-suited for most crops; apply balanced fertilization.",
    ];
  }
  if (type.includes("black") || type.includes("vertisol")) {
    return [
      "Black soils (Vertisols) are rich in clay, swell when wet and crack when dry.",
      "Apply potassium carefully — black soils often have adequate potassium reserves.",
      "Phosphorus fixation is common in black soils; use SSP or DAP placed near the root zone.",
      "Add gypsum if the soil is sodic to improve structure and water infiltration.",
    ];
  }
  if (type.includes("red") || type.includes("laterite")) {
    return [
      "Red/laterite soils are often acidic and low in nitrogen, phosphorus, and organic matter.",
      "Lime application is crucial to correct acidity before fertilizer application.",
      "Add plenty of organic manure to build up nutrient reserves over time.",
    ];
  }
  if (type.includes("alluvial")) {
    return [
      "Alluvial soils are generally fertile with good nutrient content.",
      "Potassium deficiency is possible in older alluvial soils — test and supplement as needed.",
      "Regular crop rotation and green manuring help maintain long-term fertility.",
    ];
  }

  return [
    "Maintain soil organic matter with regular compost or FYM applications.",
    "Get a detailed lab soil test for precise fertilizer recommendations based on your specific crop.",
  ];
}

// ── Main Recommendation Function ──
export function getRecommendation(input: SoilInput): FertilizerRecommendation {
  const nLevel = classifyNitrogen(input.n_value);
  const pLevel = classifyPhosphorus(input.p_value);
  const kLevel = classifyPotassium(input.k_value);

  const organic: Fertilizer[] = [];
  const inorganic: Fertilizer[] = [];

  // Nitrogen recommendations
  if (nLevel === "Low") {
    organic.push(...NITROGEN_FERTILIZERS.organic);
    inorganic.push(...NITROGEN_FERTILIZERS.inorganic.slice(0, 3));
  } else if (nLevel === "Medium") {
    organic.push(NITROGEN_FERTILIZERS.organic[0], NITROGEN_FERTILIZERS.organic[3]);
    inorganic.push(NITROGEN_FERTILIZERS.inorganic[0]);
  }

  // Phosphorus recommendations
  if (pLevel === "Low") {
    organic.push(...PHOSPHORUS_FERTILIZERS.organic);
    inorganic.push(...PHOSPHORUS_FERTILIZERS.inorganic.slice(0, 2));
  } else if (pLevel === "Medium") {
    organic.push(PHOSPHORUS_FERTILIZERS.organic[0]);
    inorganic.push(PHOSPHORUS_FERTILIZERS.inorganic[1]);
  }

  // Potassium recommendations
  if (kLevel === "Low") {
    organic.push(...POTASSIUM_FERTILIZERS.organic);
    inorganic.push(...POTASSIUM_FERTILIZERS.inorganic.slice(0, 2));
  } else if (kLevel === "Medium") {
    organic.push(POTASSIUM_FERTILIZERS.organic[2]);
    inorganic.push(POTASSIUM_FERTILIZERS.inorganic[0]);
  }

  // If all nutrients are high, provide maintenance suggestions
  if (nLevel === "High" && pLevel === "High" && kLevel === "High") {
    organic.push({
      name: "Compost / FYM (Maintenance)",
      description: "All nutrient levels are adequate. Use organic compost to maintain soil health and microbial activity.",
      application: "Apply 3-5 tonnes per acre annually to sustain fertility.",
    });
    inorganic.push({
      name: "Micronutrient Mix",
      description: "With adequate NPK, focus on secondary and micronutrients (Zn, Fe, Mn, B) based on crop needs.",
      application: "Apply as per specific crop requirements. Foliar spray or soil application as recommended.",
    });
  }

  const soilAmendments = getPhAmendments(input.ph_value);
  const tips = getSoilTypeTips(input.soil_type);

  return {
    organic,
    inorganic,
    soilAmendments,
    tips,
    nutrientLevels: {
      nitrogen: nLevel,
      phosphorus: pLevel,
      potassium: kLevel,
    },
  };
}

// ── Available soil types for the manual input dropdown ──
export const SOIL_TYPES = [
  "Clay soil",
  "Sandy soil",
  "Loamy soil",
  "Silty soil",
  "Black soil (Vertisol)",
  "Red soil (Laterite)",
  "Alluvial soil",
];
