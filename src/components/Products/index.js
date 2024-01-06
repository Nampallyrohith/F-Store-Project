import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProductList from '../ProductList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Products extends Component {
  state = {
    apiStatus: 'INITIAL',
    productList: [],
  }

  componentDidMount() {
    this.getProductFetch()
  }

  getProductFetch = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://fakestoreapi.com/products'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      this.setState({productList: data, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {productList} = this.state
    return (
      <ul className="product-container">
        {productList.map(list => (
          <ProductList key={list.id} list={list} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderInProgress = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#000" height="50" width="50" />
      </div>
    </div>
  )

  renderProductsView = () => {
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
        <h1 className="product-heading">Our Products</h1>
        <div>{this.renderProductsView()}</div>
      </div>
    )
  }
}

export default Products
