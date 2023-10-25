interface Account {
  id: number;
  username: string;
  password: string;
}

const mockedAccounts: Account[] = [
  {
    id: 1,
    username: 'JohnAccount',
    password: 'password123',
  },
  {
    id: 2,
    username: 'Alice',
    password: '123',
  },
  {
    id: 3,
    username: 'BobAccount',
    password: 'bobPassword',
  },
  {
    id: 4,
    username: 'MayaAccount',
    password: 'mayaPass',
  },
];

export { Account, mockedAccounts };
