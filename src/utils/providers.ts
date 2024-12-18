type ProviderType = {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
  countries: {
    country: string;
    types: ('movie' | 'tv')[];
  }[];
};

export const PROVIDERS: ProviderType[] = [
  {
    display_priority: 5,
    logo_path: '/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg',
    provider_name: 'Netflix',
    provider_id: 8,
    countries: [
      { country: 'US', types: ['movie', 'tv'] },
      // { country: 'IN', types: ['movie', 'tv'] },
    ],
  },

  {
    display_priority: 27,
    logo_path: '/97yvRBw1GzX7fXprcF80er19ot.jpg',
    provider_name: 'Disney Plus',
    provider_id: 337,
    countries: [{ country: 'US', types: ['movie', 'tv'] }],
  },
  {
    display_priority: 9,
    logo_path: '/2E03IAZsX4ZaUqM7tXlctEPMGWS.jpg',
    provider_name: 'Apple TV Plus',
    provider_id: 350,
    countries: [
      { country: 'US', types: ['movie', 'tv'] },
      { country: 'IN', types: ['movie', 'tv'] },
    ],
  },
  {
    display_priority: 29,
    logo_path: '/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg',
    provider_name: 'Max',
    provider_id: 1899,
    countries: [{ country: 'US', types: ['movie', 'tv'] }],
  },
  {
    display_priority: 2,
    logo_path: '/qGXUKTheetVXYsSs9ehYLm7rzp8.jpg',
    provider_name: 'Amazon Prime Video',
    provider_id: 119,
    countries: [
      { country: 'IN', types: ['movie', 'tv'] },
      { country: 'US', types: ['movie', 'tv'] },
    ],
  },
  {
    display_priority: 19,
    logo_path: '/i7knsL0QgDJyuts5FbfjREUqHvu.jpg',
    provider_name: 'Alt Balaji',
    provider_id: 319,
    countries: [{ country: 'IN', types: ['movie', 'tv'] }],
  },
  {
    display_priority: 11,
    logo_path: '/3973zlBbBXdXxaWqRWzGG2GYxbT.jpg',
    provider_name: 'Sony Liv',
    provider_id: 237,
    countries: [{ country: 'IN', types: ['movie', 'tv'] }],
  },
  {
    display_priority: 7,
    logo_path: '/bxBlRPEPpMVDc4jMhSrTf2339DW.jpg',
    provider_name: 'Hulu',
    provider_id: 15,
    countries: [{ country: 'US', types: ['movie', 'tv'] }],
  },
  {
    display_priority: 36,
    logo_path: '/spcwROYevucLluqZZ8Fv75UuTBt.jpg',
    provider_name: 'The CW',
    provider_id: 83,
    countries: [{ country: 'US', types: ['movie', 'tv'] }],
  },

  {
    display_priority: 6,
    logo_path: '/boMYreJ9JWNDnXiHUfoix4oYhBc.jpg',
    provider_name: 'Jio Cinema',
    provider_id: 220,
    countries: [{ country: 'IN', types: ['movie', 'tv'] }],
  },
  {
    display_priority: 22,
    logo_path: '/ec3kgfQ6YXbT3AFRh8bkQZQFLb2.jpg',
    provider_name: 'ShemarooMe',
    provider_id: 474,
    countries: [{ country: 'IN', types: ['movie'] }],
  },
  {
    display_priority: 25,
    logo_path: '/eMTnWwNVtThkjvQA6zwxaoJG9NE.jpg',
    provider_name: 'Discovery+',
    provider_id: 510,
    countries: [{ country: 'IN', types: ['tv'] }],
  },
  {
    display_priority: 27,
    logo_path: '/ayHY6wKxvCKj2PU8eRPFxnPc6B0.jpg',
    provider_name: 'MX Player',
    provider_id: 515,
    countries: [{ country: 'IN', types: ['movie', 'tv'] }],
  },
  {
    display_priority: 2,
    logo_path: '/vPIW5b0ebTLj9bFCZypoBbF8wSl.jpg',
    provider_name: 'Zee5',
    provider_id: 232,
    countries: [{ country: 'IN', types: ['tv'] }],
  },
  {
    display_priority: 159,
    logo_path: '/8WerMI8XcZXqPpkHTZNtzMzousF.jpg',
    provider_name: 'aha',
    provider_id: 532,
    countries: [{ country: 'IN', types: ['movie', 'tv'] }],
  },
];
