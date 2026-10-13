/* =========================================================
   Boralá! — base de dados do protótipo (100% front-end)
   Nada aqui vai para servidor: é só conteúdo estático para
   alimentar as telas navegáveis.
   ========================================================= */

const BL_OPCOES = {
  pessoas: [
    { v: "1", label: "+ 1 pessoa" },
    { v: "2", label: "2 pessoas" },
    { v: "3", label: "3 pessoas" },
    { v: "4", label: "+ de 4 pessoas" }
  ],
  onde: [
    { v: "brasil", label: "no Brasil" },
    { v: "exterior", label: "fora do Brasil" }
  ],
  clima: [
    { v: "familia", label: "família" },
    { v: "romance", label: "romance" },
    { v: "diversao", label: "diversão" },
    { v: "negocios", label: "negócios" },
    { v: "estudo", label: "estudo" },
    { v: "turismo", label: "turismo" }
  ]
};

const BL_TIPOS = [
  { v: "praia", label: "Praia" },
  { v: "serra", label: "Serra e montanha" },
  { v: "cidade", label: "Cidade grande" },
  { v: "interior", label: "Interior e vinícolas" },
  { v: "ecoturismo", label: "Ecoturismo" }
];

const BL_ORCAMENTOS = [
  { v: "baixo", label: "Até R$ 1.000", max: 1000 },
  { v: "medio", label: "R$ 1.000 – 3.000", max: 3000 },
  { v: "alto", label: "R$ 3.000+", max: Infinity }
];
/* --------- de onde a pessoa sai ---------
   O recorte do produto é "para onde eu consigo ir saindo daqui": é a
   pergunta do brief original (viajar de ônibus para um lugar relativamente
   perto) e é o que separa o Boralá! de uma lista de "lugares
   imperdíveis". Origem e tempo entram em `busca`, junto de pessoas/onde/
   clima, e não nos filtros da lateral. */
const BL_ORIGENS = [
  { v: "saopaulo", label: "São Paulo, SP" },
  { v: "riodejaneiro", label: "Rio de Janeiro, RJ" },
  { v: "belohorizonte", label: "Belo Horizonte, MG" },
  { v: "curitiba", label: "Curitiba, PR" },
  { v: "portoalegre", label: "Porto Alegre, RS" },
  { v: "recife", label: "Recife, PE" },
  { v: "salvador", label: "Salvador, BA" }
];

/* Tempo que a pessoa aceita passar na estrada ou no ar. "Tanto faz" tem
   `max: Infinity` para o filtro não precisar de caso especial. */
const BL_TEMPOS = [
  { v: "3", label: "Até 3h de viagem", curto: "até 3h", max: 3 },
  { v: "6", label: "Até 6h de viagem", curto: "até 6h", max: 6 },
  { v: "10", label: "Até 10h de viagem", curto: "até 10h", max: 10 },
  { v: "tudo", label: "Tanto faz", curto: "qualquer distância", max: Infinity }
];

/* --------- opções dos filtros da busca ---------
   Cada grupo é uma lista de { v, label } para a interface montar sozinha
   os chips e as caixas de seleção — e para `blContagemFiltros` saber
   quais opções existem em cada grupo. */

const BL_DURACOES = [
  { v: "curta", label: "Fim de semana (até 3 noites)", min: 0, max: 3 },
  { v: "media", label: "4 a 6 noites", min: 4, max: 6 },
  { v: "longa", label: "Uma semana ou mais", min: 7, max: Infinity }
];

const BL_MESES = [
  { v: "1", label: "Jan", nome: "janeiro" },
  { v: "2", label: "Fev", nome: "fevereiro" },
  { v: "3", label: "Mar", nome: "março" },
  { v: "4", label: "Abr", nome: "abril" },
  { v: "5", label: "Mai", nome: "maio" },
  { v: "6", label: "Jun", nome: "junho" },
  { v: "7", label: "Jul", nome: "julho" },
  { v: "8", label: "Ago", nome: "agosto" },
  { v: "9", label: "Set", nome: "setembro" },
  { v: "10", label: "Out", nome: "outubro" },
  { v: "11", label: "Nov", nome: "novembro" },
  { v: "12", label: "Dez", nome: "dezembro" }
];

const BL_TEMPERATURAS = [
  { v: "quente", label: "Quente — acima de 25°" },
  { v: "ameno", label: "Ameno — entre 18° e 25°" },
  { v: "frio", label: "Frio — abaixo de 18°" }
];

const BL_EXPERIENCIAS = [
  { v: "praia", label: "Praia e piscinas naturais" },
  { v: "trilhas", label: "Trilhas e cachoeiras" },
  { v: "gastronomia", label: "Gastronomia" },
  { v: "cultura", label: "Museus e cultura" },
  { v: "mergulho", label: "Mergulho e flutuação" },
  { v: "fauna", label: "Natureza e fauna" },
  { v: "vidanoturna", label: "Vida noturna" },
  { v: "parques", label: "Parques urbanos" },
  { v: "cervejarias", label: "Cervejarias e vinícolas" },
  { v: "compras", label: "Compras" },
  { v: "bemestar", label: "Bem-estar e descanso" },
  { v: "neve", label: "Neve e esqui" }
];

const BL_ACESSOS = [
  { v: "direto", label: "Tem voo direto" },
  { v: "carro", label: "Dá para ir de carro ou ônibus" },
  { v: "curto", label: "Até 3h de viagem" }
];

const BL_PERFIS = [
  { v: "criancas", label: "Crianças" },
  { v: "pet", label: "Pets" },
  { v: "acessivel", label: "Cadeira de rodas" },
  { v: "solo", label: "Viajar sozinho" },
  { v: "lgbt", label: "LGBTQIA+" }
];

const BL_NOTAS = [
  { v: "4.5", label: "4,5+", min: 4.5 },
  { v: "4", label: "4,0+", min: 4 },
  { v: "3.5", label: "3,5+", min: 3.5 }
];

