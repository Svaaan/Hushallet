interface Chore {
  id: number;
  home_id: number;
  name: string;
  description: string;
  chore_rating: number;
  interval: number;
  imageUri?: string | null;
}

const mockChores: Chore[] = [
  {
    id: 1,
    home_id: 1,
    name: 'Diska',
    description: 'Sätta på diskmaskin och efteråt tömma den',
    chore_rating: 2,
    interval: 2,
  },
  {
    id: 2,
    home_id: 1,
    name: 'Klippa gräset',
    description: 'klippa gräset och trimma kanterna',
    chore_rating: 4,
    interval: 7,
  },
  {
    id: 3,
    home_id: 1,
    name: 'Tvätta',
    description: 'Tvätta kläder och hänga upp dem',
    chore_rating: 2,
    interval: 4,
  },
  {
    id: 4,
    home_id: 1,
    name: 'Laga mat',
    description: 'Laga mat och städa kökbänken efteråt',
    chore_rating: 1,
    interval: 1,
  },
  {
    id: 5,
    home_id: 1,
    name: 'Damma',
    description: 'Damma alla ytor',
    chore_rating: 8,
    interval: 5,
  },
  {
    id: 6,
    home_id: 1,
    name: 'Moppa',
    description: 'Moppa golven i hela huset',
    chore_rating: 6,
    interval: 6,
  },
];

export { Chore, mockChores };

