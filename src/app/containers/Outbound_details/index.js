import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class OutboundDetails extends React.Component {

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
                    <div className="medium-text" style={{ fontSize: "14px" }}>Outbound</div><br />
                    <div className="disc1">145.56K</div>

                </div>
                <div className="col-5 div-color"><span>156.07K</span></div>
                <div className="col-1 div-color" style={{ backgroundColor: 'hsl(0, 60%, 50%)' }}><span>No Outbound <br />10.58k</span></div>
            </div>
        )
    }

    renderSelection(){
        return(
            <div class="dashfrm-LR1 row">
            <div className="col-3" style={{paddingLeft: '0px'}}>
            <select className="form-control list-header" style={{fontWeight: '700',}}>
                <option value="SFHPID">SFHPID</option>
            </select>
            </div>
            <div className="col-3" style={{paddingLeft: '0px'}}>
            <select className="form-control list-header" style={{fontWeight: '700',}}>
                <option value="SFHPID">IPA</option>
            </select>
            </div>
            </div>
        )
    }

    render_eligibility_header() {
        return (
            <tr className="table-head claims-text">

                <th className="table-head-text">SFHPID</th>
                <th className="table-head-text">Elig Status</th>
                <th className="table-head-text">Last Name</th>
                <th className="table-head-text">First Name</th>
                <th className="table-head-text">End Date</th>
                <th className="table-head-text">IPAStatus</th>
                <th className="table-head-text">Start Date</th>
                <th className="table-head-text">BeaconStatus</th>
                <th className="table-head-text">VSPStatus</th>
                <th className="table-head-text">perRxMCStatus</th>
                <th className="table-head-text">perRxMMStatus</th>

            </tr>
        )
    }

    eligibility_error() {
        return (
            <table className="table table-bordered eligibility-list" id="OutboundDetails">
                {this.render_eligibility_header()}
                <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td></td>
                <td>Christine</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td></td>
                <td>David</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td></td>
                <td>Deborah</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Term</td>
                <td></td>
                <td>Fred</td>
                <td className="rightDisplay">1/31/2017</td>
                <td>No Outbound</td>
                <td className="rightDisplay">2/1/2017</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td></td>
                <td>Helen</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td></td>
                <td>Jane</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Term</td>
                <td></td>
                <td>Kathleen</td>
                <td className="rightDisplay">1/31/2017</td>
                <td>No Outbound</td>
                <td className="rightDisplay">2/1/2017</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td></td>
                <td>Kay</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td></td>
                <td>Marie</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Term</td>
                <td>Acosta</td>
                <td>Donald</td>
                <td className="rightDisplay">1/31/2017</td>
                <td>No Outbound</td>
                <td className="rightDisplay">2/1/2017</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Acosta</td>
                <td>Henry</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Acosta</td>
                <td>John</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Acosta</td>
                <td>Margaret</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Acosta</td>
                <td>Mary</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Acosta</td>
                <td>Michael</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Term</td>
                <td>Acosta</td>
                <td>Robert</td>
                <td className="rightDisplay">1/31/2017</td>
                <td>No Outbound</td>
                <td className="rightDisplay">2/1/2017</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Acosta</td>
                <td>Sheldon</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Adama</td>
                <td>Aaron</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Adama</td>
                <td>Anna</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Adama</td>
                <td>Araceli</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Adama</td>
                <td>Brenda</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="rightDisplay">1234</td>
                <td>Other Health Plan(not 307)</td>
                <td>Adama</td>
                <td>Carl</td>
                <td className="rightDisplay">1/1/1900</td>
                <td>No Outbound</td>
                <td className="rightDisplay">1/1/1900</td>
                <td></td>
                <td></td>
                <td></td>
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
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Outbound Details</h5><br></br>
                </div>
                {this.renderStatus()}
                
                <div className="bottom-container" style={{ marginTop: "15px" }}>
             
                    {this.renderSelection()}
                    <label style={{ fontSize: "14px", marginTop: "15px" }}><b>Duplicate in File</b></label>
                    {this.eligibility_error()}
                </div>
            </div>
        );
    }
}