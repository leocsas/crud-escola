const express = require('express')
const router = express.Router()

let professores = [
    {
        id: 1,
        nome: "Gustavo Clay",
        email: "clay.professor@gmail.com",
        cpf: "11111111111",
        curso: "ADS",
        disciplina: "Construção de Backend"
    },
    {
        id: 2,
        nome: " Marcelo Sousa",
        email: "marcelo.professor@gmail.com",
        cpf: "22222222222",
        curso: "ads",
        disciplina: "Engenharia de Software e Métodos Ágeis"
    }
]

// Criar novo professor
router.post("/professores", (req, res, next) => {
    const { nome, cpf, email, curso, disciplina } = req.body

    if (!nome || !cpf || !email || !curso || !disciplina) {
        return res.status(400).json({ error: "Todos os preenchimentos de dados são obrigatórios." })
    }

    const professor = professores.find(p => p.cpf == cpf)
    if (professor) {
        return res.status(409).json({ error: "CPF Já cadastrado!!!" })
    }

    const novoProfessor = {
        id: Date.now(),
        nome,
        cpf,
        email,
        curso,
        disciplina
    }
    //INSERIR ESSE NOVO PROFESSOR 
      professores.push(novoProfessor)
    res.status(201).json({ message: "Professor cadastrado", novoProfessor })
})
// Listar todos os professores
router.get('/professores', (req, res, next) => {
    res.json(professores)
})

// Buscar professor por ID
router.get('/professores/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const professor = professores.find(p => p.id == idRecebido)
    if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado!" })
    }
    res.json(professor)
})

// Atualizar professor
router.put('/professores/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const { nome, email, curso, disciplina } = req.body

// Verificar se os dados foram enviado
    if (!nome || !email || !curso || !disciplina) {
        return res.status(400).json({ error: "Todos os preenchimentos de dados são obrigatórios." })
    }
    // Validar se o PROFESSOR com aquele ID existe na lista
      const professor = professores.find(p => p.id == idRecebido)
    if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado!" })
    }
    // Atualização de dados
        professor.nome = nome
    professor.email = email
    professor.curso = curso
    professor.disciplina = disciplina

    res.json({ message: "Professor atualizado com sucesso!" })
})
// Deletar professor
router.delete('/professores/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const professor = professores.find(p => p.id == idRecebido)
    if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado!" })
    }

    professores = professores.filter(p => p.id != idRecebido)
    res.json({ message: "Professor excluído com sucesso!" })
})

module.exports = router