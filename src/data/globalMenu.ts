// globalMenu.ts – global array + functions (loops & arrays)
import { MenuItem } from '../types/MenuItem';

export let globalMenu: MenuItem[] = [];

// for-loop: average price per course (requirement 1)
export const averagePerCourse = (course: 'Starters' | 'Mains' | 'Desserts'): number => {
  const items = globalMenu.filter(i => i.course === course);
  if (items.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < items.length; i++) sum += items[i].price;
  return sum / items.length;
};

// function: add dish (requirement 4)
export const addDish = (dish: MenuItem): void => {
  globalMenu.push(dish);
};

// while-loop: remove first occurrence (requirement 2)
export const removeFirst = (id: string): void => {
  let i = 0;
  while (i < globalMenu.length) {
    if (globalMenu[i].id === id) {
      globalMenu.splice(i, 1);
      break;
    }
    i++;
  }
};