import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getApiUrl } from '../src/config';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(getApiUrl('/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend returns error object from Zod or custom message
        const msg = typeof data.error === 'string' 
          ? data.error 
          : 'Falha no cadastro. Verifique os dados.';
        throw new Error(msg);
      }

      // Auto-login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.type === 'text' ? 'name' : e.target.type]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200 dark:border-neutral-700 transition-colors duration-300">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Crie sua conta</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-sm mt-2">Comece a vender e comprar hoje mesmo</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Nome completo</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">E-mail</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Senha</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>

          <div className="text-xs text-gray-500 dark:text-neutral-400">
            Ao criar uma conta, você concorda com nossos <a href="#" className="text-primary hover:underline">Termos de Uso</a> e <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-secondary hover:bg-secondary-hover text-white font-bold py-3 rounded-lg transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-neutral-400">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;