import { Router } from 'express';

const router = Router();

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  location: string;
  date: string;
  description: string;
  seller: string;
  sellerAvatar: string;
  images: string[];
  details?: Record<string, string | number | boolean>;
};

const products: Product[] = [
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
      Marca: 'Apple',
      Modelo: 'iPhone 13 Pro Max',
      Armazenamento: '128GB',
      Condição: 'Usado'
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
      Marca: 'Honda',
      Ano: '2021',
      Combustível: 'Gasolina',
      Câmbio: 'Automático',
      Quilometragem: 25000
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
      Marca: 'Samsung',
      Modelo: 'Galaxy S22',
      Armazenamento: '256GB',
      Condição: 'Usado'
    }
  }
];

router.get('/', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const category = String(req.query.category || '');
  const subcategory = String(req.query.subcategory || '');
  const minPrice = Number(req.query.minPrice || 0);
  const maxPrice = Number(req.query.maxPrice || Number.POSITIVE_INFINITY);
  const page = Number(req.query.page || 1);
  const pageSize = Number(req.query.pageSize || 12);

  let filtered = products.filter(p => {
    if (q) {
      const text = `${p.title} ${p.description} ${p.category}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    if (category && p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  res.json({ total, page, pageSize, items });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json(product);
});

export default router;

