import { FaEnvelope, FaInstagram, FaTwitter } from 'react-icons/fa'

import './_footer.scss'
const Footer = () => {
  return (
    <footer className="grid-footer">
      <div className="grid-item">
        {' '}
        <h3> 🔆 StoreRise</h3>
        <div className="contacting">
          <a href="#">
            <FaEnvelope title="Email" />
          </a>
          <a href="#">
            <FaInstagram title="Instagram" />
          </a>
          <a href="#">
            <FaTwitter title="Twitter" />
          </a>
        </div>
        <p className="p-footer">© Copyright Sufana</p>
      </div>
      <div className="grid-item">
        <h4> Explore</h4>
        <p> About us</p>
        <p> Blog</p>
      </div>
      <div className="grid-item">
        <h4> Support</h4>
        <p> Contact</p>
        <p> F&Q</p>
      </div>
      <div className="grid-item">
        <form className="subscription-form">
          <label htmlFor="email" className="subscribe-label">
            <h4>Newsletter</h4>
            <p className="p-newsletter">Subscripe to stay updated</p>
          </label>
          <input type="email" id="email" placeholder="Your email" required />
          <button type="submit" className="subscribe-button">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  )
}

export default Footer
