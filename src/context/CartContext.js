import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  checkout: false,
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  checkoutProcess: () => {},
  cartEmpty: () => {},
})

export default CartContext
