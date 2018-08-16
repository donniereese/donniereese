import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import Bio from "../components/Bio"

class BlogIndex extends React.Component {
  render() {
    // console.log("props", this.props)
    const pageLinks = []

    return (
      <div>
        <Helmet title={'Title'} />
        <Bio />
        <ul>
          {pageLinks}
        </ul>
        banana
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
