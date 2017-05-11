import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <header className="subnav-hero-section">
          <h1 className="subnav-hero-headline">Tools <small>by Intersection</small></h1>
          <ul className="subnav-hero-subnav">
            <li>
              <a href="/generateUrl">Generate URL</a>
            </li>
          </ul>
        </header>

        { this.props.children }

        <footer>
          <div className="row">
            <div className="columns medium-12">
              <img alt="Intersection" src="../images/intersectionLogoImage.png" />
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Header;
