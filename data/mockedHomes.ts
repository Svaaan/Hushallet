interface Home {
  id: number;
  name: string;
  profile_id: number;
  home_code: number;
}

const mockedHomes: Home[] = [
  {
    id: 1,
    name: 'Johns home',
    profile_id: 1,
    home_code: 123,
  },
  {
    id: 1,
    name: 'Johns home',
    profile_id: 2,
    home_code: 123,
  },
];

export { Home, mockedHomes };
