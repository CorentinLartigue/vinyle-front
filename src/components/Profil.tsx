'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Package, User, Edit2, Trash2, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { orderService, Order, OrderProduct } from '@/services/orderServices';
import { useToast } from '@/context/ToastProvider';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const Profil: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: profile } = useAuth();
  const { showError } = useToast();

  // Récupérer les commandes depuis l'API
  useEffect(() => {
    const fetchOrders = async () => {
      if (!profile) return;
      
      setLoading(true);
      try {
        const response = await orderService.getOrders();
        if (response.success && response.data) {
          setOrders(response.data);
        } else {
          showError('Erreur lors de la récupération des commandes');
        }
      } catch (error) {
        showError('Erreur lors de la récupération des commandes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [profile, showError]);

  const userProfile = profile ? {
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    email: profile.email || '',
    phone: '',
    address: profile.adress || '', 
    city: profile.city || '',
    postalCode: profile.postalCode || '',
    country: 'France' 
  } : {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  const tabs = [
    { id: 'orders', label: 'Mes Commandes', icon: Package, count: orders.length },
    { id: 'profile', label: 'Mon Profil', icon: User }
  ];



  return (
    <div className="min-h-screen bg-white">
      <div className="bg-emerald-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              👋
            </div>
            <div>
              <h1 className="text-3xl font-bold">Bonjour, {userProfile.firstName} !</h1>
              <p className="text-emerald-100">Gérez votre compte DoVinyl</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              <div className="p-4 bg-emerald-500 text-white">
                <h3 className="font-semibold text-lg">Navigation</h3>
              </div>
              <div className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full p-4 rounded-lg font-medium transition-all duration-200 mb-2 ${
                        activeTab === tab.id
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="flex-1 text-left">{tab.label}</span>
                        {tab.count !== undefined && (
                          <span className={`px-2 py-1 rounded-full text-xs min-w-[20px] ${
                            activeTab === tab.id ? 'bg-white/20' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Mes Commandes</h2>
                  <span className="text-sm text-gray-500">{orders.length} commande{orders.length > 1 ? 's' : ''}</span>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Chargement des commandes...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Aucune commande trouvée</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order, index) => (
                      <div key={index} className="bg-white border border-emerald-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">Commande #{index + 1}</h3>
                            <p className="text-gray-600 text-sm">
                              Passée le {new Date(order.orderDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              En cours
                            </span>
                            <p className="text-lg font-bold text-emerald-600 mt-1">
                              {order.products.length} produit{order.products.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.products.map((product, productIndex) => (
                            <div key={productIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div>
                                <span className="font-medium">{product.productName}</span>
                              </div>
                              <span className="text-emerald-600 font-medium">{product.price}€</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="text-lg font-bold text-gray-800">
                            Total: {order.products.reduce((sum, product) => sum + product.price, 0)}€
                          </div>
                          <div className="flex space-x-3">
                            <button className="flex items-center space-x-1 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">
                              <Eye size={16} />
                              <span>Voir détails</span>
                            </button>
                            <button className="px-4 py-2 border border-emerald-300 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors">
                              Suivre la livraison
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Mon Profil</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">
                    <Edit2 size={16} />
                    <span>Modifier</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-emerald-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-800">Informations personnelles</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Prénom</label>
                        <p className="text-gray-800 font-medium">{userProfile.firstName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nom</label>
                        <p className="text-gray-800 font-medium">{userProfile.lastName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <p className="text-gray-800 font-medium">{userProfile.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Téléphone</label>
                        <p className="text-gray-800 font-medium">{userProfile.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-emerald-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-800">Adresse de livraison</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Adresse</label>
                        <p className="text-gray-800 font-medium">{userProfile.address}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Ville</label>
                        <p className="text-gray-800 font-medium">{userProfile.city}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Code postal</label>
                        <p className="text-gray-800 font-medium">{userProfile.postalCode}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Pays</label>
                        <p className="text-gray-800 font-medium">{userProfile.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white border border-emerald-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-emerald-800">Sécurité</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">
                      Changer le mot de passe
                    </button>
                    <button className="px-4 py-2 border border-emerald-300 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors">
                      Supprimer le compte
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;