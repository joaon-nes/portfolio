# Portfólio Parallax — João Nunes

Projeto organizado em arquivos separados para facilitar manutenção e publicação no GitHub Pages.

## Estrutura

```text
portfolio-parallax/
├── index.html
├── style.css
├── script.js
└── assets/
    └── joao-nunes.webp
```

## Executar localmente

Abra a pasta em um editor como o VS Code e utilize a extensão **Live Server**. Também é possível iniciar um servidor local com:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500` no navegador.

## Publicar

Envie todos os arquivos e a pasta `assets` para a raiz do repositório usado pelo GitHub Pages. O HTML carrega `style.css`, `script.js` e a imagem usando caminhos relativos.
