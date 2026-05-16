# Olá, estudante! 👋

Bem-vindo ao projeto do site da **EME Móveis**. Este site foi construído para ser simples, moderno e fácil de editar.

## Como trocar as imagens?

Atualmente o site usa imagens de alta qualidade do **Unsplash**. Se você quiser usar suas próprias fotos:

1. Coloque as fotos dentro da pasta `/public/images/`.
2. No código (especialmente em `src/pages/Portfolio.tsx` ou `Hero.tsx`), procure por `src="..."` ou campos de `image`.
3. Mude o caminho para `/images/seu-arquivo.jpg`.

## Como mudar as cores?

O site usa as cores do **TailwindCSS**.
- Para mudar o tom de vermelho, procure por classes como `text-red-700` ou `bg-red-700` e troque para outra cor (ex: `text-blue-600`).
- Tudo é editável direto nas classes CSS dentro do código React.

## Estrutura do Projeto

- `src/components`: Peças que se repetem (Menu, Rodapé).
- `src/pages`: As grandes seções do site (Início, Sobre, Portfólio, Contato).
- `src/App.tsx`: O arquivo principal que "monta" o site todo.

Dúvidas? Olhe os comentários dentro dos arquivos `.tsx`, eles explicam o que cada parte faz!

---
Boas edições! 🚀
