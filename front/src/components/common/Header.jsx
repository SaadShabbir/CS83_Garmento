import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../CSS/common/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TailorForm from "../Tailor/TailorForm";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
      isLoading: false,
      nav : []
    };
  }
  componentDidMount() {
    fetch('http://localhost:5000/api/admin/get_nav')
        .then((res) => res.json())
        .then((json) => {
            console.log("Item get in offer",json);
            this.setState({ nav: json });
            // setTimeout(() => {
            // this.setState({ items: json });
            // }, 3000)
        })
        .catch((err) => console.log(err));
}
  handleSignOut = () => { 
    this.setState({ isLoading: true });
    const user = null;
    localStorage.removeItem("user");
    setTimeout(() => this.setState({ user, isLoading: false }), 1000);
    window.location = `/login`;
  };

  render() {
    const { user, isLoading, nav } = this.state;
    return (
      <header className="header">
        <div className="top_bar clearfix"> 
          <ul className="social_icons"> 
            <li>
              <a href="https://www.facebook.com/btwpakistan" title="Facebook" target="_blank" className="icon-facebook">
              <i className="fa fa-facebook"></i>
              </a>
            </li> 
            <li>
              <a href="https://www.youtube.com/channel/UCf4a6keFRV7B9zZDvlVVMNw" title="YouTube"  target="_blank" className="icon-youtube">
              <i className="fa fa-youtube"></i></a>
            </li> 
            <li>
              <a href="https://www.instagram.com/btwpakistan/" title="Instagram" target="_blank" className="icon-instagram"><i className="fa fa-instagram"></i></a>
            </li> 
          </ul> 
          <ul className="menu left"> 
            <li><a href="tel:+923004022474">+92 300 4022474</a></li>
          </ul> 
          <ul className="menu right">
            <li> 
              <div className="header__inner__cart-login">
                {user && !user.isAdmin && user.userType == "user" ? (
                  <div className="header__inner__cart">
                    <Link to="/user/cart">
                      <FontAwesomeIcon icon="shopping-cart" />
                    </Link>
                  </div>
                ) : null}
                <div className="header__inner__login-controls">
                  {isLoading ? (
                    <FontAwesomeIcon icon="spinner" spin />
                  ) : user ? (
                    user.isAdmin || user.userType == "seller" ? (
                      <>
                        <Link to={`/admin`}>
                          <FontAwesomeIcon icon="user" className="profile-icon" />
                        </Link>
                        <div className="sign-in-out-block">
                          <FontAwesomeIcon
                            icon="sign-out-alt"
                            className="sign-out-icon"
                            onClick={this.handleSignOut}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="userProfile-icon__div">
                          <Link to={`/user/profile`}>
                            <FontAwesomeIcon
                              icon="user"
                              className="profile-icon"
                            />
                          </Link>
                        </div>

                        <div
                          onClick={this.handleSignOut}
                          className="sign-in-out-block"
                        >
                          <FontAwesomeIcon
                            icon="sign-out-alt"
                            className="sign-out-icon"
                          />
                        </div>
                      </>
                    )
                  ) : (
                    <div>
                      <Link to={`/login`} className="sign-in-out-block">
                        <FontAwesomeIcon
                          icon="sign-in-alt"
                          className="sign-out-icon"
                        />
                        <span className="sign-in">Sign in</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="header__inner--wrapper">
          <div className="header__inner">
          {/* <div className="header__inner__logo">
              
            </div> */}
            <nav class="navbar navbar-expand-lg" style={{width: '100%'}}>

              <a class="navbar-brand" href="/"><img
                src={"../../images/logo.png"}
                alt="BRINE"
                className="header__inner__logo--img"
              /></a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="main_nav">

            <ul class="nav__ul ml-auto">
              <li className="nav-item">
                  <Link to={`/`} className="nav__ul__item__link">
                    Home
                  </Link>
                </li>
              { nav.length > 0 &&
                nav.map((list, index) => (
                  <li class="nav-item dropdown">
                    <a class="dropdown-toggle nav__ul__item__link" href={`/shop/category/${list.id}`} data-toggle="dropdown" aria-expanded="false">  {list.name}  </a>
                      {list.items.length > 0 && 
                        <ul class="dropdown-menu">
                          {list.items.map((list2, index2) => (
                            <li><a class="dropdown-item" href={`/shop/subcategory/${list2.id}`}> {list2.name} {list2.subitems.length > 0 ? '»' : ''} </a>
                              {list2.subitems.length > 0 &&
                                <ul class="submenu">
                                  {list2.subitems.map((list3, index3) => (
                                    <li><a class="dropdown-item" href={`/shop/subsubcategory/${list3.id}`}>{list3.name}</a></li>
                          ))}
                                </ul>
                              }
                            </li>
                          ))}
                        </ul>
                      }
                  </li>
                ))
              }
               <li>
                  <Link to={`/wholesale`} className="nav__ul__item__link">
                    WholeSaler
                  </Link>
                </li>
                <li>
                  <Link to={`/tailors`} className="nav__ul__item__link">
                    Tailor
                  </Link>
                </li>
                <li>
                  <Link to={`/contact`} className="nav__ul__item__link">
                    Contact
                  </Link>
                </li>
            </ul>

              </div>

            </nav>
            {/* <nav className="nav">
              <ul className="nav__ul">
                <li >
                  <Link to={`/`} className="nav__ul__item__link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={`/shop`} className="nav__ul__item__link">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to={`/wholesale`} className="nav__ul__item__link">
                    WholeSalerxss
                  </Link>
                </li>
                <li>
                  <Link to={`/tailors`} className="nav__ul__item__link">
                    Tailor
                  </Link>
                </li>
                <li>
                  <Link to={`/contact`} className="nav__ul__item__link">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav> */}
        
            
          </div>
          <div className="dropdown-menu">
              <nav className="nav visible">
                <ul className="nav__ul">
                  <li className="nav__ul__item">
                    <Link to={`/`} className="nav__ul__item__link">
                      Home
                    </Link>
                  </li>
                  <li className="nav__ul__item">
                    <Link to={`/shop`} className="nav__ul__item__link">
                      Shop
                    </Link>
                  </li>
                  <li className="nav__ul__item">
                    <Link to={`/blog`} className="nav__ul__item__link">
                      Blog
                    </Link>
                  </li>
                  <li>
                  <Link to={`/tailor`} className="nav__ul__item__link">
                    Tailor
                  </Link>
                </li>
                  <li className="nav__ul__item">
                    <Link to={`/contact`} className="nav__ul__item__link">
                      Contact
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

export default Header;
