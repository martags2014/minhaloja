import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação das páginas da aplicação
import Loja from './paginas/Loja';
import Carrinho from './paginas/Carrinho';
import MenuNavegacao from './componentes/MenuNavegacao';
// import AdminDashboard from './paginas/AdminDashboard';
// import AdminNovoProduto from './paginas/AdminNovoProduto';
// import AdminEditarProduto from './paginas/AdminEditarProduto';
// import NotFound from './paginas/NotFound';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === produto.id);

      if (itemExistente) {
        if (itemExistente.quantidade >= produto.stock) {
          return itensAtuais;
        }

        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      if (produto.stock <= 0) {
        return itensAtuais;
      }

      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  };

  const aumentarQuantidade = (produtoId) => {
    setCarrinho((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === produtoId && item.quantidade < item.stock
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const diminuirQuantidade = (produtoId) => {
    setCarrinho((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === produtoId && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho((itensAtuais) =>
      itensAtuais.filter((item) => item.id !== produtoId)
    );
  };

  const quantidadeCarrinho = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <BrowserRouter>
      <MenuNavegacao
        quantidadeCarrinho={quantidadeCarrinho}
      />

      <Routes>
        {/* Rota principal / Loja */}
        <Route
          path="/"
          element={
            <Loja
              onComprar={adicionarAoCarrinho}
              itensCarrinho={carrinho}
            />
          }
        />

        <Route
          path="/carrinho"
          element={
            <Carrinho
              itens={carrinho}
              onAumentar={aumentarQuantidade}
              onDiminuir={diminuirQuantidade}
              onRemover={removerDoCarrinho}
            />
          }
        />

        {/* Rotas administrativas */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* <Route path="/admin/novo" element={<AdminNovoProduto />} /> */}
        {/* <Route path="/admin/:id/editar" element={<AdminEditarProduto />} /> */}

        {/* Rota coringa para páginas não encontradas (404) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
