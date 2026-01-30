'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function ContatoSeguranca() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState(false)
  const [configError, setConfigError] = useState(false)
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  })

  useEffect(() => {
    // Verificar se o Supabase está configurado
    if (!isSupabaseConfigured()) {
      setConfigError(true)
      setLoading(false)
      return
    }

    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        console.error('Erro de autenticação:', authError)
        setConfigError(true)
        setLoading(false)
        return
      }

      if (!user) {
        router.push('/login')
        return
      }

      setUserId(user.id)
      setConfigError(false)
      await loadContatoSeguranca(user.id)
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      setConfigError(true)
    } finally {
      setLoading(false)
    }
  }

  const loadContatoSeguranca = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('contatos_seguranca')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle()

      if (error) {
        console.error('Erro ao carregar contato:', error)
        return
      }

      if (data) {
        setFormData({
          nome: data.nome || '',
          email: data.email || '',
          telefone: data.telefone || ''
        })
      }
    } catch (error) {
      console.error('Erro ao carregar contato:', error)
    }
  }

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Aplica máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData({ ...formData, telefone: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userId) return

    setSaving(true)
    setSuccessMessage(false)

    try {
      // Verifica se já existe um contato
      const { data: existingContact } = await supabase
        .from('contatos_seguranca')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle()

      if (existingContact) {
        // Atualiza contato existente
        const { error } = await supabase
          .from('contatos_seguranca')
          .update({
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)

        if (error) {
          console.error('Erro ao atualizar contato:', error)
          return
        }
      } else {
        // Cria novo contato
        const { error } = await supabase
          .from('contatos_seguranca')
          .insert([{
            user_id: userId,
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone
          }])

        if (error) {
          console.error('Erro ao criar contato:', error)
          return
        }
      }

      setSuccessMessage(true)
      setTimeout(() => setSuccessMessage(false), 3000)
    } catch (error) {
      console.error('Erro ao salvar contato:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600 text-xl">Carregando...</div>
      </div>
    )
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
            Contato de Segurança
          </h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Texto Explicativo */}
          <p className="text-gray-600 text-base md:text-lg mb-8 text-center">
            Se você ficar 48 horas sem confirmar presença, essa pessoa será avisada automaticamente.
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome Completo */}
            <div>
              <label htmlFor="nome" className="block text-gray-700 font-medium mb-2">
                Nome completo do contato
              </label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Ex: Maria Silva"
              />
            </div>

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                E-mail do contato
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Ex: maria@email.com"
              />
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="telefone" className="block text-gray-700 font-medium mb-2">
                Telefone do contato
              </label>
              <input
                type="tel"
                id="telefone"
                value={formData.telefone}
                onChange={handlePhoneChange}
                required
                maxLength={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* Botão Salvar */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-blue-400 to-teal-300 text-white font-bold py-4 rounded-lg hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {saving ? 'Salvando...' : 'Salvar contato'}
            </button>

            {/* Mensagem de Sucesso */}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center animate-fade-in">
                ✓ Contato de segurança salvo com sucesso.
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}
