// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Certifique-se que o caminho para db.js está correto

const app = express();
const PORT = 3000;

app.use(cors()); // Permite que o frontend (localhost:port) acesse o backend
app.use(express.json()); // Habilita o Express a ler JSON no corpo das requisições

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});

// Rota para buscar um produto por ID (necessário para preencher formulário de edição)
app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    if (!row) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(row);
  });
});

// Rota para adicionar produto (CREATE)
app.post('/produtos', (req, res) => {
  const { nome, categoria, preco, tamanho, quantidade } = req.body;

  // Validação básica
  if (!nome || !categoria || !preco || !tamanho || !quantidade) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }
  if (preco <= 0) {
    return res.status(400).json({ erro: 'Preço deve ser um valor positivo.' });
  }
  if (quantidade <= 0) {
    return res.status(400).json({ erro: 'Quantidade deve ser um valor positivo.' });
  }

  const query = `
    INSERT INTO produtos (nome, categoria, preco, tamanho, quantidade)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [nome, categoria, preco, tamanho, quantidade], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.status(201).json({ id: this.lastID }); // Retorna o ID do novo produto
  });
});

// Rota para atualizar produto (UPDATE)
app.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, categoria, preco, tamanho, quantidade } = req.body;

  // Validação básica
  if (!nome || !categoria || !preco || !tamanho || !quantidade) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }
  if (preco <= 0) {
    return res.status(400).json({ erro: 'Preço deve ser um valor positivo.' });
  }
  if (quantidade <= 0) {
    return res.status(400).json({ erro: 'Quantidade deve ser um valor positivo.' });
  }

  const query = `
    UPDATE produtos
    SET nome = ?, categoria = ?, preco = ?, tamanho = ?, quantidade = ?
    WHERE id = ?
  `;
  db.run(query, [nome, categoria, preco, tamanho, quantidade, id], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    if (this.changes === 0) { // Verifica se alguma linha foi realmente alterada
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
  });
});

// Rota para deletar produto (DELETE)
app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    if (this.changes === 0) { // Verifica se alguma linha foi removida
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Produto removido com sucesso' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});