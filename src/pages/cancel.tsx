import React from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

const Cancel: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
    <XCircle className="w-20 h-20 text-red-500 mb-6" />
    <h1 className="text-3xl font-bold text-red-700 mb-4">Paiement annulé</h1>
    <p className="text-lg text-red-800 mb-8">Votre paiement a été annulé ou a échoué. Vous pouvez réessayer ou revenir à l'accueil.</p>
    <Link href="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow">
      Retour à l'accueil
    </Link>
  </div>
);

export default Cancel; 