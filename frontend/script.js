// script.js
const produtoForm = document.getElementById("produto-form");
const nomeInput = document.getElementById("nome");
const categoriaInput = document.getElementById("categoria");
const precoInput = document.getElementById("preco");
const tamanhoInput = document.getElementById("tamanho");
const quantidadeInput = document.getElementById("quantidade");
const produtoIdInput = document.getElementById("produto-id"); // Campo hidden para o ID
const cadastrarButton = produtoForm.querySelector("button[type='submit']"); // O botão de submit

// Adiciona listener para o evento de submissão do formulário
produtoForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede o recarregamento da página

  // Cria o objeto produto com os valores atuais do formulário
  const produto = {
    nome: nomeInput.value,
    categoria: categoriaInput.value,
    preco: parseFloat(precoInput.value),
    tamanho: tamanhoInput.value,
    quantidade: parseInt(quantidadeInput.value)
  };

  const produtoId = produtoIdInput.value; // Pega o ID do campo hidden

  let response;

  if (produtoId) {
    // Se produtoId existe, estamos no modo de EDIÇÃO (PUT)
    response = await fetch(`http://localhost:3000/produtos/${produtoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    if (response.ok) {
      alert("Produto atualizado com sucesso!");
      // Limpa o ID e reseta o texto do botão para o modo de cadastro
      produtoIdInput.value = "";
      cadastrarButton.textContent = "Cadastrar Produto";
    } else {
      const errorData = await response.json();
      alert(`Erro ao atualizar produto: ${errorData.erro || response.statusText}`);
    }
  } else {
    // Se produtoId não existe, estamos no modo de CADASTRO (POST)
    response = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    if (response.ok) {
      alert("Produto cadastrado com sucesso!");
    } else {
      const errorData = await response.json();
      alert(`Erro ao cadastrar produto: ${errorData.erro || response.statusText}`);
    }
  }

  // Limpa o formulário e recarrega a lista de produtos
  produtoForm.reset();
  carregarProdutos();
});

// Função para carregar e exibir os produtos na tabela
async function carregarProdutos() {
  const response = await fetch("http://localhost:3000/produtos"); 
  
  if (!response.ok) {
    console.error('Erro ao carregar produtos:', response.statusText);
    document.querySelector("#tabela-produtos tbody").innerHTML = '<tr><td colspan="6">Erro ao carregar produtos. Verifique o servidor backend (http://localhost:3000).</td></tr>';
    return;
  }

  const produtos = await response.json();
  const tbody = document.querySelector("#tabela-produtos tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de adicionar os novos produtos

  if (produtos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Nenhum produto cadastrado.</td></tr>';
    return;
  }

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

// Função para remover um produto
async function removerProduto(id) {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, { method: "DELETE" }); 
    
    if (response.ok) {
      alert("Produto removido com sucesso!");
      carregarProdutos(); // Recarrega a lista para mostrar a remoção
    } else {
      const errorData = await response.json();
      alert(`Erro ao remover produto: ${errorData.erro || response.statusText}`);
    }
  }
}

// Função para iniciar a edição de um produto
async function editarProduto(id) {
  // 1. Buscar os dados do produto específico
  const response = await fetch(`http://localhost:3000/produtos/${id}`); 

  if (!response.ok) {
    alert("Erro ao buscar produto para edição. Produto não encontrado ou problema no servidor.");
    return;
  }
  
  const produto = await response.json();

  if (produto) {
    // 2. Preencher o formulário com os dados do produto
    nomeInput.value = produto.nome;
    categoriaInput.value = produto.categoria;
    precoInput.value = produto.preco;
    tamanhoInput.value = produto.tamanho;
    quantidadeInput.value = produto.quantidade;
    produtoIdInput.value = produto.id; // SALVA O ID NO CAMPO HIDDEN

    // 3. Mudar o texto do botão de "Cadastrar" para "Atualizar"
    cadastrarButton.textContent = "Atualizar Produto";
  } else {
    alert("Produto não encontrado para edição.");
  }
}

// Carrega os produtos quando a página é carregada pela primeira vez
carregarProdutos();