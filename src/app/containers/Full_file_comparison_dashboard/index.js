import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class FullComparsion_dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsList: [],
        }
    }

    componentDidMount() {

    }

    renderStatus() {
        return (
            <div class="dashfrm-LR1 row" style={{marginTop:"20px"}}>
                <div className="col-1">
                    <div className="medium-text" style={{ fontSize: "14px" }}><b>LoadMonth</b></div><br />
                    <div className="small-text float-left time" style={{ fontSize: "12px" }}>jan 28 5:43 PM</div>

                </div>
                <div className="col-2">
                    <div className="medium-text" style={{ fontSize: "12px" , marginLeft:"20px" }}>Eligibility Errors</div><br />
                    <div className="disc" style={{color:"red"}}>3</div>
                </div>
                <div className="col-3">
                    <div className="medium-text" style={{ fontSize: "12px" , marginLeft:"20px" }}>Total Inbound Eligibility</div><br />
                    <div className="disc" style={{color:"#139DC9"}}>156.1K</div>
                </div>
                <div className="col-2">
                    <div className="medium-text" style={{ fontSize: "12px" , marginLeft:"20px" }}>Active Reconciled</div><br />
                    <div className="disc" style={{color:"green", marginLeft:"60px"}}>0</div>
                </div>
                <div className="col-2">
                    <div className="medium-text" style={{ fontSize: "12px" , marginLeft:"20px" }}>Hold Reconciled</div><br />
                    <div className="disc" style={{color:"green" ,marginLeft:"50px"}}>0</div>
                </div>
                <div className="col-2">
                    <div className="medium-text" style={{ fontSize: "12px" , marginLeft:"20px" }}>Term Reconciled</div><br />
                    <div className="disc" style={{color:"green" , marginLeft:"60px"}}>0</div>
                </div>
                <div className="col-4" style={{marginTop:"20px"}}>
                 <table  style={{border:"4px"}}>
                   <tbody>
                   <tr>
                    <th style={{ color:"#139DC9" , fontSize:"12px"}}>Total Eligibility in X12 834 File </th>
                    <th style={{paddingLeft:"50px" , color:"#139DC9" ,fontSize:"12px"}}>Members</th>
                </tr>
                <tr>
                    <td style={{ color:"#139DC9" ,fontSize:"12px"}}>  </td>
                    <td style={{paddingLeft:"100px" , textAlign:"right", backgroundColor:"#139DC9",padding: "5px" ,color:"white",fontSize:"12px"}}>15</td>
                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Active </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>400</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}> Dup in File </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "4px" ,color:"white"}}>11</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}> Hold </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>50</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}> No Eligibility Data </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>2</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}>Other Health Plan(not 307) </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>15</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}>Term </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>20</label></div>
                </tr>
                   </tbody>
                 </table>
                  
                </div>
                <div className="col-4" style={{marginTop:"20px"}}>
                 <table  style={{border:"4px"}}>
                   <tbody>
                   <tr>
                    <th style={{ color:"#139DC9" , fontSize:"12px"}}>Total Eligibility FAME </th>
                    <th style={{paddingLeft:"50px" , color:"#139DC9" ,fontSize:"12px"}}>Members</th>
                </tr>
                <tr>
                    <td style={{ color:"#139DC9" ,fontSize:"12px"}}>  </td>
                    <td style={{paddingLeft:"100px" , textAlign:"right", backgroundColor:"#139DC9",padding: "5px" ,color:"white",fontSize:"12px"}}>15</td>
                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Active </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>400</label></div>
                </tr>
               
                <tr>
                <td style={{ fontSize:"12px"}}> Hold </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>50</label></div>
                </tr>
               
                <tr>
                <td style={{ fontSize:"12px"}}>Other Health Plan(not 307) </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>40</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}>Term </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>20</label></div>
                </tr>
                   </tbody>
                 </table>
                  
                </div>
                <div className="col-4" style={{marginTop:"20px"}}>
                 <table  style={{border:"4px"}}>
                   <tbody>
                   <tr>
                    <th style={{ color:"#139DC9" , fontSize:"12px"}}>Eligibility in Qnxt </th>
                    <th style={{paddingLeft:"50px" , color:"#139DC9" ,fontSize:"12px"}}>Members</th>
                </tr>
                <tr>
                    <td style={{ color:"#139DC9" ,fontSize:"12px"}}>  </td>
                    <td style={{paddingLeft:"100px" , textAlign:"right", backgroundColor:"#139DC9",padding: "5px" ,color:"white",fontSize:"12px"}}>15</td>
                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Active </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>350</label></div>
                </tr>
               
                <tr>
                <td style={{ fontSize:"12px"}}> Active Delta </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>50</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}>Hold </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>30</label></div>
                </tr>
              
                <tr>
                <td style={{ fontSize:"12px"}}>Term </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>20</label></div>
                </tr>
                <tr>
                <td style={{ fontSize:"12px"}}>Term Delta</td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>40</label></div>
                </tr>
                   </tbody>
                 </table>
                  
                </div>
          
                <div className="col-3" style={{marginTop:"20px"}}>
                     <label style={{fontSize:"12px" ,color:"#139DC9" ,fontWeight:"bold"}}>Current Month Eligibility Errors</label>
                     <table  style={{border:"4px"}}>
                   <tbody>
               
                <tr>
                <td style={{paddingLeft:"100px" , color:"#139DC9" ,fontSize:"12px"}}>  </td>
                    <td style={{paddingLeft:"100px" , width:"130px" ,  textAlign:"right", backgroundColor:"#139DC9",padding: "10px" ,color:"white",fontSize:"12px"}}></td>

                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Active Delta 46 </td>

                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Term Delta 1 </td>

                </tr> 
                </tbody>
                </table>
                </div>
                <div className="col-3" style={{marginTop:"20px"}}>
                     <table  style={{border:"4px"}}>
                   <tbody> 
               
                <tr>
                <td style={{color:"#139DC9" , fontWeight:"bold",fontSize:"12px"}}> FAME Delta </td>
                    <td style={{paddingLeft:"35px"  ,  fontSize:"12px"}}>Member Count</td>

                </tr> 
                <tr>
                <td style={{ color:"#139DC9" ,fontSize:"12px"}}>  </td>
                    <td style={{paddingLeft:"50px" , width:"130px" ,  textAlign:"right", backgroundColor:"#139DC9",padding: "10px" ,color:"white",fontSize:"12px"}}>105200</td>

                </tr> 

                <tr>
                <td style={{ fontSize:"12px"}}> Member Count	 </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>50943
