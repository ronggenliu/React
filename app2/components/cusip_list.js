import React from 'react';
import Cusips from './cusips';
/*
  Represents a list of cusips
*/
 
const CusipList = (props) => {
  // for each element of 'cusips', a function  gets called with a single cusip
  const cusipListItems = props.cusips.map((cusip) => {
      return  <Cusips key={cusip.id} cusip={cusip.cusip}/>
    });
 
  return (
    // references jsx item cusipListItems
    <select size="5"  onClick={event => props.onCusipSelect(event.target.value)} className='cusip-select' >{cusipListItems}</select>
  );
};
 
export default CusipList;