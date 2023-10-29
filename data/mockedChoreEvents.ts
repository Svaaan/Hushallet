interface ChoreEvent {
  id: number;
  profile_id: number;
  chore_id: number;
  date: Date;
}

const mockChoreEvents: ChoreEvent[] = [
  // Last Week
  {
    id: 1,
    profile_id: 1,
    chore_id: 1,
    date: new Date('2023-10-19'),
  },
  {
    id: 2,
    profile_id: 2,
    chore_id: 2,
    date: new Date('2023-10-19'),
  },
  {
    id: 3,
    profile_id: 3,
    chore_id: 3,
    date: new Date('2023-10-19'),
  },
  {
    id: 4,
    profile_id: 4,
    chore_id: 4,
    date: new Date('2023-10-20'),
  },
  {
    id: 5,
    profile_id: 5,
    chore_id: 6,
    date: new Date('2023-10-20'),
  },
  {
    id: 6,
    profile_id: 6,
    chore_id: 6,
    date: new Date('2023-10-20'),
  },
  {
    id: 7,
    profile_id: 5,
    chore_id: 5,
    date: new Date('2023-10-21'),
  },
  {
    id: 8,
    profile_id: 1,
    chore_id: 3,
    date: new Date('2023-10-19'),
  },
  {
    id: 9,
    profile_id: 5,
    chore_id: 2,
    date: new Date('2023-10-19'),
  },
  {
    id: 10,
    profile_id: 6,
    chore_id: 2,
    date: new Date('2023-10-20'),
  },
  {
    id: 10,
    profile_id: 2,
    chore_id: 3,
    date: new Date('2023-10-20'),
  },
  {
    id: 11,
    profile_id: 4,
    chore_id: 3,
    date: new Date('2023-10-21'),
  },
  // Current week
  {
    id: 12,
    profile_id: 1,
    chore_id: 3,
    date: new Date('2023-10-24'),
  },
  {
    id: 13,
    profile_id: 2,
    chore_id: 1,
    date: new Date('2023-10-24'),
  },
  {
    id: 14,
    profile_id: 3,
    chore_id: 2,
    date: new Date('2023-10-23'),
  },
  {
    // denna är overdue och bör markeras RÖD.
    id: 15,
    profile_id: 4,
    chore_id: 4,
    date: new Date('2023-10-24'),
  },
  {
    id: 16,
    profile_id: 5,
    chore_id: 5,
    date: new Date('2023-10-25'),
  },
  {
    id: 17,
    profile_id: 4,
    chore_id: 3,
    date: new Date('2023-10-27'),
  },
  {
    id: 18,
    profile_id: 3,
    chore_id: 6,
    date: new Date('2023-10-27'),
  },
  // Month
  {
    id: 19,
    profile_id: 1,
    chore_id: 3,
    date: new Date('2023-10-01'),
  },
  {
    id: 20,
    profile_id: 2,
    chore_id: 1,
    date: new Date('2023-10-01'),
  },
  {
    id: 21,
    profile_id: 3,
    chore_id: 2,
    date: new Date('2023-10-01'),
  },
  {
    id: 22,
    profile_id: 4,
    chore_id: 4,
    date: new Date('2023-10-01'),
  },
  {
    id: 23,
    profile_id: 5,
    chore_id: 5,
    date: new Date('2023-10-01'),
  },
  {
    id: 24,
    profile_id: 6,
    chore_id: 6,
    date: new Date('2023-10-01'),
  },
  {
    id: 25,
    profile_id: 1,
    chore_id: 6,
    date: new Date('2023-10-02'),
  },
  // Year
  {
    id: 26,
    profile_id: 4,
    chore_id: 3,
    date: new Date('2023-09-01'),
  },
  {
    id: 27,
    profile_id: 5,
    chore_id: 1,
    date: new Date('2023-09-01'),
  },
  {
    id: 28,
    profile_id: 1,
    chore_id: 2,
    date: new Date('2023-09-01'),
  },
  {
    id: 29,
    profile_id: 2,
    chore_id: 4,
    date: new Date('2023-09-01'),
  },
  {
    id: 30,
    profile_id: 6,
    chore_id: 5,
    date: new Date('2023-09-01'),
  },
  {
    id: 31,
    profile_id: 3,
    chore_id: 6,
    date: new Date('2023-09-01'),
  },
  {
    id: 32,
    profile_id: 4,
    chore_id: 6,
    date: new Date('2023-09-02'),
  },
];

export { ChoreEvent, mockChoreEvents };
