const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

//Arrays
let livros = []
let estudantes = []
let alugueis = []

app.post("/livro", (req, res) => {
  const novoLivro = { id: livros.length + 1, ...req.body }
  const arrayNovoLivro = Object.values(novoLivro)


  if (!req.body || arrayNovoLivro.length === 0) {
    return res.status(400).send("A requisição estar vazia!");
  }

  if (isNaN(novoLivro.ano) || arrayNovoLivro.length !== 5) {
    res.status(400).send(`Resposta invalida!`)
  }

  for (let valor of arrayNovoLivro) {
    if (!valor) {
      res.status(400).send(`Resposta invalida!`)
    }
  }

  livros.push(novoLivro)
  res.status(201).json(novoLivro);
})

app.get("/livros", (req, res) => {
  if (!livros.length) {
    return res.send(`Não há nenhum livro cadastrado!`)
  }
  res.json(livros)
})

app.put("/livro/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).send("Livro não encontrado");
  }
  if (req.body.titulo !== undefined) livro.titulo = req.body.titulo;
  if (req.body.autor !== undefined) livro.autor = req.body.autor;
  if (req.body.ano !== undefined && !isNaN(req.body.ano)) livro.ano = req.body.ano;
  if (req.body.genero !== undefined) livro.genero = req.body.genero;

  res.json(livro);
});

app.delete("/livro/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(a => a.id === id)

  if (!livro) {
    return res.status(404).send("Esse livro não existe no sistema!")
  }

  livros = livros.filter(l => l.id !== id);
  res.status(204).send("Livro removido com sucesso");
});

app.post("/estudante", (req, res) => {
  const novoEstudante = { id: estudantes.length + 1, ...req.bory };
  const arrayNovoEstudante = Object.values(novoEstudante)

  if (!req.body || Object.keys(novoEstudante).length === 0) {
    return res.status(400).send("A requisição estar vazia!");
  }

  if (isNaN(novoEstudante.ano) || arrayNovoEstudante.length !== 5) {
    res.status(400).send(`Resposta invalida!`)
  }
  for (let valor of arrayNovoEstudante) {
    if (!valor) {
      res.status(400).send(`Resposta invalida!`)
    }
  }

  estudantes.push(novoEstudante);
  res.status(201).json(novoEstudante)
})


app.get("/estudantes", (req, res) => {

  if (!estudantes.length) {
    return res.send(`Não há nenhum estudante cadastrado!`)
  }
  res.json(estudantes)
});


app.put("/estudante/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = estudantes.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).send(`O estudante ${id} não foi encontrado!`)
  }

  estudantes[index] = { ...estudantes[index], ...req.bory }

  res.json(estudantes[index])
})

app.delete("/estudante/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const estudante = estudantes.find(a => a.id === id)

  if (!estudante) {
    res.status(404).send("Estudante não foi encontrado!")
  }

  estudantes = estudantes.filter(a => a.id !== id)
  res.send("Livro removido com sucesso")
});

app.post("/aluguel", (req, res) => {
  const novoAluguel = { id: alugueis + 1, ...req.bory }
  const arrNovoAluguel = Object.values(novoAluguel)

  if (!livros.some(a => a.id === novoAluguel.idLivro)) {
    res.status(404).send("Livro não encontrado")
  }
  if (!estudantes.some(a => a.id === novoAluguel.idEstudante)) {
    res.status(404).send("Estudante não foi encontrado!")
  }
  for (let valor of arrNovoAluguel) {
    if (!valor) {
      res.status(404).send("Resposta invalida!")
    }
  }

  alugueis.push(novoAluguel)
  res.status(201).json(novoAluguel)
})

app.get("/alugueis", (req, res) => {
  if (!alugueis) {
    res.send("Não há nenhum aluguel cadastrado!")
  }
  res.json(alugueis)
})

app.put("/aluguel/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = alugueis.findIndex(a => a.id === id)

  if (index === -1) {
    res.status(404).send("Id não encontrado!")
  }

  alugueis[index] = { ...[index], ...req.bory }
  res.json(alugueis[index])
})

app.delete("/aluguel/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const validar = alugueis.find(a => a.id === id)

  if (!validar) {
    res.status(404).send("Id não encontrado!")
  }
  alugueis = alugueis.filter(a => a.id !== id)
  res.send("Aluguel removido com sucesso!")
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});