import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalPrice = 0
      cartList.forEach(list => {
        totalPrice += list.price * list.quantity
      })
      return (
        <div className="checkout-container">
          <h1>
            Order Total: Rs <span>{totalPrice}</span>
          </h1>
          <p>{cartList.length} items in cart</p>
          <button className="checkout-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
