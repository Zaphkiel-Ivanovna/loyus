export interface Brand {
  name: string;
  domain: string;
  color: string;
  category: string;
}

export const DEFAULT_BRANDS: Brand[] = [
  // Alimentaire
  { name: 'Carrefour', domain: 'carrefour.fr', color: '#004E9A', category: 'Alimentaire' },
  { name: 'E.Leclerc', domain: 'e-leclerc.com', color: '#005BAA', category: 'Alimentaire' },
  { name: 'Auchan', domain: 'auchan.fr', color: '#E4002B', category: 'Alimentaire' },
  { name: 'Intermarché', domain: 'intermarche.com', color: '#EC6726', category: 'Alimentaire' },
  { name: 'Lidl', domain: 'lidl.fr', color: '#0050AA', category: 'Alimentaire' },
  { name: 'Casino', domain: 'casino.fr', color: '#E30613', category: 'Alimentaire' },
  { name: 'Monoprix', domain: 'monoprix.fr', color: '#C8102E', category: 'Alimentaire' },
  { name: 'Picard', domain: 'picard.fr', color: '#003DA5', category: 'Alimentaire' },
  { name: 'Franprix', domain: 'franprix.fr', color: '#E4002B', category: 'Alimentaire' },
  { name: 'Biocoop', domain: 'biocoop.fr', color: '#8DC63F', category: 'Alimentaire' },

  // Électronique
  { name: 'FNAC', domain: 'fnac.com', color: '#E4A81D', category: 'Électronique' },
  { name: 'Darty', domain: 'darty.com', color: '#E4002B', category: 'Électronique' },
  { name: 'Boulanger', domain: 'boulanger.com', color: '#003DA5', category: 'Électronique' },

  // Sport
  { name: 'Decathlon', domain: 'decathlon.fr', color: '#0082C3', category: 'Sport' },
  { name: 'Nike', domain: 'nike.com', color: '#111111', category: 'Sport' },
  { name: 'Adidas', domain: 'adidas.com', color: '#000000', category: 'Sport' },

  // Beauté
  { name: 'Sephora', domain: 'sephora.fr', color: '#000000', category: 'Beauté' },
  { name: 'Yves Rocher', domain: 'yves-rocher.fr', color: '#006837', category: 'Beauté' },

  // Maison
  { name: 'Leroy Merlin', domain: 'leroymerlin.fr', color: '#78BE20', category: 'Maison' },
  { name: 'Castorama', domain: 'castorama.fr', color: '#0055A5', category: 'Maison' },
  { name: 'IKEA', domain: 'ikea.com', color: '#0058A3', category: 'Maison' },

  // Mode
  { name: 'Zara', domain: 'zara.com', color: '#000000', category: 'Mode' },
  { name: 'H&M', domain: 'hm.com', color: '#E50010', category: 'Mode' },
  { name: 'Uniqlo', domain: 'uniqlo.com', color: '#FF0000', category: 'Mode' },
  { name: 'Kiabi', domain: 'kiabi.com', color: '#E30071', category: 'Mode' },
  { name: 'Jules', domain: 'jules.com', color: '#1A1A1A', category: 'Mode' },

  // Restauration
  { name: 'Starbucks', domain: 'starbucks.com', color: '#00704A', category: 'Restauration' },
  { name: "McDonald's", domain: 'mcdonalds.com', color: '#FFC72C', category: 'Restauration' },
  { name: 'Burger King', domain: 'burgerking.fr', color: '#FF8732', category: 'Restauration' },
  { name: 'Subway', domain: 'subway.com', color: '#008C15', category: 'Restauration' },
  { name: 'Paul', domain: 'paul.fr', color: '#1A1A1A', category: 'Restauration' },

  // Autre
  { name: 'Cultura', domain: 'cultura.com', color: '#E30613', category: 'Autre' },
  { name: 'Action', domain: 'action.com', color: '#0066CC', category: 'Autre' },
  { name: 'Amazon', domain: 'amazon.fr', color: '#FF9900', category: 'Autre' },
  { name: 'Apple', domain: 'apple.com', color: '#000000', category: 'Autre' },
];

export function findBrandByName(query: string): Brand | undefined {
  const q = query.toLowerCase().trim();
  return DEFAULT_BRANDS.find(
    (b) => b.name.toLowerCase() === q || b.name.toLowerCase().startsWith(q),
  );
}
