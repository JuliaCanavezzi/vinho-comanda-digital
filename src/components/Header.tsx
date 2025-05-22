
import React from 'react';
import { Search, ShoppingCart, X } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-wine px-4 py-3 text-white">
        {/* Logo Placeholder */}
        <div className="h-8 w-8 bg-white/20 rounded-md flex items-center justify-center">
          <span className="font-playfair text-sm">Logo</span>
        </div>
        
        {/* Restaurant Name */}
        <h1 className="font-playfair font-bold text-xl tracking-wider">COMANDA</h1>
        
        {/* Cart & Close Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-wine text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <X className="h-6 w-6 cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-white shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Pesquise aqui..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-wine focus:border-wine text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
