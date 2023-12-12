import './_contact.scss'

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <form className="contact-form" action="contact">
          <div className="contact-details">
            <h1>Contact Us</h1>
            <p>Email: sufana@email.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Address: 123 Street, Riyadh, Saudi Arabia</p>
          </div>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="text" name="name" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
