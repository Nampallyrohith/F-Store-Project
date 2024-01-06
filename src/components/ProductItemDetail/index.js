import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {CiCirclePlus, CiCircleMinus} from 'react-icons/ci'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'
import CartContext from '../../context/CartContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetail extends Component {
  state = {
    apiStatus: 'INITIAL',
    productDetail: {},
    quantity: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props

    const {params} = match
    const {id} = params
    const url = `https://fakestoreapi.com/products/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        productDetail: data,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderSuccessView = () => (
    <CartContext.Consumer>
      {value => {
        const {productDetail, quantity} = this.state
        const {
          image,
          price,

          rating,
          title,
          description,
        } = productDetail
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...productDetail, quantity})
        }
        return (
          <div className="product-item-container">
            <img src={image} alt={title} />
            <div className="details-container">
              <h1>{title}</h1>
              <p>{description}</p>
              <div className="rating-container">
                <FaStar className="rating-icon" />
                <p>{rating.rate}</p>
              </div>
              <p>Rs {price}/- </p>
              <div className="quantity-container">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onDecrementQuantity}
                >
                  <CiCircleMinus size={22} />
                </button>
                <p>{quantity}</p>
                <button
                  type="button"
                  className="btn"
                  onClick={this.onIncrementQuantity}
                >
                  <CiCirclePlus size={22} />
                </button>
              </div>
              <button
                type="button"
                className="cart-btn"
                onClick={onClickAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderFailureView = () => <h1>Failure</h1>

  renderInProgress = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#000" height="50" width="50" />
      </div>
    </div>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <hr />
        <div>{this.renderProductDetails()}</div>
      </div>
    )
  }
}

export default ProductItemDetail
