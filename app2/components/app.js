import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Promise from 'es6-promise';

import SearchBar from './search_bar';
import CusipList from './cusip_list';
import SwapDetail from './swap_detail';
import VISDetail from './vis_detail';


const SWAP_CUSIP_API = 'http://localhost:3000/';
const SWAP_SEARCH_API  = 'http://vmw7-i-tech082:9000/RDS/rest/API/getSecurities/';
const SWAP_DETAIL_API  = 'http://vmw7-i-tech082:9000/RDS/rest/API/getSwapData/';

//'http://vmw7-i-tech082:9000/RDS/rds/API/getSecurities/CDSC';
//http://localhost:3000/api/';

/*
  Parent component for SME app
*/
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {cusips: [], swap: null, sched: []};

    this.cusipSearch = this.cusipSearch.bind(this);
    this.swapSearch = this.swapSearch.bind(this);
    this.swapSave = this.swapSave.bind(this);
    this.loadVIS = this.loadVIS.bind(this);
    this.createTable = this.createTable.bind(this);
  }

  /*
    Call the SME backend to get list of cusips
  */
  cusipSearch(term){
    //Build request url
    const url = `${SWAP_CUSIP_API}cusips/${term}`;
//    const url = `${SWAP_CUSIP_API}cusips`;
      // const url = `${SWAP_SEARCH_API}${term}`;

    const header = 'crossDomain: true';

    //make the request

    const request = axios.get(url, header)
      .then((response) => {
        console.log(response.data);
      //  cusips = response.data;
      //scusips: [];
        //setting state will trigger all components to rerender themselves
        this.setState({cusips:[response.data]});
        //this.setState({cusips: this.state.cusips.concat(response.data)});
      //  this.setState({cusips: response.data});
      })
      .catch((response) => {
        this.setState({cusips: [], swap: {}, sched: {}});
        console.log("Error fetching cusips!");
        console.log(response);
      });
  }


  /*
    Call the SME backend to get Swap from selected cusip
  */
  swapSearch(cusip){

    //Build request url
    const url = `${SWAP_CUSIP_API}security/${cusip}`;
  //  const url = `${SWAP_DETAIL_API}${cusip}`;

    //make the request
    const request = axios.get(url)
      .then((response) => {
        //setting state will trigger all components to rerender themselves
        this.setState({swap: response.data});
        console.log(response);
      })
      .catch((response) => {
        //clear the swap detail if search fails
        this.setState({swap: {}});

        console.log("Error fetching Swap Details!");
        console.log(response);
      });
  }

  /*
    Call the SME backend to update the swap
  */
  swapSave(swap){

    if(swap == null){
      this.setState({swap: null});
        return;
    }
    //Build request url
    const url = `${SWAP_CUSIP_API}security/${swap.id}`;

    //make the request
    const request = axios.put(url, swap)
      .then((response) => {
        //setting state will trigger all components to rerender themselves
        this.setState({swap: response.data});

      })
      .catch((response) => {
        console.log("Error Saving Security!");
        console.log(response);
      });
  }

createTable(sched){
  console.log('create table');
  return
  <BootstrapTable data={ this.state.sched }>
      <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
  </BootstrapTable>
}
  /*
    Call the SME backend to get schedule for selected cusip
  */
  loadVIS(swap){

    //Build request url
    const url = `${SWAP_CUSIP_API}vis/${this.state.swap.id}`;
    console.log('Inside loadVIS');

    console.log(url);
    //make the request
    const request = axios.get(url)
      .then((res) => {
        console.log(res.data);
        //setting state will trigger all components to rerender themselves
        this.setState({sched: [res.data]});
    //    createTable(sched);

      })
      .catch((response) => {
        //clear the sched detail if search fails
        this.setState({sched: []});
        console.log("Error fetching Schedule!");
        console.log(res);
      });
  }

render() {

    return (
      <div>
        <div className='sme-header'>SME PoC</div>
        <SearchBar onSearchTermChange={term => this.cusipSearch(term)} />
        <CusipList cusips={this.state.cusips} onCusipSelect={cusip => this.swapSearch(cusip)}/>
        <SwapDetail swap={this.state.swap} onSwapSave={swap => this.swapSave(swap)} />
        <VISDetail  swap={this.state.swap} sched={this.state.sched} onLoadVis={swap => this.loadVIS(swap)} />
      </div>
    );
  }
}
