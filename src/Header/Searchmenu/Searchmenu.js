import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import SearchBar from './Searchbar';
import logo from '../../assets/images/logo-ecri-standard.svg';
import avatarDefaultImg from '../../assets/images/avatar-default.svg';
import styles from './header.module.scss';

const HeaderLink = ({ className, rootUrl, sectionSlug, desc, children }) => {
  if (sectionSlug === undefined) {
    sectionSlug = '';
  }
  return rootUrl !== '' ? (
    <a className={className && className} href={`${rootUrl}/${sectionSlug}${sectionSlug ? '/' : ''}`} aria-label={sectionSlug}>{desc ? desc : children}</a>
  ) : (
    <Link className={className && className} to={`${sectionSlug}${sectionSlug ? '/' : ''}`} aria-label={sectionSlug}>{desc ? desc : children}</Link>
  );
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      userMenuOpen: false,
      guidelineMenuOpen: false,
    };
    this.headerMenuRef = React.createRef();
    this.userMenuRef = React.createRef();
    this.guidelineMenuRef = React.createRef();
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleUserMenuClick = this.handleUserMenuClick.bind(this);
    this.handleGuidelineMenuClick = this.handleGuidelineMenuClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleMenuClick() {
    this.setState(prev => ({
      menuOpen: !prev.menuopen,
      userMenuOpen: false,
      guidelineMenuOpen: false,
    }));
  }
  handleUserMenuClick() {
    this.setState(prev => ({
      menuOpen: false,
      userMenuOpen: !prev.userMenuOpen,
      guidelineMenuOpen: false,
    }));
  }
  handleGuidelineMenuClick() {
    this.setState(prev => ({
      menuOpen: false,
      userMenuOpen: false,
      guidelineMenuOpen: !prev.guidelineMenuOpen,
    }));
  }

  handleClickOutside(event) {
    if (this.headerMenuRef) {
      if (
        this.headerMenuRef.current == event.target ||
        this.headerMenuRef.current.contains(event.target)
      ) {
        this.setState(prev => ({
          menuOpen: true,
          userMenuOpen: false,
          guidelineMenuOpen: false,
        }));
        return;
      }
    }
    if (this.userMenuRef) {
      if (
        this.userMenuRef.current == event.target ||
        this.userMenuRef.current.contains(event.target)
      ) {
        this.setState(prev => ({
          menuOpen: false,
          userMenuOpen: true,
          guidelineMenuOpen: false,
        }));
        return;
      }
    }
    if (this.guidelineMenuRef) {
      if (
        this.guidelineMenuRef.current == event.target ||
        this.guidelineMenuRef.current.contains(event.target)
      ) {
        this.setState(prev => ({
          menuOpen: false,
          userMenuOpen: false,
          guidelineMenuOpen: true,
        }));
        return;
      }
    }
    this.setState(prev => ({
      menuOpen: false,
      userMenuOpen: false,
      guidelineMenuOpen: false,
    }));
  }
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }

  render() {
    const {
      rootUrl,
      onSearchRequest,
      loginButtonInfo,
      userName,
      previewButtonInfo,
    } = this.props;
    const thisHostname = location.protocol + '//' + location.host;
    return (
      <header
        className={`${styles.header} ${
          this.state.menuOpen ? styles.navOpen : ''
        }`}
      >
        <div className={styles.headerTop}>
          <div className={styles.container}>
            <HeaderLink rootUrl={rootUrl} className={styles.logoLink}>
              <img src={logo} title="ECRI Institute" alt="ECRI Institute" />
            </HeaderLink>
            <nav ref={this.headerMenuRef}>
              <ul>
                <li>
                  <HeaderLink
                    rootUrl={rootUrl}
                    sectionSlug="about"
                    desc="About us"
                  />
                </li>
                <li>
                  <HeaderLink
                    rootUrl={rootUrl}
                    sectionSlug="press"
                    desc="News"
                  />
                </li>
                <li>
                  <HeaderLink
                    rootUrl={rootUrl}
                    sectionSlug="events"
                    desc="Events"
                  />
                </li>
                <li>
                  <a href={`${rootUrl}/pages/contactus.aspx`} aria-label="Contact Us">Contact Us</a>                 
                </li>
                <li>
                  <a
                    onClick={loginButtonInfo.onClick}
                    className={styles.loginButton}
                    data-overlay="login"
                    aria-label="Login"
                  >
                    {loginButtonInfo.fullText}
                  </a>
                </li>
              </ul>
            </nav>
            <a
              className={`${styles.mobileButton} ${styles.topButton}`}
              onClick={loginButtonInfo.onClick}
              data-overlay="login"
              aria-label="Login"
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              <br />
              {loginButtonInfo.mobileText}
            </a>
            <a
              className={`${styles.mobileButton} ${styles.topButton}`}
              onClick={e => this.handleMenuClick(e)}
              aria-label="Menu"
            >
              <FontAwesomeIcon icon={this.state.menuOpen ? faTimes : faBars} />
              <br />
              {this.state.menuOpen ? 'CLOSE' : 'MENU'}
            </a>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <div
            className={`${styles.navbar} ${styles.navbarDark} ${
              styles.navbarContainer
            }`}
          >
            <a
              className={`${styles.navbarMenuButton}`}
              href="JavaScript:void(0);"
              onClick={e => this.handleGuidelineMenuClick(e)}
              aria-label="Guidelines Menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </a>

            <Link to="/" className={styles.navbarBrand} aria-label="Guidelines Trust">
              <h3 className={styles.brandHeading}>
                Guidelines Trust <sup className={styles.trademark}>&trade;</sup>
              </h3>
            </Link>

            <div
              className={
                userName === ''
                  ? styles.searchContainerHidden
                  : styles.searchContainerTop
              }
            >
              <SearchBar
                searchId="SearchDesktop"
                cxtClassName={'headerSearchBar'}
                onSearchRequest={sp => onSearchRequest(sp)}
              />
            </div>
            {userName &&
              userName !== '' && (
                <span className={styles.userGreeting}>
                  Hello <span className={styles.username}>{userName}</span>
                </span>
              )}
            <ul
              className={`${styles.nav} ${styles.navbarNav} ${
                styles.navFlexIcons
              }`}
              onClick={e => this.handleUserMenuClick(e)}
            >
              <li
                className={`${styles.navItem} ${styles.dropdown} ${
                  this.state.userMenuOpen ? styles.show : ''
                }`}
              >
                {userName !== '' && (
                  <a
                    className={`${styles.navLink} ${styles.dropdownToggle} ${
                      styles.navbarAccount
                    }`}
                    href="#"
                    id="navbar-account"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                    aria-label="User Avatar"
                  >
                    <img
                      className={styles.avatar}
                      alt="user avatar"
                      src={avatarDefaultImg}
                    />
                  </a>
                )}
                <div
                  id="userDropdown"
                  className={`${styles.dropdownMenu} ${
                    styles.dropdownMenuRight
                  } ${styles.dropdownInfo} ${
                    this.state.userMenuOpen ? styles.show : ''
                  }`}
                  aria-labelledby="userDropdown"
                  data-dropdown-in="fadeIn"
                  data-dropdown-out="fadeOut"
                  ref={this.userMenuRef}
                >
                  {previewButtonInfo.isPreviewUser && (
                    <div>
                      <span className={styles.dropdownDivider} />
                      <div className={styles.switch}>
                        <input
                          className={styles.switchInput}
                          id="previewSwitch"
                          type="checkbox"
                          checked={previewButtonInfo.isEnabled}
                          onClick={() =>
                            previewButtonInfo.onPreviewChange(
                              !previewButtonInfo.isEnabled
                            )
                          }
                          aria-label="Preview Switch"
                        />
                        <label
                          className={styles.switchLabel}
                          htmlFor="previewSwitch"
                        >
                          Preview Mode
                        </label>
                      </div>
                      <span className={styles.dropdownDivider} />
                      <Link
                        id="navbar-analytics-page"
                        className={`${styles.dropdownItem}`}
                        to={`/analytics`}
                        aria-label="Guideline Analytics"
                      >
                        Guideline Analytics
                      </Link>  
                      <span className={styles.dropdownDivider} />                    
                    </div>
                  )}
                  <a
                    id="navbar-static-profile"
                    className={`${styles.dropdownItem}`}
                    href={`${rootUrl}/pages/myecri.aspx`}
                    aria-label="My Account"
                  >
                    My Account
                  </a>
                  <a
                    id="navbar-static-logout"
                    className={`${styles.dropdownItem}`}
                    onClick={loginButtonInfo.onClick}
                    data-overlay="login"
                    aria-label={loginButtonInfo.fullText}
                  >
                    {loginButtonInfo.fullText}
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className={`${styles.container} ${styles.containerBottom}`}>
            <SearchBar
              searchId="SearchMobile"
              cxtClassName={'headerSearchBar'}
              onSearchRequest={sp => onSearchRequest(sp)}
            />
          </div>
        </div>
        <div className={styles.container}>
          <div
            id="headerMenu"
            className={
              this.state.menuOpen
                ? styles.headerMobile
                : styles.headerMobileClosed
            }
          >
            <nav ref={this.headerMenuRef}>
              <ul className={styles.mobileSub}>
                <li>
                  <HeaderLink
                    rootUrl={rootUrl}
                    sectionSlug="about"
                    desc="About Us"
                  />
                </li>
                <li>
                  <HeaderLink
                    rootUrl={rootUrl}
                    sectionSlug="press"
                    desc="News"
                  />
                </li>
                <li>
                  <HeaderLink
                    rootUrl={rootUrl}
                    sectionSlug="events"
                    desc="Events"
                  />
                </li>
                <li>
                  <a href={`${rootUrl}/pages/contactus.aspx`} aria-label="Contact Us">Contact Us</a>                 
                </li>
              </ul>
            </nav>
          </div>

          <div
            id="guidelineMenu"
            className={
              this.state.guidelineMenuOpen
                ? styles.guidelineMenu
                : styles.guidelineMenuClosed
            }
          >
            <nav ref={this.guidelineMenuRef}>
              <ul>
                <li>
                  <Link
                    className={styles.guidelineMenuItem}
                    to="/"
                    onClick={() => this.setState({ guidelineMenuOpen: false })}
                    aria-label="Home"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.guidelineMenuItem}
                    to="/about"
                    onClick={() => this.setState({ guidelineMenuOpen: false })}
                    aria-label="About Guidelines Trust"
                  >
                    About Guidelines Trust
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.guidelineMenuItem}
                    to="/inclusion-criteria"
                    onClick={() => this.setState({ guidelineMenuOpen: false })}
                    aria-label="Inclusion Criteria"
                  >
                    Inclusion Criteria
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.guidelineMenuItem}
                    to="/about-trust-scorecard"
                    onClick={() => this.setState({ guidelineMenuOpen: false })}
                    aria-label="TRUST Scorecard"
                  >
                    TRUST Scorecard
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.guidelineMenuItem}
                    to="/search-tips"
                    onClick={() => this.setState({ guidelineMenuOpen: false })}
                    aria-label="Search Tips"
                  >
                    Search Tips
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.guidelineMenuItem}
                    to="/ask-us"
                    onClick={() => this.setState({ guidelineMenuOpen: false })}
                    aria-label="FAQs"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.guidelineMenuItem}
                    to="/fda-notices"
                    onClick={() => this.setState({ guidelineMenuOpen: false })}
                    aria-label="FDA Notices"
                  >
                    FDA Notices
                  </Link>
                </li>
                
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  rootUrl: PropTypes.string.isRequired,
  onSearchRequest: PropTypes.func,
  userName: PropTypes.string,
  loginButtonInfo: PropTypes.shape({
    fullText: PropTypes.string.isRequired,
    mobileText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

Header.defaultProps = {
  onSearchRequest: () => {},
  loginButtonInfo: {
    userName: '',
    mobileText: 'LOGIN',
    fullText: 'Log In',
    onClick: () => console.log('login clicked'),
  },
  previewButtonInfo: {
    isEnabled: true,
    isPreviewUser: true,
    onPreviewChange: val => console.log(`Preview mode changed to ${val}`),
  },
};

export default Header;
