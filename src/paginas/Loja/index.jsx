import React, { useState, useEffect } from 'react';
import ProdutoCard from '../../componentes/ProdutoCard';
import './estilos.css';

export default function Loja({ onComprar, itensCarrinho }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao carregar os produtos do servidor.');
        }
        return resposta.json();
      })
      .then((dados) => {
        setProdutos(dados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error(err);
        setErro('Não foi possível conectar ao servidor. Verifique se o json-server está rodando.');
        setCarregando(false);
      });
  }, []);

  if (carregando) return <div className="loja-status"><p>Carregando produtos...</p></div>;
  if (erro) return <div className="loja-status erro"><p>{erro}</p></div>;

  return (
    <div className="loja-container">
      <header className="loja-header">
        <h1>Nossa Loja Virtual</h1>
        <p>Confira os melhores produtos para você</p>
      </header>

      <div className="produtos-grid">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              produto={produto} 
              stock={produto.stock}
              quantidadeNoCarrinho={
                itensCarrinho.find((item) => item.id === produto.id)?.quantidade || 0
              }
              onComprar={onComprar}
            />
          ))
        ) : (
          <p className="nenhum-produto">Nenhum produto cadastrado no momento.</p>
        )}
      </div>
    </div>
  );
}