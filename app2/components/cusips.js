import React from 'react';
 
/*
  Represents a list of cusips
*/
const Cusips = (props) => {
    return <option key={props.id}>{props.cusip}</option>
    }
 
export default Cusips;