import React from 'react';
import Image from 'next/image';
import Gramophone from '@/assets/gramophone.png';

const team = [
  { name: 'Corentin', role: 'Développeur FullStack' },
  { name: 'Yanis', role: 'Développeur FullStack' },
  { name: 'Gabriel', role: 'Développeur Backend' },
  { name: 'Robin', role: 'Développeur Backend' },
  { name: 'Matis', role: 'Développeur Frontend' },
];

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}

const avatarColors = [
  'bg-orange-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-purple-400',
  'bg-pink-400',
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header avec logo */}
        <section className="flex flex-col items-center mb-12">
          <div className="bg-white rounded-full shadow-lg p-3 mb-4 flex items-center justify-center">
            <Image src={Gramophone} alt="Logo DoVinyl" width={72} height={72} className="rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 text-center tracking-tight">
            DoVinyl <span className="text-orange-500">– Projet étudiant Ynov Bordeaux</span>
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mb-2">
            Projet de fin d'année 2025 à l'école Ynov Bordeaux.<br/>
            Une boutique de vinyles moderne, imaginée et développée par cinq étudiants passionnés.
          </p>
        </section>
        {/* Section équipe */}
        <section className="py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              L'équipe <span className="text-orange-500">DoVinyl</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className="group bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow p-6 flex flex-col items-center w-60 border border-orange-100 hover:border-orange-300"
                >
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold text-white mb-3 shadow ${avatarColors[i % avatarColors.length]} group-hover:scale-105 transition-transform`}>
                    {getInitials(member.name)}
                  </div>
                  <div className="font-semibold text-gray-800 text-lg text-center">{member.name}</div>
                  <div className="text-sm text-gray-500 text-center">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Section projet */}
        <section className="py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Le projet <span className="text-orange-500">DoVinyl</span>
            </h2>
            <p className="text-gray-700 text-center text-base mb-2">
              DoVinyl est une boutique fictive de vinyles, pensée pour offrir une expérience utilisateur moderne et agréable.<br/>
              Ce projet nous a permis d'explorer <b>React</b>, <b>Next.js</b>, <b>Tailwind CSS</b>, et de collaborer sur toutes les étapes d'un site e-commerce : conception, développement, design, gestion de contenu.<br/>
              <span className="block mt-2">Pour le backend, nous avons utilisé <b>NestJS</b>. Les images sont stockées sur <b>Firebase</b> et le paiement est géré via <b>Stripe</b>.</span>
            </p>
            <p className="text-gray-500 text-center text-sm mt-4">
              Merci à nos enseignants et à l'école Ynov Bordeaux pour leur accompagnement !
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 