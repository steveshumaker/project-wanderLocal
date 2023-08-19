import React from "react";
import "./Footer.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      &copy; Steve Shumaker
      <hr />
      {/* yelp attribution */}
      Ratings and reviews powered by{" "}
      <a target="_blank" href="https://www.yelp.com">
        <img
          style={{ height: "3%", width: "3%" }}
          src="/yelp_images/yelp_logo.png"
        />
      </a>
    </footer>
  );
}

export default Footer;
