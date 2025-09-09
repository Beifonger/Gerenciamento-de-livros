// importa o framework express (cria api e servidores de forma simples)
const express = require("express");
// define comando para chamar 
const app = express();
// define onde vai rodar no meu computador 
const port = 3000;

// Permite que o Express entenda JSON no corpo das requisições
app.use(express.json())

//Arrays
let livros =  []
let estudante = []

// pega um requisição json adiciona um id e retorna o status de 201 de cadastrado + arquivo.json
app.post("/livro",(req,res) => {
    const novoLivro =  {id: livros.length + 1, ...req.body}
    livros.push(novoLivro)
    res.status(201).json(novoLivro);
})

// listar livros cadastrados!
app.get("/livros",(req,res) => {
    l
})


//Atualizar (Passa para o caminho um parametro :id)
app.put("/livro/:id", (req, res) => {
    const id = parseInt(req.params.id);
  
    // Encontrar o livro pelo id
    const livro = livros.find(l => l.id === id);

    // se livro for undefined retorna erro 404
    if (!livro) {
      return res.status(404).send("Livro não encontrado");
    }
  
    // Atualizar manualmente os campos (se input do titulo for diferente de undefined substitui variavel lipor input)
    if (req.body.titulo !== undefined) livro.titulo = req.body.titulo;
    if (req.body.autor !== undefined) livro.autor = req.body.autor;
    if (req.body.ano !== undefined) livro.ano = req.body.ano;
    if (req.body.genero !== undefined) livro.genero = req.body.genero;
  
    //(obs: find não está fazendo um copia, mas uma referencia)
    res.json(livro);
  });

  //Deletar
  app.delete("/livro/:id", (req, res) => {
    // define que variavel id é igual parametro id da url
    const id = parseInt(req.params.id);
    // substitui array livros por livros - o id que da url
    livros = livros.filter(l => l.id !== id);
    // retorna mensagem
    res.send("Livro removido com sucesso");
  });

  // ===================== ESTUDANTES =====================

  app.post("/estudante", (req,res)=>{
    const novoEstudante = { id: estudante.length + 1,...req.bory};
    estudante.push(novoEstudante);
    res.status(201).json(novoEstudante)
  })

  app.get("/estudantes")




// executa o Servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });