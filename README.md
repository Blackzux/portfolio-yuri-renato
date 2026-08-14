# Portfólio — Yuri Renato

Site profissional de Yuri Renato, designer gráfico e diretor de arte com foco em Sports Design, campanhas visuais, identidade, apresentações e motion design.

Site: [blackzux.github.io/portfolio-yuri-renato](https://blackzux.github.io/portfolio-yuri-renato/)

## Conteúdo do site

- apresentação e disponibilidade profissional;
- seção “Sobre mim”;
- projetos ordenados automaticamente do mais novo para o mais antigo;
- filtros, grade, carrossel e fichas completas com galerias e vídeos;
- serviços e formulários de briefing;
- processo de trabalho;
- contato, redes sociais e currículo para download;
- navegação responsiva e suporte a movimento reduzido.

## Como visualizar no computador

O catálogo é carregado por um arquivo separado, então o site precisa ser aberto por um servidor local. No terminal, dentro desta pasta, execute:

```powershell
node scripts\serve.mjs
```

Depois acesse [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Como adicionar um projeto

As informações dos projetos ficam em [`data/projects.json`](data/projects.json). O passo a passo completo está em [`COMO-ATUALIZAR.md`](COMO-ATUALIZAR.md).

## Validação antes de publicar

```powershell
node scripts\validate-site.mjs
```

O teste confirma a estrutura do catálogo, verifica se as imagens, vídeos e currículo existem e alerta quando algum arquivo é pesado demais para o GitHub.

## Publicação

O fluxo em `.github/workflows/pages.yml` publica automaticamente o conteúdo no GitHub Pages sempre que a branch `main` recebe uma atualização.

## Estrutura principal

```text
data/projects.json   informações editáveis dos projetos
projects/            imagens e vídeos organizados por projeto
downloads/           currículo
app.css              aparência do site
app.js               aplicação principal
bootstrap.js         carregamento do catálogo
index.html           metadados e entrada do site
```

© Yuri Renato. As artes e imagens apresentadas permanecem sob os direitos de seus respectivos autores e marcas quando aplicável.
