# api-movie-catalog
api para catalogo de filmes com autenticação usando JWT e uso da API externa chamada the movie database. 

Este repositório contém uma API Node.js que utiliza JSON Web Tokens (JWT) para autenticação e implementa um limitador de requisições por minuto utilizando o middleware express-rate-limit. Esta API oferece endpoints que só podem ser acessados mediante autenticação. 

Variáveis .env

Para que a API funcione corretamente, devem ser criadas em um arquivo .env as seguintes variáveis: 

RATE_LIMIT-WINDOWS_MS = 60000
RATE_LIMIT-MAX_REQUESTS = 50
MONGODB_USERNAME = Username do cluster MongoDB
MONGODB_PASSWORD = Senha do cluster MongoDB
SECRET = Secret para autenticação do JWT
API_KEY = Chave válida na API externa the movie database. https://developer.themoviedb.org/docs/getting-started


Limitador de Requisições
A API implementa um limitador de requisições por minuto usando express-rate-limit. Se o número máximo de requisições for excedido, a resposta será um erro 429 - Too Many Requests.

Cache 
Esta API utilza redis para cache no localhost, certifique de tê-lo instalado e o servidor iniciado na sua máquina.

Contribuição
Este é um projeto com fins acadêmicos, fique à vontade para contribuir com melhorias, correções de bugs ou novos recursos. Abra uma issue para discussões ou envie uma pull request diretamente.

