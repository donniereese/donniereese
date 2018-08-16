import React from "react"

// Import typefaces

// this is causing some problem in the glitch log
//   EIO: i/o error, read
//   @ ./~/typeface-merriweather/index.css 4:14-88 13:2-17:4 14:20-94
//
// import "typeface-montserrat"
// import "typeface-merriweather"


import profilePic from "../assets/me.jpg"

class Bio extends React.Component {
  render() {
    return (
      <p
        style={{ marginBottom: 0, }}
      >
        <img src={profilePic} alt={`Donnie Reese`} style={{ float: "left" }} />
        Written by
        {" "}
        <strong>Donnie Reese</strong>
        <small><em> (& glitchified by <a href="https://twitter.com/donnie_reese" style={{color: "black"}}>@100ideas</a>)</em></small>
        {" "}
        who lives and works in Dallas, Texas building useful things.
        {" "}
        <a href="https://twitter.com/donnie_reese">
          You should follow him on Twitter
        </a>
      </p>
    )
  }
}

export default Bio
