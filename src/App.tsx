import { useEffect, useState } from 'react'
import './App.css'

type ProdutoType = {
  _id: string;
  nome: string;
  preco: number;
  urlfoto:string;
  descricao: string;
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.preco = parseFloat(data.preco as string);
    fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(newProduto => setProdutos([...produtos, newProduto]));
    form.reset();
  }
  useEffect(() => {
    fetch('/api/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data));
  }, []);

  return(
    <>
    <div>Cadastro de Produtos<div/>
    <form onSubmit={handleForm}>
      <input type="text" name="nome" placeholder="Nome" />
      <input type="number" name="preco" placeholder="Preço" />
      <input type="text" name="urlfoto" placeholder="URL da Foto" />
      <input type="text" name="descricao" placeholder="Descrição" />
      <button type="submit">Adicionar Produto</button>
    </form>
    <div>Lista de produtos</div>

      {produtos.map(produto => (
        <div key={produto._id}>
          <h2>{produto.nome}</h2>
          <p>Preço: {produto.preco}</p>
          <img src={produto.urlfoto} alt={produto.nome} />
          <p>{produto.descricao}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default App