const BL_DESTINOS = [
  {
    id: "noronha",
    nome: "Fernando de Noronha",
    uf: "Pernambuco",
    sigla: "PE",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/noronha.jpg",
    base: 76,
    preco: 2400,
    noites: 5,
    verificado: true,
    nota: 4.9,
    totalAvaliacoes: 1284,
    meses: [1, 2, 9, 10, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: false, horas: 5 },
    partidas: {
      saopaulo: { horas: 6, modo: "voo" },
      curitiba: { horas: 8, modo: "voo" },
      portoalegre: { horas: 9, modo: "voo" },
      riodejaneiro: { horas: 5, modo: "voo" },
      recife: { horas: 2, modo: "voo" },
      belohorizonte: { horas: 6, modo: "voo" },
      salvador: { horas: 4, modo: "voo" }
    },
    experiencias: ["praia", "mergulho", "trilhas", "fauna", "bemestar"],
    perfis: ["solo", "lgbt"],
    tipos: ["praia", "ecoturismo"],
    climas: ["romance", "turismo", "diversao"],
    tags: ["romance", "praia", "mergulho"],
    epoca: "Setembro a fevereiro (mar mais calmo e visibilidade para mergulho)",
    transporte: "Voo até Recife ou Natal + conexão de 1h10 para a ilha",
    resumo:
      "Um arquipélago com número controlado de visitantes, água transparente e trilhas curtas. É o destino mais bem avaliado por casais que buscam natureza sem multidão.",
    destaques: [
      "Baía do Sancho, eleita várias vezes a praia mais bonita do mundo",
      "Mergulho com tartarugas em pontos de até 40m de visibilidade",
      "Pôr do sol no Forte São Pedro do Boldró com música ao vivo"
    ],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 2 semanas", texto: "Fomos em setembro seguindo a sugestão do Boralá! e o mar estava perfeito. A pousada verificada valeu cada centavo — nada de surpresa na chegada." },
      { autor: "Rafael e Dani", avatar: "assets/img/p2.jpg", nota: 5, data: "há 1 mês", texto: "Viagem de aniversário de casamento. O roteiro sugerido para 5 noites deu tempo de conhecer as duas faces da ilha sem correria." },
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 4, data: "há 2 meses", texto: "Destino impecável, só achei o custo de alimentação acima do estimado. Ajustei o orçamento no app e as sugestões mudaram na hora." }
    ]
  },
  {
    id: "maragogi",
    nome: "Maragogi",
    uf: "Alagoas",
    sigla: "AL",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/maragogi.jpg",
    base: 73,
    preco: 1890,
    noites: 5,
    verificado: true,
    nota: 4.7,
    totalAvaliacoes: 862,
    meses: [1, 2, 3, 10, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: true, horas: 4 },
    partidas: {
      saopaulo: { horas: 5, modo: "voo" },
      curitiba: { horas: 7, modo: "voo" },
      portoalegre: { horas: 8, modo: "voo" },
      riodejaneiro: { horas: 5, modo: "voo" },
      recife: { horas: 3, modo: "estrada" },
      belohorizonte: { horas: 6, modo: "voo" },
      salvador: { horas: 5, modo: "voo" }
    },
    experiencias: ["praia", "mergulho", "bemestar", "gastronomia"],
    perfis: ["criancas", "pet", "acessivel", "lgbt"],
    tipos: ["praia"],
    climas: ["romance", "familia", "turismo"],
    tags: ["romance", "piscinas naturais", "all inclusive"],
    epoca: "Outubro a março, com maré baixa para as galés",
    transporte: "Voo até Maceió ou Recife + 2h de carro",
    resumo:
      "Conhecida como Caribe brasileiro, tem piscinas naturais a 6 km da costa e uma faixa de resorts com estrutura para casais e famílias.",
    destaques: [
      "Passeio de catamarã até as Galés de Maragogi",
      "Praia de Antunes, mais tranquila e com quiosques",
      "Passeio de jangada ao pôr do sol"
    ],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 5, data: "há 3 semanas", texto: "Fomos num hotel beira-mar, era aconchegante. Depois fomos a um museu e restaurante próximos. Perfeito!" },
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 4, data: "há 1 mês", texto: "As galés valem muito, mas vá no primeiro horário. A sugestão de maré do app acertou em cheio." }
    ]
  },
  {
    id: "rio",
    nome: "Rio de Janeiro",
    uf: "Rio de Janeiro",
    sigla: "RJ",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/rio.jpg",
    base: 70,
    preco: 1680,
    noites: 4,
    verificado: true,
    nota: 4.6,
    totalAvaliacoes: 2140,
    meses: [4, 5, 6, 7, 8],
    temperatura: "quente",
    acesso: { direto: true, carro: true, horas: 1 },
    partidas: {
      saopaulo: { horas: 6, modo: "estrada" },
      curitiba: { horas: 11, modo: "estrada" },
      portoalegre: { horas: 3, modo: "voo" },
      riodejaneiro: { horas: 0, modo: "aqui" },
      recife: { horas: 4, modo: "voo" },
      belohorizonte: { horas: 7, modo: "estrada" },
      salvador: { horas: 3, modo: "voo" }
    },
    experiencias: ["praia", "vidanoturna", "cultura", "gastronomia", "trilhas", "compras"],
    perfis: ["criancas", "pet", "acessivel", "solo", "lgbt"],
    tipos: ["cidade", "praia"],
    climas: ["diversao", "turismo", "romance", "negocios"],
    tags: ["praia", "vida noturna", "cultura"],
    epoca: "Abril a junho, com menos chuva e preços fora de pico",
    transporte: "Voos diretos das capitais ou 6h de ônibus de São Paulo",
    resumo:
      "Combina praia, cultura e vida noturna a uma distância curta de quase todo o Sudeste. Funciona bem para grupos com interesses diferentes.",
    destaques: [
      "Pôr do sol no Arpoador",
      "Trilha do Morro Dois Irmãos no fim da tarde",
      "Circuito de bares no Centro histórico às sextas"
    ],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 5 dias", texto: "Viajei a trabalho e usei as sugestões para as noites livres. Os restaurantes verificados me pouparam pesquisa." }
    ]
  },
  {
    id: "foz",
    nome: "Foz do Iguaçu",
    uf: "Paraná",
    sigla: "PR",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/foz.jpg",
    base: 69,
    preco: 1450,
    noites: 4,
    verificado: true,
    nota: 4.8,
    totalAvaliacoes: 1510,
    meses: [3, 4, 5, 8, 9, 10],
    temperatura: "ameno",
    acesso: { direto: true, carro: true, horas: 2 },
    partidas: {
      saopaulo: { horas: 15, modo: "estrada" },
      curitiba: { horas: 9, modo: "estrada" },
      portoalegre: { horas: 13, modo: "estrada" },
      riodejaneiro: { horas: 2, modo: "voo" },
      recife: { horas: 6, modo: "voo" },
      belohorizonte: { horas: 8, modo: "voo" },
      salvador: { horas: 9, modo: "voo" }
    },
    experiencias: ["trilhas", "fauna", "parques", "gastronomia"],
    perfis: ["criancas", "acessivel", "solo"],
    tipos: ["ecoturismo", "cidade"],
    climas: ["familia", "turismo", "romance"],
    tags: ["cataratas", "natureza", "fronteira"],
    epoca: "Março a maio e agosto a outubro, com vazão alta e menos calor",
    transporte: "Voo direto das capitais ou ônibus-leito desde Curitiba",
    resumo:
      "As cataratas resolvem o roteiro em dois dias e sobra tempo para o Parque das Aves, a usina e uma passada pela fronteira.",
    destaques: [
      "Trilha das Cataratas no lado brasileiro logo na abertura",
      "Macuco Safari para chegar perto das quedas",
      "Jantar com vista para a Ponte da Amizade"
    ],
    avaliacoes: [
      { autor: "Família Torres", avatar: "assets/img/p2.jpg", nota: 5, data: "há 1 mês", texto: "Com duas crianças, a ordem de passeios sugerida fez diferença: cataratas cedo, parque das aves à tarde." }
    ]
  },
  {
    id: "bonito",
    nome: "Bonito",
    uf: "Mato Grosso do Sul",
    sigla: "MS",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/bonito.jpg",
    base: 68,
    preco: 2150,
    noites: 5,
    verificado: false,
    nota: 4.5,
    totalAvaliacoes: 640,
    meses: [4, 5, 6, 7, 8, 9],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 5 },
    partidas: {
      saopaulo: { horas: 15, modo: "estrada" },
      curitiba: { horas: 16, modo: "estrada" },
      portoalegre: { horas: 20, modo: "estrada" },
      riodejaneiro: { horas: 5, modo: "voo" },
      recife: { horas: 7, modo: "voo" },
      belohorizonte: { horas: 9, modo: "voo" },
      salvador: { horas: 11, modo: "voo" }
    },
    experiencias: ["mergulho", "trilhas", "fauna", "bemestar"],
    perfis: ["criancas", "solo"],
    tipos: ["ecoturismo", "interior"],
    climas: ["familia", "turismo", "diversao"],
    tags: ["flutuação", "trilhas", "natureza"],
    epoca: "Abril a setembro, período seco e água mais cristalina",
    transporte: "Voo até Campo Grande + 4h de transfer",
    resumo:
      "Roteiro de ecoturismo com agenda controlada por vouchers: cada atrativo tem horário marcado, o que exige planejar antes de chegar.",
    destaques: [
      "Flutuação no Rio da Prata",
      "Gruta do Lago Azul no meio da manhã",
      "Balneário Municipal no fim de tarde"
    ],
    avaliacoes: [
      { autor: "Lucas P.", avatar: "assets/img/p3.jpg", nota: 4, data: "há 3 meses", texto: "Destino ótimo, mas reserve os passeios com semanas de antecedência. O app avisou disso e salvou a viagem." }
    ]
  },
  {
    id: "blumenau",
    nome: "Blumenau",
    uf: "Santa Catarina",
    sigla: "SC",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/blumenau.jpg",
    base: 64,
    preco: 1320,
    noites: 3,
    verificado: true,
    nota: 4.4,
    totalAvaliacoes: 418,
    meses: [6, 7, 8, 10],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 2 },
    partidas: {
      saopaulo: { horas: 9, modo: "estrada" },
      curitiba: { horas: 3, modo: "estrada" },
      portoalegre: { horas: 7, modo: "estrada" },
      riodejaneiro: { horas: 14, modo: "estrada" },
      recife: { horas: 6, modo: "voo" },
      belohorizonte: { horas: 7, modo: "voo" },
      salvador: { horas: 9, modo: "voo" }
    },
    experiencias: ["cervejarias", "gastronomia", "cultura", "parques"],
    perfis: ["criancas", "pet", "acessivel", "lgbt"],
    tipos: ["interior", "cidade"],
    climas: ["diversao", "familia", "gastronomia", "turismo"],
    tags: ["gastronomia", "cervejarias", "charme europeu"],
    epoca: "Outubro (Oktoberfest) ou inverno, para as cervejarias",
    transporte: "Voo até Navegantes + 1h de carro",
    resumo:
      "Cidade compacta, com roteiro cervejeiro a pé e arquitetura enxaimel. Boa opção para fins de semana prolongados em dupla ou em grupo.",
    destaques: [
      "Vila Germânica e o circuito de cervejarias artesanais",
      "Café colonial na região de Pomerode",
      "Parque Vila Germânica fora da temporada de festa"
    ],
    avaliacoes: [
      { autor: "Cacau", avatar: "assets/img/p5.jpg", nota: 5, data: "há 2 meses", texto: "Passei a noite num hotel verificado pelo Boralá!. Só satisfação! Café da manhã maravilhoso." }
    ]
  },
  {
    id: "curitiba",
    nome: "Curitiba",
    uf: "Paraná",
    sigla: "PR",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/curitiba.jpg",
    base: 60,
    preco: 980,
    noites: 3,
    verificado: false,
    nota: 4.3,
    totalAvaliacoes: 980,
    meses: [9, 10, 11],
    temperatura: "ameno",
    acesso: { direto: true, carro: true, horas: 1 },
    partidas: {
      saopaulo: { horas: 6, modo: "estrada" },
      curitiba: { horas: 0, modo: "aqui" },
      portoalegre: { horas: 8, modo: "estrada" },
      riodejaneiro: { horas: 12, modo: "estrada" },
      recife: { horas: 5, modo: "voo" },
      belohorizonte: { horas: 6, modo: "voo" },
      salvador: { horas: 8, modo: "voo" }
    },
    experiencias: ["parques", "cultura", "gastronomia", "compras"],
    perfis: ["criancas", "pet", "acessivel", "solo", "lgbt"],
    tipos: ["cidade", "interior"],
    climas: ["estudo", "negocios", "familia", "turismo"],
    tags: ["parques", "cultura", "custo baixo"],
    epoca: "Setembro a novembro, com clima ameno",
    transporte: "Voos das capitais ou ônibus-leito desde São Paulo (6h)",
    resumo:
      "Custo baixo, transporte público que funciona e museus bem distribuídos. Aparece com frequência para quem viaja a estudo ou a trabalho.",
    destaques: [
      "Museu Oscar Niemeyer",
      "Jardim Botânico logo cedo",
      "Bate-volta de trem até Morretes"
    ],
    avaliacoes: []
  },
  {
    id: "saopaulo",
    nome: "São Paulo",
    uf: "São Paulo",
    sigla: "SP",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/saopaulo.jpg",
    base: 58,
    preco: 1150,
    noites: 3,
    verificado: false,
    nota: 4.2,
    totalAvaliacoes: 3120,
    meses: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    temperatura: "ameno",
    acesso: { direto: true, carro: true, horas: 1 },
    partidas: {
      saopaulo: { horas: 0, modo: "aqui" },
      curitiba: { horas: 6, modo: "estrada" },
      portoalegre: { horas: 18, modo: "estrada" },
      riodejaneiro: { horas: 6, modo: "estrada" },
      recife: { horas: 3, modo: "voo" },
      belohorizonte: { horas: 8, modo: "estrada" },
      salvador: { horas: 4, modo: "voo" }
    },
    experiencias: ["gastronomia", "cultura", "vidanoturna", "compras", "parques"],
    perfis: ["criancas", "pet", "acessivel", "solo", "lgbt"],
    tipos: ["cidade"],
    climas: ["negocios", "estudo", "diversao", "turismo"],
    tags: ["gastronomia", "cultura", "vida noturna"],
    epoca: "O ano todo; evite janeiro e fevereiro pelas chuvas de fim de tarde",
    transporte: "Dois aeroportos e a maior rodoviária do país",
    resumo:
      "Para quem viaja a trabalho e quer aproveitar as noites: concentração de restaurantes, teatros e exposições em poucos bairros.",
    destaques: [
      "Circuito de museus na Avenida Paulista",
      "Bares e restaurantes na Vila Madalena",
      "Feira da Benedito Calixto aos sábados"
    ],
    avaliacoes: []
  },
  {
    id: "paris",
    nome: "Paris",
    uf: "Île-de-France",
    sigla: "Île-de-France",
    pais: "França",
    regiao: "exterior",
    img: "assets/img/paris.jpg",
    base: 74,
    preco: 9800,
    noites: 7,
    verificado: true,
    nota: 4.8,
    totalAvaliacoes: 5240,
    meses: [4, 5, 6, 9, 10],
    temperatura: "ameno",
    acesso: { direto: true, carro: false, horas: 11 },
    partidas: {
      saopaulo: { horas: 12, modo: "voo" },
      curitiba: { horas: 14, modo: "voo" },
      portoalegre: { horas: 14, modo: "voo" },
      riodejaneiro: { horas: 12, modo: "voo" },
      recife: { horas: 11, modo: "voo" },
      belohorizonte: { horas: 15, modo: "voo" },
      salvador: { horas: 16, modo: "voo" }
    },
    experiencias: ["cultura", "gastronomia", "compras", "parques", "vidanoturna"],
    perfis: ["criancas", "acessivel", "solo", "lgbt"],
    tipos: ["cidade"],
    climas: ["romance", "turismo", "estudo"],
    tags: ["romance", "gastronomia", "museus"],
    epoca: "Abril a junho ou setembro a outubro",
    transporte: "Voo direto de São Paulo (11h) ou com conexão em Lisboa",
    resumo:
      "O clássico do roteiro romântico. Funciona melhor com 7 noites e bairros escolhidos por caminhada, não por lista de pontos turísticos.",
    destaques: [
      "Café da manhã em Le Marais",
      "Museu d'Orsay em vez do Louvre para visitas curtas",
      "Piquenique no Champ de Mars ao entardecer"
    ],
    avaliacoes: [
      { autor: "Helena V.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 4 meses", texto: "Visitei um restaurante italiano por recomendação do Boralá!. Foi inesquecível!" }
    ]
  },
  {
    id: "banff",
    nome: "Banff",
    uf: "Alberta",
    sigla: "AB",
    pais: "Canadá",
    regiao: "exterior",
    img: "assets/img/banff.jpg",
    base: 66,
    preco: 12400,
    noites: 8,
    verificado: false,
    nota: 4.9,
    totalAvaliacoes: 1890,
    meses: [1, 2, 3, 6, 7, 8, 9, 12],
    temperatura: "frio",
    acesso: { direto: false, carro: false, horas: 13 },
    partidas: {
      saopaulo: { horas: 18, modo: "voo" },
      curitiba: { horas: 20, modo: "voo" },
      portoalegre: { horas: 20, modo: "voo" },
      riodejaneiro: { horas: 18, modo: "voo" },
      recife: { horas: 19, modo: "voo" },
      belohorizonte: { horas: 24, modo: "voo" },
      salvador: { horas: 25, modo: "voo" }
    },
    experiencias: ["trilhas", "fauna", "neve", "bemestar"],
    perfis: ["criancas", "pet", "solo"],
    tipos: ["serra", "ecoturismo"],
    climas: ["turismo", "diversao", "familia"],
    tags: ["montanhas", "lagos", "trilhas"],
    epoca: "Junho a setembro para trilhas; dezembro a março para esqui",
    transporte: "Voo até Calgary + 1h30 de carro",
    resumo:
      "Parque nacional com lagos glaciais e trilhas sinalizadas para todos os níveis. Exige carro alugado e reserva antecipada no verão.",
    destaques: [
      "Lake Louise antes das 8h para evitar fila",
      "Trilha Johnston Canyon",
      "Gôndola de Banff no fim de tarde"
    ],
    avaliacoes: []
  },
  {
    id: "buenavista",
    nome: "Buena Vista",
    uf: "Virgínia",
    sigla: "VA",
    pais: "Estados Unidos",
    regiao: "exterior",
    img: "assets/img/buenavista.jpg",
    base: 62,
    preco: 10200,
    noites: 7,
    verificado: false,
    nota: 4.5,
    totalAvaliacoes: 730,
    meses: [9, 10, 11],
    temperatura: "ameno",
    acesso: { direto: false, carro: false, horas: 12 },
    partidas: {
      saopaulo: { horas: 14, modo: "voo" },
      curitiba: { horas: 16, modo: "voo" },
      portoalegre: { horas: 16, modo: "voo" },
      riodejaneiro: { horas: 13, modo: "voo" },
      recife: { horas: 14, modo: "voo" },
      belohorizonte: { horas: 18, modo: "voo" },
      salvador: { horas: 19, modo: "voo" }
    },
    experiencias: ["trilhas", "fauna", "gastronomia", "cervejarias"],
    perfis: ["criancas", "pet", "solo"],
    tipos: ["serra", "ecoturismo"],
    climas: ["familia", "diversao", "turismo"],
    tags: ["trilhas", "estradas cênicas", "outono"],
    epoca: "Outubro, quando as folhas mudam de cor na Blue Ridge",
    transporte: "Voo até Washington + 3h30 pela Skyline Drive",
    resumo:
      "Base barata para explorar a Blue Ridge Parkway com a família. Roteiro de carro, com paradas curtas e trilhas leves.",
    destaques: [
      "Blue Ridge Parkway no pico do outono",
      "Cachoeiras do Shenandoah National Park",
      "Cidades pequenas com feiras de produtores"
    ],
    avaliacoes: []
  },
  /* ---------------------------------------------------------
     Catálogo regional — o recorte "saindo daqui, até 3h"
     Os 11 destinos de 2024 eram todos de avião: saindo de São
     Paulo com até 3h o resultado era zero, e o produto perdia
     justamente a pergunta do brief. Os 16 abaixo fecham esse
     buraco: cada uma das 7 origens passou a ter pelo menos dois
     destinos a até 3h, e a maioria dá para fazer de estrada.
     Conteúdo fictício de demonstração, escrito à mão — nenhum
     campo aqui veio de API, de banco de imagem ou do Google.
     As capas são ilustrações em SVG geradas para o protótipo
     (assets/img/ilustra), porque o acervo de fotos do .fig não
     cobre estas cidades e etiquetar foto de Blumenau como
     Gramado estragaria a peça.
     --------------------------------------------------------- */
  {
    id: "santos",
    nome: "Santos",
    uf: "São Paulo",
    sigla: "SP",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/santos.svg",
    base: 60,
    preco: 680,
    noites: 2,
    verificado: true,
    nota: 4.3,
    totalAvaliacoes: 540,
    meses: [1, 2, 3, 10, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: true, horas: 1 },
    partidas: {
      saopaulo: { horas: 1, modo: "estrada" },
      riodejaneiro: { horas: 6, modo: "estrada" },
      belohorizonte: { horas: 8, modo: "estrada" },
      curitiba: { horas: 6, modo: "estrada" },
      portoalegre: { horas: 4, modo: "voo" },
      recife: { horas: 6, modo: "voo" },
      salvador: { horas: 7, modo: "voo" }
    },
    experiencias: ["praia", "gastronomia", "cultura", "parques"],
    perfis: ["criancas", "pet", "acessivel", "solo", "lgbt"],
    tipos: ["praia", "cidade"],
    climas: ["familia", "diversao", "turismo"],
    tags: ["fim de semana", "praia urbana", "jardim da orla"],
    epoca: "Outubro a março, evitando os feriados longos",
    transporte: "1h de carro ou ônibus de São Paulo pela Imigrantes",
    resumo:
      "A praia mais perto de São Paulo: dá para sair na sexta à noite e estar na areia no sábado de manhã. Orla com jardim contínuo, bondinho histórico e um centro de café que virou roteiro de museu.",
    destaques: [
      "Jardim da orla, o maior jardim de praia do mundo, bom para corrida e cadeira de rodas",
      "Museu do Café no centro histórico, com degustação guiada",
      "Bondinho turístico ligando as praças do centro"
    ],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 4, data: "há 1 semana", texto: "Fim de semana improvisado que deu certo. Saímos de São Paulo às 19h e às 20h30 estávamos jantando na orla." },
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 4, data: "há 2 meses", texto: "Levei minha mãe, que usa cadeira de rodas, e a orla toda é plana. Foi o primeiro destino que achei sem precisar ligar para hotel perguntando." }
    ]
  },
  {
    id: "campos-do-jordao",
    nome: "Campos do Jordão",
    uf: "São Paulo",
    sigla: "SP",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/campos-do-jordao.svg",
    base: 68,
    preco: 1150,
    noites: 3,
    verificado: true,
    nota: 4.6,
    totalAvaliacoes: 980,
    meses: [5, 6, 7, 8, 9],
    temperatura: "frio",
    acesso: { direto: false, carro: true, horas: 3 },
    partidas: {
      saopaulo: { horas: 3, modo: "estrada" },
      riodejaneiro: { horas: 5, modo: "estrada" },
      belohorizonte: { horas: 9, modo: "estrada" },
      curitiba: { horas: 8, modo: "estrada" },
      portoalegre: { horas: 6, modo: "voo" },
      recife: { horas: 7, modo: "voo" },
      salvador: { horas: 8, modo: "voo" }
    },
    experiencias: ["trilhas", "gastronomia", "cervejarias", "bemestar", "compras"],
    perfis: ["criancas", "pet", "solo"],
    tipos: ["serra"],
    climas: ["romance", "familia", "turismo"],
    tags: ["inverno", "chocolate", "mirantes"],
    epoca: "Maio a setembro, quando esfria de verdade",
    transporte: "3h de carro de São Paulo pela Carvalho Pinto e a Floriano Rodrigues Pinheiro",
    resumo:
      "O inverno mais fácil de alcançar do Sudeste. Funciona como fuga de três noites: lareira, trilha curta de manhã e cervejaria no fim da tarde, sem precisar de avião.",
    destaques: [
      "Pico do Itapeva ao amanhecer, com vista de 360° na serra da Mantiqueira",
      "Parque Estadual com trilhas leves entre araucárias",
      "Rota de cervejarias e chocolates na Vila Capivari"
    ],
    avaliacoes: [
      { autor: "Rafael e Dani", avatar: "assets/img/p2.jpg", nota: 5, data: "há 3 semanas", texto: "Procurávamos frio sem pegar avião e apareceu aqui em primeiro lugar. Três noites foi exatamente o tempo certo." },
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 4, data: "há 1 mês", texto: "Caro nos feriados, barato fora deles. A estimativa de preço bateu quase na mosca indo num fim de semana comum." }
    ]
  },
  {
    id: "ubatuba",
    nome: "Ubatuba",
    uf: "São Paulo",
    sigla: "SP",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/ubatuba.svg",
    base: 66,
    preco: 890,
    noites: 3,
    verificado: true,
    nota: 4.5,
    totalAvaliacoes: 720,
    meses: [1, 2, 3, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: true, horas: 3 },
    partidas: {
      saopaulo: { horas: 3, modo: "estrada" },
      riodejaneiro: { horas: 4, modo: "estrada" },
      belohorizonte: { horas: 9, modo: "estrada" },
      curitiba: { horas: 8, modo: "estrada" },
      portoalegre: { horas: 6, modo: "voo" },
      recife: { horas: 7, modo: "voo" },
      salvador: { horas: 8, modo: "voo" }
    },
    experiencias: ["praia", "trilhas", "mergulho", "fauna"],
    perfis: ["criancas", "pet", "solo", "lgbt"],
    tipos: ["praia", "ecoturismo"],
    climas: ["familia", "romance", "diversao", "turismo"],
    tags: ["mata atlântica", "praias desertas", "surf"],
    epoca: "Novembro a março, com mar quente e visibilidade para mergulho",
    transporte: "3h de carro de São Paulo pela Oswaldo Cruz ou pela Rio–Santos",
    resumo:
      "Mais de 80 praias entre morros de mata atlântica, do agito da Enseada ao silêncio da Almada. Bom para quem quer praia e trilha no mesmo dia, sem sair do estado.",
    destaques: [
      "Praia da Almada e a trilha curta até a Figueira",
      "Projeto Tamar com tanques de visitação e fauna marinha",
      "Flutuação na Ilha Anchieta, com saída de barco da Enseada"
    ],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 5, data: "há 1 mês", texto: "Levamos o cachorro e a filtragem por pets resolveu em dois cliques. A pousada verificada aceitava sem taxa extra." }
    ]
  },
  {
    id: "brotas",
    nome: "Brotas",
    uf: "São Paulo",
    sigla: "SP",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/brotas.svg",
    base: 64,
    preco: 760,
    noites: 2,
    verificado: true,
    nota: 4.4,
    totalAvaliacoes: 410,
    meses: [3, 4, 5, 9, 10, 11],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 3 },
    partidas: {
      saopaulo: { horas: 3, modo: "estrada" },
      riodejaneiro: { horas: 7, modo: "estrada" },
      belohorizonte: { horas: 8, modo: "estrada" },
      curitiba: { horas: 7, modo: "estrada" },
      portoalegre: { horas: 6, modo: "voo" },
      recife: { horas: 8, modo: "voo" },
      salvador: { horas: 9, modo: "voo" }
    },
    experiencias: ["trilhas", "fauna", "bemestar"],
    perfis: ["solo", "criancas"],
    tipos: ["ecoturismo"],
    climas: ["diversao", "familia", "turismo"],
    tags: ["rafting", "cachoeiras", "aventura"],
    epoca: "Março a maio, com rio cheio para o rafting",
    transporte: "3h de carro de São Paulo pela Bandeirantes e a Washington Luís",
    resumo:
      "Capital paulista da aventura: rafting no Jacaré-Pepira, tirolesa e cachoeiras com estrutura de operadora. Cabe num fim de semana e não exige experiência prévia.",
    destaques: [
      "Rafting de nível 3 no Jacaré-Pepira, com instrutor",
      "Cachoeira Três Quedas e a trilha de acesso de 20 minutos",
      "Cascading na Cachoeira do Jacaré para quem já tem prática"
    ],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 4, data: "há 2 semanas", texto: "Fomos em quatro, nenhum com experiência, e todas as operadoras verificadas pediam só assinar o termo. Deu certo." }
    ]
  },
  {
    id: "morretes",
    nome: "Morretes",
    uf: "Paraná",
    sigla: "PR",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/morretes.svg",
    base: 62,
    preco: 590,
    noites: 2,
    verificado: true,
    nota: 4.5,
    totalAvaliacoes: 360,
    meses: [3, 4, 5, 9, 10],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 2 },
    partidas: {
      curitiba: { horas: 2, modo: "estrada" },
      saopaulo: { horas: 6, modo: "estrada" },
      riodejaneiro: { horas: 11, modo: "estrada" },
      belohorizonte: { horas: 13, modo: "estrada" },
      portoalegre: { horas: 9, modo: "estrada" },
      recife: { horas: 8, modo: "voo" },
      salvador: { horas: 10, modo: "voo" }
    },
    experiencias: ["trilhas", "gastronomia", "fauna", "cultura"],
    perfis: ["criancas", "pet", "solo"],
    tipos: ["ecoturismo", "serra"],
    climas: ["familia", "romance", "turismo"],
    tags: ["trem da serra", "barreado", "mata atlântica"],
    epoca: "Março a maio e setembro a outubro, com menos neblina no trem",
    transporte: "2h de carro de Curitiba, ou o trem da Serra do Mar na ida",
    resumo:
      "A ponta de baixo da Serra do Mar, melhor alcançada pelo trem que sai de Curitiba. Centro histórico de rua única, barreado servido em panela de barro e cachoeiras a 20 minutos.",
    destaques: [
      "Trem da Serra do Mar: 4h de descida com 13 túneis e a ponte São João",
      "Barreado servido no centro histórico, no ritmo de três horas de almoço",
      "Parque Estadual do Pico Marumbi, com trilhas de meio dia"
    ],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 3 semanas", texto: "Usei o filtro de até 3h saindo de Curitiba e nunca tinha pensado em Morretes. Fui de trem e voltei de ônibus." }
    ]
  },
  {
    id: "ilha-do-mel",
    nome: "Ilha do Mel",
    uf: "Paraná",
    sigla: "PR",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/ilha-do-mel.svg",
    base: 65,
    preco: 640,
    noites: 3,
    verificado: true,
    nota: 4.6,
    totalAvaliacoes: 520,
    meses: [1, 2, 3, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: false, horas: 3 },
    partidas: {
      curitiba: { horas: 3, modo: "estrada" },
      saopaulo: { horas: 7, modo: "estrada" },
      riodejaneiro: { horas: 12, modo: "estrada" },
      belohorizonte: { horas: 14, modo: "estrada" },
      portoalegre: { horas: 10, modo: "estrada" },
      recife: { horas: 9, modo: "voo" },
      salvador: { horas: 11, modo: "voo" }
    },
    experiencias: ["praia", "trilhas", "fauna", "bemestar"],
    perfis: ["solo", "lgbt"],
    tipos: ["praia", "ecoturismo"],
    climas: ["romance", "diversao", "turismo"],
    tags: ["sem carro", "faróis", "trilha costeira"],
    epoca: "Dezembro a março, com barco saindo de hora em hora",
    transporte: "2h de carro de Curitiba até Pontal do Sul + 30 min de barco",
    resumo:
      "Ilha sem carro e sem rua asfaltada: tudo se faz a pé pela areia, de uma vila a outra. É o destino mais barato desta lista e o que mais parece longe sem estar.",
    destaques: [
      "Trilha da Gruta até o Farol das Conchas, com vista da baía",
      "Fortaleza de Nossa Senhora dos Prazeres, do século 18",
      "Praia de Fora para surf e Praia do Farol para banho calmo"
    ],
    avaliacoes: [
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 5, data: "há 1 mês", texto: "Três noites sem carro, sem carro de aplicativo e sem pressa. Leve mochila, não mala de rodinha." },
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 4, data: "há 2 meses", texto: "A pousada avisou que só aceita pagamento à vista e isso estava na ficha. Boa surpresa não ter surpresa." }
    ]
  },
  {
    id: "gramado",
    nome: "Gramado",
    uf: "Rio Grande do Sul",
    sigla: "RS",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/gramado.svg",
    base: 72,
    preco: 1420,
    noites: 4,
    verificado: true,
    nota: 4.7,
    totalAvaliacoes: 2310,
    meses: [4, 5, 6, 7, 8, 12],
    temperatura: "frio",
    acesso: { direto: false, carro: true, horas: 2 },
    partidas: {
      portoalegre: { horas: 2, modo: "estrada" },
      curitiba: { horas: 8, modo: "estrada" },
      saopaulo: { horas: 4, modo: "voo" },
      riodejaneiro: { horas: 5, modo: "voo" },
      belohorizonte: { horas: 6, modo: "voo" },
      recife: { horas: 8, modo: "voo" },
      salvador: { horas: 8, modo: "voo" }
    },
    experiencias: ["gastronomia", "compras", "cervejarias", "cultura", "bemestar"],
    perfis: ["criancas", "pet", "acessivel", "lgbt"],
    tipos: ["serra", "interior"],
    climas: ["romance", "familia", "turismo"],
    tags: ["Natal Luz", "fondue", "hortênsias"],
    epoca: "Junho a agosto para o frio, ou de outubro a janeiro para o Natal Luz",
    transporte: "2h de carro de Porto Alegre pela RS-115, ou voo até Canela",
    resumo:
      "A cidade mais estruturada da serra gaúcha para turismo: calçada larga, sinalização boa e temporada definida. De Porto Alegre são 2h de estrada, o que a torna destino de fim de semana e não de viagem anual.",
    destaques: [
      "Natal Luz, de outubro a janeiro, com espetáculos em lago aberto",
      "Rota do fondue e das cantinas na Avenida Borges de Medeiros",
      "Lago Negro e a trilha curta ao redor, acessível de cadeira de rodas"
    ],
    avaliacoes: [
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 5, data: "há 2 semanas", texto: "Fomos em julho, com criança pequena. Tudo a pé do hotel e nenhuma ladeira impossível." },
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 4, data: "há 1 mês", texto: "No Natal Luz dobra de preço e o app avisou. Trocamos para agosto e gastamos metade." }
    ]
  },
  {
    id: "bento-goncalves",
    nome: "Bento Gonçalves",
    uf: "Rio Grande do Sul",
    sigla: "RS",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/bento-goncalves.svg",
    base: 69,
    preco: 1180,
    noites: 3,
    verificado: true,
    nota: 4.6,
    totalAvaliacoes: 870,
    meses: [1, 2, 3, 4, 6, 7],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 2 },
    partidas: {
      portoalegre: { horas: 2, modo: "estrada" },
      curitiba: { horas: 8, modo: "estrada" },
      saopaulo: { horas: 4, modo: "voo" },
      riodejaneiro: { horas: 5, modo: "voo" },
      belohorizonte: { horas: 6, modo: "voo" },
      recife: { horas: 9, modo: "voo" },
      salvador: { horas: 9, modo: "voo" }
    },
    experiencias: ["cervejarias", "gastronomia", "cultura", "bemestar"],
    perfis: ["acessivel", "lgbt", "solo"],
    tipos: ["interior"],
    climas: ["romance", "turismo", "diversao"],
    tags: ["vinícolas", "Vale dos Vinhedos", "maria-fumaça"],
    epoca: "Fevereiro e março na colheita, ou junho e julho para vinho tinto e frio",
    transporte: "2h de carro de Porto Alegre pela BR-470",
    resumo:
      "O Vale dos Vinhedos cabe num roteiro de três noites de carro, com vinícolas a 15 minutos umas das outras. A colheita, em fevereiro e março, é a época em que as visitas entram na produção.",
    destaques: [
      "Vale dos Vinhedos com visita guiada e degustação em três vinícolas no mesmo dia",
      "Maria-fumaça entre Bento, Garibaldi e Carlos Barbosa",
      "Caminhos de Pedra, com casas de imigrantes italianos abertas à visita"
    ],
    avaliacoes: [
      { autor: "Rafael e Dani", avatar: "assets/img/p2.jpg", nota: 5, data: "há 1 mês", texto: "Fomos na colheita e participamos da pisa da uva. Reservamos as três vinícolas direto pelos contatos da ficha." }
    ]
  },
  {
    id: "petropolis",
    nome: "Petrópolis",
    uf: "Rio de Janeiro",
    sigla: "RJ",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/petropolis.svg",
    base: 63,
    preco: 820,
    noites: 2,
    verificado: true,
    nota: 4.4,
    totalAvaliacoes: 640,
    meses: [4, 5, 6, 7, 8],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 2 },
    partidas: {
      riodejaneiro: { horas: 2, modo: "estrada" },
      saopaulo: { horas: 7, modo: "estrada" },
      belohorizonte: { horas: 7, modo: "estrada" },
      curitiba: { horas: 12, modo: "estrada" },
      portoalegre: { horas: 5, modo: "voo" },
      recife: { horas: 6, modo: "voo" },
      salvador: { horas: 7, modo: "voo" }
    },
    experiencias: ["cultura", "gastronomia", "trilhas", "cervejarias"],
    perfis: ["criancas", "solo", "lgbt"],
    tipos: ["serra", "cidade"],
    climas: ["familia", "romance", "estudo", "turismo"],
    tags: ["Museu Imperial", "cervejas artesanais", "fim de semana"],
    epoca: "Abril a agosto, com dias secos e noites frias",
    transporte: "2h de carro do Rio pela BR-040, subindo a serra",
    resumo:
      "Duas horas do Rio e 10 graus a menos. Museu Imperial, casa de Santos Dumont e um polo de cervejaria artesanal que cresceu junto com a cidade. Destino de sábado e domingo, não de semana inteira.",
    destaques: [
      "Museu Imperial, com a coroa de Pedro II e visita de chinelo de feltro",
      "Casa de Santos Dumont, a Encantada, projetada sem cozinha",
      "Rota cervejeira do Bingen, com seis produtores a pé um do outro"
    ],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 4, data: "há 3 semanas", texto: "Viajei a trabalho para o Rio e esticei o sábado aqui. Duas horas de carro e parecia outro estado." }
    ]
  },
  {
    id: "buzios",
    nome: "Búzios",
    uf: "Rio de Janeiro",
    sigla: "RJ",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/buzios.svg",
    base: 70,
    preco: 1340,
    noites: 4,
    verificado: true,
    nota: 4.5,
    totalAvaliacoes: 1560,
    meses: [1, 2, 3, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: true, horas: 3 },
    partidas: {
      riodejaneiro: { horas: 3, modo: "estrada" },
      saopaulo: { horas: 8, modo: "estrada" },
      belohorizonte: { horas: 9, modo: "estrada" },
      curitiba: { horas: 13, modo: "estrada" },
      portoalegre: { horas: 6, modo: "voo" },
      recife: { horas: 7, modo: "voo" },
      salvador: { horas: 8, modo: "voo" }
    },
    experiencias: ["praia", "vidanoturna", "gastronomia", "mergulho", "compras"],
    perfis: ["solo", "lgbt", "acessivel"],
    tipos: ["praia"],
    climas: ["romance", "diversao", "turismo"],
    tags: ["Rua das Pedras", "23 praias", "romance"],
    epoca: "Novembro a março, fora do réveillon se o orçamento importa",
    transporte: "3h de carro do Rio pela Via Lagos",
    resumo:
      "Uma península com 23 praias de perfis diferentes e uma rua só de restaurante e loja. Dá para fazer de carro saindo do Rio e render quatro noites sem repetir praia.",
    destaques: [
      "Praia de João Fernandes para flutuação com visibilidade boa",
      "Rua das Pedras e Orla Bardot ao fim da tarde",
      "Trilha curta até a Praia Olho de Boi, a mais isolada da península"
    ],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 2 semanas", texto: "Fomos em fevereiro, fora do carnaval. Quatro noites deu para conhecer sete praias com calma." },
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 4, data: "há 2 meses", texto: "Pousada boa, restaurante caro. A estimativa do app ficou curta porque comemos fora todas as noites." }
    ]
  },
  {
    id: "porto-de-galinhas",
    nome: "Porto de Galinhas",
    uf: "Pernambuco",
    sigla: "PE",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/porto-de-galinhas.svg",
    base: 71,
    preco: 1240,
    noites: 4,
    verificado: true,
    nota: 4.6,
    totalAvaliacoes: 1890,
    meses: [1, 2, 3, 9, 10, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: true, horas: 2 },
    partidas: {
      recife: { horas: 2, modo: "estrada" },
      salvador: { horas: 4, modo: "voo" },
      saopaulo: { horas: 5, modo: "voo" },
      riodejaneiro: { horas: 5, modo: "voo" },
      belohorizonte: { horas: 5, modo: "voo" },
      curitiba: { horas: 7, modo: "voo" },
      portoalegre: { horas: 8, modo: "voo" }
    },
    experiencias: ["praia", "mergulho", "gastronomia", "bemestar"],
    perfis: ["criancas", "pet", "acessivel", "lgbt"],
    tipos: ["praia"],
    climas: ["familia", "romance", "diversao", "turismo"],
    tags: ["piscinas naturais", "jangada", "família"],
    epoca: "Setembro a março, com maré baixa de manhã para as piscinas",
    transporte: "2h de carro de Recife pela PE-009",
    resumo:
      "Piscinas naturais a cinco minutos de jangada da areia e vila com tudo a pé. É o destino de praia mais fácil do Nordeste para quem viaja com criança pequena.",
    destaques: [
      "Piscinas naturais de jangada, com saída conforme a tabela de maré",
      "Praia de Maracaípe, com surf e a reserva de cavalos-marinhos",
      "Vila com rua de pedestre, feira de artesanato e tapioca de rua"
    ],
    avaliacoes: [
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 5, data: "há 1 mês", texto: "Com duas crianças, poder deixar o carro no hotel e ir a pé para tudo mudou a viagem." },
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 4, data: "há 3 meses", texto: "As piscinas naturais lotam. Fomos no primeiro horário da maré, como o app sugeriu, e valeu." }
    ]
  },
  {
    id: "olinda",
    nome: "Olinda",
    uf: "Pernambuco",
    sigla: "PE",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/olinda.svg",
    base: 61,
    preco: 620,
    noites: 2,
    verificado: true,
    nota: 4.5,
    totalAvaliacoes: 740,
    meses: [2, 6, 7, 9, 10, 11],
    temperatura: "quente",
    acesso: { direto: true, carro: true, horas: 1 },
    partidas: {
      recife: { horas: 1, modo: "estrada" },
      salvador: { horas: 3, modo: "voo" },
      saopaulo: { horas: 5, modo: "voo" },
      riodejaneiro: { horas: 4, modo: "voo" },
      belohorizonte: { horas: 5, modo: "voo" },
      curitiba: { horas: 7, modo: "voo" },
      portoalegre: { horas: 8, modo: "voo" }
    },
    experiencias: ["cultura", "gastronomia", "vidanoturna", "compras"],
    perfis: ["solo", "lgbt", "criancas"],
    tipos: ["cidade"],
    climas: ["turismo", "estudo", "diversao", "romance"],
    tags: ["centro histórico", "frevo", "ateliês"],
    epoca: "Setembro a novembro, fora da chuva; fevereiro se o carnaval for o motivo",
    transporte: "40 min de carro do aeroporto do Recife",
    resumo:
      "Centro histórico tombado a 40 minutos do aeroporto do Recife, com ateliê aberto em casa de morador e ladeira que termina em vista do mar. Dá para fazer em duas noites emendando com o Recife.",
    destaques: [
      "Alto da Sé no fim da tarde, com tapioca e vista da costa",
      "Ateliês abertos de artistas no caminho da Rua do Amparo",
      "Carnaval de rua com frevo e bonecos gigantes, em fevereiro"
    ],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 2 semanas", texto: "Duas noites, tudo a pé, e a sensação de ter visto muito. O centro é pequeno e denso." }
    ]
  },
  {
    id: "ouro-preto",
    nome: "Ouro Preto",
    uf: "Minas Gerais",
    sigla: "MG",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/ouro-preto.svg",
    base: 67,
    preco: 780,
    noites: 3,
    verificado: true,
    nota: 4.7,
    totalAvaliacoes: 1120,
    meses: [4, 5, 6, 7, 8, 9],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 2 },
    partidas: {
      belohorizonte: { horas: 2, modo: "estrada" },
      saopaulo: { horas: 5, modo: "voo" },
      riodejaneiro: { horas: 7, modo: "estrada" },
      curitiba: { horas: 7, modo: "voo" },
      portoalegre: { horas: 7, modo: "voo" },
      recife: { horas: 7, modo: "voo" },
      salvador: { horas: 8, modo: "voo" }
    },
    experiencias: ["cultura", "gastronomia", "trilhas", "compras"],
    perfis: ["solo", "lgbt"],
    tipos: ["cidade", "interior"],
    climas: ["turismo", "estudo", "romance"],
    tags: ["barroco", "ladeiras", "museus"],
    epoca: "Abril a setembro, na seca; a Semana Santa enche a cidade",
    transporte: "2h de carro de Belo Horizonte pela BR-356",
    resumo:
      "Cidade inteira tombada, com 13 igrejas barrocas e museu de mineralogia dentro da escola de minas. As ladeiras são de pedra e muito íngremes: não é um destino acessível, e dizemos isso na ficha.",
    destaques: [
      "Igreja de São Francisco de Assis, projeto de Aleijadinho",
      "Mina do Chico Rei, com galeria aberta à visita",
      "Museu de Ciência e Técnica da Escola de Minas, na Praça Tiradentes"
    ],
    avaliacoes: [
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 5, data: "há 1 mês", texto: "Levei calçado de sola grossa por causa do aviso na ficha e foi a melhor decisão da viagem." },
      { autor: "Rafael e Dani", avatar: "assets/img/p2.jpg", nota: 4, data: "há 2 meses", texto: "Lindíssima, mas ladeira sem fim. Não levem quem tem dificuldade de caminhar." }
    ]
  },
  {
    id: "tiradentes",
    nome: "Tiradentes",
    uf: "Minas Gerais",
    sigla: "MG",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/tiradentes.svg",
    base: 66,
    preco: 950,
    noites: 2,
    verificado: true,
    nota: 4.6,
    totalAvaliacoes: 680,
    meses: [4, 5, 6, 7, 8],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 3 },
    partidas: {
      belohorizonte: { horas: 3, modo: "estrada" },
      riodejaneiro: { horas: 6, modo: "estrada" },
      saopaulo: { horas: 7, modo: "estrada" },
      curitiba: { horas: 8, modo: "voo" },
      portoalegre: { horas: 8, modo: "voo" },
      recife: { horas: 8, modo: "voo" },
      salvador: { horas: 9, modo: "voo" }
    },
    experiencias: ["gastronomia", "cultura", "bemestar", "compras"],
    perfis: ["solo", "lgbt", "pet"],
    tipos: ["interior"],
    climas: ["romance", "turismo", "diversao"],
    tags: ["gastronomia", "maria-fumaça", "pousadas de charme"],
    epoca: "Abril a agosto; em agosto acontece o festival de gastronomia",
    transporte: "3h de carro de Belo Horizonte, ou 6h do Rio pela BR-040",
    resumo:
      "Vilarejo colonial que virou destino de comida: pousada pequena, restaurante de chef e feira de produtor na praça. Duas noites bastam, e é um dos poucos destinos de serra que aceita pet em quase tudo.",
    destaques: [
      "Festival Cultura e Gastronomia, em agosto, com menu de rua",
      "Maria-fumaça até São João del-Rei, 13 km de bitola estreita",
      "Serra de São José, com trilha de meio dia saindo do centro"
    ],
    avaliacoes: [
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 5, data: "há 3 semanas", texto: "Viajamos com o cachorro e quatro pousadas verificadas aceitavam sem taxa. Nunca foi tão simples decidir." }
    ]
  },
  {
    id: "praia-do-forte",
    nome: "Praia do Forte",
    uf: "Bahia",
    sigla: "BA",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/praia-do-forte.svg",
    base: 68,
    preco: 1120,
    noites: 4,
    verificado: true,
    nota: 4.6,
    totalAvaliacoes: 1240,
    meses: [1, 2, 3, 9, 10, 11, 12],
    temperatura: "quente",
    acesso: { direto: false, carro: true, horas: 1 },
    partidas: {
      salvador: { horas: 1, modo: "estrada" },
      recife: { horas: 4, modo: "voo" },
      saopaulo: { horas: 5, modo: "voo" },
      riodejaneiro: { horas: 5, modo: "voo" },
      belohorizonte: { horas: 5, modo: "voo" },
      curitiba: { horas: 7, modo: "voo" },
      portoalegre: { horas: 8, modo: "voo" }
    },
    experiencias: ["praia", "fauna", "mergulho", "bemestar", "gastronomia"],
    perfis: ["criancas", "pet", "acessivel", "lgbt"],
    tipos: ["praia", "ecoturismo"],
    climas: ["familia", "romance", "turismo"],
    tags: ["tartarugas", "vila de pedestre", "piscinas naturais"],
    epoca: "Setembro a março; a desova das tartarugas vai de setembro a março",
    transporte: "1h de carro de Salvador pela Estrada do Coco",
    resumo:
      "Vila de pedestre a uma hora de Salvador, com base do Projeto Tamar na rua principal e piscinas naturais na maré baixa. É praia de família sem ser resort fechado.",
    destaques: [
      "Centro de visitantes do Projeto Tamar, com tanques e soltura de filhotes na temporada",
      "Piscinas naturais em frente à vila, a pé, na maré baixa",
      "Reserva de Sapiranga, com trilha e tirolesa sobre o rio Pojuca"
    ],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 1 mês", texto: "Chegamos de carro de Salvador em 50 minutos e deixamos o carro parado quatro dias." }
    ]
  },
  {
    id: "chapada-diamantina",
    nome: "Chapada Diamantina",
    uf: "Bahia",
    sigla: "BA",
    pais: "Brasil",
    regiao: "brasil",
    img: "assets/img/ilustra/chapada-diamantina.svg",
    base: 73,
    preco: 1050,
    noites: 5,
    verificado: true,
    nota: 4.8,
    totalAvaliacoes: 960,
    meses: [4, 5, 6, 7, 8, 9],
    temperatura: "ameno",
    acesso: { direto: false, carro: true, horas: 6 },
    partidas: {
      salvador: { horas: 6, modo: "estrada" },
      recife: { horas: 9, modo: "voo" },
      saopaulo: { horas: 8, modo: "voo" },
      riodejaneiro: { horas: 8, modo: "voo" },
      belohorizonte: { horas: 8, modo: "voo" },
      curitiba: { horas: 10, modo: "voo" },
      portoalegre: { horas: 11, modo: "voo" }
    },
    experiencias: ["trilhas", "fauna", "bemestar", "mergulho"],
    perfis: ["solo", "lgbt"],
    tipos: ["ecoturismo", "serra"],
    climas: ["diversao", "turismo", "romance"],
    tags: ["cachoeiras", "grutas", "Vale do Capão"],
    epoca: "Abril a setembro, fora da chuva, com rios ainda cheios",
    transporte: "6h de carro ou ônibus noturno de Salvador até Lençóis",
    resumo:
      "Cinco noites é o mínimo honesto: as atrações ficam a horas uma da outra e quase tudo pede guia local. Cachoeira de 340 metros, gruta de água azul e travessia de vários dias para quem tem perna.",
    destaques: [
      "Cachoeira da Fumaça, 340 m de queda, com trilha de 6 km de ida",
      "Poço Azul e Poço Encantado, com luz entrando na água entre abril e setembro",
      "Vale do Capão como base para trilhas de um dia, com guia credenciado"
    ],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 5, data: "há 2 semanas", texto: "Cinco noites e ainda ficou coisa para voltar. Contratamos guia verificado para três dos quatro dias." },
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 2 meses", texto: "O aviso de que quase tudo exige guia economizou a nossa viagem. Teríamos tentado sozinhos." }
    ]
  }
];

