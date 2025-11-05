// src/data/MenuData.ts
import { MenuItem } from '../../types/MenuItem';

/**
 * Simple global data store for menu items.
 * Provides:
 *  - getAll()
 *  - add(item)
 *  - remove(id)
 *  - subscribe(fn) / unsubscribe(fn)
 *
 * Uses in-memory array (will not persist after app restart).
 */

type Listener = (items: MenuItem[]) => void;

const items: MenuItem[] = [];

// simple id generator (no external uuid dependency)
const genId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const listeners = new Set<Listener>();

export default {
  getAll(): MenuItem[] {
    return [...items];
  },

  add(item: Omit<MenuItem, 'id'>): MenuItem {
    const newItem: MenuItem = { id: genId(), ...item };
    items.push(newItem);
    listeners.forEach((l) => l([...items]));
    return newItem;
  },

  remove(id: string) {
    const idx = items.findIndex((i) => i.id === id);
    if (idx >= 0) {
      items.splice(idx, 1);
      listeners.forEach((l) => l([...items]));
      return true;
    }
    return false;
  },

  clear() {
    items.length = 0;
    listeners.forEach((l) => l([...items]));
  },

  subscribe(fn: Listener) {
    listeners.add(fn);
    // send current state immediately
    fn([...items]);
  },

  unsubscribe(fn: Listener) {
    listeners.delete(fn);
  },
};
