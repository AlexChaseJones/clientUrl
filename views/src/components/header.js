import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  showNavigation() {
    if (this.props.loggedIn) {
      return (
        <ul className="subnav-hero-subnav">
          <li>
            <Link to="/generateUrl">Generate URL</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <header className="subnav-hero-section">
          <h1 className="subnav-hero-headline">Tools <small>by Intersection</small></h1>

          {this.showNavigation()}

        </header>
        <div className="main">

          { this.props.children }

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { loggedIn } }) => {
  return { loggedIn };
};

export default connect(mapStateToProps)(Header);
