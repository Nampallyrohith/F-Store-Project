import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav>
    <div>
      <h1>FStore</h1>
    </div>
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
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
