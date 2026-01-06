import { Router } from 'express';

const router = Router();

const categories = [
  { id: 1, name: 'Imóveis', icon: 'home' },
  { id: 2, name: 'Autos', icon: 'car' },
  { id: 3, name: 'Autopeças', icon: 'wrench' },
  { id: 4, name: 'Celulares e Telefonia', icon: 'smartphone' },
  { id: 5, name: 'Casa e Decoração', icon: 'sofa' },
  { id: 6, name: 'Esportes e Fitness', icon: 'bike' },
  { id: 7, name: 'Serviços', icon: 'briefcase' },
];

router.get('/', (req, res) => {
  res.json(categories);
});

export default router;
