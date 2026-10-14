// src/data/mockData.ts

export interface Problem {
  id: string;
  title: string;
  category: "Gameplay" | "UI/UX" | "Performance" | "Balanceamento" | "Comunidade";
  severity: "Crítico" | "Alto" | "Médio" | "Baixo";
  occurrences: number;
  status: "Pendente" | "Em Análise" | "Resolvido";
  summary: string;
  aiSuggestions: {
    gameDesign: string;
    uiUx: string;
    code: string;
  };
}

export interface GameData {
  id: string;
  name: string;
  genre: string;
  totalFeedback: number;
  criticalIssues: number;
  satisfactionScore: number; // 0 a 100
  problems: Problem[];
  weeklyTrends: { week: string; complaints: number }[];
  competitorComparison: {
    competitorName: string;
    theirWeakness: string;
    ourAdvantage: string;
  };
}

export const MOCK_GAMES: Record<string, GameData> = {
  valorant: {
    id: "valorant",
    name: "Valorant",
    genre: "Tactical FPS",
    totalFeedback: 4250,
    criticalIssues: 12,
    satisfactionScore: 74,
    weeklyTrends: [
      { week: "Semana 1", complaints: 1100 },
      { week: "Semana 2", complaints: 950 },
      { week: "Semana 3", complaints: 1300 },
      { week: "Semana 4", complaints: 900 },
    ],
    competitorComparison: {
      competitorName: "CS2 (Counter-Strike 2)",
      theirWeakness: "Sistema anti-cheat vacilante e tickrate inconstante.",
      ourAdvantage: "Vanguard Kernel-level e infraestrutura de servidores 128-tick.",
    },
    problems: [
      {
        id: "val-1",
        title: "Crash do jogo associado ao driver do Riot Vanguard",
        category: "Performance",
        severity: "Crítico",
        occurrences: 1420,
        status: "Pendente",
        summary: "Jogadores relatam tela azul (BSOD) logo após a atualização da Engine, especificamente em GPUs Nvidia série 30.",
        aiSuggestions: {
          gameDesign: "Implementar rollback temporário da versão do anti-cheat para afetados.",
          uiUx: "Adicionar aviso no menu principal informando sobre a incompatibilidade de driver.",
          code: "Atualizar a checagem de hook de memória no Vanguard para tratar exceções em GPUs Ampere.",
        },
      },
      {
        id: "val-2",
        title: "Regeneração/Feedback visual do flash da Reyna inconsistente",
        category: "Gameplay",
        severity: "Alto",
        occurrences: 850,
        status: "Em Análise",
        summary: "A habilidade 'Olhar Devorador' não está cegando inimigos na linha de visão periférica.",
        aiSuggestions: {
          gameDesign: "Ajustar o cone de visão de cegueira de 60° para 75°.",
          uiUx: "Aumentar a opacidade do efeito de névoa roxa na tela do jogador afetado.",
          code: "Recalcular o raycast de linha de visão a partir do centro da câmera do cliente.",
        },
      },
    ],
  },

  minecraft: {
    id: "minecraft",
    name: "Minecraft",
    genre: "Sandbox / Survival",
    totalFeedback: 8900,
    criticalIssues: 8,
    satisfactionScore: 88,
    weeklyTrends: [
      { week: "Semana 1", complaints: 2100 },
      { week: "Semana 2", complaints: 2300 },
      { week: "Semana 3", complaints: 2200 },
      { week: "Semana 4", complaints: 2300 },
    ],
    competitorComparison: {
      competitorName: "Roblox",
      theirWeakness: "Qualidade visual e mecânicas de física muito inconsistentes entre experiências.",
      ourAdvantage: "Mundo infinito procedural consistente e ecossistema de mods consolidado.",
    },
    problems: [
      {
        id: "mc-1",
        title: "Queda brusca de FPS ao carregar novos Chunks no Nether",
        category: "Performance",
        severity: "Crítico",
        occurrences: 3100,
        status: "Pendente",
        summary: "Renderização de iluminação fluida em grandes lagos de lava causa travamentos de até 2 segundos.",
        aiSuggestions: {
          gameDesign: "Reduzir a distância de atualização de iluminação dinâmica de fluidos no Nether.",
          uiUx: "Adicionar configuração gráfica rápida para 'Iluminação de Fluidos' no menu.",
          code: "Mover o cálculo de iluminação dos blocos de lava para threads secundárias em paralelo.",
        },
      },
      {
        id: "mc-2",
        title: "Dificuldade na gestão do inventário sem teclas de atalho claras",
        category: "UI/UX",
        severity: "Médio",
        occurrences: 1200,
        status: "Resolvido",
        summary: "Novos jogadores relatam frustração ao mover itens rapidamente para baús no inventário padrão.",
        aiSuggestions: {
          gameDesign: "Adicionar opção de ordenação automática de baús com um clique.",
          uiUx: "Inserir botão visual de 'Mover Tudo' no topo da interface do baú.",
          code: "Implementar atalho `Shift + Clique Duplo` para transferência em massa por categoria.",
        },
      },
    ],
  },

  fortnite: {
    id: "fortnite",
    name: "Fortnite",
    genre: "Battle Royale",
    totalFeedback: 6100,
    criticalIssues: 15,
    satisfactionScore: 81,
    weeklyTrends: [
      { week: "Semana 1", complaints: 1800 },
      { week: "Semana 2", complaints: 1500 },
      { week: "Semana 3", complaints: 1400 },
      { week: "Semana 4", complaints: 1400 },
    ],
    competitorComparison: {
      competitorName: "Free Fire",
      theirWeakness: "Gráficos datados e dependência excessiva de mecânicas pay-to-win.",
      ourAdvantage: "Unreal Engine 5 de ponta, crossovers globais e passe de batalha 100% cosmético.",
    },
    problems: [
      {
        id: "fn-1",
        title: "Delay de construção mecânica com ping acima de 40ms",
        category: "Gameplay",
        severity: "Alto",
        occurrences: 2400,
        status: "Pendente",
        summary: "A colocação de paredes e rampas apresenta falhas e atrasos em confrontos rápidos de 'box fight'.",
        aiSuggestions: {
          gameDesign: "Ajustar a tolerância de predição de construção no lado do cliente.",
          uiUx: "Mostrar um indicador visual discreto no cursor quando a grade de construção falhar.",
          code: "Otimizar o pacote de rede enviado na ação de Turbo Build.",
        },
      },
    ],
  },

  lol: {
    id: "lol",
    name: "League of Legends",
    genre: "MOBA",
    totalFeedback: 12400,
    criticalIssues: 22,
    satisfactionScore: 62,
    weeklyTrends: [
      { week: "Semana 1", complaints: 3200 },
      { week: "Semana 2", complaints: 3100 },
      { week: "Semana 3", complaints: 3000 },
      { week: "Semana 4", complaints: 3100 },
    ],
    competitorComparison: {
      competitorName: "Dota 2",
      theirWeakness: "Curva de aprendizado extremamente punitiva e partidas muito longas.",
      ourAdvantage: "Partidas dinâmicas, campeões carismáticos e ecossistema de eSports gigante.",
    },
    problems: [
      {
        id: "lol-1",
        title: "Hitbox de habilidades do tipo 'skillshot' desalinhadas com o terreno",
        category: "Gameplay",
        severity: "Crítico",
        occurrences: 4100,
        status: "Em Análise",
        summary: "Projéteis disparados do rio em direção à selva parecem acertar o alvo mesmo passando longe visualmente.",
        aiSuggestions: {
          gameDesign: "Padronizar a elevação visual do mapa de Summoner's Rift.",
          uiUx: "Adicionar contorno de sombra na projeção da linha de trajetória no chão.",
          code: "Corrigir a conversão de coordenadas Z 3D para o plano 2D de colisão do jogo.",
        },
      },
    ],
  },

  eldenring: {
    id: "eldenring",
    name: "Elden Ring",
    genre: "Action RPG / Soulslike",
    totalFeedback: 5300,
    criticalIssues: 5,
    satisfactionScore: 93,
    weeklyTrends: [
      { week: "Semana 1", complaints: 1400 },
      { week: "Semana 2", complaints: 1300 },
      { week: "Semana 3", complaints: 1300 },
      { week: "Semana 4", complaints: 1300 },
    ],
    competitorComparison: {
      competitorName: "Lies of P",
      theirWeakness: "Mundo linear e menor variedade de builds de combate.",
      ourAdvantage: "Mundo aberto expansivo, exploração orgânica e combate altamente customizável.",
    },
    problems: [
      {
        id: "er-1",
        title: "Stuttering (travadas de frame) na entrada de novas áreas em PCs",
        category: "Performance",
        severity: "Alto",
        occurrences: 2100,
        status: "Pendente",
        summary: "Compilação de shaders em tempo real gera micro-travamentos no momento da transição entre biomas.",
        aiSuggestions: {
          gameDesign: "Suavizar o carregamento de assets distantes na câmera do jogador.",
          uiUx: "Adicionar tela de pré-compilação de shaders na primeira inicialização do jogo.",
          code: "Pré-carregar o cache de pipeline do DirectX 12 durante as telas de carregamento.",
        },
      },
    ],
  },
};
