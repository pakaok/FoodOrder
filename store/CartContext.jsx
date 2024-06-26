import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearItem:()=>{}
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = updatedItems[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(existingCartItemIndex)
    const existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (state.items[existingCartItemIndex].quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if(action.type==="CLEAR_ITEM"){
    return {...state, items:[]}
  }
}
export function CartContextProvider({children}) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  const cartContext = { items: cart.items,addItem,removeItem,clearItem };
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearItem(){
    dispatchCartAction({type:"CLEAR_ITEM"})
  }
  console.log(cart)
  return <CartContext.Provider value={cartContext} >{children}</CartContext.Provider>
}
