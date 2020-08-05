import React from 'react';

import '../../CSS/blog/Paging.css';

const paging = props => (
  <div className="pager">
    <div className="pager__inner">
      <div className="pager__inner--prev">
        <span onClick={props.prev}>Prev</span>
      </div>
      <div className="pager__inner--next">
        <span onClick={props.next}>Next</span>
        <h3>{props.title}</h3>
      </div>
    </div>
  </div>
);

export default paging;
