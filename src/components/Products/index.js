import {Component} from 'react'

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

  renderFailureView = () => <h1>Failure</h1>

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
        <h1>Our Products</h1>
        <div>{this.renderProductsView()}</div>
      </div>
    )
  }
}

export default Products
