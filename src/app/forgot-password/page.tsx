'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!email) {
      setError('Por favor, informe seu e-mail')
      return
    }

    if (!supabase) {
      setError('⚠️ Supabase não configurado. Vá em Configurações → Integrações → Supabase')
      return
    }

    setLoading(true)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      setLoading(false)

      if (resetError) {
        console.error('Erro ao enviar e-mail:', resetError)
        // Mesmo com erro, mostramos mensagem neutra por segurança
        setSuccess(true)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setLoading(false)
      console.error('Erro ao enviar e-mail:', err)
      // Mensagem neutra por segurança
      setSuccess(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-gray-900 text-2xl font-semibold text-center mb-3">
          Recuperar senha
        </h1>
        
        <p className="text-gray-600 text-sm text-center mb-8">
          Informe seu e-mail para receber um link de redefinição de senha.
        </p>

        {!supabase && (
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-6">
            <p className="text-orange-900 text-sm font-bold mb-2">
              ⚠️ Configuração Necessária
            </p>
            <p className="text-orange-800 text-sm">
              Configure o Supabase em: <strong>Configurações → Integrações → Supabase</strong>
            </p>
          </div>
        )}

        {success ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-blue-900 text-sm">
                Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.
              </p>
            </div>
            
            <Link 
              href="/login"
              className="block w-full text-center bg-gray-100 text-gray-700 py-2.5 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Voltar para o login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                disabled={!supabase || loading}
                placeholder="seu@email.com"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !supabase}
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar link de recuperação'}
            </button>

            <Link 
              href="/login"
              className="block text-center text-gray-600 text-sm hover:text-gray-900 transition-colors"
            >
              Voltar para o login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
