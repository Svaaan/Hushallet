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
    username: 'BobAccount', //Ej kopplat till john home
    password: 'bobPassword', //Anslut eller skapa home med eller göra till owner
  },
  {
    id: 4,
    username: 'MayaAccount', //Ej kopplat till johnhome
    password: 'mayaPass', //Anslut eller skapa home med eller göra till owner
  },
];

export { Account, mockedAccounts };
