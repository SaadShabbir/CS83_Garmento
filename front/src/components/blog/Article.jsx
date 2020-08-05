import React from 'react';
import { Link } from 'react-router-dom';

const images = require.context('../../assets/img', true);

const article = props => {
  let img = images('./' + props.imageName);

  return (
    <>
      <article className="blog__item" onClick={props.clicked}>
        <div className="blog__item__image">
          <Link to="/">
            <img src={img} alt={props.title} />
          </Link>
        </div>
        <Link to="/" className="blog__item__title">
          {props.title}
        </Link>
        <div className="blog__item__meta">{props.meta}</div>
      </article>
    </>
  );
};

export default article;
