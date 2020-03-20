import React from 'react'
import '../Claims/Dashboard/styles.css'
import '../color.css'
import moment from 'moment';
import Urls from '../../../helpers/Urls';
import ReactPaginate from 'react-paginate';
import DatePicker from "react-datepicker";
import Strings from '../../../helpers/Strings'
import { CommonTable } from '../../components/CommonTable';

let val = ''
export class Remittance_Viewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tradingpartner: [],
            Claim837RTProcessingSummary: [],
            recCount: 0,
            pageCount: 1,
            Months: 0,
            selectedTradingPartner: "",
            State: "",
            providerName: "",
            startDate: "",
            endDate: "",
            ServicestartDate: "",
            ServiceendDate: "",
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
         this.getData()
    }

    getCommonData() {
        let query = `{
            Trading_PartnerList(RecType :"Inbound", Transaction:"Claim837RT") {
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

 

    getData() {
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD') : ""
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : ""

        let query = `{            
            Claim837RTProcessingSummary (page:${this.state.pageCount},Sender:"${this.state.selectedTradingPartner}",State:"${this.state.State}",Provider:"${this.state.providerName}",StartDt:"${startDate}",EndDt:"${endDate}",Claimstatus:"", FileID: "" , OrderBy:"` + this.state.orderby + `",Type:"", RecType:"Inbound") {
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
                Transaction_Status
                MolinaClaimID
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
                var data = res.data.Claim837RTProcessingSummary
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
                    Claim837RTProcessingSummary: data,
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

  
    renderTableHeader() {
        return (
            <div className="row">
                <div className="col-3 col-header justify-align">
                    {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileName" : "Order By Claim837RTFileDetails.FileName", this.state.nameRotation, 'nameRotation')} src={require('../../../components/Images/up_arrow.png')} style={{ width: '14px', transform: `rotate(${this.state.nameRotation}deg)`, marginRight: '4px' }}></img> */}
                    Claim Number
                </div>
                <div className="col-2 col-header justify-align">
                    {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileName" : "Order By Claim837RTFileDetails.FileName", this.state.nameRotation, 'nameRotation')} src={require('../../../components/Images/up_arrow.png')} style={{ width: '14px', transform: `rotate(${this.state.nameRotation}deg)`, marginRight: '4px' }}></img> */}
                    Claim Date
                </div>
                <div className="col-2 col-header justify-align">
                    {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order by fileintake.FileDate" : "Order by Claim837RTFileDetails.FileDate", this.state.dateRotation, 'dateRotation')} src={require('../../../components/Images/up_arrow.png')} style={{ width: '14px', transform: `rotate(${this.state.dateRotation}deg)`, marginRight: '4px' }}></img> */}
                   Payer Name
                </div>
                <div className="col-2 col-header justify-align">
                    {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.Extrafield2" : "Order By Claim837RTFileDetails.FileStatus", this.state.statusRotation, 'statusRotation')} src={require('../../../components/Images/up_arrow.png')} style={{ width: '14px', transform: `rotate(${this.state.statusRotation}deg)`, marginRight: '4px' }}></img> */}
                    Total Amount
                </div>
                <div className="col-2 col-header justify-align">
                    {/* <img onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.Extrafield2" : "Order By Claim837RTFileDetails.FileStatus", this.state.statusRotation, 'statusRotation')} src={require('../../../components/Images/up_arrow.png')} style={{ width: '14px', transform: `rotate(${this.state.statusRotation}deg)`, marginRight: '4px' }}></img> */}
                    Total Paid
                </div>
               
            </div>
        )
    }
    renderClaimsHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text">Claim Id</td>
                {/* <td className="table-head-text list-item-style">Claim Date</td> */}
                <td className="table-head-text list-item-style">Claim Status</td>
                <td className="table-head-text list-item-style">Adjudication Status</td>
                <td className="table-head-text list-item-style">Claim Amount</td>
                <td className="table-head-text list-item-style">Error</td>
            </tr>
        )
    }
    showDetails(){
        this.setState({
            showDetails: true
        })
    }
    renderList()
    {
        let row=[]
        let col=[]
        row.push(
            <div className="row">
                <div className="col-3 col-small-style border-left small-font left-align"  onClick={() => {this.showDetails()}}  >
                <a style={{ color: "var(--light-blue)" }} data-toggle="collapse" aria-expanded="false"></a>9999999</div>
                <div className="col-2 col-small-style small-font">8/11/2020</div>
                <div className="col-2 col-small-style small-font">WASATCH</div>
               
                <div className="col-2 col-small-style small-font" ></div>
                <div className="col-2 col-small-style small-font" ></div>
              
            </div>
        )
        {
            col = []        

                col.push(
                    <tr>
                        <td className="list-item-style">fjdjf</td>
                        {/* <td className="list-item-style">{moment(d.ClaimDate).format('MM/DD/YYYY') != "Invalid date" ? moment(d.ClaimDate).format('MM/DD/YYYY') : d.ClaimDate}</td> */}
                        <td className="list-item-style">sdfs</td>
                        <td className="list-item-style"></td>
                        <td className="style-left">sdf </td>
                        <td className="list-item-style">dsf</td>
                    </tr>
                )
         
        }
        row.push(
            <div id="1" className="collapse">
                <table id="" className="table table-bordered claim-details">
                    {this.renderClaimsHeader()}
                    {/* {col} */}
                </table>

                

            </div>
        )
        return (
        <div>
            
            {this.renderTableHeader()}
                <table className="table claim-details">
                    {row}
                </table>
        </div>
        )
    }
        
    renderTransactionsNew() {
        const data = []
        // this.state.Claim837RTProcessingSummary ? this.state.Claim837RTProcessingSummary : []
        let headerArray = []
        let rowArray = []
        headerArray.push(
            { value: 'Claim Number', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileName" : "Order By Claim837RTProcessingSummary.FileName", this.state.fileNameFlag, 'fileNameFlag'), key: this.state.fileNameFlag },
            { value: 'Payer ', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.FileDate" : "Order By Claim837RTProcessingSummary.FileCrDate", this.state.fileDateFlag, 'fileDateFlag'), key: this.state.fileDateFlag },
            { value: 'Check/EFT Date', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By fileintake.ExtraField2" : "Order By Claim837RTProcessingSummary.FileStatus", this.state.extraField2Flag, 'extraField2Flag'), key: this.state.extraField2Flag },
            { value: 'Check/EFT Number' },
            { value: 'Patient Name (ID)', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.ClaimID" : "Order By Claim837RTProcessingSummary.ClaimID", this.state.claimIDFlag, 'claimIDFlag'), key: this.state.claimIDFlag },
            { value: 'Total Charged Amount', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "Order By IntakeClaimData.CreateDateTime" : "Order By Claim837RTProcessingSummary.ClaimDate", this.state.createDateTimeFlag, 'createDateTimeFlag'), key: this.state.createDateTimeFlag },
            { value: 'Total Paid Amount', method: () => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? " Order By IntakeClaimData.ClaimStatus" : "Order By Claim837RTProcessingSummary.ClaimStatus", this.state.claimStatusFlag, 'claimStatusFlag'), key: this.state.claimStatusFlag },
           
          
        )

        rowArray.push(
            { value: 'FileName' },
            { value: 'FileCrDate', isDate: 1 },
            { value: 'FileStatus' },
            { value: 'F999', isClick: 1, method: this.goto999 },
            { value: 'ClaimID' },
            { value: 'ClaimDate', isDate: 1 },
            { value: 'ClaimStatus' },
       
        )

        return (
            <CommonTable
                headerArray={headerArray}
                rowArray={rowArray}
                data={data}
               count={0}
                // count={this.state.recCount}
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

    renderTopBar() {
        return (
            <div className="form-style" id='filters'>
                <div className="form-row">
                    <div className="form-group col-2">
                        <div className="list-dashboard">Organization</div>
                        <select className="form-control list-dashboard" id="state"
                            onChange={(event) => {
                                this.setState({
                                    State: event.target.options[event.target.selectedIndex].text
                                }, () => {
                                     this.getData()
                                })
                            }}
                        >
                            <option value=""></option>
                           
                        </select>
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Patient Name</div>
                        <input className="form-control" type="text"
                            // onChange={(e) => this.onHandleChange(e)}
                        />

                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Patient Id</div>
                        <input className="form-control" type="text"
                            // onChange={(e) => this.onHandleChange(e)}
                        />

                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Check/EFT Amount($)</div>
                        <input className="form-control" type="text"
                            // onChange={(e) => this.onHandleChange(e)}
                        />

                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Claim Received Start Date</div>
                        <DatePicker
                            className="form-control list-header-dashboard"
                            selected={this.state.startDate ? new Date(this.state.startDate) : ''}
                            onChange={this.handleStartChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Claim Received End Date</div>
                        <DatePicker
                            className="form-control list-header-dashboard"
                            selected={this.state.endDate ? new Date(this.state.endDate) : ''}
                            onChange={this.handleEndChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Service Start Date</div>
                        <DatePicker
                            className="form-control list-header-dashboard"
                            selected={this.state.startDate ? new Date(this.state.startDate) : ''}
                            onChange={this.handleStartChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Service End Date</div>
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

    handleStartChange(date) {
        this.setState({
            startDate: date,
            showDetails: false
        });

        setTimeout(() => {
           
            this.getData()
        }, 50);
    }

    handleEndChange(date) {
        this.setState({
            endDate: date,
            showDetails: false
        });

        setTimeout(() => {
           
            this.getData()
        }, 50);
    }

    renderDetails(){
        return(
            <div>
                <div className="top-padding">Claim Information</div>
                <div className="border-view">
                <div className="row" >
                                    <div className="form-group col-3">
                                        <label className="list-header1">Claim Number</label><br></br>
                                        <label className="list-header1">9999999</label>
                                    </div>
                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Payer Name</label><br></br>
                                        <label className="list-header1">WASATCH</label>
                                      
                                    </div>
                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Payer Claim Control Number</label><br></br>
                                        <label className="list-header1">5733676</label>
                                      
                                    </div>
                                
                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Claim Status Code</label><br></br>
                                        <label className="list-header1">23232</label>
                                      
                                    </div>

                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Claim Filling Indicator</label><br></br>
                                        <label className="list-header1">12</label>
                                      
                                    </div>
                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Claim Received Date</label><br></br>
                                        <label className="list-header1">12/1/2019</label>
                                      
                                    </div>
                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Patient Id</label><br></br>
                                        <label className="list-header1">1234</label>
                                      
                                    </div>
                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Patient Name</label><br></br>
                                        <label className="list-header1">John</label>
                                      
                                    </div>

                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Provider Id</label><br></br>
                                        <label className="list-header1">17878797</label>
                                      
                                    </div>
                                    <div className="form-group col-sm-3">
                                    <label className="list-header1">Provider Name</label><br></br>
                                        <label className="list-header1">Jake</label>
                                      
                                    </div>
                                </div>
                               
                            
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                <div  className="row">
                <h5 className="headerText">Remittance Viewer</h5>
                {this.renderTopBar()}
                </div>
                <div className="row">
                <div className="col-6 margin-top">
                {this.renderList()               
                }
                </div>
                <div className="col-6">
                                {this.state.showDetails ? this.renderDetails() : null}
                            
                            </div>
               </div>
                {/* {this.state.Claim837RTProcessingSummary && this.state.Claim837RTProcessingSummary.length > 0 ? this.renderTableHeader() : null} */}
            </div>
        );
    }
}