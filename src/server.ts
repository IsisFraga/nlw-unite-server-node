import fastify from "fastify"

const app = fastify()

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ... utilizar por questão de semântica

// Corpo da requisição (Request Body)
// Parâmetros de busca (Search Params / Query Params) `http://localhost:3333/users?name=Isis`
// Parâmetros de rota (Route Params) -> identificação de recursos `DELETE http://localhost:3333/users/3`
// Cabeçalhos (Headers) -> Contexto

app.get('/', () => {
  return 'Hello You!'
})

app.listen({ port: 3333 }).then(() => {
  console.log('http server running!')
})