</label></div>



                </tr> 
                </tbody>
                </table>
                </div>
                <div className="col-2">
                    <div className="medium-text" style={{ fontSize: "12px" , marginLeft:"20px" }}>RateCode Delta</div><br />
                    <div className="disc" style={{color:"red"}}>5</div>
                </div>
                <div className="col-4" style={{marginTop:"20px"}}>
                     <table  style={{border:"4px"}}>
                   <tbody> 
               
                <tr>
                <td style={{color:"#139DC9" , fontWeight:"bold",fontSize:"12px"}}> Custom DB AC&VT	 </td>
                    <td style={{paddingLeft:"35px"  ,  fontSize:"12px"}}>Transactions</td>

                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Adds and Changes </td>
                    <td style={{paddingLeft:"50px" , width:"130px" ,  textAlign:"right", backgroundColor:"#139DC9",padding: "10px" ,color:"white",fontSize:"12px"}}>39267</td>

                </tr> 

                <tr>
                <td style={{ fontSize:"12px"}}> New Members	 </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>2098
</label></div>



                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Term By Absence	</td>
                    <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>5

</label></div>

                </tr> 

                <tr>
                <td style={{ fontSize:"12px"}}> Voids and Terms	 </td>
                <div style={{marginTop:"5px" , height:"27px" , textAlign:"right", backgroundColor:"#139DC9",fontSize:"12px"}}><label style={{padding: "3px" ,color:"white"}}>4558

</label></div>



                </tr> 
                </tbody>
             
                </table>
                </div>
                <div className="col-3" style={{marginTop:"20px"}}>
                     <label style={{fontSize:"12px" ,color:"#139DC9" ,fontWeight:"bold"}}>History Eligibility Errors</label>
                     <table  style={{border:"4px"}}>
                   <tbody>
               
                <tr>
                <td style={{paddingLeft:"100px" , color:"#139DC9" ,fontSize:"12px"}}>  </td>
                    <td style={{paddingLeft:"100px" , width:"130px" ,  textAlign:"right", backgroundColor:"#ec6236",padding: "10px" ,color:"white",fontSize:"12px"}}></td>

                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Active Delta 112 </td>

                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Hold Delta 21 </td>

                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}> Term Delta 13 </td>

                </tr> 
                </tbody>
                </table>
                </div>
                <div className="col-3" style={{marginTop:"20px"}}>
                <div style={{marginTop:"5px" , height:"120px" , textAlign:"left", backgroundColor:"#139DC9",fontSize:"12px"}}>
                    <label style={{padding: "3px" ,color:"white" ,fontSize: "9px"}}>CustomDB AC+VT Count <br></br> 50.05k
