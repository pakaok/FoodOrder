import { useContext } from 'react';
import logoImg from '../src/assets/logo.jpg'
import Button from './UI/Button';
import { CartContext } from '../store/CartContext';
export default function Header() {
  const cartCtx = useContext(CartContext)
  const totalCartItems = cartCtx.items.reduce((prevValue,CurrentItem)=> prevValue + CurrentItem.quantity,0)
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems}) </Button>
      </nav>
    </header>
  );
}
