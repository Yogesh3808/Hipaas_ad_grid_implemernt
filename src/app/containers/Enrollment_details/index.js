import React from 'react';
import moment from 'moment';
import './Enrollmentdetails.css'
import {Files_834} from '../Files_834';
import { Topbar } from '../../components/Topbar';
import Urls from '../../../helpers/Urls';


export class EnrollmentDetails extends React.Component {

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
                <div className="col-3">
                    <div className="medium-text">Eligibility Discrepancies</div><br/>
                    <div className="disct">156.1K</div>
                    
                </div>
                <div className="col-2 div-data" style={{backgroundColor:"#139DC9"}}><span style={{padding:"0px", marginLeft:"-11px"}}>Active 8K</span></div>
                <div className="col-2 div-data" style={{backgroundColor:"#83D2B4"}}><span style={{padding:"0px", marginLeft:"-11px"}}>Hold 10K</span></div>
                <div className="col-2 div-data" style={{backgroundColor:"#A0538F"}}><span style={{padding:"0px", marginLeft:"-11px"}}>Term 2K</span></div>
                <div className="col-2 div-data" style={{backgroundColor:"#bb1f44"}}><span style={{padding:"0px", marginLeft:"-11px"}}>Helth Plan 8.36K</span></div>

            </div>
        )
    }

searchBar(){
    return(
        <div className="row" style={{marginTop: "15px"}}>
            <div class="col-3">
            <input class="list-header form-control input-filter" id="fileName-filter" name="fileName-filter" placeholder="X12 File Status" search-index="1" type="text" />
            </div>
            <div class="col-3">
            <input class="list-header form-control input-filter" id="fileName-filter" name="fileName-filter" placeholder="CIN" search-index="1" type="text" />
            </div>
            <div class="col-3">
            <input class="list-header form-control input-filter" id="fileName-filter" name="fileName-filter" placeholder="SFHPID" search-index="1" type="text" />
            </div>
            <div class="col-3">
            <input class="list-header form-control input-filter" id="fileName-filter" name="fileName-filter" placeholder="QNXT Status" search-index="1" type="text" />
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
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Enrollment Details</h5><br></br>
                {/* {this.topbar()} */}
                <Topbar flag={2} />
                {this.renderStatus()}
                {this.searchBar()}
                {this.renderList()}
            </div >
        );
    }
}