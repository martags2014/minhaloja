import React from 'react';
import { Link } from 'react-router-dom';
import { NUMERO_WHATSAPP_LOJISTA } from '../../configuracao';
import './estilos.css';

function formatarPreco(preco) {
  return ((preco || 0) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function Carrinho({
  itens,
  onAumentar,
  onDiminuir,
  onRemover,
}) {
  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
  const totalCentavos = itens.reduce(
    (total, item) =>
      total + (item.promoPrice ?? item.price ?? 0) * item.quantidade,
    0
  );

  const finalizarPeloWhatsApp = () => {
    const linhasItens = itens.map((item) => {
      const precoEfetivo = item.promoPrice ?? item.price ?? 0;
      const subtotalCentavos = precoEfetivo * item.quantidade;

      return `- ${item.name} | Quantidade: ${item.quantidade} | Subtotal: ${formatarPreco(subtotalCentavos)}`;
    });
    const mensagem = [
      'Olá! Gostaria de finalizar este pedido:',
      '',
      ...linhasItens,
      '',
      `Total: ${formatarPreco(totalCentavos)}`,
    ].join('\n');
    const url = `https://wa.me/${NUMERO_WHATSAPP_LOJISTA}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="carrinho-container">
      <h1>Meu carrinho</h1>

      {itens.length === 0 ? (
        <div className="carrinho-vazio">
          <p>Seu carrinho está vazio.</p>
          <Link to="/">Voltar à loja</Link>
        </div>
      ) : (
        <ul className="carrinho-lista">
          {itens.map((item) => (
            <li className="carrinho-item" key={item.id}>
              <img
                className="carrinho-item-imagem"
                src={item.image || 'https://via.placeholder.com/120'}
                alt={item.name || 'Produto'}
              />
              <div className="carrinho-item-detalhes">
                <h2>{item.name}</h2>
                {item.promoPrice != null && (
                  <p className="carrinho-preco-original">
                    De: {formatarPreco(item.price)}
                  </p>
                )}
                <p>
                  Preço unitário: {formatarPreco(item.promoPrice ?? item.price)}
                </p>
                <p className="carrinho-item-subtotal">
                  Subtotal: {formatarPreco((item.promoPrice ?? item.price ?? 0) * item.quantidade)}
                </p>
              </div>
              <div className="carrinho-item-acoes">
                <div className="carrinho-controle-quantidade">
                  <button
                    type="button"
                    onClick={() => onDiminuir(item.id)}
                    disabled={item.quantidade <= 1}
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >
                    −
                  </button>
                  <span>
                    Quantidade: <strong>{item.quantidade}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onAumentar(item.id)}
                    disabled={item.quantidade >= item.stock}
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  className="carrinho-remover"
                  type="button"
                  onClick={() => onRemover(item.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {itens.length > 0 && (
        <>
          <section className="carrinho-totais" aria-label="Resumo do carrinho">
            <p>
              Total de itens: <strong>{totalItens}</strong>
            </p>
            <p className="carrinho-total">
              Total: <strong>{formatarPreco(totalCentavos)}</strong>
            </p>
          </section>
          <button
            className="carrinho-finalizar"
            type="button"
            onClick={finalizarPeloWhatsApp}
          >
            Finalizar pelo WhatsApp
          </button>
        </>
      )}
    </main>
  );
}
