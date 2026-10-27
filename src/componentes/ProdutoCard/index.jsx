import React from 'react';
import './estilos.css';

export default function ProdutoCard({
  produto,
  stock,
  quantidadeNoCarrinho = 0,
  onComprar,
}) {
  // Mapeando as propriedades para corresponder ao seu JSON
  const { image, name, category, price, promoPrice } = produto;
  const disponivel = stock > 0 && quantidadeNoCarrinho < stock;
  const esgotado = stock === 0;
  const temPromocao = promoPrice != null;

  // Como o preço no JSON está como 1890 (provavelmente em centavos), dividimos por 100 para converter para reais
  const formatarPreco = (valor) => ((valor || 0) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="produto-card">
      <div className="produto-imagem-container">
        <img 
          src={image || 'https://via.placeholder.com/300'} 
          alt={name || 'Produto'} 
          className="produto-imagem"
        />
        {category && <span className="produto-categoria-tag">{category}</span>}
        {esgotado && <span className="produto-esgotado-tag">Esgotado</span>}
      </div>

      <div className="produto-conteudo">
        <h3 className="produto-nome" title={name}>
          {name}
        </h3>

        <div className="produto-footer">
          <div className="produto-precos">
            {temPromocao && (
              <span className="produto-preco-original">{formatarPreco(price)}</span>
            )}
            <span className="produto-preco">
              {formatarPreco(temPromocao ? promoPrice : price)}
            </span>
          </div>
          
          <button 
            onClick={() => disponivel && onComprar && onComprar(produto)}
            className="produto-botao"
            disabled={!disponivel}
          >
            {stock > 0 && quantidadeNoCarrinho >= stock
              ? 'Estoque máximo'
              : disponivel
                ? 'Comprar'
                : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  );
}