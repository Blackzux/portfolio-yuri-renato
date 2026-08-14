# Como atualizar o portfólio

## A forma mais fácil

Quando quiser adicionar ou alterar um projeto, envie para o Codex:

1. capa, imagens, mockups e vídeos;
2. título;
3. categoria e classificação;
4. ano;
5. descrição;
6. atividades realizadas;
7. ferramentas utilizadas;
8. cores principais.

Peça para atualizar `data/projects.json`, organizar os arquivos dentro de `projects/`, validar e publicar no GitHub. O site ordena os projetos automaticamente pelo ano.

## Atualização manual pelo GitHub

1. Abra a pasta `projects` no repositório.
2. Crie uma pasta com um nome curto, em minúsculas e sem espaços. Exemplo: `meu-novo-projeto`.
3. Envie a capa, galeria, mockups e vídeos para essa pasta.
4. Abra `data/projects.json` e clique no lápis para editar.
5. Copie um projeto existente, cole antes do fechamento final da lista e troque os dados.
6. Salve a alteração. O GitHub Pages fará a nova publicação automaticamente.

## Modelo de projeto

```json
{
  "id": "meu-novo-projeto",
  "title": "Título do projeto",
  "category": "Direção de Arte",
  "eyebrow": "Sports Design · Key Visual",
  "year": "2026",
  "description": [
    "Primeiro parágrafo da descrição.",
    "Segundo parágrafo, se necessário."
  ],
  "work": "Direção de arte, composição, manipulação de imagem e tratamento de cor.",
  "tools": ["Adobe Photoshop"],
  "colors": ["#171b21", "#00efd4"],
  "cover": "projects/meu-novo-projeto/capa.jpg",
  "gallery": [
    {
      "src": "projects/meu-novo-projeto/capa.jpg",
      "label": "Arte principal"
    },
    {
      "src": "projects/meu-novo-projeto/mockup.jpg",
      "label": "Aplicação em mockup"
    }
  ]
}
```

Para inserir um vídeo na galeria:

```json
{
  "type": "video",
  "src": "projects/meu-novo-projeto/motion.mp4",
  "poster": "projects/meu-novo-projeto/capa.jpg",
  "label": "Motion do projeto"
}
```

## Cuidados importantes

- Cada `id` precisa ser único.
- Use caminhos relativos como `projects/nome-do-projeto/capa.jpg`.
- Não use caminhos do computador começando com `C:\Users`.
- Nenhum arquivo pode ultrapassar 100 MB no GitHub.
- Prefira imagens JPG ou WebP otimizadas e vídeos MP4 compactados.
- Não apague vírgulas, aspas ou colchetes do JSON.
- Antes de publicar, execute a validação descrita no `README.md`.
