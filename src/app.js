const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {id: uuid(), title, url, techs, likes: 0};
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const repositoryIndex = repositories.findIndex(repository=> repository.id === request.params.id);
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found!'})
  }
  let repository = repositories[repositoryIndex];
  repository =  {...repository, title, url, techs}
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const repositoryIndex = repositories.findIndex(repository=> repository.id === request.params.id);
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found!'})
  }
  repositories.splice(repositoryIndex, 1)
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const repositoryIndex = repositories.findIndex(repository=> repository.id === request.params.id);
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found!'})
  }
  let repository = repositories[repositoryIndex];
  repository =  {...repository, likes: repository.likes + 1};
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

module.exports = app;
