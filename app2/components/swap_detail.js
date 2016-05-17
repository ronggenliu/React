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
      fpmlType : props.swap.fpmlType,
      compSecTypeCode : props.swap.compSecTypeCode
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
      fpmlType  : (event.target.name == 'fpmltype' ? event.target.value : this.state.swap.fpmlType),
      compSecTypeCode  : (event.target.name == 'compsectypecode' ? event.target.value : this.state.swap.compSecTypeCode),
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
      return <div className="sme-swap-detail-title">Swap Details</div>;
    }
    return (
      <div>
        <div className='sme-header'>Swap detail: {this.props.swap.id}</div>
        <form onSubmit={this.onFormSubmit} >

        <div className="form-group">
        <table className="table table-condensed">
            <tbody>
                <tr className="col-xs-2 col-md-8">
                <td colSpan="7">Comp Sec Type Code</td>
                <td colSpan="7"> <input name='compsectypecode' placeholder={this.state.swap.compSecTypeCode}
                  onChange={this.onChange}
                  value={this.state.swap.compSecTypeCode}
                  className="form-control"/></td>
                  <td colSpan="7">Effective Date </td>
                  <td colSpan="7"> <input name='effectivedt' placeholder={this.state.swap.effectivedt}
                    onChange={this.onChange}
                    value={this.state.swap.effectivedt}
                    className="form-control"/></td>
                  <td colSpan="7">Description:</td>
                  <td colSpan="7"><input name='description' placeholder={this.props.swap.description}
                    onChange={this.onChange}
                    value={this.state.swap.description}
                    className="form-control"/></td>
                    <td colSpan="7">Pay Frequency</td>
                    <td colSpan="7"><input name='payfreq' placeholder= {this.state.swap.payfreq}
                    onChange={this.onChange}
                    value= {this.state.swap.payfreq}
                    className="form-control"/></td>
                </tr>
                <tr className="col-xs-2 col-md-8">
                  <td colSpan="7">First Payment Date </td>
                  <td colSpan="7">
                  <input name='firstpmtdt' placeholder={this.state.swap.firstpmtdt}
                    onChange={this.onChange}
                    value={this.state.swap.firstpmtdt}
                    className="form-control"/></td>
                  <td colSpan="7">Coupon:</td>
                  <td colSpan="7"><input name='coupon' placeholder={this.props.swap.coupon}
                  onChange={this.onChange}
                  value={this.state.swap.coupon}
                  className="form-control"/></td>
                  <td colSpan="7">Reset Frequency</td>
                  <td colSpan="7"><input name='resetfreq' placeholder= {this.state.swap.resetfreq}
                  onChange={this.onChange}
                  value= {this.state.swap.resetfreq}
                  className="form-control"/></td>
                </tr>
                <tr className="col-xs-2 col-md-8">
                  <td colSpan="7"> Maturity Date </td>
                  <td colSpan="7"><input name='maturitydt' placeholder= {this.state.swap.maturitydt}
                  onChange={this.onChange}
                  value={this.state.swap.maturitydt}
                  className="form-control"/>
                </td>
                <td colSpan="7">Currency Settle</td>
                <td colSpan="7"><input name='currsettle' placeholder= {this.state.swap.currsettle}
                  onChange={this.onChange}
                  value={this.state.swap.currsettle}
                  className="form-control"/>
                </td>
                </tr>
                </tbody>
          </table>
          </div>
          <button  onClick={() => this.props.onSwapSave(null) } className="btn btn-primary btn-danger pull-xs-right swap-detail-button">Cancel</button>
          <button type="submit" className="btn btn-primary pull-xs-right swap-detail-button">Save</button>
        </form>
      </div>
    );
  }
}

export default SwapDetail;
