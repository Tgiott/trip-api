import fastify from "fastify";
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm.trips";
import cors from '@fastify/cors'
import { confirmParticipants } from "./routes/confirm-participants";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getTripDetails } from "./routes/get-trip-details";
import { updateTrip } from "./routes/update-trip";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify();


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
    origin: true,
})

app.setErrorHandler(errorHandler)

app.register(updateTrip)
app.register(getTripDetails)
app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipants)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)

app.listen({port : env.PORT}).then(() => {
    console.log("server running...")
})