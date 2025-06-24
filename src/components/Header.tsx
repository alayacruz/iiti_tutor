import React from 'react';
import { Zap, User, SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`
      top-0 left-0 right-0 z-50 px-6 py-2
      border-b backdrop-blur-md transition-all duration-300
      ${theme === 'dark'
        ? 'bg-black/80 text-white border-cyan-500/30'
        : 'bg-gradient-to-r from-cyan-100 via-white to-indigo-100 text-gray-900 border-gray-200 shadow-sm ring-1 ring-white/60'
      }
    `}>
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            {theme === "dark" ? (
              <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
            ) : (
              <Zap className="w-8 h-8 text-indigo-500 animate-pulse" />
            )}
            <div className={`absolute inset-0 w-8 h-8 rounded-full blur-md ${theme === "dark" ? 'bg-cyan-400/20' : 'bg-indigo-400/20'}`} />
          </div>

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              NEXUS
            </h1>
            <p className="text-xs uppercase tracking-widest mt-0.5 text-gray-600 dark:text-gray-400">
              AI Tutor • IITI Community
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Theme"
            className="p-2 rounded-lg transition hover:bg-white/40 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* User Button */}
          <button className="
            p-2 rounded-lg border transition-colors
            border-gray-300 dark:border-gray-700
            bg-white/40 hover:bg-white/60 text-gray-700
            dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:text-gray-300
          ">
            <User className="w-5 h-5 hover:text-cyan-500 transition" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

