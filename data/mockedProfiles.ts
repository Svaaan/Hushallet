interface Profile {
  id: number;
  name: string;
  avatar: string;
  is_paused: boolean;
  is_owner: boolean;
  account_id: number;
}

const mockedProfile: Profile[] = [
  {
    id: 1,
    name: 'John',
    avatar: require('../avatars/fox.png'),
    is_paused: false,
    is_owner: false,
    account_id: 1,
  },
  {
    id: 2,
    name: 'Alice',
    avatar: require('../avatars/chick.png'),
    is_paused: false,
    is_owner: false,
    account_id: 2,
  },
  {
    id: 3,
    name: 'Bob',
    avatar: require('../avatars/whale.png'),
    is_paused: false,
    is_owner: false,
    account_id: 3,
  },
  {
    id: 4,
    name: 'Maya',
    avatar: require('../avatars/frog.png'),
    is_paused: false,
    is_owner: false,
    account_id: 4,
  },
  {
    id: 5,
    name: 'April',
    avatar: require('../avatars/octopus.png'),
    is_paused: false,
    is_owner: false,
    account_id: 5,
  },
  {
    id: 6,
    name: 'Michael',
    avatar: require('../avatars/pig.png'),
    is_paused: false,
    is_owner: true,
    account_id: 6,
  },
];

export { Profile as Profile, mockedProfile };
