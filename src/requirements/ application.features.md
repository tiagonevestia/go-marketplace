# Específicação dos testes

> ## Caso de sucesso
1. ✔️ Listar os produtos da fake API:
  > Sua página Dashboard deve ser capaz de exibir uma listagem através de uma tabela, com os campos title, image_url e price.
2. ✔️ Adicionar itens ao carrinho:
  > Em toda sua aplicação, você deve utilizar o Contexto chamado cart que deixamos disponível. Você vai precisar completar as funcionalidades dentro de hooks/cart.tsx para que você consiga adicionar itens ao carrinho.
3. ✔️ Exibir itens do carrinho:
  > Na página Cart você deve exibir todos os itens do carrinho, junto com a quantidade, valor único, valor subtotal dos itens e total de todos os items.
4. ✔️ Aumentar quantidade de itens do carrinho:
  > Na página Cart você deve permitir que o usuário aumente a quantidade de itens do mesmo produto, para isso você pode utilizar a função increment dentro do seu contexto em /src/hooks/cart.tsx.
5. ✔️ Diminuir quantidade de um item do carrinho:
  > Na página Cart você deve permitir que o usuário decremente a quantidade de itens do mesmo produto, para isso você pode utilizar a função decrement dentro do seu contexto em /src/hooks/cart.tsx.
6. ✔️ Exibir valor total dos itens no carrinho:
  > Tanto na página Dashboard, tanto na página Cart você deve exibir o valor total de todos os itens que estão no seu carrinho.
