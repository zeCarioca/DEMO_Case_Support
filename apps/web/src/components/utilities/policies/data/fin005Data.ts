import { PolicyDocument } from './policyTypes.js';

export const FIN_005_POLICY: PolicyDocument = {
  id: 'fin-005',
  code: 'FIN-005',
  title: 'Encerramento de Caso por Falta de Contato do Cliente',
  originalTitle: 'Case Closure Due to Lack of Client Contact',
  area: 'Finance & Operacional',
  creationDate: '17/02/2025',
  revisionDate: '21/02/2025',
  createdBy: 'Equipe Financeira',
  reviewedBy: 'Comitê Operacional & Jurídico',
  objective:
    'Estabelecer o procedimento formal para encerramento de casos em que o cliente não responde às tentativas de contato, mesmo após ter quitado integralmente todas as parcelas e obrigações financeiras.',
  scope:
    'Este Procedimento Operacional Padrão (SOP) aplica-se a todos os colaboradores dos departamentos operacionais (produção/legal) e à equipe de Finanças.',
  concept:
    'Este protocolo deve ser rigorosamente seguido para casos em que o cliente cumpriu todas as obrigações financeiras, mas permaneceu inativo e não respondeu a nenhuma tentativa de contato nos últimos 6 meses. O procedimento resguarda o escritório e garante a correta organização dos casos inativos.',
  tags: ['Finance', 'Operacional', 'MyCase', 'Encerramento', 'Withdrawal Letter'],
  sections: [
    {
      title: '1. Tentativas Mensais de Contato (Janela de 6 Meses)',
      subtitle: 'Etapa Prévia e Contínua da Equipe de Produção',
      content: [
        'A equipe de produção deve tentar contato com o cliente no mínimo 1 (uma) vez por mês, ao longo de 6 meses consecutivos ininterruptos.',
        'Todas as tentativas devem observar e seguir estritamente o protocolo corporativo de comunicação (POLICIES & PROCEDURES - CLIENT COMMUNICATION) via Ring Central e canais MyCase.'
      ]
    },
    {
      title: '2. Reunião de Evidências de Tentativas de Contato',
      subtitle: 'Compilação Documental após o Período de 6 Meses sem Retorno',
      content: [
        'Ao término do período de 6 meses sem qualquer resposta do cliente, a equipe de produção deve reunir a seguinte documentação comprobatória completa:'
      ],
      substeps: [
        {
          code: '2.1',
          title: 'Histórico Atualizado de Status Update',
          description:
            'Exportar e consolidar o log completo de Status Update do caso no MyCase, evidenciando as datas e os canais acionados em cada mês.'
        },
        {
          code: '2.2',
          title: 'Registros Telefônicos do Ring Central',
          description:
            'Extrato detalhado de chamadas efetuadas via Ring Central (caso necessário, solicitar o extrato formal à supervisão de atendimento).'
        },
        {
          code: '2.3',
          title: 'Resumo Descritivo Elaborado pelo CEM',
          description:
            'Elaboração de memorial descritivo assinado pelo Case Execution Manager (CEM), detalhando todas as tarefas e serviços jurídicos/operacionais realizados até aquele momento para fins contábeis e de prestação de contas.'
        },
        {
          code: '2.4',
          title: 'Anexo de Evidências na Seção Documents do MyCase',
          description:
            'Anexar todas as evidências compiladas e o resumo descritivo do CEM diretamente na aba "Documents" do caso no MyCase.'
        },
        {
          code: '2.5',
          title: 'Abertura de Tarefa para a Equipe Financeira',
          description:
            'Assim que toda a documentação estiver anexada, a equipe de produção deve criar uma tarefa formal para o time de Finanças solicitando o encerramento por falta de contato.'
        }
      ]
    },
    {
      title: '3. Notificação Formal ao Cliente & Encerramento Oficial',
      subtitle: 'Notificação de Renúncia/Encerramento (Withdrawal Letter) e Fechamento',
      content: [
        'A equipe de Finanças é responsável por redigir e enviar a Notificação Formal de Encerramento (Formal Withdrawal Letter), comunicando formalmente ao cliente que o caso será arquivado/encerrado devido à ausência prolongada de resposta.',
        'A via da carta enviada deve ser obrigatoriamente anexada na seção Documents do caso no MyCase.',
        'Após a conclusão de todas essas etapas e confirmação documental, o caso poderá ser oficialmente encerrado no MyCase.'
      ],
      warning:
        'Atenção: Nenhum caso com saldo quitado pode ser encerrado por inatividade sem a compilação prévia dos 6 registros mensais, do resumo do CEM e do envio da Withdrawal Letter pelo Finance.'
    }
  ]
};
