import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class CustomDBDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsList: [],
        }
    }

    componentDidMount() {

    }

    render_eligibility_header() {
        return (
            <tr className="table-head claims-text">
            <th className="table-head-text" >FameDelta Changes</th>
            <th className="table-head-text" >CustomDB Change</th>
            <th className="table-head-text" >834 To Qnxt</th>
            <th className="table-head-text" >Members</th>
            </tr>
        )
    }

    render_eligibility_history_header() {
        return (
            <tr className="table-head claims-text">
            <th className="table-head-text">CIN</th>
                <th className="table-head-text">File Eff Date</th>
                <th className="table-head-text">File End Date</th>
                <th className="table-head-text">CustomDBStatus</th>
                <th className="table-head-text">Plan Integration Update Details</th>
            </tr>
        )
    }

    eligibility_error() {
        return (
            <table className="table table-bordered eligibility-list">
                {this.render_eligibility_header()}
                <tr>
                <td><b>Totals</b></td>
                <td></td>
                <td></td>
                <td><b>156143</b></td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td></td>
                <td></td>
                <td>111102</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td></td>
                <td>Adds and Changes</td>
                <td>3155</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td></td>
                <td>Adds and Changes Voids and Terms</td>
                <td>6</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td></td>
                <td>Voids and Terms</td>
                <td>182</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Adds and Changes</td>
                <td></td>
                <td>371</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Adds and Changes</td>
                <td>Adds and Changes</td>
                <td>36886</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Adds and Changes</td>
                <td>Adds and Changes Voids and Terms</td>
                <td>63</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Adds and Changes</td>
                <td>Voids and Terms</td>
                <td>224</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Term By Absence</td>
                <td>Term By Absence</td>
                <td>18</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Void and Terms</td>
                <td></td>
                <td>314</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Void and Terms</td>
                <td>Adds and Changes Voids and Terms</td>
                <td>1623</td>
            </tr>
            <tr>
                <td>FameDelta Change</td>
                <td>Void and Terms</td>
                <td>Void and Terms</td>
                <td>2199</td>
            </tr>
            </table>
        )
    }

    eligibility_History() {
        return (
            <table className="table table-bordered eligibility-list" >
                {this.render_eligibility_history_header()}
                <tr>
                <td>1230682HIPAAS</td>
                <td>1/1/1900</td>
                <td>1/1/1900</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>1230682HIPAAS</td>
                <td>2/1/2017</td>
                <td>1/31/2017</td>
                <td>No Change</td>
                <td></td>
            </tr>
            <tr>
                <td>1230682HIPAAS</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>AddChange;</td>
                <td></td>
            </tr>
            <tr>
                <td>1230682HIPAAS</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>No Change</td>
                <td></td>
            </tr>
            <tr>
                <td>1230682HIPAAS</td>
                <td>1/1/1900</td>
                <td>1/1/1900</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>1230682HIPAAS</td>
                <td>2/1/2017</td>
                <td>1/31/2017</td>
                <td>No Change</td>
                <td></td>
            </tr>
            <tr>
                <td>1234784HIPAAS</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>AddChange;</td>
                <td></td>
            </tr>
            <tr>
                <td>1230682HIPAAS</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>AddChange;</td>
                <td></td>
            </tr>
            <tr>
                <td>1234784HIPAAS</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>No Change</td>
                <td></td>
            </tr>
            <tr>
                <td>1238858HIPAAS</td>
                <td>2/1/2017</td>
                <td>1/31/2017</td>
                <td>No Change</td>
                <td></td>
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
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>CustomDB Details</h5><br></br>
               
                </div>

                <div className="bottom-container">
                    {this.eligibility_error()}
                    {this.eligibility_History()}
                </div>
            </div>
        );
    }
}