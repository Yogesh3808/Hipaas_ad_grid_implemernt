import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class EligibilityErrorsDuplicate extends React.Component {

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
                    <div className="disc">11</div>

                </div>
                <div className="col-6 div-color"><span>Duplicate <br />11</span></div>
            </div>
        )
    }


    render_eligibility_header() {
        return (
            <tr className="table-head claims-text">
                <th className="table-head-text">Duplicate</th>
                <th className="table-head-text">Inbound X12 Status</th>
                <th className="table-head-text">Duplicate Reject</th>
                <th className="table-head-text">CIN</th>
                <th className="table-head-text">SFHPID</th>
                <th className="table-head-text">LastName</th>
                <th className="table-head-text">FirstName</th>
                <th className="table-head-text">Member Birth Date</th>
                <th className="table-head-text">Member Death Date</th>
                <th className="table-head-text">Plan Code</th>
                <th className="table-head-text">FAME Aid Code</th>
                <th className="table-head-text">TelePhone</th>
                <th className="table-head-text">Street Address</th>
                <th className="table-head-text">City</th>
                <th className="table-head-text">Zip</th>
                <th className="table-head-text">X12 Eff Date</th>
                <th className="table-head-text">X12 Term Date</th>

            </tr>
        )
    }

    eligibility_error() {
        return (
            <table className="table table-bordered eligibility-list" id="Duplicate">
                {this.render_eligibility_header()}
                <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1236044HIPAAS</td>
                <td>1234840455</td>
                <td></td>
                <td>Alejandro</td>
                <td className="rightDisplay">1966-04-15</td>
                <td></td>
                <td>307</td>
                <td>M3</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1234234HIPAAS</td>
                <td>1234418725</td>
                <td></td>
                <td>Alice</td>
                <td className="rightDisplay">1982-02-10</td>
                <td></td>
                <td>307</td>
                <td>M5</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1237825HIPAAS</td>
                <td>1234317855</td>
                <td></td>
                <td>Alicia</td>
                <td className="rightDisplay">1971-09-11</td>
                <td></td>
                <td>307</td>
                <td>33</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1230475HIPAAS</td>
                <td>1234893855</td>
                <td></td>
                <td>Alicia</td>
                <td className="rightDisplay">1990-04-24</td>
                <td></td>
                <td>307</td>
                <td>M1</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1236869HIPAAS</td>
                <td>1234603485</td>
                <td></td>
                <td>Allen</td>
                <td className="rightDisplay">2009-03-19</td>
                <td></td>
                <td>307</td>
                <td>T2</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Hold</td>
                <td>N</td>
                <td>1236044HIPAAS</td>
                <td>1234577255</td>
                <td></td>
                <td>Allen</td>
                <td className="rightDisplay">1967-03-09</td>
                <td></td>
                <td>307</td>
                <td>T2</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">1/31/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1234918HIPAAS</td>
                <td>1234205495</td>
                <td></td>
                <td>Allison</td>
                <td className="rightDisplay">1986-04-14</td>
                <td></td>
                <td>307</td>
                <td>M1</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1231791HIPAAS</td>
                <td>1234880235</td>
                <td></td>
                <td>Angela</td>
                <td className="rightDisplay">1960-11-25</td>
                <td></td>
                <td>307</td>
                <td>M1</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1233591HIPAAS</td>
                <td>1234585515</td>
                <td></td>
                <td>Anne</td>
                <td className="rightDisplay">1960-12-29</td>
                <td></td>
                <td>307</td>
                <td>M5</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1235681HIPAAS</td>
                <td>1234417195</td>
                <td></td>
                <td>Beatriz</td>
                <td className="rightDisplay">1996-01-08</td>
                <td></td>
                <td>307</td>
                <td>M1</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1233591HIPAAS</td>
                <td>1234585566</td>
                <td></td>
                <td>Bernarda</td>
                <td className="rightDisplay">1992-06-28</td>
                <td></td>
                <td>307</td>
                <td>M5</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1234057HIPAAS</td>
                <td>1234108621</td>
                <td></td>
                <td>Betty</td>
                <td className="rightDisplay">1998-02-26</td>
                <td></td>
                <td>307</td>
                <td>M1</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1230443HIPAAS</td>
                <td>1234981656</td>
                <td></td>
                <td>Betty</td>
                <td className="rightDisplay">2010-04-09</td>
                <td></td>
                <td>307</td>
                <td>3R</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Active</td>
                <td>N</td>
                <td>1235521HIPAAS</td>
                <td>1234347995</td>
                <td></td>
                <td>Blake</td>
                <td className="rightDisplay">2004-08-29</td>
                <td></td>
                <td>307</td>
                <td>30</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">2/28/2017</td>
            </tr>
            <tr>
                <td>Duplicate</td>
                <td>Hold</td>
                <td>N</td>
                <td>1234610HIPAAS</td>
                <td>1234341286</td>
                <td></td>
                <td>Bryan</td>
                <td className="rightDisplay">1977-08-10</td>
                <td></td>
                <td>307</td>
                <td>M1</td>
                <td>4083724313</td>
                <td>4695 Chabot Drv</td>
                <td>SAN FRANCISCO</td>
                <td className="rightDisplay">94566</td>
                <td className="rightDisplay">2/1/2017</td>
                <td className="rightDisplay">1/31/2017</td>
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
                   <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Eligibility Errors (Duplicate)</h5><br></br>
                </div>
                {this.renderStatus()}

                <div className="bottom-container" style={{ marginTop: "5px" }}>
                    <label style={{ fontSize: "14px" }}><b>Duplicate in File</b></label>
                    {this.eligibility_error()}
                </div>
            </div>
        );
    }
}