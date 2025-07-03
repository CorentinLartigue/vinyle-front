import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/context/ToastProvider";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartProvider";
import { recommendationService } from "@/services/Hook recommendation";

const Success: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const { user: profile } = useAuth();
  const { cartItems, clearCart } = useCart();

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (!cartItems.length) {
      showError("Aucun produit à enregistrer");
      return;
    }

    const processOrder = async () => {
      const orderPayload = {
        orderDate: new Date().toISOString(),
        productIds: cartItems.map(item => item.id),
        profileId: profile.id 
      };

      try {
        const response = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*"
          },
          body: JSON.stringify(orderPayload)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
        }
        
        await response.json();
        showSuccess("Commande enregistrée avec succès !");
        clearCart();
        
        // Mise à jour de l'historique d'achat pour les recommandations
        try {
          const updatePromises = cartItems.map(item =>
            recommendationService.updatePurchaseHistory(profile!.id, item.id)
          );
 
          await Promise.all(updatePromises);
          console.log("Historique d'achat mis à jour pour tous les articles");
        } catch (updateError) {
          console.error("Erreur lors de la mise à jour de l'historique d'achat:", updateError);
          // Ne pas faire échouer le processus si la mise à jour des recommandations échoue
          showError("Commande enregistrée, mais erreur lors de la mise à jour des recommandations");
        }
        
      } catch (err) {
        showError("Erreur lors de l'enregistrement de la commande : " + err);
      }
    };

    processOrder();
  }, [profile, cartItems, showSuccess, showError, clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-green-700 mb-4">Paiement réussi !</h1>
      <p className="text-lg text-green-800 mb-8">Merci pour votre commande. Vous recevrez un email de confirmation sous peu.</p>
      <Link href="/" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default Success; 