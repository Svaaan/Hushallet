interface User {
  id: number;
  name: string;
  avatar: string;
  is_paused: boolean;
  is_owner: boolean;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John',
    avatar: require('../avatars/fox.png'),
    is_paused: false,
    is_owner: false,
  },
  {
    id: 2,
    name: 'Alice',
    avatar: require('../avatars/chick.png'),
    is_paused: false,
    is_owner: false,
  },
  {
    id: 3,
    name: 'Bob',
    avatar: require('../avatars/whale.png'),
    is_paused: false,
    is_owner: false,
  },
  {
    id: 4,
    name: 'Maya',
    avatar: require('../avatars/frog.png'),
    is_paused: false,
    is_owner: false,
  },
  {
    id: 5,
    name: 'April',
    avatar: require('../avatars/octopus.png'),
    is_paused: false,
    is_owner: false,
  },
  {
    id: 6,
    name: 'Michael',
    avatar: require('../avatars/pig.png'),
    is_paused: false,
    is_owner: true,
  },
];

export { User, mockUsers };
