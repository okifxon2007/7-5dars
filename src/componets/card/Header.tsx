import React from 'react';
import '../card/index.css';

const Header: React.FC = () => {
  function handdark() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  return (
   <div className="header">
     <div className='headdf conta'>
      <h1>C</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Products</li>
        <li>Cart</li>
        <li>Checkout</li>
        <li>Orders</li>
      </ul>
      <button onClick={handdark}>
        <i className="fa-solid fa-moon"></i>
      </button>
    </div>
   </div>
  );
};

export default Header;
