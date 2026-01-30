'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface CheckIn {
  id: string
  created_at: string
  user_id: string
}

export default function Historico() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<{ date: string; hasCheckIn: boolean }[]>([])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        console.error('Erro de autenticação:', authError)
        router.push('/login')
        return
      }

      // Buscar check-ins dos últimos 30 dias
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data: checkIns, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar histórico:', error)
      }

      // Criar array com os últimos 30 dias
      const last30Days = []
      for (let i = 0; i < 30; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateString = date.toISOString().split('T')[0]
        
        // Verificar se há check-in neste dia
        const hasCheckIn = checkIns?.some((checkIn: CheckIn) => {
          const checkInDate = new Date(checkIn.created_at).toISOString().split('T')[0]
          return checkInDate === dateString
        }) || false

        last30Days.push({
          date: dateString,
          hasCheckIn
        })
      }

      setHistory(last30Days)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T12:00:00')
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long' 
    }
    return date.toLocaleDateString('pt-BR', options)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-800 text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="w-full py-6 px-4 flex items-center gap-4 bg-gradient-to-r from-blue-400 to-teal-300">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-white hover:scale-110 transition-transform"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-white text-2xl md:text-3xl font-bold">Histórico</h1>
      </header>

      {/* Lista de Histórico */}
      <main className="px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg border
                ${item.hasCheckIn 
                  ? 'bg-green-50 border-l-4 border-green-400' 
                  : 'bg-gray-50 border-gray-200'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`
                  text-lg font-medium
                  ${item.hasCheckIn ? 'text-green-700' : 'text-gray-500'}
                `}>
                  {formatDate(item.date)}
                </span>
                {item.hasCheckIn && (
                  <span className="text-green-600 text-sm font-medium">
                    Presença confirmada
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
