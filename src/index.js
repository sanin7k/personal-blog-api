require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");

const articleRoutes = require("./routes/articles");

fastify.register(require("@fastify/cors"));

fastify.register(articleRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
