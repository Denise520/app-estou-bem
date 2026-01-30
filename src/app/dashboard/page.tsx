'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { History, Shield, Settings } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [checkInDone, setCheckInDone] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [configError, setConfigError] = useState(false)

  useEffect(() => {
    // Verificar se o Supabase está configurado
    if (!isSupabaseConfigured()) {
      setConfigError(true)
      setLoading(false)
      return
    }

    checkAuth()
    formatCurrentDate()
  }, [])

  const checkAuth = async () => {
    // Não fazer nada se Supabase não estiver configurado
    if (!isSupabaseConfigured()) {
      setConfigError(true)
      setLoading(false)
      return
    }

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
      await checkTodayCheckIn(user.id)
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      setConfigError(true)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrentDate = () => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    }
    const formatted = today.toLocaleDateString('pt-BR', options)
    const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)
    setCurrentDate(`Hoje, ${capitalized.split(',')[1].trim()}`)
  }

  const checkTodayCheckIn = async (uid: string) => {
    // Não fazer nada se Supabase não estiver configurado
    if (!isSupabaseConfigured()) {
      return
    }

    try {
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq('user_id', uid)
        .gte('created_at', `${today}T00:00:00`)
        .lte('created_at', `${today}T23:59:59`)
        .maybeSingle()

      if (error) {
        console.error('Erro ao verificar check-in:', error)
        return
      }

      if (data) {
        setCheckInDone(true)
      }
    } catch (error) {
      console.error('Erro ao verificar check-in:', error)
    }
  }

  const handleCheckIn = async () => {
    if (!userId || checkInDone) return

    // Não fazer nada se Supabase não estiver configurado
    if (!isSupabaseConfigured()) {
      alert('Configure o Supabase para usar esta funcionalidade.')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('check_ins')
        .insert([
          { 
            user_id: userId,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Erro ao registrar check-in:', error)
        alert('Erro ao registrar presença. Tente novamente.')
        return
      }

      setCheckInDone(true)
    } catch (error) {
      console.error('Erro ao registrar check-in:', error)
      alert('Erro ao registrar presença. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-teal-200">
        <div className="text-white text-xl">Carregando...</div>
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
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-teal-200">
      {/* Cabeçalho */}
      <header className="w-full py-6 px-4 flex items-center justify-center gap-4">
        <Image
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/a1faf0fd-2dae-4cc7-89d3-7777dde3ac8d.jpg"
          alt="Logo Estou Bem"
          width={60}
          height={60}
          className="rounded-full shadow-lg"
        />
        <h1 className="text-white text-2xl md:text-3xl font-bold">Estou Bem</h1>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        {/* Data */}
        <p className="text-white text-lg md:text-xl mb-8 opacity-90">
          {currentDate}
        </p>

        {/* Texto Central */}
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-12">
          Confirme sua presença hoje
        </h2>

        {/* Botão Principal - Verde Menta */}
        <button
          onClick={handleCheckIn}
          disabled={checkInDone}
          className={`
            px-16 py-6 rounded-full text-xl md:text-2xl font-bold
            transition-all duration-300 shadow-2xl
            ${checkInDone 
              ? 'bg-white/30 text-white/60 cursor-not-allowed' 
              : 'bg-[#98FF98] text-gray-800 hover:scale-105 hover:shadow-3xl active:scale-95 hover:bg-[#7FE87F]'
            }
          `}
        >
          {checkInDone ? 'Presença confirmada hoje' : 'Estou bem'}
        </button>

        {/* Mensagem de Confirmação */}
        {checkInDone && (
          <p className="text-white text-lg mt-6 animate-fade-in">
            ✓ Presença confirmada hoje.
          </p>
        )}

        {/* Informação Secundária */}
        <p className="text-white/70 text-sm md:text-base text-center mt-16 max-w-md px-4">
          Se você ficar 48 horas sem confirmar presença, seu contato de segurança será avisado.
        </p>
      </main>

      {/* Rodapé com Links */}
      <footer className="w-full py-6 px-4 flex items-center justify-center gap-6 flex-wrap">
        <button
          onClick={() => router.push('/historico')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200"
        >
          <History size={24} />
          <span className="text-base md:text-lg font-medium">Histórico</span>
        </button>

        <button
          onClick={() => router.push('/contato-seguranca')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200"
        >
          <Shield size={24} />
          <span className="text-base md:text-lg font-medium">Contato</span>
        </button>

        <button
          onClick={() => router.push('/configuracoes')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200"
        >
          <Settings size={24} />
          <span className="text-base md:text-lg font-medium">Configurações</span>
        </button>
      </footer>
    </div>
  )
}
