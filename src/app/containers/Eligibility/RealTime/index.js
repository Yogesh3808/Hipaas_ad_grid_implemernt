import React from 'react'
import '../../Claims/Dashboard/styles.css'
import {Pie, Bar} from 'react-chartjs-2';
import moment from 'moment';
import Urls from '../../../../helpers/Urls';

const data = {
	labels: [
		'Accepted Claims',
		'Rejected Claims'
	],
	datasets: [{
		data: [310,50],
		backgroundColor: [
		'#139DC9',
		'#83D2B4'
		],
		hoverBackgroundColor: [
		'#139DC9',
		'#83D2B4'
		]
    }]
};

const bardata = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#139DC9',
        borderColor: '#139DC9',
        borderWidth: 1,
        hoverBackgroundColor: '#139DC9',
        hoverBorderColor: '#139DC9',
        data: [65, 59, 80, 81]
      },
      {
        label: 'My second dataset',
        backgroundColor: '#83D2B4',
        borderColor: '#83D2B4',
        borderWidth: 1,
        hoverBackgroundColor: '#83D2B4',
        hoverBorderColor: '#83D2B4',
        data: [25, 56, 55, 40]
      }
    ],
    legend: {
        display: false
    }
  };

export class RealTime extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            claimsList : [],
            summaryList : [],
            showDetails: false,
            files_list : []
        }

        this.getData = this.getData.bind(this)
    }

    componentWillReceiveProps(){
        setTimeout(() => {
            this.getData()
        }, 50);
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        let query = `{
            Eligibilty270 {
              AvgResTime
              TotalNumOfReq
              Success
              Error
            }
        }`

        if(this.props.apiflag == 1){
            query = `{
                Eligibilty276 {
                  AvgResTime
                  TotalNumOfReq
                  Success
                  Error
                }
            }`
        }

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
                let data = []
                if(this.props.apiflag){
                    data = res.data.Eligibilty276[0]
                } else {
                    data = res.data.Eligibilty270[0]
                }

                let summary = [
                    {name:'Avg Response Time (sec)', value : data.AvgResTime},
                    {name:'Total Number Of Requests', value : data.TotalNumOfReq},
                    {name:'Total Success Count', value : data.Success},
                    {name:'Total Error Count', value : data.Error},
                ]
                
                this.setState({
                    summaryList: summary
                })
            }
        })
        .catch(err => {
            console.log(err)
        });
    }

    getTransactions(key){
        let query = ''
        let typeId = "270"
        if(this.props.apiflag == 1){
            typeId = "276"
        }
        if(key == 'Total Number Of Requests'){
            query = "{ EligibilityAllDtlTypewise (TypeID:\""+typeId+"\"){ Trans_CountID TypeOfTransaction AvgResTime TotalNumOfReq Success Error Date Trans_type Submiter Trans_ID Error_Code } }"
        } else {
            query = "{ EligibilityErrorDtlTypewise (TypeID:\""+typeId+"\"){ Trans_CountID TypeOfTransaction AvgResTime TotalNumOfReq Success Error Date Trans_type Submiter Trans_ID Error_Code } }"
        }

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
                    files_list : key == 'Total Number Of Requests' ? res.data.EligibilityAllDtlTypewise : res.data.EligibilityErrorDtlTypewise
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
                <input type="text" name="name" className="input-style" placeholder="Search Claim"/>
            </div>
        )
    }

    renderCharts(){
        return(
            <div className="row chart">
                <div className="col-6">
                    <span>Total</span>
                    <Pie data={data}
                        options={{
                            elements: {
                                arc: {
                                    borderWidth: 0
                                }
                            },
                            legend: {
                                display: false,
                            }
                        }}
                        width={100}
                        height={60}/>
                </div>
                <div className="col-6">
                    <span>Response Time</span>
                    <Bar
                        data={bardata}
                        width={100}
                        height={60}
                        options={{
                            legend: {
                                display: false,
                            }
                        }}/>
                </div>
            </div>
        )
    }

    gotoRealTimeTransactions(key){
        this.setState({
            key : key
        })

        setTimeout(() => {
            this.getTransactions(key)
        }, 50);
    }

    renderSummary(){
        let row = []
        const data = this.state.summaryList;
        data.forEach((d) => {
            row.push(
                <tr>
                    <td className="bold-text">{d.name}</td>
                    <td className={
                        (d.name == 'Avg Response Time (sec)') ? 'blue bold-text summary-values' :
                        (d.name == 'Total Success Count') ? 'green bold-text summary-values' :
                        (d.name == 'Total Number Of Requests' || d.name == 'Total Error Count') ? 'red bold-text summary-values' : ''
                    }><a href="#" onClick={() => {this.gotoRealTimeTransactions(d.name)}}>{d.value}</a></td>
                </tr>
            )
        });
    
        return (
            <table className="table table-bordered claim-list summary-list">
                <tbody>
                    {row}
                </tbody>
            </table>
        );
    }

    showDetails(){
        this.setState({
            showDetails: true
        })
    }

    renderTransactions(){
        let row = []
        const data = this.state.files_list;

        data.forEach((d) => {
            row.push(
                <tr>
                    <td>{d.Trans_ID}</td>
                    <td>{moment(d.Date).format('MMM DD YYYY, h:m a')}</td>
                    <td>{d.Trans_type}</td>
                    <td>{d.Submiter}</td>
                    <td>{d.Error_Code}</td>
                    <td><a href="#" onClick={() => {this.showDetails()}} className="btn-background">View</a></td>
                </tr>
            )
        });
        return(
            <table className="table table-bordered claim-list summary-list">
                <thead>
                    <tr className="table-head">
                        <td className="table-head-text">Transaction Id</td>
                        <td className="table-head-text list-item-style">Transaction Date</td>
                        <td className="table-head-text list-item-style">Trans Type</td>
                        <td className="table-head-text list-item-style">Submitter</td>
                        <td className="table-head-text list-item-style">Error Code</td>
                        <td className="table-head-text list-item-style">View</td>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
        )
    }

    renderDetails(){
        return(
            <div>
                <div className="top-padding">Transaction Request</div>
                <div className="border-view">ISA*00* *00* *ZZ*SUBMITTERID *ZZ*CMS *160127*0734*^*00501*000005014*1*P*|~ GS*HS*SUBMITTERID*CMS*20160127*073411*5014*X*005010X279A1~ ST*270*000000001*005010X279A1~ BHT*0022*13*TRANSA*20160127*073411~ HL*1**20*1~ NM1*PR*2*CMS*****PI*CMS~ HL*2*1*21*1~ NM1*1P*2*IRNAME*****XX*1234567893~ HL*3*2*22*0~..............</div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderSearchBar()}
                    {
                        this.state.key
                        ?
                        <div className="row">
                            <div className="col-6">
                                {this.renderTransactions()}
                            </div>
                            <div className="col-6">
                                {this.state.showDetails ? this.renderDetails() : null}
                                {this.state.showDetails ? this.renderDetails() : null}
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-9">
                                {this.renderCharts()}
                            </div>
                            <div className="col-3">
                                {this.renderSummary()}
                            </div>
                        </div>
                    }
            </div>
        );
    }
}