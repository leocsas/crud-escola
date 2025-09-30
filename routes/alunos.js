const express = require('express')
const router = express.Router()

let alunos = [
    {
        id: 1,
        nome: "Leonardo Soares",
        email: "leotestecrud@gmail.com",
        cpf: "00000000001",
        telefone: "61900000001",
        nascimento: "01/01/2001"
    },
    {
        id: 2,
        nome: "Geovanna Sousa",
        email: "geovannatestecrud@gmail.com",
        cpf: "00000000002",
        telefone: "61900000002",
        nascimento: "02/02/2002"
    }
]


// Criar novo aluno
router.post("/alunos", (req, res, next) => {
    const {nome, cpf, email, telefone, nascimento} = req.body

// Validação
if (!nome || !cpf || !email || !telefone || !nascimento) {
    return res.status(400).json({error: "Todos os preenchimentos de dados são obrigatórios."})
}

// Validação do CPF
const aluno = alunos.find(aluno => aluno.cpf == cpf)
  if (aluno) {
    return res.status(409).json({ error: "CPF Já cadastrado!!!" })
  }


// Cadastrar novo aluno
const novoAluno = {
    id: Date.now(),
    nome,
    cpf,
    email,
    telefone,
    nascimento
}

// Inserir esse novo cadastro
alunos.push(novoAluno)
res.status(201).json({message: "Aluno cadastrado", novoAluno})
})


// Listar os alunos
router.get('/alunos', (req, res, next) => {
    res.json(alunos)
})


// Buscar aluno por ID
router.get('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const aluno = alunos.find(p => p.id == idRecebido)
    if(!aluno){
        return res.status(404).json({error: "Aluno não encontrado!"})
    }
    res.json(aluno)
})


// Atualizar aluno
router.put('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const {nome, email, telefone, nascimento} = req.body

// Verificar se os dados foram enviados
if (!nome || !email || !telefone || !nascimento) {
    return res.status(400).json({error: "Todos os preenchimentos de dados são obrigatórios."})
}

// Validar se o aluno com aquele ID existe na lista
const aluno = alunos.find(aluno => aluno.id == idRecebido)
if(!aluno) {
    return res.status(404).json({error: "Pessoa não encontrada!"})
}

// Atualização de dados
aluno.nome = nome
aluno.email = email
aluno.telefone = telefone
aluno.nascimento = nascimento
res.json({message: "Pessoa atualizada com sucesso!"})
})


// Deletar aluno
router.delete('/alunos/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const aluno = alunos.find(aluno => aluno.id == idRecebido)
    if(!aluno){
        return res.status(404).json({error: "Aluno não encontrado!"})
    }

// Atualizar a lista sem o aluno do ID recebido
    alunos = alunos.filter(pessoa => pessoa.id != idRecebido)

    res.json({message: "Pessoa excluída com sucesso!"})
})

module.exports = router