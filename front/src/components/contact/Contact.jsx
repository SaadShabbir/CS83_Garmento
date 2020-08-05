import React from 'react';
import ContactForm from './ContactForm';
import '../../CSS/contact/Contact.css';

const contact = () => (
  <>
    <div className="contact">
      <div className="contact__inner">
        <h1 className="contact__inner__title">Contact</h1>
        <div className="contact__inner__text">
          Use the form. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus,
          tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
          massa justo sit amet risus. Morbi leo risus, porta ac consectetur ac,
          vestibulum at eros.
        </div>
        <div className="contact__inner__form">
          <ContactForm />
        </div>
      </div>
    </div>
  </>
);

export default contact;
