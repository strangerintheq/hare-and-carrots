const MAP_SEED_KEY = 'hare-seed';

export function getSeed() {
    let seed = localStorage.getItem(MAP_SEED_KEY);
    if (!seed)
        seed = Math.random().toString(36).substring(2);
    localStorage.setItem(MAP_SEED_KEY, seed);
    return seed;
}

export function clearSeed() {
    localStorage.removeItem(MAP_SEED_KEY)
}