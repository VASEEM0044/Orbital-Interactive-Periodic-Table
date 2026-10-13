import { ChemicalElement, StateOfMatter, TrendInfo } from '../types/element';

/**
 * Determine physical state of an element at a given temperature in Kelvin
 */
export function getElementStateAtTemp(
  element: ChemicalElement,
  tempK: number
): StateOfMatter {
  if (element.meltingPoint === null || element.boilingPoint === null) {
    return element.standardState;
  }

  if (tempK < element.meltingPoint) {
    return 'solid';
  } else if (tempK < element.boilingPoint) {
    return 'liquid';
  } else {
    return 'gas';
  }
}

/**
 * Convert Kelvin to Celsius and Fahrenheit
 */
export function convertTemp(tempK: number): {
  kelvin: number;
  celsius: number;
  fahrenheit: number;
} {
  const celsius = tempK - 273.15;
  const fahrenheit = (celsius * 9) / 5 + 32;
  return {
    kelvin: Math.round(tempK),
    celsius: Math.round(celsius * 10) / 10,
    fahrenheit: Math.round(fahrenheit * 10) / 10,
  };
}

/**
 * Interpolate color for atomic trend heatmap
 */
export function getTrendColor(
  value: number | null,
  trend: TrendInfo
): string | null {
  if (value === null || Number.isNaN(value)) {
    return null;
  }

  const { min, max } = trend;
  // Normalize value between 0 and 1
  let ratio = (value - min) / (max - min);
  ratio = Math.max(0, Math.min(1, ratio));

  // Soft pastel color stop interpolation for light theme dashboard
  const stops = [
    { r: 243, g: 244, b: 246 },  // #F3F4F6 (lowest neutral)
    { r: 224, g: 242, b: 254 },  // #E0F2FE (soft sky)
    { r: 204, g: 251, b: 241 },  // #CCFBF1 (soft teal)
    { r: 209, g: 250, b: 229 },  // #D1FAE5 (soft emerald)
    { r: 254, g: 243, b: 199 },  // #FEF3C7 (soft amber)
    { r: 254, g: 226, b: 226 },  // #FEE2E2 (soft coral/rose highest)
  ];

  const scaled = ratio * (stops.length - 1);
  const index = Math.floor(scaled);
  const t = scaled - index;

  if (index >= stops.length - 1) {
    const last = stops[stops.length - 1];
    return `rgb(${last.r}, ${last.g}, ${last.b})`;
  }

  const c1 = stops[index];
  const c2 = stops[index + 1];

  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

export interface OrbitalBox {
  name: string; // e.g. "1s", "2p_x", "2p_y", "2p_z"
  subshell: string; // e.g. "1s", "2p"
  maxCapacity: number;
  electrons: number; // 0, 1, or 2
  spinUp: boolean;
  spinDown: boolean;
}

/**
 * Standard Aufbau filling order with max capacities
 */
const AUFBAU_ORDER: { name: string; capacity: number; boxes: number }[] = [
  { name: '1s', capacity: 2, boxes: 1 },
  { name: '2s', capacity: 2, boxes: 1 },
  { name: '2p', capacity: 6, boxes: 3 },
  { name: '3s', capacity: 2, boxes: 1 },
  { name: '3p', capacity: 6, boxes: 3 },
  { name: '4s', capacity: 2, boxes: 1 },
  { name: '3d', capacity: 10, boxes: 5 },
  { name: '4p', capacity: 6, boxes: 3 },
  { name: '5s', capacity: 2, boxes: 1 },
  { name: '4d', capacity: 10, boxes: 5 },
  { name: '5p', capacity: 6, boxes: 3 },
  { name: '6s', capacity: 2, boxes: 1 },
  { name: '4f', capacity: 14, boxes: 7 },
  { name: '5d', capacity: 10, boxes: 5 },
  { name: '6p', capacity: 6, boxes: 3 },
  { name: '7s', capacity: 2, boxes: 1 },
  { name: '5f', capacity: 14, boxes: 7 },
  { name: '6d', capacity: 10, boxes: 5 },
  { name: '7p', capacity: 6, boxes: 3 },
];

/**
 * Computes individual quantum orbital box occupations for an atomic number Z
 * adhering strictly to Aufbau principle, Pauli exclusion, and Hund's rule!
 */
export function computeOrbitalBoxes(atomicNumber: number): {
  subshells: {
    name: string;
    boxes: OrbitalBox[];
  }[];
} {
  let remainingElectrons = atomicNumber;
  const result: { name: string; boxes: OrbitalBox[] }[] = [];

  for (const sub of AUFBAU_ORDER) {
    if (remainingElectrons <= 0) break;

    const countInSubshell = Math.min(remainingElectrons, sub.capacity);
    remainingElectrons -= countInSubshell;

    // Apply Hund's rule: fill singly with spin-up before pairing with spin-down
    const boxes: OrbitalBox[] = [];
    const numBoxes = sub.boxes;

    for (let b = 0; b < numBoxes; b++) {
      let electronsInBox = 0;
      let spinUp = false;
      let spinDown = false;

      // 1st pass: spin-up (single occupancy)
      if (countInSubshell > b) {
        electronsInBox++;
        spinUp = true;
      }
      // 2nd pass: spin-down (pairing)
      if (countInSubshell > numBoxes + b) {
        electronsInBox++;
        spinDown = true;
      }

      boxes.push({
        name: `${sub.name}${numBoxes > 1 ? ` #${b + 1}` : ''}`,
        subshell: sub.name,
        maxCapacity: 2,
        electrons: electronsInBox,
        spinUp,
        spinDown,
      });
    }

    result.push({
      name: sub.name,
      boxes,
    });
  }

  return { subshells: result };
}

/**
 * Text-to-speech pronunciation of element
 */
export function speakElementName(name: string, symbol: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${name}, symbol ${symbol}`);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}
