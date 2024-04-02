import fastify from "fastify"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"

const app = fastify()
const prisma = new PrismaClient({
  log: ['query'],
})

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ... utilizar por questão de semântica

// Corpo da requisição (Request Body)
// Parâmetros de busca (Search Params / Query Params) `http://localhost:3333/users?name=Isis`
// Parâmetros de rota (Route Params) -> identificação de recursos `DELETE http://localhost:3333/users/3`
// Cabeçalhos (Headers) -> Contexto

// Semânticas = Significado

// Driver nativo / Query Builder / ORMs

// JSON - JavaScript Object Notation

app.post('/events', async (request, reply) => { 
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable()
  })
  const data = createEventSchema.parse(request.body)

  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      slug: new Date().toISOString(),
    }
  })

  // return { eventId: event.id }
  return reply.status(201).send({eventId: event.id})

})

app.listen({ port: 3333 }).then(() => {
  console.log('http server running!')
})