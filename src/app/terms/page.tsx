'use client'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
        <h1 className="text-gray-900 text-3xl font-bold mb-2 text-center">TERMOS DE USO — ESTOU BEM</h1>
        <p className="text-gray-500 text-sm text-center mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-base">
            Bem-vindo(a) ao <strong>Estou Bem</strong>.<br />
            Ao utilizar este aplicativo, você concorda integralmente com os termos descritos abaixo. Caso não concorde, não utilize o serviço.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. SOBRE O ESTOU BEM</h2>
            <p className="mb-3">
              O Estou Bem é um aplicativo digital que permite ao usuário realizar um check-in voluntário de presença, com o objetivo de indicar que está bem.
            </p>
            <p className="mb-2">O aplicativo:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>não é um serviço médico</li>
              <li>não é um serviço de emergência</li>
              <li>não realiza monitoramento em tempo real</li>
              <li>não substitui cuidados de saúde, familiares ou serviços públicos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. FUNCIONAMENTO DO SERVIÇO</h2>
            <p className="mb-3">
              O usuário pode registrar sua presença diariamente por meio do aplicativo.
            </p>
            <p className="mb-3">
              Caso o usuário não realize o check-in por <strong>48 horas consecutivas</strong>, o sistema enviará automaticamente uma notificação por e-mail e/ou SMS para um contato de confiança previamente cadastrado.
            </p>
            <p>
              Essa notificação tem caráter informativo, não emergencial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. RESPONSABILIDADE DO USUÁRIO</h2>
            <p className="mb-2">Ao utilizar o app, o usuário declara que:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li>As informações fornecidas são verdadeiras</li>
              <li>O contato de confiança foi informado e concorda em receber notificações</li>
              <li>Compreende as limitações do serviço</li>
            </ul>
            <p className="mb-2">O usuário é o único responsável por:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Manter seus dados atualizados</li>
              <li>Realizar os check-ins quando desejar</li>
              <li>Escolher adequadamente seu contato de confiança</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. LIMITAÇÃO DE RESPONSABILIDADE</h2>
            <p className="mb-2">O Estou Bem não se responsabiliza por:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li>Falhas de comunicação (internet, e-mail, SMS)</li>
              <li>Atrasos ou não entrega de notificações</li>
              <li>Interpretação das mensagens pelo contato de confiança</li>
              <li>Eventos médicos, acidentes ou óbitos</li>
            </ul>
            <p>
              O aplicativo atua apenas como uma ferramenta de apoio e registro, sem garantia de intervenção externa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. PRIVACIDADE E DADOS</h2>
            <p className="mb-2">Os dados coletados são utilizados exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li>Funcionamento do aplicativo</li>
              <li>Envio de notificações previstas</li>
            </ul>
            <p className="mb-3">
              Não comercializamos dados pessoais.
            </p>
            <p>
              Para mais informações, consulte nossa Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. ALTERAÇÕES NOS TERMOS</h2>
            <p className="mb-3">
              O Estou Bem pode atualizar estes Termos de Uso a qualquer momento.
            </p>
            <p>
              O uso contínuo do aplicativo após alterações implica concordância com os novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. CONTATO</h2>
            <p className="mb-3">
              Em caso de dúvidas, suporte ou solicitações, entre em contato:
            </p>
            <p className="font-medium">
              📧 suporte@estoubem.net
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. ACEITE</h2>
            <p>
              Ao criar uma conta e utilizar o aplicativo, o usuário declara que leu, compreendeu e concorda com estes Termos de Uso.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={() => window.close()}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Fechar esta janela
          </button>
        </div>
      </div>
    </div>
  )
}
