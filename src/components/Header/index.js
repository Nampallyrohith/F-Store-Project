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
    <nav className="nav-bar">
      <div className="mobile-heading">
        <Link className="nav-link" to="/">
          <h1>FStore</h1>
        </Link>
      </div>

      <div className="nav-large-container">
        <Link className="nav-link" to="/">
          <div className="lg-container">
            <h1 className="main-heading">FStore</h1>
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
      </div>

      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
