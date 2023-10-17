interface User {
  id: number;
  name: string;
  code: number;
  is_paused: boolean;
  claimedChores: number[];
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John',
    code: 12345,
    is_paused: false,
    claimedChores: [],
  },
  {
    id: 2,
    name: 'Alice',
    code: 67890,
    is_paused: false,
    claimedChores: [],
  },
  {
    id: 3,
    name: 'Bob',
    code: 54321,
    is_paused: false,
    claimedChores: [],
  },
  {
    id: 4,
    name: 'Maya',
    code: 94325,
    is_paused: false,
    claimedChores: [],
  },
];

export { User, mockUsers };
