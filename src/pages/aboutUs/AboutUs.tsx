import './_aboutUs.scss'

import aboutus from '../../assets/aboutus.png'

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="image">
        <img src={aboutus} alt="About Us" />
      </div>
      <h1>About Us</h1>
      <div className="about-content">
        <div className="text">
          <p>
            Welcome to our e-commerce store! We are dedicated to providing a unique shopping
            experience. Our store offers a wide array of premium products carefully selected to
            cater to your lifestyle needs.
          </p>
          <p>
            We are committed to excellence in customer service, ensuring you have a seamless and
            satisfying shopping journey. Our mission is to make your online shopping experience
            enjoyable and convenient.
          </p>
          <p>
            Explore our catalog and find exceptional deals on various products. Thank you for
            choosing us for your shopping needs!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
