
import React from 'react';
import { Zap, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
<header className="top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-cyan-500/30 px-6 py-1 ">

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full blur-md"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NEXUS
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">AI Tutor • IITI Community</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-600/30 hover:border-cyan-500/50">
            <Settings className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </button>
          <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-600/30 hover:border-cyan-500/50">
            <User className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;