/* =========================================================
   Estabelecimentos (B2B)
   Fonte única dos locais de cada destino: a ficha do destino
   lista, a página do estabelecimento abre. O campo `plano`
   amarra com BL_PLANOS_PARCEIRO — é o que decide o selo de
   verificado e o card em destaque nos resultados.
   ========================================================= */

const BL_ESTABELECIMENTOS = [
  /* ---------- Fernando de Noronha ---------- */
  {
    id: "pousada-maravilha",
    destinoId: "noronha",
    nome: "Pousada Maravilha",
    tipo: "Hospedagem",
    nota: 4.9,
    totalAvaliacoes: 212,
    faixa: "R$ 1.200/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Oito bangalôs voltados para a Baía do Sueste, com piscina de borda infinita e café da manhã servido até as 11h. É a hospedagem mais citada nas avaliações de casais da ilha.",
    endereco: "Rodovia BR-363, s/n — Sueste",
    horario: "Recepção 24h · check-in às 14h, check-out às 12h",
    telefone: "(81) 3619-0028",
    site: "pousadamaravilha.com.br",
    fotos: ["assets/img/noronha.jpg", "assets/img/noronha-dois-irmaos.jpg", "assets/img/maragogi.jpg"],
    comodidades: ["Vista para a Baía do Sueste", "Piscina de borda infinita", "Transfer do aeroporto incluso", "Aluguel de buggy na recepção", "Café da manhã até as 11h"],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 2 semanas", texto: "Nada de surpresa na chegada: o quarto era igual às fotos e o transfer já estava esperando no aeroporto." },
      { autor: "Rafael e Dani", avatar: "assets/img/p2.jpg", nota: 5, data: "há 1 mês", texto: "Pedimos café da manhã na varanda no dia do aniversário de casamento e eles organizaram sem cobrar nada a mais." }
    ]
  },
  {
    id: "mergulhao",
    destinoId: "noronha",
    nome: "Restaurante Mergulhão",
    tipo: "Restaurante",
    nota: 4.8,
    totalAvaliacoes: 486,
    faixa: "R$ 180 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Peixe do dia grelhado na brasa com vista para o Porto de Santo Antônio. Reserva quase obrigatória no pôr do sol: as mesas da sacada saem com uma semana de antecedência.",
    endereco: "Porto de Santo Antônio, Vila dos Remédios",
    horario: "Terça a domingo, das 12h às 22h",
    telefone: "(81) 3619-1225",
    site: "mergulhaonoronha.com.br",
    fotos: ["assets/img/noronha-dois-irmaos.jpg", "assets/img/noronha.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Vista para o porto", "Menu de peixe do dia", "Reserva por telefone", "Opções vegetarianas"],
    avaliacoes: [
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 5, data: "há 2 meses", texto: "Caro, sim, mas o peixe estava impecável e a vista no fim da tarde paga o preço." }
    ]
  },
  {
    id: "noronha-divers",
    destinoId: "noronha",
    nome: "Noronha Divers",
    tipo: "Passeio",
    nota: 4.7,
    totalAvaliacoes: 318,
    faixa: "R$ 420 o batismo",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Operadora de mergulho com instrutores credenciados e saídas em dois horários. Faz batismo para quem nunca mergulhou e saídas técnicas para quem já tem certificação.",
    endereco: "Alameda do Boldró, s/n",
    horario: "Saídas às 8h e às 13h30, todos os dias",
    telefone: "(81) 3619-1112",
    site: "noronhadivers.com.br",
    fotos: ["assets/img/noronha.jpg", "assets/img/noronha-dois-irmaos.jpg", "assets/img/selfie-montanha.jpg"],
    comodidades: ["Equipamento incluso", "Instrutor credenciado", "Fotos do mergulho inclusas", "Batismo sem experiência prévia"],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 5, data: "há 3 semanas", texto: "Primeiro mergulho da vida e me senti seguro o tempo todo. Vimos três tartarugas na mesma saída." }
    ]
  },
  {
    id: "bar-do-meio",
    destinoId: "noronha",
    nome: "Bar do Meio",
    tipo: "Bar",
    nota: 4.4,
    totalAvaliacoes: 97,
    faixa: "R$ 90 por pessoa",
    checagem: { em: "05/2026", estado: "ok" },
    plano: "base",
    resumo: "Bar de praia na Conceição, com mesas na areia e música ao vivo no fim da tarde. Ainda não passou pela curadoria.",
    endereco: "Praia da Conceição, s/n",
    horario: "Todos os dias, das 10h às 23h",
    telefone: "(81) 99988-4410",
    site: "instagram.com/bardomeionoronha",
    fotos: ["assets/img/noronha.jpg", "assets/img/bike-por-do-sol.jpg", "assets/img/maragogi.jpg"],
    comodidades: ["Mesas na areia", "Música ao vivo no pôr do sol", "Aceita cartão"],
    avaliacoes: []
  },

  /* ---------- Maragogi ---------- */
  {
    id: "salinas-maragogi",
    destinoId: "maragogi",
    nome: "Salinas Maragogi",
    tipo: "Hospedagem",
    nota: 4.8,
    totalAvaliacoes: 1540,
    faixa: "R$ 980/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Resort all inclusive pé na areia, com programação para crianças e cinco restaurantes internos. Funciona bem para quem quer resolver a viagem inteira em um lugar só.",
    endereco: "Rodovia AL-101 Norte, km 124",
    horario: "Recepção 24h · check-in às 15h",
    telefone: "(82) 3296-1500",
    site: "salinas.com.br/maragogi",
    fotos: ["assets/img/maragogi.jpg", "assets/img/noronha.jpg", "assets/img/bike-por-do-sol.jpg"],
    comodidades: ["All inclusive", "Pé na areia", "Recreação infantil", "Cinco restaurantes", "Saída para as galés na portaria"],
    avaliacoes: [
      { autor: "Família Torres", avatar: "assets/img/p2.jpg", nota: 5, data: "há 1 mês", texto: "Com duas crianças, o all inclusive salvou. Elas ficavam na recreação e a gente conseguia almoçar em paz." },
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 4, data: "há 2 meses", texto: "Estrutura ótima. O único porém é a fila do restaurante japonês: reserve logo no primeiro dia." }
    ]
  },
  {
    id: "sal-e-brasa-beach",
    destinoId: "maragogi",
    nome: "Sal & Brasa Beach",
    tipo: "Restaurante",
    nota: 4.5,
    totalAvaliacoes: 402,
    faixa: "R$ 120 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Rodízio de carnes e frutos do mar na beira da praia, com mesas cobertas de palha. É o jantar mais pedido por quem está hospedado fora dos resorts.",
    endereco: "Av. Senador Rui Palmeira, 1200 — Centro",
    horario: "Todos os dias, das 11h30 às 23h",
    telefone: "(82) 3296-2080",
    site: "salebrasamaragogi.com.br",
    fotos: ["assets/img/maragogi.jpg", "assets/img/casal-pretzel.jpg", "assets/img/noronha.jpg"],
    comodidades: ["Mesas na praia", "Rodízio de frutos do mar", "Estacionamento próprio", "Menu infantil"],
    avaliacoes: [
      { autor: "Lucas P.", avatar: "assets/img/p3.jpg", nota: 4, data: "há 3 meses", texto: "Comida boa e atendimento rápido. Peça mesa na parte coberta: o sol da tarde bate forte." }
    ]
  },
  {
    id: "catamara-gales",
    destinoId: "maragogi",
    nome: "Catamarã Galés",
    tipo: "Passeio",
    nota: 4.6,
    totalAvaliacoes: 276,
    faixa: "R$ 160 por pessoa",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Saída de catamarã até as piscinas naturais das Galés, a 6 km da costa. O horário muda todo dia conforme a tábua de marés.",
    endereco: "Píer da Praia de Maragogi",
    horario: "Saída única diária, conforme a maré",
    telefone: "(82) 99615-7722",
    site: "instagram.com/catamaragales",
    fotos: ["assets/img/maragogi.jpg", "assets/img/noronha-dois-irmaos.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Colete e snorkel inclusos", "Duração de 3h", "Taxa ambiental à parte"],
    avaliacoes: []
  },

  /* ---------- Rio de Janeiro ---------- */
  {
    id: "hotel-arpoador",
    destinoId: "rio",
    nome: "Hotel Arpoador",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 864,
    faixa: "R$ 620/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "O único hotel de frente para a pedra do Arpoador, entre Ipanema e Copacabana. Quartos pequenos, mas a localização resolve o roteiro a pé.",
    endereco: "Rua Francisco Otaviano, 177 — Ipanema",
    horario: "Recepção 24h · check-in às 15h",
    telefone: "(21) 2021-1000",
    site: "arpoadorhotel.com.br",
    fotos: ["assets/img/rio.jpg", "assets/img/bike-por-do-sol.jpg", "assets/img/saopaulo.jpg"],
    comodidades: ["Frente para o mar", "Café da manhã incluso", "Aluguel de prancha", "A 5 min do metrô"],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 5 dias", texto: "Viajei a trabalho e consegui ver o pôr do sol no Arpoador todos os dias saindo do próprio hotel." }
    ]
  },
  {
    id: "bar-astor",
    destinoId: "rio",
    nome: "Bar Astor",
    tipo: "Restaurante",
    nota: 4.5,
    totalAvaliacoes: 1120,
    faixa: "R$ 140 por pessoa",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Boteco de esquina em Ipanema com cozinha aberta até tarde. Bom para jantar depois da praia sem precisar trocar de roupa.",
    endereco: "Av. Vieira Souto, 110 — Ipanema",
    horario: "Segunda a quinta até 1h · sexta e sábado até 2h",
    telefone: "(21) 2523-0085",
    site: "barastor.com.br",
    fotos: ["assets/img/rio.jpg", "assets/img/casal-pretzel.jpg", "assets/img/saopaulo.jpg"],
    comodidades: ["Cozinha até tarde", "Mesas na calçada", "Carta de drinques", "Aceita reserva"],
    avaliacoes: []
  },
  {
    id: "rio-free-walking-tour",
    destinoId: "rio",
    nome: "Rio Free Walking Tour",
    tipo: "Passeio",
    nota: 4.7,
    totalAvaliacoes: 538,
    faixa: "Contribuição livre",
    checagem: { em: "06/2026", estado: "ok" },
    plano: "base",
    resumo: "Caminhada guiada de 3h pelo Centro histórico, com guias que trabalham por contribuição no fim do passeio. Sai de segunda a sábado, chova ou faça sol.",
    endereco: "Encontro na Cinelândia, em frente ao Theatro Municipal",
    horario: "Segunda a sábado, às 9h30",
    telefone: "(21) 98112-3344",
    site: "freewalkertours.com/rio",
    fotos: ["assets/img/rio.jpg", "assets/img/grupo-trilha.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Guia em português e inglês", "Duração de 3h", "Sem reserva obrigatória"],
    avaliacoes: []
  },

  /* ---------- Foz do Iguaçu ---------- */
  {
    id: "belmond-cataratas",
    destinoId: "foz",
    nome: "Belmond Hotel das Cataratas",
    tipo: "Hospedagem",
    nota: 4.9,
    totalAvaliacoes: 742,
    faixa: "R$ 1.500/noite",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Único hotel dentro do Parque Nacional: hóspedes entram nas trilhas antes da abertura ao público e ficam depois que o parque fecha.",
    endereco: "Rodovia BR-469, km 32 — Parque Nacional do Iguaçu",
    horario: "Recepção 24h · check-in às 15h",
    telefone: "(45) 2102-7000",
    site: "belmond.com/cataratas",
    fotos: ["assets/img/foz.jpg", "assets/img/cachoeira-trilha.jpg", "assets/img/trilha-montanha.jpg"],
    comodidades: ["Dentro do parque nacional", "Acesso às trilhas fora do horário", "Piscina aquecida", "Café da manhã incluso"],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 1 mês", texto: "Acordar e ver as cataratas vazias às 7h da manhã é outra viagem. Vale a diária." }
    ]
  },
  {
    id: "bufalo-branco",
    destinoId: "foz",
    nome: "Restaurante Búfalo Branco",
    tipo: "Restaurante",
    nota: 4.4,
    totalAvaliacoes: 2310,
    faixa: "R$ 160 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Churrascaria tradicional da cidade, com rodízio de 30 cortes e bufê de saladas. É parada comum de quem volta do parque no fim da tarde.",
    endereco: "Rua Rebouças, 530 — Centro",
    horario: "Todos os dias, das 11h30 às 23h30",
    telefone: "(45) 3523-9744",
    site: "bufalobranco.com.br",
    fotos: ["assets/img/foz.jpg", "assets/img/casal-pretzel.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Rodízio de 30 cortes", "Bufê de saladas", "Estacionamento com manobrista", "Menu infantil"],
    avaliacoes: []
  },
  {
    id: "parque-das-aves",
    destinoId: "foz",
    nome: "Parque das Aves",
    tipo: "Passeio",
    nota: 4.8,
    totalAvaliacoes: 3105,
    faixa: "R$ 95 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Viveiros abertos em meio à mata, onde o visitante caminha junto com as aves. Fica em frente à entrada do parque das cataratas e leva cerca de 2h.",
    endereco: "Av. das Cataratas, km 17,1",
    horario: "Todos os dias, das 8h30 às 17h",
    telefone: "(45) 3529-8282",
    site: "parquedasaves.com.br",
    fotos: ["assets/img/foz.jpg", "assets/img/cachoeira-trilha.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Viveiros abertos", "Acessível para cadeirantes", "Duração de 2h", "Café e loja no fim do percurso"],
    avaliacoes: [
      { autor: "Família Torres", avatar: "assets/img/p2.jpg", nota: 5, data: "há 1 mês", texto: "As crianças gostaram mais daqui do que das cataratas. Vá à tarde, depois do parque." }
    ]
  },

  /* ---------- Bonito ---------- */
  {
    id: "pousada-olho-dagua",
    destinoId: "bonito",
    nome: "Pousada Olho D'Água",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 388,
    faixa: "R$ 480/noite",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Chalés espalhados em um terreno arborizado a 2 km do centro, com agência própria para marcar os vouchers dos passeios.",
    endereco: "Rodovia Três Morros, km 1",
    horario: "Recepção das 7h às 22h · check-in às 14h",
    telefone: "(67) 3255-1430",
    site: "pousadaolhodagua.com.br",
    fotos: ["assets/img/bonito.jpg", "assets/img/trilha-montanha.jpg", "assets/img/cachoeira-trilha.jpg"],
    comodidades: ["Chalés individuais", "Agência de passeios no local", "Piscina natural", "Café da manhã colonial"],
    avaliacoes: []
  },
  {
    id: "casa-do-joao",
    destinoId: "bonito",
    nome: "Casa do João",
    tipo: "Restaurante",
    nota: 4.7,
    totalAvaliacoes: 1890,
    faixa: "R$ 110 por pessoa",
    checagem: { em: "05/2026", estado: "ok" },
    plano: "base",
    resumo: "Cozinha pantaneira com peixes de água doce e porções para dividir. Enche cedo: a fila começa antes das 19h30.",
    endereco: "Rua Nelson Felício dos Santos, 664",
    horario: "Todos os dias, das 11h às 15h e das 18h às 23h",
    telefone: "(67) 3255-1212",
    site: "casadojoao.com.br",
    fotos: ["assets/img/bonito.jpg", "assets/img/casal-pretzel.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Cozinha pantaneira", "Porções para dividir", "Opções vegetarianas"],
    avaliacoes: [
      { autor: "Lucas P.", avatar: "assets/img/p3.jpg", nota: 5, data: "há 3 meses", texto: "Pedi o pintado na brasa e não errei. Chegue antes das 19h se não quiser esperar." }
    ]
  },

  /* ---------- Blumenau ---------- */
  {
    id: "hotel-gloria",
    destinoId: "blumenau",
    nome: "Hotel Glória",
    tipo: "Hospedagem",
    nota: 4.5,
    totalAvaliacoes: 612,
    faixa: "R$ 320/noite",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Hotel histórico no centro, a dez minutos a pé da Vila Germânica. O café colonial do térreo é aberto ao público e vira parada obrigatória.",
    endereco: "Rua 7 de Setembro, 954 — Centro",
    horario: "Recepção 24h · café colonial das 15h às 19h",
    telefone: "(47) 3326-1988",
    site: "hotelgloria.com.br",
    fotos: ["assets/img/blumenau.jpg", "assets/img/blumenau-centro.jpg", "assets/img/vila-germanica.jpg"],
    comodidades: ["Café colonial no térreo", "A 10 min da Vila Germânica", "Estacionamento coberto", "Quartos família"],
    avaliacoes: [
      { autor: "Cacau", avatar: "assets/img/p5.jpg", nota: 5, data: "há 2 meses", texto: "Só satisfação! Café da manhã maravilhoso e dá para ir a pé a tudo que importa no centro." }
    ]
  },
  {
    id: "bierland",
    destinoId: "blumenau",
    nome: "Cervejaria Bierland",
    tipo: "Bar",
    nota: 4.7,
    totalAvaliacoes: 2240,
    faixa: "R$ 90 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "destaque",
    resumo: "Cervejaria artesanal com visita guiada à fábrica e degustação de seis rótulos. É o ponto de partida da rota cervejeira a pé pelo centro de Blumenau.",
    endereco: "Rua Gustavo Zimmermann, 5361 — Itoupava Central",
    horario: "Terça a domingo, das 11h às 23h · visitas guiadas às 15h e às 17h",
    telefone: "(47) 3337-3100",
    site: "bierland.com.br",
    fotos: ["assets/img/vila-germanica.jpg", "assets/img/casal-pretzel.jpg", "assets/img/blumenau.jpg"],
    comodidades: ["Visita guiada à fábrica", "Degustação de seis rótulos", "Cozinha alemã", "Música ao vivo aos sábados", "Começo da rota cervejeira"],
    avaliacoes: [
      { autor: "Rafael T.", avatar: "assets/img/p2.jpg", nota: 5, data: "há 3 semanas", texto: "Fizemos a visita das 15h e depois seguimos a pé para as outras duas cervejarias verificadas. Sábado perfeito." },
      { autor: "Cacau", avatar: "assets/img/p5.jpg", nota: 4, data: "há 2 meses", texto: "A degustação vale muito. Só avise se for em grupo grande, que eles separam uma mesa." }
    ]
  },
  {
    id: "confeitaria-rex",
    destinoId: "blumenau",
    nome: "Confeitaria Rex",
    tipo: "Restaurante",
    nota: 4.3,
    totalAvaliacoes: 430,
    faixa: "R$ 70 por pessoa",
    checagem: { em: "06/2026", estado: "ok" },
    plano: "base",
    resumo: "Confeitaria de 1950 na rua principal, famosa pelo strudel e pelo café da tarde. Ainda não passou pela curadoria.",
    endereco: "Rua 15 de Novembro, 390 — Centro",
    horario: "Segunda a sábado, das 8h às 19h",
    telefone: "(47) 3322-1044",
    site: "instagram.com/confeitariarex",
    fotos: ["assets/img/blumenau-centro.jpg", "assets/img/casal-pretzel.jpg", "assets/img/blumenau.jpg"],
    comodidades: ["Strudel e tortas alemãs", "Café da tarde", "Mesas na calçada"],
    avaliacoes: []
  },

  /* ---------- Curitiba ---------- */
  {
    id: "hostel-roma",
    destinoId: "curitiba",
    nome: "Hostel Roma",
    tipo: "Hospedagem",
    nota: 4.2,
    totalAvaliacoes: 196,
    faixa: "R$ 140/noite",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Hostel no centro histórico com quartos privativos e compartilhados, a duas quadras do terminal de ônibus que leva a quase toda a cidade.",
    endereco: "Rua Barão do Rio Branco, 805 — Centro",
    horario: "Recepção das 7h às 23h · check-in às 14h",
    telefone: "(41) 3322-2021",
    site: "hostelroma.com.br",
    fotos: ["assets/img/curitiba.jpg", "assets/img/curitiba-japao.jpg", "assets/img/bike-por-do-sol.jpg"],
    comodidades: ["Quartos privativos e compartilhados", "Cozinha coletiva", "A 2 quadras do terminal", "Café da manhã incluso"],
    avaliacoes: []
  },
  {
    id: "mercado-municipal-curitiba",
    destinoId: "curitiba",
    nome: "Mercado Municipal",
    tipo: "Restaurante",
    nota: 4.6,
    totalAvaliacoes: 5420,
    faixa: "R$ 60 por pessoa",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Boxes de comida, setor orgânico e empórios em um prédio só. É onde a cidade almoça barato e bem, de terça a domingo.",
    endereco: "Av. Sete de Setembro, 1865 — Centro",
    horario: "Terça a sábado das 7h às 18h · domingo das 7h às 13h",
    telefone: "(41) 3363-3764",
    site: "mercadomunicipaldecuritiba.com.br",
    fotos: ["assets/img/curitiba-japao.jpg", "assets/img/curitiba.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Praça de alimentação", "Setor orgânico", "Fecha às segundas", "Estacionamento no subsolo"],
    avaliacoes: []
  },

  /* ---------- São Paulo ---------- */
  {
    id: "hotel-emiliano",
    destinoId: "saopaulo",
    nome: "Hotel Emiliano",
    tipo: "Hospedagem",
    nota: 4.9,
    totalAvaliacoes: 512,
    faixa: "R$ 1.800/noite",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Hotel de luxo nos Jardins, a uma quadra da Oscar Freire. Procurado por quem viaja a trabalho e quer reunião e jantar no mesmo endereço.",
    endereco: "Rua Oscar Freire, 384 — Jardins",
    horario: "Recepção 24h · check-in às 15h",
    telefone: "(11) 3068-4399",
    site: "emiliano.com.br",
    fotos: ["assets/img/saopaulo.jpg", "assets/img/bike-por-do-sol.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Salas de reunião", "Spa e piscina coberta", "Transfer executivo", "Restaurante no lobby"],
    avaliacoes: []
  },
  {
    id: "bar-piraja",
    destinoId: "saopaulo",
    nome: "Bar Pirajá",
    tipo: "Bar",
    nota: 4.4,
    totalAvaliacoes: 1760,
    faixa: "R$ 110 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Boteco grande em Pinheiros, com chope bem tirado e porções clássicas. Funciona para grupos sem reserva, mesmo em noite de sexta.",
    endereco: "Av. Brigadeiro Faria Lima, 64 — Pinheiros",
    horario: "Todos os dias, das 11h30 à 1h",
    telefone: "(11) 3815-6881",
    site: "piraja.com.br",
    fotos: ["assets/img/saopaulo.jpg", "assets/img/casal-pretzel.jpg", "assets/img/rio.jpg"],
    comodidades: ["Mesas para grupos", "Chope artesanal", "Cozinha até tarde"],
    avaliacoes: []
  },

  /* ---------- Paris ---------- */
  {
    id: "hotel-fabric",
    destinoId: "paris",
    nome: "Hôtel Fabric",
    tipo: "Hospedagem",
    nota: 4.7,
    totalAvaliacoes: 934,
    faixa: "€ 210/noite",
    checagem: { em: "08/2025", estado: "expirado" },
    plano: "verificado",
    resumo: "Antiga fábrica têxtil transformada em hotel no 11º arrondissement. Fica a dez minutos a pé do Marais e serve café da manhã até as 11h.",
    endereco: "31 Rue de la Folie Méricourt, 75011 Paris",
    horario: "Recepção 24h · check-in às 15h",
    telefone: "+33 1 43 57 27 00",
    site: "hotelfabric.com",
    fotos: ["assets/img/paris.jpg", "assets/img/casal-pretzel.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Café da manhã até as 11h", "A 10 min do Marais", "Bar no lobby", "Empréstimo de bicicletas"],
    avaliacoes: [
      { autor: "Helena V.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 4 meses", texto: "Bairro tranquilo e perto de tudo que a gente queria andando. O café da manhã até tarde combinou com a viagem." }
    ]
  },
  {
    id: "comptoir-du-relais",
    destinoId: "paris",
    nome: "Le Comptoir du Relais",
    tipo: "Restaurante",
    nota: 4.6,
    totalAvaliacoes: 1280,
    faixa: "€ 60 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Bistrô de esquina em Saint-Germain com menu que muda toda semana. Não aceita reserva no almoço, e a fila anda rápido.",
    endereco: "9 Carrefour de l'Odéon, 75006 Paris",
    horario: "Todos os dias, das 12h às 23h",
    telefone: "+33 1 44 27 07 97",
    site: "hotel-paris-relais-saint-germain.com",
    fotos: ["assets/img/paris.jpg", "assets/img/casal-pretzel.jpg", "assets/img/bike-por-do-sol.jpg"],
    comodidades: ["Menu que muda toda semana", "Mesas na calçada", "Reserva só no jantar"],
    avaliacoes: []
  },

  /* ---------- Banff e Buena Vista ---------- */
  {
    id: "moose-hotel",
    destinoId: "banff",
    nome: "Moose Hotel & Suites",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 708,
    faixa: "CA$ 340/noite",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Hotel na rua principal de Banff, com duas piscinas no terraço de frente para as montanhas. Tem estacionamento próprio, essencial para quem aluga carro.",
    endereco: "345 Banff Ave, Banff, AB",
    horario: "Recepção 24h · check-in às 16h",
    telefone: "+1 403 760 8570",
    site: "moosehotelandsuites.com",
    fotos: ["assets/img/banff.jpg", "assets/img/trilha-montanha.jpg", "assets/img/selfie-montanha.jpg"],
    comodidades: ["Piscinas no terraço", "Estacionamento próprio", "A 5 min das trilhas", "Aluguel de raquetes de neve"],
    avaliacoes: []
  },
  {
    id: "cabins-buena-vista",
    destinoId: "buenavista",
    nome: "Cabins at Buena Vista",
    tipo: "Hospedagem",
    nota: 4.4,
    totalAvaliacoes: 142,
    faixa: "US$ 160/noite",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Cabanas de madeira com lareira e cozinha completa, a 20 minutos da entrada da Blue Ridge Parkway. Boa base para roteiro de carro em família.",
    endereco: "1240 Forest Ln, Buena Vista, VA",
    horario: "Check-in autônomo, a partir das 16h",
    telefone: "+1 540 261 2880",
    site: "cabinsatbuenavista.com",
    fotos: ["assets/img/buenavista.jpg", "assets/img/trilha-montanha.jpg", "assets/img/cachoeira-trilha.jpg"],
    comodidades: ["Lareira e cozinha completa", "Aceita animais", "Estacionamento na porta", "Check-in autônomo"],
    avaliacoes: []
  },
  /* ---------- Santos ---------- */
  {
    id: "pousada-gonzaga",
    destinoId: "santos",
    nome: "Pousada Gonzaga 44",
    tipo: "Hospedagem",
    nota: 4.3,
    totalAvaliacoes: 186,
    faixa: "R$ 260/noite",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Doze quartos numa casa dos anos 60 a uma quadra da praia do Gonzaga, com estacionamento coberto — o que mais falta em Santos num fim de semana.",
    endereco: "Rua Mal. Floriano Peixoto, 44 — Gonzaga",
    horario: "Recepção das 7h às 23h · check-in às 15h",
    telefone: "(13) 3289-4410",
    site: "pousadagonzaga44.com.br",
    fotos: ["assets/img/ilustra/santos.svg", "assets/img/planejamento.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Estacionamento coberto", "Uma quadra da praia", "Aceita animais de pequeno porte", "Café da manhã incluso"],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 4, data: "há 1 semana", texto: "Simples e limpa, e a vaga de garagem salvou o fim de semana." }
    ]
  },
  {
    id: "cantina-dos-pescadores",
    destinoId: "santos",
    nome: "Cantina dos Pescadores",
    tipo: "Restaurante",
    nota: 4.5,
    totalAvaliacoes: 612,
    faixa: "R$ 90 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Peixe do dia e caldeirada numa casa do Boqueirão aberta desde 1978. Fila no almoço de domingo, e não aceitam reserva.",
    endereco: "Av. Vicente de Carvalho, 512 — Boqueirão",
    horario: "Terça a domingo, das 11h30 às 22h",
    telefone: "(13) 3234-7781",
    site: "cantinadospescadores.com.br",
    fotos: ["assets/img/ilustra/santos.svg", "assets/img/casal-pretzel.jpg", "assets/img/hero.jpg"],
    comodidades: ["Peixe do dia", "Opções vegetarianas", "Acessível para cadeira de rodas", "Não aceita reserva"],
    avaliacoes: [
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 5, data: "há 2 meses", texto: "Chegamos às 11h30 de domingo e pegamos mesa. Meia hora depois a fila já dava a volta." }
    ]
  },
  {
    id: "museu-do-cafe-tour",
    destinoId: "santos",
    nome: "Museu do Café — visita guiada",
    tipo: "Passeio",
    nota: 4.6,
    totalAvaliacoes: 428,
    faixa: "R$ 30 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "base",
    resumo: "Visita de 1h na antiga Bolsa Oficial do Café, com degustação no fim. Guia sai de hora em hora e o prédio é todo acessível.",
    endereco: "Rua XV de Novembro, 95 — Centro Histórico",
    horario: "Terça a sábado, das 9h às 17h · domingo até as 16h",
    telefone: "(13) 3213-1750",
    site: "museudocafe.org.br",
    fotos: ["assets/img/ilustra/santos.svg", "assets/img/mapa-camera.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Guia incluso", "Degustação no fim da visita", "Acessível para cadeira de rodas", "Cafeteria no térreo"],
    avaliacoes: []
  },

  /* ---------- Campos do Jordão ---------- */
  {
    id: "chale-da-mantiqueira",
    destinoId: "campos-do-jordao",
    nome: "Chalés da Mantiqueira",
    tipo: "Hospedagem",
    nota: 4.7,
    totalAvaliacoes: 294,
    faixa: "R$ 580/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Seis chalés de madeira com lareira e vista para o vale, a 10 minutos da Vila Capivari. Lenha e café da manhã na porta estão inclusos.",
    endereco: "Estrada do Horto Florestal, km 4",
    horario: "Recepção das 8h às 22h · check-in às 15h",
    telefone: "(12) 3663-2240",
    site: "chalesdamantiqueira.com.br",
    fotos: ["assets/img/ilustra/campos-do-jordao.svg", "assets/img/trilha-montanha.jpg", "assets/img/selfie-montanha.jpg"],
    comodidades: ["Lareira com lenha inclusa", "Café da manhã na porta", "Vista para o vale", "Aceita animais", "Estacionamento privativo"],
    avaliacoes: [
      { autor: "Rafael e Dani", avatar: "assets/img/p2.jpg", nota: 5, data: "há 3 semanas", texto: "A lenha já estava acesa quando chegamos. Pequeno detalhe que fez a viagem." }
    ]
  },
  {
    id: "baden-baden-tap",
    destinoId: "campos-do-jordao",
    nome: "Baden Baden Tap House",
    tipo: "Bar",
    nota: 4.4,
    totalAvaliacoes: 1140,
    faixa: "R$ 70 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "destaque",
    resumo: "Dezoito torneiras rotativas na Vila Capivari, com cozinha até meia-noite. Lota a partir das 19h no inverno.",
    endereco: "Rua Djalma Forjaz, 93 — Vila Capivari",
    horario: "Todos os dias, das 12h às 1h",
    telefone: "(12) 3663-3610",
    site: "badenbadentap.com.br",
    fotos: ["assets/img/ilustra/campos-do-jordao.svg", "assets/img/casal-pretzel.jpg", "assets/img/band.jpg"],
    comodidades: ["18 torneiras rotativas", "Cozinha até meia-noite", "Degustação guiada", "Opções vegetarianas"],
    avaliacoes: []
  },
  {
    id: "trilha-itapeva",
    destinoId: "campos-do-jordao",
    nome: "Guias do Itapeva",
    tipo: "Passeio",
    nota: 4.8,
    totalAvaliacoes: 206,
    faixa: "R$ 150 por pessoa",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "base",
    resumo: "Saída às 5h para o Pico do Itapeva com guia credenciado, café quente no mirante e volta até as 9h. Grupo de no máximo oito pessoas.",
    endereco: "Ponto de encontro na Praça São Benedito",
    horario: "Saídas às 5h, com reserva até as 20h do dia anterior",
    telefone: "(12) 99714-0088",
    site: "guiasdoitapeva.com.br",
    fotos: ["assets/img/ilustra/campos-do-jordao.svg", "assets/img/selfie-montanha.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Guia credenciado", "Grupo de até 8 pessoas", "Café no mirante", "Transporte do centro incluso"],
    avaliacoes: [
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 5, data: "há 1 mês", texto: "Acordar às 4h30 doeu, ver o nascer do sol acima das nuvens não." }
    ]
  },
  {
    id: "casa-do-fondue",
    destinoId: "campos-do-jordao",
    nome: "Casa do Fondue",
    tipo: "Restaurante",
    nota: 4.2,
    totalAvaliacoes: 880,
    faixa: "R$ 160 por pessoa",
    checagem: { em: "12/2025", estado: "ok" },
    plano: "base",
    resumo: "Rodízio de fondue de queijo, carne e chocolate em três andares de casa de madeira. Reserva obrigatória de maio a agosto.",
    endereco: "Av. Macedo Soares, 2.160 — Jardim Embaixador",
    horario: "Quinta a domingo, das 18h às 23h30",
    telefone: "(12) 3662-1154",
    site: "casadofondue.com.br",
    fotos: ["assets/img/ilustra/campos-do-jordao.svg", "assets/img/casal-pretzel.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Rodízio de fondue", "Reserva por telefone", "Opção vegetariana", "Área para crianças"],
    avaliacoes: []
  },

  /* ---------- Ubatuba ---------- */
  {
    id: "pousada-almada",
    destinoId: "ubatuba",
    nome: "Pousada Almada",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 232,
    faixa: "R$ 390/noite",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Oito quartos a 200 m da praia da Almada, no lado norte, com trilha para a Figueira saindo do quintal. Aceita cão sem taxa extra.",
    endereco: "Estrada da Almada, 1.120 — Almada",
    horario: "Recepção das 8h às 21h · check-in às 14h",
    telefone: "(12) 3835-1190",
    site: "pousadaalmada.com.br",
    fotos: ["assets/img/ilustra/ubatuba.svg", "assets/img/cachoeira-trilha.jpg", "assets/img/trilha-montanha.jpg"],
    comodidades: ["200 m da praia", "Aceita animais sem taxa", "Trilha saindo do quintal", "Café da manhã incluso"],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 5, data: "há 1 mês", texto: "Levamos o cachorro e ninguém cobrou nada a mais, como estava escrito aqui." }
    ]
  },
  {
    id: "peixe-na-telha",
    destinoId: "ubatuba",
    nome: "Peixe na Telha",
    tipo: "Restaurante",
    nota: 4.4,
    totalAvaliacoes: 540,
    faixa: "R$ 110 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Casa de pé na areia na Enseada, com o peixe assado na telha que dá nome ao lugar. Fecha quando chove forte.",
    endereco: "Av. Rio Grande do Sul, 340 — Enseada",
    horario: "Quarta a domingo, das 11h às 20h",
    telefone: "(12) 3842-2075",
    site: "peixenatelha.com.br",
    fotos: ["assets/img/ilustra/ubatuba.svg", "assets/img/hero.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Pé na areia", "Peixe assado na telha", "Porções para dividir", "Chuveiro de areia"],
    avaliacoes: []
  },
  {
    id: "flutuacao-anchieta",
    destinoId: "ubatuba",
    nome: "Flutuação Ilha Anchieta",
    tipo: "Passeio",
    nota: 4.7,
    totalAvaliacoes: 318,
    faixa: "R$ 190 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Travessia de escuna até o parque estadual da Ilha Anchieta, com duas paradas de flutuação e máscara inclusa. Saída única, às 9h.",
    endereco: "Píer da Enseada, Av. Leovegildo Dias Vieira",
    horario: "Saída às 9h, retorno às 16h30 · exige reserva",
    telefone: "(12) 3842-0431",
    site: "flutuacaoanchieta.com.br",
    fotos: ["assets/img/ilustra/ubatuba.svg", "assets/img/grupo-trilha.jpg", "assets/img/bike-por-do-sol.jpg"],
    comodidades: ["Máscara e snorkel inclusos", "Guia na flutuação", "Almoço na ilha à parte", "Colete para quem não nada"],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 2 semanas", texto: "Água cristalina e o guia ficou na água com quem não se sentia seguro. Nota dez." }
    ]
  },

  /* ---------- Brotas ---------- */
  {
    id: "jacare-rafting",
    destinoId: "brotas",
    nome: "Jacaré Rafting",
    tipo: "Passeio",
    nota: 4.6,
    totalAvaliacoes: 492,
    faixa: "R$ 220 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Descida de 8 km no Jacaré-Pepira com condutor em cada bote e equipamento conferido na saída. Aceita quem nunca remou.",
    endereco: "Rodovia Brotas–Torrinha, km 4",
    horario: "Saídas às 9h, 11h e 14h · todos os dias",
    telefone: "(14) 3653-2290",
    site: "jacarerafting.com.br",
    fotos: ["assets/img/ilustra/brotas.svg", "assets/img/cachoeira-trilha.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Condutor por bote", "Equipamento incluso", "Sem experiência prévia", "Fotos do percurso à parte"],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 4, data: "há 2 semanas", texto: "Fomos em quatro e todo mundo voltou inteiro. Levem roupa de troca de verdade." }
    ]
  },
  {
    id: "pousada-tres-quedas",
    destinoId: "brotas",
    nome: "Pousada Três Quedas",
    tipo: "Hospedagem",
    nota: 4.4,
    totalAvaliacoes: 164,
    faixa: "R$ 320/noite",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Dez quartos na estrada das cachoeiras, com piscina natural no terreno e pacote fechado com as operadoras da cidade.",
    endereco: "Estrada Municipal do Pau d'Alho, km 7",
    horario: "Recepção das 7h às 22h · check-in às 14h",
    telefone: "(14) 3653-1870",
    site: "pousadatresquedas.com.br",
    fotos: ["assets/img/ilustra/brotas.svg", "assets/img/cachoeira-trilha.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Piscina natural no terreno", "Pacote com operadoras", "Café da manhã reforçado", "Estacionamento"],
    avaliacoes: []
  },
  {
    id: "empada-da-serra",
    destinoId: "brotas",
    nome: "Empada da Serra",
    tipo: "Restaurante",
    nota: 4.3,
    totalAvaliacoes: 288,
    faixa: "R$ 45 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Empadas grandes e caldo de mandioca na praça central, aberto desde as 7h para quem vai para a trilha cedo.",
    endereco: "Praça da Matriz, 18 — Centro",
    horario: "Todos os dias, das 7h às 19h",
    telefone: "(14) 3653-1122",
    site: "empadadaserra.com.br",
    fotos: ["assets/img/ilustra/brotas.svg", "assets/img/casal-pretzel.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Abre às 7h", "Marmita para a trilha", "Opções vegetarianas", "Mesas na calçada"],
    avaliacoes: []
  },

  /* ---------- Morretes ---------- */
  {
    id: "barreado-da-nair",
    destinoId: "morretes",
    nome: "Barreado da Nair",
    tipo: "Restaurante",
    nota: 4.7,
    totalAvaliacoes: 724,
    faixa: "R$ 95 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "base",
    resumo: "Barreado servido na panela de barro, no ritmo de três horas de almoço, numa casa de 1890 à beira do rio Nhundiaquara.",
    endereco: "Rua Visconde do Rio Branco, 72 — Centro Histórico",
    horario: "Quinta a domingo, das 11h30 às 17h",
    telefone: "(41) 3462-1180",
    site: "barreadodanair.com.br",
    fotos: ["assets/img/ilustra/morretes.svg", "assets/img/casal-pretzel.jpg", "assets/img/blumenau-centro.jpg"],
    comodidades: ["Barreado em panela de barro", "Mesas na beira do rio", "Cachaça da região", "Opção vegetariana sob encomenda"],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 3 semanas", texto: "Três horas de almoço e nenhuma pressa de ninguém. É assim que se come barreado." }
    ]
  },
  {
    id: "trem-serra-do-mar",
    destinoId: "morretes",
    nome: "Trem da Serra do Mar",
    tipo: "Transporte local",
    nota: 4.8,
    totalAvaliacoes: 2860,
    faixa: "R$ 180 o trecho",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Quatro horas de descida de Curitiba a Morretes, com 13 túneis e a ponte São João. Lado esquerdo do vagão na ida, sempre.",
    endereco: "Embarque na Rua Barão do Rio Branco, 170 — Curitiba",
    horario: "Saída às 8h15 · retorno de ônibus ou trem no fim da tarde",
    telefone: "(41) 3888-3488",
    site: "serraverdeexpress.com.br",
    fotos: ["assets/img/ilustra/morretes.svg", "assets/img/curitiba-japao.jpg", "assets/img/trilha-montanha.jpg"],
    comodidades: ["4h de percurso", "Vagão com guia", "Bilhete de volta de ônibus", "Acessível no vagão turismo"],
    avaliacoes: [
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 5, data: "há 1 mês", texto: "Dica do lado esquerdo do vagão: verdadeira. Vista o tempo todo." }
    ]
  },
  {
    id: "pousada-nhundiaquara",
    destinoId: "morretes",
    nome: "Pousada Nhundiaquara",
    tipo: "Hospedagem",
    nota: 4.3,
    totalAvaliacoes: 142,
    faixa: "R$ 240/noite",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Casarão de esquina com sete quartos sobre o rio, no centro histórico. É a hospedagem mais barata desta lista e a mais bem localizada da cidade.",
    endereco: "Rua Fritz Hoffmann, 15 — Centro Histórico",
    horario: "Recepção das 8h às 20h · check-in às 14h",
    telefone: "(41) 3462-1228",
    site: "pousadanhundiaquara.com.br",
    fotos: ["assets/img/ilustra/morretes.svg", "assets/img/blumenau-centro.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Vista para o rio", "Centro histórico a pé", "Café da manhã incluso", "Aceita animais"],
    avaliacoes: []
  },

  /* ---------- Ilha do Mel ---------- */
  {
    id: "barco-pontal-ilha",
    destinoId: "ilha-do-mel",
    nome: "Travessia Pontal do Sul",
    tipo: "Transporte local",
    nota: 4.2,
    totalAvaliacoes: 1420,
    faixa: "R$ 60 ida e volta",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Barco de meia em meia hora entre Pontal do Sul e as duas vilas da ilha. Leva mochila, não leva mala de rodinha — não há rua na ilha.",
    endereco: "Terminal de Pontal do Sul, Pontal do Paraná",
    horario: "Saídas das 8h às 18h, de 30 em 30 minutos",
    telefone: "(41) 3455-1144",
    site: "travessiailhadomel.com.br",
    fotos: ["assets/img/ilustra/ilha-do-mel.svg", "assets/img/mapa-camera.jpg", "assets/img/hero.jpg"],
    comodidades: ["Saídas de 30 em 30 min", "Colete para todos", "Bagagem de mão apenas", "Estacionamento no terminal à parte"],
    avaliacoes: []
  },
  {
    id: "pousada-farol",
    destinoId: "ilha-do-mel",
    nome: "Pousada do Farol",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 198,
    faixa: "R$ 280/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Nove quartos a 300 m do Farol das Conchas, na trilha de areia. Pagamento somente à vista ou por Pix: não há maquininha funcionando na ilha.",
    endereco: "Trilha do Farol, Nova Brasília",
    horario: "Recepção das 8h às 21h · check-in às 14h",
    telefone: "(41) 99663-2201",
    site: "pousadadofarolilha.com.br",
    fotos: ["assets/img/ilustra/ilha-do-mel.svg", "assets/img/trilha-montanha.jpg", "assets/img/selfie-montanha.jpg"],
    comodidades: ["300 m do farol", "Pix ou dinheiro", "Café da manhã incluso", "Carrinho para bagagem"],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 4, data: "há 2 meses", texto: "O aviso de pagamento à vista estava na ficha e evitou o perrengue clássico da ilha." }
    ]
  },
  {
    id: "bar-do-pescador-ilha",
    destinoId: "ilha-do-mel",
    nome: "Bar do Pescador",
    tipo: "Bar",
    nota: 4.4,
    totalAvaliacoes: 312,
    faixa: "R$ 55 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Quiosque na areia da Praia de Fora com casquinha de siri e cerveja gelada. Fecha ao escurecer porque não há iluminação pública na trilha.",
    endereco: "Praia de Fora, Nova Brasília",
    horario: "Todos os dias, das 11h ao pôr do sol",
    telefone: "(41) 99812-7740",
    site: "—",
    fotos: ["assets/img/ilustra/ilha-do-mel.svg", "assets/img/bike-por-do-sol.jpg", "assets/img/hero.jpg"],
    comodidades: ["Pé na areia", "Casquinha de siri", "Fecha ao pôr do sol", "Só dinheiro e Pix"],
    avaliacoes: []
  },

  /* ---------- Gramado ---------- */
  {
    id: "hotel-hortensias",
    destinoId: "gramado",
    nome: "Hotel das Hortênsias",
    tipo: "Hospedagem",
    nota: 4.7,
    totalAvaliacoes: 864,
    faixa: "R$ 640/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Trinta e dois quartos a duas quadras da Borges de Medeiros, com piso térreo todo acessível e berço sem custo. Café colonial servido até as 11h.",
    endereco: "Rua São Pedro, 410 — Centro",
    horario: "Recepção 24h · check-in às 15h",
    telefone: "(54) 3286-1180",
    site: "hoteldashortensias.com.br",
    fotos: ["assets/img/ilustra/gramado.svg", "assets/img/trilha-montanha.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Térreo acessível", "Berço sem custo", "Café colonial até as 11h", "Estacionamento coberto", "Aceita animais"],
    avaliacoes: [
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 5, data: "há 2 semanas", texto: "Com criança pequena, poder voltar ao hotel a pé no meio da tarde mudou tudo." }
    ]
  },
  {
    id: "fondue-do-vale",
    destinoId: "gramado",
    nome: "Fondue do Vale",
    tipo: "Restaurante",
    nota: 4.5,
    totalAvaliacoes: 1320,
    faixa: "R$ 180 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "destaque",
    resumo: "Rodízio de fondue em três etapas com vista para o Lago Negro. Reserva obrigatória de maio a agosto e no Natal Luz.",
    endereco: "Rua Mestre Quico, 55 — Planalto",
    horario: "Todos os dias, das 18h30 às 23h30",
    telefone: "(54) 3286-4412",
    site: "fonduedovale.com.br",
    fotos: ["assets/img/ilustra/gramado.svg", "assets/img/casal-pretzel.jpg", "assets/img/vila-germanica.jpg"],
    comodidades: ["Rodízio em três etapas", "Vista para o Lago Negro", "Reserva obrigatória na temporada", "Menu vegetariano"],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 4, data: "há 1 mês", texto: "Fondue bom, preço de temporada. Fora do Natal Luz fica bem mais tranquilo." }
    ]
  },
  {
    id: "rota-canela-tour",
    destinoId: "gramado",
    nome: "Rota Gramado–Canela",
    tipo: "Passeio",
    nota: 4.4,
    totalAvaliacoes: 486,
    faixa: "R$ 120 por pessoa",
    checagem: { em: "12/2025", estado: "ok" },
    plano: "base",
    resumo: "Meio dia de van entre Lago Negro, Cascata do Caracol e o mirante do Vale da Ferradura, com guia e entradas inclusas.",
    endereco: "Embarque na Praça Major Nicoletti",
    horario: "Saídas às 8h30 e às 13h30",
    telefone: "(54) 99645-1120",
    site: "rotagramadocanela.com.br",
    fotos: ["assets/img/ilustra/gramado.svg", "assets/img/cachoeira-trilha.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Guia incluso", "Entradas inclusas", "Van com ar", "Embarque no centro"],
    avaliacoes: []
  },
  {
    id: "chocolateria-serra",
    destinoId: "gramado",
    nome: "Chocolateria da Serra",
    tipo: "Bar",
    nota: 4.3,
    totalAvaliacoes: 940,
    faixa: "R$ 40 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Fábrica aberta na Borges de Medeiros, com chocolate quente e visita de 20 minutos à produção. Fila na janela nas tardes de inverno.",
    endereco: "Av. Borges de Medeiros, 2.070 — Centro",
    horario: "Todos os dias, das 9h às 21h",
    telefone: "(54) 3286-2255",
    site: "chocolateriadaserra.com.br",
    fotos: ["assets/img/ilustra/gramado.svg", "assets/img/casal-pretzel.jpg", "assets/img/band.jpg"],
    comodidades: ["Visita à produção", "Chocolate quente", "Opção sem lactose", "Acessível para cadeira de rodas"],
    avaliacoes: []
  },

  /* ---------- Bento Gonçalves ---------- */
  {
    id: "vinicola-casa-valduga-tour",
    destinoId: "bento-goncalves",
    nome: "Vinícola Vale do Sol — visita e degustação",
    tipo: "Passeio",
    nota: 4.8,
    totalAvaliacoes: 1180,
    faixa: "R$ 160 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Visita de 1h30 na cave, com degustação de quatro rótulos e, na colheita, participação na pisa da uva. Horário marcado, sem fila.",
    endereco: "Linha Leopoldina, s/n — Vale dos Vinhedos",
    horario: "Visitas às 9h, 11h, 14h e 16h · exige reserva",
    telefone: "(54) 3453-2180",
    site: "valedosolvinhos.com.br",
    fotos: ["assets/img/ilustra/bento-goncalves.svg", "assets/img/planejamento.jpg", "assets/img/casal-pretzel.jpg"],
    comodidades: ["Degustação de 4 rótulos", "Visita guiada à cave", "Horário marcado", "Acessível para cadeira de rodas", "Opção sem álcool"],
    avaliacoes: [
      { autor: "Rafael e Dani", avatar: "assets/img/p2.jpg", nota: 5, data: "há 1 mês", texto: "Participamos da pisa da uva em fevereiro. Reservamos pelo telefone da ficha dois dias antes." }
    ]
  },
  {
    id: "pousada-dos-vinhedos",
    destinoId: "bento-goncalves",
    nome: "Pousada dos Vinhedos",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 342,
    faixa: "R$ 520/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "base",
    resumo: "Catorze quartos no meio do parreiral, a 10 minutos de três vinícolas. Café da manhã com queijo e pão da colônia.",
    endereco: "Linha Zemith, km 2 — Vale dos Vinhedos",
    horario: "Recepção das 7h às 22h · check-in às 15h",
    telefone: "(54) 3451-1190",
    site: "pousadadosvinhedos.com.br",
    fotos: ["assets/img/ilustra/bento-goncalves.svg", "assets/img/planejamento.jpg", "assets/img/trilha-montanha.jpg"],
    comodidades: ["No meio do parreiral", "Café colonial incluso", "Transfer para as vinícolas", "Estacionamento"],
    avaliacoes: []
  },
  {
    id: "maria-fumaca-vale",
    destinoId: "bento-goncalves",
    nome: "Maria-Fumaça do Vale",
    tipo: "Transporte local",
    nota: 4.5,
    totalAvaliacoes: 2240,
    faixa: "R$ 210 por pessoa",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "base",
    resumo: "Três horas de trem a vapor entre Bento, Garibaldi e Carlos Barbosa, com música ao vivo, espumante e queijo servidos no vagão.",
    endereco: "Estação Bento Gonçalves, Rua Osvaldo Aranha",
    horario: "Saídas sextas, sábados e domingos, às 9h e às 14h",
    telefone: "(54) 3455-2788",
    site: "mariafumacadovale.com.br",
    fotos: ["assets/img/ilustra/bento-goncalves.svg", "assets/img/curitiba-japao.jpg", "assets/img/band.jpg"],
    comodidades: ["Música ao vivo no vagão", "Espumante e queijo inclusos", "3h de percurso", "Volta de ônibus incluída"],
    avaliacoes: []
  },
  {
    id: "cantina-nonna-rosa",
    destinoId: "bento-goncalves",
    nome: "Cantina Nonna Rosa",
    tipo: "Restaurante",
    nota: 4.4,
    totalAvaliacoes: 680,
    faixa: "R$ 130 por pessoa",
    checagem: { em: "08/2025", estado: "expirado" },
    plano: "verificado",
    resumo: "Almoço de cantina com galeto, polenta e massa servidos à mesa. A checagem venceu em agosto de 2025 e está na fila de reconferência.",
    endereco: "Linha Jansen, 480 — Vale dos Vinhedos",
    horario: "Quinta a domingo, das 11h30 às 16h",
    telefone: "(54) 3452-1104",
    site: "cantinanonnarosa.com.br",
    fotos: ["assets/img/ilustra/bento-goncalves.svg", "assets/img/casal-pretzel.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Serviço à mesa sem limite", "Vinho da casa", "Área para crianças", "Estacionamento próprio"],
    avaliacoes: []
  },

  /* ---------- Petrópolis ---------- */
  {
    id: "museu-imperial-visita",
    destinoId: "petropolis",
    nome: "Museu Imperial — visita guiada",
    tipo: "Passeio",
    nota: 4.8,
    totalAvaliacoes: 3120,
    faixa: "R$ 20 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Visita de 1h ao palácio de verão de Pedro II, de chinelo de feltro sobre o assoalho original. A coroa imperial fica na última sala.",
    endereco: "Rua da Imperatriz, 220 — Centro",
    horario: "Terça a domingo, das 11h às 18h",
    telefone: "(24) 2233-6000",
    site: "museuimperial.museus.gov.br",
    fotos: ["assets/img/ilustra/petropolis.svg", "assets/img/mapa-camera.jpg", "assets/img/blumenau-centro.jpg"],
    comodidades: ["Guia a cada 30 min", "Acessível no térreo", "Jardim aberto à visita", "Bilhete pela internet"],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 3 semanas", texto: "Vale a visita guiada e não a visita solta: a história muda completamente com o guia." }
    ]
  },
  {
    id: "bohemia-bingen",
    destinoId: "petropolis",
    nome: "Cervejaria Bingen 1853",
    tipo: "Bar",
    nota: 4.5,
    totalAvaliacoes: 742,
    faixa: "R$ 80 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Produção aberta no bairro alemão, com degustação de seis rótulos e cozinha de petisco até as 23h. Seis produtores a pé um do outro.",
    endereco: "Rua Bingen, 1.170 — Bingen",
    horario: "Quarta a domingo, das 16h às 23h",
    telefone: "(24) 2242-1180",
    site: "bingen1853.com.br",
    fotos: ["assets/img/ilustra/petropolis.svg", "assets/img/casal-pretzel.jpg", "assets/img/band.jpg"],
    comodidades: ["Degustação de 6 rótulos", "Visita à produção", "Cozinha até 23h", "Opções vegetarianas"],
    avaliacoes: []
  },
  {
    id: "hotel-casa-da-serra",
    destinoId: "petropolis",
    nome: "Casa da Serra Hotel",
    tipo: "Hospedagem",
    nota: 4.2,
    totalAvaliacoes: 218,
    faixa: "R$ 340/noite",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Dezoito quartos num casarão de 1920 a cinco minutos a pé do Museu Imperial. Checagem solicitada em abril e ainda na fila da curadoria.",
    endereco: "Rua do Imperador, 740 — Centro",
    horario: "Recepção 24h · check-in às 14h",
    telefone: "(24) 2237-4410",
    site: "casadaserrahotel.com.br",
    fotos: ["assets/img/ilustra/petropolis.svg", "assets/img/planejamento.jpg", "assets/img/blumenau-centro.jpg"],
    comodidades: ["Cinco minutos do Museu Imperial", "Café da manhã incluso", "Estacionamento conveniado", "Aceita animais"],
    avaliacoes: []
  },

  /* ---------- Búzios ---------- */
  {
    id: "pousada-joao-fernandes",
    destinoId: "buzios",
    nome: "Pousada João Fernandes",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 410,
    faixa: "R$ 720/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Dezesseis quartos na encosta da praia de João Fernandes, com piscina de borda e trilha de 200 m até a areia.",
    endereco: "Rua 8, Lote 12 — João Fernandes",
    horario: "Recepção 24h · check-in às 14h",
    telefone: "(22) 2623-1180",
    site: "pousadajoaofernandes.com.br",
    fotos: ["assets/img/ilustra/buzios.svg", "assets/img/hero.jpg", "assets/img/bike-por-do-sol.jpg"],
    comodidades: ["Piscina de borda infinita", "200 m da praia", "Transfer do Rio à parte", "Café da manhã até as 11h"],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 2 semanas", texto: "Vista do quarto igual à foto e a trilha até a praia é curta de verdade." }
    ]
  },
  {
    id: "orla-bardot-bistro",
    destinoId: "buzios",
    nome: "Bistrô Orla Bardot",
    tipo: "Restaurante",
    nota: 4.4,
    totalAvaliacoes: 1280,
    faixa: "R$ 190 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "destaque",
    resumo: "Mesa na orla com peixe grelhado e massa fresca, aberto até meia-noite. Reserva com três dias de antecedência no verão.",
    endereco: "Orla Bardot, 480 — Centro",
    horario: "Todos os dias, das 12h à meia-noite",
    telefone: "(22) 2623-4477",
    site: "bistroorlabardot.com.br",
    fotos: ["assets/img/ilustra/buzios.svg", "assets/img/casal-pretzel.jpg", "assets/img/hero.jpg"],
    comodidades: ["Mesa na orla", "Peixe do dia", "Reserva por telefone", "Menu vegetariano"],
    avaliacoes: []
  },
  {
    id: "trilha-olho-de-boi",
    destinoId: "buzios",
    nome: "Guias da Olho de Boi",
    tipo: "Passeio",
    nota: 4.7,
    totalAvaliacoes: 186,
    faixa: "R$ 90 por pessoa",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "base",
    resumo: "Trilha curta e íngreme até a praia mais isolada da península, com guia local e parada para banho. Não indicada para crianças pequenas.",
    endereco: "Ponto de encontro na Praia Brava",
    horario: "Saídas às 8h e às 15h · exige reserva",
    telefone: "(22) 99812-4410",
    site: "guiasolhodeboi.com.br",
    fotos: ["assets/img/ilustra/buzios.svg", "assets/img/trilha-montanha.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Guia local", "Grupo de até 10 pessoas", "Água inclusa", "Trilha íngreme — calçado fechado"],
    avaliacoes: []
  },

  /* ---------- Porto de Galinhas ---------- */
  {
    id: "pousada-maracaipe",
    destinoId: "porto-de-galinhas",
    nome: "Pousada Maracaípe",
    tipo: "Hospedagem",
    nota: 4.5,
    totalAvaliacoes: 528,
    faixa: "R$ 420/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Vinte e dois quartos entre a vila e Maracaípe, com piscina rasa, berço e cadeira de alimentação sem custo. Tudo a pé da rua de pedestre.",
    endereco: "Rua da Esperança, 220 — Maracaípe",
    horario: "Recepção 24h · check-in às 14h",
    telefone: "(81) 3552-1180",
    site: "pousadamaracaipe.com.br",
    fotos: ["assets/img/ilustra/porto-de-galinhas.svg", "assets/img/maragogi.jpg", "assets/img/hero.jpg"],
    comodidades: ["Piscina rasa para crianças", "Berço e cadeira sem custo", "Vila a pé", "Aceita animais", "Café da manhã até as 10h30"],
    avaliacoes: [
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 5, data: "há 1 mês", texto: "Com duas crianças, a piscina rasa valeu mais que a praia nos primeiros dois dias." }
    ]
  },
  {
    id: "jangada-piscinas",
    destinoId: "porto-de-galinhas",
    nome: "Jangadeiros de Porto",
    tipo: "Passeio",
    nota: 4.6,
    totalAvaliacoes: 2840,
    faixa: "R$ 60 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "destaque",
    resumo: "Jangada até as piscinas naturais, com saídas conforme a tabela de maré e colete para quem não nada. Associação local, com rodízio de jangadeiros.",
    endereco: "Praia de Porto de Galinhas, posto dos jangadeiros",
    horario: "Conforme a maré baixa · consulte a tabela do dia",
    telefone: "(81) 3552-2210",
    site: "jangadeirosdeporto.com.br",
    fotos: ["assets/img/ilustra/porto-de-galinhas.svg", "assets/img/maragogi.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Colete para todos", "Máscara inclusa", "Associação local", "Saída pela tabela de maré"],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 4, data: "há 3 meses", texto: "Primeira jangada do dia é a única que vale. Depois das 10h já tem fila de barco." }
    ]
  },
  {
    id: "beijupira-porto",
    destinoId: "porto-de-galinhas",
    nome: "Casa do Beijupirá",
    tipo: "Restaurante",
    nota: 4.5,
    totalAvaliacoes: 1420,
    faixa: "R$ 150 por pessoa",
    checagem: { em: "12/2025", estado: "ok" },
    plano: "base",
    resumo: "Casa colorida na vila com peixe beijupirá em sete preparos e sobremesa de tapioca. Não aceita reserva e enche a partir das 20h.",
    endereco: "Rua Beijupirá, s/n — Vila de Porto",
    horario: "Todos os dias, das 12h às 23h",
    telefone: "(81) 3552-1195",
    site: "casadobeijupira.com.br",
    fotos: ["assets/img/ilustra/porto-de-galinhas.svg", "assets/img/casal-pretzel.jpg", "assets/img/maragogi.jpg"],
    comodidades: ["Peixe beijupirá", "Opções vegetarianas", "Área coberta", "Não aceita reserva"],
    avaliacoes: []
  },
  {
    id: "cavalos-marinhos-maracaipe",
    destinoId: "porto-de-galinhas",
    nome: "Reserva dos Cavalos-Marinhos",
    tipo: "Passeio",
    nota: 4.4,
    totalAvaliacoes: 640,
    faixa: "R$ 80 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Passeio de caiaque no estuário de Maracaípe com monitor ambiental. Observação sem tirar o animal da água, como manda a regra da reserva.",
    endereco: "Estuário de Maracaípe, acesso pela Rua do Mangue",
    horario: "Saídas às 7h e às 15h, com maré favorável",
    telefone: "(81) 99645-7712",
    site: "reservamaracaipe.org.br",
    fotos: ["assets/img/ilustra/porto-de-galinhas.svg", "assets/img/grupo-trilha.jpg", "assets/img/cachoeira-trilha.jpg"],
    comodidades: ["Monitor ambiental", "Caiaque e colete inclusos", "Sem manuseio de animais", "Grupo de até 8 pessoas"],
    avaliacoes: []
  },

  /* ---------- Olinda ---------- */
  {
    id: "pousada-amparo",
    destinoId: "olinda",
    nome: "Pousada do Amparo",
    tipo: "Hospedagem",
    nota: 4.7,
    totalAvaliacoes: 386,
    faixa: "R$ 380/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Dois casarões do século 18 ligados por jardim, com piscina de azulejo e vista do mar da varanda do café.",
    endereco: "Rua do Amparo, 199 — Carmo",
    horario: "Recepção das 7h às 22h · check-in às 14h",
    telefone: "(81) 3439-1749",
    site: "pousadadoamparo.com.br",
    fotos: ["assets/img/ilustra/olinda.svg", "assets/img/blumenau-centro.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Casarão do século 18", "Piscina no jardim", "Vista do mar no café", "Centro histórico a pé"],
    avaliacoes: [
      { autor: "Marina L.", avatar: "assets/img/p4.jpg", nota: 5, data: "há 2 semanas", texto: "Dormir num casarão de 300 anos e tomar café olhando o mar. Nada a reclamar." }
    ]
  },
  {
    id: "oficina-frevo",
    destinoId: "olinda",
    nome: "Oficina de Frevo do Alto",
    tipo: "Passeio",
    nota: 4.6,
    totalAvaliacoes: 214,
    faixa: "R$ 70 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Aula aberta de frevo de 1h30 com passista local, no galpão do Alto da Sé. Sem experiência e sem par — e com sombrinha emprestada.",
    endereco: "Rua São Francisco, 88 — Alto da Sé",
    horario: "Quintas e sábados, às 17h · exige reserva",
    telefone: "(81) 99712-3380",
    site: "oficinadefrevodoalto.com.br",
    fotos: ["assets/img/ilustra/olinda.svg", "assets/img/band.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Sombrinha emprestada", "Sem par e sem experiência", "Passista local", "Grupo de até 15 pessoas"],
    avaliacoes: []
  },
  {
    id: "tapioca-alto-da-se",
    destinoId: "olinda",
    nome: "Tapiocas do Alto da Sé",
    tipo: "Restaurante",
    nota: 4.3,
    totalAvaliacoes: 1560,
    faixa: "R$ 35 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Fileira de barracas de tapioca no mirante do Alto da Sé, abertas até tarde. Vista da costa do Recife incluída no preço.",
    endereco: "Alto da Sé, s/n — Carmo",
    horario: "Todos os dias, das 15h às 22h",
    telefone: "—",
    site: "—",
    fotos: ["assets/img/ilustra/olinda.svg", "assets/img/casal-pretzel.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Vista do mirante", "Opções doces e salgadas", "Preço baixo", "Só dinheiro e Pix"],
    avaliacoes: []
  },

  /* ---------- Ouro Preto ---------- */
  {
    id: "pousada-chico-rei",
    destinoId: "ouro-preto",
    nome: "Pousada Chico Rei",
    tipo: "Hospedagem",
    nota: 4.6,
    totalAvaliacoes: 298,
    faixa: "R$ 340/noite",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Onze quartos num sobrado de 1740 a 200 m da Praça Tiradentes. A ladeira de acesso é de pedra e íngreme: não há como chegar de cadeira de rodas.",
    endereco: "Rua Brigadeiro Musqueira, 90 — Centro",
    horario: "Recepção das 7h às 22h · check-in às 14h",
    telefone: "(31) 3551-1274",
    site: "pousadachicorei.com.br",
    fotos: ["assets/img/ilustra/ouro-preto.svg", "assets/img/blumenau-centro.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Sobrado de 1740", "200 m da Praça Tiradentes", "Café da manhã mineiro", "Ladeira de pedra no acesso"],
    avaliacoes: [
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 5, data: "há 1 mês", texto: "O aviso sobre a ladeira é honesto e necessário. Fomos preparados e foi ótimo." }
    ]
  },
  {
    id: "mina-chico-rei-visita",
    destinoId: "ouro-preto",
    nome: "Mina do Chico Rei",
    tipo: "Passeio",
    nota: 4.5,
    totalAvaliacoes: 1120,
    faixa: "R$ 40 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Galeria de mina do século 18 aberta à visita, com 40 minutos de percurso a pé e teto baixo em alguns trechos.",
    endereco: "Rua Dom Silvério, 108 — Antônio Dias",
    horario: "Todos os dias, das 8h às 17h",
    telefone: "(31) 3551-1749",
    site: "minadochicorei.com.br",
    fotos: ["assets/img/ilustra/ouro-preto.svg", "assets/img/cachoeira-trilha.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Galeria original do século 18", "Capacete incluso", "Teto baixo em trechos", "Guia por grupo"],
    avaliacoes: []
  },
  {
    id: "restaurante-bené-da-flauta",
    destinoId: "ouro-preto",
    nome: "Bené da Flauta",
    tipo: "Restaurante",
    nota: 4.4,
    totalAvaliacoes: 862,
    faixa: "R$ 140 por pessoa",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Comida mineira em panela de pedra num sobrado ao lado da igreja de São Francisco, com a melhor vista de almoço da cidade.",
    endereco: "Rua São Francisco de Assis, 32 — Centro",
    horario: "Todos os dias, das 11h30 às 22h",
    telefone: "(31) 3551-1036",
    site: "benedaflauta.com.br",
    fotos: ["assets/img/ilustra/ouro-preto.svg", "assets/img/casal-pretzel.jpg", "assets/img/blumenau-centro.jpg"],
    comodidades: ["Vista da São Francisco", "Comida mineira em panela de pedra", "Reserva por telefone", "Opções vegetarianas"],
    avaliacoes: []
  },

  /* ---------- Tiradentes ---------- */
  {
    id: "pousada-mae-dagua",
    destinoId: "tiradentes",
    nome: "Pousada Mãe d'Água",
    tipo: "Hospedagem",
    nota: 4.7,
    totalAvaliacoes: 252,
    faixa: "R$ 480/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Nove quartos num casarão de esquina com pátio interno e lareira na sala comum. Aceita cães de qualquer porte, sem taxa.",
    endereco: "Rua da Praia, 46 — Centro",
    horario: "Recepção das 8h às 21h · check-in às 15h",
    telefone: "(32) 3355-1180",
    site: "pousadamaedagua.com.br",
    fotos: ["assets/img/ilustra/tiradentes.svg", "assets/img/planejamento.jpg", "assets/img/blumenau-centro.jpg"],
    comodidades: ["Aceita cães de qualquer porte", "Lareira na sala comum", "Pátio interno", "Café da manhã mineiro"],
    avaliacoes: [
      { autor: "Paula R.", avatar: "assets/img/p6.jpg", nota: 5, data: "há 3 semanas", texto: "Quatro pousadas verificadas aceitavam o nosso cachorro. Escolhemos esta pelo pátio." }
    ]
  },
  {
    id: "tragaluz",
    destinoId: "tiradentes",
    nome: "Restaurante Tragaluz",
    tipo: "Restaurante",
    nota: 4.6,
    totalAvaliacoes: 720,
    faixa: "R$ 200 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "destaque",
    resumo: "Menu de cinco etapas com produto da região, servido em duas sessões por noite. Reserva com uma semana no festival de agosto.",
    endereco: "Rua Direita, 52 — Centro",
    horario: "Quarta a domingo, às 19h e às 21h30",
    telefone: "(32) 3355-2210",
    site: "tragaluztiradentes.com.br",
    fotos: ["assets/img/ilustra/tiradentes.svg", "assets/img/casal-pretzel.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Menu de 5 etapas", "Duas sessões por noite", "Harmonização opcional", "Menu vegetariano completo"],
    avaliacoes: []
  },
  {
    id: "maria-fumaca-tiradentes",
    destinoId: "tiradentes",
    nome: "Maria-Fumaça São João",
    tipo: "Transporte local",
    nota: 4.5,
    totalAvaliacoes: 1840,
    faixa: "R$ 90 ida e volta",
    checagem: { em: "12/2025", estado: "ok" },
    plano: "base",
    resumo: "Trem a vapor de 1881 em bitola estreita, 13 km até São João del-Rei em 35 minutos. Só circula de sexta a domingo.",
    endereco: "Estação Tiradentes, Praça da Estação",
    horario: "Sexta a domingo, saídas às 10h e às 15h",
    telefone: "(32) 3371-8485",
    site: "mariafumacasaojoao.com.br",
    fotos: ["assets/img/ilustra/tiradentes.svg", "assets/img/curitiba-japao.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Locomotiva de 1881", "35 min de percurso", "Bilhete na estação", "Vagão aberto"],
    avaliacoes: []
  },

  /* ---------- Praia do Forte ---------- */
  {
    id: "tamar-praia-do-forte",
    destinoId: "praia-do-forte",
    nome: "Projeto Tamar — centro de visitantes",
    tipo: "Passeio",
    nota: 4.8,
    totalAvaliacoes: 4120,
    faixa: "R$ 50 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Tanques de visitação na rua principal da vila, com soltura de filhotes de tartaruga na temporada de desova, de setembro a março.",
    endereco: "Av. do Farol, s/n — Praia do Forte",
    horario: "Todos os dias, das 9h às 18h",
    telefone: "(71) 3676-1045",
    site: "tamar.org.br",
    fotos: ["assets/img/ilustra/praia-do-forte.svg", "assets/img/maragogi.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Tanques de visitação", "Soltura de filhotes na temporada", "Acessível para cadeira de rodas", "Visita guiada de hora em hora"],
    avaliacoes: [
      { autor: "Juliana M.", avatar: "assets/img/p1.jpg", nota: 5, data: "há 1 mês", texto: "Pegamos uma soltura de filhotes por sorte de calendário. As crianças não falaram de outra coisa." }
    ]
  },
  {
    id: "pousada-vila-do-farol",
    destinoId: "praia-do-forte",
    nome: "Pousada Vila do Farol",
    tipo: "Hospedagem",
    nota: 4.5,
    totalAvaliacoes: 464,
    faixa: "R$ 460/noite",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Dezoito quartos a uma quadra da Alameda do Sol, com piscina rasa e acesso plano até a praia. Tudo a pé, sem carro na vila.",
    endereco: "Alameda das Estrelas, 112 — Praia do Forte",
    horario: "Recepção 24h · check-in às 14h",
    telefone: "(71) 3676-1180",
    site: "pousadaviladofarol.com.br",
    fotos: ["assets/img/ilustra/praia-do-forte.svg", "assets/img/maragogi.jpg", "assets/img/hero.jpg"],
    comodidades: ["Acesso plano até a praia", "Piscina rasa", "Berço sem custo", "Aceita animais", "Vila de pedestre"],
    avaliacoes: []
  },
  {
    id: "bar-do-souza",
    destinoId: "praia-do-forte",
    nome: "Bar do Souza",
    tipo: "Bar",
    nota: 4.4,
    totalAvaliacoes: 1180,
    faixa: "R$ 90 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Moqueca e música ao vivo na beira da areia, no fim da Alameda do Sol. Toca forró ao vivo de quinta a domingo, a partir das 19h.",
    endereco: "Alameda do Sol, final — Praia do Forte",
    horario: "Todos os dias, das 11h às 23h",
    telefone: "(71) 3676-1129",
    site: "bardosouza.com.br",
    fotos: ["assets/img/ilustra/praia-do-forte.svg", "assets/img/band.jpg", "assets/img/bike-por-do-sol.jpg"],
    comodidades: ["Música ao vivo", "Moqueca para dois", "Pé na areia", "Opções vegetarianas"],
    avaliacoes: []
  },

  /* ---------- Chapada Diamantina ---------- */
  {
    id: "guias-vale-do-capao",
    destinoId: "chapada-diamantina",
    nome: "Guias do Vale do Capão",
    tipo: "Passeio",
    nota: 4.9,
    totalAvaliacoes: 640,
    faixa: "R$ 280 o dia",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Associação de guias credenciados do Vale do Capão, com saídas de um dia para a Fumaça, o Riachinho e a Cachoeira da Purificação.",
    endereco: "Rua da Associação, s/n — Vale do Capão, Palmeiras",
    horario: "Saídas às 7h · reserva no dia anterior",
    telefone: "(75) 99812-4477",
    site: "guiasdocapao.org.br",
    fotos: ["assets/img/ilustra/chapada-diamantina.svg", "assets/img/trilha-montanha.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Guias credenciados", "Grupo de até 8 pessoas", "Lanche de trilha incluso", "Transporte até o acesso"],
    avaliacoes: [
      { autor: "Gregório B.", avatar: "assets/img/p3.jpg", nota: 5, data: "há 2 semanas", texto: "Contratamos três dias com a associação. Sem guia, não teríamos achado metade dos acessos." }
    ]
  },
  {
    id: "pousada-lencois-centro",
    destinoId: "chapada-diamantina",
    nome: "Pousada Lençóis Centro",
    tipo: "Hospedagem",
    nota: 4.5,
    totalAvaliacoes: 318,
    faixa: "R$ 290/noite",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Catorze quartos a duas ruas do mercado de Lençóis, com área para secar bota e roupa de trilha. Café da manhã a partir das 6h.",
    endereco: "Rua das Pedras, 88 — Centro, Lençóis",
    horario: "Recepção das 6h às 22h · check-in às 13h",
    telefone: "(75) 3334-1180",
    site: "pousadalencoiscentro.com.br",
    fotos: ["assets/img/ilustra/chapada-diamantina.svg", "assets/img/trilha-montanha.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Café da manhã a partir das 6h", "Área para secar equipamento", "Guarda-volumes", "Centro de Lençóis a pé"],
    avaliacoes: []
  },
  {
    id: "transfer-lencois-capao",
    destinoId: "chapada-diamantina",
    nome: "Transfer Lençóis–Capão",
    tipo: "Transporte local",
    nota: 4.1,
    totalAvaliacoes: 226,
    faixa: "R$ 140 o trecho",
    checagem: { em: "09/2025", estado: "expirado" },
    plano: "base",
    resumo: "Van entre Lençóis e o Vale do Capão em 2h30 de estrada de terra. A checagem venceu em setembro de 2025 e o local saiu do filtro de verificados.",
    endereco: "Embarque na Praça Horácio de Matos, Lençóis",
    horario: "Saídas às 7h e às 14h · conforme a lotação",
    telefone: "(75) 99645-2288",
    site: "—",
    fotos: ["assets/img/ilustra/chapada-diamantina.svg", "assets/img/mapa-camera.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["2h30 de percurso", "Estrada de terra", "Bagagem de trilha", "Sem ar-condicionado"],
    avaliacoes: []
  },

  /* ---------- reforço nos destinos que já existiam ----------
     Abaixo de uns oito locais por destino a ficha parece vazia e o
     filtro de verificados perde sentido: é a métrica de saúde do
     marketplace que a documentação de modelo pede. */
  {
    id: "flutuacao-rio-da-prata",
    destinoId: "bonito",
    nome: "Flutuação Rio da Prata",
    tipo: "Passeio",
    nota: 4.8,
    totalAvaliacoes: 1840,
    faixa: "R$ 320 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Trilha de 2 km na mata e 1.800 m de flutuação rio abaixo, com cardume visível a três metros. Grupo com horário marcado, como manda o voucher único de Bonito.",
    endereco: "Rodovia BR-267, km 513 — Jardim",
    horario: "Saídas das 7h às 14h · exige voucher",
    telefone: "(67) 3255-3333",
    site: "riodaprata.com.br",
    fotos: ["assets/img/bonito.jpg", "assets/img/cachoeira-trilha.jpg", "assets/img/grupo-trilha.jpg"],
    comodidades: ["Roupa de neoprene inclusa", "Guia por grupo", "Horário marcado", "Almoço na sede à parte"],
    avaliacoes: []
  },
  {
    id: "abismo-anhumas",
    destinoId: "bonito",
    nome: "Abismo Anhumas",
    tipo: "Passeio",
    nota: 4.9,
    totalAvaliacoes: 486,
    faixa: "R$ 980 por pessoa",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "base",
    resumo: "Rapel de 72 m até um lago subterrâneo com cones de calcário, limitado a 18 pessoas por dia. Exige treino de rapel na véspera.",
    endereco: "Estrada da Boca da Onça, km 23",
    horario: "Saída única às 7h · reserva com antecedência",
    telefone: "(67) 3255-3313",
    site: "abismoanhumas.com.br",
    fotos: ["assets/img/bonito.jpg", "assets/img/trilha-montanha.jpg", "assets/img/selfie-montanha.jpg"],
    comodidades: ["Rapel de 72 m", "Treino na véspera incluso", "18 pessoas por dia", "Mergulho opcional no lago"],
    avaliacoes: [
      { autor: "Camila S.", avatar: "assets/img/p5.jpg", nota: 5, data: "há 2 meses", texto: "Caro e vale cada centavo. O treino do dia anterior tira qualquer medo." }
    ]
  },
  {
    id: "bar-do-largo-curitiba",
    destinoId: "curitiba",
    nome: "Bar do Largo",
    tipo: "Bar",
    nota: 4.3,
    totalAvaliacoes: 520,
    faixa: "R$ 70 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "base",
    resumo: "Boteco de esquina no Largo da Ordem, com cerveja local e música ao vivo nas noites de sexta. Mesas na calçada o ano todo.",
    endereco: "Rua São Francisco, 220 — São Francisco",
    horario: "Terça a domingo, das 17h à 1h",
    telefone: "(41) 3224-1180",
    site: "bardolargo.com.br",
    fotos: ["assets/img/curitiba.jpg", "assets/img/band.jpg", "assets/img/curitiba-japao.jpg"],
    comodidades: ["Cerveja de produtor local", "Música ao vivo na sexta", "Mesas na calçada", "Opções vegetarianas"],
    avaliacoes: []
  },
  {
    id: "jardim-botanico-tour",
    destinoId: "curitiba",
    nome: "Jardim Botânico — visita guiada",
    tipo: "Passeio",
    nota: 4.7,
    totalAvaliacoes: 2240,
    faixa: "Gratuito",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Visita de 1h pela estufa de ferro e pelo jardim francês, com monitor da prefeitura. Percurso todo plano e acessível.",
    endereco: "Rua Eng. Ostoja Roguski, s/n — Jardim Botânico",
    horario: "Todos os dias, das 6h às 20h · visitas às 10h e às 15h",
    telefone: "(41) 3250-7000",
    site: "curitiba.pr.gov.br",
    fotos: ["assets/img/curitiba.jpg", "assets/img/curitiba-japao.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Entrada gratuita", "Percurso acessível", "Monitor da prefeitura", "Estufa de ferro e vidro"],
    avaliacoes: []
  },
  {
    id: "bar-do-mercadao-sp",
    destinoId: "saopaulo",
    nome: "Bar do Mercadão",
    tipo: "Bar",
    nota: 4.2,
    totalAvaliacoes: 3180,
    faixa: "R$ 60 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Balcão no mezanino do Mercado Municipal, com o sanduíche de mortadela e pastel de bacalhau. Fila a partir do meio-dia.",
    endereco: "Rua da Cantareira, 306 — Centro",
    horario: "Segunda a sábado, das 8h às 17h",
    telefone: "(11) 3313-7700",
    site: "oportalodomercadao.com.br",
    fotos: ["assets/img/saopaulo.jpg", "assets/img/casal-pretzel.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Mortadela do mezanino", "Pastel de bacalhau", "Balcão em pé", "Acessível por elevador"],
    avaliacoes: []
  },
  {
    id: "pinacoteca-visita",
    destinoId: "saopaulo",
    nome: "Pinacoteca — visita guiada",
    tipo: "Passeio",
    nota: 4.8,
    totalAvaliacoes: 2480,
    faixa: "R$ 40 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Visita de 1h30 pelo acervo brasileiro do século 19 e 20, com mediador. Sábado é gratuito e enche a partir das 11h.",
    endereco: "Praça da Luz, 2 — Luz",
    horario: "Quarta a segunda, das 10h às 18h",
    telefone: "(11) 3324-1000",
    site: "pinacoteca.org.br",
    fotos: ["assets/img/saopaulo.jpg", "assets/img/mapa-camera.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Mediador incluso", "Sábado gratuito", "Totalmente acessível", "Café no térreo"],
    avaliacoes: []
  },
  {
    id: "cafe-de-flore",
    destinoId: "paris",
    nome: "Café de Flore",
    tipo: "Bar",
    nota: 4.1,
    totalAvaliacoes: 5240,
    faixa: "€ 25 por pessoa",
    checagem: { em: "01/2026", estado: "ok" },
    plano: "base",
    resumo: "Café de 1887 em Saint-Germain, com mesa na calçada e preço de ponto turístico. Vale pelo lugar, não pelo chocolate quente.",
    endereco: "172 Bd Saint-Germain, 75006 Paris",
    horario: "Todos os dias, das 7h30 às 1h30",
    telefone: "+33 1 45 48 55 26",
    site: "cafedeflore.fr",
    fotos: ["assets/img/paris.jpg", "assets/img/casal-pretzel.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Mesa na calçada", "Aberto até 1h30", "Café histórico", "Opções vegetarianas"],
    avaliacoes: []
  },
  {
    id: "banff-gondola",
    destinoId: "banff",
    nome: "Banff Gondola",
    tipo: "Passeio",
    nota: 4.7,
    totalAvaliacoes: 3860,
    faixa: "CAD 75 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "verificado",
    resumo: "Teleférico de oito minutos até o alto do Sulphur Mountain, com passarela de madeira no cume e vista das seis cordilheiras.",
    endereco: "100 Mountain Ave, Banff, AB",
    horario: "Todos os dias, das 9h às 20h",
    telefone: "+1 866 756 1904",
    site: "banffjaspercollection.com",
    fotos: ["assets/img/banff.jpg", "assets/img/trilha-montanha.jpg", "assets/img/selfie-montanha.jpg"],
    comodidades: ["Teleférico de 8 min", "Passarela no cume", "Restaurante no alto", "Acessível para cadeira de rodas"],
    avaliacoes: []
  },
  {
    id: "bear-street-tavern",
    destinoId: "banff",
    nome: "Bear Street Tavern",
    tipo: "Restaurante",
    nota: 4.5,
    totalAvaliacoes: 2140,
    faixa: "CAD 40 por pessoa",
    checagem: { em: null, estado: "pendente" },
    plano: "base",
    resumo: "Pizza de forno a lenha e cerveja das Rockies no centro de Banff. Não aceita reserva e a espera passa de 1h no jantar de inverno.",
    endereco: "211 Bear St, Banff, AB",
    horario: "Todos os dias, das 11h30 às 22h",
    telefone: "+1 403 762 2021",
    site: "bearstreettavern.ca",
    fotos: ["assets/img/banff.jpg", "assets/img/casal-pretzel.jpg", "assets/img/band.jpg"],
    comodidades: ["Forno a lenha", "Cervejas locais", "Não aceita reserva", "Opções sem glúten"],
    avaliacoes: []
  },
  {
    id: "blue-ridge-tours",
    destinoId: "buenavista",
    nome: "Blue Ridge Day Tours",
    tipo: "Passeio",
    nota: 4.4,
    totalAvaliacoes: 318,
    faixa: "USD 95 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "base",
    resumo: "Dia inteiro de van pela Blue Ridge Parkway, com três mirantes, cachoeira curta e parada em feira de produtor.",
    endereco: "480 E 29th St, Buena Vista, VA",
    horario: "Saídas às 8h30, de quinta a domingo",
    telefone: "+1 540 261 7788",
    site: "blueridgedaytours.com",
    fotos: ["assets/img/buenavista.jpg", "assets/img/trilha-montanha.jpg", "assets/img/cachoeira-trilha.jpg"],
    comodidades: ["Dia inteiro", "Van com até 12 pessoas", "Entradas inclusas", "Trilhas leves"],
    avaliacoes: []
  },
  {
    id: "southern-kitchen-bv",
    destinoId: "buenavista",
    nome: "Southern Kitchen",
    tipo: "Restaurante",
    nota: 4.3,
    totalAvaliacoes: 640,
    faixa: "USD 28 por pessoa",
    checagem: { em: "12/2025", estado: "ok" },
    plano: "base",
    resumo: "Diner de estrada aberto desde 1955, com frango frito e torta de maçã. Fecha às 20h, e no domingo às 15h.",
    endereco: "1700 Magnolia Ave, Buena Vista, VA",
    horario: "Todos os dias, das 7h às 20h · domingo até as 15h",
    telefone: "+1 540 261 2200",
    site: "southernkitchenva.com",
    fotos: ["assets/img/buenavista.jpg", "assets/img/casal-pretzel.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Diner de 1955", "Café da manhã o dia todo", "Estacionamento na porta", "Opções vegetarianas"],
    avaliacoes: []
  },
  {
    id: "catamara-sol-maragogi",
    destinoId: "maragogi",
    nome: "Jangada do Pôr do Sol",
    tipo: "Passeio",
    nota: 4.5,
    totalAvaliacoes: 426,
    faixa: "R$ 120 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "base",
    resumo: "Saída de jangada às 16h30 com parada para banho e volta no escuro, com lanterna. Leva no máximo seis pessoas por embarcação.",
    endereco: "Praia de Maragogi, posto 2",
    horario: "Saída às 16h30, conforme o tempo",
    telefone: "(82) 99645-1180",
    site: "jangadadoporsol.com.br",
    fotos: ["assets/img/maragogi.jpg", "assets/img/bike-por-do-sol.jpg", "assets/img/hero.jpg"],
    comodidades: ["Até 6 pessoas", "Colete para todos", "Parada para banho", "Bebida inclusa"],
    avaliacoes: []
  },
  {
    id: "pizzaria-vila-blumenau",
    destinoId: "blumenau",
    nome: "Pizzaria da Vila",
    tipo: "Restaurante",
    nota: 4.2,
    totalAvaliacoes: 584,
    faixa: "R$ 80 por pessoa",
    checagem: { em: "04/2026", estado: "ok" },
    plano: "base",
    resumo: "Pizza de forno a lenha ao lado da Vila Germânica, aberta até tarde na Oktoberfest. Mesa grande para grupo, sem reserva.",
    endereco: "Rua Alberto Stein, 190 — Velha",
    horario: "Terça a domingo, das 18h às 23h30",
    telefone: "(47) 3322-1180",
    site: "pizzariadavila.com.br",
    fotos: ["assets/img/vila-germanica.jpg", "assets/img/casal-pretzel.jpg", "assets/img/blumenau.jpg"],
    comodidades: ["Forno a lenha", "Mesa para grupo", "Ao lado da Vila Germânica", "Opções vegetarianas"],
    avaliacoes: []
  },
  {
    id: "trilha-morro-urca",
    destinoId: "rio",
    nome: "Trilha do Morro da Urca",
    tipo: "Passeio",
    nota: 4.6,
    totalAvaliacoes: 1240,
    faixa: "R$ 70 por pessoa",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Subida de 40 minutos pela Pista Cláudio Coutinho com guia, e descida de bondinho incluída. Saídas às 6h30 para pegar o nascer do sol.",
    endereco: "Praia Vermelha, Av. Pasteur, 520 — Urca",
    horario: "Saídas às 6h30 e às 15h · exige reserva",
    telefone: "(21) 99812-3366",
    site: "trilhamorrodaurca.com.br",
    fotos: ["assets/img/rio.jpg", "assets/img/trilha-montanha.jpg", "assets/img/selfie-montanha.jpg"],
    comodidades: ["Guia incluso", "Descida de bondinho inclusa", "Grupo de até 12 pessoas", "Saída ao amanhecer"],
    avaliacoes: []
  },
  {
    id: "cafe-do-porto-foz",
    destinoId: "foz",
    nome: "Café do Porto",
    tipo: "Restaurante",
    nota: 4.4,
    totalAvaliacoes: 392,
    faixa: "R$ 65 por pessoa",
    checagem: { em: "03/2026", estado: "ok" },
    plano: "base",
    resumo: "Café da manhã reforçado perto do acesso ao parque, aberto às 7h — antes de todo mundo que vai para as cataratas.",
    endereco: "Av. das Cataratas, 2.090 — Vila Yolanda",
    horario: "Todos os dias, das 7h às 19h",
    telefone: "(45) 3523-1180",
    site: "cafedoportofoz.com.br",
    fotos: ["assets/img/foz.jpg", "assets/img/casal-pretzel.jpg", "assets/img/planejamento.jpg"],
    comodidades: ["Abre às 7h", "Marmita para o parque", "Opções veganas", "Estacionamento próprio"],
    avaliacoes: []
  },
  {
    id: "mirante-noronha-tour",
    destinoId: "noronha",
    nome: "Ilhatour Noronha",
    tipo: "Transporte local",
    nota: 4.5,
    totalAvaliacoes: 540,
    faixa: "R$ 280 o dia",
    checagem: { em: "02/2026", estado: "ok" },
    plano: "base",
    resumo: "Buggy com motorista para o roteiro de ilha inteira, de Sancho ao Sueste, com paradas combinadas por horário de maré.",
    endereco: "Alameda do Boldró, s/n — Vila do Boldró",
    horario: "Saídas às 8h · diária fechada",
    telefone: "(81) 99645-7788",
    site: "ilhatournoronha.com.br",
    fotos: ["assets/img/noronha.jpg", "assets/img/noronha-dois-irmaos.jpg", "assets/img/mapa-camera.jpg"],
    comodidades: ["Motorista local", "Roteiro pela maré", "Até 4 pessoas", "Diária fechada"],
    avaliacoes: []
  }
];

