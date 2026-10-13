export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export type StateOfMatter = 'solid' | 'liquid' | 'gas' | 'unknown';

export type OrbitalBlock = 's' | 'p' | 'd' | 'f';

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  group: number | null; // 1-18 or null for lanthanides/actinides
  period: number; // 1-7
  block: OrbitalBlock;
  electronConfiguration: string;
  electronConfigurationExpanded: string;
  shells: number[]; // e.g. [2, 8, 18, 7]
  electronegativity: number | null; // Pauling scale
  atomicRadius: number | null; // empirical/calculated in pm
  ionizationEnergy: number | null; // 1st ionization energy in kJ/mol
  electronAffinity: number | null; // in kJ/mol
  oxidationStates: string[];
  standardState: StateOfMatter;
  meltingPoint: number | null; // Kelvin
  boilingPoint: number | null; // Kelvin
  density: number | null; // g/cm³ (or g/L for gases at STP)
  yearDiscovered: number | string;
  discoverer: string;
  crystalStructure: string;
  summary: string;
  applications: string[];
  spectralColor: string; // approximate hex or description of flame test/spectral glow
  gridRow: number;
  gridCol: number;
  imageUrl?: string; // High-definition photograph of the pure physical element
  appearance?: string; // What the element looks like in reality
  funFact?: string; // Intriguing educational chemistry fact
}

export type AtomicTrend =
  | 'none'
  | 'electronegativity'
  | 'atomicRadius'
  | 'ionizationEnergy'
  | 'electronAffinity'
  | 'meltingPoint'
  | 'density';

export interface TrendInfo {
  id: AtomicTrend;
  name: string;
  unit: string;
  description: string;
  periodicRule: string;
  min: number;
  max: number;
  colorScale: string[]; // [lowColor, midColor, highColor]
}
