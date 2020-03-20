import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class HistoryRateCodeDelta extends React.Component {

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
                    <div className="medium-text" style={{ fontSize: "14px" }}>RateCode Discrepancies</div><br />
                    <div className="disc">33</div>

                </div>
                <div className="col-6 div-color"><span>History RateCode <br />33</span></div>
            </div>
        )
    }


    render_ratecode_header() {
        return (
            <tr className="table-head claims-text">
                <th className="table-head-text">RateCode Delta </th>
                <th className="table-head-text">SFHPID </th>
                <th className="table-head-text">CIN</th>
                <th className="table-head-text">LastName</th>
                <th className="table-head-text">FirstName</th>
                <th className="table-head-text">Member Birth Date</th>
                <th className="table-head-text">X12 Eff Date</th>
                <th className="table-head-text">X12 Term Date</th>
                <th className="table-head-text">FAME Aid Code</th>
                <th className="table-head-text">FAME Medi Status</th>
                <th className="table-head-text">FAME Code Desc</th>
                <th className="table-head-text">Aid Code Error</th>
                <th className="table-head-text">Medi Medi Error</th>
                <th className="table-head-text">Qnxt RateCode</th>
            </tr>
        )
    }

    render_ratecode_history_header() {
        return (
            <tr className="table-head claims-text">
            <th className="table-head-text">AidCodeErr</th>
            <th className="table-head-text">Medi Medi Error</th>
            <th className="table-head-text">CIN</th>
            <th className="table-head-text">Start Date</th>
            <th className="table-head-text">End Date</th>
            <th className="table-head-text">Aid Code</th>
            <th className="table-head-text">FAME Code Desc</th>
            <th className="table-head-text">Qnxt Rate Code</th>
            <th className="table-head-text">FAME Medi Status</th>
        </tr>
            
        )
    }

    History_RateCode() {
        return (
            <table className="table table-bordered eligibility-list">
                {this.render_ratecode_header()}
            <tr>
                <td>History RateCode</td>
                <td>123481605455</td>
                <td>1230682HIPAAS</td>
                <td>Malave</td>
                <td>Andrea</td>
                <td>1986-08-01</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>60</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>DPH_COPC_MC_DISABLED</td>
            </tr>
            <tr>
                <td>History RateCode</td>
                <td>12343161255</td>
                <td>1238858HIPAAS</td>
                <td>Carter</td>
                <td>Vicki</td>
                <td>1987-08-06</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>M1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>DPH_HBC_MC_MCE</td>
            </tr>
            <tr>
                <td>History RateCode</td>
                <td>123471724556</td>
                <td>1238858HIPAAS</td>
                <td>Wall</td>
                <td>Annie</td>
                <td>1990-05-03</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>M1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>NCHN_MC_MCE</td>
            </tr>
            <tr>
                <td>History RateCode</td>
                <td>123487569235</td>
                <td>1234733HIPAAS</td>
                <td>Balling</td>
                <td>Effie</td>
                <td>1992-03-03</td>
                <td>2/1/2017</td>
                <td>2/28/2017</td>
                <td>M1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>DPH_HBC_MC_MCE</td>
            </tr>
               
            </table>
        )
    }

    RatecodeDelta_History() {
        return (
            <table className="table table-bordered eligibility-list" >
                {this.render_ratecode_history_header()}
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td>1234763HIPAAS</td>
                <td>20160201</td>
                <td>20160131</td>
                <td>38</td>
                <td>ABCDEDEFGHIJKLMNOPQRSTUVWXYZ</td>
                <td>CHILD18</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td>1233999HIPAAS</td>
                <td>20160201</td>
                <td>20160131</td>
                <td>30</td>
                <td>ABCDEDEFGHIJKLMNOPQRSTUVWXYZ</td>
                <td>CHILD18</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160131</td>
                <td>M1</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160131</td>
                <td>60</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160131</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>3;2;0</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160131</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>9;9;0</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160131</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td>1234193HIPAAS</td>
                <td>20160201</td>
                <td>20160229</td>
                <td>M1</td>
                <td>ABCDEDEFGHIJKLMNOPQRSTUVWXYZ</td>
                <td>MCE</td>
                <td>9;9;0</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td>1237257HIPAAS</td>
                <td>20160201</td>
                <td>20160229</td>
                <td>M1</td>
                <td>ABCDEDEFGHIJKLMNOPQRSTUVWXYZ</td>
                <td>MCE</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160229</td>
                <td>M1</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160229</td>
                <td>M1</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>9;9;0</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160229</td>
                <td>M1</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160229</td>
                <td>60</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
            </tr>
            <tr>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>N</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>20160201</td>
                <td>20160229</td>
                <td>M1</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td style={{backgroundColor: '#dddddd'}}>-</td>
                <td>3;2;0</td>
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
                   <h5 style={{ color: '#139DC9',fontsize: "20px" }}>History RateCode Delta</h5><br></br>
                </div>
                {this.renderStatus()}

                <div className="bottom-container" style={{ marginTop: "5px" }}>
                    {this.History_RateCode()}
                    <label style={{ fontSize: "14px" }}><b>Eligibility History</b></label>
                    {this.RatecodeDelta_History()}
                </div>
            </div>
        );
    }
}