/* O selo sai da checagem, não do plano: um local no plano grátis pode
   estar verificado e um local pagante pode estar com a checagem vencida.
   Era aqui que o modelo antigo vendia confiança — agora o que o plano
   pago compra é alcance e ferramenta, nunca o selo. */
BL_ESTABELECIMENTOS.forEach(function (e) {
  const c = e.checagem || { em: null, estado: "pendente" };
  e.verificado = c.estado === "ok";
  e.selo = e.verificado ? "Verificado em " + c.em : null;
});

/* Cada destino recebe os seus locais a partir do catálogo acima:
   a ficha do destino continua lendo `d.locais`, sem duplicar conteúdo. */
BL_DESTINOS.forEach(function (d) {
  d.locais = BL_ESTABELECIMENTOS.filter(function (e) { return e.destinoId === d.id; });
});

/* Campanhas de anúncio — demonstram o "local em destaque" (B2B).
   A regra de integridade vive em BL_POLITICA_ANUNCIO e é impressa na
   tela junto do anúncio: posição comprada, sempre rotulada, fora do
   cálculo de match e no máximo um por página.

   Era um anúncio fixo de Blumenau, então em quase toda busca o slot
   ficava vazio e a regra não dava para demonstrar. Agora é uma tabela
   de campanhas — como o back-end vai precisar de qualquer forma — e
   `blAnuncioPara()` escolhe no máximo UMA, entre as que têm destino na
   lista de resultados. Todas apontam para locais no plano Destaque. */
