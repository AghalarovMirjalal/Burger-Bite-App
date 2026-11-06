export interface Deal {
  code: string;
  title: string;
  details: string;
  percent: number;
  minOrder: number;
  freeDelivery?: boolean;
}

export const deals: Deal[] = [
  {
    code: 'BITE10',
    title: '10% off your order',
    details: 'Works on any order, no minimum.',
    percent: 10,
    minOrder: 0,
  },
  {
    code: 'BIGBITE',
    title: '20% off from Rs 1000',
    details: 'Feeding the whole team? This one is for you.',
    percent: 20,
    minOrder: 1000,
  },
  {
    code: 'FREEDEL',
    title: 'Free delivery',
    details: 'Delivery fee is on us, whatever you order.',
    percent: 0,
    minOrder: 0,
    freeDelivery: true,
  },
];

export const locations = [
  { id: 'center', name: 'Burger Bite Center', address: '28 May street, 14', hours: '10:00 – 23:00', phone: '+994 12 555 01 01' },
  { id: 'park', name: 'Burger Bite Park Mall', address: 'Park Bulvar, 2nd floor', hours: '10:00 – 22:00', phone: '+994 12 555 02 02' },
  { id: 'port', name: 'Burger Bite Port', address: 'Neftchilar avenue, 151', hours: '11:00 – 01:00', phone: '+994 12 555 03 03' },
];
