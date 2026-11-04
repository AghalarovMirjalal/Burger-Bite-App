import type { Burger } from '../types/burger';
import { burgerImage } from '../constants/images';

export const burgers: Burger[] = [
  {
    id: '1',
    name: 'Classic Bite',
    description: 'Beef patty, cheddar, lettuce',
    price: 9.99,
    image: burgerImage,
  },
  {
    id: '2',
    name: 'Double Cheese',
    description: 'Double patty, double cheddar',
    price: 12.99,
    image: burgerImage,
  },
];
