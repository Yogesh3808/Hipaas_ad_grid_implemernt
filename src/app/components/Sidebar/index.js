import React from 'react'
import './styles.css'
import Strings from '../../../helpers/Strings';
import { Link } from 'react-router-dom'


export class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            claimsArray: [
                { value: 'Claims Dashboard - 837', key: 'claimsDashboard' },
                { value: 'Claims Audit Summary', key: 'claimsAudit' },
                { value: 'Claim Details', key: 'Files_837' },
                { value: 'Claims Error', key: 'claimsError' },
                { value: 'Match Claims', key: 'matchClaims' },
                { value: 'Submit Claims', key: 'submitClaims' },
                { value: 'Research Queue', key: 'researchQueue' },

            ],
            enrollmentArray: [
                { value: '834 Enrollment Dashboard', key: 'claimsDashboard_834' },
                { value: 'Enrollment Details', key: 'claimsDashboard_834_details' },
                { value: 'Enrollment Error', key: 'Enrollment_Error' },

            ],
            pageArray: [
                { value: 'Page 1' },
                { value: 'Page 2' },
                { value: 'Page 3' },
            ],
            transactionArray: [
                { value: 'Validation', key: 'validation' },
            ],
            tradingPartner: [
                { value: 'Trading Partner', key: 'tradingPartnerConfiguration' },
                { value: 'Transaction Setup', key: 'transactionSetup' },
                // { value: 'Configure Custom Edit', key: 'editConfiguration' },
                { value: 'View Custom Edits', key: 'ViewCustomEdits' },
                // { value: 'Covered', key: 'covered' },
                // { value: 'Non Covered', key: 'noncovered' },
                // { value: 'TP Agreements' },
                { value: 'Companion Guide', key: 'companionGuide' },
                // { value: 'Manage Rule Set' },
            ],
            RealTime270: [
                { value: 'Real Time Dashboard', key: 'realTime_270' },
                // {value: 'Audit Summary - 270', key: 'AuditSummary270'},
                { value: 'Elilgibility Details', key: 'elilgibilityDetails270' },
                // {value: 'Elilgibility Errors', key: 'elilgibilityErrors270'},

            ],
            RealTime276: [
                { value: 'Real Time Dashboard', key: 'realTime_276' },
                { value: 'Claim Status Details', key: 'elilgibilityDetails276' },
                // {value: 'Claim Status Errors', key: 'elilgibilityErrors276'},

            ],
            UserManagement: [
                { value: 'HiPaaS User List', key: 'UserList' },
                { value: 'User Role Management', key: 'MenuCreate' },
                { value: 'Change Password', key: 'ChangePassword' },
                { value: 'Menu Management', key: 'MenuManagement'}

                // {value: 'Claim Status Errors', key: 'elilgibilityErrors276'},

            ],
            RealTime837: [
                {value: "Claim's Dashboard", key: 'RealTimeDashboard'},
                {value: 'Claim Processing Summary', key: 'ClaimProcessingSummary'},
                {value: 'Claim Details', key: 'ClaimDetails837'},
            ],
            fullfile: [
                { value: 'Enrollment Details', key: 'EnrollmentDetails' },
                { value: 'Enrollment Errors', key: 'EnrollmentErrors' },
                { value: 'Outbound Dashboard ', key: 'Outbound_dashboard' },
                { value: 'Eligibility Reconcile Search', key: 'Eligibility_Reconcile_Search' },
                { value: 'Eligibility Errors', key: 'Eligibility_Errors' },

                { value: 'Eligibility Errors Delta', key: 'EligibilityErrorsDelta' },
                { value: 'History Eligibility Errors (Delta)', key: 'HistoryEligibilityErrorsDelta' },
                { value: 'RateCode Delta', key: 'RateCodeDelta' },
                { value: 'Eligibility Errors(PlanIntegration)', key: 'PlanIntegrationEligibilityErrors' },
                { value: 'History RateCode Delta', key: 'HistoryRateCodeDelta' },
                { value: 'Medical Monthly Metrics', key: 'MedicalMonthly_Metrics' },
                { value: 'CustomDB Details', key: 'CustomDBDetails' },
                { value: 'Eligibility Errors (Duplicate)', key: 'EligibilityErrorsDuplicate' },
                { value: 'Outbound Details', key: 'OutboundDetails' },
                { value: 'Full File Comparison Dashboard', key: 'FullComparsion_dashboard' }
            ],

        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(key) {
        console.log('this is the key : ' + key)
        alert(key);
        this.props.handleFlag(key)
    }

    renderItems(key, value, array) {
        let row = []
        let data = []
        array.forEach(element => {
            let addon = ''
            if (element.key == Strings.RealTime276) {
                data = [
                    { apiflag: '0' },
                ]
            } else if (element.key == Strings.RealTime270) {
                data = [
                    { apiflag: '1' },
                ]
            } else if (element.key == Strings.ElilgibilityDetails270 || element.key == Strings.elilgibilityErrors270) {
                let key = 'n'
                if (element.key == Strings.elilgibilityErrors270) {
                    key = 'Fail'
                }
                data = [
                    { apiflag: '1', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: key, count: 'n' },
                ]
            } else if (element.key == Strings.ElilgibilityDetails276 || element.key == Strings.elilgibilityErrors276) {
                let key = 'n'
                if (element.key == Strings.elilgibilityErrors276) {
                    key = 'Fail'
                }
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: key, count: 'n' },
                ]

            } else if (element.key == Strings.ClaimDetails837) {
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: 'n', count: 'n' },
                ]
            } else if (element.key == Strings.Files_837) {
                data = [
                    { flag: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n' },
                ]

            } else if (element.key == Strings.claimsDashboard_834_details) {
                addon = '/total'
            } else if (element.key == Strings.EnrollmentError) {
                addon = '/error'
            } else {
                addon = ''
            }

            row.push(
                <li>
                    <Link to={{ pathname: '/' + element.key + addon, state: { data } }}>{element.value}</Link>
                </li>
            )
        });
        return (
            <li className="active padding">
                <a href={'#' + key} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">{value}</a>
                <ul className="collapse list-unstyled" id={key}>
                    {row}
                </ul>
            </li>
        )
    }

    renderSidebarItems() {
        return (
            <div>

                {this.renderItems(Strings.REALTIME270, 'Eligibility Real-time', this.state.RealTime270)}
                {this.renderItems(Strings.REALTIME276, 'Claim Status Real-time', this.state.RealTime276)}
              
                {/* {this.renderItems(Strings.CLAIMS, 'Claims Management', this.state.claimsArray)} */}
                {this.renderItems(Strings.REALTIME_837_CLAIM, '837 Claim Management', this.state.RealTime837)}
                {/* {this.renderItems(Strings.EDIT_CLAIM, 'Edit / Resubmit Claim', this.state.pageArray)} */}
                {/* ** {this.renderItems(Strings.TRAN_MANAGMENT, 'Transaction Management', this.state.transactionArray)} */}

                {this.renderItems(Strings.TRAD_MANAGEMENT, 'Admin', this.state.tradingPartner)}
                {/* {this.renderItems(Strings.ENR_MANAGEMENT, 'Enrollment Management', this.state.enrollmentArray)} */}
                {/* {this.renderItems(Strings.FULL_FILE, 'Full File Compare', this.state.fullfile)} */}
                {this.renderItems(Strings.UserManagement, 'User Management', this.state.UserManagement)}
          
                {/* {this.renderItems(Strings.PROC_MANAGEMENT, 'Process Management', this.state.pageArray)} */}
                {/* {this.renderItems(Strings.REP_MANAGEMENT, 'Report Generation', this.state.pageArray)} */}
                {/* {this.renderItems(Strings.ACK_MANAGEMENT, 'Acknowledgment Generation', this.state.pageArray)} */}
            </div>
        )
    }

    renderTabs() {
        return (
            <div id="tabs">
                <div className="row p">
                    <div className="col-6 p nopadding">
                        <p className="p smaller-font">Inbound</p>
                        <hr className="underline p" />
                    </div>

                    <div className="col-6 p nopadding">
                        <p className="p smaller-font">Outbound</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    {this.renderSidebarItems()}
                </ul>
            </nav>
        );
    }
}