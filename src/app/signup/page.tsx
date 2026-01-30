'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Verificar se Supabase está configurado
    if (!supabase) {
      setError('⚠️ Supabase não está configurado. Vá em Configurações do Projeto → Integrações → Supabase para conectar.')
      return
    }

    if (!name || !email || !phone || !password) {
      setError('Todos os campos são obrigatórios')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    if (!acceptTerms) {
      setError('Você deve aceitar os Termos de Uso para continuar')
      return
    }

    setLoading(true)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
          },
          emailRedirectTo: `${window.location.origin}/contact`
        }
      })

      setLoading(false)

      if (signUpError) {
        setError(signUpError.message || 'Erro ao criar conta. Tente novamente.')
        return
      }

      // Verificar se precisa confirmar e-mail
      if (data.user && !data.session) {
        setSuccess('✅ Conta criada! Verifique seu e-mail para confirmar o cadastro antes de fazer login.')
      } else if (data.user && data.session) {
        // Login automático bem-sucedido
        setSuccess('✅ Conta criada com sucesso! Redirecionando...')
        setTimeout(() => {
          router.push('/contact')
        }, 1500)
      }
    } catch (err) {
      setLoading(false)
      console.error('Erro no cadastro:', err)
      setError('Erro ao criar conta. Verifique sua conexão e tente novamente.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-gray-900 text-2xl font-semibold text-center mb-8">Criar Conta</h1>
        
        {!supabase && (
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-6">
            <p className="text-orange-900 text-sm font-bold mb-2">
              ⚠️ Configuração Necessária
            </p>
            <p className="text-orange-800 text-sm mb-3">
              Para criar sua conta, você precisa configurar o Supabase primeiro.
            </p>
            <p className="text-orange-800 text-sm font-medium">
              📍 Vá em: <strong>Configurações do Projeto → Integrações → Supabase</strong>
            </p>
            <p className="text-orange-700 text-xs mt-2">
              Não tem conta no Supabase? Crie gratuitamente em <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">supabase.com</a>
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={!supabase || loading}
              placeholder={!supabase ? "Configure o Supabase primeiro" : "Seu nome completo"}
            />
          </div>
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
              placeholder={!supabase ? "Configure o Supabase primeiro" : "seu@email.com"}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
              Telefone de contato
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={!supabase || loading}
              placeholder={!supabase ? "Configure o Supabase primeiro" : "(00) 00000-0000"}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              minLength={6}
              disabled={!supabase || loading}
              placeholder={!supabase ? "Configure o Supabase primeiro" : "Mínimo 6 caracteres"}
            />
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
              required
              disabled={!supabase || loading}
            />
            <label htmlFor="acceptTerms" className="text-gray-700 text-sm">
              Li e concordo com os{' '}
              <Link 
                href="/terms" 
                className="text-blue-600 hover:underline"
              >
                Termos de Uso
              </Link>
            </label>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-700 text-sm font-medium">{success}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !supabase}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Criando conta...' : !supabase ? 'Configure o Supabase primeiro' : 'Criar conta'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/login" className="text-blue-600 text-sm hover:underline">
            Já tem uma conta? Fazer login
          </Link>
        </div>
      </div>
    </div>
  )
}
