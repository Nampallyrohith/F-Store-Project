import Slider from 'react-slick'
import Header from '../Header'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HomeRoute = () => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div>
      <Header />
      <hr />
      <Slider {...settings}>
        <img
          src="https://res.cloudinary.com/dsfgj9nwd/image/upload/v1704544184/img-1_cqfy5y.webp"
          alt="img1"
        />
        <img
          src="https://res.cloudinary.com/dsfgj9nwd/image/upload/v1704544221/img_2_ccyjlu.webp"
          alt="img1"
        />
      </Slider>
      <img
        src="https://res.cloudinary.com/dsfgj9nwd/image/upload/v1704545144/img3_ghsmov.webp"
        alt="img3"
      />
    </div>
  )
}
export default HomeRoute
