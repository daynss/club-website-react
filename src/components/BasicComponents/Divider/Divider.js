import React from 'react';

const Divider = ({horizontal = false}) =>
    <div className={horizontal ? "divider-horizontal" : "divider-vertical"}/>;

export default Divider;
