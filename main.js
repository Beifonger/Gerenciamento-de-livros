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
let estudantes = []
let alugueis = []

// ================== LIVROS ================== 

// pega um requisição json adiciona um id e retorna o status de 201 de cadastrado + arquivo.json
app.post("/livro",(req,res) => {
    const novoLivro =  {id: livros.length + 1, ...req.body}
    livros.push(novoLivro)
    res.status(201).json(novoLivro);
})

// listar livros cadastrados!
app.get("/livros",(req,res) => {
  // Devolve array livros como um aquivo json
  res.json(livros)
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

  // ----> Adicionais

  

  // ===================== ESTUDANTES =====================


  // Cadastra estudante
  app.post("/estudante", (req,res)=>{
    // define variavel novoEstudante como um objeto com todas as informações de cadastro
    const novoEstudante = { id: estudantes.length + 1,...req.bory};
    // push variavel novoEstudante para dentro do array 
    estudantes.push(novoEstudante);
    //restorna 201 = Criado com sucesso, e um arquivo json mostrando os dados cadastrados
    res.status(201).json(novoEstudante)
  })


  // Listar estudantes
  app.get("/estudantes", (req,res) => {
    // retorna o array estudantes como um arquivo json
    res.json(estudantes)
  });


  // Atualizar estudante
  app.put("/estudante/:id", (req,res) => {
    // define variavel para parametro passado na url
    const id = parseInt(req.params.id)
    // define variavel para ação(retornar o index do id que prencher a condição de ser ingual id input)
    const index = estudantes.findIndex(a=>a.id === id);
  
    // se id for = -1 retorna erro 404 e a mensagem de texto
    if(index === -1){
      return res.status(404).send(`O estudante ${id} não foi encontrado!`)
    } 

    //atualiza o array estudantes com a req
    estudantes[index] = {...estudantes[index],...req.bory}

    // retorna o estudante que foi atualizado
    res.json(estudantes[index])
  })

  // Deletar
  app.delete("/estudante/:id", (req,res)=>{
    // definindo id
    const id = parseInt(req.params.id)
    // filtra array só pasando o que for diferente da variavel id da req
    estudantes = estudantes.filter(a=>a.id !== id)
    // retorna mensagem
    res.send("Livro removido com sucesso")
  });

  // ===================== Gerenciamento de Aluguéis =====================

  // Criar aluguel
  app.post("/aluguel",(req,res)=>{
    // define varivel com todas as informações que vão ser cadastradadas em json
    const novoAluguel = {id: alugueis + 1,...req.bory}
    // se idLivro não estiver icluso no id
    if(!livros.some(a=>a.id === novoAluguel.idLivro)){
      // retorna erro e mensagem
      res.status(404).send("Livro não encontrado")
    }
    // se idEstudante não estiver icluso no id
    if(!estudantes.some(a=>a.id === novoAluguel.idEstudante)){
      // retorna erro e mensagem
      res.status(404).send("Estudante não foi encontrado!")
    }

    // puxa novoAluguel para o array Alugueis
    alugueis.push(novoAluguel)

    // retorna 201 = Cadastrado com sucesso, e o que foi cadastrado em json
    res.status(201).json(novoAluguel)
  })

  // Leitura de aluguéis
  app.get("/alugueis", (req,res)=>{
    res.json(alugueis)
  })

  // Atualização de alugueis
  app.put("/aluguel/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const index = alugueis.findIndex(a=>a.id === id)

    alugueis[index] = {...[index],...req.bory}
    res.json(alugueis[index])
  })

  // Deletar aluguei com base em id 
  app.delete("/aluguel/:id", (req,res) => {
    const id  = parseInt(req.params.id)
    alugueis = alugueis.filter(a => a.id !== id)
    res.send("Aluguel removido com sucesso!")

  })

// executa o Servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });