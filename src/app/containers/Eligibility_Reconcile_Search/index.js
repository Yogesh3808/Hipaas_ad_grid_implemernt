import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class Eligibility_Reconcile_Search extends React.Component {

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
                <div className="col-1">
                    <div className="medium-text" style={{ fontSize: "14px" }}><b>LoadMonth</b></div><br />
                    <div className="small-text float-left time" style={{ fontSize: "12px" }}>Jan 28 5:43 PM</div>

                </div>
                <div className="col-2">
                    <div className="medium-text" style={{ fontSize: "14px" , marginLeft:"20px" }}>Total Reconcile</div><br />
                    <div className="disc" style={{color:"green"}}>156.1K</div>

                </div>
                <div className="col-2 div_color" style={{ backgroundColor: 'green' }}><span>Active <br /> 137.1k</span></div>
                <div className="col-2 div_color" style={{ backgroundColor: '#32c949', color: 'black' }}><span>Hold<br />10.07k</span></div>
                <div className="col-2 div_color" style={{ backgroundColor: '#abd4cf' }}><span>Term <br />2.57K</span></div>
                <div className="col-2 div_color" style={{ backgroundColor: '#83D2B4' }}><span>Other Health Plan(not 307) <br />8.36K</span></div>
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
                   
                        <th className="table-head-text">PlanCode</th>
             
            </tr>
        )
    }

    render_eligibility_history_header() {
        return (
            <tr className="table-head claims-text">
                <th className="table-head-text">CIN </th>
                <th className="table-head-text">EligibilityStatCov</th>
                <th className="table-head-text">Coverage Month</th>
                <th className="table-head-text">EndDate</th>
                <th className="table-head-text">HCP Code</th>
                <th className="table-head-text">TransCode</th>
            </tr>
        )
    }

    eligibility_error() {
        return (
            <table className="table table-bordered eligibility-list" id ="paddingset">
                {this.render_eligibility_header()}
                <tr>
                        <td>123456783424</td>
                        <td>1231376 HIPAAS</td>
                        <td>Numbers</td>
                        <td>Alejandro</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td></td>
                        <td >Term</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td >Member Count</td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>1234567842</td>
                        <td>1231376 HIPAAS</td>
                        <td>Haier</td>
                        <td>Alice</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td></td>
                        <td >Term</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td >Member Count</td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456786456</td>
                        <td>1231376 HIPAAS</td>
                        <td>Renninger</td>
                        <td>Alicia</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>12345678656</td>
                        <td>1231376 HIPAAS</td>
                        <td>Utley</td>
                        <td>Laura</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456786464</td>
                        <td>1231376 HIPAAS</td>
                        <td>Krull</td>
                        <td>Allen</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>12345678646</td>
                        <td>1231376 HIPAAS</td>
                        <td>Ammona</td>
                        <td>Elizebeth</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>1234567864565</td>
                        <td>1231376 HIPAAS</td>
                        <td>Malave</td>
                        <td>Allison</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456786456</td>
                        <td>1231376 HIPAAS</td>
                        <td>Hall</td>
                        <td>Angela</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>1234567865645</td>
                        <td>1231376 HIPAAS</td>
                        <td>Sterling</td>
                        <td>Anne</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>12345678456</td>
                        <td>1231376 HIPAAS</td>
                        <td>Rucker</td>
                        <td>Beatriz</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456785665</td>
                        <td>1231376 HIPAAS</td>
                        <td>Toms</td>
                        <td>Bernarda</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456782321</td>
                        <td>1231376 HIPAAS</td>
                        <td>Hall</td>
                        <td>Betty</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456782312</td>
                        <td>1231376 HIPAAS</td>
                        <td>Macrq</td>
                        <td>Johnson</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456783232</td>
                        <td>1231376 HIPAAS</td>
                        <td>Utley</td>
                        <td>Blake</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
                    </tr>
                    <tr>
                        <td>123456783232</td>
                        <td>1231376 HIPAAS</td>
                        <td>Krull</td>
                        <td>Bryan</td>
                        <td>1958-10-27</td>
                        <td></td>
                        <td>Active</td>
                        <td >Active</td>
                        <td>10/13/2018</td>
                        <td>1/12/2012</td>
                        <td>1/21/2037</td>
                        <td>12/31/2078</td>
                        <td>NO CHANGE</td>
                        <td></td>
                        <td ></td>
                        <td ></td>
                        <td >No Change</td>
                        <td>No Outbound</td>
                        <td>307</td>
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
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Eligibility Reconcile Search</h5><br></br>
                </div>
               
                {this.renderStatus()}
<br></br>
                <div className="bottom-container" style={{ marginTop: "5px" }}>
                    {this.eligibility_error()}
                 
                </div>
            </div>
        );
    }
}