import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/context/ToastProvider";
import { useAuth } from "@/context/AuthContext";

const Success: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const { user: profile } = useAuth();

  useEffect(() => {
    let cartItems: any[] = [];
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) {
        cartItems = JSON.parse(stored);
      }
    } catch (e) {
      showError("Erreur lors de la lecture du panier");
      return;
    }
    if (!cartItems.length) {
      showError("Aucun produit à enregistrer");
      return;
    }
    
    const orderPayload = {
      orderDate: new Date().toISOString(),
      productIds: cartItems.map(item => item.id),
      profileId: profile!.id 
    };
    
    // Envoyer la commande
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*"
      },
      body: JSON.stringify(orderPayload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de l'enregistrement de la commande");
        return res.json();
      })
      .then(() => {
        showSuccess("Commande enregistrée avec succès !");
        // Vider le panier du localStorage
        localStorage.removeItem("cartItems");
      })
      .catch(err => {
        showError("Erreur lors de l'enregistrement de la commande : " + err);
      });
  }, [profile, showSuccess, showError]);

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