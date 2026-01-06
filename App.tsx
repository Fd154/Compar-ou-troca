import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, MessageCircle, User, LogOut, Heart, PlusCircle, MapPin, ChevronDown, Crosshair, Settings, Wallet, CreditCard } from 'lucide-react';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAds from './pages/UserDashboard/MyAds';
import Profile from './pages/UserDashboard/Profile';
import UserSettings from './pages/UserDashboard/Settings';
import UserWallet from './pages/UserDashboard/Wallet';
import Chat from './pages/Chat';
import PublishAd from './pages/PublishAd';
import SearchResults from './pages/SearchResults';
import Notifications from './pages/Notifications';
import Favorites from './pages/Favorites';
import SellerProfile from './pages/SellerProfile';
import AdminOverview from './pages/AdminDashboard/Overview';
import AdminUsers from './pages/AdminDashboard/Users';
import AdminAds from './pages/AdminDashboard/Ads';
import Moderation from './pages/AdminDashboard/Moderation';
import ThemeToggle from './components/ThemeToggle';

// Mock States Data
const BRAZIL_STATES = [
  { uf: 'AC', name: 'Acre' }, { uf: 'AL', name: 'Alagoas' }, { uf: 'AP', name: 'Amapá' },
  { uf: 'AM', name: 'Amazonas' }, { uf: 'BA', name: 'Bahia' }, { uf: 'CE', name: 'Ceará' },
  { uf: 'DF', name: 'Distrito Federal' }, { uf: 'ES', name: 'Espírito Santo' }, { uf: 'GO', name: 'Goiás' },
  { uf: 'MA', name: 'Maranhão' }, { uf: 'MT', name: 'Mato Grosso' }, { uf: 'MS', name: 'Mato Grosso do Sul' },
  { uf: 'MG', name: 'Minas Gerais' }, { uf: 'PA', name: 'Pará' }, { uf: 'PB', name: 'Paraíba' },
  { uf: 'PR', name: 'Paraná' }, { uf: 'PE', name: 'Pernambuco' }, { uf: 'PI', name: 'Piauí' },
  { uf: 'RJ', name: 'Rio de Janeiro' }, { uf: 'RN', name: 'Rio Grande do Norte' }, { uf: 'RS', name: 'Rio Grande do Sul' },
  { uf: 'RO', name: 'Rondônia' }, { uf: 'RR', name: 'Roraima' }, { uf: 'SC', name: 'Santa Catarina' },
  { uf: 'SP', name: 'São Paulo' }, { uf: 'SE', name: 'Sergipe' }, { uf: 'TO', name: 'Tocantins' }
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Location State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState({ state: '', city: '', neighborhood: '' });
  const [tempLocation, setTempLocation] = useState({ state: '', city: '', neighborhood: '' });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Check auth status on mount and route change
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isAuthPage) return null;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openLocationModal = () => {
    setTempLocation(userLocation); // Load current settings into modal
    setIsLocationModalOpen(true);
  };

  const saveLocation = () => {
    setUserLocation(tempLocation);
    setIsLocationModalOpen(false);
  };

  const formatLocationString = () => {
    if (userLocation.neighborhood && userLocation.city) return `${userLocation.neighborhood}, ${userLocation.city} - ${userLocation.state}`;
    if (userLocation.city) return `${userLocation.city} - ${userLocation.state}`;
    if (userLocation.state) return `${BRAZIL_STATES.find(s => s.uf === userLocation.state)?.name}`;
    return "Todo o Brasil";
  };

  return (
    <>
      <header className="bg-white dark:bg-neutral-800 shadow-sm sticky top-0 z-40 transition-all duration-300 border-b border-neutral-100 dark:border-neutral-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 gap-4 md:gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:bg-primary-hover transition-colors">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight hidden lg:block group-hover:text-primary transition-colors">Marketplace</span>
            </Link>

            {!isAdmin && (
              <>
                {/* Location Selector (Desktop) */}
                <button 
                  onClick={openLocationModal}
                  className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors max-w-[200px] lg:max-w-[250px] shrink-0 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-600"
                >
                  <MapPin className="text-primary shrink-0" size={20} />
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Localização</span>
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate w-full text-left">
                      {formatLocationString()}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-neutral-400 ml-auto shrink-0" />
                </button>

                {/* Search Bar - Responsive */}
                <div className="hidden md:flex flex-1 max-w-2xl relative group mx-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar produtos, marcas e muito mais..."
                    className="w-full h-12 pl-5 pr-12 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 focus:bg-white dark:focus:bg-neutral-800 focus:border-primary dark:focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-800 dark:text-neutral-100"
                  />
                  <button 
                    onClick={handleSearch}
                    className="absolute right-2 top-2 h-8 w-8 bg-transparent text-neutral-400 dark:text-neutral-500 hover:text-primary dark:hover:text-primary rounded-md flex items-center justify-center transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="hidden md:flex items-center gap-6 shrink-0">
              {!isAdmin ? (
                <>
                  <Link to="/chat" className="flex items-center gap-2 text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors" title="Chat">
                    <MessageCircle size={22} />
                  </Link>
                  <Link to="/notifications" className="flex items-center gap-2 text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors" title="Notificações">
                    <Bell size={22} />
                  </Link>
                  <Link to="/favorites" className="flex items-center gap-2 text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors" title="Favoritos">
                    <Heart size={22} />
                  </Link>

                  <ThemeToggle />
                  
                  <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>

                  {isAuthenticated ? (
                    <div className="relative">
                      <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-600"
                      >
                        <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                          VC
                        </div>
                        <ChevronDown size={16} className="text-neutral-500" />
                      </button>

                      {isUserMenuOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-10 cursor-default" 
                            onClick={() => setIsUserMenuOpen(false)}
                          ></div>
                          <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                             <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700">
                               <p className="text-sm text-neutral-500 dark:text-neutral-400">Olá,</p>
                               <p className="font-bold text-neutral-900 dark:text-white truncate">Você</p>
                             </div>
                             <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                               <User size={18} /> Meu Perfil
                             </Link>
                             <Link to="/my-ads" className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                               <CreditCard size={18} /> Meus Anúncios
                             </Link>
                             <Link to="/wallet" className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                               <Wallet size={18} /> Minha Carteira
                             </Link>
                             <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                               <Settings size={18} /> Configurações
                             </Link>
                             <div className="border-t border-neutral-100 dark:border-neutral-700 mt-2 pt-2">
                               <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-danger hover:bg-danger-light/50 dark:hover:bg-danger/10 transition-colors text-left"
                               >
                                 <LogOut size={18} /> Sair
                               </button>
                             </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <Link to="/login" className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-medium hover:text-primary transition-colors">
                      <span className="text-sm">Entrar</span>
                    </Link>
                  )}
                  
                  <Link 
                    to={isAuthenticated ? "/publish" : "/login"}
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Criar classificado
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-full">Administrador</span>
                  <ThemeToggle />
                  <button 
                    onClick={() => navigate('/')}
                    className="text-danger hover:text-red-700 flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    <LogOut size={18} /> Sair
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden ml-auto">
              <ThemeToggle />
              <button 
                className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-700 p-4 space-y-4 shadow-lg absolute w-full z-50">
            {!isAdmin && (
              <div className="space-y-4">
                 {/* Mobile Location Trigger */}
                 <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openLocationModal();
                  }}
                  className="w-full flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg text-neutral-700 dark:text-neutral-200"
                >
                  <MapPin className="text-primary" size={20} />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Onde?</span>
                    <span className="font-bold">{formatLocationString()}</span>
                  </div>
                  <ChevronDown className="ml-auto text-neutral-400" size={16} />
                </button>

                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="O que você procura?"
                    className="w-full h-12 pl-4 pr-10 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 focus:border-primary focus:outline-none text-neutral-800 dark:text-neutral-100"
                  />
                  <button onClick={handleSearch} className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-neutral-500">
                    <Search size={20} />
                  </button>
                </div>
              </div>
            )}
            
            {isAuthenticated ? (
              <>
                <div className="py-2 border-b border-neutral-50 dark:border-neutral-700">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Logado como</p>
                  <p className="font-bold text-neutral-900 dark:text-white">Você</p>
                </div>
                <Link to="/profile" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Meu Perfil</Link>
                <Link to="/my-ads" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Meus Anúncios</Link>
                <Link to="/wallet" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Carteira</Link>
                <Link to="/settings" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Configurações</Link>
              </>
            ) : (
               <Link to="/login" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Entrar / Cadastrar</Link>
            )}

            <Link to="/chat" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Chat</Link>
            <Link to="/notifications" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Notificações</Link>
            <Link to="/favorites" className="block text-neutral-600 dark:text-neutral-300 font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Meus Favoritos</Link>
            
            {isAuthenticated && (
               <button onClick={handleLogout} className="w-full text-left text-danger font-medium py-3 border-b border-neutral-50 dark:border-neutral-700">Sair</button>
            )}

            {!isAuthenticated && (
               <Link to="/admin" className="block text-primary font-bold py-3">Painel Admin (Demo)</Link>
            )}
            
            <Link 
              to={isAuthenticated ? "/publish" : "/login"}
              className="block w-full bg-primary text-white text-center py-4 rounded-lg font-bold shadow-md mt-4"
            >
              Criar classificado
            </Link>
          </div>
        )}
      </header>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsLocationModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <MapPin className="text-primary" /> Selecione sua região
              </h3>
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Use Current Location Button */}
              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary/20 hover:bg-primary/5 text-primary rounded-lg font-bold transition-colors">
                 <Crosshair size={20} /> Usar minha localização atual
              </button>

              <div className="relative flex items-center justify-center">
                <div className="h-px bg-neutral-200 dark:bg-neutral-700 w-full absolute"></div>
                <span className="bg-white dark:bg-neutral-800 px-3 text-sm text-neutral-400 relative z-10">ou defina manualmente</span>
              </div>

              <div className="space-y-4">
                {/* State Selection */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Estado (UF)</label>
                  <select 
                    value={tempLocation.state}
                    onChange={(e) => setTempLocation({...tempLocation, state: e.target.value, city: '', neighborhood: ''})}
                    className="w-full h-11 px-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="">Todo o Brasil</option>
                    {BRAZIL_STATES.map(s => (
                      <option key={s.uf} value={s.uf}>{s.name} ({s.uf})</option>
                    ))}
                  </select>
                </div>

                {/* City Selection (Only enables if State is selected) */}
                <div className={!tempLocation.state ? 'opacity-50 pointer-events-none' : ''}>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Município</label>
                  <input 
                    type="text" 
                    value={tempLocation.city}
                    onChange={(e) => setTempLocation({...tempLocation, city: e.target.value})}
                    placeholder={tempLocation.state ? "Digite a cidade..." : "Selecione o estado primeiro"}
                    className="w-full h-11 px-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* Neighborhood Selection (Only enables if City is entered) */}
                <div className={!tempLocation.city ? 'opacity-50 pointer-events-none' : ''}>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Bairro</label>
                  <input 
                    type="text" 
                    value={tempLocation.neighborhood}
                    onChange={(e) => setTempLocation({...tempLocation, neighborhood: e.target.value})}
                    placeholder="Digite o bairro..."
                    className="w-full h-11 px-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 flex justify-end gap-3">
               <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="px-5 py-2.5 font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors"
               >
                 Cancelar
               </button>
               <button 
                onClick={saveLocation}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-md transition-all"
               >
                 Aplicar Filtro
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage || isAdmin) return null;

  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 mt-auto pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-white">Marketplace</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Sua plataforma confiável para comprar e vender produtos de qualidade com segurança e praticidade.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-lg">Sobre</h3>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-primary transition-colors">Quem somos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Imprensa</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-lg">Suporte</h3>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-primary transition-colors">Central de ajuda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termos de uso</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-lg">Venda</h3>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-primary transition-colors">Dicas para vender</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Planos profissionais</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-100 dark:border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>© 2023 Marketplace Demo. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
             <a href="#" className="hover:text-primary transition-colors">Termos</a>
             <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 font-sans text-neutral-800 dark:text-neutral-100 transition-colors duration-300">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-ads" element={<MyAds />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/wallet" element={<UserWallet />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/publish" element={<PublishAd />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/seller/:name" element={<SellerProfile />} />
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/ads" element={<AdminAds />} />
            <Route path="/admin/moderation" element={<Moderation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;