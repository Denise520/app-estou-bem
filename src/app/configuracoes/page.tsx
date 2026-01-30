'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, Mail, Lock, Shield, FileText, HelpCircle, LogOut } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function Configuracoes() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [configError, setConfigError] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError(true)
    }
  }, [])

  const handleLogout = async () => {
    if (!isSupabaseConfigured()) {
      alert('Supabase não está configurado.')
      return
    }

    setLoading(true)
    try {
      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Erro ao sair:', error)
      alert('Erro ao sair da conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const showComingSoon = (feature: string) => {
    alert('Esta funcionalidade estará disponível em breve.')
  }

  if (configError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-teal-200 px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚙️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Configuração Necessária</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Para usar o app, você precisa configurar suas credenciais do Supabase.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Como configurar:</strong>
            </p>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Clique no banner laranja no topo da página</li>
              <li>Adicione suas variáveis de ambiente do Supabase</li>
              <li>Ou conecte sua conta nas Configurações → Integrações</li>
            </ol>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Cabeçalho */}
      <header className="w-full py-6 px-4 bg-gradient-to-r from-blue-400 to-teal-300 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-white hover:scale-110 transition-transform"
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Configurações
          </h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Seção: Conta */}
          <section>
            <h2 className="text-gray-800 text-xl font-bold mb-4">Conta</h2>
            <div className="space-y-3">
              <button
                onClick={() => showComingSoon('Alterar e-mail')}
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <Mail size={24} className="text-blue-500" />
                <span className="text-gray-700 font-medium">Alterar e-mail</span>
              </button>

              <button
                onClick={() => showComingSoon('Alterar senha')}
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <Lock size={24} className="text-blue-500" />
                <span className="text-gray-700 font-medium">Alterar senha</span>
              </button>
            </div>
          </section>

          {/* Seção: Contato de Segurança */}
          <section>
            <h2 className="text-gray-800 text-xl font-bold mb-4">Contato de Segurança</h2>
            <button
              onClick={() => router.push('/security-contact')}
              className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
              <Shield size={24} className="text-teal-500" />
              <span className="text-gray-700 font-medium">Editar contato de segurança</span>
            </button>
          </section>

          {/* Seção: Termos e Suporte */}
          <section>
            <h2 className="text-gray-800 text-xl font-bold mb-4">Termos e Suporte</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/terms')}
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <FileText size={24} className="text-gray-600" />
                <span className="text-gray-700 font-medium">Termos de Uso</span>
              </button>

              <button
                onClick={() => router.push('/privacy')}
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <FileText size={24} className="text-gray-600" />
                <span className="text-gray-700 font-medium">Política de Privacidade</span>
              </button>

              <a
                href="mailto:suporte@estoubem.net"
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <HelpCircle size={24} className="text-gray-600" />
                <span className="text-gray-700 font-medium">Falar com o suporte</span>
              </a>
            </div>
          </section>

          {/* Seção: Sessão */}
          <section>
            <h2 className="text-gray-800 text-xl font-bold mb-4">Sessão</h2>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full flex items-center gap-4 px-4 py-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={24} className="text-red-500" />
              <span className="text-red-600 font-medium">
                {loading ? 'Saindo...' : 'Sair da conta'}
              </span>
            </button>
          </section>

        </div>
      </main>
    </div>
  )
}
