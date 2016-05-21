import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
 
/*
  Swap detail used to display and edit swaps
*/
class VISDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {swap: {}, sched: {}};
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
 
  /*
    Sets the intial state of this component using the passed in props
  */
  componentWillReceiveProps (props) {
    if(props.sched == null){
      return;
    }
  }
 
  onFormSubmit(event){
    event.preventDefault();
  }
 
  render(){
    return (
 
      <div>
      <div className='label-header'>VIS Detail</div>
      <form className="tableHeader" onSubmit={this.onFormSubmit} >
      <div className="form-group">
        <BootstrapTable   data={this.props.sched} striped={true} hover={true}>
          <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>Cusip ID</TableHeaderColumn>
          <TableHeaderColumn dataField="startDate" dataSort={true}>Start Date</TableHeaderColumn>
          <TableHeaderColumn dataField="fixingDate" dataSort={true}>Fixing Date</TableHeaderColumn>
          <TableHeaderColumn dataField="endDate" dataSort={true}>End Date</TableHeaderColumn>
          <TableHeaderColumn dataField="paySw" dataSort={true}>Pay Sw</TableHeaderColumn>
          <TableHeaderColumn dataField="rate" dataSort={true}>Rate</TableHeaderColumn>
          <TableHeaderColumn dataField="spread" dataSort={true}>Spread</TableHeaderColumn>
        </BootstrapTable>
          </div>
        <button onClick={() => this.props.onLoadVis(null) }className="btn btn-primary pull-xs-right swap-detail-button">Get VIS</button>
      </form>
      </div>
    );
  }
}
 
export default VISDetail;