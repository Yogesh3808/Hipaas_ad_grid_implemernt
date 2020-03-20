import React from 'react';
import './style.css';

const $ = window.$;

export class PlanIntegrationEligibilityErrors extends React.Component {

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
                    <div className="medium-text" style={{ fontSize: "14px" }}>PlanIntegration Errors</div><br />
                    <div className="disc">196</div>

                </div>
                <div className="col-6 div-color"><span>Error <br /> 196</span></div>
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
                <th className="table-head-text" style={{width: '10%'}}>Member Birth Date</th>
                <th className="table-head-text">Error Type</th>
                <th className="table-head-text">Inbound Status</th>
                <th className="table-head-text">QNXT Status</th>
                <th className="table-head-text">X12 Eff Date</th>
                <th className="table-head-text">QNXT Eff Date</th>
                <th className="table-head-text">X12 End Date</th>
                <th className="table-head-text">QNXT End Date</th>
                <th className="table-head-text">F834 To QNXT</th>
                <th className="table-head-text">Custom Error</th>
                <th className="table-head-text">CustomDB Status</th>
                <th className="table-head-text">Member Death Date</th>
                <th className="table-head-text">IPA Status</th>
            </tr>
        )
    }

    render_eligibility_history_header() {
        return (
            <tr className="table-head claims-text">
                <th className="table-head-text" style={{width: '20%'}}>Error Type</th>
                <th className="table-head-text" style={{width: '40%'}}>Error Description</th>
                <th className="table-head-text" style={{width: '10%'}}>Count</th>
            </tr>
        )
    }

    eligibility_error() {
        return (
            <table className="table table-bordered eligibility-list" id="page">
                {this.render_eligibility_header()}
                <tr>
                    <td>1234316156</td>
                    <td>1238858 HIPAAS</td>
                    <td>Carter</td>
                    <td>Vicki</td>
                    <td>1987-08-06</td>
                    <td>PlanIntegration Error</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>2/1/2017</td>
                    <td>6/1/2016</td>
                    <td>2/28/2017</td>
                    <td>12/31/2078</td>
                    <td>Adds and ChangesVoids and Terms</td>
                    <td>5.02 - Another enrollcoverage record exists</td>
                    <td>VoidTerm;; AddChange;</td>
                    <td></td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td>1234095025</td>
                    <td>1237047 HIPAAS</td>
                    <td>Mccabe</td>
                    <td>Peter</td>
                    <td>1971-04-27</td>
                    <td>PlanIntegration Error</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>2/1/2017</td>
                    <td>8/1/2016</td>
                    <td>2/28/2017</td>
                    <td>12/31/2078</td>
                    <td>Adds and ChangesVoids and Terms</td>
                    <td>5.02 - Another enrollcoverage record exists</td>
                    <td>VoidTerm;; AddChange;</td>
                    <td></td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td>12343043958</td>
                    <td>1238024 HIPAAS</td>
                    <td>King</td>
                    <td>Edna</td>
                    <td>1979-07-09</td>
                    <td>PlanIntegration Error</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>2/1/2017</td>
                    <td>10/1/2016</td>
                    <td>2/28/2017</td>
                    <td>12/31/2078</td>
                    <td>Adds and ChangesVoids and Terms</td>
                    <td>5.01 - enroll Coverage gap</td>
                    <td>VoidTerm;; AddChange;</td>
                    <td></td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td>1234075962</td>
                    <td>1237823 HIPAAS</td>
                    <td>Lemus</td>
                    <td>Nicholas</td>
                    <td>1997-09-19</td>
                    <td>PlanIntegration Error</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>2/1/2017</td>
                    <td>8/1/2016</td>
                    <td>2/28/2017</td>
                    <td>12/31/2078</td>
                    <td>Adds and ChangesVoids and Terms</td>
                    <td>5.02 - Another enrollcoverage record exists</td>
                    <td>VoidTerm;; AddChange;</td>
                    <td></td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td>1234353456</td>
                    <td>1231085 HIPAAS</td>
                    <td>Cisneros</td>
                    <td>Kurt</td>
                    <td>1985-08-01</td>
                    <td>PlanIntegration Error</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>2/1/2017</td>
                    <td>10/1/2016</td>
                    <td>2/28/2017</td>
                    <td>12/31/2078</td>
                    <td>Adds and ChangesVoids and Terms</td>
                    <td>5.01 - Enroll Coverage gap</td>
                    <td>VoidTerm;; AddChange;</td>
                    <td></td>
                    <td>UCS;</td>
                </tr>
                <tr>
                    <td>1234995139</td>
                    <td>1235401 HIPAAS</td>
                    <td>Emerson</td>
                    <td>Joseph</td>
                    <td>1987-05-24</td>
                    <td>PlanIntegration Error</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>2/1/2017</td>
                    <td>12/1/2016</td>
                    <td>2/28/2017</td>
                    <td>12/31/2078</td>
                    <td>Adds and ChangesVoids and Terms</td>
                    <td>5.02 - Another enrollcoverage record exists</td>
                    <td>VoidTerm;; AddChange;</td>
                    <td></td>
                    <td>DPH;CPG;</td>
                </tr>
                <tr>
                    <td>1234053629</td>
                    <td>1236404 HIPAAS</td>
                    <td>Godfrey</td>
                    <td>Rachel</td>
                    <td>1986-01-29</td>
                    <td>PlanIntegration Error</td>
                    <td>Active</td>
                    <td>Active</td>
                    <td>2/1/2017</td>
                    <td>5/1/2016</td>
                    <td>2/28/2017</td>
                    <td>12/31/2078</td>
                    <td>Adds and ChangesVoids and Terms</td>
                    <td>5.02 - Another enrollcoverage record exists</td>
                    <td>VoidTerm;; AddChange;</td>
                    <td></td>
                    <td>NEMS_MC;</td>
                </tr>
            </table>
        )
    }

    eligibility_History() {
        return (
            <table className="table table-bordered eligibility-list" style={{width: '70%'}}>
                {this.render_eligibility_history_header()}
                <tr>
                    <td>PlanIntegration Error</td>
                    <td>5.01 - Enroll Coverage gap</td>
                    <td style={{background: 'rgb(19, 157, 201)'}}>50</td>
                </tr>
                <tr>
                    <td>PlanIntegration Error</td>
                    <td>5.02 - Another enrollcoverage record exists</td>
                    <td style={{background: 'rgb(19, 157, 201)'}}>58</td>
                </tr>
                <tr>
                    <td>PlanIntegration Error</td>
                    <td>5.05 - Cannot insert duplicate</td>
                    <td style={{background: 'rgb(19, 157, 201)'}}>15</td>
                </tr>
                <tr>
                    <td>PlanIntegration Error</td>
                    <td>5.05 - Cannot insert duplicate key</td>
                    <td style={{background: 'rgb(19, 157, 201)'}}>1</td>
                </tr>
                <tr>
                    <td>PlanIntegration Error</td>
                    <td>5.06 - Unable to Terminate one or more enrollments</td>
                    <td style={{background: 'rgb(19, 157, 201)'}}>57</td>
                </tr>
                <tr>
                    <td>PlanIntegration Error</td>
                    <td>5.08 - File Indicates member is decreased</td>
                    <td style={{background: 'rgb(19, 157, 201)'}}>2</td>
                </tr>
                <tr>
                    <td>PlanIntegration Error</td>
                    <td>5.09 - Another enrollcoverage exists</td>
                    <td style={{background: 'rgb(19, 157, 201)'}}>1</td>
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
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Eligibility Errors (PlanIntegration)</h5><br></br>
                </div>
                {this.renderStatus()}

                <div className="bottom-container" style={{ marginTop: "5px" }}>
                    <label style={{ fontSize: "14px" }}><b>Duplicate in File</b></label>
                    {this.eligibility_error()}
                    <label style={{ fontSize: "14px" }}><b>Error Details</b></label>
                    {this.eligibility_History()}
                </div>
            </div>
        );
    }
}