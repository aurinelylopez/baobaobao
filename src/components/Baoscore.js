import React, { Component } from 'react';
import PropTypes from 'prop-types';


  function BaoScore(props) {
    return (
      <div className="BaoScore">
        Question <span>{props.counter}</span> of <span>5</span>
      </div>
    );
  }

  BaoScore.propTypes = {
    counter: PropTypes.number,
    total: PropTypes.number,
  };

  export default BaoScore;