import { Product, Category, ChatContact } from './types';

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Imóveis', icon: 'home' },
  { id: 2, name: 'Autos', icon: 'car' },
  { id: 3, name: 'Autopeças', icon: 'wrench' },
  { id: 4, name: 'Celulares e Telefonia', icon: 'smartphone' },
  { id: 5, name: 'Casa e Decoração', icon: 'sofa' },
  { id: 6, name: 'Esportes e Fitness', icon: 'bike' },
  { id: 7, name: 'Serviços', icon: 'briefcase' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Apartamento 2 Quartos - Centro',
    price: 350000,
    image: 'https://picsum.photos/id/10/400/400',
    category: 'Imóveis',
    subcategory: 'Venda',
    location: 'São Paulo, SP',
    date: 'Hoje, 10:30',
    description: 'Lindo apartamento reformado, vista livre.',
    seller: 'Imobiliária Silva',
    sellerAvatar: 'https://picsum.photos/id/64/100/100',
    images: ['https://picsum.photos/id/10/800/600'],
    details: {
      'Tipo de imóvel': 'Apartamento',
      'Quartos': '2',
      'Vagas': '1',
      'Área': 65
    }
  },
  {
    id: 2,
    title: 'iPhone 13 Pro Max 128GB',
    price: 4500,
    image: 'https://picsum.photos/id/1/400/400',
    category: 'Celulares e Telefonia',
    subcategory: 'Celulares e Smartphones',
    location: 'Rio de Janeiro, RJ',
    date: 'Ontem, 18:45',
    description: 'Impecável, sem marcas de uso.',
    seller: 'João Tech',
    sellerAvatar: 'https://picsum.photos/id/65/100/100',
    images: ['https://picsum.photos/id/1/800/600'],
    details: {
      'Marca': 'Apple',
      'Modelo': 'iPhone 13 Pro Max',
      'Armazenamento': '128GB',
      'Condição': 'Usado'
    }
  },
  {
    id: 3,
    title: 'Honda Civic Touring 2021',
    price: 145000,
    image: 'https://picsum.photos/id/111/400/400',
    category: 'Autos',
    subcategory: 'Carros, vans e utilitários',
    location: 'Curitiba, PR',
    date: 'Hoje, 08:15',
    description: 'Carro de garagem, único dono.',
    seller: 'Garagem Motors',
    sellerAvatar: 'https://picsum.photos/id/66/100/100',
    images: ['https://picsum.photos/id/111/800/600'],
    details: {
      'Marca': 'Honda',
      'Ano': '2021',
      'Combustível': 'Gasolina',
      'Câmbio': 'Automático',
      'Quilometragem': 25000
    }
  },
  {
    id: 4,
    title: 'Sofá Retrátil 3 Lugares',
    price: 1200,
    image: 'https://picsum.photos/id/1070/400/400',
    category: 'Casa e Decoração',
    subcategory: 'Decorações Para Casa',
    location: 'Belo Horizonte, MG',
    date: '15 mar, 14:20',
    description: 'Confortável e espaçoso.',
    seller: 'Maria Oliveira',
    sellerAvatar: 'https://picsum.photos/id/68/100/100',
    images: ['https://picsum.photos/id/1070/800/600'],
    details: {
      'Cor': 'Cinza',
      'Condição': 'Usado'
    }
  },
  {
    id: 5,
    title: 'Bicicleta Mountain Bike Aro 29',
    price: 1800,
    image: 'https://picsum.photos/id/146/400/400',
    category: 'Esportes e Fitness',
    subcategory: 'Ciclismo',
    location: 'Porto Alegre, RS',
    date: 'Hoje, 12:00',
    description: 'Suspensão dianteira e freio hidráulico.',
    seller: 'Pedal Livre',
    sellerAvatar: 'https://picsum.photos/id/70/100/100',
    images: ['https://picsum.photos/id/146/800/600'],
    details: {
      'Modalidade': 'Ciclismo',
      'Condição': 'Novo'
    }
  },
  {
    id: 6,
    title: 'Jogo de Pneus Pirelli Aro 15',
    price: 1200,
    image: 'https://picsum.photos/id/200/400/400',
    category: 'Autopeças',
    subcategory: 'Peças para carros, vans e utilitários',
    location: 'São Paulo, SP',
    date: 'Ontem, 20:10',
    description: 'Pneus seminovos, pouco uso.',
    seller: 'Auto Center',
    sellerAvatar: 'https://picsum.photos/id/71/100/100',
    images: ['https://picsum.photos/id/200/800/600'],
    details: {
      'Categoria da peça': 'Pneus',
      'Condição': 'Usada'
    }
  },
  {
    id: 7,
    title: 'Samsung Galaxy S22 Ultra',
    price: 3800,
    image: 'https://picsum.photos/id/3/400/400',
    category: 'Celulares e Telefonia',
    subcategory: 'Celulares e Smartphones',
    location: 'Salvador, BA',
    date: 'Hoje, 09:00',
    description: 'Completo na caixa.',
    seller: 'Tech Bahia',
    sellerAvatar: 'https://picsum.photos/id/72/100/100',
    images: ['https://picsum.photos/id/3/800/600'],
    details: {
      'Marca': 'Samsung',
      'Modelo': 'Galaxy S22',
      'Armazenamento': '256GB',
      'Condição': 'Usado'
    }
  },
  {
    id: 8,
    title: 'Reforma e Pintura Residencial',
    price: 0,
    image: 'https://picsum.photos/id/401/400/400',
    category: 'Serviços',
    subcategory: 'Serviços',
    location: 'Brasília, DF',
    date: 'Hoje, 11:15',
    description: 'Faça seu orçamento sem compromisso.',
    seller: 'Construtora DF',
    sellerAvatar: 'https://picsum.photos/id/73/100/100',
    images: ['https://picsum.photos/id/401/800/600'],
    details: {
      'Tipo de serviço': 'Reforma',
      'Profissional': 'Empresa'
    }
  }
];

export const CHATS: ChatContact[] = [
  { id: 1, name: 'João Tech', avatar: 'https://picsum.photos/id/64/100/100', lastMessage: 'Faz por 4000?', unread: 2, product: 'iPhone 13 Pro Max' },
  { id: 2, name: 'Maria Oliveira', avatar: 'https://picsum.photos/id/65/100/100', lastMessage: 'Quando posso retirar?', unread: 0, product: 'Sofá Retrátil' },
];