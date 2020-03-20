import React from 'react'
import '../../Claims/Dashboard/styles.css'
import '../../color.css'
import moment from 'moment';
import Urls from '../../../../helpers/Urls';
import ReactPaginate from 'react-paginate';
import DatePicker from "react-datepicker";
import Strings from '../../../../helpers/Strings'
import { CommonTable } from '../../../components/CommonTable';
import { StateDropdown } from '../../../components/StateDropdown';

let val = ''
export class Outbound_Encounter_ClaimProcessingSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tradingpartner: [],
            EncounterProcessingSummary: [],
            recCount: 0,
            pageCount: 1,
            Months: 0,
            selectedTradingPartner: "",
            State: "",
            providerName: "",
            startDate: "",
            endDate: "",
            TotalClaims: 0,
            Accepted: 0,
            Rejected: 0,
            TotalSentToQNXT: 0,
            Total999: 0,
            Total277CA: 0,
            Paid: 0,
            Pending: 0,
            Denide: 0,
            wip90: 0,
            orderby: '',

            fileNameFlag: 180,
            fileDateFlag: 180,
            extraField2Flag: 180,
            claimIDFlag: 180,
            createDateTimeFlag: 180,
            claimStatusFlag: 180,
            subscriber_IDFlag: 180,
            subscriberLastNameFlag: 180,
            subscriberFirstNameFlag: 180,
        }

        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
    }

    componentDidMount() {
        this.getCommonData()
        this.getCountData()
        this.getData()
    }

    getCommonData() {
        let query = `{
            Trading_PartnerList(RecType :"Outbound", Transaction:"Encounter") {
                Trading_Partner_Name 
            }
        }`

        console.log('query ', query)
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
                        tradingpartner: res.data.Trading_PartnerList ? res.data.Trading_PartnerList : [],
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    getCountData() {

        let query = `{EncounterFileInCnt(submitter:"${this.state.selectedTradingPartner}"  fromDt:"${this.state.startDate}" ToDt:"${this.state.endDate}" RecType:"Outbound") {
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
          } }`

        console.log(query)

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
                var data = res.data.EncounterFileInCnt
                if (data && data.length > 0) {
                    let Accepted = data[0].Accepted
                    let Rejected = data[0].Rejected
                    let TotalSentToQNXT = data[0].TotalSentToQNXT
                    let Total999 = data[0].Total999
                    let Total277CA = data[0].Total277CA

                    this.setState({
                        Accepted: Accepted,
                        Rejected: Rejected,
                        TotalSentToQNXT: TotalSentToQNXT,
                        Total999: Total999,
                        Total277CA: Total277CA,
                        Paid: data[0].Paid,
                        Pending: data[0].Pending,
                        Denide: data[0].denied,
                        wip90: data[0].WIP,
                        TotalBatch: data[0].TotalBatch,
                        ReadytoSend: data[0].ReadytoSend,
                        Valid: data[0].Valid,
                        Error: data[0].Error,
                        ClaimSent: data[0].ClaimSent,
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    getData() {
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD') : ""
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : ""

        let query = `{            
            EncounterProcessingSummary (page:${this.state.pageCount},Sender:"${this.state.selectedTradingPartner}",State:"${this.state.State}",Provider:"${this.state.providerName}",StartDt:"${startDate}",EndDt:"${endDate}",Claimstatus:"", FileID: "" , OrderBy:"` + this.state.orderby + `",Type:"", RecType:"Outbound") {
                RecCount
                ClaimID
                ClaimDate
                ClaimTMTrackingID
                Subscriber_ID
                Claim_Amount
                ClaimStatus
                ProviderLastName
                ProviderFirstName
                SubscriberLastName
                SubscriberFirstName
                adjudication_status
                ClaimLevelErrors
                ClaimUniqueID
                FileID
                FileName
                FileCrDate
                FileStatus
                F999
				F277
                TotalLinewise835
                TotalLine
                BatchName
                BatchStatus
            }
        }`
        console.log(query)
        fetch(Urls.claim_processing, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                var data = res.data.EncounterProcessingSummary
                let count = 0
                if (data && data.length > 0) {
                    let recCount = data[0].RecCount
                    try {
                        count = recCount / 10
                        count = count.floor(count)
                        if (recCount % 10 > 0) {
                            count = count + 1
                        }
                    } catch (error) {

                    }

                }

                this.setState({
                    EncounterProcessingSummary: data,
                    recCount: count,
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

    handlePageClick(data, fileId) {
        let page = data.selected + 1
        this.setState({
            pageCount: page
        })

        setTimeout(() => {
            this.getData()
        }, 50);
    }

    renderTransactions() {
        let row = []
        const data = this.state.EncounterProcessingSummary;

        data.forEach((d) => {
            var providerName = d.ProviderFirstName ? d.ProviderFirstName : '' + " " + d.ProviderLastName ? d.ProviderLastName : ''
            row.push(
                <tr>
                    <td className="list-item-style">{d.FileName}</td>
                    <td className="list-item-style">{moment(d.FileCrDate).format('MMM D YYYY hh:mm a')}</td>
                    <td className="list-item-style">{d.FileStatus}</td>
                    <td className="list-item-style">{d.ClaimID}</td>
                    <td className="list-item-style">{moment(d.ClaimDate).format('MMM D YYYY hh:mm a') != 'Invalid date' ? moment(d.ClaimDate).format('MMM D YYYY hh:mm a') : d.ClaimDate}</td>
                    <td className="list-item-style">{d.ClaimStatus}</td>
                    <td className="list-item-style">{d.Subscriber_ID}</td>
                    <td className="list-item-style">{d.SubscriberLastName}</td>
                    <td className="list-item-style">{d.SubscriberFirstName}</td>
                    <td className="list-item-style">{d.ProviderLastName}</td>
                    <td className="list-item-style">{d.ProviderFirstName}</td>
                    <td className="list-item-style">{d.Claim_Amount}</td>


                </tr>
            )
        })


        return (
            <div>
                <table className="table table-bordered claim-list">
                    <thead>
                        <tr className="table-head">
                            <td className="table-head-text"><small>File Name</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileName asc" : "Order By EncounterProcessingSummary.FileName asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileName desc" : "Order By EncounterProcessingSummary.FileName desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>File Date</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileDate asc" : "Order By EncounterProcessingSummary.FileCrDate asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileDate desc" : "Order By EncounterProcessingSummary.FileCrDate desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>File Status</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.ExtraField2 asc" : "Order By EncounterProcessingSummary.FileStatus asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.ExtraField2 desc" : "Order By EncounterProcessingSummary.FileStatus desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>Encounter Id</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.ClaimID asc" : "Order By EncounterProcessingSummary.ClaimID asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.ClaimID desc" : "Order By EncounterProcessingSummary.ClaimID desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>Encounter Date</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.CreateDateTime asc" : "Order By EncounterProcessingSummary.ClaimDate asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.CreateDateTime desc" : "Order By EncounterProcessingSummary.ClaimDate desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>Encounter Status</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? " Order By IntakeClaimData.ClaimStatus asc" : "Order By EncounterProcessingSummary.ClaimStatus asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? " Order By IntakeClaimData.ClaimStatus desc" : "Order By EncounterProcessingSummary.ClaimStatus desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>Subscriber Id</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.Subscriber_ID asc" : "Order By EncounterProcessingSummary.Subscriber_ID asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.Subscriber_ID desc" : "Order By EncounterProcessingSummary.Subscriber_ID desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>Subscriber Last Name</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.SubscriberLastName asc" : "Order By EncounterProcessingSummary.SubscriberLastName asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.SubscriberLastName desc" : "Order By EncounterProcessingSummary.SubscriberLastName desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>Subscriber First Name</small>
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.SubscriberFirstName asc" : "Order By EncounterProcessingSummary.SubscriberFirstName asc")} src={require('../../../components/Images/icons8-long-arrow-up-32.png')} style={{ width: '13px' }}></img> */}
                                {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.SubscriberFirstName desc" : "Order By EncounterProcessingSummary.SubscriberFirstName desc")} src={require('../../../components/Images/icons8-down-arrow-24.png')} style={{ width: '15px' }}></img> */}
                            </td>
                            <td className="table-head-text"><small>Provider Last Name</small></td>
                            <td className="table-head-text"><small>Provider First Name</small></td>
                            <td className="table-head-text"><small>Encounter Amount</small></td>

                        </tr>
                    </thead>

                    {row}

                </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'page-link'}
                    initialPage={0}
                    pageCount={this.state.recCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(page) => { this.handlePageClick(page) }}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    previousClassName={'page-link'}
                    nextClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        )
    }

    goto277 = () => {
        sessionStorage.setItem('isOutbound', false)
        this.props.history.push('/' + Strings._277CAResponse, {
            flag: 1
        })
        setTimeout(() => {
            window.location.reload()
        }, 50);
    }

    goto999 = () => {
        sessionStorage.setItem('isOutbound', false)
        this.props.history.push('/' + Strings.response_999, {
            flag: 1
        })
        setTimeout(() => {
            window.location.reload()
        }, 50);
    }

    renderTransactionsNew() {
        const data = this.state.EncounterProcessingSummary ? this.state.EncounterProcessingSummary : []
        let headerArray = []
        let rowArray = []

        headerArray.push(
            { value: 'File Name', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileName" : "Order By EncounterProcessingSummary.FileName", this.state.fileNameFlag, 'fileNameFlag'), key: this.state.fileNameFlag },
            { value: 'File Date', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileDate" : "Order By EncounterProcessingSummary.FileCrDate", this.state.fileDateFlag, 'fileDateFlag'), key: this.state.fileDateFlag },
            { value: 'File Status', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.ExtraField2" : "Order By EncounterProcessingSummary.FileStatus", this.state.extraField2Flag, 'extraField2Flag'), key: this.state.extraField2Flag },
            { value: 'Batch Name' },
            { value: 'Batch Status' },
            { value: '999' },
            { value: 'Encounter Id', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.ClaimID" : "Order By EncounterProcessingSummary.ClaimID", this.state.claimIDFlag, 'claimIDFlag'), key: this.state.claimIDFlag },
            { value: 'Encounter Date', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.CreateDateTime" : "Order By EncounterProcessingSummary.ClaimDate", this.state.createDateTimeFlag, 'createDateTimeFlag'), key: this.state.createDateTimeFlag },
            { value: 'Encounter Status', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? " Order By IntakeClaimData.ClaimStatus" : "Order By EncounterProcessingSummary.ClaimStatus", this.state.claimStatusFlag, 'claimStatusFlag'), key: this.state.claimStatusFlag },
            // {value : 'Subscriber Last Name', method : () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.SubscriberLastName" : "Order By EncounterProcessingSummary.SubscriberLastName", this.state.subscriberLastNameFlag, 'subscriberLastNameFlag') , key : this.state.subscriberLastNameFlag},
            // {value : 'Subscriber First Name', method : () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.SubscriberFirstName" : "Order By EncounterProcessingSummary.SubscriberFirstName", this.state.subscriberFirstNameFlag, 'subscriberFirstNameFlag') , key : this.state.subscriberFirstNameFlag},
            // {value : 'Provider Last Name'},
            // {value : 'Provider First Name'},
            // { value: 'Encounter Amount' },
            // { value: 'Subscriber Id', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.Subscriber_ID" : "Order By EncounterProcessingSummary.Subscriber_ID", this.state.subscriber_IDFlag, 'subscriber_IDFlag'), key: this.state.subscriber_IDFlag },
            { value: 'State Status' },
            { value: '277CA' },
            // {value : 'Total Line count | 835 Received'},
        )

        rowArray.push(
            { value: 'FileName' },
            { value: 'FileCrDate', isDate: 1 },
            { value: 'FileStatus' },
            { value: 'BatchName' },
            { value: 'BatchStatus' },
            { value: 'F999', isClick: 1, method: this.goto999 },
            { value: 'ClaimID' },
            { value: 'ClaimDate', isDate: 1 },
            { value: 'ClaimStatus' },
            // { value : 'SubscriberLastName'},
            // { value : 'SubscriberFirstName'},
            // { value : 'ProviderLastName'},
            // { value : 'ProviderFirstName'},
            // { value: 'Claim_Amount', isAmount: 1 },
            // { value: 'Subscriber_ID' },
            { value: 'adjudication_status' },
            { value: 'F277', isClick: 1, method: this.goto277 },
            // { value: 'TotalLine', secondVal: 'TotalLinewise835', isBar: 1 },
        )

        return (
            <CommonTable
                headerArray={headerArray}
                rowArray={rowArray}
                data={data}
                count={this.state.recCount}
                handlePageClick={this.handlePageClick}
            />
        )
    }

    handleSort = (e, rotation, key) => {
        let addOn = " asc"
        if (rotation == 0) {
            addOn = " desc"
        }

        e = e + addOn
        this.setState({
            orderby: e,
            [key]: rotation == 0 ? 180 : 0
        })
        setTimeout(() => {
            this.getData()
        }, 50);
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

    onHandleChange(e) {
        clearTimeout(val)
        let providerName = e.target.value
        val = setTimeout(() => {
            this.setState({
                providerName: providerName
            }, () => {
                this.getCountData()
                this.getData()
            })
        }, 300);
    }

    getoptions() {
        let row = []
        this.state.tradingpartner.forEach(element => {
            if (!element) {
                return
            }
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }

    _handleStateChange = (event) => {
        this.setState({
            State: event.target.options[event.target.selectedIndex].text,
        }, () => {
            this.getCountData()
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
                        <input className="form-control" type="text"
                            onChange={(e) => this.onHandleChange(e)}
                        />

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
                    <div className="form-group col-2">
                        <div className="list-dashboard">Sender</div>
                        <select className="form-control list-dashboard" id="TradingPartner"
                            onChange={(event) => {
                                this.onSelect(event, 'selectedTradingPartner')
                            }}>
                            <option value="select"></option>
                            {this.getoptions()}
                        </select>
                    </div>

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
            this.getCountData()
            this.getData()
        }, 50);
    }

    handleEndChange(date) {
        this.setState({
            endDate: date,
            showDetails: false
        });

        setTimeout(() => {
            this.getCountData()
            this.getData()
        }, 50);
    }

    renderStats() {
        console.log(this.state.Accepted)
        return (

            <div className="row padding-left" style={{ marginBottom: '10px' }}>

                <div className="col summary-container">
                    <div className="summary-header">READY TO SEND</div>
                    <div className="blue summary-title">{this.state.ReadytoSend}</div>
                </div>

                <div className="col summary-container">
                    <div className="summary-header">ERRORS</div>
                    <div className="red summary-title">{this.state.Error}</div>
                </div>

                <div className="col summary-container">
                    <div className="summary-header">SENT TO STATE</div>
                    <div className="green summary-title">{this.state.ClaimSent}</div>
                </div>

                <div className="col summary-container">
                    <div className="summary-header">ACCEPTED ENCOUNTER </div>
                    <div className="green summary-title">{this.state.Accepted}</div>
                </div>

                <div className="col summary-container">
                    <div className="summary-header">REJECTED ENCOUNTER </div>
                    <div className="red summary-title">{this.state.Rejected}</div>
                </div>
                <div className="col summary-container">
                    <div className="summary-header">999</div>
                    <div className="red summary-title">{this.state.Total999}</div>
                </div>

                {/* <div className="col summary-container">
                    <div className="summary-header">SENT TO STATE</div>
                    <div className="green summary-title">{this.state.TotalSentToQNXT}</div>
                </div> */}
                {/* <div className="col summary-container">
                    <div className="summary-header">REJECTED BY STATE</div>
                    <div className="red summary-title">0</div>
                </div> */}

                <div className="col summary-container">
                    <div className="summary-header">277 CA</div>
                    <div className="red summary-title">{this.state.Total277CA}</div>
                </div>
                {/* <div className="col summary-container">
                            <div className="summary-header">PAID</div>
                            <div className="green summary-title">{this.state.Paid}</div>
                        </div> 
                
                        <div className="col summary-container">
                            <div className="summary-header">PENDING</div>
                            <div className="orange summary-title">{this.state.Pending}</div>
                        </div>
              
                        <div className="col summary-container">
                            <div className="summary-header">DENIED</div>
                            <div className="red summary-title">{this.state.Denide}</div>
                        </div>  */}


            </div>

        )
    }

    render() {
        return (
            <div>
                <h5 className="headerText">Encounter Processing Summary(Outbound)</h5>
                {this.renderTopBar()}
                {this.renderStats()}
                {this.state.EncounterProcessingSummary && this.state.EncounterProcessingSummary.length > 0 ? this.renderTransactionsNew() : null}
            </div>
        );
    }
}