import React, { useState } from 'react';
import Image from 'next/image';
import Gramophone from '@/assets/gramophone.png'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
    regionState: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Register attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
          <h1 className="font-bold text-white" style={{fontSize: '19px'}}>Register</h1>
          <div className="text-white/90" style={{fontSize: '14px'}}>
            <span className="hover:text-white cursor-pointer">Home</span>
            <span className="mx-2">-</span>
            <span className="text-white/70">Register</span>
          </div>
        </div>
      </div>

      {/* Register Form Section */}
      <div className="py-16">
        <div className="max-w-lg mx-auto">
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
              {/* Première ligne - First Name et Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter Your First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Your Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Deuxième ligne - Email et Phone Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              {/* Troisième ligne - City et Post Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    City*
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Post Code
                  </label>
                  <input
                    type="text"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleInputChange}
                    placeholder="Post Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Quatrième ligne - Country et Region State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Country*
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Region State*
                  </label>
                  <input
                    type="text"
                    name="regionState"
                    value={formData.regionState}
                    onChange={handleInputChange}
                    placeholder="Region/State"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-gray-100"
                  />
                </div>
              </div>

              {/* Boutons */}
              <div className="flex items-center justify-between pt-6">
                <button
                  onClick={handleSubmit}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded font-medium transition-colors"
                >
                  Signup
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Have an account?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;