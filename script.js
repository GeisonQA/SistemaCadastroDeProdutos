document.getElementById("produto-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const produto = {
    nome: document.getElementById("nome").value,
    categoria: document.getElementById("categoria").value,
    preco: parseFloat(document.getElementById("preco").value),
    tamanho: document.getElementById("tamanho").value,
    quantidade: parseInt(document.getElementById("quantidade").value)
  };

  const response = await fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  });

  if (response.ok) {
    alert("Produto cadastrado com sucesso!");
    document.getElementById("produto-form").reset(); // Limpa o formulário
    carregarProdutos();
  } else {
    alert("Erro ao cadastrar produto.");
  }
});

async function carregarProdutos() {
  const response = await fetch("http://localhost:3000/produtos");
  const produtos = await response.json();

  const tbody = document.querySelector("#tabela-produtos tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de adicionar os novos produtos

  produtos.forEach(prod => {
    const row = `
      <tr>
        <td>${prod.nome}</td>
        <td>${prod.categoria}</td>
        <td>R$ ${prod.preco.toFixed(2)}</td>
        <td>${prod.tamanho}</td>
        <td>${prod.quantidade}</td>
        <td>
          <button class="acao-btn btn-editar" onclick="editarProduto(${prod.id})">Editar</button>
          <button class="acao-btn btn-excluir" onclick="removerProduto(${prod.id})">Excluir</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

async function removerProduto(id) {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("Produto removido com sucesso!");
      carregarProdutos();
    } else {
      alert("Erro ao remover produto.");
    }
  }
}

// Função placeholder para editarProduto - será implementada na próxima etapa
function editarProduto(id) {
  alert(`Funcionalidade de edição para o produto ID: ${id} será implementada.`);
}

// Carrega os produtos quando a página é carregada
carregarProdutos();