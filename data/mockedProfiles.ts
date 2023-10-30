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
    avatar: 'https://i.imgur.com/FsJuOEK.png',
    is_paused: false,
    is_owner: true,
    account_id: 1,
    homeId: 1,
  },
  {
    id: 2,
    name: 'Alice',
    avatar: 'https://i.imgur.com/mqPUGcs.png',
    is_paused: false,
    is_owner: false,
    account_id: 2,
    homeId: 1,
  },
];

export { Profile as Profile, mockedProfile };
