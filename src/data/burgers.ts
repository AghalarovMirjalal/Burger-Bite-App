import type { ImageSourcePropType } from 'react-native';

export const images = {
  flying: require('../../assets/images/burger-flying.png'),
  bacon: require('../../assets/images/burger-bacon.png'),
  chicken: require('../../assets/images/burger-chicken.png'),
};

export const categories = ['All', 'Classic', 'Gourmet', 'Vegetarian', 'Spicy'] as const;
export type Category = (typeof categories)[number];

export interface Burger {
  id: string;
  name: string;
  short: string;
  description: string;
  category: Exclude<Category, 'All'>;
  price: number;
  rating: number;
  popular?: boolean;
  image: ImageSourcePropType;
}

export const burgers: Burger[] = [
  {
    id: 'big-bang',
    name: 'Big Bang Burger',
    short: 'Chicken with cheese',
    description:
      'Grilled chicken thigh stacked on a beef patty with crispy bacon, cheddar, lettuce, tomato and our smoky house sauce. The one you come back for.',
    category: 'Gourmet',
    price: 239,
    rating: 4.8,
    popular: true,
    image: images.chicken,
  },
  {
    id: 'garden-gourmet',
    name: 'Garden Gourmet',
    short: 'With fresh veggies',
    description:
      'Savor our "Garden Gourmet," a vegetarian masterpiece with a succulent plant-based patty, topped with fresh veggies and served on artisan buns. Enjoy a flavor-packed, guilt-free experience!',
    category: 'Vegetarian',
    price: 539,
    rating: 4.6,
    popular: true,
    image: images.bacon,
  },
  {
    id: 'sunrise-special',
    name: 'Sunrise Special',
    short: 'Bacon and melted cheddar',
    description:
      'Our breakfast favourite all day long: juicy beef, crispy bacon, a thick slice of cheddar, tomato and lettuce on a toasted brioche bun.',
    category: 'Classic',
    price: 239,
    rating: 5,
    popular: true,
    image: images.bacon,
  },
  {
    id: 'firecracker',
    name: 'The Firecracker',
    short: 'Jalapeños and chili mayo',
    description:
      'A classic beef burger with a kick: jalapeños, pepper jack cheese, crispy onions and our signature chili mayo. Keep a drink close.',
    category: 'Classic',
    price: 539,
    rating: 4.5,
    image: images.bacon,
  },
  {
    id: 'avocado-bliss',
    name: 'Avocado Bliss',
    short: 'Avocado and swiss cheese',
    description:
      'Creamy smashed avocado, swiss cheese, rocket and pickled red onion on a grilled patty. Fresh, rich and surprisingly light.',
    category: 'Gourmet',
    price: 459,
    rating: 4.7,
    image: images.bacon,
  },
  {
    id: 'double-stack',
    name: 'Double Stack',
    short: 'Two patties, double cheese',
    description:
      'Two smashed beef patties, double cheddar, grilled chicken, bacon and pickles. For the days when one patty is simply not enough.',
    category: 'Gourmet',
    price: 629,
    rating: 4.9,
    popular: true,
    image: images.chicken,
  },
  {
    id: 'inferno-melt',
    name: 'Inferno Melt',
    short: 'Ghost pepper sauce',
    description:
      'Beef patty, ghost pepper sauce, melted cheddar and fire-roasted peppers. Only for the brave ones.',
    category: 'Spicy',
    price: 489,
    rating: 4.4,
    image: images.chicken,
  },
  {
    id: 'smoky-bbq',
    name: 'Smoky BBQ',
    short: 'BBQ sauce and onion rings',
    description:
      'Flame-grilled beef with hickory BBQ sauce, crispy onion rings, bacon and cheddar on a sesame bun.',
    category: 'Classic',
    price: 359,
    rating: 4.3,
    image: images.chicken,
  },
  {
    id: 'mushroom-swiss',
    name: 'Mushroom Swiss',
    short: 'Plant patty and mushrooms',
    description:
      'Plant-based patty with sautéed garlic mushrooms, melted swiss and truffle mayo. Proof that veggie can be indulgent.',
    category: 'Vegetarian',
    price: 419,
    rating: 4.5,
    image: images.bacon,
  },
  {
    id: 'chili-crunch',
    name: 'Hot Chili Crunch',
    short: 'Crispy chicken, hot glaze',
    description:
      'Crispy fried chicken dipped in a sweet and hot chili glaze with slaw and pickles. Crunchy, sticky and spicy.',
    category: 'Spicy',
    price: 399,
    rating: 4.6,
    image: images.chicken,
  },
];

export const findBurger = (id: string) => burgers.find((b) => b.id === id);
