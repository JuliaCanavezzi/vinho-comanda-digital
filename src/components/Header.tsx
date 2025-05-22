import React from 'react';
import { ShoppingCart } from 'lucide-react';
interface HeaderProps {
  cartItemCount?: number;
}
const Header: React.FC<HeaderProps> = ({
  cartItemCount = 0
}) => {
  return <div className="w-full px-4 py-3 text-white flex items-center justify-between bg-[#4e0b1b]">
      {/* Logo Circle */}
      <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
        <span className="font-playfair text-sm">Logo</span>
      </div>
      
      {/* Restaurant Name */}
      <h1 className="font-playfair font-bold text-xl tracking-wider">COMANDA 102</h1>
      
      {/* Cart Icon */}
      <div className="relative">
        <ShoppingCart className="h-6 w-6 cursor-pointer" />
        {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-white text-[#7b1c2d] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </span>}
      </div>
    </div>;
};
export default Header;