interface Profile {
  id: number;
  name: string;
  avatar: string;
  is_paused: boolean;
  is_owner: boolean;
  account_id: number;
  homeId: number;
}

const mockedProfile: Profile[] = [
  {
    id: 1,
    name: 'John',
    avatar: 'https://i.imgur.com/FsJuOEK.png', // fox
    is_paused: false,
    is_owner: true,
    account_id: 1,
    homeId: 1,
  },
  {
    id: 2,
    name: 'Alice',
    avatar: 'https://i.imgur.com/mqPUGcs.png', // chicken
    is_paused: false,
    is_owner: false,
    account_id: 2,
    homeId: 1,
  },
  {
    id: 3,
    name: 'Bob',
    avatar: 'https://i.imgur.com/pBldNOp.png', // whale
    is_paused: false,
    is_owner: false,
    account_id: 3,
    homeId: 1,
  },
  {
    id: 4,
    name: 'Maya',
    avatar: 'https://i.imgur.com/tpoiEFR.png', // frog
    is_paused: false,
    is_owner: false,
    account_id: 4,
    homeId: 1,
  },
  {
    id: 5,
    name: 'April',
    avatar: 'https://i.imgur.com/vM8r642.png', // octopus
    is_paused: false,
    is_owner: false,
    account_id: 5,
    homeId: 1,
  },
  // {
  //   id: 6,
  //   name: 'Michael',
  //   avatar: 'https://i.imgur.com/vpITU1P.png', // pig
  //   is_paused: false,
  //   is_owner: true,
  //   account_id: 6, //Avmarkera en så man testa joina homeId 1 med pig avatar
  //   homeId: 1,
  // },
];

export { Profile, mockedProfile };
