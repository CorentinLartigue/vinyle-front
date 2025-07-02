// src/components/shared/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, Search, User, Heart, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png'
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
    cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        router.push('/');
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                {/* Navigation desktop */}
                <nav className="hidden lg:flex justify-center py-3 border-b border-gray-200">
                    <div className="flex space-x-8">
                        <Link href="/" className={`transition-colors font-medium ${router.pathname === '/' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                            Accueil
                        </Link>
                        <div className="relative group">
                            <Link href="/category" className={`transition-colors flex items-center font-medium ${router.pathname === '/category' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                Catégories
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        <div className="relative group">
                            <Link href="/product" className={`transition-colors flex items-center font-medium ${router.pathname === '/product' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                Produits
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        <div className="relative group">
                            <Link href="/blog" className={`transition-colors flex items-center font-medium ${router.pathname === '/blog' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                Blog
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        {isAuthenticated && (
                            <div className="relative group">
                                <Link href="/account" className={`transition-colors flex items-center font-medium ${router.pathname === '/account' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                    Mon Compte
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link href="/">
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <Image
                                    className="w-10 h-10 rounded-full"
                                    src={Gramophone}
                                    alt="Logo DoVinyl"
                                />
                                <span className="text-2xl font-bold text-black">DoVinyl</span>
                            </div>
                        </Link>
                    </div>

                    {/* Barre de recherche */}
                    <div className="flex-1 flex justify-center max-w-2xl mx-8 hidden md:block">
                        <div className="flex w-full">
                            <input
                                type="text"
                                placeholder="Rechercher des articles..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                            />
                            <button className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-900 transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Actions utilisateur */}
                    <div className="flex items-center space-x-6">
                        {/* Menu mobile */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-gray-700 hover:text-orange-500"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* Actions desktop */}
                        <div className="hidden md:flex items-center space-x-6">
                            {!isAuthenticated ? (
                                <Link href="/login" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors">
                                    <User className="w-5 h-5" />
                                    <span className="hidden lg:block text-sm">Connexion</span>
                                </Link>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="hidden lg:block text-sm">
                                            {user?.firstName || user?.email?.split('@')[0] || 'Mon compte'}
                                        </span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                                            <Link
                                                href="/account"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Mon profil
                                            </Link>
                                            <Link
                                                href="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Mes commandes
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Paramètres
                                            </Link>
                                            <hr className="my-1" />
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Se déconnecter</span>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Link href="/wishlist" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span className="hidden lg:block text-sm">Favoris</span>
                            </Link>

                            <Link href="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors relative">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="hidden lg:block text-sm">Panier</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Menu mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        {/* Barre de recherche mobile */}
                        <div className="mb-4">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none text-sm"
                                />
                                <button className="px-3 py-2 bg-gray-800 text-white rounded-r-md">
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Navigation mobile */}
                        <div className="space-y-2 mb-4">
                            <Link
                                href="/"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/category"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Catégories
                            </Link>
                            <Link
                                href="/product"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Produits
                            </Link>
                            <Link
                                href="/blog"
                                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    href="/account"
                                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Mon Compte
                                </Link>
                            )}
                        </div>

                        {/* Actions utilisateur mobile */}
                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Se connecter</span>
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User className="w-5 h-5" />
                                        <span>S'inscrire</span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="py-2 px-4 text-sm text-gray-500 border-b border-gray-200">
                                        Connecté en tant que {user?.firstName || user?.email?.split('@')[0]}
                                    </div>
                                    <Link
                                        href="/account"
                                        className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Mon profil</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded w-full text-left"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Se déconnecter</span>
                                    </button>
                                </>
                            )}

                            <Link
                                href="/wishlist"
                                className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Heart className="w-5 h-5" />
                                <span>Favoris</span>
                            </Link>

                            <Link
                                href="/cart"
                                className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded relative"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Panier</span>
                                {cartCount > 0 && (
                                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;