const BL_ANUNCIOS = [
  { destinoId: "blumenau", estabelecimentoId: "bierland",
    parceiro: "Cervejaria Bierland", chamada: "Rota cervejeira guiada com degustação inclusa" },
  { destinoId: "gramado", estabelecimentoId: "fondue-do-vale",
    parceiro: "Fondue do Vale", chamada: "Rodízio de fondue com vista para o Lago Negro" },
  { destinoId: "campos-do-jordao", estabelecimentoId: "baden-baden-tap",
    parceiro: "Baden Baden Tap House", chamada: "Dezoito torneiras rotativas na Vila Capivari" },
  { destinoId: "porto-de-galinhas", estabelecimentoId: "jangada-piscinas",
    parceiro: "Jangadeiros de Porto", chamada: "Jangada para as piscinas naturais, pela tabela de maré" },
  { destinoId: "buzios", estabelecimentoId: "orla-bardot-bistro",
    parceiro: "Bistrô Orla Bardot", chamada: "Mesa na orla com peixe do dia até meia-noite" },
  { destinoId: "tiradentes", estabelecimentoId: "tragaluz",
    parceiro: "Restaurante Tragaluz", chamada: "Menu de cinco etapas com produto da região" }
];

/* Compatibilidade: o protótipo tinha um anúncio só, e `BL_PATROCINADO`
   ainda é lido por quem não passou para a tabela. */
