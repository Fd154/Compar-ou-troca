import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Clock, Home as HomeIcon, Car, Sofa, Smartphone, 
  Briefcase, Wrench, Bike, Filter, X, Check, SlidersHorizontal, Search
} from 'lucide-react';
import { Product, Category } from '../types';

// --- Type Definitions for Filter Configuration ---
type FilterType = 'select' | 'checkbox' | 'range' | 'radio';

interface FilterConfig {
  label: string;
  key: string; // The key to check in product.details
  type: FilterType;
  options?: string[];
  unit?: string;
}

interface CategoryConfig {
  subcategories: string[];
  filters: FilterConfig[];
}

// --- Specific Configuration Data ---
const CATEGORY_DATA: Record<number, CategoryConfig> = {
  1: { // Imóveis
    subcategories: ['Venda', 'Aluguel', 'Temporada', 'Terrenos, sítios e fazendas', 'Comércio e indústria', 'Imóvel Novo'],
    filters: [
      { label: 'Tipo de imóvel', key: 'Tipo de imóvel', type: 'checkbox', options: ['Casa', 'Apartamento', 'Terreno', 'Sítio', 'Fazenda', 'Galpão', 'Ponto Comercial'] },
      { label: 'Quartos', key: 'Quartos', type: 'checkbox', options: ['1', '2', '3', '4', '5+'] },
      { label: 'Banheiros', key: 'Banheiros', type: 'checkbox', options: ['1', '2', '3', '4+'] },
      { label: 'Vagas', key: 'Vagas', type: 'checkbox', options: ['1', '2', '3+'] },
    ]
  },
  2: { // Autos
    subcategories: ['Carros, vans e utilitários', 'Caminhões', 'Ônibus', 'Motos', 'Barcos e aeronaves'],
    filters: [
      { label: 'Marca', key: 'Marca', type: 'select', options: ['Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'BMW'] },
      { label: 'Ano', key: 'Ano', type: 'select', options: ['2024', '2023', '2022', '2021', '2020', '2019', '2018-'] },
      { label: 'Combustível', key: 'Combustível', type: 'checkbox', options: ['Gasolina', 'Álcool', 'Diesel', 'Flex', 'Elétrico', 'Híbrido'] },
      { label: 'Câmbio', key: 'Câmbio', type: 'radio', options: ['Automático', 'Manual'] },
      { label: 'Condição', key: 'Condição', type: 'radio', options: ['Novo', 'Seminovo', 'Usado'] }
    ]
  },
  3: { // Autopeças
    subcategories: ['Peças para carros', 'Peças para caminhões', 'Peças para motos', 'Peças para barcos', 'Peças para ônibus'],
    filters: [
      { label: 'Categoria da peça', key: 'Categoria da peça', type: 'select', options: ['Motor', 'Suspensão', 'Freios', 'Elétrica', 'Acessórios', 'Pneus', 'Funilaria'] },
      { label: 'Condição', key: 'Condição', type: 'radio', options: ['Nova', 'Usada', 'Recondicionada'] }
    ]
  },
  4: { // Celulares
    subcategories: ['Celulares e Smartphones', 'Acessórios de Celular', 'Peças de Celular', 'Smartwatches', 'Telefonia Fixa'],
    filters: [
      { label: 'Marca', key: 'Marca', type: 'checkbox', options: ['Apple', 'Samsung', 'Motorola', 'Xiaomi', 'LG', 'Asus'] },
      { label: 'Armazenamento', key: 'Armazenamento', type: 'checkbox', options: ['32GB', '64GB', '128GB', '256GB', '512GB+'] },
      { label: 'Condição', key: 'Condição', type: 'radio', options: ['Novo', 'Usado', 'Reembalado'] }
    ]
  },
  5: { // Casa e Decoração
    subcategories: ['Tecidos de Cama, Mesa e Banho', 'Decorações Para Casa', 'Casa Inteligente', 'Utensílios Para Cozinha', 'Iluminação', 'Jardinagem e Plantas'],
    filters: [
      { label: 'Material', key: 'Material', type: 'select', options: ['Madeira', 'Metal', 'Plástico', 'Vidro', 'Tecido'] },
      { label: 'Condição', key: 'Condição', type: 'radio', options: ['Novo', 'Usado'] }
    ]
  },
  6: { // Esportes
    subcategories: ['Ciclismo', 'Academia e Exercícios', 'Acampamento', 'Esportes Aquáticos', 'Roupas Esportivas'],
    filters: [
      { label: 'Modalidade', key: 'Modalidade', type: 'select', options: ['Futebol', 'Ciclismo', 'Basquete', 'Corrida', 'Musculação'] },
      { label: 'Condição', key: 'Condição', type: 'radio', options: ['Novo', 'Usado'] }
    ]
  },
  7: { // Serviços
    subcategories: ['Serviços'],
    filters: [
      { label: 'Tipo de serviço', key: 'Tipo de serviço', type: 'select', options: ['Reforma', 'Limpeza', 'Transporte', 'Beleza', 'Ensino', 'Técnico'] },
      { label: 'Profissional', key: 'Profissional', type: 'radio', options: ['Pessoa física', 'Empresa'] }
    ]
  }
};

import { getApiUrl } from '../src/config';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products
    fetch(getApiUrl('/products?pageSize=100'))
      .then(res => res.json())
      .then(data => {
        setProducts(data.items || []);
        // setLoading(false); // Wait for categories
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        // setLoading(false);
      });

    // Fetch categories
    fetch(getApiUrl('/categories'))
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories', err))
      .finally(() => setLoading(false));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Helper to render icons based on text/id
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home': return <HomeIcon size={24} />;
      case 'car': return <Car size={24} />;
      case 'sofa': return <Sofa size={24} />;
      case 'smartphone': return <Smartphone size={24} />;
      case 'briefcase': return <Briefcase size={24} />;
      case 'wrench': return <Wrench size={24} />;
      case 'bike': return <Bike size={24} />;
      default: return <HomeIcon size={24} />;
    }
  };

  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Filter by Category
      if (selectedCategory) {
        const categoryName = categories.find(c => c.id === selectedCategory)?.name;
        if (product.category !== categoryName) return false;
      }

      // 2. Filter by Subcategory
      if (selectedSubcategory) {
        // Loose check: title or product subcategory field
        const subMatch = product.subcategory === selectedSubcategory;
        if (!subMatch) return false;
      }

      // 3. Filter by Price
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      if (product.price < minPrice || product.price > maxPrice) return false;

      // 4. Specific Attribute Filters
      // We check if all active filters match the product details
      if (product.details) {
        for (const [key, value] of Object.entries(activeFilters)) {
          // If the product details doesn't have this key, or values don't match
          // Note: In a real app, logic would be more complex (arrays vs strings)
          if (!product.details[key] || String(product.details[key]) !== value) {
            return false;
          }
        }
      } else if (Object.keys(activeFilters).length > 0) {
        // If filters are active but product has no details, exclude it
        return false;
      }
      
      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, priceRange, activeFilters]);

  // --- Handlers ---
  const handleCategoryClick = (id: number) => {
    if (selectedCategory === id) {
      clearFilters();
    } else {
      setSelectedCategory(id);
      setSelectedSubcategory(null);
      setActiveFilters({});
      // Keep price range if desired, or reset:
      // setPriceRange({ min: '', max: '' });
    }
    setShowMobileFilters(false);
  };

  const toggleFilter = (key: string, value: string) => {
    setActiveFilters(prev => {
      const isSelected = prev[key] === value;
      const newFilters = { ...prev };
      if (isSelected) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setPriceRange({ min: '', max: '' });
    setActiveFilters({});
  };

  return (
    <div>
      {/* Hero / Banner (Only show when no category is selected) */}
      {!selectedCategory && (
        <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 py-12 md:py-20 transition-colors duration-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                O que você está procurando hoje?
              </h1>
              <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed">
                Milhares de produtos, serviços e imóveis esperando por você.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/publish" 
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Criar classificado
                </Link>
                <Link 
                  to="/search" 
                  className="bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary px-8 py-3.5 rounded-lg font-bold text-lg transition-all"
                >
                  Ver ofertas
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-12">
        {/* Categories Grid (Top) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {selectedCategory ? 'Categorias' : 'Navegue por Categoria'}
            </h2>
            {selectedCategory && (
              <button 
                onClick={clearFilters}
                className="text-sm font-medium text-danger hover:underline flex items-center gap-1"
              >
                <X size={16} /> Limpar filtros
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => handleCategoryClick(cat.id)}
                className={`
                  flex flex-col items-center gap-3 group cursor-pointer p-4 rounded-xl transition-all duration-300 border-2
                  ${selectedCategory === cat.id 
                    ? 'bg-white dark:bg-neutral-800 border-primary shadow-md scale-105' 
                    : 'border-transparent hover:bg-white dark:hover:bg-neutral-800 hover:shadow-card'
                  }
                `}
              >
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
                    ${selectedCategory === cat.id 
                      ? 'bg-primary text-white' 
                      : 'bg-primary-light dark:bg-neutral-700 text-primary dark:text-primary-light group-hover:bg-primary group-hover:text-white'
                    }
                  `}
                >
                  {getIcon(cat.icon)}
                </div>
                <span 
                  className={`
                    text-xs sm:text-sm text-center font-medium transition-colors
                    ${selectedCategory === cat.id ? 'text-primary font-bold' : 'text-neutral-600 dark:text-neutral-400'}
                  `}
                >
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden w-full mb-2">
             <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-lg font-medium shadow-sm text-neutral-800 dark:text-white"
             >
               <SlidersHorizontal size={18} /> {showMobileFilters ? 'Ocultar Filtros' : 'Filtros avançados'}
             </button>
          </div>

          {/* SIDEBAR: Dynamic Filters */}
          <aside className={`
            lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24
            ${showMobileFilters ? 'block' : 'hidden lg:block'}
          `}>
            
            {/* 1. Subcategories Block */}
            {selectedCategory && CATEGORY_DATA[selectedCategory] && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-sm border border-neutral-100 dark:border-neutral-700">
                <h3 className="font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <Filter size={18} className="text-primary" /> Subcategorias
                </h3>
                <div className="space-y-1">
                  {CATEGORY_DATA[selectedCategory].subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? null : sub)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group
                        ${selectedSubcategory === sub 
                          ? 'bg-primary/10 text-primary font-bold' 
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                        }
                      `}
                    >
                      {sub}
                      {selectedSubcategory === sub && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Common Filter: Price */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-sm border border-neutral-100 dark:border-neutral-700">
              <h3 className="font-semibold text-neutral-800 dark:text-white mb-4 text-sm uppercase tracking-wide">
                Faixa de Preço
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="relative w-full">
                  <span className="absolute left-3 top-2.5 text-neutral-400 text-xs">R$</span>
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:border-primary focus:outline-none dark:text-white"
                  />
                </div>
                <span className="text-neutral-400">-</span>
                <div className="relative w-full">
                  <span className="absolute left-3 top-2.5 text-neutral-400 text-xs">R$</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:border-primary focus:outline-none dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Location Filter Removed as requested */}

            {/* 3. Specific Category Filters */}
            {selectedCategory && CATEGORY_DATA[selectedCategory] && (
               <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-sm border border-neutral-100 dark:border-neutral-700 space-y-6">
                 {CATEGORY_DATA[selectedCategory].filters.map((filter) => (
                   <div key={filter.key}>
                     <h3 className="font-semibold text-neutral-800 dark:text-white mb-3 text-sm uppercase tracking-wide">
                       {filter.label}
                     </h3>
                     
                     {/* Render based on filter type */}
                     <div className="space-y-2">
                       {filter.options?.map((option) => {
                         const isActive = activeFilters[filter.key] === option;
                         
                         if (filter.type === 'select' || filter.type === 'checkbox') {
                           // Render as pill/checkbox style list
                           return (
                             <label key={option} className="flex items-center gap-2 cursor-pointer group">
                               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors 
                                 ${isActive 
                                   ? 'bg-primary border-primary' 
                                   : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 group-hover:border-primary'
                                 }
                               `}>
                                 {isActive && <Check size={10} className="text-white" />}
                               </div>
                               <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={isActive}
                                onChange={() => toggleFilter(filter.key, option)}
                               />
                               <span className={`text-sm transition-colors ${isActive ? 'text-primary font-medium' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                 {option}
                               </span>
                             </label>
                           );
                         } else if (filter.type === 'radio') {
                            return (
                              <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors 
                                  ${isActive 
                                    ? 'border-primary' 
                                    : 'border-neutral-300 dark:border-neutral-600 group-hover:border-primary'
                                  }
                                `}>
                                  {isActive && <div className="w-2 h-2 rounded-full bg-primary" />}
                                </div>
                                <input 
                                  type="radio" 
                                  className="hidden" 
                                  checked={isActive}
                                  onChange={() => toggleFilter(filter.key, option)}
                                />
                                <span className={`text-sm transition-colors ${isActive ? 'text-primary font-medium' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                  {option}
                                </span>
                              </label>
                            );
                         }
                         return null;
                       })}
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {selectedSubcategory || (selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Destaques Recentes')}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {filteredProducts.length} resultados encontrados
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-neutral-500 bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <span>Ordenar:</span>
                <select className="bg-transparent font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer">
                  <option>Mais recentes</option>
                  <option>Menor preço</option>
                  <option>Maior preço</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id} 
                    className="bg-white dark:bg-neutral-800 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-neutral-100 dark:border-neutral-700 group flex flex-col h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-3 left-3 bg-neutral-900/75 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
                        {product.images.length} fotos
                      </span>
                      {product.subcategory && (
                        <span className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                          {product.subcategory}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2 mb-2 group-hover:text-primary transition-colors text-base pr-2">
                            {product.title}
                          </h3>
                        </div>
                        <p className="text-xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
                          R$ {product.price.toLocaleString('pt-BR')}
                        </p>
                        
                        {/* Specific details snippet */}
                        {product.details && (
                          <div className="flex flex-wrap gap-1 mb-3">
                             {Object.entries(product.details).slice(0, 2).map(([k, v]) => (
                               <span key={k} className="text-[10px] px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded">
                                 {v}
                               </span>
                             ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-3 border-t border-neutral-50 dark:border-neutral-700">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span className="truncate max-w-[100px]">{product.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{product.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-16 text-center border border-neutral-200 dark:border-neutral-700">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Nenhum resultado encontrado</h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
                  Não encontramos itens com os filtros selecionados. Tente remover alguns filtros ou buscar em outra categoria.
                </p>
                <button 
                  onClick={clearFilters}
                  className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 px-6 py-2 rounded-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;