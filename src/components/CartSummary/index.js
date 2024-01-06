import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {
    nameErr: '',
    emailErr: '',
    mobileErr: '',
    addressErr: '',
    err: '',
  }

  onBlurName = event => {
    const {value} = event.target
    const nameErr = value.trim() === '' ? '*Name is required' : ''
    this.setState({nameErr})
  }

  onBlurEmail = event => {
    const {value} = event.target
    const emailErr = value.trim() === '' ? '*Email is required' : ''
    this.setState({emailErr})
  }

  onBlurNumber = event => {
    const {value} = event.target
    const mobileErr = value.trim() === '' ? '*Mobile number is required' : ''
    this.setState({mobileErr})
  }

  onBlurAddress = event => {
    const {value} = event.target
    const addressErr = value.trim() === '' ? '*Address is required' : ''
    this.setState({addressErr})
  }

  render() {
    const {nameErr, emailErr, mobileErr, addressErr, err} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, checkout, checkoutProcess, cartEmpty} = value
          let totalPrice = 0

          cartList.forEach(list => {
            totalPrice += list.price * list.quantity
          })

          return (
            <div className="checkout-container">
              <h1>
                Order Total: Rs <span>{Math.round(totalPrice)}/- </span>
              </h1>
              <p>{cartList.length} items in cart</p>

              <Popup
                modal
                trigger={
                  <button className="checkout-btn" type="button">
                    Checkout
                  </button>
                }
              >
                {checkout ? (
                  <div className="confirmation">
                    <img
                      src="https://res.cloudinary.com/dsfgj9nwd/image/upload/v1704543047/WhatsApp_Image_2024-01-06_at_17.37.02_uievtr.jpg"
                      alt="thank you"
                    />
                    <h1>Order Confirmed</h1>
                    <p>Thank you for Ordering</p>
                    <Link to="/products">
                      <button
                        type="button"
                        className="summary-btn"
                        onClick={() => cartEmpty()}
                      >
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="order-summary-container">
                    <h1>Order Summary</h1>
                    <form className="form-container">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        onBlur={this.onBlurName}
                      />
                      <p className="err-msg">{nameErr}</p>
                      <label htmlFor="email">Email Id</label>
                      <input
                        type="text"
                        id="email"
                        placeholder="Enter Email Id"
                        onBlur={this.onBlurEmail}
                      />
                      <p className="err-msg">{emailErr}</p>
                      <label htmlFor="number">Mobile Number</label>
                      <input type="number" onBlur={this.onBlurNumber} />
                      <p className="err-msg">{mobileErr}</p>
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        placeholder="Enter Address"
                        onBlur={this.onBlurAddress}
                      />
                      <p className="err-msg">{addressErr}</p>
                      <button type="button" onClick={() => checkoutProcess()}>
                        Proceed to Confirm
                      </button>
                      <p className="err-msg">{err}</p>
                    </form>
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
