import { fastifySwagger } from '@fastify/swagger'
import fastify from "fastify"
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod"
import { createCoursesRoute } from "./src/routes/create-courses-by-id.ts"
import { getCoursesRoute } from "./src/routes/get-courses.ts"
//import { getCoursesByIdRoute } from "./src/routes/get-courses-by-id.ts"
import scalarAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Desafio Node.js',
                version: '1.0.0',
            }
        },
        transform: jsonSchemaTransform,
    })

    server.register(scalarAPIReference, {
        routePrefix: '/docs',
        configuration: {
            theme: 'laserwave'
        }
    })
}




server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(createCoursesRoute);
server.register(getCoursesRoute);
//server.register(getCoursesByIdRoute);

// server.patch('/courses/:id', (request, reply) => {
//     type Params = {
//         id: string
//     }

//     type Body = {
//         title: string
//     }

//     const params = request.params as Params;
//     const body = request.body as Body;

//     const courseId = params.id;
//     const courseNewTitle = body.title; 

//     if (!courseNewTitle){
//         return reply.status(400).send({ message: 'Informe o novo título'});
//     }

//    if(courseId){
//         const index = courses.findIndex(course => course.id === courseId);

//         if(index === -1) return reply.status(404).send({ message: 'Curso não encontrado' });

//         courses[index].title = courseNewTitle;

//         return reply.status(201).send({ course: courses[index] });
//     }

// })

// server.delete('/courses/:id', (request, reply) => {
//         type Params = {
//         id: string
//     }

//     const params = request.params as Params;

//     const courseId = params.id;

//     if(courseId){
//         const index = courses.findIndex(course => course.id === courseId);

//         if(index === -1) return reply.status(404).send({ message: 'Curso não encontrado' });

//         courses.splice(index, 1);

//         return reply.status(201).send({ courses });
//     }
// })

server.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})