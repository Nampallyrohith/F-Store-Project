import {Link} from 'react-router-dom'
import './index.css'
import CartContext from '../../context/CartContext'

const Header = () => {
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartItemsCount}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav>
      <Link className="nav-link" to="/">
        <div>
          <h1>FStore</h1>
        </div>
      </Link>
      <ul>
        <li>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="nav-link" to="/products">
            Products
          </Link>
        </li>

        <li>
          <Link className="nav-link" to="/cart">
            Cart
            {renderCartItemsCount()}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
