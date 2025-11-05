export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: 'Starters' | 'Mains' | 'Desserts';
  price: number;
}