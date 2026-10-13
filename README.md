# Boralá!

Protótipo navegável do Boralá! — um app de viagem que parte de quanto tempo
e quanta gente você tem, e devolve destinos que caibam nisso.

**Protótipo no ar:** https://biafranzoi.github.io/borala/

## O que tem aqui

HTML, CSS e JavaScript sem build nem dependência: é só abrir. O estado da
sessão (login, viagens salvas, plano) vive em `localStorage`, então a
navegação funciona inteira no navegador, sem backend.

| Página | |
|---|---|
| `index.html` | home e busca |
| `resultados.html` | destinos que couberam na busca |
| `destino.html` | destino aberto |
| `estabelecimento.html` | um lugar dentro do destino |
| `viagens.html` · `viagem.html` | viagens salvas e o roteiro de uma delas |
| `album.html` · `jornada.html` | álbum da viagem e histórico |
| `premium.html` · `checkout.html` | planos e assinatura |
| `login.html` · `conta.html` | entrada e conta |
| `parceiros.html` · `parceiros-painel.html` | lado de quem anuncia |
| `ajuda.html` | ajuda |

## Rodando local

Qualquer servidor estático serve — os links entre páginas são relativos:

```
npx serve .
```

E abra o endereço que ele imprimir.
