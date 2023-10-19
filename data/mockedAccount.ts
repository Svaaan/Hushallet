interface Account {
    id: number;
    username: string;
    password: string;
    userId: number; // Reference to the corresponding user's ID
  }

  const mockedAccounts: Account[] = [
    {
      id: 1,
      username: 'JohnAccount',
      password: 'password123',
      userId: 1, // John's user ID
    },
    {
      id: 2,
      username: 'AliceAccount',
      password: 'alicePass',
      userId: 2, // Alice's user ID
    },
    {
      id: 3,
      username: 'BobAccount',
      password: 'bobPassword',
      userId: 3, // Bob's user ID
    },
    {
      id: 4,
      username: 'MayaAccount',
      password: 'mayaPass',
      userId: 4, // Maya's user ID
    },
  ];
  