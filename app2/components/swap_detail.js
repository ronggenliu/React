import React, { Component } from 'react';
 
/*
  Swap detail used to display and edit swaps
*/
class SwapDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {swap: {}};
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
 
  }
 
  /*
    Sets the intial state of this component using the passed in props
  */
  componentWillReceiveProps (props) {
    if(props.swap == null){
      return;
    }
    this.setState({swap : {
      id :props.swap.id,
      coupon : props.swap.coupon,
      description : props.swap.description,
      effectivedt : props.swap.effectivedt,
      firstpmtdt : props.swap.firstpmtdt,
      maturitydt : props.swap.maturitydt,
      payfreq : props.swap.payfreq,
      resetfreq : props.swap.resetfreq,
      currsettle : props.swap.currsettle,
      fpmltype : props.swap.fpmltype,
      compsectypecode : props.swap.compsectypecode
     }});
  }
 
  onChange(event){
    const updatedSwap = {
      effectivedt :  (event.target.name == 'effectivedt' ? event.target.value : this.state.swap.effectivedt),
      firstpmtdt  :  (event.target.name == 'firstpmtdt' ? event.target.value : this.state.swap.firstpmtdt),
      maturitydt  : (event.target.name == 'maturitydt' ? event.target.value : this.state.swap.maturitydt),
      description : (event.target.name == 'description' ? event.target.value : this.state.swap.description),
      coupon      : (event.target.name == 'coupon' ? event.target.value : this.state.swap.coupon),
      payfreq     : (event.target.name == 'payfreq' ? event.target.value : this.state.swap.payfreq),
      resetfreq   : (event.target.name == 'resetfreq' ? event.target.value : this.state.swap.resetfreq),
      currsettle  : (event.target.name == 'currsettle' ? event.target.value : this.state.swap.currsettle),
      fpmltype  : (event.target.name == 'fpmltype' ? event.target.value : this.state.swap.fpmltype),
      compsectypecode  : (event.target.name == 'compsectypecode' ? event.target.value : this.state.swap.compsectypecode),
      id          : this.state.swap.id
    }
 
 
 
    this.setState({swap: updatedSwap});
  }
 
  onFormSubmit(event){
    event.preventDefault();
 
    //calls method on the parent with the updated swap information
    this.props.onSwapSave(this.state.swap);
 
    //calls method on the parent to load VIS
//    this.props.onLoadVis(this.state.swap);
  }
 
  render(){
    if(this.props.swap == null){
      return <div className="sme-swap-detail-title"></div>;
    }
    return (
      <div>
        <div className='label-header'>Swap detail: {this.props.swap.id}</div>
        <form onSubmit={this.onFormSubmit} >
        <button onClick={() => this.props.onSwapSave(null) } className="btn btn-primary pull-xs-right swap-detail-button">Cancel</button>
        <button type="submit" className="btn btn-primary pull-xs-right swap-detail-button">Save</button>
 
        <div className="form-group">
        <table className="table table-condensed">
            <tbody>
                <tr>
                  <td className="fieldLabelLink">Effective Date </td>
                  <td> <input name='effectivedt' placeholder={this.state.swap.effectivedt}
                    onChange={this.onChange}
                    value={this.state.swap.effectivedt}
                    className="form-control"/></td>
                  <td className="fieldLabelLink">Description:</td>
                  <td><input name='description' placeholder={this.props.swap.description}
                    onChange={this.onChange}
                    value={this.state.swap.description}
                    className="form-control"/></td>
                  <td className="fieldLabelLink">Pay Frequency</td>
                  <td><select className="inputFieldText" name='payfreq'>
                      <option value = "Monthly">Monthly</option>
                      <option value = "Quarterly">Quarterly</option></select>
                    </td>
                </tr>
                <tr>
                <td className="fieldLabelLink">First Payment Date </td>
                  <td>
                  <input name='firstpmtdt' placeholder={this.state.swap.firstpmtdt}
                    onChange={this.onChange}
                    value={this.state.swap.firstpmtdt}
                    className="form-control"/></td>
                  <td className="fieldLabelLink">Coupon:</td>
                  <td><input name='coupon' placeholder={this.props.swap.coupon}
                  onChange={this.onChange}
                  value={this.state.swap.coupon}
                  className="form-control"/></td>
                  <td className="fieldLabelLink">Reset Frequency</td>
                  <td><select className="inputFieldText" name='payfreq'>
                    <option value = "Monthly">Quarterly</option>
                    <option value = "Quarterly">Monthly</option></select>
                  </td>
                </tr>
                <tr>
                  <td className="fieldLabelLink"> Maturity Date </td>
                  <td><input name='maturitydt' placeholder= {this.state.swap.maturitydt}
                  onChange={this.onChange}
                  value={this.state.swap.maturitydt}
                  className="form-control"/>
                </td>
                <td className="fieldLabelLink">Comp Sec Type Code</td>
                <td><input name='compsectypecode' placeholder= {this.state.swap.compsectypecode}
                  onChange={this.onChange}
                  value={this.state.swap.compsectypecode}
                  className="form-control"/>
                </td>
                <td className="fieldLabelLink">Fpml Type</td>
                <td><input name='fpmltype' placeholder= {this.state.swap.fpmltype}
                  onChange={this.onChange}
                  value={this.state.swap.fpmltype}
                  className="form-control"/>
                </td>
              </tr>
                </tbody>
          </table>
          </div>
        </form>
      </div>
    );
  }
}
 
export default SwapDetail;