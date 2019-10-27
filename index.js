const express = require("express");

const server = express();

server.use(express.json());

server.listen(3001);

const projects = [];


function checkProjectExist(req, res, next) {

  //req.params -> {index: 2} ===   const {index} = req.params
  //const index = req.params.index

  const {
    index
  } = req.params; //what I type in the URL
  const project = projects.find(p => p.id == index);

  if (!project) {
    return res.status(400).json({
      error: 'Project was not found'
    });
  } {
    return next();
  }
};

server.use((req, res, next) => {
  console.count("number of requests");
  return next();
});

server.get("/projects", function (req, res) {

  return res.json(projects);

});

server.get("/projects/:index", checkProjectExist, (req, res) => {
  const {
    index
  } = req.params;
  return res.json(projects[index]);

});

server.post("/projects/", function (req, res) {

  const project = req.body;

  projects.push(project);

  return res.json(projects);

});

server.put("/projects/:index", checkProjectExist, (req, res) => {
  const {
    index
  } = req.params;
  const {
    title
  } = req.body;


  const project = projects.find(p => p.id == index);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:index", checkProjectExist, (req, res) => {
  const {
    index
  } = req.params;

  projects.splice(index, 1);

  return res.json(projects);

});