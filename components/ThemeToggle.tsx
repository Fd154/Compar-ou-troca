import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [themeColor, setThemeColor] = useState<'blue' | 'purple'>('blue');
  const [isOpen, setIsOpen] = useState(false);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    const savedColor = localStorage.getItem('themeColor') as 'blue' | 'purple';

    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    if (savedColor) {
      setThemeColor(savedColor);
      document.documentElement.setAttribute('data-theme', savedColor);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('themeMode', 'light');
    }
  };

  const changeColor = (color: 'blue' | 'purple') => {
    setThemeColor(color);
    document.documentElement.setAttribute('data-theme', color);
    localStorage.setItem('themeColor', color);
  };

  return (
    <div className="relative group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
        title="Personalizar Tema"
        aria-label="Opções de tema"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {isDark ? <Moon size={22} /> : <Sun size={22} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10 cursor-default" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 p-4 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Modo Escuro</span>
                <button 
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isDark ? 'bg-primary' : 'bg-neutral-200 dark:bg-neutral-600'}`}
                  aria-pressed={isDark}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="h-px bg-neutral-100 dark:bg-neutral-700"></div>

              {/* Color Selection */}
              <div>
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3 block px-2">Cor de Destaque</span>
                <div className="flex gap-3 px-2">
                  <button 
                    onClick={() => changeColor('blue')}
                    className={`w-8 h-8 rounded-full bg-blue-600 border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${themeColor === 'blue' ? 'border-neutral-900 dark:border-white ring-2 ring-blue-200 dark:ring-blue-900' : 'border-transparent'}`}
                    title="Azul Profissional"
                    aria-label="Tema Azul"
                  />
                  <button 
                    onClick={() => changeColor('purple')}
                    className={`w-8 h-8 rounded-full bg-purple-600 border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500 ${themeColor === 'purple' ? 'border-neutral-900 dark:border-white ring-2 ring-purple-200 dark:ring-purple-900' : 'border-transparent'}`}
                    title="Roxo Moderno"
                    aria-label="Tema Roxo"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;