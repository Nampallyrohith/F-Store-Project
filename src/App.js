import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import Products from './components/Products'
import Cart from './components/Cart'

import ProductItemDetail from './components/ProductItemDetail'
import './App.css'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
    checkout: false,
  }

  incrementCartItemQuantity = id => {
    console.log(id)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(list => {
        if (id === list.id) {
          const update = list.quantity + 1
          console.log(update)
          return {...list, quantity: update}
        }
        return list
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(list => list.id === id)
    console.log(product)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(list => {
          if (id === list.id) {
            const update = list.quantity - 1
            console.log(update)
            return {...list, quantity: update}
          }
          return list
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productDetails = cartList.find(list => list.id === product.id)

    if (productDetails) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(list => {
          if (product.id === list.id) {
            const update = list.quantity + product.quantity
            return {...list, quantity: update}
          }
          return list
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachFilter => eachFilter.id !== id)
    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  checkoutProcess = () => {
    const {checkout} = this.state
    console.log(checkout)
    this.setState({checkout: !checkout})
  }

  cartEmpty = () => {
    const {checkout} = this.state
    this.setState({checkout: !checkout, cartList: []})
  }

  render() {
    const {cartList, checkout} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          checkout,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          checkoutProcess: this.checkoutProcess,
          cartEmpty: this.cartEmpty,
        }}
      >
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={ProductItemDetail} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
