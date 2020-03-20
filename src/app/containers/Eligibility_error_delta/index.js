import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class EligibilityErrorsDelta extends React.Component {

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
                    <div className="medium-text" style={{ fontSize: "14px" }}>Eligibility Discrepancies</div><br />
                    <div className="disc">156.1K</div>

                </div>
                <div className="col-6 div-color"><span style={{ padding: "10px" }}>156.1K</span></div>
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
                <th className="table-head-text">F834 To QNXT</th>
                <th className="table-head-text">Member Death Date</th>
                <th className="table-head-text">FAME Details Status</th>
                <th className="table-head-text">CustomDB Status</th>
                <th className="table-head-text">Plan Integration Status</th>
                <th className="table-head-text">IPA Status</th>
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
                <th className="table-head-text">HCP Code Birth Date</th>
                <th className="table-head-text">TransCode Errors</th>
            </tr>
        )
    }

    eligibility_error() {
        return (
            <table className="table table-bordered eligibility-list" id="eligibilityError">
                {this.render_eligibility_header()}
                <tr>
                    <td className="rightDisplay">1234</td>
                    <td>1231376HIPAAS</td>
                    <td>Numbers</td>
                    <td>Laura</td>
                    <td className="rightDisplay" style={{width: '7%'}}>1958-10-27</td>
                    <td></td>
                    <td></td>
                    <td>Term</td>
                    <td className="rightDisplay">2/1/2017</td>
                    <td className="rightDisplay">1/1/1900</td>
                    <td className="rightDisplay">1/31/2017</td>
                    <td className="rightDisplay">1/1/1900</td>
                    <td>NO CHANGE</td>
                    <td>Member Count</td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>No Outbound</td>
                </tr>
                <tr>
                    <td className="rightDisplay">1234</td>
                    <td>1231807HIPAAS</td>
                    <td>Haire</td>
                    <td>Elizabeth</td>
                    <td className="rightDisplay">2006-11-14</td>
                    <td></td>
                    <td></td>
                    <td>Term</td>
                    <td className="rightDisplay">2/1/2017</td>
                    <td className="rightDisplay">1/1/1900</td>
                    <td className="rightDisplay">1/31/2017</td>
                    <td className="rightDisplay">1/1/1900</td>
                    <td>NO CHANGE</td>
                    <td>Member Count</td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>No Outbound</td>
                </tr>
                <tr>
                    <td className="rightDisplay">1234153818</td>
                    <td>1230682 HIPAAS</td>
                    <td>Renninger</td>
                    <td>Kim</td>
                    <td className="rightDisplay">2003-03-18</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td className="rightDisplay">2/1/2017</td>
                    <td className="rightDisplay">1/1/2017</td>
                    <td className="rightDisplay">2/28/2017</td>
                    <td className="rightDisplay">12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td className="rightDisplay">1234371219</td>
                    <td>1230682 HIPAAS</td>
                    <td>Johnson</td>
                    <td>Michael</td>
                    <td className="rightDisplay">1957-09-01</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td className="rightDisplay">2/1/2017</td>
                    <td className="rightDisplay">4/1/2012</td>
                    <td className="rightDisplay">2/28/2017</td>
                    <td className="rightDisplay">12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td className="rightDisplay">1234392678</td>
                    <td>1230682 HIPAAS</td>
                    <td>Utley</td>
                    <td>Gerald</td>
                    <td className="rightDisplay">1980-07-03</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td className="rightDisplay">2/1/2017</td>
                    <td className="rightDisplay">5/1/2012</td>
                    <td className="rightDisplay">2/28/2017</td>
                    <td className="rightDisplay">12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td className="rightDisplay">1234529123</td>
                    <td>1230682 HIPAAS</td>
                    <td>Krull</td>
                    <td>Linda</td>
                    <td className="rightDisplay">1889-06-16</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td className="rightDisplay">2/1/2017</td>
                    <td className="rightDisplay">11/1/2011</td>
                    <td className="rightDisplay">2/28/2017</td>
                    <td className="rightDisplay">12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td className="rightDisplay">1234562238</td>
                    <td>1230682 HIPAAS</td>
                    <td>Ammons</td>
                    <td>Harold</td>
                    <td className="rightDisplay">1997-06-30</td>
                    <td></td>
                    <td>Active</td>
                    <td>Active</td>
                    <td className="rightDisplay">2/1/2017</td>
                    <td className="rightDisplay">9/1/2014</td>
                    <td className="rightDisplay">2/28/2017</td>
                    <td className="rightDisplay">12/31/2078</td>
                    <td>NO CHANGE</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Change</td>
                    <td>DPH;CPG;</td>
                </tr>

            </table>
        )
    }

    eligibility_History() {
        return (
            <table className="table table-bordered eligibility-list" >
                {this.render_eligibility_history_header()}
                <tr>
                    <td>1232261HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1233092HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1233241HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1233666HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1234116HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1235872HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1238996HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1239567HIPAAS</td>
                    <td>Term Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170131</td>
                    <td>307:09</td>
                    <td className="rightDisplay">001</td>
                </tr>
                <tr>
                    <td>1230324HIPAAS</td>
                    <td>Active Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170228</td>
                    <td>307:01</td>
                    <td className="rightDisplay">021</td>
                </tr>
                <tr>
                    <td>1230356HIPAAS</td>
                    <td>Active Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170228</td>
                    <td>307:01</td>
                    <td className="rightDisplay">021</td>
                </tr>
                <tr>
                    <td>1230526HIPAAS</td>
                    <td>Active Delta</td>
                    <td className="rightDisplay">20170201</td>
                    <td className="rightDisplay">20170228</td>
                    <td>307:01</td>
                    <td className="rightDisplay">021</td>
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
                <div>
                    <br></br>
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Eligibility Errors (Delta)</h5><br></br>
                </div>
                {this.renderStatus()}

                <div className="bottom-container" style={{ marginTop: "5px" }}>
                    <label style={{ fontSize: "14px" }}><b>Duplicate in File</b></label>
                    {this.eligibility_error()}
                    <label style={{ fontSize: "14px" }}><b>Eligibility History</b></label>
                    {this.eligibility_History()}
                </div>
            </div>
        );
    }
}