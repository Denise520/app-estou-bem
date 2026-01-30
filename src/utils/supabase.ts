import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação rigorosa: verificar se as URLs são válidas e não são placeholders
const isValidUrl = (url: string) => {
  if (!url) return false
  // Rejeitar URLs de exemplo/placeholder comuns
  if (url.includes('abc123') || url.includes('your-project') || url.includes('example')) {
    return false
  }
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isValidKey = (key: string) => {
  if (!key) return false
  // Rejeitar keys de exemplo/placeholder
  if (key.includes('your-anon-key') || key.includes('example') || key.length < 20) {
    return false
  }
  return true
}

// Só criar cliente se as credenciais forem válidas
export const supabase = isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Log para debug (apenas em desenvolvimento)
if (typeof window !== 'undefined' && !supabase) {
  console.warn('⚠️ Supabase não configurado ou credenciais inválidas')
  console.warn('Configure em: Configurações do Projeto → Integrações → Supabase')
}
