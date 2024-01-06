import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const ProductList = props => {
  const {list} = props
  const {id, image, price, rating, title} = list
  return (
    <li className="list">
      <Link className="product-link" to={`/products/${id}`}>
        <div className="product-content">
          <div className="img-container">
            <img src={image} alt={title} />
          </div>
          <h1>{title}</h1>
          <div className="rating-container">
            <FaStar className="rating-icon" />
            <p>{rating.rate}</p>
          </div>
          <p className="price">Rs {Math.round(price)}/- </p>
        </div>
      </Link>
    </li>
  )
}

export default ProductList
