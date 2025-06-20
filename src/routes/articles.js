const Article = require("../models/Article");

async function articleRoutes(fastify, options) {
  // Get all articles (with optional filters)
  fastify.get("/articles", async (req, reply) => {
    const { tag } = req.query;
    const query = tag ? { tags: tag } : {};
    const articles = await Article.find(query).sort({ createdAt: -1 });
    return articles;
  });

  // Get a single article by ID
  fastify.get("/articles/:id", async (req, reply) => {
    const article = await Article.findById(req.params.id);
    if (!article) return reply.code(404).send({ error: "Not found" });
    return article;
  });

  // Create a new article
  fastify.post("/articles", async (req, reply) => {
    const article = new Article(req.body);
    await article.save();
    return reply.code(201).send(article);
  });

  //Update an article
  fastify.put("/articles/:id", async (req, reply) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) return reply.code(404).send({ error: "Not found" });
    return article;
  });

  //Delete an article
  fastify.delete("/articles/:id", async (req, reply) => {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return reply.code(404).send({ error: "Not found" });
    return { message: "Article deleted" };
  });
}

module.exports = articleRoutes;
