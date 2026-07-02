import data6eme from './6eme/index.js';
import data5eme from './5eme/index.js';
import data4eme from './4eme/index.js';
import data3eme from './3eme/index.js';

export const LEVELS_REGISTRY = {
  '6eme': {
    id: '6eme',
    label: '6ème',
    emoji: '📘',
    sub: 'Entrée au collège',
    color: '#0891B2',
    light: '#ECFEFF',
    data: data6eme,
  },
  '5eme': {
    id: '5eme',
    label: '5ème',
    emoji: '📗',
    sub: '2e année de collège',
    color: '#059669',
    light: '#ECFDF5',
    data: data5eme,
  },
  '4eme': {
    id: '4eme',
    label: '4ème',
    emoji: '📙',
    sub: '3e année de collège',
    color: '#D97706',
    light: '#FFFBEB',
    data: data4eme,
  },
  '3eme': {
    id: '3eme',
    label: '3ème',
    emoji: '📕',
    sub: 'Préparation brevet',
    color: '#DC2626',
    light: '#FEF2F2',
    data: data3eme,
  },
};

export const DEFAULT_LEVEL = '4eme';

export function getLevelData(niveau) {
  const entry = LEVELS_REGISTRY[niveau] ?? LEVELS_REGISTRY[DEFAULT_LEVEL];
  return entry.data;
}

export function getLevelMeta(niveau) {
  return LEVELS_REGISTRY[niveau] ?? LEVELS_REGISTRY[DEFAULT_LEVEL];
}

export const LEVEL_IDS = Object.keys(LEVELS_REGISTRY);
