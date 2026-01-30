'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Cabeçalho */}
      <header className="w-full py-6 px-4 bg-gradient-to-r from-blue-400 to-teal-300 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-white hover:scale-110 transition-transform"
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Política de Privacidade
          </h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto prose prose-blue">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-0">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introdução</h2>
            <p className="text-gray-600 leading-relaxed">
              Esta Política de Privacidade descreve como o aplicativo ESTOU BEM coleta, usa e protege suas informações pessoais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Informações Coletadas</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Coletamos as seguintes informações:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Informações de cadastro (nome, e-mail, telefone)</li>
              <li>Contato de segurança (nome e telefone)</li>
              <li>Dados de localização (quando você aciona o botão de emergência)</li>
              <li>Informações de uso do aplicativo</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Como Usamos Suas Informações</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Suas informações são usadas para:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Fornecer os serviços do aplicativo</li>
              <li>Enviar alertas de emergência ao seu contato de segurança</li>
              <li>Melhorar a experiência do usuário</li>
              <li>Comunicar atualizações importantes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Compartilhamento de Dados</h2>
            <p className="text-gray-600 leading-relaxed">
              Não compartilhamos suas informações pessoais com terceiros, exceto:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
              <li>Com seu contato de segurança, quando você aciona um alerta</li>
              <li>Quando exigido por lei</li>
              <li>Para proteger nossos direitos legais</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Segurança dos Dados</h2>
            <p className="text-gray-600 leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Seus Direitos</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Você tem direito a:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Revogar consentimentos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Contato</h2>
            <p className="text-gray-600 leading-relaxed">
              Para questões sobre esta política, entre em contato:
            </p>
            <p className="text-blue-600 font-medium mt-2">
              <a href="mailto:suporte@estoubem.net" className="hover:underline">
                suporte@estoubem.net
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Alterações nesta Política</h2>
            <p className="text-gray-600 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas através do aplicativo ou por e-mail.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
