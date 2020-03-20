import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class Eligibility_Errors extends React.Component {

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
            <div class="dashfrm-LR1 row">
                <div className="col-2">
                    <div className="medium-text" style={{ fontSize: "14px" }}><b>LoadMonth</b></div><br />
                    <div className="small-text float-left time" style={{ fontSize: "12px" }}>Jan 28 5:43 PM</div>

                </div>
                <div className="col-3">
                    <div className="medium-text" style={{ fontSize: "12px" , marginLeft:"20px" }}>Eligibility Discrepancies</div><br />
                    <div className="disc">156.1K</div>

                </div>
                <div className="col-6 div_color" style={{ backgroundColor: '#e36e30', height:'95px' }}><span>156.13K</span></div>
            </div>
        )
    }


    render_eligibility_header() {
        return (
          
<tr className="table-head claims-text">
                <th className="table-head-text">SFHPID </th>
                <th className="table-head-text">CIN</th>
                <th className="table-head-text">LastName</th>
                <th className="table-head-text">FirstName</th>
                <th className="table-head-text">Member Birth Date</th>
                <th className="table-head-text">Eligibility Errors</th>
                <th className="table-head-text">Inbound X12 Status</th>
                <th className="table-head-text">Qnxt Status</th>
                <th className="table-head-text">X12 Eff Date</th>
                <th className="table-head-text">Qeff Date</th>
                <th className="table-head-text">X12 Term Date</th>
                <th className="table-head-text">Qend Date</th>
                <th className="table-head-text">834 To QNXT</th>
                <th className="table-head-text">Member Death Date</th>
                <th className="table-head-text">FAME Details Status</th>
                <th className="table-head-text">CustomDB Status</th>
                <th className="table-head-text">Plan Integration Status</th>
                <th className="table-head-text">IPA Status</th>
            </tr>

                  
             
          
        )
    }

    

    eligibility_error() {
        return (
            <table className="table table-bordered eligibility-list" id ="eligibiltyerror">
                {this.render_eligibility_header()}
              
                <tr>
                    <td >1234</td>
                    <td>1231376 HIPAAS</td>
                    <td>Numbers</td>
                    <td>Laura</td>
                    <td>1958-10-27</td>
                    <td></td>
                    <td></td>
                    <td>Term</td>
                    <td >2/1/2017</td>
                    <td >1/1/1900</td>
                    <td >1/21/2017</td>
                    <td >1/1/1900</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td>Member Count</td>
                    <td></td>
                    <td>No Change</td>
                    <td>No Outbound</td>
                </tr>
                <tr>
                    <td >1234</td>
                    <td>1231807 HIPAAS</td>
                    <td>Haire</td>
                    <td>Elizabeth</td>
                    <td>2006-11-14</td>
                    <td></td>
                    <td></td>
                    <td>Term</td>
                    <td >2/1/2017</td>
                    <td >1/1/1900</td>
                    <td >1/21/2017</td>
                    <td >1/1/1900</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td>Member Count</td>
                    <td></td>
                    <td>No Change</td>
                    <td>No Outbound</td>
                </tr>
                <tr>
                    <td >1234153866</td>
                    <td>1230682 HIPAAS</td>
                    <td>Renninger</td>
                    <td>Kim</td>
                    <td>2003-03-18</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >1/1/2017</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234371266</td>
                    <td>1230682 HIPAAS</td>
                    <td>Johnson</td>
                    <td>Michael</td>
                    <td>1957-09-01</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >4/1/2012</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234392696</td>
                    <td>1230682 HIPAAS</td>
                    <td>Utley</td>
                    <td>Gerald</td>
                    <td>1980-07-03</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >5/1/2012</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234529176</td>
                    <td>1230682 HIPAAS</td>
                    <td>Krull</td>
                    <td>Linda</td>
                    <td>1989-06-16</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >11/1/2011</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234562287</td>
                    <td>1230682 HIPAAS</td>
                    <td>Ammons</td>
                    <td>Harold</td>
                    <td>1997-06-30</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >9/1/2014</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234816023</td>
                    <td>1230682 HIPAAS</td>
                    <td>Malave</td>
                    <td>Andrea</td>
                    <td>1986-08-01</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >1/1/2017</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234816614</td>
                    <td>1230682 HIPAAS</td>
                    <td>Hall</td>
                    <td>Linda</td>
                    <td>2010-10-17</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >1/1/2017</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234826769</td>
                    <td>1230682 HIPAAS</td>
                    <td>Sterling</td>
                    <td>Ada</td>
                    <td>1970-10-10</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >10/1/2015</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234843966</td>
                    <td>1230682 HIPAAS</td>
                    <td>Rucker</td>
                    <td>Edward</td>
                    <td>1998-03-26</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >10/1/2015</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>ADDCHNG;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td >1234990189</td>
                    <td>1230682 HIPAAS</td>
                    <td>Mcrae</td>
                    <td>Diana</td>
                    <td>1955-03-14</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >1/1/2016</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>ADDCHNG;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>MC_HILL;</td>
                </tr>
                <tr>
                    <td >1234009886</td>
                    <td>1230682 HIPAAS</td>
                    <td>Williams</td>
                    <td>Reta</td>
                    <td>1971-03-18</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >4/1/2016</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>ADDCHNG;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>NEMS_MC;</td>
                </tr>
                <tr>
                    <td >1234455326</td>
                    <td>1230682 HIPAAS</td>
                    <td>Ammons</td>
                    <td>Maureen</td>
                    <td>1999-10-29</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td >2/1/2017</td>
                    <td >11/1/2016</td>
                    <td >2/28/2017</td>
                    <td >12/31/2078</td>
                    <td>ADDCHNG;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>NEMS_MC;</td>
                </tr>


            </table>
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
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Eligibility Errors (Other Errors)</h5><br></br>
                </div>
               
                {this.renderStatus()}
<br></br>
                <div className="bottom-container" style={{ marginTop: "5px" }}>
                    <label style={{fontSize:"12px"}}>Duplicate in File</label>
                    {this.eligibility_error()}
                 
                </div>
            </div>
        );
    }
}