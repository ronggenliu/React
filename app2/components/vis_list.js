import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
 
const VisList = (props) => {
  if(props.sched == null){
    return;
  }
  console.log("inside vislist")
  const items = props.sched.map((sched) => {
    return  <option>
    key={sched.id}
    cusip={sched.cusip}
    </option>
  });
 
  return (
    <li>{items}</li>
);
};
 
 
export default VisList;