import React from 'react'
// import '../../Claims/Dashboard/styles.css'
import moment from 'moment';
import { Topbar } from '../../components/Topbar';
import Urls from '../../../helpers/Urls';
import { Link } from 'react-router-dom'
import { getDetails } from '../../../helpers/getDetails';

export class HealthCare278 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsAudit: [],
            tradingpartner: [],
            selectedTradingPartner: '',
            TA1: '',
            ValidateError: '',
            PassCount: '',
            totalFile: ''
        }

        this.getData = this.getData.bind(this)
        // this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let query = `{
            DashboardCount278 {
                Total
                TA1
                ValidateError
                PassCount
              }
        }`

        fetch(Urls.base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                let data = res.data.DashboardCount278
                this.setState({
                    totalFile: data[0].Total,
                    TA1: data[0].TA1,
                    ValidateError: data[0].ValidateError,
                    PassCount: data[0].PassCount
                })

            })
            .catch(err => {
                console.log(err)
            });
    }

    renderSearchBar() {
        return (
            <div className="row">
                <input type="text" name="name" className="input-style" placeholder="Search" />
            </div>
        )
    }

    renderStats() {
        let data = []
        data = [
            { TransStatus: '', ErrorCode: '' },
        ]

        return (
            <div><br />
                <div className="row">
                    <div className="col-2">
                        <div className="center-align">Total Request</div>
                        <div className="center-align"><a href="#" className="blue bold-text summary-values"
                        // onClick={() => {this.props.handleFlag(Strings.claimDetails)}}

                        >
                            <Link to={{ pathname: '/serviceDetails278', state: { data: data } }}> {this.state.totalFile} </Link>
                            {/* <Link to={'/' + Strings.claimDetails , '/n/n/n/n'}>{this.state.totalFile}</Link> */}

                        </a>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="center-align">Failed TA1</div>
                        <div className="blue bold-text summary-values center-align">
                            <Link to={{
                                pathname: '/serviceDetails278', state: {
                                    data: [{
                                        TransStatus: 'Failed', ErrorCode: 'TA1'
                                    }]
                                }
                            }}>{this.state.TA1}</Link>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="center-align">Validate Error</div>
                        <div className="green bold-text summary-values center-align">
                            <Link to={{
                                pathname: '/serviceDetails278', state: {
                                    data: [{
                                        TransStatus: 'Failed', ErrorCode: 'Validate Error'
                                    }]
                                }
                            }}>{this.state.ValidateError}</Link>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="center-align">278-11 Response</div>
                        <div className="red bold-text summary-values center-align">
                            <Link to={{
                                pathname: '/serviceDetails278', state: {
                                    data: [{
                                        TransStatus: 'pass', ErrorCode: ''
                                    }]
                                }
                            }}> {this.state.PassCount}</Link> </div>
                    </div>
                </div>
            </div>
        )
    }

    dateviewtabledata() {
        return (
            <div className="container" style={{ padding: '0' }}><br /><br /><br />
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading collapsible small-padding" style={{ background: "#139DC9", }} href="#BasicX12Options">
                            <span className="panel-title" style={{ color: "white", fontSize: "14px" }}>
                                2020
       </span>
                        </div>
                        <div id="BasicX12Options small-padding"   > <div className=" content">
                            <div className="panel-heading collapsible" data-toggle="collapse" href="#ISAIdentificationOptions">
                                <span className="panel-title" style={{ fontSize: "14px" }}>
                                    February
                       </span>
                            </div>
                            <div id="ISAIdentificationOptions" className="panel-collapse content collapse">
                                <div className="panel-body">
                                    <br />
                                    <table id="datewise_data" >

                                        <thead class="thead-dark" style={{ color: "black" }}>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Avg response time</th>
                                                <th scope="col">Total request count</th>
                                                <th scope="col">Total success rate</th>
                                                <th scope="col">Total error rate</th>
                                            </tr>
                                        </thead>
                                        <tr>
                                            <td>1 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>2 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >3 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >4 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >5 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >6 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >7 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >8 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >9 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >10 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>

                                        <tr>
                                            <td >11 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >12 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >13 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >14 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >15 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >16 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >17 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >18 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >19 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >20 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >21 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >22 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >23 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >24 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >25 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >26 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >27 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >28 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >29 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>

                                    </table>
                                </div>
                            </div>
                            <div className="panel-heading collapsible small-padding" data-toggle="collapse" href="#ISAIdentificationOptions1">
                                <span className="panel-title" style={{ fontSize: "14px" }}>
                                    January
                       </span>
                            </div>
                            <div id="ISAIdentificationOptions1" className="panel-collapse content collapse">
                                <div className="panel-body">
                                    <br />
                                    <table id="datewise_data">
                                        <thead class="thead-dark" style={{ color: "black" }}>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Avg response time</th>
                                                <th scope="col">Total request count</th>
                                                <th scope="col">Total success rate</th>
                                                <th scope="col">Total error rate</th>
                                            </tr>
                                        </thead>
                                        <tr>
                                            <td >1 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >2 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >3 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >4 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >5 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >6 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >7 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >8 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >9 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >10 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >11 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >12 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >13 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >14 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >15 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >16 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >17 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >18 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >19 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >20 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >21 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >22 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >23 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >24 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >25 Sat 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >26 Sun 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >27 Mon 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >28 Tue 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >29 Wed 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >30 Thu 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td >31 Fri 2020</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    renderTopbar() {
        return (
            <div className="row">
                <div className="form-group col-3">
                    <div className="list-dashboard">State</div>
                    <select className="form-control list-dashboard" id="state"
                        // onChange={(event) => {
                        //     this.onSelect(event, 'State')
                        // }}
                    >
                        <option value=""></option>
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
                <div className="form-group col-3">
                    <div className="list-dashboard">
                        Submitter
                        </div>
                    <select className="form-control list-dashboard" id="TradingPartner"
                    // onChange={(event) => {
                    //     this.onSelect(event, 'selectedTradingPartner')
                    // }}
                    >
                        <option selected="selected" value="select">GH GENERATIONS</option>
                        <option value="select">AVAILITY</option>

                    </select>
                </div>
                <div className="form-group col-3">
                    <div className="list-dashboard">Provider Name</div>
                    <select className="form-control list-dashboard" id="ProviderName">
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
                <h5 className="headerText">278 Health Care Service Request Dashboard</h5>
                {this.renderTopbar()}
                {this.renderStats()}
                {this.dateviewtabledata()}

            </div>
        );
    }
}