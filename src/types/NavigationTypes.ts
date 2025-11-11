// src/types/NavigationTypes.ts
import { MenuItem } from './MenuItem';

export type RootStackParamList = {
  Home: undefined;
  AddMenu: undefined;
  Filter: { course: MenuItem['course'] };
  Menu: undefined;
};