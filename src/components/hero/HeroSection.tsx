import { Link } from 'react-router-dom'
import './_heroSection.scss'
import { FaDownload } from 'react-icons/fa'

const HeroSection = () => {
  return (
    <div className="heroSection">
      <div className="heroSection-box">
        <div className="heroSection-box-right">
          <h1 className="bold-heading"> Discover our products </h1>
          <h3>
            Welcome to our <span className="yellow-line">E-commerce store </span>
          </h3>
          <p> We offer high-quality products carefully selected to meet your needs.</p>
          <Link to="/aboutus">
            <button> About us </button>
          </Link>
          <button className="download-button">
            <FaDownload /> Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
