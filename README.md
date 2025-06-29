Sistema de Cadastro de Produtos - Loja de Roupas
Este é um projeto full-stack de uma aplicação web para o gerenciamento de produtos. Ele permite realizar as quatro operações básicas de um sistema (CRUD: Criar, Ler, Atualizar e Deletar) de forma simples e intuitiva, com um frontend interativo que se comunica com um backend robusto.

✨ Funcionalidades
Adicionar produtos: Formulário para cadastrar novos itens no inventário.

Listar produtos: Visualização de todos os produtos em uma tabela clara e organizada.

Editar produtos: Funcionalidade para alterar informações de produtos já existentes.

Remover produtos: Opção para excluir produtos do sistema.

Interface Responsiva: O layout se adapta a diferentes tamanhos de tela, como desktops e celulares.

💻 Tecnologias Utilizadas
Frontend
HTML5

CSS3 (com Variáveis e Media Queries)

JavaScript (Vanilla): Utilizado para manipular o DOM e realizar requisições à API de forma assíncrona com fetch.

Backend
Node.js: Ambiente de execução para o servidor.

Express.js: Framework para gerenciar as rotas da API e o servidor.

CORS: Middleware para permitir requisições entre o frontend e o backend.

Banco de Dados
SQLite: Banco de dados relacional leve e baseado em arquivo, ideal para projetos de pequena e média escala.

🚀 Instalação e Execução
Siga os passos abaixo para executar o projeto em sua máquina local.

Pré-requisitos
Node.js (versão 14 ou superior)

npm (geralmente instalado com o Node.js)

Passos
Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git

Navegue até o diretório do projeto:

cd seu-repositorio

Instale as dependências do backend:
O projeto utiliza express, sqlite3 e cors.

npm install express sqlite3 cors

Inicie o servidor backend:

node server.js

O servidor estará rodando em http://localhost:3000.

Abra o frontend:
Abra o arquivo index.html diretamente no seu navegador de preferência (Ex: Google Chrome, Firefox). A aplicação se conectará automaticamente ao servidor local.

📝 API Endpoints
O backend fornece os seguintes endpoints para manipulação dos produtos:

Método HTTP

Rota

Descrição

GET

/produtos

Lista todos os produtos cadastrados.

GET

/produtos/:id

Retorna os dados de um produto específico.

POST

/produtos

Adiciona um novo produto.

PUT

/produtos/:id

Atualiza um produto existente.

DELETE

/produtos/:id

Remove um produto do sistema.

📄 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo como desejar.
