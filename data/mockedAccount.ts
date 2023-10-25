interface Account {
  id: number;
  username: string;
  password: string;
  userId: number;
}

const mockedAccounts: Account[] = [
  {
    id: 1,
    username: 'JohnAccount',
    password: 'password123',
    userId: 1,
  },
  {
    id: 2,
    username: 'AliceAccount',
    password: 'alicePass',
    userId: 2,
  },
  {
    id: 3,
    username: 'BobAccount',
    password: 'bobPassword',
    userId: 3,
  },
  {
    id: 4,
    username: 'MayaAccount',
    password: 'mayaPass',
    userId: 4,
  },
];

export { Account, mockedAccounts };
