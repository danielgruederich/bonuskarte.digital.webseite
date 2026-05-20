export interface ArrondissementData {
  slug: string          // '1er', '2e' … '20e'
  name: string          // 'Paris 1er', 'Paris 11e'
  arrLong: string       // '1er arrondissement'
  cp: string            // postal code, e.g. '75001'
  quartiers: string     // 'Louvre, Châtelet, Les Halles'
  intro: string         // unique French intro (2-3 sentences)
  fomoCount: {
    boulangerie: number
    cafe: number
    restaurant: number
    coiffeur: number
    kebab: number
    pizzeria: number
    glacier: number
    fleuriste: number
    salle_de_sport: number
    institut_de_beaute: number
  }
}

// All values zero — new market, no fabricated counts
const zero = {
  boulangerie: 0,
  cafe: 0,
  restaurant: 0,
  coiffeur: 0,
  kebab: 0,
  pizzeria: 0,
  glacier: 0,
  fleuriste: 0,
  salle_de_sport: 0,
  institut_de_beaute: 0,
}

export const arrondissements: ArrondissementData[] = [
  {
    slug: '1er',
    name: 'Paris 1er',
    arrLong: '1er arrondissement',
    cp: '75001',
    quartiers: 'Louvre, Châtelet, Les Halles, Palais-Royal',
    intro: 'Au cœur de Paris, entre le Louvre et Les Halles, les boulangeries et cafés du 1er arrondissement accueillent chaque jour une clientèle mêlant touristes et habitués du quartier. Pour les commerçants locaux, fidéliser cette clientèle de proximité est un enjeu quotidien — une carte de fidélité numérique, sans application à télécharger, offre la solution la plus simple pour transformer un passant en client régulier.',
    fomoCount: { ...zero },
  },
  {
    slug: '2e',
    name: 'Paris 2e',
    arrLong: '2e arrondissement',
    cp: '75002',
    quartiers: 'Sentier, Bourse, Montorgueil',
    intro: 'Le 2e arrondissement, dominé par le quartier du Sentier et la rue Montorgueil, est l\'un des secteurs les plus animés de Paris pour la restauration et le commerce de bouche. Les restaurateurs et coiffeurs de ce quartier dense bénéficient d\'un flux de clientèle important, mais la fidélisation reste le vrai levier de rentabilité — et une carte de fidélité numérique permet de l\'activer sans effort supplémentaire pour le commerçant.',
    fomoCount: { ...zero },
  },
  {
    slug: '3e',
    name: 'Paris 3e',
    arrLong: '3e arrondissement',
    cp: '75003',
    quartiers: 'Haut Marais, Arts et Métiers, Temple',
    intro: 'Le 3e arrondissement, avec le Haut Marais et le quartier des Arts et Métiers, attire une clientèle urbaine et fidèle aux commerces de quartier. Cafés branchés, instituts de beauté et fleuristes s\'y côtoient dans des rues animées où la récurrence des visites fait la différence — une carte de fidélité numérique, sans application, s\'adapte parfaitement à ce type de clientèle connectée et exigeante.',
    fomoCount: { ...zero },
  },
  {
    slug: '4e',
    name: 'Paris 4e',
    arrLong: '4e arrondissement',
    cp: '75004',
    quartiers: 'Le Marais, Île Saint-Louis, Beaubourg, Île de la Cité',
    intro: 'Le 4e arrondissement réunit le Marais historique, l\'Île Saint-Louis et les abords de Beaubourg, formant l\'un des quartiers les plus fréquentés de Paris. Les commerçants — glaciers, boulangeries, restaurants — y font face à une rotation élevée de visiteurs et doivent travailler activement à construire une clientèle locale fidèle grâce à des outils simples comme la carte de fidélité numérique.',
    fomoCount: { ...zero },
  },
  {
    slug: '5e',
    name: 'Paris 5e',
    arrLong: '5e arrondissement',
    cp: '75005',
    quartiers: 'Quartier Latin, Saint-Michel, Mouffetard, Panthéon',
    intro: 'Le 5e arrondissement, cœur du Quartier Latin autour de la rue Mouffetard et de Saint-Michel, réunit une clientèle d\'étudiants, d\'enseignants et de riverains attachés à leurs commerces de proximité. Les cafés, pizzerias et kebabs de ce secteur ont tout à gagner à fidéliser cette clientèle régulière avec une carte de fidélité numérique qui fonctionne directement depuis le smartphone, sans téléchargement.',
    fomoCount: { ...zero },
  },
  {
    slug: '6e',
    name: 'Paris 6e',
    arrLong: '6e arrondissement',
    cp: '75006',
    quartiers: 'Saint-Germain-des-Prés, Odéon, Luxembourg, Montparnasse',
    intro: 'Le 6e arrondissement, avec Saint-Germain-des-Prés et le jardin du Luxembourg, est l\'un des quartiers les plus huppés et les plus fréquentés de Paris. Les boulangeries artisanales, les salons de coiffure haut de gamme et les instituts de beauté de ce secteur s\'appuient sur une clientèle de proximité fidèle — une carte de fidélité numérique renforce ce lien sans alourdir l\'expérience client.',
    fomoCount: { ...zero },
  },
  {
    slug: '7e',
    name: 'Paris 7e',
    arrLong: '7e arrondissement',
    cp: '75007',
    quartiers: 'Tour Eiffel, Invalides, Rue Cler, Gros-Caillou',
    intro: 'Le 7e arrondissement, entre la Tour Eiffel, les Invalides et la rue Cler, est un quartier résidentiel aisé où les commerçants de proximité jouissent d\'une clientèle stable et exigeante. Boulangeries, fleuristes et restaurants de quartier y construisent leur réputation sur la régularité — une carte de fidélité numérique consolide cette relation de confiance de manière discrète et efficace.',
    fomoCount: { ...zero },
  },
  {
    slug: '8e',
    name: 'Paris 8e',
    arrLong: '8e arrondissement',
    cp: '75008',
    quartiers: 'Champs-Élysées, Madeleine, Parc Monceau, Faubourg Saint-Honoré',
    intro: 'Le 8e arrondissement, dominé par les Champs-Élysées et le faubourg Saint-Honoré, concentre un mélange de touristes internationaux et de professionnels parisiens aux habitudes bien ancrées. Pour les cafés, salles de sport et restaurants qui cherchent à fidéliser leur clientèle locale face à un fort flux touristique, la carte de fidélité numérique est un outil de différenciation simple et sans friction.',
    fomoCount: { ...zero },
  },
  {
    slug: '9e',
    name: 'Paris 9e',
    arrLong: '9e arrondissement',
    cp: '75009',
    quartiers: 'Pigalle, Opéra, South Pigalle (SoPi), Grands Boulevards',
    intro: 'Le 9e arrondissement, entre l\'Opéra, Pigalle et les Grands Boulevards, est un quartier en pleine transformation où une nouvelle génération de cafés, de coiffeurs et d\'instituts de beauté s\'installe aux côtés des commerces historiques. Cette mixité de clientèles — résidents, professionnels, noctambules — rend la fidélisation d\'autant plus précieuse, et une carte de fidélité numérique permet de conserver ce lien au quotidien.',
    fomoCount: { ...zero },
  },
  {
    slug: '10e',
    name: 'Paris 10e',
    arrLong: '10e arrondissement',
    cp: '75010',
    quartiers: 'Canal Saint-Martin, République, Gare du Nord, Gare de l\'Est',
    intro: 'Le 10e arrondissement, animé par les bords du Canal Saint-Martin et le quartier République, est l\'un des plus vivants de Paris pour la restauration et la vie de quartier. Les kebabs, cafés et pizzerias de ce secteur cosmopolite disposent d\'une clientèle locale très régulière — et une carte de fidélité numérique, sans application à installer, est l\'outil idéal pour transformer chaque visite en engagement durable.',
    fomoCount: { ...zero },
  },
  {
    slug: '11e',
    name: 'Paris 11e',
    arrLong: '11e arrondissement',
    cp: '75011',
    quartiers: 'Bastille, Oberkampf, Charonne, Faubourg Saint-Antoine',
    intro: 'Le 11e arrondissement, de Bastille à Oberkampf, est l\'un des quartiers les plus denses et les plus animés de Paris, avec une offre de restauration et de services parmi les plus diversifiées de la capitale. Cafés, restaurants, coiffeurs et salles de sport s\'y disputent une clientèle de jeunes actifs fidèles à leurs adresses — une carte de fidélité numérique leur permet de consolider cette fidélité sans effort supplémentaire.',
    fomoCount: { ...zero },
  },
  {
    slug: '12e',
    name: 'Paris 12e',
    arrLong: '12e arrondissement',
    cp: '75012',
    quartiers: 'Bercy, Nation, Gare de Lyon, Vincennes',
    intro: 'Le 12e arrondissement, étiré de la Gare de Lyon à Nation et aux portes du bois de Vincennes, est un quartier résidentiel et familial où les commerçants locaux s\'appuient sur une clientèle de voisinage solide. Boulangeries, instituts de beauté et restaurants de quartier y trouvent dans la carte de fidélité numérique un moyen concret de récompenser la régularité et de renforcer l\'attachement à leur enseigne.',
    fomoCount: { ...zero },
  },
  {
    slug: '13e',
    name: 'Paris 13e',
    arrLong: '13e arrondissement',
    cp: '75013',
    quartiers: 'Gobelins, Butte-aux-Cailles, Quartier Chinois, Olympiades',
    intro: 'Le 13e arrondissement, entre la Butte-aux-Cailles, le quartier des Olympiades et le nouveau Paris des Gobelins, est l\'un des arrondissements les plus diversifiés de la capitale. Les restaurateurs et commerçants — qu\'ils tiennent un glacier, une boulangerie ou un salon de coiffure — y font face à une concurrence forte et misent sur la fidélisation pour assurer leur stabilité : la carte de fidélité numérique y est un atout immédiat.',
    fomoCount: { ...zero },
  },
  {
    slug: '14e',
    name: 'Paris 14e',
    arrLong: '14e arrondissement',
    cp: '75014',
    quartiers: 'Montparnasse, Denfert-Rochereau, Alésia, Pernety',
    intro: 'Le 14e arrondissement, avec Montparnasse, Denfert-Rochereau et le village de Pernety, est un arrondissement de caractère où les commerçants de proximité tiennent une place centrale dans la vie du quartier. Cafés, fleuristes et coiffeurs y cultivent une relation de longue date avec leurs clients — la carte de fidélité numérique est l\'extension naturelle de cette relation, sans rupture dans les habitudes.',
    fomoCount: { ...zero },
  },
  {
    slug: '15e',
    name: 'Paris 15e',
    arrLong: '15e arrondissement',
    cp: '75015',
    quartiers: 'Vaugirard, Convention, Grenelle, Front de Seine',
    intro: 'Le 15e arrondissement, le plus peuplé de Paris, offre aux commerçants un bassin de clientèle résidentielle exceptionnel. Des rues commerçantes de Convention à Grenelle, les boulangeries, pizzerias et salles de sport s\'adressent à des habitants du quartier qui y reviennent chaque jour — fidéliser cette clientèle captive avec une carte de fidélité numérique, c\'est maximiser chaque visite.',
    fomoCount: { ...zero },
  },
  {
    slug: '16e',
    name: 'Paris 16e',
    arrLong: '16e arrondissement',
    cp: '75016',
    quartiers: 'Trocadéro, Auteuil, Passy, Muette',
    intro: 'Le 16e arrondissement, entre le Trocadéro, Passy et Auteuil, est le quartier résidentiel aisé par excellence, avec une clientèle attachée à ses commerces de proximité et sensible à la qualité du service. Boulangeries artisanales, instituts de beauté et fleuristes y bâtissent leur réputation sur la durée — une carte de fidélité numérique sans application renforce discrètement cette fidélité et valorise chaque enseigne.',
    fomoCount: { ...zero },
  },
  {
    slug: '17e',
    name: 'Paris 17e',
    arrLong: '17e arrondissement',
    cp: '75017',
    quartiers: 'Batignolles, Ternes, Épinettes, Plaine de Monceau',
    intro: 'Le 17e arrondissement réunit des ambiances très contrastées : le calme cossu des Ternes et de la Plaine de Monceau d\'un côté, le quartier vivant des Batignolles de l\'autre. Cette diversité de profils de clientèle est une richesse pour les commerçants — cafés, kebabs, coiffeurs — qui peuvent s\'appuyer sur une carte de fidélité numérique pour capter autant les habitués du quartier que les nouveaux arrivants.',
    fomoCount: { ...zero },
  },
  {
    slug: '18e',
    name: 'Paris 18e',
    arrLong: '18e arrondissement',
    cp: '75018',
    quartiers: 'Montmartre, Barbès, La Goutte d\'Or, Clignancourt',
    intro: 'Le 18e arrondissement, entre la butte Montmartre, Barbès et la Goutte d\'Or, est l\'un des arrondissements les plus populaires et les plus divers de Paris. Kebabs, boulangeries, restaurants et coiffeurs y servent une clientèle de proximité très régulière — dans ce quartier à forte densité commerciale, une carte de fidélité numérique est le levier le plus direct pour convertir des clients occasionnels en habitués.',
    fomoCount: { ...zero },
  },
  {
    slug: '19e',
    name: 'Paris 19e',
    arrLong: '19e arrondissement',
    cp: '75019',
    quartiers: 'Buttes-Chaumont, La Villette, Stalingrad, Belleville',
    intro: 'Le 19e arrondissement, autour des Buttes-Chaumont, de La Villette et de Belleville, est un arrondissement en pleine mutation où une scène commerciale dynamique émerge aux côtés de commerces de proximité ancrés de longue date. Les cafés, restaurants et salles de sport qui s\'y installent ont tout intérêt à construire leur clientèle fidèle dès le départ — la carte de fidélité numérique est l\'outil idéal pour y parvenir sans friction.',
    fomoCount: { ...zero },
  },
  {
    slug: '20e',
    name: 'Paris 20e',
    arrLong: '20e arrondissement',
    cp: '75020',
    quartiers: 'Belleville, Ménilmontant, Père-Lachaise, Gambetta',
    intro: 'Le 20e arrondissement, de Belleville à Ménilmontant et aux abords du Père-Lachaise, est l\'un des arrondissements les plus attachants de Paris pour son mélange de cultures et son esprit de village. Les commerçants — pizzerias, glaciers, instituts de beauté — y bénéficient d\'une clientèle locale très fidèle par nature, et une carte de fidélité numérique, sans application à télécharger, est la façon la plus naturelle de cultiver cet attachement.',
    fomoCount: { ...zero },
  },
]

export function getArrondissement(slug: string): ArrondissementData | undefined {
  return arrondissements.find(a => a.slug === slug.toLowerCase())
}

// Fallback for unknown arrondissement
export const fallbackArrondissement: ArrondissementData = {
  slug: 'paris',
  name: 'Paris',
  arrLong: 'Paris',
  cp: '75000',
  quartiers: 'Paris',
  intro: 'Paris compte plus de 40 000 commerces de proximité — boulangeries, cafés, coiffeurs, restaurants — qui s\'appuient sur la fidélité de leur clientèle pour prospérer. Une carte de fidélité numérique, sans application à télécharger, est aujourd\'hui l\'outil le plus simple pour fidéliser ses clients et augmenter leur fréquence de visite.',
  fomoCount: { ...zero },
}
