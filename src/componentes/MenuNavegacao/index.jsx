import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './estilos.css';

export default function MenuNavegacao({ quantidadeCarrinho = 0 }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">
          Minha<span>Loja</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <NavLink className="nav-link" to="/" end>
              Loja
            </NavLink>
          </li>
        </ul>

        <Link
          className="navbar-cart"
          to="/carrinho"
          aria-label={`Carrinho, ${quantidadeCarrinho} itens`}
          title="Carrinho"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="cart-icon" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          {quantidadeCarrinho >= 0 && (
            <span className="cart-badge">{quantidadeCarrinho}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
