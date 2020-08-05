import React from 'react';
import '../../CSS/tailor/Tailor.css';
import TailorForm from './TailorForm';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

const img1 = require('../../assets/img/shirt_kurta.png');
const img2 = require('../../assets/img/salwar_suite.png');
const img3 = require('../../assets/img/salwar.png');
const img4 = require('../../assets/img/kids_wear.png');
const img5 = require('../../assets/img/convenience.svg');
const img6 = require('../../assets/img/Professional designing & tailoring experience.svg');
const img7 = require('../../assets/img/freepickup_&_delivery.svg');

const Tailor = () => (
  <>
    <div className="container-fluid contact">
      <div className="row">
        <div className="col-12 contact__inner">
          <h1 className="contact__inner__title">
            Stitching And Alteration Services <br />
            At Your Doorstep
          </h1>
          <h4>Get your dream dress stitched by professional tailors</h4>
          <h5>
            We are now taking orders for stitching and alteration in Lahore
          </h5>
          <div className="row justify-content-center buttonrow">
            <Link to={`/tailor`} className="nav__ul__item__link">
              <button
                className="black-white-button buttonStyle"
                type="submit"
                onClick={console.log('HI')}
              >
                Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div class="home-about-wrapper">
      <div class="container home-about-container">
        <div class="box-info">
          <p>
            StitchtoFit is a young, professional and state of the art online
            tailoring factory that aims at providing an unparalleled and hassle
            free tailoring experience to the customers at affordable prices with
            free pickup and delivery services.
          </p>
        </div>
      </div>
    </div>

    <div class="white-bg-holder" id="how-it-works">
      <span class="how-it-work-title"> How it Works </span>
      <div class="container work-holder-box">
        <div class="row">
          <div class="col-sm-3 column mouse-img">
            <span class="work-title">
              Place Your
              <br />
              Order
            </span>
            <p>
              Place your order online or give us a call to schedule a free
              pickup
            </p>
          </div>
          <div class="col-sm-3 column kurta-img">
            <span class="work-title">
              Provide your Dress
              <br />
              Material
            </span>
            <p>
              Handover your unstitched fabric and a measurement garment to our
              representative
            </p>
          </div>
          <div class="col-sm-3 column machine-img">
            <span class="work-title">
              Stitched &amp; Delivered by
              <br />
              Stitch to Fit
            </span>
            <p>
              Your dress will be stitched by our expert tailors and delivered at
              your doorstep within 7 days
            </p>
          </div>
          <div class="col-sm-3 column pay-delivery-img">
            {' '}
            <span class="work-title">
              Pay on
              <br />
              Delivery
            </span>
            <p>
              Pay in cash upon receiving your newly stitched dress and sample
              garment
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="services-wrapper" id="services">
      <div class="container services-container">
        <span class="services-title">Stitching Services</span>
        <p class="sub_heading">Get Your Dream Dress At Your Doorstep</p>

        <div className="row">
          <div class="col-3 card">
            <img class="card-img-top" src={img1} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">Shalwar</h5>
              <p class="card-text">Rs.3000</p>
              <div className="row justify-content-center buttonrow">
                <Link to={`/tailor`} className="nav__ul__item__link">
                  <button
                    className="black-white-button buttonStyle"
                    type="submit"
                  >
                    Book
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="col-3 card">
            <img class="card-img-top" src={img2} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">Shalwar/Suit</h5>
              <p class="card-text">Rs.3600</p>
              <div className="row justify-content-center buttonrow">
                <Link to={`/tailor`} className="nav__ul__item__link">
                  <button
                    className="black-white-button buttonStyle"
                    type="submit"
                  >
                    Book
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="col-3 card">
            <img class="card-img-top" src={img3} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">Shirt/Kurta</h5>
              <p class="card-text">Rs.2000</p>
              <div className="row justify-content-center buttonrow">
                <Link to={`/tailor`} className="nav__ul__item__link">
                  <button
                    className="black-white-button buttonStyle"
                    type="submit"
                  >
                    Book
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="col-3 card">
            <img class="card-img-top" src={img4} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">Kids Wear</h5>
              <p class="card-text">Rs.3200</p>
              <div className="row justify-content-center buttonrow">
                <Link to={`/tailor`} className="nav__ul__item__link">
                  <button
                    className="black-white-button buttonStyle"
                    type="submit"
                  >
                    Book
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="why-us-wrapper" id="why-us">
      <div class="container why-us-container">
        <span class="why-us-title">Why Stitch to Fit?</span>
        <div class="why-us-inner">
          <div class="row">
            <div class="col-md-1 col-sm-1 why-us-image">
              <img class="" src={img7} />
            </div>
            <div class="col-md-11 col-sm-11 why-us-text">
              <h3>Professional designing & tailoring experience</h3>
              <p>
                Our highly skilled and professional tailors have years of
                experience of making custom made dresses with the trendiest
                designs for men, women and children alike. Our experts work
                closely with the customers to ensure that they get to enjoy
                perfectly fitting dresses having the best and latest designs.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-1 col-sm-1 why-us-image">
              <img class="" src={img6} />
            </div>
            <div class="col-md-11 col-sm-11 why-us-text">
              <h3>Free pickup & timely delivery</h3>
              <p>
                Your dress material and the sample garment that fits you
                perfectly will be picked up by our representative as soon as you
                place an order. Your custom tailored outfit and the sample
                garment will be properly packaged and securely delivered at your
                doorstep within 7 days. You will avail both pickup and delivery
                services for free.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-1 col-sm-1 why-us-image">
              <img class="" src={img5} />
            </div>
            <div class="col-md-11 col-sm-11 why-us-text">
              <h3>Convenience</h3>
              <p>
                Enjoy a hassle free experience of getting your desired outfit
                stitched and delivered at your doorstep. With Stitch to Fit,
                your dream dress is just a phone call away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Tailor;
