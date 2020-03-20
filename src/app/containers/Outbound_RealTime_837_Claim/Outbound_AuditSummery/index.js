import React from 'react'
import '../../Claims/Dashboard/styles.css'
import moment from 'moment';
import Urls from '../../../../helpers/Urls';
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import Strings from '../../../../helpers/Strings';
import { AutoComplete } from '../../../components/AutoComplete';
import { getProviders } from '../../../../helpers/getDetails';
import { StateDropdown } from '../../../components/StateDropdown';

let val = ''
export class Outbound_AuditSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsAudit: [],
            tradingpartne837: [],
            SubTotal: 0,
            VeriTotal: 0,
            InBizstockTotal: 0,
            selectedTradingPartner: '',
            PenTotal: 0,
            RejTotal: 0,
            errTotal: 0,
            providerName: '',
            orderby: '',
            TotalClaims: '',
            Accepted: '',
            Rejected: '',
            InProgress: '',
            Total999: '',
            Total277CA: '',
            TotalSentToQNXT: '',
            Paid: '',
            denied: '',
            WIP: '',
            Pending: '',
            TotalBatch: '',
            ReadytoSend: '',
            Valid: '',
            Error: '',
            ClaimSent: '',
        }

        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
    }

    componentDidMount() {

        this.getData()
        this.getCommonData()
    }

    //   FileID
    //   filename
    //   Submitted
    //   Rejected
    //   Pending
    //   Verified
    //   Error
    //   InBizstock

    getData() {
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD') : ''
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : ''

        let query = `{
            ClaimsDailyAudit(submitter:"`+ this.state.selectedTradingPartner + `",fromDt:"` + startDate + `",ToDt:"` + endDate + `" ,  RecType:"Outbound", Provider:"${this.state.providerName}" OrderBy:"${this.state.orderby}", State:"${this.state.State}"){
              FileID
              filename
              Submitted
              Accepted
              Rejected
              SentToQNXT
              Paid
              denied
              WIP
              Pending
              F277
              F999
              FileStatus
              BatchName
              BatchStatus
              Valid
              Error
              ReadytoSend
              ClaimSent
            }
            ClaimsDailyAuditCount(submitter:"`+ this.state.selectedTradingPartner + `",fromDt:"",ToDt:""){
                SubTotal
                VeriTotal
                InBizstockTotal
                PenTotal
                RejTotal
                errTotal
            }
            FileInCount(submitter:"`+ this.state.selectedTradingPartner + `",fromDt:"",ToDt:"",RecType:"Outbound", Provider:"${this.state.providerName}", State:"${this.state.State}"){
                totalFile
                TotalClaims 
                Accepted
                Rejected
                InProgress           
                Total999 
                Total277CA  
                TotalSentToQNXT  
                Paid 
                denied   
                WIP
                Pending
                TotalBatch
                ReadytoSend
                Valid
                Error
                ClaimSent
            }
        }`
        console.log("sa,f.hdsfkfdhg", query)
        fetch(Urls.claims_837, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.data) {
                    let totalFile = 0
                    try {
                        totalFile = res.data.FileInCount[0].totalFile
                    } catch (error) {

                    }
                    console.log("sdghusighsjgn", res.data.FileInCount[0])
                    this.setState({
                        claimsAudit: res.data.ClaimsDailyAudit,
                        SubTotal: res.data.ClaimsDailyAuditCount[0].SubTotal,
                        VeriTotal: res.data.ClaimsDailyAuditCount[0].VeriTotal,
                        InBizstockTotal: res.data.ClaimsDailyAuditCount[0].InBizstockTotal,
                        PenTotal: res.data.ClaimsDailyAuditCount[0].PenTotal,
                        RejTotal: res.data.ClaimsDailyAuditCount[0].RejTotal,
                        errTotal: res.data.ClaimsDailyAuditCount[0].errTotal,
                        totalFile: totalFile,
                        TotalClaims: res.data.FileInCount[0].TotalClaims,
                        Accepted: res.data.FileInCount[0].Accepted,
                        Rejected: res.data.FileInCount[0].Rejected,
                        InProgress: res.data.FileInCount[0].InProgress,
                        Total999: res.data.FileInCount[0].Total999,
                        Total277CA: res.data.FileInCount[0].Total277CA,
                        TotalSentToQNXT: res.data.FileInCount[0].TotalSentToQNXT,
                        Paid: res.data.FileInCount[0].Paid,
                        denied: res.data.FileInCount[0].denied,
                        WIP: res.data.FileInCount[0].WIP,
                        Pending: res.data.FileInCount[0].Pending,
                        TotalBatch : res.data.FileInCount[0].TotalBatch,
                        ReadytoSend : res.data.FileInCount[0].ReadytoSend,
                        Valid : res.data.FileInCount[0].Valid,
                        Error : res.data.FileInCount[0].Error,
                        ClaimSent : res.data.FileInCount[0].ClaimSent,

                    })
                }
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

    goto277 = () => {
        sessionStorage.setItem('isOutbound', false)
        this.props.history.push('/' + Strings._277CAResponse)
        setTimeout(() => {
            window.location.reload()
        }, 50);
    }

    goto999 = () => {
        sessionStorage.setItem('isOutbound', false)
        this.props.history.push('/' + Strings.response_999)
        setTimeout(() => {
            window.location.reload()
        }, 50);
    }

    renderTransactions() {
        let row = []
        const data = this.state.claimsAudit;
        console.log("sd,fmsdjkdsjh", data)

        data.forEach((d) => {
            row.push(
                <tr>
                    <td>{d.filename}</td>
                    <td className="list-item-style">{d.FileStatus}</td>
                    <td className="list-item-style">{d.BatchName}</td>
                    <td className="list-item-style">{d.BatchStatus}</td>
                    {/* <td className="list-item-style">{d.Submitted}</td> */}
                    <td className="list-item-style">{d.Submitted}</td>
                    <td className="list-item-style">{d.Valid}</td>
                    <td className="list-item-style">{d.Error}</td>
                    {/* <td colSpan={2} className="list-item-style">{d.Accepted}</td>
                    <td className="list-item-style">{d.Rejected}</td>
                    <td className="list-item-style">0</td> */}
                    <td className="list-item-style">{d.ClaimSent}</td>
                    <td className="list-item-style"><a style={{ color: "#6AA2B8", cursor: "pointer" }}
                        onClick={() => {
                            this.goto999()
                        }}>{d.F999}</a></td>
                    <td className="list-item-style"><a style={{ color: "#6AA2B8", cursor: "pointer" }}
                        onClick={() => {
                            this.goto277()
                        }}>{d.F277}</a></td>
                    <td className="list-item-style">{d.Accepted}</td>
                    <td className="list-item-style">{d.Rejected}</td>
                </tr>
            )
        });
        return (
            <table className="table table-bordered claim-list">
                <tr className="table-head">
                    <td className="table-head-text list-item-style">File Name <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">File Status<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Batch Name<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Batch Status<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    {/* <td className="table-head-text list-item-style">From Qnxt <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td> */}
                    <td className="table-head-text list-item-style">In HiPaaS <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Valid <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Error <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    {/* <td className="table-head-text list-item-style">Accepted PreProcess <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Rejected PreProcess <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Error in PreProcess <img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td> */}
                    {/* <td className="table-head-text list-item-style">Accepted in Preprocess</td> */}
                    <td className="table-head-text list-item-style">Sent Claims<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">999<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">277 CA<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Accepted<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                    <td className="table-head-text list-item-style">Rejected<img className="SearchBarImage" src={require('../../../components/Images/search_table.png')}></img></td>
                </tr>
                <tbody >
                    <tr>
                        {/* <td>Totals</td>
                        <td className="list-item-style">{this.state.SubTotal}</td>
                        <td colSpan={2} className="list-item-style">{this.state.InBizstockTotal}</td>
                        <td className="list-item-style">{this.state.RejTotal}</td>
                        <td className="list-item-style">0</td>
                        <td colSpan={2} className="list-item-style">{this.state.VeriTotal}</td>
                        <td></td>
                        <td></td> */}
                        {/* <td className="list-item-style">{this.state.PenTotal}</td>
                        <td className="list-item-style">{this.state.errTotal}</td> */}
                    </tr>
                    {row}
                </tbody>
            </table>
        )
    }

    onSelect(event, key) {
        if (event.target.options[event.target.selectedIndex].text == 'Provider Name' || event.target.options[event.target.selectedIndex].text == 'Trading partner') {
            this.setState({
                [key]: ''
            })
        } else {
            this.setState({
                [key]: event.target.options[event.target.selectedIndex].text
            })
        }

        setTimeout(() => {
            this.getData()
        }, 50);
    }

    getCommonData() {
        let query = `{
            Trading_PartnerList(RecType :"Outbound", Transaction:"Claim837RT") {
                Trading_Partner_Name 
            }
        }`


        fetch(Urls.common_data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                if (res.data) {

                    this.setState({
                        tradingpartne837: res.data.Trading_PartnerList ? res.data.Trading_PartnerList : [],
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    renderStats() {
        return (
            <div className="row padding-left" >

                <div className="col summary-container">
                    <div className="summary-header">Total Files</div>
                    <div className="green summary-title">{this.state.totalFile}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">Ready to Send</div>
                    <div className="blue summary-title">{this.state.ReadytoSend}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">Valid</div>
                    <div className="green summary-title">{this.state.Valid}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">Errors</div>
                    <div className="red summary-title">{this.state.Error}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">Sent Claims</div>
                    <div className="green summary-title">{this.state.ClaimSent}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">Accepted</div>
                    <div className="green summary-title">{this.state.Accepted}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">Rejected</div>
                    <div className="orange summary-title">{this.state.Rejected}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">999</div>
                    <div className="green summary-title">{this.state.Total999}</div>
                </div>

                <div className="col summary-container">
                    <div className="summary-header">277 CA</div>
                    <div className="orange summary-title">{this.state.Total277CA}</div>
                </div>
            </div>

        )
    }
    handleStartChange(date) {
        this.setState({
            startDate: date,
            showDetails: false
        });

        setTimeout(() => {
            // this.getCountData()
            this.getData()
        }, 50);
    }

    handleEndChange(date) {
        this.setState({
            endDate: date,
            showDetails: false
        });

        setTimeout(() => {
            // this.getCountData()
            this.getData()
        }, 50);
    }

    onHandleChange = (e) => {
        clearTimeout(val)
        let providerName = e.target.value
        val = setTimeout(() => {
            getProviders("Inbound", providerName)
                .then(list => {
                    this.setState({
                        providers: list
                    })
                }).catch(error => {
                    console.log(error)
                })
        }, 300);
    }

    onSelected = (value) => {
        this.setState({
            providerName: value
        }, () => {
            this.getData()
        })
    }

    _handleStateChange = (event) => {
        this.setState({
            State: event.target.options[event.target.selectedIndex].text,
            showDetails: false
        }, () => {
            this.getData()
        })
    }

    renderTopBar() {
        return (
            <div className="form-style" id='filters'>
                <div className="form-row">
                    <div className="form-group col-2">
                        <div className="list-dashboard">State</div>
                        <StateDropdown
                            method={this._handleStateChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Provider</div>
                        <AutoComplete
                            list={this.state.providers}
                            onHandleChange={this.onHandleChange}
                            onSelected={this.onSelected}
                        />

                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Sender</div>
                        <select className="form-control list-dashboard" id="TradingPartner"
                            onChange={(event) => {
                                this.onSelect(event, 'selectedTradingPartner')
                            }}
                        >

                            <option value="select"></option>
                            {this.getoptions()}
                        </select>
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Start Date</div>
                        <DatePicker
                            className="form-control list-header-dashboard"
                            selected={this.state.startDate ? new Date(this.state.startDate) : ''}
                            onChange={this.handleStartChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">End Date</div>
                        <DatePicker
                            className="form-control list-header-dashboard"
                            selected={this.state.endDate ? new Date(this.state.endDate) : ''}
                            onChange={this.handleEndChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    getoptions() {
        console.log("sfsdsds", this.state.tradingpartne837)
        let row = []
        this.state.tradingpartne837.forEach(element => {
            if (!element) {
                return
            }
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }
    render() {
        return (
            <div>
                <h5 className="headerText">Claims Audit Summary (Outbound)</h5>
                {this.renderTopBar()}
                {this.renderStats()}
                <div className="col-12" style={{ padding: "0px" }}>
                    {this.state.claimsAudit && this.state.claimsAudit.length > 0 ? this.renderTransactions() : null}
                </div>
            </div>
        );
    }
}