/**
 * Curated real physical element sample photographs and physical appearances.
 * Sourced from scientific repositories and public domain archives (Wikimedia Commons).
 */

export interface ElementVisualData {
  imageUrl: string;
  appearance: string;
  funFact: string;
}

export const ELEMENT_VISUAL_MAP: Record<number, ElementVisualData> = {
  1: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Hydrogen_discharge_tube.jpg/480px-Hydrogen_discharge_tube.jpg',
    appearance: 'Colorless, odorless gas; glows in high-voltage discharge with an intense purple-violet spectral emission.',
    funFact: 'Hydrogen makes up roughly 75% of all normal matter in the universe and fuels the fusion core of the Sun.',
  },
  2: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Helium_discharge_tube.jpg/480px-Helium_discharge_tube.jpg',
    appearance: 'Colorless, completely inert gas; glows glowing orange-peach in high-voltage electric discharge tubes.',
    funFact: 'Helium is the only element that cannot be solidified at standard pressure, even at absolute zero (0 K).',
  },
  3: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Lithium_paraffin.jpg/480px-Lithium_paraffin.jpg',
    appearance: 'Soft, silvery-white metal stored under mineral oil or paraffin wax to prevent reaction with atmospheric oxygen and nitrogen.',
    funFact: 'Lithium is so low in density (0.534 g/cm³) that it easily floats on water—while vigorously reacting with it.',
  },
  4: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Beryllium_crystals.jpg/480px-Beryllium_crystals.jpg',
    appearance: 'Steel-gray, exceptionally hard, brittle crystalline metal with a high acoustic sound speed.',
    funFact: 'The James Webb Space Telescope uses gold-coated beryllium mirrors because beryllium retains its shape at cryogenic space temperatures (-220 °C).',
  },
  5: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Boron_pieces.jpg/480px-Boron_pieces.jpg',
    appearance: 'Dark lustrous brown-black metalloid crystals, nearly as hard as diamond on the Mohs scale.',
    funFact: 'Boron imparts a brilliant green flame in pyrotechnic tests and is used to synthesize heat-resistant borosilicate Pyrex glass.',
  },
  6: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Diamond_and_graphite.jpg/480px-Diamond_and_graphite.jpg',
    appearance: 'Allotropes range from transparent, brilliant diamond (the hardest natural mineral) to slippery, opaque black graphite flakes.',
    funFact: 'Carbon forms more chemical compounds than all other elements in the periodic table combined.',
  },
  7: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Liquid_nitrogen_bubble.jpg/480px-Liquid_nitrogen_bubble.jpg',
    appearance: 'Clear, colorless gas making up 78% of air; forms a boiling cryogenic liquid at -196 °C (77 K).',
    funFact: 'The triple bond in molecular nitrogen (N≡N) is one of the strongest covalent bonds known, requiring 945 kJ/mol to break.',
  },
  8: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Liquid_Oxygen_droplet.jpg/480px-Liquid_Oxygen_droplet.jpg',
    appearance: 'Colorless diatomic gas; condenses below -183 °C into a pale cyan-blue paramagnetic liquid attracted to magnets.',
    funFact: 'Liquid oxygen is paramagnetic due to two unpaired electrons in its antibonding π* molecular orbitals, allowing it to be suspended between magnetic poles.',
  },
  9: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fluorine_liquid_transparent_2.jpg/480px-Fluorine_liquid_transparent_2.jpg',
    appearance: 'Extremely corrosive, pungent pale yellow-green gas; the most aggressively reactive chemical element.',
    funFact: 'Fluorine reacts with almost all organic and inorganic substances, including glass, metals, water, and even noble gases like xenon.',
  },
  10: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Neon_discharge_tube.jpg/480px-Neon_discharge_tube.jpg',
    appearance: 'Colorless noble gas that emits the quintessential brilliant reddish-orange glow in high-voltage neon signs.',
    funFact: 'Only true reddish-orange signs contain pure neon gas; other "neon" colors use argon, mercury vapor, and phosphor coatings.',
  },
  11: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Na_%28Sodium%29.jpg/480px-Na_%28Sodium%29.jpg',
    appearance: 'Soft, waxy silvery-white alkali metal that can easily be cut with a butter knife; tarnishes immediately in air.',
    funFact: 'Sodium reacts explosively with water to produce sodium hydroxide and flammable hydrogen gas with an intense yellow flame.',
  },
  12: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Crystalline_magnesium.jpg/480px-Crystalline_magnesium.jpg',
    appearance: 'Shiny, silvery-white lightweight metal; burns with an intensely bright blinding white flame.',
    funFact: 'Magnesium sits at the exact coordination center of the chlorophyll molecule, enabling plant photosynthesis across planet Earth.',
  },
  13: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Aluminium-4.jpg/480px-Aluminium-4.jpg',
    appearance: 'Silvery-white, lightweight, highly malleable metal protected by an instantaneous microscopic passivating oxide layer (Al₂O₃).',
    funFact: 'In the 1850s, aluminum was rarer and more expensive than gold; Emperor Napoleon III famously served honored guests on aluminum plates.',
  },
  14: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SiliconCrook.jpg/480px-SiliconCrook.jpg',
    appearance: 'Dark gray lustrous metalloid crystals with a characteristic metallic sheen and brittle semiconductor lattice.',
    funFact: 'Hyper-pure crystalline silicon boules (99.9999999% purity) form the physical substrate for all modern microprocessor computer chips.',
  },
  15: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Phosphorus-allotropes.jpg/480px-Phosphorus-allotropes.jpg',
    appearance: 'Exists as waxy, pyrophoric white phosphorus (glows green in dark air) or dark red amorphous powder used on match strike pads.',
    funFact: 'Phosphorus was discovered in 1669 by Hennig Brand in Hamburg while distilling human urine in search of the Philosopher’s Stone.',
  },
  16: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sulfur-sample.jpg/480px-Sulfur-sample.jpg',
    appearance: 'Vivid lemon-yellow rhombic crystalline solid; burns with a pale blue flame producing sharp choking SO₂ gas.',
    funFact: 'Disulfide bridges (-S-S-) between cysteine amino acids are the biochemical rivets that lock human hair and antibody proteins into shape.',
  },
  17: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chlorine_liquid_in_ampoule.jpg/480px-Chlorine_liquid_in_ampoule.jpg',
    appearance: 'Yellowish-green pungent gas about 2.5 times denser than air; condenses into an amber liquid under moderate pressure.',
    funFact: 'Chlorine holds the highest electron affinity (-349 kJ/mol) of any element in the entire periodic table.',
  },
  18: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Argon_discharge_tube.jpg/480px-Argon_discharge_tube.jpg',
    appearance: 'Colorless, completely unreactive noble gas; glows in lilac-violet high-voltage electric discharge.',
    funFact: 'Argon comprises nearly 1% (0.934%) of Earth’s atmosphere, making it more abundant than carbon dioxide and water vapor combined.',
  },
  19: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Potassium-2.jpg/480px-Potassium-2.jpg',
    appearance: 'Soft silvery metal that cuts like cold butter, floats on water, and instantly ignites with a characteristic lilac-purple flame.',
    funFact: 'Potassium and sodium ion pumps in neuronal cell membranes generate the action potentials that allow human thoughts, heartbeats, and muscle movement.',
  },
  20: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg/480px-Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg',
    appearance: 'Dull gray-silvery alkaline earth metal; turns yellowish upon brief exposure to ambient air.',
    funFact: 'Calcium is the most abundant metallic element in the human body, forming 99% of bone mineral as crystalline hydroxyapatite.',
  },
  22: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Titanium_crystal_bar.jpg/480px-Titanium_crystal_bar.jpg',
    appearance: 'Lustrous, silvery metallic transition element with exceptional strength-to-density ratio and corrosion resistance.',
    funFact: 'Titanium is biocompatible because bone cells readily bond directly to its native titanium dioxide surface, making it ideal for orthopedic implants.',
  },
  26: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Iron_electrolytic_and_1cm3_cube.jpg/480px-Iron_electrolytic_and_1cm3_cube.jpg',
    appearance: 'Lustrous, magnetic metallic element; forms the molten outer core and solid inner core of Earth.',
    funFact: 'Iron-56 represents the pinnacle of stellar nucleosynthesis: fusing elements lighter than iron releases energy, while fusing iron consumes energy.',
  },
  29: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/NatCopper.jpg/480px-NatCopper.jpg',
    appearance: 'Reddish-orange, highly ductile metal with second-highest electrical and thermal conductivity among all metals.',
    funFact: 'Copper naturally kills bacteria, viruses, and fungi within hours through contact killing (oligodynamic effect).',
  },
  35: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bromine_vial_in_acrylic_cube.jpg/480px-Bromine_vial_in_acrylic_cube.jpg',
    appearance: 'Dense, dark reddish-brown fuming liquid; the only nonmetallic element that is liquid at standard room temperature and pressure.',
    funFact: 'Liquid bromine is so dense (3.10 g/cm³) that an aluminum bar floats on its surface.',
  },
  47: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Silver_crystal.jpg/480px-Silver_crystal.jpg',
    appearance: 'Brilliant white lustrous metal boasting the highest electrical conductivity, thermal conductivity, and optical reflectivity of any element.',
    funFact: 'Polished silver reflects 99% of visible light across the spectrum.',
  },
  53: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Iodine-sample.jpg/480px-Iodine-sample.jpg',
    appearance: 'Dark lustrous purple-black crystalline plates; readily sublimes upon gentle warming into an intensely deep violet vapor.',
    funFact: 'Iodine vapor was used in Louis Daguerre’s 1839 photographic process to create the world’s first practical photographs.',
  },
  79: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Gold_crystals.jpg/480px-Gold_crystals.jpg',
    appearance: 'Rich yellow lustrous precious metal; the most malleable and ductile metal known to materials science.',
    funFact: 'A single ounce of pure gold can be hammered into a translucent sheet 28 feet wide.',
  },
  80: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pouring_liquid_mercury_b%E8%AE%BE%E5%AE%9A.jpg/480px-Pouring_liquid_mercury_b%E8%AE%BE%E5%AE%9A.jpg',
    appearance: 'Heavy, silvery liquid metal with high surface tension, forming perfectly spherical liquid beads at room temperature.',
    funFact: 'Mercury remains liquid at room temperature because relativistic contraction pulls its 6s electrons tightly to the nucleus.',
  },
  83: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Bi-crystal.jpg/480px-Bi-crystal.jpg',
    appearance: 'Brittle metal famous for forming stepped hopper crystals with stunning iridescent rainbow oxide thin-film colors.',
    funFact: 'Bismuth was long believed to be stable, but undergoes alpha decay with a half-life of 20 quintillion years.',
  },
};

