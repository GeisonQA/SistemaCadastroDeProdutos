// backend/server.js
const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message })
    res.json(rows)
  })
})

// Rota para adicionar produto
app.post('/produtos', (req, res) => {
  const { nome, categoria, preco, tamanho, quantidade } = req.body

  const query = `
    INSERT INTO produtos (nome, categoria, preco, tamanho, quantidade)
    VALUES (?, ?, ?, ?, ?)
  `
  db.run(query, [nome, categoria, preco, tamanho, quantidade], function (err) {
    if (err) return res.status(500).json({ erro: err.message })

    res.status(201).json({ id: this.lastID })
  })
})

// Rota para deletar produto
app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id

  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ erro: err.message })

    if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' })

    res.status(200).json({ mensagem: 'Produto removido com sucesso' })
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
// Rota para atualizar produto
app.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, categoria, preco, tamanho, quantidade } = req.body;

  const query = `
    UPDATE produtos
    SET nome = ?, categoria = ?, preco = ?, tamanho = ?, quantidade = ?
    WHERE id = ?
  `;
  db.run(query, [nome, categoria, preco, tamanho, quantidade, id], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
  });
});