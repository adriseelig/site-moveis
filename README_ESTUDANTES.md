# Olá, estudante! 👋

Bem-vindo ao projeto do site da **eMe Móveis**. Este site foi construído para ser simples, moderno e fácil de editar.

## Como trocar as imagens?

Atualmente o site usa imagens do **Unsplash**. Se você quiser usar suas próprias fotos:

1. Coloque as fotos dentro da pasta `/public/images/`.
2. No código (em `src/pages/Portfolio.tsx`, `Hero.tsx` ou `About.tsx`), procure por `src="..."` ou campos de `image`.
3. Mude o caminho para `/images/seu-arquivo.jpg`.

### Dicas para as Fotos:
- **Formato:** Use `.jpg`, `.png` ou `.webp`.
- **Tamanho do Portfólio:** Recomendamos fotos com proporção **4:3** (ex: 800x600 pixels) para que o grid fique certinho.
- **Tamanho do Banner (Hero):** Use uma imagem grande e larga (ex: 1920x1080 pixels).
- **Peso:** Tente salvar as fotos com menos de **500kb** para o site carregar bem rápido!

## Portfólio: Mais fotos e Redirecionamento

### Posso adicionar mais que uma foto?
**Sim!** Você pode adicionar quantas fotos quiser.
1. Abra o arquivo `src/pages/Portfolio.tsx`.
2. Procure a lista `const projects = [...]`.
3. Adicione um novo objeto `{ id: 7, title: '...', category: '...', image: '...' }` dentro da lista.
4. O layout vai se ajustar automaticamente (grid responsivo).

### As fotos redirecionam para algum lugar?
Por padrão, as fotos do portfólio apenas mostram o título e a categoria ao passar o mouse. Elas **não redirecionam** para outro link. 
- Se você quiser que cada foto leve a algum lugar (como o WhatsApp), você precisaria envolver a imagem em um link `<a>` no código.

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
