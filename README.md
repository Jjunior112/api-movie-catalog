# api-movie-catalog

Api para catalogo de filmes com autenticação usando JWT e uso da API externa chamada the movie database. 

Este repositório contém uma API Node.js que utiliza JSON Web Tokens (JWT) para autenticação e implementa um limitador de requisições por minuto utilizando o middleware express-rate-limit. Esta API oferece endpoints que só podem ser acessados mediante autenticação. 

### Variáveis .env

Para que a API funcione corretamente, devem ser criadas em um arquivo .env as seguintes variáveis: 

- **PORT** = 3000

- **RATE_LIMIT_WINDOWS_MS** = 60000 (intervalo para bloquear as requisições que excederam o limite)

- **RATE_LIMIT_MAX_REQUESTS** = 50 (limite de requisições dentro do tempo definido)

- **MONGODB_USERNAME** = Username do cluster MongoDB

- **MONGODB_PASSWORD** = Senha do cluster MongoDB

- **SECRET** = Secret para autenticação do JWT

- **TIME_EXPIRATION_TOKEN** = 900s (tempo para expiração do token JWT)

- **API_KEY** = Chave válida na API externa [the movie database](https://developer.themoviedb.org/docs/getting-started).

### Limitador de Requisições

A API implementa um limitador de requisições por minuto usando express-rate-limit. Se o número máximo de requisições for excedido, a resposta será um erro 429 - Too Many Requests.

### Rotas

- **/** = mensagem de boas vindas à api
- **/auth/register** = rota para registro de novo usuário
  ##### requisitos para registro
    - Nome
    - email
    - senha
    - confirmação de senha (apenas para autenticação, não sobe para o banco de dados)
      
 - **/auth/login** = rota para registro de novo usuário
   
   ##### requisitos para login
    - email
    - senha
      
  - **/movies** = integração com api extrerna para retornar o catalogo de filmes
    
  - **/favorites/id** = rota post e get para adicionar e visualizar lista de filmes favoritados pelo usuário
    
      - A rota para favoritar um filme se dá por um método **POST** em que deve conter no body da requisição o nome do filme a ser favoritado
      - Há também a rota **GET** para visualizar a lista de filmes favoritados 
    
### Contribuição

Este é um projeto com fins acadêmicos, fique à vontade para contribuir com melhorias, correções de bugs ou novos recursos. Abra uma issue para discussões ou envie uma pull request diretamente.

