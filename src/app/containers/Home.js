import React from 'react'
import { Sidebar } from '../components/Sidebar';
import {Claims} from './Claims/Dashboard';
import {RealTime} from './Eligibility/RealTime';
import '../components/Sidebar/styles.css'
import Strings from '../../helpers/Strings'
import { TradingPartnerConfiguration } from './TradingPartnerConfiguration';
import { SubmitClaim } from './SubmitClaim';
import { Files } from './Files';
import { AuditSummary } from './Claims/AuditSummary';
import { ClaimsError } from './Claims/ClaimsError';
import { MatchClaims } from './Claims/MatchClaims';
import { ResearchQueue } from './ResearchQueue';
import { EnrollmentInbound } from './Claims/EnrollmentInbound';
import { AssignedDetails } from './Claims/AssignedDetails';
import { EditConfiguration } from './EditConfigurations';
import { ViewEdit } from './ViewEdit';
import { FullFileCompare } from './FullFileCompare';
import { Files_837 } from './Files_837';
import { CoveredICDCode } from './Covered';
import { NonCovered } from './NonCovered'
import { TransactionSetup } from './TransactionSetup'
import { CompanionGuide } from './CompanionGuide';
import { RealTime276 } from './Claim_276_RealTime/Real_Time_276'
import { EligibilityDetails } from './EligibilityDetails';
import { AuditSummary270 } from './AuditSummary270';
import { ViewCustomEdits } from './View_customEdit'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Header } from '../components/Header';
import { Files_834 } from './Files_834';


const $ = window.$;

export class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            flag: Strings.CLAIMS,
            errorflag: 'Total Files',
            addon: 0
        }
    
        this.handleFlag = this.handleFlag.bind(this)
    }

    handleFlag(addon, bundle){
        this.setState({
            addon : addon,
            bundle : bundle
        })

        setTimeout(() => {
            this.setState({
                addon : addon,
                bundle : bundle
            })
        }, 50);
    }

    render() {
        return (
            <Router>
                <Header/>
                <div className="container-fluid background">
                    <div className="row">
                        <div className="col-2 nopadding white-background">
                            <Sidebar 
                                handleFlag={this.handleFlag}
                            />
                        </div>
                        <div className="col-10 container-fluid" style={{height : $(window).height()}}>
                            <Switch>
                                <Route exact path="/" component={Claims} />
                                <Route path={'/' + Strings.claimsDashboard} component={Claims} />
                                <Route path={'/'+ Strings.tradingPartnerConfiguration} component={TradingPartnerConfiguration} />
                                <Route path={'/'+ Strings.submitClaims} component={SubmitClaim} />
                                <Route path={'/'+ Strings.RealTime276 + '/:apiflag'} render={(props) => <RealTime276 {...props} handleFlag={this.handleFlag} isAuthed={true} />}/>
                                <Route path={'/'+ Strings.RealTime270  + '/:apiflag'} render={(props) => <RealTime276 {...props} handleFlag={this.handleFlag} isAuthed={true} />} />
                                <Route path={'/'+ Strings.AuditSummary270} component={AuditSummary270} />
                                <Route path={'/'+ Strings.claimDetails + '/:flag/:selectedTradingPartner/:startDate/:endDate'} component={Files_837} />
                                
                                <Route path={'/'+ Strings.claimsAudit} component={AuditSummary} />
                                <Route path={'/'+ Strings.claimsError} component={ClaimsError} />
                                <Route path={'/'+ Strings.matchClaims} component={MatchClaims} />
                                <Route path={'/'+ Strings.researchQueue} component={ResearchQueue} />
                                <Route path={'/'+ Strings.claimsDashboard_834} component={EnrollmentInbound} />
                                <Route path={'/'+ Strings.editConfiguration} component={EditConfiguration} />
                                <Route path={'/'+ Strings.viewEdit} component={ViewEdit} />
                                <Route path={'/'+ Strings.fullFile834} component={FullFileCompare} />
                                <Route path={'/'+ Strings.transactionSetup} component={TransactionSetup} />
                                <Route path={'/'+ Strings.companionGuide} component={CompanionGuide} />
                                <Route path={'/'+ Strings.covered} component={CoveredICDCode} />
                                <Route path={'/'+ Strings.noncovered} component={NonCovered} />
                                <Route path={'/'+ Strings.validation} component={Claims} />
                                <Route path={'/'+ Strings.ViewCustomEdits} component={ViewCustomEdits} />
                                <Route path={'/'+ Strings.files_834 + '/:flag'} component={Files_834} />
                                <Route path={'/'+ Strings.ElilgibilityDetails270} render={(props) => <EligibilityDetails {...props} apiflag={this.state.addon} bundle={this.state.bundle} isAuthed={true} />}/>
                                <Route path={'/'+ Strings.ElilgibilityDetails276 + '/:apiflag'} render={(props) => <EligibilityDetails {...props} isAuthed={true} />}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}