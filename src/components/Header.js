import React from 'react';
import logoMesto from '../images/logo-mesto.svg';

function Header() {
  return (
    <header className="header">
      <img src={logoMesto} alt="Лого Место" className="header__logo" />
    </header>
  );
}

export default Header;