const BL_PATROCINADO = BL_ANUNCIOS[0];

/* Escolhe a campanha a exibir para uma lista de resultados já filtrada.
   Devolve null quando nenhuma campanha tem destino na lista — anúncio
   fora de contexto é pior que slot vazio. */
function blAnuncioPara(lista) {
  if (!lista || !lista.length) return null;
  const ids = {};
  lista.forEach(function (d) { ids[d.id] = true; });
  const cabem = BL_ANUNCIOS.filter(function (a) {
    const local = blBuscarEstabelecimento(a.estabelecimentoId);
    return ids[a.destinoId] && local && local.plano === "destaque";
  });
  if (!cabem.length) return null;
  /* Rotação estável: a mesma busca mostra sempre a mesma campanha, mas
     buscas diferentes não repetem sempre o mesmo parceiro. */
  return cabem[lista.length % cabem.length];
}

/* Viagens coletivas (funcionalidade premium).
   A lista alimenta o índice em viagens.html; cada item abre em
   viagem.html?id=. `status` é o que o índice usa para separar
   votação aberta, destino definido e viagens encerradas, e
   `convite` marca a viagem em que você ainda não entrou. */
const BL_VIAGENS = [
  {
    id: "fim-de-ano",
    nome: "Fim de ano da turma",
    periodo: "27 de dezembro a 3 de janeiro",
    organizador: "Você",
    status: "votacao",
    convite: false,
    convidadosPendentes: 2,
    membros: [
      { nome: "Você", avatar: "assets/img/p1.jpg" },
      { nome: "Rafael", avatar: "assets/img/p2.jpg" },
      { nome: "Dani", avatar: "assets/img/p5.jpg" },
      { nome: "Camila", avatar: "assets/img/p6.jpg" },
      { nome: "Gregório", avatar: "assets/img/p3.jpg" }
    ],
    candidatos: [
      { destinoId: "maragogi", votos: 2 },
      { destinoId: "noronha", votos: 1 },
      { destinoId: "foz", votos: 0 }
    ],
    destinoEscolhido: null,
    checklist: [
      { texto: "Definir destino por votação", feito: false },
      { texto: "Fechar hospedagem para 5 pessoas", feito: false },
      { texto: "Dividir custos no rateio", feito: false },
      { texto: "Montar roteiro dos 7 dias", feito: false }
    ]
  },
  {
    id: "lua-de-mel",
    nome: "Lua de mel",
    periodo: "15 a 22 de março",
    organizador: "Você",
    status: "definida",
    convite: false,
    convidadosPendentes: 0,
    membros: [
      { nome: "Você", avatar: "assets/img/p1.jpg" },
      { nome: "Rafael", avatar: "assets/img/p2.jpg" }
    ],
    candidatos: [
      { destinoId: "paris", votos: 2 },
      { destinoId: "noronha", votos: 0 }
    ],
    destinoEscolhido: "paris",
    checklist: [
      { texto: "Fechar as passagens", feito: true },
      { texto: "Reservar o Hôtel Fabric", feito: true },
      { texto: "Tirar o seguro viagem", feito: false },
      { texto: "Montar roteiro por bairro", feito: false }
    ]
  },
  {
    id: "carnaval-das-amigas",
    nome: "Carnaval das amigas",
    periodo: "8 a 13 de fevereiro",
    organizador: "Dani",
    status: "votacao",
    convite: false,
    convidadosPendentes: 1,
    membros: [
      { nome: "Você", avatar: "assets/img/p1.jpg" },
      { nome: "Dani", avatar: "assets/img/p5.jpg" },
      { nome: "Camila", avatar: "assets/img/p6.jpg" },
      { nome: "Marina", avatar: "assets/img/p4.jpg" }
    ],
    candidatos: [
      { destinoId: "rio", votos: 2 },
      { destinoId: "saopaulo", votos: 1 },
      { destinoId: "maragogi", votos: 0 }
    ],
    destinoEscolhido: null,
    checklist: [
      { texto: "Votar até sexta", feito: false },
      { texto: "Conferir preço de passagem nas duas cidades", feito: false },
      { texto: "Decidir entre hotel e apartamento", feito: false }
    ]
  },
  {
    id: "formatura-design",
    nome: "Formatura da turma de design",
    periodo: "5 a 10 de julho",
    organizador: "Camila S.",
    status: "votacao",
    convite: true,
    convidadosPendentes: 3,
    membros: [
      { nome: "Camila", avatar: "assets/img/p6.jpg" },
      { nome: "Gregório", avatar: "assets/img/p3.jpg" },
      { nome: "Marina", avatar: "assets/img/p4.jpg" },
      { nome: "Rafael", avatar: "assets/img/p2.jpg" },
      { nome: "Paula", avatar: "assets/img/p5.jpg" },
      { nome: "Lucas", avatar: "assets/img/p2.jpg" }
    ],
    candidatos: [
      { destinoId: "bonito", votos: 2 },
      { destinoId: "foz", votos: 1 },
      { destinoId: "curitiba", votos: 1 }
    ],
    destinoEscolhido: null,
    checklist: [
      { texto: "Confirmar quem vai até o fim do mês", feito: false },
      { texto: "Cotar transporte para o grupo todo", feito: false },
      { texto: "Fechar o destino na votação", feito: false }
    ]
  },
  {
    id: "nordeste-familia",
    nome: "Nordeste em família",
    periodo: "12 a 20 de janeiro de 2024",
    organizador: "Você",
    status: "encerrada",
    convite: false,
    convidadosPendentes: 0,
    membros: [
      { nome: "Você", avatar: "assets/img/p1.jpg" },
      { nome: "Rafael", avatar: "assets/img/p2.jpg" },
      { nome: "Paula", avatar: "assets/img/p6.jpg" },
      { nome: "Gregório", avatar: "assets/img/p3.jpg" }
    ],
    candidatos: [
      { destinoId: "maragogi", votos: 3 },
      { destinoId: "noronha", votos: 1 }
    ],
    destinoEscolhido: "maragogi",
    checklist: [
      { texto: "Fechar o resort para 4 pessoas", feito: true },
      { texto: "Reservar o catamarã das galés", feito: true },
      { texto: "Dividir os custos no rateio", feito: true },
      { texto: "Publicar o álbum da viagem", feito: true }
    ]
  }
];

