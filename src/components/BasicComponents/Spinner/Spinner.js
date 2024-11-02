import React from 'react';
import spinner from './spinner.gif';

const Spinner = () =>
    <div className="spinner-container">
        <img className="spinner-image" src={spinner} alt="loading"/>
    </div>;

export default Spinner;