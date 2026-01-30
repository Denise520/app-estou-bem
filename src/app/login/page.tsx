'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isSupabaseConfigured = () => {
    return process.env.NEXT_PUBLIC_SUPABASE_URL && 
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
           process.env.NEXT_PUBLIC_SUPABASE_URL !== '' &&
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isSupabaseConfigured()) {
      setError('⚙️ Supabase não configurado. Configure em: Configurações → Integrações → Supabase')
      return
    }

    setLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        if (signInError.message.includes('Email not confirmed')) {
          setError('📧 Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada e spam.')
        } else if (signInError.message.includes('Invalid login credentials')) {
          setError('E-mail ou senha inválidos. Verifique se confirmou seu e-mail.')
        } else {
          setError(signInError.message)
        }
        setLoading(false)
        return
      }

      if (data.user) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-teal-400 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Bem-vindo de volta</h1>
        <p className="text-gray-600 text-center mb-8">Entre para confirmar sua presença</p>

        {!isSupabaseConfigured() && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              ⚙️ Configure o Supabase em: <strong>Configurações → Integrações</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={!isSupabaseConfigured() || loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={!isSupabaseConfigured() || loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isSupabaseConfigured() || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <Link 
            href="/forgot-password" 
            className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Esqueci minha senha
          </Link>
          
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
