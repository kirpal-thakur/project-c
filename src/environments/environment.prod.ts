export const environment = {
    production: true,
    targetDomain: {
      domain: 'ch' 
    },
    roles: [
      { role: "Admin", id: 1 },
      { role: "Club", id: 2 },
      { role: "Scout", id: 3 },
      { role: "Player", id: 4 },
    ],
    langs: [
      { language: 'English', slug: "en", id: 1 },
      { language: 'German', slug: "de", id: 2 },
      { language: 'Italian', slug: "it", id: 3 },
      { language: 'French', slug: "fr", id: 4 },
      { language: 'Spanish', slug: "es", id: 5 },
      { language: 'Portuguese', slug: "pt", id: 6 },
      { language: 'Danish', slug: "da", id: 7 },
      { language: 'Swedish', slug: "sv", id: 8 },
    ],
    domains: [
      { name: 'Switzerland', slug: "ch", id: 1 },
      { name: 'German', slug: "de", id: 2 },
      { name: 'Italy', slug: "it", id: 3 },
      { name: 'Frensh Republic', slug: "fr", id: 4 },
      { name: 'United Kingdom', slug: "uk", id: 5 },
      { name: 'Estonia, Eswatini', slug: "es", id: 6 },
      { name: 'Portugal', slug: "pt", id: 7 },
      { name: 'Belgium', slug: "be", id: 8 },
      { name: 'Denmark', slug: "dk", id: 9 },
      { name: 'Sweden', slug: "se", id: 10 },
    ],
    apiUrl: 'https://api.socceryou.ch/api/'
  } as const;
  