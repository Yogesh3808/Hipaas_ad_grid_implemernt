import React from 'react';
import '../../containers/Files/files-styles.css';
import Urls from '../../../helpers/Urls';
import { getDetails } from '../../../helpers/getDetails';
export class Topbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
            files: [],
            tradingpartner: [],            
            Transaction:'',
        };
    }
    displayFile() {
        this.setState({ files: this.state.files });
    }
      handleChange(date){
        this.setState({
          startDate: date
        });
       
      };
      componentDidMount() {
        this.getData()
       

    }
 
      getData() {
        let transaction = ''

        this.props.flag == 2
        ?
        transaction="Enrollment834"
        :
        transaction="Claim837"
      
        getDetails(transaction)
        .then((tradingpartner) => {
            if(tradingpartner && tradingpartner.length > 0){
                this.setState({
                    tradingpartner: tradingpartner
                })
            }
        })
    }

    // getOptions() {
    //     let row = []
    
    //     this.state.tradingpartner.forEach(element => {
    //         row.push(<option value="">{element.Trading_Partner_Name}</option>)
    //     })
    //     return row
    // }
      changeDate(date1){
        this.setState({
            endDate: date1
        })
      }
      getOptions() {
        let row = []
       
        this.state.tradingpartner.forEach(element => {
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }
    render(){
        return(
            <div className="row">
                <div className="form-group col-3">
                    <label className="list-header">State</label>
                    <select className="form-control list-header" id="state">
                        <option value="">State</option>
                        <option selected="selected" value="1">California</option>
                        <option value="2">Michigan</option>
                        <option value="3">Florida</option>
                        <option value="4">New York</option>
                        <option value="5">Idaho</option>
                        <option value="6">Ohio</option>
                        <option value="7">Illinois</option>
                        <option value="8">Texas</option>
                        <option value="9">Mississippi</option>
                        <option value="10">South Carolina</option>
                        <option value="11">New Mexico</option>
                        <option value="12">Puerto Rico</option>
                        <option value="13">Washington</option>
                        <option value="14">Utah</option>
                        <option value="15">Wisconsin</option>
                    </select>
                </div>
                {
                    this.props.flag == 1
                    ?
                    ""
                // <div className="form-group col-3">
                //     <label className="list-header">Submitter</label>
                //     <select className="form-control list-header" id="TradingPartner" 
                //         onChange={(event) => {
                //             this.props.onSelect(event, 'selectedTradingPartner')
                //         }}>
                //         <option selected="selected" value="">Trading partner</option>
                //         {
                //             this.props.tradingpartner ? this.getOptions() : null
                //         }
                //     </select>
                // </div>
                :
                <div className="form-group col-3">
                <label className="list-header">{this.props.isOutbound==1? 'Sender': 'Submitter'}</label>
                <select className="form-control list-header" id="TradingPartner" 
                    // onChange={(event) => {
                    //     this.props.onSelect(event, 'selectedTradingPartner')
                    // }}
                    >
                    <option selected="selected" value="">Trading partner</option>
                    {
                         this.getOptions() 
                    }
                </select>
            </div>
                 
                 }

                {
                    this.props.flag == 1
                    ?
                    <div className="form-group col-3">
                        <label className="list-header">Transaction</label>
                        <select className="form-control list-header" id="option" onChange={this.props.onSelect}>
                            <option value="">Select Transaction</option>
                            <option value="Claims 837P Medicaid">Claims 837P Medicaid</option>
                            <option selected="selected" value="Claims 837I Medicaid">Claims 837I Medicaid</option>
                            <option value="Enrollments 834 Medicare">Enrollments 834 Medicare</option>
                        </select>
                    </div>
                    : 
                    <div className="form-group col-3">
                        <label className="list-header">Provider Name</label>
                        <select className="form-control list-header" id="ProviderName">
                            <option value="">Provider Name</option>
                            <option selected="selected" value="1">Provider Name 1</option>
                            <option value="2">Provider Name 2</option>
                        </select>
                    </div>
                }
                {
                    this.props.flag == 3
                    ?
                    <div className="form-group col-3">
                        <label className="list-header">Provider Name</label>
                        <select className="form-control list-header" id="ProviderName">
                            <option value="">Provider Name</option>
                            <option selected="selected" value="1">Provider Name 1</option>
                            <option value="2">Provider Name 2</option>
                        </select>
                    </div>
                    : null
                }
                
                {
                    this.props.flag == 3
                    ?
                    <div className="form-group col-3">
                        <label className="list-header">Provider Name</label>
                        <select className="form-control list-header" id="ProviderName">
                            <option value="">Provider Name</option>
                            <option selected="selected" value="1">Provider Name 1</option>
                            <option value="2">Provider Name 2</option>
                        </select>
                    </div>
                    : null
                }
            </div>
        )
    }
}