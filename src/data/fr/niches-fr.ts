import type { ArrondissementData } from './paris'

export type NicheSlugFr =
  | 'boulangerie'
  | 'cafe'
  | 'restaurant'
  | 'coiffeur'
  | 'kebab'
  | 'pizzeria'
  | 'glacier'
  | 'fleuriste'
  | 'salle-de-sport'
  | 'institut-de-beaute'

export type FomoKeyFr = keyof ArrondissementData['fomoCount']

export interface NicheDataFr {
  slug: NicheSlugFr
  fomoKey: FomoKeyFr
  label: string
  emoji: string
  seoTitle: string        // uses tokens {arr} and {cp}
  seoDescription: string  // uses {arr}
  heroCopy: {
    eyebrow: string
    headlineLight: string
    headlineBold: string
    bodyText: string
    fomoText: string
    ctaLabel: string
  }
  arguments: Array<{ icon: string; title: string; desc: string }>
}

export const nichesFr: NicheDataFr[] = [
  {
    slug: 'boulangerie',
    fomoKey: 'boulangerie',
    label: 'Boulangerie',
    emoji: '🥖',
    seoTitle: 'Carte de fidélité pour boulangerie à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre boulangerie à {arr}. Carte dématérialisée dans Apple & Google Wallet, sans application à télécharger. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Boulangeries à {arr}',
      headlineLight: 'Fidélisez vos clients du matin.',
      headlineBold: 'Votre boulangerie à {arr}.',
      bodyText: 'Chaque matin, vos clients choisissent leur boulangerie par habitude. Faites de votre établissement leur premier réflexe — avec une carte de fidélité numérique directement dans leur smartphone, sans aucune application à télécharger.',
      fomoText: '{fomoCount} boulangeries à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '🥐',
        title: 'L\'effet "Plus qu\'un tampon"',
        desc: 'Vos clients voient : "Plus qu\'un tampon avant ma baguette offerte." Ils traversent le quartier pour venir chez vous — pas chez le concurrent.',
      },
      {
        icon: '📱',
        title: 'Visible chaque matin',
        desc: 'Votre logo sur l\'écran de verrouillage de vos clients. Apple Wallet & Google Wallet, sans téléchargement, sans inscription.',
      },
      {
        icon: '📣',
        title: 'Promotions directes',
        desc: 'Nouvelle fournée, offre du week-end, galette des rois ? Envoyez une notification push à vos habitués en quelques secondes.',
      },
    ],
  },
  {
    slug: 'cafe',
    fomoKey: 'cafe',
    label: 'Café / Salon de thé',
    emoji: '☕',
    seoTitle: 'Carte de fidélité pour café à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre café ou salon de thé à {arr}. Fidélisez vos habitués avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Cafés & salons de thé à {arr}',
      headlineLight: 'Plus de clients réguliers.',
      headlineBold: 'Votre café à {arr}.',
      bodyText: 'La fidélisation client est le premier levier de rentabilité pour un café. Avec une carte de fidélité numérique dans le Wallet de vos clients, transformez chaque passage en visite régulière — sans papier, sans application.',
      fomoText: '{fomoCount} cafés à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '📱',
        title: 'Toujours dans la poche',
        desc: 'Apple Wallet & Google Wallet, préinstallés sur tous les smartphones. Vos clients sauvegardent leur carte en quelques secondes, sans créer de compte.',
      },
      {
        icon: '🔔',
        title: 'Notifications push',
        desc: 'Nouveau menu, happy hour, événement du soir ? Vos habitués reçoivent votre message directement sur leur écran de verrouillage.',
      },
      {
        icon: '📊',
        title: 'Statistiques en temps réel',
        desc: 'Suivez le nombre de cartes actives, la fréquence de visite et les récompenses échangées — depuis votre tableau de bord.',
      },
    ],
  },
  {
    slug: 'restaurant',
    fomoKey: 'restaurant',
    label: 'Restaurant',
    emoji: '🍽️',
    seoTitle: 'Carte de fidélité pour restaurant à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre restaurant à {arr}. Remplissez vos tables avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Restaurants à {arr}',
      headlineLight: 'Des tables pleines.',
      headlineBold: 'Des habitués à {arr}.',
      bodyText: 'Des centaines de restaurants se disputent les mêmes clients à {arr}. Faites revenir les vôtres avec un programme de fidélité dématérialisé, directement dans leur smartphone — sans application à télécharger, sans carte papier à perdre.',
      fomoText: '{fomoCount} restaurants à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '🤝',
        title: 'Aucune application pour vos clients',
        desc: 'Apple Wallet & Google Wallet sont préinstallés sur chaque smartphone. Vos clients ajoutent leur carte fidélité en deux secondes, depuis votre caisse ou un QR code.',
      },
      {
        icon: '🔔',
        title: 'Remplissez vos créneaux creux',
        desc: 'Menu du jour, formule déjeuner, soirée à thème ? Envoyez une notification push à vos habitués et remplissez vos tables aux heures creuses.',
      },
      {
        icon: '📊',
        title: 'Fidélisation mesurable',
        desc: 'Suivez en temps réel combien de clients reviennent, combien de récompenses ont été échangées, et identifiez vos meilleurs habitués.',
      },
    ],
  },
  {
    slug: 'coiffeur',
    fomoKey: 'coiffeur',
    label: 'Coiffeur',
    emoji: '💈',
    seoTitle: 'Carte de fidélité pour coiffeur à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre salon de coiffure à {arr}. Fidélisez vos clients récurrents avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Coiffeurs & barbiers à {arr}',
      headlineLight: 'Agenda complet.',
      headlineBold: 'Votre salon à {arr}.',
      bodyText: 'Vos clients reviennent toutes les 4 à 6 semaines. Avec une carte de fidélité numérique dans leur Wallet, assurez-vous qu\'ils pensent à vous avant tout autre salon du quartier — sans inscription, sans application.',
      fomoText: '{fomoCount} coiffeurs à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '💇',
        title: '6 coupes, la 7e offerte',
        desc: 'Vos clients cumulent leurs visites et reçoivent leur prochaine coupe en cadeau. Simple, juste, et bien plus efficace qu\'une carte tampon en papier.',
      },
      {
        icon: '🔔',
        title: 'Rappel de prise de rendez-vous',
        desc: '"Il est temps pour une nouvelle coupe ?" — une notification push au bon moment, directement sur l\'écran de vos clients. Sans appel téléphonique, sans SMS surtaxé.',
      },
      {
        icon: '📱',
        title: 'Sans application pour vos clients',
        desc: 'Apple Wallet & Google Wallet sont déjà installés sur leur téléphone. Ils sauvegardent votre carte de fidélité en quelques secondes.',
      },
    ],
  },
  {
    slug: 'kebab',
    fomoKey: 'kebab',
    label: 'Kebab',
    emoji: '🥙',
    seoTitle: 'Carte de fidélité pour kebab à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre kebab à {arr}. Devenez l\'adresse incontournable du quartier avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Kebabs à {arr}',
      headlineLight: 'Devenez l\'adresse du quartier.',
      headlineBold: 'Votre kebab à {arr}.',
      bodyText: 'Il y a des dizaines de kebabs à {arr}. Faites en sorte que vos clients reviennent toujours chez vous — avec une carte de fidélité numérique directement dans leur smartphone. Un regard sur leur téléphone, et c\'est votre enseigne qu\'ils choisissent.',
      fomoText: '{fomoCount} kebabs à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '🔥',
        title: 'L\'effet "Plus qu\'un kebab"',
        desc: 'Votre client a faim, il regarde son téléphone et voit : "Plus qu\'un kebab avant le gratuit." Il passe devant 3 autres adresses pour venir chez vous.',
      },
      {
        icon: '📱',
        title: 'Votre logo sur leur écran',
        desc: 'Votre enseigne visible chaque jour dans leur Wallet. Pas la concurrence — vous. Sans téléchargement, sans inscription pour vos clients.',
      },
      {
        icon: '📣',
        title: 'Contact direct avec vos habitués',
        desc: 'Nouveau sandwich, promotion du soir, fermeture exceptionnelle ? Envoyez une notification à tous vos clients fidèles en un clic.',
      },
    ],
  },
  {
    slug: 'pizzeria',
    fomoKey: 'pizzeria',
    label: 'Pizzeria',
    emoji: '🍕',
    seoTitle: 'Carte de fidélité pour pizzeria à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre pizzeria à {arr}. Plus de commandes régulières avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Pizzerias à {arr}',
      headlineLight: 'Plus de commandes.',
      headlineBold: 'Votre pizzeria à {arr}.',
      bodyText: 'La pizza, il y en a à tous les coins de rue à {arr}. Faites en sorte que vos clients commandent toujours chez vous — sur place ou à emporter — grâce à une carte de fidélité numérique dans leur Wallet.',
      fomoText: '{fomoCount} pizzerias à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '🍕',
        title: 'L\'effet "Plus qu\'une pizza"',
        desc: 'Votre client commande et voit : "Plus qu\'une pizza avant la gratuite." Il choisit votre pizzeria pour la prochaine commande — pas l\'application de livraison.',
      },
      {
        icon: '📱',
        title: 'Dans le Wallet, pas dans l\'oubli',
        desc: 'Votre logo sur l\'écran de verrouillage de vos clients. Apple & Google Wallet, sans téléchargement, sans inscription.',
      },
      {
        icon: '📣',
        title: 'Push sans algorithme',
        desc: 'Nouvelle pizza du moment, offre du week-end ? Un push direct sur le téléphone de vos habitués. Aucun réseau social pour filtrer votre message.',
      },
    ],
  },
  {
    slug: 'glacier',
    fomoKey: 'glacier',
    label: 'Glacier',
    emoji: '🍦',
    seoTitle: 'Carte de fidélité pour glacier à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre glacier à {arr}. Fidélisez vos clients avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Glaciers à {arr}',
      headlineLight: 'Chaque boule compte.',
      headlineBold: 'Votre glacier à {arr}.',
      bodyText: 'Avec une carte de fidélité numérique, vos clients reviennent toujours vers vous pour la prochaine glace — directement dans leur smartphone, sans papier, sans application à télécharger.',
      fomoText: '{fomoCount} glaciers à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '🍦',
        title: 'Chaque boule rapproche du cadeau',
        desc: 'Vos clients voient : "Plus que 2 tampons avant la glace offerte." Ils viennent chez vous — pas à la boulangerie d\'en face.',
      },
      {
        icon: '📱',
        title: 'Dans le Wallet, jamais perdu',
        desc: 'Votre logo visible sur leur écran. Apple & Google Wallet, préinstallés sur tous les smartphones. Aucun téléchargement requis.',
      },
      {
        icon: '📣',
        title: 'Push de saison',
        desc: 'Ouverture de saison, nouveaux parfums, happy hour estival ? Informez vos habitués directement sur leur téléphone.',
      },
    ],
  },
  {
    slug: 'fleuriste',
    fomoKey: 'fleuriste',
    label: 'Fleuriste',
    emoji: '💐',
    seoTitle: 'Carte de fidélité pour fleuriste à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre fleuriste à {arr}. Fidélisez vos clients réguliers avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Fleuristes à {arr}',
      headlineLight: 'Des clients qui reviennent.',
      headlineBold: 'Votre fleuriste à {arr}.',
      bodyText: 'Les occasions de s\'offrir ou d\'offrir des fleurs sont nombreuses — mais encore faut-il que vos clients pensent à votre boutique. Avec une carte de fidélité numérique dans leur Wallet, votre enseigne est toujours présente au bon moment.',
      fomoText: '{fomoCount} fleuristes à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '🌹',
        title: 'Rappel des occasions',
        desc: 'Saint-Valentin, fête des Mères, anniversaires... Envoyez une notification push à vos clients avant qu\'ils ne l\'oublient — et dirigez-les vers votre boutique.',
      },
      {
        icon: '📱',
        title: 'Votre enseigne dans leur poche',
        desc: 'Apple Wallet & Google Wallet, sans téléchargement. Votre carte fidélité visible en permanence, même quand ils ne cherchent pas encore.',
      },
      {
        icon: '🤝',
        title: 'Transformez les acheteurs ponctuels en habitués',
        desc: 'Un client qui achète pour un anniversaire peut devenir un habitué de chaque semaine. La carte de fidélité numérique crée ce lien naturellement.',
      },
    ],
  },
  {
    slug: 'salle-de-sport',
    fomoKey: 'salle_de_sport',
    label: 'Salle de sport',
    emoji: '🏋️',
    seoTitle: 'Carte de fidélité pour salle de sport à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre salle de sport à {arr}. Carte membre dans Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Salles de sport à {arr}',
      headlineLight: 'Plus de membres actifs.',
      headlineBold: 'Votre salle à {arr}.',
      bodyText: 'La carte membre numérique de votre salle directement dans le Wallet de vos adhérents. Fini les cartes plastique oubliées à la maison — votre accueil devient plus fluide, et vos membres restent engagés.',
      fomoText: '{fomoCount} salles de sport à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '📱',
        title: 'Carte membre numérique',
        desc: 'Fini les cartes plastique. Vos adhérents ont leur carte membre dans leur smartphone — Apple Wallet ou Google Wallet — toujours avec eux à l\'entraînement.',
      },
      {
        icon: '🔔',
        title: 'Réengagez les membres inactifs',
        desc: 'Nouveau planning de cours, événement sportif, promotion de renouvellement ? Une notification push ciblée pour ramener vos membres qui n\'ont pas pointé depuis quelques semaines.',
      },
      {
        icon: '📊',
        title: 'Mesurez l\'engagement',
        desc: 'Suivez en temps réel combien de membres sont actifs. Détectez la désaffection avant qu\'elle ne se transforme en résiliation.',
      },
    ],
  },
  {
    slug: 'institut-de-beaute',
    fomoKey: 'institut_de_beaute',
    label: 'Institut de beauté',
    emoji: '💅',
    seoTitle: 'Carte de fidélité pour institut de beauté à {arr} ({cp}) – 90 jours offerts | bonuskarte.digital',
    seoDescription: 'Programme de fidélité numérique pour votre institut de beauté à {arr}. Fidélisez vos clientes avec Apple & Google Wallet, sans application. 90 jours gratuits.',
    heroCopy: {
      eyebrow: 'Instituts de beauté à {arr}',
      headlineLight: 'Des clientes fidèles.',
      headlineBold: 'Votre institut à {arr}.',
      bodyText: 'Vos clientes reviennent régulièrement — soin du visage, épilation, onglerie. Récompensez cette fidélité avec une carte de fidélité numérique élégante, directement dans leur Wallet, sans application à télécharger.',
      fomoText: '{fomoCount} instituts de beauté à {arr} l\'utilisent déjà.',
      ctaLabel: 'Tester 90 jours gratuitement',
    },
    arguments: [
      {
        icon: '💆',
        title: 'Récompensez la régularité',
        desc: 'Après X soins, votre cliente reçoit un soin offert. Un programme de fidélité qui valorise vos meilleures clientes et encourage les autres à revenir plus souvent.',
      },
      {
        icon: '🔔',
        title: 'Rappel de rendez-vous personnalisé',
        desc: '"Il est temps pour votre prochain soin" — une notification push au moment idéal. Vos plannings se remplissent naturellement, sans relance manuelle.',
      },
      {
        icon: '📱',
        title: 'Une image premium, zéro friction',
        desc: 'Apple Wallet & Google Wallet, sans téléchargement. Une carte fidélité sobre et élégante à l\'image de votre institut, que vos clientes partagent naturellement.',
      },
    ],
  },
]

export function getNicheFr(slug: string): NicheDataFr | undefined {
  return nichesFr.find(n => n.slug === slug)
}