/* A viagem padrão quando a página abre sem id. */
const BL_VIAGEM = BL_VIAGENS[0];
/* Álbum pessoal + feed da comunidade (funcionalidade premium) */
const BL_ALBUM = {
  titulo: "Nordeste em família, 2024",
  periodo: "Janeiro de 2024 · 9 dias",
  destinos: ["Maragogi", "Fernando de Noronha"],
  fotos: [
    "assets/img/maragogi.jpg",
    "assets/img/noronha.jpg",
    "assets/img/p2.jpg",
    "assets/img/foz.jpg",
    "assets/img/p5.jpg",
    "assets/img/rio.jpg"
  ]
};

const BL_FEED = [
  {
    autor: "Camila S.",
    avatar: "assets/img/p5.jpg",
    premium: true,
    destino: "Fernando de Noronha, PE",
    foto: "assets/img/noronha.jpg",
    texto: "5 noites, duas trilhas por dia e nenhum arrependimento. Deixei o roteiro salvo no álbum para quem quiser copiar.",
    curtidas: 128,
    comentarios: 14
  },
  {
    autor: "Rafael T.",
    avatar: "assets/img/p2.jpg",
    premium: true,
    destino: "Blumenau, SC",
    foto: "assets/img/blumenau.jpg",
    texto: "Rota cervejeira a pé no sábado. As três cervejarias verificadas do app estavam bem no caminho.",
    curtidas: 76,
    comentarios: 9
  },
  {
    autor: "Marina L.",
    avatar: "assets/img/p4.jpg",
    premium: false,
    destino: "Foz do Iguaçu, PR",
    foto: "assets/img/foz.jpg",
    texto: "Dica: chegue no parque na abertura. Às 9h já estava cheio e a foto sem gente foi impossível.",
    curtidas: 54,
    comentarios: 6
  }
];

