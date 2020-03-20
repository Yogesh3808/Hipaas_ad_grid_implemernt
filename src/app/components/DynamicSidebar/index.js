import React from 'react'
import './styles.css'
import Strings from '../../../helpers/Strings';
import { Link } from 'react-router-dom'
import Urls from '../../../helpers/Urls';

let isOutbound = JSON.parse(sessionStorage.getItem('isOutbound'))
export class DynamicSidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuList: [],
            menuOptions: {}
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let menuType = "I"
        try {
            if (isOutbound) {
                menuType = "O"
            }
        } catch (error) {

        }

        let role_id = JSON.parse(localStorage.getItem('role_id'))
        let query = `{
            UserwiseMenu(role_id:`+ role_id + ` menutype:"` + menuType + `" For:"S"){
              role_id
              menu_id
              menu_description
              sequence_id
              parent_node
              menuflag
              usermenuflag
              is_editor
              is_editable
              menutype
            }
        }`

        console.log(query)
     
        fetch(Urls.users, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(
                res => {
                if (res.data) {
                    this.setState({
                        menuList: res.data.UserwiseMenu
                        
                    }, () => {
                        this.sortData()
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    getkeys(key) {
        let name = ''
        if (key == 2) { name = Strings.claimsDashboard_834 }
        else if (key == 3) { name = Strings.claimsDashboard_834_details }
        else if (key == 4) { name = Strings.EnrollmentError }

        else if (key == 6) { name = Strings.FullComparsion_dashboard }
        else if (key == 7) { name = Strings.EnrollmentDetails }
        else if (key == 8) { name = Strings.EnrollmentErrors }
        else if (key == 9) { name = Strings.HistoryEligibilityErrorsDelta }
        else if (key == 10) { name = Strings.CustomDBDetails }
        else if (key == 11) { name = Strings.EligibilityErrorsDuplicate }
        else if (key == 12) { name = Strings.OutboundDetails }
        else if (key == 13) { name = Strings.RateCodeDelta }
        else if (key == 14) { name = Strings.Eligibility_Errors }
        else if (key == 15) { name = Strings.HistoryEligibilityErrorsDelta }
        else if (key == 16) { name = Strings.PlanIntegrationEligibilityErrors }
        else if (key == 17) { name = '' }
        else if (key == 18) { name = Strings.MedicalMonthly_Metrics }
        else if (key == 19) { name = Strings.Eligibility_Reconcile_Search }
        else if (key == 20) { name = Strings.Outbound_dashboard }

        else if (key == 22) { name = Strings.RealTime270 }
        else if (key == 23) { name = Strings.ElilgibilityDetails270 }
        else if (key == 24) { name = Strings.AuditSummary270 }

        else if (key == 26) { name = Strings.RealTime276 }
        else if (key == 27) { name = Strings.ElilgibilityDetails276 }

        else if (key == 29) { name = Strings.RealTimeDashboard }
        else if (key == 30) { name = Strings.claimsAudit }
        else if (key == 31) { name = Strings.ClaimDetails837 }
        else if (key == 32) { name = Strings.claimsError }
        else if (key == 33 || key == 98) { name = Strings.researchQueue }
        else if (key == 34) { name = Strings.matchClaims }
        else if (key == 99) { name = Strings.outbound_matchClaims }
        else if (key == 35 || key == 100) { name = Strings.submitClaims }

        else if (key == 37  ){ name = Strings.tradingPartnerConfiguration }
        else if (key == 38 ){ name = Strings.transactionSetup }
        else if (key == 39 ) { name = Strings.editConfiguration }
        else if (key == 40) { name = Strings.View_CustomEditsNew }
        else if (key == 41) { name = Strings.covered }
        else if (key == 42 ) { name = Strings.noncovered }
        else if (key == 43 ) { name = Strings.companionGuide }

        else if (key == 45) { name = Strings.UserList }
        else if (key == 46) { name = Strings.MenuCreate }
        else if (key == 47) { name = Strings.ChangePassword }
        else if (key == 48) { name = Strings.MenuManagement }
        // else if (key == 53) { name = Strings.EncounterDashboard }
        // else if (key == 54) { name = Strings.EncounterDetails }
        
        else if (key == 65) { name = Strings.Inbound_EncounterDashboard }
        else if (key == 66) { name = Strings.Inbound_EncounterDetails }

        else if (key == 50) { name = Strings.claimPayment_835 }
        else if (key == 51) { name = Strings.claimPayment_835_details }
        else if (key == 51) { name = Strings.MenuManagement }
      
        else if(key == 120 ) { name = Strings.tradingPartnerDetails}
        else if(key ==116){name = Strings.healthCare278}
        else if(key ==117){name = Strings.serviceDetails278}
        else if(key ==122){name = Strings.ClaimProcessingSummary}
        else if (key == 124) { name = Strings.response_999 }
        else if (key == 129) { name = Strings.Inbound_Encounter_ClaimProcessingSummary }
        else if(key ==123){name = Strings.Outbound_ClaimProcessingSummary}
        else if(key ==94){name = Strings.Outbound_RealTimeDashboard}
        else if(key ==96){name = Strings.Outbound_ClaimDetails837}
        else if(key ==126){name = Strings._277CAResponse}
        else if(key ==97){name = Strings.Outbound_ClaimsError}
        else if(key ==128){name = Strings.Inbound_Encounter_Audit}        
        else if(key ==95){name = Strings.Outbound_AuditSummary}
        else if(key ==125){name = Strings.Outbound_response_999}
        else if(key ==130){name = Strings.Outbound_Encounter_Audit}
        else if(key ==131){name = Strings.Outbound_Encounter_ClaimProcessingSummary}
        else if(key ==127){name = Strings.Outbound_277CAResponse}     
        else if (key == 109) { name = Strings.Outbound_TradingPartnerConfiguration }
        else if (key == 110) { name = Strings.Outbound_TransactionSetup }
        else if ( key == 111) { name = Strings.Outbound_EditConfigurations }
        else if (key == 112) { name = Strings.Outbound_View_customEditNew }
        else if (key == 113) { name = Strings.Outbound_Covered }
        else if (key == 114) { name = Strings.Outbound_NonCovered }
        else if (key == 115) { name = Strings.Outbound_CompanionGuide }
        else if (key == 121) { name = Strings.Outbound_StatewiseTradingPartner}
        else if(key ==53){name = Strings.Outbound_Encounter_RealTimeDashboard}
        else if(key ==54){name = Strings.Outbound_Encounter_ClaimDetails837}   
        else if(key ==133){name = Strings.NPILook_Up}  
        else if(key ==134){name = Strings.Outbound_NPILook_Up}  
        else if(key ==135){name = Strings.Outbound_BatchDetails837}  
        else if(key ==136){name = Strings.Outbound_Encounter_BatchDetails837}  
        

        return name
    }

    sortData() {
        let data = this.state.menuList
        //Adding new menu option to show 835 Details Board
        // this.state.menuList.push({
        //     role_id: 40,
        //     menu_id: 51,
        //     menu_description: "835 Details Board",
        //     sequence_id: 1,
        //     parent_node: 0,
        //     menuflag: true,
        //     usermenuflag: false,
        //     is_editor: false,
        //     is_editable: false,
        //     menutype: "O"   
        // })
        
        let menuOptions = {}
        data.forEach(item => {
            if (item.parent_node == 0) {
                menuOptions['Sb' + item.menu_id] = {
                    'name': '',
                    'array': []
                }
                menuOptions['Sb' + item.menu_id].name = item.menu_description
            } else {
                item['key'] = this.getkeys(item.menu_id)
                console.log(item.parent_node);
                menuOptions['Sb' + item.parent_node].array.push(item)
            }
        })

        console.log('Menu options ', menuOptions)

        this.setState({
            menuOptions: menuOptions
        })
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
            } else if (element.key == Strings.ElilgibilityDetails276 || element.key == Strings.elilgibilityErrors276 || element.key == Strings._277CAResponse) {
                let key = 'n'
                if (element.key == Strings.elilgibilityErrors276) {
                    key = 'Fail'
                }
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: key, count: 'n' },
                ]

            } else if (element.key == Strings.ClaimDetails837 || element.key == Strings.Inbound_EncounterDetails) {
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: 'n', count: 'n' },
                ]
            } else if (element.key == Strings.Files_837) {
                data = [
                    { flag: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n' },
                ]

            } else if (element.key == Strings.claimsDashboard_834_details) {
                data = [
                    { Total: 'total' },
                ]
               
            } else if (element.key == Strings.EnrollmentError) {
                data = [
                    { Total: 'error' },
                ]
            }
            else if (element.key == Strings.EncounterDetails) {
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: 'n', count: 'n' },
                ]
            }
            else if (element.key == Strings.Outbound_Encounter_ClaimDetails837 || element.key == Strings.Outbound_Encounter_BatchDetails837) {
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: 'n', count: 'n' },
                ]
            }
            else if (element.key == Strings.serviceDetails278) {
                data = [
                    { TransStatus: '', ErrorCode: '' },
                ]
            }
            else if (element.key == Strings.Outbound_ClaimDetails837 || element.key == Strings.Outbound_BatchDetails837) {
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: 'n', count: 'n' },
                ]
            } 
            else if (element.key === Strings.claimPayment_835_details) {
                data = [
                    { apiflag: '0', State: 'n', selectedTradingPartner: 'n', startDate: 'n', endDate: 'n', transactionId: 'n', status: 'n', count: 'n' },
                ]
            } else {
                addon = ''
            }

            row.push(
                <li>
                    <Link to={{ pathname: '/' + element.key ? element.key : '' + addon, state: { data } }}>{element.menu_description}</Link>
                </li>
            )
        });
        return (
            <li className="active">
                <a href={'#' + key} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">{value}</a>
                <ul className="collapse list-unstyled" id={key}>
                    {row}
                </ul>
            </li>
        )
    }

    renderSidebarItems() {
        let menuOptions = this.state.menuOptions
        let row = []
        for (let keys in menuOptions) {
            row.push(this.renderItems(keys, menuOptions[keys].name, menuOptions[keys].array))
        }

        return (
            <div>
                {row}
            </div>
        )
    }

    renderTabs() {
        return (
            <div id="tabs">
                <div className="row p">
                    <div className="col-6 p nopadding">
                        <a className="clickable"
                            onClick={() => {
                                isOutbound = false
                                sessionStorage.setItem('isOutbound', false)
                                setTimeout(() => {
                                    window.location.reload()
                                }, 50);
                            }}
                            >
                            <p className="p smaller-font">Inbound</p>
                            {!isOutbound ? <hr className="underline p" /> : null}
                        </a>
                    </div>

                    <div className="col-6 p nopadding">
                        <a className="clickable"
                            onClick={() => {
                                isOutbound = true
                                sessionStorage.setItem('isOutbound', true)
                                setTimeout(() => {
                                    window.location.reload()
                                }, 50);
                            }}
                            >
                            <p className="p smaller-font">Outbound</p>
                            {isOutbound ? <hr className="underline p" /> : null}
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    renderCopyright = () => {
        // fixed-bottom
        return(
            <div className="copyright"><br/>
                © 2020 Powered by HiPaaS,<br/> All rights reserved.
            </div>
        )
    }

    render() {
        return (
            <nav id="sidebar" style={{marginTop: '-17px'}}>
                <ul className="list-unstyled components">
                    {this.renderTabs()}
                    {this.renderSidebarItems()}
                    {this.renderCopyright()}
                </ul>
            </nav>
        );
    }
}