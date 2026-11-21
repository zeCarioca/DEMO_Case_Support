import { PolicyDocument } from './policyTypes.js';

export const CLIENT_COMMUNICATION_POLICY: PolicyDocument = {
  id: 'client-comm',
  code: 'SOP-COMM-01',
  title: 'Diretrizes & Procedimentos de Comunicação com Clientes',
  originalTitle: 'Policies & Procedures - Client Communication',
  area: 'Customer Service & Operações',
  creationDate: '28/11/2023',
  createdBy: 'Coordenação Operacional',
  objective:
    'Padronizar as melhores práticas de abordagem corporativa e segurança da informação no contato com clientes por todos os colaboradores de atendimento.',
  scope:
    'Obrigatório para todos os profissionais de Customer Service (Front Desk, Receptionist, Case Manager, Case Support, Financial, Associate e Affidavit).',
  concept:
    'A comunicação com clientes deve ser centralizada, auditável e segura. O uso de canais pessoais ou informais (como WhatsApp) é expressamente proibido para resguardar o sigilo profissional e garantir o acompanhamento de toda a equipe.',
  tags: ['Comunicação', 'Ring Central', 'MyCase', 'Customer Service', 'Segurança'],
  sections: [
    {
      title: '1. Verificação Prévia de Casos Abertos',
      subtitle: 'Checagem Obrigatória de Demandas Conexas',
      content: [
        'Antes de qualquer tentativa de contato, você deve checar todos os casos abertos do cliente no MyCase.',
        'Certifique-se com precisão de que a pendência ou documento solicitado já não foi enviado pelo cliente em outro processo correlato da família ou empresa.'
      ]
    },
    {
      title: '2. Proibição Expressa do Uso do WhatsApp',
      subtitle: 'Diretriz de Segurança Corporativa e Compliance',
      content: [
        'O WhatsApp NÃO É uma opção autorizada para manter comunicação corporativa segura com clientes da Apex IP & Tech Law Group.',
        'O uso de mensagens via WhatsApp impede o registro institucional das conversas, prejudica o compliance e não permite o acompanhamento contínuo pelos demais membros da equipe jurídica.'
      ],
      warning:
        'REGRA INEGOCIÁVEL: WhatsApp IS NOT an option. Toda comunicação deve ocorrer exclusivamente via Ring Central e canais oficiais do MyCase.'
    },
    {
      title: '3. Primeira e Principal Opção: Ligação via Ring Central',
      subtitle: 'Protocolo de Abordagem Telefônica (Até 3 Tentativas)',
      content: [
        'A via prioritária é a realização de ligação telefônica corporativa através do Ring Central, efetuando até 3 tentativas sucessivas.',
        'Siga rigorosamente as etapas de boas práticas de abordagem:'
      ],
      substeps: [
        {
          code: '3.1',
          title: 'Apresentação Institucional',
          description: 'Apresente-se com clareza informando seu nome e o escritório Apex IP & Tech Law Group.'
        },
        {
          code: '3.2',
          title: 'Verificação de Momento Oportuno',
          description:
            'Pergunte educadamente se aquele é um momento oportuno para conversar com a Apex IP & Tech Law Group.',
          subitems: [
            'Se for oportuno: esclareça sobre qual caso e demanda específica se trata. Imediatamente após a chamada, registre o Status Update no MyCase.',
            'Se não for oportuno: utilize o seu Block Schedule para agendar data e horário adequados de atendimento. Registre o agendamento no Status Update.'
          ]
        },
        {
          code: '3.3',
          title: 'Ausência de Atendimento (Após 3 Tentativas)',
          description:
            'Se o cliente não atender após a terceira tentativa, é obrigatório deixar uma mensagem de correio de voz (Voicemail) e enviar um SMS com o roteiro padronizado, atualizando em seguida o Status Update.'
        }
      ]
    },
    {
      title: '4. Segunda Opção: MyCase Messages',
      subtitle: 'Portal Seguro do Cliente',
      content: [
        'Caso não haja sucesso telefônico, a segunda opção de contato oficial é o envio de mensagem direta no portal MyCase através de Communications > Messages.',
        'A demanda deve ser descrita de maneira detalhada, clara e profissional.'
      ]
    },
    {
      title: '5. Terceira Opção: E-mail pelo MyCase',
      subtitle: 'Comunicação Eletrônica Integrada',
      content: [
        'A terceira opção é o envio de e-mail formal através de Communications > Emails dentro do MyCase.',
        'A demanda deve ser integralmente detalhada e o envio requer que sua conta corporativa Google da Apex IP & Tech Law Group esteja sincronizada e integrada com o MyCase.'
      ]
    }
  ],
  snippets: [
    {
      title: 'Script Obrigatório de Voicemail & SMS (Após 3ª Tentativa)',
      badge: 'Mensagem Padronizada',
      warning: 'ATENÇÃO CRÍTICA: NÃO REVELE O NOME OU NÚMERO DO CASO NO TEXTO / VOICEMAIL!',
      text:
        '“Hi Mr/Mrs [Client], I’m [Your Name] from Apex IP & Tech Law Group, how’re you today? We tried to reach you by phone minutes ago but couldn\'t get through (or, you were unavailable). Please, let me know what’s the best time to call you. Thank you. PS: We emailed you with more details about this regarding.”',
      note: 'Esta mensagem pode ser enviada em Português caso o cliente seja lusófono e essa abordagem seja a mais adequada.'
    },
    {
      title: 'Versão em Português Autorizada',
      badge: 'Adaptação PT',
      warning: 'Lembre-se: Não revele o caso na mensagem aberta.',
      text:
        '“Olá Sr./Sra. [Cliente], aqui é o(a) [Seu Nome] da Apex IP & Tech Law Group, como vai? Tentamos contato por telefone minutos atrás, mas não conseguimos falar diretamente. Por favor, nos informe qual o melhor horário para retornarmos. Obrigado(a). PS: Enviamos também um e-mail com os detalhes sobre este assunto.”'
    }
  ]
};
