import React from 'react';
import Link from "next/link";
import img from '@/assets/img.png'

const Navbar: React.FC = () => {

  return (
    <div className="bg-[#002147] text-white">
      <header className="bg-[#002147] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-extrabold tracking-wide">
            <Link href="/" className="hover:text-[#f5f5dc] transition duration-300">
              DoVinyl
            </Link>
          </div>
          <div>
            <img
                src={img.src}
                alt="Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-cover rounded-full border-2 border-white shadow-md ml-4"
            />
          </div>
        </div>
      </header>

      <nav className="bg-[#002147] text-white py-3 border-t-2 border-[#f5f5dc]">
        <div className="container mx-auto flex justify-center space-x-8">
          <Link
              href="/"
            className="hover:text-[#f5f5dc] transition duration-300 font-semibold"
          >
            Accueil
          </Link>
          <Link
              href="/evenements"
            className="hover:text-[#f5f5dc] transition duration-300 font-semibold"
          >
            Evenements
          </Link>
          <Link
              href="/artistes"
            className="hover:text-[#f5f5dc] transition duration-300 font-semibold"
          >
            Artistes
          </Link>
          <Link
              href="/shop"
            className="hover:text-[#f5f5dc] transition duration-300 font-semibold"
          >
            Boutique
          </Link>
          <Link
              href="/connexion"
            className="hover:text-[#f5f5dc] transition duration-300 font-semibold"
          >
            Connexion
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
