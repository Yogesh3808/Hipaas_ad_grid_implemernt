import React from 'react';
import './style.css';
import { AssignedDetails } from '../Claims/AssignedDetails';
import Urls from '../../../helpers/Urls';

export class ResearchQueue extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            flag: ''
        }
    }

    gotoAssigned(){
        this.setState({
            flag: 'assignedFlag'
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.flag == 'assignedFlag'
                    ?
                    <AssignedDetails/>
                    :
                    <div>
                        <div>
                            <h5 className="headerText">Assigned Claims Summary - John Smith</h5>
                        </div>
                        <div className="form-style" id='filters'>
                <div className="form-row">
                            <div className="form-group col-3">
                                <label  className="list-dashboard">State</label>
                                <select  class="form-control list-dashboard" id="selState">
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
                            <div className="form-group col-3">
                                <label className="list-dashboard">Submitter</label>
                                <select  class="form-control list-dashboard" id="selTradingPartner">
                                    <option value="">Submitter</option>
                                    <option selected="selected" value="1">Submitter 1</option>
                                    <option value="2">Submitter 2</option>
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label className="list-dashboard">Provider Name </label>
                                <select  class="form-control list-dashboard" id="selProviderName">
                                    <option value="">Provider Name</option>
                                    <option selected="selected" value="1">Provider Name 1</option>
                                    <option value="2">Provider Name 2</option>
                                </select>
                            </div>
                        </div>    </div>
                        <div className="table claim-list">
                            <table className="table table-bordered">
        
                                    <tr className="table-head">
                                        <td className="table-head-text list-item-style">Assign <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Claim Status <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Days Old <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Pateint ID <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Payer <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Seq ID <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Claim Amt <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Batch ID <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Batch Date <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Status <img className="SearchBarImage" src={require('../../components/Images/search_table.png')}></img></td>
                                    </tr>
            
                              
                                    <tr>
                                        <td className="list-item-style"> John Smith</td>
                                        <td className="list-item-style"><a href="#" onClick={() => {this.gotoAssigned()}} style={{color:"#6AA2B8"}}>Rejected</a></td>
                                        <td className="list-item-style">5</td>
                                        <td className="list-item-style">P0005915</td>
                                        <td className="list-item-style">CPSI</td>
                                        <td className="list-item-style">10001</td>
                                        <td className="list-item-style">$147.00</td>
                                        <td className="list-item-style">1734112</td>
                                        <td className="list-item-style">4/24/2014 1:16:18 PM</td>
                                        <td className="list-item-style">TP Notified </td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style"> John Smith</td>
                                        <td className="list-item-style"><a href="#" onClick={() => {this.gotoAssigned()}} style={{color: "#6AA2B8"}}>Rejected</a></td>
                                        <td className="list-item-style">10</td>
                                        <td className="list-item-style">P0003568</td>
                                        <td className="list-item-style">BCBS</td>
                                        <td className="list-item-style">10002</td>
                                        <td className="list-item-style">$6,431.00</td>
                                        <td className="list-item-style">1734113</td>
                                        <td className="list-item-style">4/24/2014 1:16:18 PM</td>
                                        <td className="list-item-style">Assigned</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style"> John Smith</td>
                                        <td className="list-item-style"><a href="#" onClick={() => {this.gotoAssigned()}} style={{color: "#6AA2B8"}}>Denied</a></td>
                                        <td className="list-item-style">12</td>
                                        <td className="list-item-style">P0006309</td>
                                        <td className="list-item-style">HEALTH CO</td>
                                        <td className="list-item-style">10003</td>
                                        <td className="list-item-style">$411.00</td>
                                        <td className="list-item-style">1734089</td>
                                        <td className="list-item-style">4/24/2014 1:15:20 PM</td>
                                        <td className="list-item-style">TP Notified</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style"> John Smith</td>
                                        <td className="list-item-style"><a href="#" onClick={() => {this.gotoAssigned()}} style={{color: "#6AA2B8"}}>Denied</a></td>
                                        <td className="list-item-style">12</td>
                                        <td className="list-item-style">P0006309</td>
                                        <td className="list-item-style">HEALTH CO</td>
                                        <td className="list-item-style">10004</td>
                                        <td className="list-item-style">$3,042.05</td>
                                        <td className="list-item-style">1734089</td>
                                        <td className="list-item-style">4/24/2014 1:15:20 PM</td>
                                        <td className="list-item-style">Waiting Approval</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style"> John Smith</td>
                                        <td className="list-item-style"><a href="#" onClick={() => {this.gotoAssigned()}} style={{color: "#6AA2B8"}}>A/R Past 60</a></td>
                                        <td className="list-item-style">62</td>
                                        <td className="list-item-style">P0006309</td>
                                        <td className="list-item-style">HEALTH CO</td>
                                        <td className="list-item-style">10005</td>
                                        <td className="list-item-style">$349.63</td>
                                        <td className="list-item-style">1734089</td>
                                        <td className="list-item-style">4/24/2014 1:15:20 PM</td>
                                        <td className="list-item-style">Waiting Approval</td>
                                    </tr>
                                
                            </table>
                        </div>
                    </div>
                }
            </div>
        );
    }

}