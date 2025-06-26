import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f5dc] text-[#002147] py-6 border-t-2 border-[#002147]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm text-[#002147]">
          ©2024 Collectif Horamanea. Tous droits réservés.
        </p>

        {/* Liens */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/terms" className="hover:text-[#0056b3] transition duration-300 font-medium">
            Conditions d&apos;utilisation
          </Link>
          <Link href="/privacy" className="hover:text-[#0056b3] transition duration-300 font-medium">
            Politique de confidentialité
          </Link>
          <Link href="/contact" className="hover:text-[#0056b3] transition duration-300 font-medium">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
