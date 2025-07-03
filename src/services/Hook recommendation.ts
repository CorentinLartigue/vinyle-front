
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const recommendationService = {
  // Recommandations personnalisées (favoris + historique)
  getPersonalRecommendations: async (profileId) => {
    const response = await fetch(`${API_BASE}/recommended/${profileId}`);
    return response.json();
  },

  // Recommandations globales
  getGlobalRecommendations: async () => {
    const response = await fetch(`${API_BASE}/global`);
    return response.json();
  },

  // Mettre à jour les favoris
  //Automatique a chaque Get au dessus

  // Mettre à jour l'historique d'achat
  updatePurchaseHistory: async (profileId, articleId) => {
    await fetch(`${API_BASE}/profile/${profileId}/purchase-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId })
    });
  }
};