import React from 'react'
import '../Claims/Dashboard/styles.css'
import moment from 'moment';
import { Topbar } from '../../components/Topbar';
import Strings from '../../../helpers/Strings';
import Urls from '../../../helpers/Urls';
import { Link } from 'react-router-dom'

export class AuditSummary270 extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            claimsError: [],
            SubTotal : 0,
            VeriTotal : 0,
            InBizstockTotal : 0,
            selectedTradingPartner: '',
            tradingpartner: [],
            PenTotal : 0,
            RejTotal : 0,
            errTotal : 0
        }

        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
      let  query=`{
            ErrorType(TypeID:"270") {
              ID
              Error_type
              Transaction_Type
              Error_Reason
            }
            Eligibilty270 {
                 Error
              }
           }`

        fetch(Urls.base_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: query})
        })
        .then(res => res.json())
        .then(res => {
            if(res.data){
                this.setState({
                    claimsError: res.data.ErrorType,
                    rejectedCount : res.data.Eligibilty270[0].Error,
                    tradingpartner: res.data.Trading_PartnerList
                })
            }
        })
        .catch(err => {
            console.log(err)
        });
    }

    renderSearchBar(){
        return(
            <div className="row">
                <input type="text" name="name" className="input-style" placeholder="Search"/>
            </div>
        )
    }

    renderClaimsError(){
        let row = []
        const data = this.state.claimsError;

        data.forEach((d) => {
            row.push(
                <tr>
                    <td>{d.Error_type}</td>
                    <td>{d.Transaction_Type}</td>
                    <td>{d.Error_Reason}</td>
               
                </tr>
            )
        });
        return(
            <table className="table table-bordered claim-list summary-list">
                <thead>
                    <tr className="table-head">
                        <td className="table-head-text">Error Code</td>
                        <td className="table-head-text">Transaction Type</td>
                        <td className="table-head-text">Error Description</td>
                       
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
        )
    }

    renderTopSubBar(){
        return(
            <div className="row">
                <div className="form-group col-sm-3">
                    <input class="form-control list-header" id="fileName-filter" name="fileName-filter" placeholder="Error Code" search-index="1" type="text" value=""/>
                </div>
                <div className="form-group col-sm-3">
                    <input class="form-control list-header" id="fileName-filter" name="fileName-filter" placeholder="Transaction Type" search-index="1" type="text" value=""/>
                </div>
                <div className="form-group col-sm-3">
                    <input class="form-control list-header" id="fileName-filter" name="fileName-filter" placeholder="Error Description" search-index="1" type="text" value=""/>
                </div>

            </div>
        )
        
    }


    renderStatus(){
        return (
            <div class="dashfrm-LR1 row">
                <div className="col-2">
                    <div className="small-text">Total Error</div>
                    <div className="red bold-text summary-values center-align"><a href="#" onClick={() => {
                        // this.props.handleFlag(Strings.ElilgibilityDetails270)
                    }}>
                        <Link to={'/' + Strings.ElilgibilityDetails270 + '/1'}>{this.state.rejectedCount}</Link>
                    </a></div>
                </div>
                <div className="col-4 div-inner"><span style={{padding:"10px"}}>TA1</span></div>
                <div className="col-3 small-div"><span style={{padding:"10px"}}>999</span></div>
                <div className="col-2 third-div"><span style={{padding:"10px"}}>AAA</span></div>
            </div>
        )
    }

    onSelect(event, key){
        if(event.target.options[event.target.selectedIndex].text == 'Provider Name' || event.target.options[event.target.selectedIndex].text == 'Trading partner'){
            this.setState({
                [key] : ''
            })
        } else {
            this.setState({
                [key] : event.target.options[event.target.selectedIndex].text
            })
        }

        setTimeout(() => {
            this.getData()
        }, 50);
    }

    render() {
        return (
            <div>
                {this.renderSearchBar()}
                <Topbar 
                    tradingpartner={this.state.tradingpartner} 
                    onSelect={this.onSelect}
                    />
                {this.renderTopSubBar()}
                {this.renderStatus()}
                {this.renderClaimsError()}
            </div>
        );
    }
}