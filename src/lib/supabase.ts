import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Função helper para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '')
}

// Criar cliente apenas se estiver configurado, caso contrário retorna um mock
const createSupabaseClient = () => {
  if (isSupabaseConfigured()) {
    return createClient(supabaseUrl, supabaseAnonKey)
  }
  
  // Retorna um cliente mock que não faz requisições reais
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: new Error('Supabase não configurado') }),
      signOut: async () => ({ error: new Error('Supabase não configurado') }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Supabase não configurado') }),
      signUp: async () => ({ data: { user: null, session: null }, error: new Error('Supabase não configurado') }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          gte: () => ({
            lte: () => ({
              maybeSingle: async () => ({ data: null, error: new Error('Supabase não configurado') })
            })
          })
        }),
        single: async () => ({ data: null, error: new Error('Supabase não configurado') })
      }),
      insert: async () => ({ error: new Error('Supabase não configurado') }),
      update: () => ({
        eq: async () => ({ error: new Error('Supabase não configurado') })
      }),
      upsert: async () => ({ error: new Error('Supabase não configurado') })
    })
  } as any
}

export const supabase = createSupabaseClient()
