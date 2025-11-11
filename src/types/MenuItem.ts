// src/types/MenuItem.ts
export type CourseType = 'Starters' | 'Mains' | 'Desserts';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  course: CourseType;
};