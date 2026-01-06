import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Clock, Filter, Search, PlusCircle } from 'lucide-react';
import { Product } from '../types';

import { getApiUrl } from '../src/config';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl('/products?pageSize=100'))
      .then(res => res.json())
      .then(data => {
        setProducts(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);
  
  // Simple filter logic
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <div className="container mx-auto px-6 py-20 text-center">Carregando...</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            {query ? `Resultados para "${query}"` : 'Todos os anúncios'}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            {filteredProducts.length > 0 
              ? `${filteredProducts.length} resultado(s) encontrado(s)`
              : '0 resultado(s) encontrado(s)'}
          </p>
        </div>

        {filteredProducts.length > 0 && (
          <button className="flex items-center gap-2 px-5 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:border-primary hover:text-primary transition-colors bg-white dark:bg-neutral-800 font-medium text-neutral-700 dark:text-neutral-200 shadow-sm">
            <Filter size={18} />
            <span>Filtrar e Ordenar</span>
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-neutral-100 dark:border-neutral-700 group flex flex-col h-full">
              <div className="relative h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-neutral-900/75 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
                  {product.images.length} fotos
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2 mb-2 group-hover:text-primary transition-colors text-lg">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-50 dark:border-neutral-700">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span className="truncate max-w-[120px]">{product.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{product.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm text-center px-4">
          <div className="w-20 h-20 bg-neutral-50 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-6 border border-neutral-100 dark:border-neutral-700">
            <Search size={40} className="text-neutral-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Nenhum classificado encontrado</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md mx-auto text-lg">
            Não encontramos o que você procurava. Que tal ser o primeiro a anunciar algo parecido?
          </p>
          <Link 
            to="/publish" 
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Crie seu primeiro classificado!
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;