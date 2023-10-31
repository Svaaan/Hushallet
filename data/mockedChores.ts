interface Chore {
  id: number;
  home_id: number;
  name: string;
  description: string;
  chore_rating: number;
  interval: number;
}

const mockChores: Chore[] = [
  {
    id: 1,
    home_id: 1,
    name: 'Wash Dishes',
    description: 'Wash all the dirty dishes in the kitchen',
    chore_rating: 2,
    interval: 2,
  },
  {
    id: 2,
    home_id: 1,
    name: 'Mow the Lawn',
    description: 'Mow the front and backyard lawns',
    chore_rating: 4,
    interval: 7,
  },
  {
    id: 3,
    home_id: 1,
    name: 'Laundry',
    description: 'Do a load of laundry',
    chore_rating: 2,
    interval: 4,
  },
  {
    id: 4,
    home_id: 1,
    name: 'Cook Dinner',
    description: 'Cook todays dinner',
    chore_rating: 1,
    interval: 1,
  },
  {
    id: 5,
    home_id: 1,
    name: 'Dusting',
    description: 'Dust the furnitures',
    chore_rating: 8,
    interval: 5,
  },
  {
    id: 6,
    home_id: 1,
    name: 'Mopping',
    description: 'Mop the floor',
    chore_rating: 6,
    interval: 6,
  },
];

export { Chore, mockChores };
