interface Home {
  id: number;
  name: string;
  home_code: number;
}

const mockedHomes: Home[] = [
  {
    id: 1,
    name: 'Johns home',
    // profile_id: 1,
    home_code: 123,
  },
];

export { Home, mockedHomes };
