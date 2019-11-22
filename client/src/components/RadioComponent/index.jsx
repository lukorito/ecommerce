import React from 'react';
import PropTypes from 'prop-types';
import './radio-selector.scss';

const RadioComponent = ({ options, selected, onChange, name }) => {
  return (
    <div className="radio-button-container">
      {options.map((item, index) => (
        <label key={index}>
          <input
            type="radio"
            name={name}
            value={item}
            key={index}
            checked={selected === item}
            onChange={onChange} />
          {name === 'color' ? <span style={{background: item, padding: '15px 0 15px 0',  }} /> : <span>{item}</span>}
        </label>
      ))}
    </div>
  );
};


RadioComponent.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

RadioComponent.defaultProps ={
  options: []
};


export default RadioComponent;
