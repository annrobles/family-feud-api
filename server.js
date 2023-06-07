const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const questionData = require('./server/data/questions');

server.get('/api/questions', (req, res, next) => {
  res.status(200).send(questionData.question);
});

server.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;

  const index = questionData.question.findIndex(p => p.id == id);

  questionData.question = questionData.question.splice(index, 1);

  return res.status(200).send(questionData.question);
});

server.put('/api/questions/:id', (req, res) => {
  const { id } = req.params;

  const index = questionData.question.findIndex(p => p.id == id);

  if ( index < 0 ) return res.status(404).json({});
  
  questionData.question[index] = req.body;

  return res.status(200).send(questionData.question);
});

server.post('/api/questions/', (req, res) => {
  
  req.body.id = questionData.question.length + 1;
  questionData.question.push(req.body);

  return res.status(200).send(questionData.question);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
