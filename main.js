const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

//Arrays
let livros =  []
let estudantes = []
let alugueis = []

// ================== LIVROS ================== 

// Cadastrar
app.post("/livro",(req,res) => {
    const novoLivro =  {id: livros.length + 1, ...req.body}
    const arrayNovoLivro = Object.values(novoLivro)
    
    if(isNaN(novoLivro.ano) || arrayNovoLivro.length !== 5){
      res.status(400).send(`Resposta invalida!`)
    }
    for (let valor of arrayNovoLivro){
      if(!valor){
        res.status(400).send(`Resposta invalida!`)
      }
    }

    livros.push(novoLivro)
    res.status(201).json(novoLivro);
})

// Listar
app.get("/livros",(req,res) => {
  if(!livros.length){
    return res.send(`Não há nenhum livro cadastrado!`)
  }
  res.json(livros)
})


// Atualizar
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
    const livro = livros.find(a=>a.id === id)
    
    if (!livro) {
      return res.status(404).send("Esse livro não existe no sistema!")
    }
    
    livros = livros.filter(l => l.id !== id);
    res.status(204).send("Livro removido com sucesso");
  });

  // ===================== ESTUDANTES =====================


  // Cadastra estudante
  app.post("/estudante", (req,res)=>{
    const novoEstudante = { id: estudantes.length + 1,...req.bory};
    const arrayNovoEstudante = Object.values(novoEstudante)

    if(isNaN(novoEstudante.ano) || arrayNovoEstudante.length !== 5){
      res.status(400).send(`Resposta invalida!`)
    }
    for (let valor of arrayNovoEstudante){
      if(!valor){
        res.status(400).send(`Resposta invalida!`)
      }
    }
    
    estudantes.push(novoEstudante);
    res.status(201).json(novoEstudante)
  })


  // Listar estudantes
  app.get("/estudantes", (req,res) => {
    
    if (!estudantes.length){
      return res.send(`Não há nenhum estudante cadastrado!`)
    }
    res.json(estudantes)
  });


  // Atualizar estudante
  app.put("/estudante/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const index = estudantes.findIndex(a=>a.id === id);
  
    if(index === -1){
      return res.status(404).send(`O estudante ${id} não foi encontrado!`)
    } 

    estudantes[index] = {...estudantes[index],...req.bory}

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