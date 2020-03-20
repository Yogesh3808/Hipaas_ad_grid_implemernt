import React from 'react';
import './files-styles.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Urls from '../../../helpers/Urls';

export class Files extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsList: [],
            intakeClaims: [],
            summaryList: [],
            claimsObj: {},
            lineData: [],
            flag: this.props.flag
        }

        this.getData = this.getData.bind(this)
        this.getClaimData = this.getClaimData.bind(this)
        this.sortData = this.sortData.bind(this)
        this.renderList = this.renderList.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let db = 'IntakeClaimDatatblwithFile'
        if (this.state.flag == 'Paid Claims') {
            db = 'ClaimPaidCountData'
        } else if (this.state.flag == 'Accepted Claims') {
            db = 'ClaimAccCountData'
        } else if (this.state.flag == 'Failed File Load') {
            db = 'FileFailedFileCountdata'
        } else if (this.state.flag == 'Rejected Claims') {
            db = 'ClaimRejCountData'
        } else if (this.state.flag == 'Partial Paid Claims') {
            db = 'ClaimDeniedCountData'
        }

        let query = `{` + db + `(page:` + 0 + `){
              FileID
              FileName
              FileDate
              FSubmitter_N103
              FReceiver_N103
              FExtraField2
              BillingProviderLastName
              BillingProviderFirstName
              CreateDateTime
              SeqID
              ClaimID
              ClaimStatus
              adjudication_status
              Claim_Amount
              ClaimLevelErrors
              PatientLastName
              PatientFirstName
              ClaimTMTrackingID
              DischargeHour
              AdmissionDate
              Claim_Amount
              PatientPaid
              NetBalance
              Adjust
              InsuranceBalance
              BillingProviderAddress
              PayerFirstName
              PayerLastName
              PayerAddress
              ClaimStatus
              HI01
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
            .then(r => {
                let data = {}
                if (this.state.flag == 'Paid Claims') {
                    data = r.data.ClaimPaidCountData
                } else if (this.state.flag == 'Accepted Claims') {
                    data = r.data.ClaimAccCountData
                } else if (this.state.flag == 'Failed File Load') {
                    data = r.data.FileFailedFileCountdata
                } else if (this.state.flag == 'Rejected Claims') {
                    data = r.data.ClaimRejCountData
                } else if (this.state.flag == 'Partial Paid Claims') {
                    data = r.data.ClaimDeniedCountData
                } else {
                    data = r.data.IntakeClaimDatatblwithFile
                }

                this.setState({
                    intakeClaims: data
                })

                setTimeout(() => {
                    this.sortData()
                }, 50);
            })
            .then(data => console.log('data returned:', data));
    }

    getClaimData(FileID, ClaimID) {
        fetch(Urls.base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: "{ IntakeClaimLineDataFileIDClaimID(FileID:\"" + FileID + "\",ClaimID:\"" + ClaimID + "\"){ ClaimID LX SVD02 ServiceDate SVD03 SVD05 ErrorCode type_of_adjustment adjustment RemainigAmt RemainingPatientLiability } }"
            })
        })
            .then(res => res.json())
            .then(r => {
                console.log("Here is the data hurray : " + JSON.stringify(r))
                this.setState({
                    lineData: r.data.IntakeClaimLineDataFileIDClaimID
                })
            })
            .then(data => console.log('data returned:', data));
    }

    sortData() {
        let files = {}
        let intakeClaims = this.state.intakeClaims
        intakeClaims.forEach(item => {
            if (item.FileID in files) {
                files[item.FileID].array.push(item)
            } else {
                let array = []
                array.push(item)
                files[item.FileID] = {
                    value: item,
                    array: array
                }
            }
        })

        this.setState({
            claimsObj: files
        })
    }

    handleClick(item, claims) {
        let fileDetails = [
            { key: 'File Name', value: item.FileName },
            { key: 'File Date', value: moment(item.FileDate).format('MM/DD/YYYY') + moment(item.FileDate).format(' h:m A') },
            { key: 'Submitter', value: item.FSubmitter_N103 },
            { key: 'Receiver', value: item.FReceiver_N103 },
            { key: 'BillingProvider', value: item.BillingProviderFirstName + ' ' + item.BillingProviderLastName },
            { key: 'Created Date', value: item.CreateDateTime }
        ]

        let claimsDetails = [
            { key: 'Seq Id', value: claims.SeqID },
            { key: 'Accident Date', value: moment(claims.ClaimExtNmbr).format('MM/DD/YYYY') },
            { key: 'Patient First Name', value: claims.PatientFirstName },
            { key: 'Patient Last Name', value: claims.PatientLastName },
            { key: 'Claim TM Tracking ID', value: claims.ClaimTMTrackingID },
            { key: 'Discharge Hour', value: claims.DischargeHour },
            { key: 'Admission Date', value: claims.AdmissionDate },
            { key: 'Claim Amount', value: claims.Claim_Amount },
            { key: 'Patient Paid', value: claims.PatientPaid },
            { key: 'Net Balance', value: claims.NetBalance },
            { key: 'Adjust', value: claims.Adjust },
            { key: 'Insurance Balance', value: claims.InsuranceBalance },
            { key: 'BillingProvider', value: claims.BillingProviderFirstName + ' ' + claims.BillingProviderLastName },
            { key: 'Billing Provider Address', value: claims.BillingProviderAddress },
            { key: 'Payer', value: claims.PayerFirstName + ' ' + claims.PayerLastName },
            { key: 'Payer Address', value: claims.PayerAddress },
            { key: 'Claim Status', value: claims.ClaimStatus },
            { key: 'ICD Code', value: claims.HI01 }
        ]

        this.getClaimData(item.FileID, claims.ClaimID)

        this.setState({
            fileDetails: fileDetails,
            claimsDetails: claimsDetails
        })
    }

    renderTableHeader() {
        return (
            <div className="row">
                <div className="col-3 col-header">File Name</div>
                <div className="col-3 col-header">File Date</div>
                <div className="col-3 col-header">Status</div>
                <div className="col-3 col-header">Submitter</div>
                {/* <div className="col-2 col-header">Receiver</div> */}
            </div>
        )
    }

    renderClaimsHeader() {
        return (
            <tr className="table-head claims-text">
                <td className="table-head-text">Claim ID</td>
                <td className="table-head-text">Claim Status</td>
                <td className="table-head-text list-item-style">Current State</td>
                <td className="table-head-text list-item-style">Provider</td>
                <td className="table-head-text list-item-style">Claim Amount</td>
                <td className="table-head-text list-item-style">Error Code</td>
            </tr>
        )
    }

    renderClaimLineHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text small-font">Claim ID</td>
                <td className="table-head-text small-font">Service Line Count</td>
                <td className="table-head-text  small-font list-item-style">Provider Paid Amount</td>
                <td className="table-head-text  small-font list-item-style">Patient Paid Amount</td>
                <td className="table-head-text  small-font list-item-style">Service Date</td>
                <td className="table-head-text  small-font list-item-style">Procedure Code</td>
                <td className="table-head-text  small-font list-item-style">Paid Service Unit Count</td>
                <td className="table-head-text  small-font list-item-style">Status</td>
                <td className="table-head-text  small-font list-item-style">Type of Adjustment</td>
                <td className="table-head-text  small-font list-item-style">Adjustment</td>
                <td className="table-head-text  small-font list-item-style">Remaining Amount</td>
            </tr>
        )
    }

    renderList() {
        let row = []
        let col = []
        const data = this.state.claimsObj;
        Object.keys(data).map((keys) => {
            row.push(
                <div className="row">
                    <div className="col-3 col-style"><a href={"#" + keys} style={{ color: "#6AA2B8" }} data-toggle="collapse" aria-expanded="false">{data[keys].value.FileName}</a></div>
                    <div className="col-3 col-style">{moment(data[keys].value.FileDate).format('MM/DD/YYYY')}<br />{moment(data[keys].value.FileDate).format('h:m a')}</div>
                    <div className={"col-3 col-style " + (data[keys].value.FExtraField2 == 'Errors' || data[keys].value.FExtraField2 == 'File Error' ? 'red ' : (data[keys].value.FExtraField2 == 'Verified' ? 'green ' : ''))}>{data[keys].value.FExtraField2}</div>
                    <div className="col-3 col-style">{data[keys].value.FSubmitter_N103}</div>
                </div>
            )

            {
                col = []
                data[keys].array.forEach(item => {
                    col.push(
                        <tr>
                            <td className="list-item-style claims-text"><a href="#" style={{ color: "#6AA2B8" }} onClick={() => { this.handleClick(data[keys].value, item) }}>{item.ClaimID}</a></td>
                            <td className="list-item-style claims-text">{item.ClaimStatus}</td>
                            <td className="list-item-style claims-text">{item.adjudication_status}</td>
                            <td className="list-item-style claims-text">{item.FSubmitter_N103}</td>
                            <td className="list-item-style claims-text">{item.FReceiver_N103}</td>
                            <td className="list-item-style claims-text">{item.FExtraField2}</td>
                        </tr>
                    )
                })
            }

            row.push(
                <div id={keys} className="collapse">
                    <table id="" className="table table-bordered claim-list">
                        {this.renderClaimsHeader()}
                        {col}
                    </table>
                </div>
            )
        })

        return (
            <div>
                {this.renderTableHeader()}
                {row}
            </div>
        );
    }

    renderHeader(header) {
        return (
            <tr className="table-head">
                <td className="table-head-text">{header}</td>
            </tr>
        )
    }

    renderRows(dictionary) {
        let row = []
        let col = []
        let count = 0

        dictionary.forEach(item => {
            col.push(
                <div className="col">
                    <div className="header">{item.key}</div>
                    <div>{item.value}</div>
                </div>
            )

            if (col.length % 4 == 0) {
                row.push(<div className="row">{col}</div>)
                col = []
            }
            count++
            if (count == dictionary.length && col.length > 0) {
                row.push(<div className="row">{col}</div>)
            }
        });

        return (
            <div className="summary-style">
                {row}
            </div>
        )
    }

    renderTable() {
        let row = []
        const data = this.state.lineData;

        data.forEach((item) => {
            row.push(
                <tr>
                    <td className="claim-line-data">{item.ClaimID}</td>
                    <td className="claim-line-data">{item.LX}</td>
                    <td className="claim-line-data">{item.SVD02}</td>
                    <td className="claim-line-data">{item.RemainingPatientLiability}</td>
                    <td className="claim-line-data">{item.ServiceDate}</td>
                    <td className="claim-line-data">{item.SVD03}</td>
                    <td className="claim-line-data">{item.SVD05}</td>
                    <td className="claim-line-data">{item.ErrorCode}</td>
                    <td className="claim-line-data">{item.type_of_adjustment}</td>
                    <td className="claim-line-data">{item.adjustment}</td>
                    <td className="claim-line-data">{item.RemainigAmt}</td>
                </tr>
            )
        });

        return (
            <tbody>
                {row}
            </tbody>
        )
    }
    showAlert() {
        alert("Im an alert");
    }

    renderSummary() {
        return (
            <div>
                {
                    this.state.fileDetails ?
                        <table className="table claim-list">
                            {this.renderHeader('File #91')}
                            {this.renderRows(this.state.fileDetails)}
                        </table> : null
                }
                {
                    this.state.claimsDetails ?
                        <table className="table claim-list">
                            {this.renderHeader('Claim #792611P473789')}
                            <label onClick={this.showAlert} style={{ cursor: "pointer" }}>
                                <FontAwesomeIcon className="pull-right-icons" style={{ position: "absolute", marginLeft: "380px" }} icon={faPencilAlt} />
                            </label>
                            {this.renderRows(this.state.claimsDetails)}
                        </table> : null
                }
                {
                    this.state.lineData.length > 0 ?
                        <table className="table-bordered claim-list">
                            {/* {this.renderHeader('Claim Line Data')} */}
                            {this.renderClaimLineHeader()}
                            {this.renderTable()}
                        </table> : null
                }
            </div>
        );
    }

    render() {
        return (
            <div className="row padding-left">
                <div className="col-7 claim-list file-table">
                    {this.state.claimsObj ? this.renderList() : null}
                </div>
                <div className="col-5">
                    {this.renderSummary()}
                </div>
            </div>
        );
    }
}