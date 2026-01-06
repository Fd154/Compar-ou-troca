import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Share2, Heart, Flag, MessageCircle, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

import { getApiUrl } from '../src/config';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl(`/products/${id}`))
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mx-auto px-6 py-20 text-center">Carregando...</div>;

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-800">Anúncio não encontrado</h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block font-medium">Voltar para home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-neutral-500 mb-8 flex items-center">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-3 text-neutral-300">/</span>
        <span className="hover:text-primary cursor-pointer transition-colors">{product.category}</span>
        <span className="mx-3 text-neutral-300">/</span>
        <span className="text-neutral-900 font-medium truncate max-w-[300px]">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Images and Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-neutral-100">
            <div className="aspect-video bg-neutral-100 flex items-center justify-center">
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-4 flex gap-3 overflow-x-auto no-scrollbar border-t border-neutral-100">
              {product.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Thumbnail ${idx}`} 
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${idx === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-neutral-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-card p-8 border border-neutral-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Descrição</h2>
            <p className="text-neutral-700 whitespace-pre-line leading-relaxed text-lg">
              {product.description}
            </p>
            
            <div className="mt-8 pt-8 border-t border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <span className="block text-neutral-500 mb-2">Categoria</span>
                <span className="font-semibold text-primary">{product.category}</span>
              </div>
              <div>
                <span className="block text-neutral-500 mb-2">Condição</span>
                <span className="font-semibold text-neutral-900">Usado</span>
              </div>
              <div>
                <span className="block text-neutral-500 mb-2">Publicado em</span>
                <span className="font-semibold text-neutral-900">{product.date}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-card p-8 border border-neutral-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Localização</h2>
            <div className="flex items-center gap-2 text-neutral-600 mb-6 font-medium">
              <MapPin size={22} className="text-primary" />
              <span>{product.location}</span>
            </div>
            <div className="w-full h-64 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 border border-neutral-200">
              Mapa simulado
            </div>
          </div>
        </div>

        {/* Right Column: Price and Seller */}
        <div className="space-y-8">
          {/* Price Card */}
          <div className="bg-white rounded-2xl shadow-card p-8 border border-neutral-100 sticky top-24">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4 leading-tight">{product.title}</h1>
            <p className="text-4xl font-bold text-neutral-900 mb-2 tracking-tight">
              R$ {product.price.toLocaleString('pt-BR')}
            </p>
            <div className="text-sm text-neutral-500 mb-8 flex items-center gap-1.5">
              <Clock size={16} /> Publicado hoje, 10:30
            </div>

            <Link 
              to="/chat" 
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 rounded-lg flex items-center justify-center gap-3 mb-4 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle size={22} />
              Iniciar Chat
            </Link>
            
            <div className="flex gap-2 justify-between mt-6 pt-6 border-t border-neutral-100">
              <button className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary transition-colors p-2 hover:bg-neutral-50 rounded-lg">
                <Heart size={18} /> Favoritar
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary transition-colors p-2 hover:bg-neutral-50 rounded-lg">
                <Share2 size={18} /> Compartilhar
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-danger transition-colors p-2 hover:bg-neutral-50 rounded-lg">
                <Flag size={18} /> Denunciar
              </button>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white rounded-2xl shadow-card p-8 border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-6 text-lg">Vendedor</h3>
            <div className="flex items-center gap-4 mb-6">
              <img src={product.sellerAvatar} alt={product.seller} className="w-16 h-16 rounded-full border-2 border-neutral-100" />
              <div>
                <Link to={`/seller/${encodeURIComponent(product.seller)}`} className="font-bold text-neutral-900 hover:text-primary text-lg block transition-colors">
                  {product.seller}
                </Link>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex text-yellow-400">
                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  <span className="text-xs text-neutral-500 ml-2">(42 avaliações)</span>
                </div>
              </div>
            </div>
            <Link to={`/seller/${encodeURIComponent(product.seller)}`} className="block w-full text-center border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary font-bold py-3 rounded-lg transition-colors">
              Ver perfil completo
            </Link>
          </div>

          {/* Safety Tips */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
            <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
              <ShieldCheck size={20} className="text-secondary" /> Dicas de segurança
            </h3>
            <ul className="text-sm text-neutral-600 space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                Não faça pagamentos antecipados.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                Encontre-se em locais públicos e movimentados.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                Verifique o produto antes de finalizar.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;