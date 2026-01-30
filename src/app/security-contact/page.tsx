'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, Shield, Save } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function SecurityContact() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [configError, setConfigError] = useState(false)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setConfigError(true)
      return
    }
    loadContatoSeguranca()
  }, [])

  const loadContatoSeguranca = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('contatos_seguranca')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setNome(data.nome || '')
        setTelefone(data.telefone || '')
        setEmail(data.email || '')
      }
    } catch (error) {
      console.error('Erro ao carregar contato:', error)
    }
  }

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      alert('Supabase não está configurado.')
      return
    }

    if (!nome || !telefone) {
      alert('Por favor, preencha pelo menos nome e telefone.')
      return
    }

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { error } = await supabase
        .from('contatos_seguranca')
        .upsert({
          user_id: user.id,
          nome,
          telefone,
          email: email || null,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      alert('Contato de segurança salvo com sucesso!')
      router.push('/configuracoes')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar contato de segurança. Tente novamente.')
    } finally {
      setLoading(false)
    }
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
      <header className="w-full py-6 px-4 bg-gradient-to-r from-teal-400 to-blue-300 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push('/configuracoes')}
            className="text-white hover:scale-110 transition-transform"
          >
            <ArrowLeft size={28} />
          </button>
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-white" />
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Contato de Segurança
            </h1>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Informação */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Por que isso é importante?</strong><br />
              Em caso de emergência, este contato será notificado automaticamente.
              Escolha alguém de confiança que possa ajudá-lo rapidamente.
            </p>
          </div>

          {/* Formulário */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Maria Silva"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Ex: (11) 98765-4321"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                E-mail (opcional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: maria@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={24} />
              <span>{loading ? 'Salvando...' : 'Salvar Contato'}</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}
