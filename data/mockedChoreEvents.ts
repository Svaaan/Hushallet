interface ChoreEvent {
  id: number;
  user_id: number;
  chore_id: number;
  date: Date;
}

const mockChoreEvents: ChoreEvent[] = [
  {
    id: 1,
    user_id: 1,
    chore_id: 1,
    date: new Date('2023-10-16'),
  },
  {
    id: 2,
    user_id: 2,
    chore_id: 2,
    date: new Date('2023-10-16'),
  },
  {
    id: 3,
    user_id: 3,
    chore_id: 3,
    date: new Date('2023-10-17'),
  },
  {
    id: 4,
    user_id: 4,
    chore_id: 4,
    date: new Date('2023-10-16'),
  },
  {
    id: 5,
    user_id: 5,
    chore_id: 6,
    date: new Date('2023-10-18'),
  },
  {
    id: 6,
    user_id: 6,
    chore_id: 6,
    date: new Date('2023-10-18'),
  },
  {
    id: 7,
    user_id: 1,
    chore_id: 5,
    date: new Date('2023-10-21'),
  },
  {
    id: 8,
    user_id: 4,
    chore_id: 7,
    date: new Date('2023-10-21'),
  },
];

export { ChoreEvent, mockChoreEvents };
