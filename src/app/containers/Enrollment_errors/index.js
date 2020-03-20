import React from 'react';
import moment from 'moment';
import './style.css'
import {Files_834} from '../Files_834';
import { Topbar } from '../../components/Topbar';
import Urls from '../../../helpers/Urls';


export class EnrollmentErrors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          
            summaryList: [],
        }
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
        
    }

 

    getData() {
        let query = `{
            SP_GetenrollmentDetails834 {
                ID
                SFHPID
                CIN
                FirstName
                LastName
                Member_Birth_date
                Eligibility_Errors
                Inbound_X12_status
                Qnxt_status
                X12_Eff_date
                Qeffdate
                X12_Term_date
                Qenddate
                F834ToQNXT
                Member_death_date
                FAMEDetails_status
                CustomDB_staus
                PlanIntegration_status
                IPA_status
                Plancode
                Error_Type
                custome_errors
                Outbound_status
              }
        }`

        fetch(Urls.full_file, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                let array = []
                let summary = []
                let data = res.data
                
                this.setState({
                    summaryList: data.SP_GetenrollmentDetails834
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderSearchBar() {
        return (
            <div className="row">
           
                <input type="text" name="name" className="input-style" placeholder="Search" />
            </div>
        )
    }

    renderTableHeader() {
        return (
            <tr className="table-head">
                <td className="table-header-text">SFHPID</td>
                <td className="table-header-text">CIN</td>
                <td className="table-header-text">LastName</td>
                <td className="table-header-text">FirstName</td>
                <td className="table-header-text">Member Birth date</td>
                <td className="table-header-text">Inbound Status</td>
                <td className="table-header-text">QNXT Status</td>
                <td className="table-header-text">X12 Eff Date</td>
                <td className="table-header-text">QNXT Eff Date</td>
                <td className="table-header-text">X12 End Date</td>
                <td className="table-header-text">QNXT End Date</td>
                <td className="table-header-text">834 To QNXT</td>
                <td className="table-header-text">Custom Error</td>
                <td className="table-header-text">Custom Status</td>
                <td className="table-header-text">IPA Status</td>

            </tr>
        )
    }

    errorType(){

        return (
            <table className="table table-bordered error-list">
                <tr className="table-head">
                    <td className="table-header-text">Error Type</td>
                    <td className="table-header-text">Error Des.</td>
                    <td className="table-header-text">Count</td>
                </tr>   
                <tr>
                    <td className="">PlanIntegration Errors</td>
                    <td className="">5.01 Enroll Coverage gap</td>
                    <td className="">3</td>
                </tr>
                <tr>
                    <td className="">PlanIntegration Errors</td>
                    <td className="">5.09 Another enrollcoverage exists</td>
                    <td className="">1</td>
                </tr>
                <tr>
                    <td className="">PlanIntegration Errors</td>
                    <td className="">5.05 Cannot insert duplicate</td>
                    <td className="">2</td>
                </tr>
                <tr>
                    <td className="">PlanIntegration Errors</td>
                    <td className="">5.05 Cannot insert duplicate key</td>
                    <td className="">4</td>
                </tr>
              
            </table>
        );
    }

    renderList() {
        let row = []
        // <td className="list-item-style bold-text">{moment(d.date).format('YYYY/MM/DD')}</td>
        const data = this.state.summaryList;
        data.forEach((d) => {
            row.push(
                <tr>
                    <td className="">{d.SFHPID}</td>
                    <td className="">{d.CIN}</td>
                    <td className="">{d.LastName}</td>
                    <td className="">{d.FirstName}</td>
                    <td className="">{d.Member_Birth_date}</td>
                    <td className="">{d.Inbound_X12_status}</td>
                    <td className="">{d.Qnxt_status}</td>
                    <td className="">{d.X12_Eff_date}</td>
                    <td className="">{d.Qeffdate}</td>
                    <td className="">{d.X12_Term_date}</td>
                    <td className="">{d.Qenddate}</td>
                    <td className="">{d.F834ToQNXT}</td>
                    <td className="">{d.custome_errors}</td>
                    <td className="">{d.CustomDB_staus}</td>
                    <td className="">{d.IPA_status}</td>
                </tr>
            )
        });

        return (
            <table className="table table-bordered enrollment-list">
                {this.renderTableHeader()}
                <tbody>
                    {row}
                </tbody>
            </table>
        );
    }

    renderStatus(){
        return (
            <div class="row">
            <div className="col-2">
                    <div className="medium-text bold-text">Loading Date Time</div><br/>
                    <div className="" style={{marginTop: "-20px", fontSize: "14px", textAlign: "center"}}>June 20 5:45 PM</div>
                    
                </div>
                <div className="col-3">
                    <div className="medium-text bold-text">PlanIntegration Errors</div><br/>
                    <div className="disct">10</div>
                    
                </div>
                <div className="col-2 div-data1" style={{backgroundColor:"#139DC9"}}><span style={{padding:"0px", marginLeft:"-11px"}}>Error 10</span></div>
                <div className="col-5">
                    {this.errorType()}
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
        </div>
    )
}



    render() {
        return (
            <div>
               {/* {this.renderSearchBar()} */}
               <br></br>
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Enrollment Errors</h5><br></br>
                {/* <label style={{color: '#139DC9'}}><b>Enrollment Errors</b></label> */}
                {/* {this.topbar()} */}
                <Topbar flag={2} />
                {this.renderStatus()}
                {this.renderList()}
            </div >
        );
    }
}