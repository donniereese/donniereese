import React from "react"
import Link from "gatsby-link"

import Footer from '../components/Footer';

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header, footer
    let pENV = process.env
    if (location.pathname === "/") {
      header = (
        <h1>
          <Link style={{ boxShadow: "none", textDecoration: "none", color: "inherit", }} to={"/"}>
            Gatsby Starter Blog
          </Link>
        </h1>
      )
      footer = (
        <footer style={{textAlign: "center"}}>
          <a href={`https://${process.env.GLITCH_URL}/___graphql`}>
            graphql console
          </a>
        </footer>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit",
            }}
            to={"/"}
          >
            Gatsby Starter Blog
          </Link>
        </h3>
      )
      footer = (<Footer />)
    }
    return (
    <div>
      {header}
      {children()}
      <Footer />
    </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
