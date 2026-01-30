'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = { name: '', email: '', phone: '' };
    let hasError = false;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      hasError = true;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
      hasError = true;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // TODO: Save to database
      // For now, just show success message and redirect
      alert('Pessoa de confiança cadastrada com sucesso.');
      router.push('/checkin');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-teal-400 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Pessoa de confiança
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Se você ficar dois dias sem confirmar presença, avisaremos essa pessoa.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome completo */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome da pessoa"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(DDD) número"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">Usado para envio de SMS</p>
          </div>

          {/* Botão */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Salvar pessoa de confiança
          </Button>
        </form>
      </div>
    </div>
  );
}
