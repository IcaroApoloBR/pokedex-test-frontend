# Desafio Técnico Bean Softwares - Front end Developer React

# Projeto Pokémon Web

## Fluxo de Autenticação

Implementação de um sistema robusto de cadastro e login, utilizando validações eficientes com React Hook Forms e Zod. Além disso, o armazenamento seguro do token JWT é gerenciado através da funcionalidade de storage.

## Filtros Pokémon

Facilitando a busca e filtragem dos Pokémon com:

- Pesquisa por nome
- Seleção de tipo
- Ordenação por ID e ordem alfabética
- Paginação com limites ajustáveis de itens por página

## useContext

Utilização do hook `useContext` para criar um contexto contendo todos os Pokémon e o Theme Provider para suportar o modo escuro na aplicação.

## Navegação

- **Página Home:** Listagem principal de Pokémons.
- **Seção de Informações Detalhadas:** Detalhes específicos de cada Pokémon.
- **Roteamento para Evoluções e Perfil:** Navegação clara para visualização de evoluções e perfis individuais.

## Layout

- **Navbar Navegável:** Facilita a movimentação pela aplicação.
- **Footer Interativo:** Inclui links para redes sociais.
- **Responsividade:** Garantir uma experiência consistente em diferentes dispositivos.

## Recursos Adicionais

- **Teste de Rotas no Insomnia:** Arquivo dedicado para testar as rotas da API.
- **Docker-Compose:** Inicialização do ambiente com o arquivo docker-compose.
- **Instruções de Instalação:** Guia para configurar e executar o projeto.
- **Vídeos Representativos:** Incluí vídeos demonstrativos do projeto em funcionamento para uma compreensão visual.

Sinta-se à vontade para explorar, contribuir e personalizar conforme necessário. Boas codificações!

### Instruções.

Clone o repositório do projeto:
-  git clone https://github.com/IcaroApoloBR/pokedex-test-frontend.git

- Tive problemas no Docker para subir o projeto, devido a orm do prisma, levantar banco de dados por ele
  - docker-compose up --build --no-recreate -d
  - docker-compose up -d
  - docker exec -it {nome do container} sh

Execute os seguintes comandos para configurar o Frontend.
-  Frontend:
    - Entre na pasta do frontend:
      ```bash 
      cd frontend
      ```
    - Ajustar env com base no env.example
    - Instale as dependências:
      ```bash 
      npm install
      ```
    - Inicie o servidor de desenvolvimento do frontend:
      ```bash 
      npm run dev
      ```

Execute os seguintes comandos para configurar o Backend.
-  Backend:
    - Entre na pasta do backend:
      ```bash 
      cd backend
      ```
    - Ajustar env com base no env.example
    - Instale as dependências:
      ```bash 
      npm install
      ```
    - Criar base de dados:
      ```bash 
      npx prisma migrate deploy
      ```
    - Criar tipos do prisma:
      ```bash 
      npx prisma generate
      ```
    - Inicie o servidor de desenvolvimento do backend:
      ```bash 
      npm run dev
      ```

### Versão do NODE   
    v20.10.0
### Versão do NPM   
    v10.2.3
    
### Depêndencias do Frontend
    "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@hookform/resolvers": "^3.3.2",
    "framer-motion": "^10.16.12",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-router-dom": "^6.20.1",
    "react-toastify": "^9.1.3",
    "zod": "^3.22.4"
    },

### Depêndencias do Backend
    "dependencies": {
    "@prisma/client": "^5.6.0",
    "@types/cors": "^2.8.17",
    "@types/jsonwebtoken": "^9.0.5",
    "axios": "^1.6.2",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-async-errors": "^3.1.1",
    "jsonwebtoken": "^9.0.2",
    "tsc": "^2.0.4"
    },

### Vídeo e testes do Projeto
<div align="center">
<img src="github/system.gif" alt="Login" width="800" height="400">
</div>
<div align="center">
<img src="github/auth.gif" alt="Login" width="800" height="400">
</div>
<div align="center">
<img src="github/responsive.gif" alt="Login" width="800" height="400">
</div>

### Detalhes dos Requisitos para avaliação
- Temos um pequeno desafio para você pôr em prática seus conhecimentos técnicos para isso vamos te pedir para criar um sistema onde treinadores possam entrar se cadastrando com o seu nome de treinador e senha e, ao entrarem possuam essas seguintes funcionalidades.
- 1°) Criar um time de pokémons com 5 pokémons (o total de pokémons no time é 5);
- 2°) Listar todos os pokémons da API;
- 3°) Filtrar tanto por nome quanto por tipo ou ambos, se eu não achar o pokémons pesquisando pelo nome quero que seja informado que o pokémon que eu procurei não existe na pokedéx;
- 4°) Seja possível visualizar as evoluções dos pokémons.
- 5°) O sistema deve ser desenvolvido com Docker e Docker compose onde, ao final do processo seja gerado um arquivo do Docker compose com todos os serviços necessários para rodar o sistema: (Backend, frontend, banco de dados etc...)
- 6°) Para o desenvolvimento do Backend utilize Typescript com Nodejs, para o desenvolvimento do Frontend utilize Typescript com React usando o framework (Vite) e para o banco de dados se necessário o Postgres. A utilização do Docker com Docker compose é obrigatória.
- 7°) Poste no seu GitHub o trabalho desenvolvido e encaminhe o link neste chat.

Recurso API a ser utilizada: https://pokeapi.co/

### Autor

<p align="center">
  <img width="200px" alt="Ícaro Apolo" title="Ícaro Apolo" src="https://github.com/IcaroApoloBR.png" />

  <h3 align="center">Ícaro Apolo</h3>

  <p align="center">
    Entre em contato para mais informações! 😅
  </p>
</p>

<div align="center">

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-1f6feb?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/icaroapolo/)](https://www.linkedin.com/in/icaroapolo/)
[![Gmail Badge](https://img.shields.io/badge/-apoloraci@gmail.com-1f6feb?style=flat-square&logo=Gmail&logoColor=white&link=mailto:apoloraci@gmail.com)](mailto:apoloraci@gmail.com)
[![GitHub Badge](https://img.shields.io/badge/-GitHub-1f6feb?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/IcaroApoloBR)](https://github.com/IcaroApoloBR)

</div>