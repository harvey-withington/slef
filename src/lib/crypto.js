/**
 * Hashing function to turn a string (Template ID) into 4 integers for seeding
 * (cyrb128)
 */
function cyrb128(str) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [
    (h1 ^ h2 ^ h3 ^ h4) >>> 0,
    (h2 ^ h1) >>> 0,
    (h3 ^ h1) >>> 0,
    (h4 ^ h1) >>> 0,
  ];
}

/**
 * Simple Seeded RNG (Mulberry32)
 */
export function createRNG(seedStr) {
  // Mix the seed string into a number
  const seedParts = cyrb128(seedStr);
  let a = seedParts[0];

  // Return a function that returns 0..1
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Global fallback RNG (non-deterministic) if no seed provided
 */
const defaultRNG = () => Math.random();

/**
 * Generates a random integer between min and max (inclusive)
 * Uses provided RNG or defaults to Math.random
 */
export function randomInt(min, max, rng = defaultRNG) {
  const range = max - min + 1;
  return min + Math.floor(rng() * range);
}

/**
 * Shuffles an array using Fisher-Yates
 */
export function shuffleArray(array, rng = defaultRNG) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = randomInt(0, i, rng);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates a random alphanumeric string (for the ID itself)
 */
export function generateId(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    // Use secure random for the ID generation itself
    const bytes = new Uint32Array(1);
    window.crypto.getRandomValues(bytes);
    const idx = bytes[0] % chars.length;
    result += chars.charAt(idx);
  }
  return result;
}
