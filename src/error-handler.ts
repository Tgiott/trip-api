import type { FastifyInstance } from "fastify";
import { ClientError } from "./errors/client-error";
import { ZodError } from "zod";



type FastifyErrorHandler = FastifyInstance['errorHandler']


export const errorHandler: FastifyErrorHandler = ( error, req, rep) => {

    if (error instanceof ZodError) {

        rep.status(400).send({
            message: 'Invalid input.',
            erros: error.flatten().fieldErrors,
        })
    }

    if (error instanceof ClientError) {
        return rep.status(400).send({
            message: error.message
        })
    }

    return rep.status(500).send({message: 'Internal server error'})
}

