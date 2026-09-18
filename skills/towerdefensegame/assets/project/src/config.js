const response = await fetch(new URL('../game-config.json', import.meta.url));
if (!response.ok) throw new Error('Game config failed: '+response.status);
export const CONFIG = await response.json();
