import React from 'react';
// import './style.css';
import Urls from '../../../../helpers/Urls';
import '../../color.css'

export class AssignedDetails extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                {
                    <div>
                        <div style={{ width: '95%', }}><br/>
                        <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Assigned Claim's Summary Details - John Smith</h5>
                        </div>
                        <div>
                            <table className="table table-bordered claim-list">
                                    <tr className="table-head">
                                        <td className="table-head-text list-item-style">Provider #</td>
                                        <td className="table-head-text list-item-style">Patient Act #</td>
                                        <td className="table-head-text list-item-style">Patient Last Name</td>
                                        <td className="table-head-text list-item-style">Patient First Name</td>
                                        <td className="table-head-text list-item-style">BC Contract Number</td>
                                        <td className="table-head-text list-item-style">Processing Date</td>
                                        <td className="table-head-text list-item-style">Claim Amt</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style">Providerid2</td>
                                        <td className="list-item-style">02669143</td> 
                                        <td className="list-item-style">MATTIRE</td>
                                        <td className="list-item-style">JOHN</td>
                                        <td className="list-item-style">200711561</td>
                                        <td className="list-item-style">04-24-14</td>
                                        <td className="list-item-style">$328.00</td>
                                    </tr>

                                    <tr>
                                        <td className="list-item-style" colspan="1">Submitter #:</td>
                                        <td className="list-item-style" colspan="3">00099</td>
                                        <td className="list-item-style" colspan="1">Submitter Name:</td>
                                        <td className="list-item-style" colspan="4">NOVITAS SOLUTIONS</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style" colspan="1">Error Desc:</td>
                                        <td className="list-item-style" colspan="3">EDITS:CONTDOBX , PATIENT DATE OF BIRTH IS INCORRECT XO ;</td>
                                        <td className="list-item-style" colspan="1">Error Data:</td>
                                        <td className="list-item-style" colspan="4">ERRORS: CONTDOBX ; Sub Number , 1 ; BAD DATA: PatDOB , 9/12/1929 ;</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style" colspan="1">Change Status:</td>
                                        <td className="list-item-style" colspan="2">
                                            <select>
                                                <option value="Assigned">Assigned</option>
                                                <option value="Business Approval">Business Approval</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                        </td>
                                        <td className="list-item-style" colspan="2"></td>
                                        <td className="list-item-style" colspan="1">
                                            <button class="btn btn-sm btn-primary btn-block" style={{backgroundColor:'var(--main-bg-color)',  border:'var(--main-bg-color)'}} type="notifytp">Notify TP/Provider</button>
                                        </td>
                                        <td className="list-item-style" colspan="1">
                                            <button type="button" class="btn btn-primary btn-sm btn-block" style={{backgroundColor:'var(--main-bg-color)',  border:'var(--main-bg-color)'}} data-toggle="modal" data-target="#myModal">Resubmit</button>
                                        </td>

                                    </tr>

                            </table>
                        </div>
                        <div style={{ width: '95%'}}>
                        <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Line Item Codes</h5>
                            {/* <p>Line Item Codes</p> */}
                        </div>
                        <div>
                            <table className="table table-bordered claim-list">
                                
                                    <tr className="table-head">
                                        <td className="table-head-text list-item-style">Rev Code <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">HCPCS Code <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Place of Service <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Units <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style">Date Of Service <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                                        <td className="table-head-text list-item-style"> Amount <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                                    </tr>

                                    <tr>
                                        <td className="list-item-style">0300</td>
                                        <td className="list-item-style">HC 36415</td>
                                        <td className="list-item-style">11</td>
                                        <td className="list-item-style">1</td>
                                        <td className="list-item-style">04-24-14</td>
                                        <td className="list-item-style">$ 53.25</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style">0301</td>
                                        <td className="list-item-style">HC 80053 </td>
                                        <td className="list-item-style">11</td>
                                        <td className="list-item-style">12</td>
                                        <td className="list-item-style">04-24-14</td>
                                        <td className="list-item-style">$ 24.00</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style">0305</td>
                                        <td className="list-item-style">HC 85025 </td>
                                        <td className="list-item-style">11</td>
                                        <td className="list-item-style">1</td>
                                        <td className="list-item-style">04-24-14</td>
                                        <td className="list-item-style">$ 689.00</td>
                                    </tr>
                                    <tr>

                                        <td className="list-item-style">0308</td>
                                        <td className="list-item-style">HC 81001  </td>
                                        <td className="list-item-style">11</td>
                                        <td className="list-item-style">4</td>
                                        <td className="list-item-style">04-24-14</td>
                                        <td className="list-item-style">$ 128.00</td>
                                    </tr>
                                    <tr>
                                        <td className="list-item-style">0311</td>
                                        <td className="list-item-style">HC 99283 25  </td>
                                        <td className="list-item-style">11</td>
                                        <td className="list-item-style">6</td>
                                        <td className="list-item-style">04-24-14</td>
                                        <td className="list-item-style">$ 776.00</td>
                                    </tr>

                            </table>
                        </div>
                    </div>
                }
            </div>
        );
    }

}