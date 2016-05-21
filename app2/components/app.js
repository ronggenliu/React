import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Promise from 'es6-promise';
 
import SearchBar from './search_bar';
import CusipList from './cusip_list';
import SwapDetail from './swap_detail';
import VISDetail from './vis_detail';
 
 
const SWAP_CUSIP_API = 'http://localhost:8080/RDS/rest/';
 
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
  }
 
  /*
    Call the SME backend to get list of cusips
  */
  cusipSearch(term){
    //Build request url
   const url = `${SWAP_CUSIP_API}cusips/${term}`;
 
    const header = 'crossDomain: true';
    console.log(url);
    //make the request
 
    const request = axios.get(url, header)
      .then((response) => {
        console.log(response.data);
        //setting state will trigger all components to rerender themselves
        console.log("Response from cusip search");
        this.setState({cusips: response.data});
        console.log(response);
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
  console.log(url);
 
    //make the request
    const request = axios.get(url)
      .then((response) => {
        //setting state will trigger all components to rerender themselves
        this.setState({swap: response.data});
        console.log("Response from swap detail search");
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
    console.log(url);
 
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
 
  /*
    Call the SME backend to get schedule for selected cusip
  */
  loadVIS(swap){
 
    //Build request url
    const url = `${SWAP_CUSIP_API}vis/${this.state.swap.id}`;
    console.log(url);
    //make the request
    const request = axios.get(url)
      .then((res) => {
       //setting state will trigger all components to rerender themselves
        this.setState({sched: res.data});
        console.log("Response from loadVIS");
        console.log(res);
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
      <div >
        <div className='sme-header' >Swap Maintenance Editor</div>
        <SearchBar onSearchTermChange={term => this.cusipSearch(term)} />
        <CusipList cusips={this.state.cusips} onCusipSelect={cusip => this.swapSearch(cusip)}/>
        <SwapDetail swap={this.state.swap} onSwapSave={swap => this.swapSave(swap)} />
        <VISDetail  swap={this.state.swap} sched={this.state.sched} onLoadVis={swap => this.loadVIS(swap)} />
      </div>
    );
  }
}