</label><br></br><label style={{padding: "3px" ,color:"white" ,fontSize: "9px"}}>834 AC+VT Count <br></br> 156.14k
</label>
</div>
                </div>
                <div className="col-2">
                    <div className="medium-text" style={{ color:"#139DC9" ,fontWeight:"bold", fontSize: "12px"  }}>Other Errors</div><br />
                    <div style={{marginTop:"5px" , height:"50px" , backgroundColor:"#ec6236",fontSize:"12px"}}>                

</div>
                </div>
                <div className="col-4" style={{marginTop:"20px"}}>
                     <table  style={{border:"4px"}}>
                   <tbody> 
               
                <tr>
                <td style={{color:"#139DC9" , fontWeight:"bold",fontSize:"12px"}}>834 To Qnxt AC & VT	 </td>
                    <td style={{color:"#139DC9" ,paddingLeft:"35px"  ,fontWeight:"bold",  fontSize:"12px"}}>Transactions</td>

                </tr> 
                <tr>
                <td style={{ fontSize:"12px"}}>  </td>
                    <td style={{paddingLeft:"50px" , width:"130px" ,  textAlign:"right", backgroundColor:"#139DC9",padding: "10px" ,color:"white",fontSize:"12px"}}>0</td>

                </tr> 

              
                </tbody>
             
                </table>
                </div>
                <div className="col-3" style={{marginTop:"20px"}}>
               </div>
                <div className="col-3" style={{marginTop:"20px"}}>
                <label style={{fontSize:"12px" ,color:"#139DC9" ,fontWeight:"bold"}}>Plan Integration Error</label>

                <div style={{marginTop:"5px" , height:"120px" , textAlign:"left", backgroundColor:"#139DC9",fontSize:"12px"}}>
                    <label style={{padding: "3px" ,color:"white" ,fontSize: "9px"}}>Error <br></br> 10
</label>
</div>
                </div>
                <div className="col-3" style={{marginTop:"20px"}}>
                <label style={{fontSize:"12px" ,color:"#139DC9" ,fontWeight:"bold"}}>Termed PCP 12</label>

                <div style={{marginTop:"50px" , height:"60px" , textAlign:"left", backgroundColor:"#139DC9",fontSize:"12px"}}>
                    <label style={{padding: "3px" ,color:"white" ,fontSize: "9px"}}>
</label>
</div>
                </div>
              </div>
          
          
        )
    }






    topbar(){
        return(
            <div className="row">
                <div className="form-group col-sm-3">
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
                <div className="form-group col-sm-3">
                    <label className="list-header">Trading partner </label>
                        <select className="form-control list-header" id="state">
                                <option value="">Trading partner</option>
                                <option value="CADHCS_5010_834">CADHCS_5010_834</option>
    <option selected="selected" value="GH GENERATIONS">GH GENERATIONS</option>
                        </select>
                       
                </div>
                <div className="form-group col-sm-3">
                    <label className="list-header">Provider Name</label>
                        <select className="form-control list-header" id="ProviderName">
                            <option value="">Provider Name</option>
                            <option selected="selected" value="1">Provider Name 1</option>
                            <option value="2">Provider Name 2</option>
                        </select>
                </div>
                <div className="form-group col-sm-3">
                 <img src={require('../../components/Images/834Dashboard_01.PNG')} style={{width:"230px" , marginTop:"10px"}} />


                </div>
            </div>
        )
    }
    renderSearchBar() {
        return (
            <div className="row">

                <input type="text" name="name" className="input-style" placeholder="Search" />
            </div>
        )
    }

    render() {
        return (
            <div className="container-fluid">
                {/* {this.renderSearchBar()} */}
                <hr style={{color:"#139DC9"}}></hr>
                <div>
                    <br></br>
                   <h5 style={{ color: '#139DC9',fontsize: "20px" }}>HiPaaS Medical Monthly Eligibility Reconcile</h5><br></br>
                </div>
                {this.topbar()}
                {this.renderStatus()}
<br></br>
                <div className="bottom-container" style={{ marginTop: "5px" }}>
                  
                 
                </div>
            </div>
        );
    }
}