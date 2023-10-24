interface ChoreEvent {
  id: number;
  user_id: number;
  chore_id: number;
  date: Date;
}

const mockChoreEvents: ChoreEvent[] = [
  // Last Week
  {
    id: 1,
    user_id: 1,
    chore_id: 1,
    date: new Date('2023-10-19'),
  },
  {
    id: 2,
    user_id: 2,
    chore_id: 2,
    date: new Date('2023-10-19'),
  },
  {
    id: 3,
    user_id: 3,
    chore_id: 3,
    date: new Date('2023-10-19'),
  },
  {
    id: 4,
    user_id: 4,
    chore_id: 4,
    date: new Date('2023-10-20'),
  },
  {
    id: 5,
    user_id: 5,
    chore_id: 6,
    date: new Date('2023-10-20'),
  },
  {
    id: 6,
    user_id: 6,
    chore_id: 6,
    date: new Date('2023-10-20'),
  },
  {
    id: 7,
    user_id: 5,
    chore_id: 5,
    date: new Date('2023-10-21'),
  },
  {
    id: 8,
    user_id: 1,
    chore_id: 3,
    date: new Date('2023-10-19'),
  },
  {
    id: 9,
    user_id: 5,
    chore_id: 2,
    date: new Date('2023-10-19'),
  },
  {
    id: 10,
    user_id: 6,
    chore_id: 2,
    date: new Date('2023-10-20'),
  },
  {
    id: 10,
    user_id: 2,
    chore_id: 3,
    date: new Date('2023-10-20'),
  },
  {
    id: 11,
    user_id: 4,
    chore_id: 3,
    date: new Date('2023-10-21'),
  },
  // Current week
  {
    id: 12,
    user_id: 1,
    chore_id: 3,
    date: new Date('2023-10-24'),
  },
  {
    id: 13,
    user_id: 2,
    chore_id: 1,
    date: new Date('2023-10-25'),
  },
  {
    id: 14,
    user_id: 3,
    chore_id: 2,
    date: new Date('2023-10-23'),
  },
  {
    id: 15,
    user_id: 4,
    chore_id: 4,
    date: new Date('2023-10-24'),
  },
  {
    id: 16,
    user_id: 5,
    chore_id: 5,
    date: new Date('2023-10-25'),
  },
  {
    id: 17,
    user_id: 6,
    chore_id: 6,
    date: new Date('2023-10-26'),
  },
  {
    id: 18,
    user_id: 1,
    chore_id: 6,
    date: new Date('2023-10-26'),
  },
  // Month
  {
    id: 19,
    user_id: 1,
    chore_id: 3,
    date: new Date('2023-10-01'),
  },
  {
    id: 20,
    user_id: 2,
    chore_id: 1,
    date: new Date('2023-10-01'),
  },
  {
    id: 21,
    user_id: 3,
    chore_id: 2,
    date: new Date('2023-10-01'),
  },
  {
    id: 22,
    user_id: 4,
    chore_id: 4,
    date: new Date('2023-10-01'),
  },
  {
    id: 23,
    user_id: 5,
    chore_id: 5,
    date: new Date('2023-10-01'),
  },
  {
    id: 24,
    user_id: 6,
    chore_id: 6,
    date: new Date('2023-10-01'),
  },
  {
    id: 25,
    user_id: 1,
    chore_id: 6,
    date: new Date('2023-10-02'),
  },
];

export { ChoreEvent, mockChoreEvents };
