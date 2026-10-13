/* =========================================================
   Boralá! — núcleo do protótipo
   Só front-end: o "estado da conta" mora no localStorage do
   navegador, então dá para demonstrar login, assinatura e
   funcionalidades premium sem back-end nenhum.
   ========================================================= */

const BL = (function () {
  const STORAGE_KEY = "borala:estado";

  /* Função e não objeto literal: devolvendo um estado novo a cada chamada,
     os arrays não ficam compartilhados entre o padrão e o estado em uso. */
  function estadoNovo() {
    return {
      usuario: null,        // { nome, email, avatar }
      premium: false,       // espelho de `assinatura`, para estado antigo
      assinatura: null,     // { plano, inicio, ate, renova }
      salvos: [],           // ids de destinos salvos
      preferencias: null,   // preferências avançadas (premium)
      locais: [],           // estabelecimentos do próprio viajante
      localAtivo: null,     // id do local aberto no painel
      modo: "viajante",     // "viajante" | "estabelecimento"
      curtidas: [],         // posts curtidos no feed
      viagens: []           // viagens coletivas criadas pela pessoa
    };
  }

  function emDias(dias) {
    return new Date(Date.now() + dias * 86400000).toISOString();
  }

  /* O estabelecimento era um só (`parceiro` + `planoParceiro`). Agora o mesmo
     viajante pode ter vários locais — como um anfitrião do Airbnb — então esta
     função sobe o formato antigo que já esteja gravado no navegador. */
  function migrar(e) {
    if (!Array.isArray(e.locais)) e.locais = [];
    if (!Array.isArray(e.viagens)) e.viagens = [];
    /* `premium` era booleano e não vencia nunca, então o passe de 30 dias
       não tinha como ser demonstrado. Quem já tinha premium gravado no
       navegador entra como assinante mensal, com validade a partir de agora. */
    if (e.premium && !e.assinatura) {
      e.assinatura = { plano: "mensal", inicio: new Date().toISOString(), ate: emDias(30), renova: true };
    }
    if (e.assinatura && !e.assinatura.plano) e.assinatura.plano = "mensal";
    if (e.parceiro && !e.locais.length) {
      e.locais = [Object.assign(
        { id: "local-1", plano: e.planoParceiro || "base", status: "curadoria" },
        e.parceiro
      )];
    }
    /* Local gravado antes de a checagem existir entra como pendente: sob o
       modelo novo, ter plano pago não é prova de ter passado pela curadoria. */
    e.locais.forEach(function (l) {
      if (!l.checagem) l.checagem = { em: null, estado: "pendente" };
    });
    /* A conta de demonstração já usou nome, e-mail e foto de uma pessoa
       real. Isto é peça pública de portfólio, então quem tiver o estado
       antigo gravado no navegador recebe o placeholder na próxima visita
       — senão o dado real sobrevive no localStorage de quem já abriu o
       protótipo. O teste é pelo avatar porque entrar() sempre grava o
       placeholder: só estado anterior a esta mudança cai aqui, e assim
       nenhum nome real precisa ficar escrito neste arquivo. */
    if (e.usuario && e.usuario.avatar !== "assets/img/avatar-placeholder.svg") {
      e.usuario = {
        nome: "John Doe",
        email: "john.doe@example.com",
        avatar: "assets/img/avatar-placeholder.svg"
      };
    }

    delete e.parceiro;
    delete e.planoParceiro;
    if (!e.locais.length) { e.localAtivo = null; e.modo = "viajante"; }
    else if (!e.locais.some(function (l) { return l.id === e.localAtivo; })) e.localAtivo = e.locais[0].id;
    if (!e.usuario) e.modo = "viajante";
    return e;
  }

  function ler() {
    try {
      const bruto = localStorage.getItem(STORAGE_KEY);
      return migrar(Object.assign(estadoNovo(), bruto ? JSON.parse(bruto) : null));
    } catch (e) {
      return estadoNovo();
    }
  }

  function gravar(novo) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(novo)); } catch (e) { /* modo privado */ }
    return novo;
  }

  let estado = ler();

  /* ---------------- ícones ---------------- */
  const ICONES = {
    busca: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    seta: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    voltar: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    baixo: '<polyline points="6 9 12 15 18 9"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    "check-circulo": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    cadeado: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    pino: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    filtros: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
    coracao: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    estrela: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>',
    pessoas: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    mais: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    fechar: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    medalha: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    escudo: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    alta: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    loja: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    olho: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    copiar: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    lapis: '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>',
    compartilhar: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    cartao: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    balao: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    sair: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    usuario: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    telefone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    globo: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    bussola: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    marcador: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    aviao: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.4-.2c.4-.2.7-.6.6-1.2z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>'
  };

  function icone(nome, classe) {
    const corpo = ICONES[nome] || "";
    return '<svg class="icon ' + (classe || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + corpo + "</svg>";
  }

  /* Troca <span data-icone="busca"></span> pelo SVG correspondente.
     Pontual de propósito: reescrever o body inteiro apagaria os
     listeners já registrados no header. */
  function hidratarIcones(raiz) {
    $$("[data-icone]", raiz || document).forEach(function (n) {
      n.outerHTML = icone(n.getAttribute("data-icone"), n.getAttribute("data-icone-classe") || "");
    });
  }

  /* ---------------- helpers ---------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* `centavos` liga as duas casas: preço de plano (R$ 14,90) precisa delas,
     estimativa de viagem (R$ 2.400) fica melhor sem. */
  function dinheiro(valor, centavos) {
    const casas = centavos ? 2 : 0;
    return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }

  /* Preço de plano nunca mais escrito à mão no HTML: era isso que mantinha
     R$ 49,90 vivo em dez arquivos depois de a tabela mudar. Basta
     `<span data-preco="mensal"></span>` ou `data-preco-campo="equivalente"`. */
  function preencherPrecos(raiz) {
    if (typeof BL_PLANOS_VIAJANTE === "undefined") return;
    $$("[data-preco]", raiz || document).forEach(function (no) {
      const plano = BL_PLANOS_VIAJANTE.filter(function (p) {
        return p.id === no.getAttribute("data-preco");
      })[0];
      if (!plano) return;
      const valor = plano[no.getAttribute("data-preco-campo") || "preco"];
      if (typeof valor !== "number") return;
      no.textContent = dinheiro(valor, valor % 1 !== 0);
    });
  }

  function params() {
    const out = {};
    new URLSearchParams(location.search).forEach(function (v, k) { out[k] = v; });
    return out;
  }

  /* A nota sempre vem acompanhada do número ao lado nas telas:
     estrela sozinha não serve para quem usa leitor de tela. */
  function estrelas(nota) {
    let html = '<span class="stars" aria-label="' + nota + ' de 5 estrelas">';
    for (let i = 1; i <= 5; i++) {
      const cheia = i <= Math.round(nota);
      html += icone("estrela", "").replace("<svg ", "<svg " + (cheia ? "" : "data-off "));
    }
    return html + "</span>";
  }

  function toast(mensagem, tipo) {
    let wrap = $(".toast-wrap");
    if (!wrap) {
      wrap = el('<div class="toast-wrap"></div>');
      document.body.appendChild(wrap);
    }
    const t = el('<div class="toast ' + (tipo === "sucesso" ? "toast--success" : "") + '">' +
      (tipo === "sucesso" ? icone("check-circulo") : "") + "<span>" + mensagem + "</span></div>");
    wrap.appendChild(t);
    setTimeout(function () {
      t.style.transition = "opacity .3s ease";
      t.style.opacity = "0";
      setTimeout(function () { t.remove(); }, 300);
    }, 2600);
  }

  /* ---------------- conta ---------------- */
  function logado() { return !!estado.usuario; }

  /* O acesso premium agora tem data de fim. São três formas de ter:
     o passe avulso de 30 dias, o mensal e o anual — e o passe só serve
     de demonstração se realmente expirar. */
  function assinatura() { return estado.assinatura || null; }

  function premium() {
    const a = assinatura();
    if (!a) return false;
    return !a.ate || new Date(a.ate).getTime() > Date.now();
  }

  function planoDoViajante() {
    const a = assinatura();
    if (!a || typeof BL_PLANOS_VIAJANTE === "undefined") return null;
    return BL_PLANOS_VIAJANTE.filter(function (p) { return p.id === a.plano; })[0] || null;
  }

  function diasRestantes() {
    const a = assinatura();
    if (!a || !a.ate) return null;
    return Math.max(0, Math.ceil((new Date(a.ate).getTime() - Date.now()) / 86400000));
  }

  /* O plano mais barato por mês — é o número que a página de bloqueio e os
     convites usam, para nunca mais existir preço escrito à mão na tela. */
  function precoDeEntrada() {
    if (typeof BL_PLANOS_VIAJANTE === "undefined") return null;
    const anual = BL_PLANOS_VIAJANTE.filter(function (p) { return p.id === "anual"; })[0];
    return anual ? anual.equivalente : null;
  }

  function entrar(nome, email) {
    estado.usuario = {
      nome: nome || "John Doe",
      email: email || "john.doe@example.com",
      avatar: "assets/img/avatar-placeholder.svg"
    };
    gravar(estado);
    atualizarChrome();
    return estado.usuario;
  }

  function atualizarUsuario(dados) {
    if (!estado.usuario) return null;
    estado.usuario = Object.assign({}, estado.usuario, dados);
    gravar(estado);
    atualizarChrome();
    return estado.usuario;
  }

  function sair() {
    estado.usuario = null;
    estado.premium = false;
    estado.modo = "viajante";
    gravar(estado);
    atualizarChrome();
  }

  /* Sem argumento assina o plano recomendado — é o que o botão genérico faz. */
  function assinar(planoId) {
    if (!estado.usuario) entrar();
    const planos = typeof BL_PLANOS_VIAJANTE === "undefined" ? [] : BL_PLANOS_VIAJANTE;
    const plano = planos.filter(function (p) { return p.id === planoId; })[0] ||
      planos.filter(function (p) { return p.recomendado; })[0] ||
      { id: "anual", dias: 365, recorrente: true };
    estado.assinatura = {
      plano: plano.id,
      inicio: new Date().toISOString(),
      ate: emDias(plano.dias || 30),
      renova: !!plano.recorrente
    };
    estado.premium = true;
    gravar(estado);
    atualizarChrome();
    return estado.assinatura;
  }

  /* Cancelar derruba a renovação; o passe não renova por definição. */
  function cancelarAssinatura() {
    estado.assinatura = null;
    estado.premium = false;
    gravar(estado);
    atualizarChrome();
  }

  function alternarSalvo(id) {
    const i = estado.salvos.indexOf(id);
    if (i === -1) estado.salvos.push(id); else estado.salvos.splice(i, 1);
    gravar(estado);
    return estado.salvos.indexOf(id) !== -1;
  }

  function salvo(id) { return estado.salvos.indexOf(id) !== -1; }

  function salvarPreferencias(prefs) {
    estado.preferencias = prefs;
    gravar(estado);
  }

  /* ---------------- locais do viajante ---------------- */
  /* Como no Airbnb, quem usa a plataforma para viajar é a mesma pessoa que
     pode anunciar um local. Por isso os estabelecimentos moram dentro da
     conta do viajante, e não numa "conta de parceiro" separada. */
  function locais() { return estado.locais; }
  function temLocais() { return estado.locais.length > 0; }

  function adicionarLocal(dados) {
    const local = Object.assign({
      id: "local-" + Date.now().toString(36),
      plano: "base",
      status: "curadoria",        // curadoria | ativo | pausado
      /* A checagem é de graça e independe do plano: é ela, e não o
         pagamento, que decide o selo de verificado. */
      checagem: { em: null, estado: "pendente" },
      criadoEm: new Date().toISOString()
    }, dados);
    estado.locais.push(local);
    estado.localAtivo = local.id;
    gravar(estado);
    return local;
  }

  function buscarLocal(id) {
    return estado.locais.filter(function (l) { return l.id === id; })[0] || null;
  }

  function localAtivo() {
    return buscarLocal(estado.localAtivo) || estado.locais[0] || null;
  }

  function definirLocalAtivo(id) {
    if (buscarLocal(id)) { estado.localAtivo = id; gravar(estado); }
    return localAtivo();
  }

  function atualizarLocal(id, dados) {
    const l = buscarLocal(id);
    if (!l) return null;
    Object.assign(l, dados);
    gravar(estado);
    return l;
  }

  function removerLocal(id) {
    estado.locais = estado.locais.filter(function (l) { return l.id !== id; });
    if (estado.localAtivo === id) estado.localAtivo = estado.locais.length ? estado.locais[0].id : null;
    if (!estado.locais.length) estado.modo = "viajante";
    gravar(estado);
    atualizarChrome();
  }

  /* ---------------- modo viajante ⇄ estabelecimento ---------------- */
  /* O modo só muda o que a pessoa vê: é a mesma conta nos dois lados.
     Sem nenhum local cadastrado, o modo estabelecimento não existe. */
  function modo() {
    return estado.modo === "estabelecimento" && temLocais() ? "estabelecimento" : "viajante";
  }

  function definirModo(novo) {
    estado.modo = novo === "estabelecimento" && temLocais() ? "estabelecimento" : "viajante";
    gravar(estado);
    atualizarChrome();
    return estado.modo;
  }

  function inicioDoModo() {
    return modo() === "estabelecimento" ? "parceiros-painel.html" : "index.html";
  }

  function alternarCurtida(id) {
    const i = estado.curtidas.indexOf(id);
    if (i === -1) estado.curtidas.push(id); else estado.curtidas.splice(i, 1);
    gravar(estado);
    return estado.curtidas.indexOf(id) !== -1;
  }

  function curtido(id) { return estado.curtidas.indexOf(id) !== -1; }

  /* ---------------- viagens coletivas ---------------- */
  /* As viagens de exemplo vivem em BL_VIAGENS (data.js); aqui ficam só
     as que a pessoa cria no protótipo, para sobreviverem à navegação. */
  function viagens() { return estado.viagens; }

  function criarViagem(dados) {
    const viagem = Object.assign({
      id: "viagem-" + Date.now().toString(36),
      nome: "Nova viagem",
      periodo: "data a combinar",
      organizador: "Você",
      status: "votacao",
      convite: false,
      convidadosPendentes: 0,
      membros: [{ nome: "Você", avatar: (estado.usuario && estado.usuario.avatar) || "assets/img/avatar-placeholder.svg" }],
      candidatos: [],
      destinoEscolhido: null,
      checklist: [
        { texto: "Convidar a turma", feito: false },
        { texto: "Sugerir destinos para a votação", feito: false },
        { texto: "Fechar o destino com o grupo", feito: false }
      ]
    }, dados);
    estado.viagens.push(viagem);
    gravar(estado);
    return viagem;
  }

  /* Só mexe no que é da pessoa: viagem de exemplo muda apenas na tela. */
  function atualizarViagem(id, dados) {
    const v = estado.viagens.filter(function (x) { return x.id === id; })[0];
    if (!v) return null;
    Object.assign(v, dados);
    gravar(estado);
    return v;
  }

  function resetar() {
    estado = estadoNovo();
    gravar(estado);
  }

  /* ---------------- header / footer ---------------- */
  /* Três menus, nunca misturados: quem não entrou vê as páginas de
     divulgação (como funciona, preços, para empresas); quem entrou vê as
     páginas de dentro; e quem trocou para o modo estabelecimento vê o painel.
     Vender o produto para quem já comprou só ocupa espaço. */
  const NAV_VISITANTE = [
    { href: "index.html#buscar", label: "Descobrir destino", chave: "buscar" },
    { href: "index.html#como-funciona", label: "Como funciona", chave: "como" },
    { href: "resultados.html", label: "Destinos", chave: "destinos" },
    { href: "premium.html", label: "Preços", chave: "premium" },
    { href: "parceiros.html", label: "Para empresas", chave: "parceiros" }
  ];

  const NAV_VIAJANTE = [
    { href: "index.html", label: "Início", chave: "buscar" },
    { href: "resultados.html", label: "Explorar", chave: "destinos" },
    { href: "conta.html#salvos", label: "Salvos", chave: "salvos" },
    { href: "viagens.html", label: "Viagens", chave: "viagens" },
    { href: "album.html", label: "Comunidade", chave: "comunidade" }
  ];

  const NAV_ESTABELECIMENTO = [
    { href: "parceiros-painel.html", label: "Visão geral", chave: "painel" },
    { href: "parceiros-painel.html#meus-locais", label: "Meus locais", chave: "locais" },
    { href: "parceiros-painel.html#audiencia", label: "Audiência", chave: "audiencia" },
    { href: "parceiros-painel.html#plano", label: "Plano e cobrança", chave: "plano" }
  ];

  function navAtual() {
    if (!logado()) return NAV_VISITANTE;
    return modo() === "estabelecimento" ? NAV_ESTABELECIMENTO : NAV_VIAJANTE;
  }

  /* Marca denominativa: o nome inteiro em Fraunces, em caixa baixa, com
     um ponto laranja entre "bora" e "lá!" — pausa da fala e pino de mapa
     ao mesmo tempo. Tudo é texto de verdade, inclusive a exclamação:
     selecionável, lida por leitor de tela e achável no Ctrl+F. */
  function marcaHTML(classe, href) {
    return '<a class="logo ' + (classe || "") + '" href="' + (href || "index.html") + '" aria-label="Boralá!, página inicial">' +
      '<span class="logo__nome">bora<i class="logo__ponto" aria-hidden="true"></i>lá!</span></a>';
  }

  /* O botão de troca de papel fica sempre visível no header, como o
     "Switch to hosting" do Airbnb: quem ainda não anuncia vê o convite,
     quem já anuncia vê o atalho para o outro lado do produto. */
  function trocaModoHTML() {
    if (!logado()) return "";
    if (modo() === "estabelecimento") {
      return '<button class="switch-modo" type="button" data-trocar-modo="viajante">' +
        icone("bussola", "icon--sm") + "Mudar para viajar</button>";
    }
    if (temLocais()) {
      return '<button class="switch-modo" type="button" data-trocar-modo="estabelecimento">' +
        icone("loja", "icon--sm") + "Modo estabelecimento</button>";
    }
    return '<a class="switch-modo" href="parceiros.html#cadastro">' +
      icone("loja", "icon--sm") + "Anunciar meu local</a>";
  }

  function itensMenuHTML() {
    if (modo() === "estabelecimento") {
      return '<a href="parceiros-painel.html">' + icone("alta", "icon--sm") + "Visão geral</a>" +
        '<a href="parceiros-painel.html#meus-locais">' + icone("loja", "icon--sm") + "Meus locais (" + locais().length + ")</a>" +
        '<a href="parceiros.html#cadastro">' + icone("mais", "icon--sm") + "Cadastrar outro local</a>" +
        '<a href="parceiros-painel.html#plano">' + icone("cartao", "icon--sm") + "Plano e cobrança</a>" +
        '<hr class="usermenu__sep">' +
        '<button type="button" data-trocar-modo="viajante">' + icone("bussola", "icon--sm") + "Mudar para viajar</button>" +
        '<a href="ajuda.html">' + icone("balao", "icon--sm") + "Central de ajuda</a>" +
        '<hr class="usermenu__sep">' +
        '<button type="button" data-sair>' + icone("sair", "icon--sm") + "Sair</button>";
    }
    return '<a href="conta.html">' + icone("usuario", "icon--sm") + "Minha conta</a>" +
      '<a href="conta.html#salvos">' + icone("coracao", "icon--sm") + "Destinos salvos</a>" +
      '<a href="conta.html#preferencias">' + icone("filtros", "icon--sm") + "Preferências de viagem</a>" +
      '<a href="viagens.html">' + icone("pessoas", "icon--sm") + "Viagens coletivas</a>" +
      '<a href="album.html">' + icone("camera", "icon--sm") + "Álbuns e feed</a>" +
      '<hr class="usermenu__sep">' +
      '<a href="' + (premium() ? "conta.html#assinatura" : "premium.html") + '">' +
        icone("medalha", "icon--sm") + (premium() ? "Minha assinatura" : "Assinar premium") + "</a>" +
      (temLocais()
        ? '<button type="button" data-trocar-modo="estabelecimento">' + icone("loja", "icon--sm") + "Modo estabelecimento</button>"
        : '<a href="parceiros.html#cadastro">' + icone("loja", "icon--sm") + "Anunciar meu local</a>") +
      '<hr class="usermenu__sep">' +
      '<a href="ajuda.html">' + icone("balao", "icon--sm") + "Central de ajuda</a>" +
      '<button type="button" data-sair>' + icone("sair", "icon--sm") + "Sair</button>";
  }

  function contaHTML() {
    if (!logado()) {
      return '<div class="site-header__account">' +
        '<a class="body-sm strong link--quiet" href="login.html?modo=cadastro">Cadastrar</a>' +
        '<a class="btn" href="login.html">Entrar ' + icone("seta", "icon--sm") + "</a></div>";
    }
    const u = estado.usuario;
    const estab = modo() === "estabelecimento";
    const local = localAtivo();

    /* No modo estabelecimento o selo premium não diz nada: ali a pessoa
       está administrando um local, não escolhendo viagem. */
    const selo = estab ? ""
      : premium()
        ? '<span class="badge badge--premium">' + icone("medalha", "icon--sm") + "Premium</span>"
        : '<a class="link body-sm" href="premium.html">Seja premium</a>';

    return '<div class="site-header__account">' + selo + trocaModoHTML() +
      '<div class="usermenu" data-usermenu>' +
        '<button class="usermenu__btn" type="button" aria-haspopup="true" aria-expanded="false">' +
          '<img class="avatar avatar--sm" src="' + u.avatar + '" alt="">' +
          '<span class="body-sm strong">' + u.nome.split(" ")[0] + "</span>" + icone("baixo", "icon--sm") +
        "</button>" +
        '<div class="usermenu__panel">' +
          '<div class="usermenu__head">' +
            '<div class="body-sm strong">' + u.nome + "</div>" +
            '<div class="caption">' + (estab && local ? local.nome : u.email) + "</div>" +
          "</div>" +
          itensMenuHTML() +
        "</div>" +
      "</div></div>";
  }

  function renderHeader(chaveAtiva) {
    const alvo = $("[data-header]");
    if (!alvo) return;
    const estab = modo() === "estabelecimento";
    const links = navAtual().map(function (n) {
      const atual = n.chave === chaveAtiva ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + atual + ">" + n.label + "</a>";
    }).join("");

    /* A marca leva para o início do modo em que a pessoa está: no modo
       estabelecimento, clicar no logo e cair na home de viagem seria uma
       saída involuntária do papel. */
    const marca = marcaHTML("logo--sm", inicioDoModo());

    alvo.outerHTML =
      '<header class="site-header" data-header data-modo="' + modo() + '">' +
        '<div class="container site-header__inner">' +
          marca +
          (estab ? '<span class="site-header__papel">' + icone("loja", "icon--sm") + "Estabelecimento</span>" : "") +
          '<button class="site-header__toggle" type="button" aria-label="Abrir menu">' + icone("menu") + "</button>" +
          '<nav class="site-nav">' + links + "</nav>" +
          contaHTML() +
        "</div>" +
      "</header>";

    const header = $(".site-header");
    const toggle = $(".site-header__toggle", header);
    if (toggle) {
      toggle.addEventListener("click", function () { header.classList.toggle("is-open"); });
    }
    const menu = $("[data-usermenu]", header);
    if (menu) {
      const btn = $(".usermenu__btn", menu);
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", menu.classList.contains("is-open"));
      });
      document.addEventListener("click", function () { menu.classList.remove("is-open"); });
    }
    const sairBtn = $("[data-sair]", header);
    if (sairBtn) {
      sairBtn.addEventListener("click", function () {
        sair();
        toast("Você saiu da conta.");
        setTimeout(function () { location.href = "index.html"; }, 500);
      });
    }

    /* Trocar de papel leva para o início daquele lado: ficar na mesma página
       depois da troca deixaria a pessoa num lugar que o novo menu nem lista. */
    $$("[data-trocar-modo]", header).forEach(function (btn) {
      btn.addEventListener("click", function () {
        definirModo(btn.getAttribute("data-trocar-modo"));
        location.href = inicioDoModo();
      });
    });
  }

  function colunaHTML(titulo, itens) {
    return '<div class="site-footer__col"><h4>' + titulo + "</h4>" +
      itens.map(function (i) { return '<a href="' + i[1] + '">' + i[0] + "</a>"; }).join("") +
      "</div>";
  }

  /* O rodapé segue a mesma regra do menu: "preços", "como funciona" e
     "benefícios para empresas" são conversa com quem ainda não tem conta.
     Para quem já entrou, o rodapé é um índice das páginas de dentro. */
  function colunasFooter() {
    if (!logado()) {
      return colunaHTML("Sobre nós", [
        ["Descobrir destino", "index.html#buscar"],
        ["Como funciona", "index.html#como-funciona"],
        ["Destinos", "resultados.html"],
        ["Preços", "premium.html"]
      ]) +
      colunaHTML("Para empresas", [
        ["Benefícios", "parceiros.html"],
        ["Cadastrar estabelecimento", "parceiros.html#cadastro"],
        ["Planos", "parceiros.html#planos"]
      ]) +
      colunaHTML("Ajuda", [
        ["Central de ajuda", "ajuda.html"],
        ["Fale conosco", "ajuda.html#contato"],
        ["Perguntas frequentes", "index.html#perguntas"]
      ]);
    }

    return colunaHTML("Viajar", [
      ["Explorar destinos", "resultados.html"],
      ["Destinos salvos", "conta.html#salvos"],
      ["Viagens coletivas", "viagens.html"],
      ["Álbuns e feed", "album.html"]
    ]) +
    colunaHTML("Minha conta", [
      ["Dados da conta", "conta.html#dados"],
      ["Preferências de viagem", "conta.html#preferencias"],
      [premium() ? "Minha assinatura" : "Assinar premium", premium() ? "conta.html#assinatura" : "premium.html"]
    ]) +
    (temLocais()
      ? colunaHTML("Meu estabelecimento", [
          ["Visão geral", "parceiros-painel.html"],
          ["Meus locais", "parceiros-painel.html#meus-locais"],
          ["Cadastrar outro local", "parceiros.html#cadastro"],
          ["Plano e cobrança", "parceiros-painel.html#plano"]
        ])
      : colunaHTML("Anunciar um local", [
          ["Cadastrar meu local", "parceiros.html#cadastro"],
          ["Como funciona para o local", "parceiros.html"],
          ["Planos do estabelecimento", "parceiros.html#planos"]
        ])) +
    colunaHTML("Ajuda", [
      ["Central de ajuda", "ajuda.html"],
      ["Fale conosco", "ajuda.html#contato"]
    ]);
  }

  function renderFooter() {
    const alvo = $("[data-footer]");
    if (!alvo) return;
    alvo.outerHTML =
      '<footer class="site-footer" data-footer><div class="container">' +
        '<div class="site-footer__grid ' + (logado() ? "site-footer__grid--4" : "") + '">' +
          "<div>" + marcaHTML("logo--light") +
            '<div class="site-footer__social">' +
              '<a href="#" aria-label="Instagram">' + icone("instagram") + "</a>" +
              '<a href="#" aria-label="Facebook">' + icone("facebook") + "</a>" +
              '<a href="#" aria-label="LinkedIn">' + icone("linkedin") + "</a>" +
              '<a href="#" aria-label="Twitter">' + icone("twitter") + "</a>" +
            "</div></div>" +
          colunasFooter() +
        "</div>" +
      "</div></footer>";
  }

  /* ---------------- card de destino ---------------- */
  /* Usado nos resultados, nos salvos da conta e na votação de viagens. */
  function cardDestino(d, opcoes) {
    opcoes = opcoes || {};
    const selo = d.verificado
      ? '<span class="badge">' + icone("check-circulo", "icon--sm") + "Verificado</span>"
      : "";
    const patrocinado = opcoes.patrocinado
      ? '<span class="tag tag--overlay dcard__sponsored">' + icone("alta", "icon--sm") + "Anúncio</span>"
      : "";
    const match = opcoes.semMatch ? "" : '<span class="tag">' + d.match + "% match</span>";
    const guardado = salvo(d.id);
    /* "3h de estrada" no próprio card. É o recorte do produto: sem isto
       o card volta a ser uma lista de lugares bonitos, e a pessoa só
       descobre a distância depois de abrir a ficha. Quem chama passa
       `origem`; sem ela, a linha simplesmente não aparece. */
    const partida = opcoes.origem && typeof blRotuloPartida === "function"
      ? blRotuloPartida(d, opcoes.origem)
      : null;

    return '<article class="dcard ' + (opcoes.patrocinado ? "dcard--featured" : "") + '" data-destino="' + d.id + '">' +
      '<div class="dcard__media">' +
        '<img src="' + d.img + '" alt="' + d.nome + '" loading="lazy">' +
        '<button class="btn-icon dcard__save" type="button" data-salvar="' + d.id + '"' +
          ' aria-pressed="' + guardado + '" aria-label="Salvar ' + d.nome + ' na sua lista">' +
          icone("coracao", "icon--sm") + "</button>" +
        selo + patrocinado +
      "</div>" +
      '<div class="dcard__body">' +
        '<div class="dcard__head"><h3 class="dcard__title">' + d.nome + "</h3>" + match + "</div>" +
        '<p class="dcard__loc">' + icone("pino", "icon--sm") + d.uf + ", " + d.pais +
          /* quem monta um card a partir da cópia de um destino real precisa
             poder dizer "este não tem nota" — zerar o campo na cópia é fácil
             de esquecer e vira avaliação inventada sobre o local de alguém */
          (!opcoes.semNota && d.nota
            ? '<span class="dcard__nota" title="' + (d.totalAvaliacoes || 0) + ' avaliações">' +
              icone("estrela", "icon--sm") + d.nota.toFixed(1).replace(".", ",") + "</span>"
            : "") +
        "</p>" +
        '<p class="dcard__tags">' + d.tags.join(" · ") + "</p>" +
        (partida ? '<p class="dcard__trip">' + icone("relogio", "icon--sm") + partida + "</p>" : "") +
        '<div class="dcard__foot">' +
          '<div class="dcard__price"><small>A partir de · ' + d.noites + " noites</small><strong>" + dinheiro(d.preco) + "</strong></div>" +
          '<a class="btn btn--sm" href="destino.html?id=' + d.id + '">Boralá! ' + icone("seta", "icon--sm") + "</a>" +
        "</div>" +
      "</div></article>";
  }

  /* Liga os botões de salvar de qualquer lista de cards */
  function ligarSalvar(container) {
    $$("[data-salvar]", container || document).forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-salvar");
        const agora = alternarSalvo(id);
        btn.setAttribute("aria-pressed", agora);
        toast(agora ? "Destino salvo na sua lista." : "Destino removido da lista.");
      });
    });
  }

  /* ---------------- bloqueio premium ---------------- */
  function bloqueioHTML(titulo, texto, origem) {
    return '<div class="locked__overlay">' +
      '<span class="badge badge--premium">' + icone("cadeado", "icon--sm") + "Premium</span>" +
      '<p class="strong">' + titulo + "</p>" +
      '<p class="body-sm text-secondary measure">' + texto + "</p>" +
      '<a class="btn" href="premium.html?origem=' + (origem || "") + '">Conhecer o Premium ' + icone("seta", "icon--sm") + "</a>" +
      /* O preço vem do data.js: o bloqueio é o lugar onde ele mais
         precisa estar certo, e era onde mais ficava desatualizado. */
      (precoDeEntrada()
        ? '<p class="caption text-secondary">A partir de ' + dinheiro(precoDeEntrada(), true) +
          "/mês no plano anual · ou um passe de 30 dias, sem recorrência.</p>"
        : "") +
      "</div>";
  }

  /* Envolve um bloco em "vidro fosco" com CTA, quando o usuário não é assinante */
  function aplicarBloqueios() {
    if (premium()) return;
    $$("[data-premium]").forEach(function (node) {
      const titulo = node.getAttribute("data-premium-titulo") || "Disponível para assinantes";
      const texto = node.getAttribute("data-premium-texto") || "Assine o Premium para desbloquear esta funcionalidade.";
      const origem = node.getAttribute("data-premium-origem") || "";
      const wrap = el('<div class="locked"></div>');
      node.parentNode.insertBefore(wrap, node);
      node.classList.add("locked__preview");
      node.setAttribute("inert", "");
      wrap.appendChild(node);
      wrap.insertAdjacentHTML("beforeend", bloqueioHTML(titulo, texto, origem));
    });
  }

  /* ---------------- blocos por estado da conta ---------------- */
  /* `data-se="logado"`, `data-se="visitante"`, `data-se="gratuito premium"`…
     Cada página marca os blocos que só existem para um estado e o resto do
     arquivo fica igual para todos os casos. Prefixo `!` nega a condição. */
  const CONDICOES = {
    visitante: function () { return !logado(); },
    logado: logado,
    premium: premium,
    gratuito: function () { return logado() && !premium(); },
    parceiro: function () { return logado() && temLocais(); },
    "sem-parceiro": function () { return logado() && !temLocais(); },
    viajante: function () { return logado() && modo() === "viajante"; },
    estabelecimento: function () { return logado() && modo() === "estabelecimento"; }
  };

  function condicaoOk(expressao) {
    return String(expressao).split(/\s+/).filter(Boolean).every(function (chave) {
      const negada = chave.charAt(0) === "!";
      const fn = CONDICOES[negada ? chave.slice(1) : chave];
      const valor = fn ? !!fn() : true;
      return negada ? !valor : valor;
    });
  }

  /* Remove do DOM em vez de esconder: bloco de visitante escondido ainda
     seria lido por leitor de tela e encontrado no Ctrl+F da página. */
  function aplicarCondicoes(raiz) {
    $$("[data-se]", raiz || document).forEach(function (n) {
      if (!condicaoOk(n.getAttribute("data-se"))) n.remove();
    });
  }

  /* ---------------- boot ---------------- */
  let navAtiva = null;

  /* Header e barra de estado refletem login/assinatura na hora,
     sem precisar recarregar a página. */
  function atualizarChrome() {
    if ($("[data-header]")) renderHeader(navAtiva);
  }

  function iniciar(opcoes) {
    opcoes = opcoes || {};
    navAtiva = opcoes.nav;

    /* Página de dentro aberta sem conta volta para o login sabendo para onde
       devolver a pessoa depois de entrar. */
    if (opcoes.exigeLogin && !logado()) {
      const aqui = location.pathname.split("/").pop() + location.search + location.hash;
      location.href = "login.html?next=" + encodeURIComponent(aqui);
      return false;
    }

    /* A página declara de que lado do produto ela é: abrir o painel do local
       já coloca a conta no modo estabelecimento, e abrir uma página de viagem
       traz de volta para o modo viajante. */
    if (opcoes.modo && logado()) {
      estado.modo = opcoes.modo === "estabelecimento" && temLocais() ? "estabelecimento" : "viajante";
      gravar(estado);
    }

    aplicarCondicoes();
    hidratarIcones();
    preencherPrecos();
    renderHeader(navAtiva);
    renderFooter();
    aplicarBloqueios();
    return true;
  }

  return {
    estado: function () { return estado; },
    icone: icone, hidratarIcones: hidratarIcones,
    el: el, $: $, $$: $$, dinheiro: dinheiro, params: params,
    estrelas: estrelas, toast: toast,
    logado: logado, premium: premium, entrar: entrar, sair: sair,
    assinatura: assinatura, planoDoViajante: planoDoViajante,
    diasRestantes: diasRestantes, precoDeEntrada: precoDeEntrada,
    preencherPrecos: preencherPrecos,
    atualizarUsuario: atualizarUsuario,
    assinar: assinar, cancelarAssinatura: cancelarAssinatura,
    alternarSalvo: alternarSalvo, salvo: salvo,
    cardDestino: cardDestino, ligarSalvar: ligarSalvar,
    salvarPreferencias: salvarPreferencias,
    locais: locais, temLocais: temLocais, adicionarLocal: adicionarLocal,
    buscarLocal: buscarLocal, atualizarLocal: atualizarLocal, removerLocal: removerLocal,
    localAtivo: localAtivo, definirLocalAtivo: definirLocalAtivo,
    modo: modo, definirModo: definirModo, inicioDoModo: inicioDoModo,
    viagens: viagens, criarViagem: criarViagem, atualizarViagem: atualizarViagem,
    alternarCurtida: alternarCurtida, curtido: curtido,
    condicaoOk: condicaoOk, aplicarCondicoes: aplicarCondicoes,
    resetar: resetar, iniciar: iniciar, aplicarBloqueios: aplicarBloqueios
  };
})();
