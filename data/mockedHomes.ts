interface Home {
  id: number;
  name: string;
  owner_id: number;
  home_code: number;
}

const mockedHomes: Home[] = [
  {
    id: 1,
    name: 'Johns home',
    owner_id: 1,
    home_code: 123,
  },
];

export { Home, mockedHomes };
