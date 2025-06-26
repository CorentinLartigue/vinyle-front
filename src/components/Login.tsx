import React, { useState } from 'react';
import Image from 'next/image';
import Gramophone from '@/assets/gramophone.png'

const LoginSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
          <h1 className="font-bold text-white" style={{fontSize: '19px'}}>Login</h1>
          <div className="text-white/90" style={{fontSize: '14px'}}>
            <span className="hover:text-white cursor-pointer">Home</span>
            <span className="mx-2">-</span>
            <span className="text-white/70">Login</span>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="py-16">
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            {/* Logo dans le formulaire */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Image 
                  src={Gramophone}
                  alt="DoVinyl Logo"
                  className="w-auto h-8 mr-2"
                />
                <h2 className="text-xl font-bold text-gray-800">FoodTrove</h2>
              </div>
            </div>

            {/* Formulaire */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Password*
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Forgot Password?
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded font-medium transition-colors"
                >
                  Login
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Signup?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;