/* Métricas falsas para o painel do estabelecimento (B2B).
   `contatos` é a métrica que decide a renovação: audiência não paga
   conta, contato recebido paga. É também a base da cobrança por
   desempenho do plano Destaque. */
const BL_PARCEIRO_METRICAS = {
  visualizacoes: [42, 58, 51, 73, 96, 118, 140],
  semanas: ["S1", "S2", "S3", "S4", "S5", "S6", "S7"],
  cliques: 312,
  salvos: 87,
  conversas: 24,
  contatos: 41,
  contatosPorSemana: [2, 3, 4, 5, 7, 9, 11],
  custoPorContato: 6
};


/* =========================================================
   Modelo de negócio
   Três fontes de receita, nesta ordem de maturidade:
   1. afiliação (monetiza a base gratuita desde o primeiro usuário),
   2. B2B por desempenho e assinatura do local,
   3. assinatura do viajante.
   A assinatura vem por último de propósito: quem viaja uma ou duas
   vezes por ano não sustenta mensalidade cheia, então o preço dela
   está dimensionado para ser o terceiro andar, não o primeiro.
   ========================================================= */

/* --------- planos do viajante ---------
   O passe avulso existe porque a frequência real de uso é por viagem,
   não por mês: ele converte sem o medo de esquecer de cancelar. O anual
   é o que dá receita previsível, por isso é o recomendado. */
const BL_PLANOS_VIAJANTE = [
  {
    id: "gratuito",
    nome: "Gratuito",
    preco: 0,
    ciclo: "mês",
    dias: 0,
    recorrente: false,
    descricao: "Descobrir para onde ir, com todos os filtros e os locais verificados."
  },
  {
    id: "passe",
    nome: "Passe de Viagem",
    preco: 29.9,
    ciclo: "30 dias",
    dias: 30,
    recorrente: false,
    selo: "sem recorrência",
    descricao: "Tudo do premium por 30 dias, para a viagem que você está planejando agora."
  },
  {
    id: "mensal",
    nome: "Premium mensal",
    preco: 14.9,
    ciclo: "mês",
    dias: 30,
    recorrente: true,
    descricao: "Para quem está sempre com alguma viagem no radar."
  },
  {
    id: "anual",
    nome: "Premium anual",
    preco: 119,
    ciclo: "ano",
    dias: 365,
    recorrente: true,
    recomendado: true,
    equivalente: 9.92,
    economia: "33% mais barato que o mensal",
    descricao: "Duas viagens por ano já pagam o plano."
  }
];

/* --------- o que é grátis e o que é premium ---------
   Fonte única: a página de planos, a tabela de comparação e os textos
   de bloqueio saem todos daqui. `agoraGratis` marca o que saiu do
   premium na revisão do modelo — o paywall estava bloqueando justamente
   a prova de valor do produto, e isso virava o pior lugar possível
   para cobrar. */
const BL_FUNCIONALIDADES = [
  { id: "busca", plano: "gratuito", icone: "busca",
    titulo: "Busca por preferências",
    texto: "Quem vai, de onde você sai, quanto tempo de viagem aceita, clima e orçamento." },
  { id: "filtros", plano: "gratuito", icone: "filtros",
    titulo: "Todos os filtros dos resultados",
    texto: "Duração, mês, temperatura, o que fazer, como chegar e para quem serve." },
  { id: "preferencias", plano: "gratuito", icone: "lapis", agoraGratis: true,
    titulo: "Preferências avançadas de viagem",
    texto: "Salve orçamento, ritmo, acessibilidade e restrições. As buscas já saem do seu jeito.",
    link: "conta.html#preferencias" },
  { id: "verificados", plano: "gratuito", icone: "escudo", agoraGratis: true,
    titulo: "Destinos e locais verificados",
    texto: "Hospedagens, restaurantes e passeios conferidos pela curadoria, com a data da checagem.",
    link: "destino.html?id=noronha" },
  { id: "salvos", plano: "gratuito", icone: "coracao",
    titulo: "Destinos salvos",
    texto: "Sua lista de candidatos, para comparar com calma depois." },
  { id: "feed", plano: "gratuito", icone: "globo",
    titulo: "Ver o feed da comunidade",
    texto: "Leia os relatos e os álbuns publicados por quem já foi." },
  { id: "viagens", plano: "premium", icone: "pessoas",
    titulo: "Viagens coletivas",
    texto: "Convide até 10 pessoas, vote no destino, divida custos e acompanhe o checklist.",
    link: "viagens.html" },
  { id: "album", plano: "premium", icone: "camera",
    titulo: "Álbum de viagens compartilhável",
    texto: "Monte o álbum, compartilhe por link e publique no feed da comunidade.",
    link: "album.html" },
  { id: "avaliacoes", plano: "premium", icone: "estrela",
    titulo: "Avaliações de assinantes",
    texto: "Opiniões de quem realmente foi, sem avaliação anônima e sem review pago.",
    link: "destino.html?id=noronha" },
  { id: "alertas", plano: "premium", icone: "alta", novo: true,
    titulo: "Alertas de preço do destino",
    texto: "Avisamos quando a estimativa de um destino salvo cai, para você comprar na hora certa." },
  { id: "suporte", plano: "premium", icone: "balao",
    titulo: "Suporte prioritário",
    texto: "Dúvidas sobre roteiro ou reserva respondidas em até 24 horas por gente de verdade.",
    link: "ajuda.html#contato" }
];

function blFuncionalidades(plano) {
  return BL_FUNCIONALIDADES.filter(function (f) { return f.plano === plano; });
}

/* --------- afiliação ---------
   É a receita que monetiza quem nunca vai assinar, no momento de maior
   intenção do produto: a pessoa acabou de escolher o destino e ainda não
   tem passagem nem hospedagem. Com gasto médio de R$ 1.843 por viagem
   (PNAD Turismo/IBGE 2024), cada reserva rende algo entre R$ 50 e R$ 90. */
const BL_AFILIADOS = [
  { id: "passagem", icone: "aviao", rotulo: "Passagens e ônibus",
    parceiro: "Comparador de passagens",
    chamada: "Comparar voos e ônibus para este destino",
    comissao: "3% a 5% do bilhete" },
  { id: "hospedagem", icone: "marcador", rotulo: "Hospedagem",
    parceiro: "Reservas de hospedagem",
    chamada: "Ver pousadas e hotéis com preço do período",
    comissao: "4% a 6% da diária" },
  { id: "experiencia", icone: "bussola", rotulo: "Passeios e ingressos",
    parceiro: "Marketplace de experiências",
    chamada: "Reservar passeios e ingressos sem fila",
    comissao: "8% do passeio" }
];

/* Os dois avisos que sustentam a promessa de imparcialidade do produto.
   Ficam em constante porque precisam aparecer com o mesmo texto em
   todo lugar onde existe dinheiro envolvido. */
const BL_AVISO_AFILIADO =
  "Link de parceiro: se você reservar por aqui, o Boralá! recebe comissão. " +
  "O preço para você é o mesmo e a ordem dos destinos não muda por causa disso.";

const BL_POLITICA_ANUNCIO =
  "Anúncio é posição comprada e vem sempre rotulado: fica fora do cálculo de match, " +
  "não altera a ordem dos resultados e aparece no máximo uma vez por página. " +
  "Nota, avaliações e selo de verificação não estão à venda em nenhum plano.";

/* --------- planos do estabelecimento ---------
   Os ids seguem base/verificado/destaque porque estão gravados no
   localStorage de quem já usou o protótipo; só os nomes e os preços
   mudaram. O selo saiu do pacote pago: virou checagem gratuita.

   Taxa fixa só se vende onde já existe audiência — antes disso ninguém
   paga mensalidade por público que não existe. Por isso o Destaque
   também pode ser cobrado por contato recebido (BL_PRECO_CONTATO). */
const BL_PLANOS_PARCEIRO = [
  {
    id: "base",
    nome: "Presença",
    preco: 0,
    descricao: "Sua ficha no destino, com contato, fotos e o selo de checagem quando passar pela curadoria.",
    itens: ["Ficha no destino", "Até 3 fotos", "Avaliações públicas", "Selo de verificação (grátis, após a checagem)"],
    fora: ["Relatório de audiência", "Resposta a avaliações", "Posição de destaque"]
  },
  {
    id: "verificado",
    nome: "Pro",
    preco: 89,
    precoAnual: 890,
    descricao: "As ferramentas para administrar o local: fotos sem limite, relatório e resposta a avaliações.",
    itens: ["Tudo do plano Presença", "Fotos e cardápio sem limite", "Relatório mensal de audiência", "Resposta pública às avaliações", "Agenda de checagem prioritária"],
    fora: ["Posição de destaque nos resultados"],
    recomendado: true
  },
  {
    id: "destaque",
    nome: "Destaque",
    preco: 399,
    precoAnual: 3990,
    porContato: true,
    descricao: "Alcance pago, em slot rotulado como anúncio. Disponível por mensalidade ou por contato recebido.",
    itens: ["Tudo do plano Pro", "Slot de anúncio rotulado nos resultados", "Campanha por clima de viagem", "Relatório semanal"],
    fora: []
  }
];

/* Alternativa ao Destaque para cidade onde o Boralá! ainda não tem
   audiência: o local paga por contato (clique no telefone, no WhatsApp
   ou no site), com teto mensal, em vez de mensalidade no escuro. */
const BL_PRECO_CONTATO = { min: 4, max: 8, padrao: 6, tetoPadrao: 400 };

/* --------- helpers de domínio --------- */

function blBuscarDestino(id) {
  return BL_DESTINOS.find(function (d) { return d.id === id; }) || null;
}

function blBuscarEstabelecimento(id) {
  return BL_ESTABELECIMENTOS.find(function (e) { return e.id === id; }) || null;
}

function blEstabelecimentosDoDestino(destinoId) {
  return BL_ESTABELECIMENTOS.filter(function (e) { return e.destinoId === destinoId; });
}

function blBuscarViagem(id, extras) {
  const todas = BL_VIAGENS.concat(extras || []);
  return todas.find(function (v) { return v.id === id; }) || null;
}

function blVotosDaViagem(viagem) {
  return viagem.candidatos.reduce(function (s, c) { return s + c.votos; }, 0);
}

/* Destino que representa a viagem: o escolhido, se já houver, ou o
   mais votado até agora. É o que dá capa, preço e rateio à viagem. */
function blLiderDaViagem(viagem) {
  if (viagem.destinoEscolhido) return blBuscarDestino(viagem.destinoEscolhido);
  const ordenados = viagem.candidatos.slice().sort(function (a, b) { return b.votos - a.votos; });
  return ordenados.length ? blBuscarDestino(ordenados[0].destinoId) : null;
}

/* Quanto tempo de viagem separa a pessoa do destino, saindo da cidade
   que ela escolheu. `modo: "aqui"` é o destino da própria cidade. */
function blPartida(destino, origem) {
  if (!destino || !origem) return null;
  return (destino.partidas || {})[origem] || null;
}

/* Texto curto de "como chegar", já com a origem escolhida. */
function blRotuloPartida(destino, origem) {
  const p = blPartida(destino, origem);
  if (!p) return null;
  if (p.modo === "aqui") return "Você já está aqui";
  return p.horas + "h " + (p.modo === "estrada" ? "de estrada" : "de viagem, com voo");
}

/* Calcula o "match" de um destino para uma busca — é o motor de
   recomendação do produto, simplificado para o protótipo. */
function blCalcularMatch(destino, busca) {
  busca = busca || {};
  let score = destino.base;
  if (busca.clima && destino.climas.indexOf(busca.clima) !== -1) score += 8;
  if (busca.onde && destino.regiao === busca.onde) score += 4;
  if (busca.pessoas === "1" && destino.tipos.indexOf("cidade") !== -1) score += 2;
  if (busca.pessoas === "4" && destino.tipos.indexOf("praia") !== -1) score += 2;
  if (destino.verificado) score += 1;

  /* Perto de casa vale ponto: é o recorte do produto. Viagem que dá para
     fazer de ônibus ou de carro num fim de semana sobe na lista, e o que
     passa de dez horas desce — sem origem escolhida, nada disso pesa. */
  const partida = blPartida(destino, busca.origem);
  if (partida && partida.modo !== "aqui") {
    if (partida.horas <= 3) score += 6;
    else if (partida.horas <= 6) score += 4;
    else if (partida.horas <= 10) score += 1;
    else score -= 3;
    if (partida.modo === "estrada" && partida.horas <= 6) score += 2;
  }
  return Math.max(40, Math.min(99, score));
}

/* --------- motor de filtros da busca --------- */

/* Cada grupo de filtro é um teste isolado com o seu modo de combinação:
   "ou" para alternativas (serve praia OU serra) e "e" para exigências
   (precisa ter trilha E gastronomia). A tabela faz dois trabalhos: filtrar
   a lista e contar quantos destinos cada opção ainda devolveria — o número
   que aparece ao lado de cada caixa de seleção. */
const BL_GRUPOS_FILTRO = {
  tipos: {
    modo: "ou", rotulo: "Tipo de destino", opcoes: BL_TIPOS,
    testar: function (d, v) { return (d.tipos || []).indexOf(v) !== -1; }
  },
  duracoes: {
    modo: "ou", rotulo: "Duração da viagem", opcoes: BL_DURACOES,
    testar: function (d, v) {
      const f = BL_DURACOES.find(function (x) { return x.v === v; });
      return !!f && d.noites >= f.min && d.noites <= f.max;
    }
  },
  meses: {
    modo: "ou", rotulo: "Quando viajar", opcoes: BL_MESES,
    testar: function (d, v) { return (d.meses || []).indexOf(Number(v)) !== -1; }
  },
  temperaturas: {
    modo: "ou", rotulo: "Temperatura no destino", opcoes: BL_TEMPERATURAS,
    testar: function (d, v) { return d.temperatura === v; }
  },
  experiencias: {
    modo: "e", rotulo: "O que fazer lá", opcoes: BL_EXPERIENCIAS,
    testar: function (d, v) { return (d.experiencias || []).indexOf(v) !== -1; }
  },
  acessos: {
    modo: "e", rotulo: "Como chegar", opcoes: BL_ACESSOS,
    testar: function (d, v) {
      const a = d.acesso || {};
      if (v === "direto") return !!a.direto;
      if (v === "carro") return !!a.carro;
      if (v === "curto") return typeof a.horas === "number" && a.horas <= 3;
      return true;
    }
  },
  perfis: {
    modo: "e", rotulo: "Bom para", opcoes: BL_PERFIS,
    testar: function (d, v) { return (d.perfis || []).indexOf(v) !== -1; }
  }
};

/* Tira acento e caixa para a busca por texto não depender de digitação exata. */
function blNormalizar(texto) {
  return String(texto == null ? "" : texto)
    .normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/* O que a busca por texto varre: nome, estado, país, tags e experiências. */
function blTextoDoDestino(d) {
  const experiencias = (d.experiencias || []).map(function (v) {
    const o = BL_EXPERIENCIAS.find(function (x) { return x.v === v; });
    return o ? o.label : v;
  });
  return blNormalizar([d.nome, d.uf, d.sigla, d.pais]
    .concat(d.tags || [], experiencias).join(" "));
}

/* Filtros que não são grupos de várias opções: preço, nota, texto e curadoria.
   `ignorar` deixa um deles de fora — é o que permite contar facetas. */
function blPassaFiltrosSimples(d, busca, filtros, ignorar) {
  if (busca.onde && d.regiao !== busca.onde) return false;

  /* Origem e tempo máximo vêm da busca, não dos filtros da lateral:
     são a pergunta do produto, não um refinamento. O destino da própria
     cidade sai da lista, e o que passa do tempo aceito também. */
  if (busca.origem) {
    const partida = blPartida(d, busca.origem);
    if (partida && partida.modo === "aqui") return false;
    const limite = BL_TEMPOS.find(function (t) { return t.v === String(busca.tempo); });
    if (limite && limite.max !== Infinity && (!partida || partida.horas > limite.max)) return false;
  }

  if (ignorar !== "preco") {
    if (typeof filtros.precoMin === "number" && d.preco < filtros.precoMin) return false;
    if (typeof filtros.precoMax === "number" && d.preco > filtros.precoMax) return false;
    if (filtros.orcamento) {
      const faixa = BL_ORCAMENTOS.find(function (o) { return o.v === filtros.orcamento; });
      if (faixa) {
        const min = faixa.v === "medio" ? 1000 : faixa.v === "alto" ? 3000 : 0;
        if (d.preco < min || d.preco > faixa.max) return false;
      }
    }
  }
  if (ignorar !== "notaMin" && filtros.notaMin && (d.nota || 0) < Number(filtros.notaMin)) return false;
  if (ignorar !== "verificados" && filtros.apenasVerificados && !d.verificado) return false;
  if (ignorar !== "texto" && filtros.texto) {
    const alvo = blNormalizar(filtros.texto);
    if (alvo && blTextoDoDestino(d).indexOf(alvo) === -1) return false;
  }
  return true;
}

function blPassaGrupos(d, filtros, ignorar) {
  return Object.keys(BL_GRUPOS_FILTRO).every(function (g) {
    if (g === ignorar) return true;
    const sel = filtros[g];
    if (!sel || !sel.length) return true;
    const regra = BL_GRUPOS_FILTRO[g];
    return regra.modo === "e"
      ? sel.every(function (v) { return regra.testar(d, v); })
      : sel.some(function (v) { return regra.testar(d, v); });
  });
}

/* `busca` pode vir parcial ou vazia (a home usa só `pessoas`) e `filtros`
   pode não existir — cada campo só é testado quando foi informado. */
function blFiltrarDestinos(busca, filtros) {
  busca = busca || {};
  filtros = filtros || {};
  const lista = BL_DESTINOS
    .filter(function (d) {
      return blPassaFiltrosSimples(d, busca, filtros) && blPassaGrupos(d, filtros);
    })
    .map(function (d) {
      const copia = Object.assign({}, d);
      copia.match = blCalcularMatch(d, busca);
      return copia;
    });

  const ordem = filtros.ordem || "match";
  lista.sort(function (a, b) {
    if (ordem === "preco") return a.preco - b.preco;
    if (ordem === "preco-desc") return b.preco - a.preco;
    if (ordem === "nota") return (b.nota || 0) - (a.nota || 0);
    if (ordem === "duracao") return a.noites - b.noites;
    return b.match - a.match;
  });
  return lista;
}

/* Quantos destinos cada opção ainda devolveria, como nos sites de reserva:
   o número ao lado da caixa já considera os outros filtros aplicados, mas
   não o próprio grupo — senão marcar uma opção zeraria todas as vizinhas. */
function blContagemFiltros(busca, filtros) {
  busca = busca || {};
  filtros = filtros || {};
  const contagem = {};

  Object.keys(BL_GRUPOS_FILTRO).forEach(function (g) {
    const regra = BL_GRUPOS_FILTRO[g];
    const base = BL_DESTINOS.filter(function (d) {
      return blPassaFiltrosSimples(d, busca, filtros) && blPassaGrupos(d, filtros, g);
    });
    contagem[g] = {};
    regra.opcoes.forEach(function (o) {
      contagem[g][o.v] = base.filter(function (d) { return regra.testar(d, o.v); }).length;
    });
  });

  const semNota = BL_DESTINOS.filter(function (d) {
    return blPassaFiltrosSimples(d, busca, filtros, "notaMin") && blPassaGrupos(d, filtros);
  });
  contagem.notaMin = {};
  BL_NOTAS.forEach(function (o) {
    contagem.notaMin[o.v] = semNota.filter(function (d) { return (d.nota || 0) >= o.min; }).length;
  });

  contagem.verificados = BL_DESTINOS.filter(function (d) {
    return d.verificado &&
      blPassaFiltrosSimples(d, busca, filtros, "verificados") &&
      blPassaGrupos(d, filtros);
  }).length;

  return contagem;
}

/* Menor e maior preço que a busca do topo permite — são os limites do
   controle de orçamento, que mudam ao trocar Brasil por exterior. */
function blFaixaDePreco(busca) {
  const precos = BL_DESTINOS
    .filter(function (d) { return !busca || !busca.onde || d.regiao === busca.onde; })
    .map(function (d) { return d.preco; });
  if (!precos.length) return { min: 0, max: 0 };
  return { min: Math.min.apply(null, precos), max: Math.max.apply(null, precos) };
}

/* Rótulo legível de um valor de filtro, para as pílulas de filtro aplicado. */
function blRotuloFiltro(grupo, valor) {
  if (grupo === "notaMin") {
    const n = BL_NOTAS.find(function (o) { return o.v === String(valor); });
    return "Nota " + (n ? n.label : valor);
  }
  const regra = BL_GRUPOS_FILTRO[grupo];
  if (!regra) return String(valor);
  const o = regra.opcoes.find(function (x) { return x.v === String(valor); });
  if (!o) return String(valor);
  return grupo === "meses" ? o.nome.charAt(0).toUpperCase() + o.nome.slice(1) : o.label;
}
