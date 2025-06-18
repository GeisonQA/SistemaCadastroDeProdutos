const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho absoluto, garantindo que funcione mesmo com pastas diferentes
const dbPath = path.resolve(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('📦 Banco de dados conectado com sucesso!');
  }
});

module.exports = db;

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT NOT NULL,
      preco REAL NOT NULL,
      tamanho TEXT NOT NULL,
      quantidade INTEGER NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error("❌ Erro ao criar a tabela:", err.message);
    } else {
      console.log("✅ Tabela 'produtos' criada/verificada com sucesso.");
    }
  });
});
