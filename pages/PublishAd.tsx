import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, ChevronLeft } from 'lucide-react';
import { Category } from '../types';

import { getApiUrl } from '../src/config';

const PublishAd: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    price: ''
  });

  useEffect(() => {
    fetch(getApiUrl('/categories'))
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const categoryName = categories.find(c => c.id === Number(formData.categoryId))?.name || 'Outros';
      
      const res = await fetch(getApiUrl('/products'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          category: categoryName,
          // Sending some mock images since we don't have real upload yet
          images: ['https://picsum.photos/400/400']
        })
      });

      if (!res.ok) throw new Error('Falha ao criar anúncio');
      
      navigate('/my-ads');
    } catch (error) {
      console.error(error);
      alert('Erro ao publicar anúncio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 dark:text-neutral-400 hover:text-primary mb-6 transition-colors"
      >
        <ChevronLeft size={20} /> Voltar
      </button>

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-neutral-900 p-6 border-b border-gray-200 dark:border-neutral-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Publicar Anúncio</h1>
          <p className="text-gray-500 dark:text-neutral-400 text-sm mt-1">Preencha os dados do seu produto para vender rápido</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Photos */}
          <section>
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Camera size={20} className="text-primary" /> Fotos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="aspect-square bg-gray-50 dark:bg-neutral-900 border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary hover:text-primary transition-colors">
                <Upload size={24} className="mb-2" />
                <span className="text-xs font-medium">Adicionar</span>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-700 rounded-lg flex items-center justify-center text-gray-300 dark:text-neutral-600">
                  <Camera size={24} />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Adicione até 6 fotos. A primeira será a principal.</p>
          </section>

          {/* Details */}
          <section className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Título do Anúncio</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Ex: iPhone 13 Pro Max 128GB"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Descrição</label>
              <textarea 
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Descreva os detalhes, tempo de uso e estado de conservação..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Categoria</label>
                <select 
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Preço (R$)</label>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="0,00"
                  required
                />
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">Localização</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">CEP</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="00000-000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Cidade / Estado</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400 focus:outline-none"
                  value="Preenchido automaticamente"
                  disabled
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-neutral-700">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className={`px-6 py-2 bg-secondary hover:bg-secondary-hover text-white rounded-lg font-bold transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Publicando...' : 'Publicar Anúncio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishAd;