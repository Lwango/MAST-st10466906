// src/data/MenuData.ts
import { MenuItem } from '../types/MenuItem';

const initialItems: MenuItem[] = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons, caesar dressing',
    price: 8.5,
    course: 'Starters',
  },
  {
    id: '2',
    name: 'Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 15.99,
    course: 'Mains',
  },
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 9.99,
    course: 'Desserts',
  },
];

export const MenuData: MenuItem[] = [...initialItems];

export const addMenuItem = (item: MenuItem) => {
  MenuData.push(item);
};

export const removeMenuItem = (id: string) => {
  const index = MenuData.findIndex(item => item.id === id);
  if (index !== -1) {
    MenuData.splice(index, 1);
  }
};

export const getMenuItems = (): MenuItem[] => [...MenuData];