export function getElementVisualData(elementNumber: number, name: string, category: string): ElementVisualData {
  if (ELEMENT_VISUAL_MAP[elementNumber]) {
    return ELEMENT_VISUAL_MAP[elementNumber];
  }

  let defaultAppearance = 'Silvery-metallic crystalline solid produced in laboratory syntheses.';
  let defaultFact = `Element #${elementNumber} occupies a pivotal position in the periodic table, illustrating periodic quantum trends.`;

  if (category === 'lanthanide') {
    defaultAppearance = 'Bright silvery-gray rare-earth metal; ductile and tarnishes slowly in air.';
    defaultFact = 'Lanthanide contraction pulls the 4f electron cloud inward, making third-row transition metals unexpectedly dense.';
  } else if (category === 'actinide') {
    defaultAppearance = 'Dense radioactive silvery actinide metal requiring controlled vacuum containment.';
    defaultFact = 'Exhibits complex multivalent redox behavior and relativistic valence electron expansion.';
  } else if (category === 'transition-metal') {
    defaultAppearance = 'Hard, lustrous transition metal with high melting point and variable oxidation states.';
    defaultFact = 'Unpaired d-electrons allow transition metals to form vivid colored coordination complexes.';
  } else if (category === 'post-transition') {
    defaultAppearance = 'Soft, ductile post-transition metal with low melting point and moderate electronegativity.';
    defaultFact = 'Exhibits the relativistic inert pair effect, stabilizing lower oxidation states.';
  } else if (elementNumber > 103) {
    defaultAppearance = 'Superheavy synthetic transactinide synthesized atom-by-atom in heavy-ion particle accelerators.';
    defaultFact = 'Explored by nuclear physicists probing the elusive "Island of Stability".';
  }

  return {
    imageUrl: `https://images-of-elements.com/${name.toLowerCase()}.jpg`,
    appearance: defaultAppearance,
    funFact: defaultFact,
  };
}
