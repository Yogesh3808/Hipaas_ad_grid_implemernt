import React from 'react';
import './styles.css';
import { Pie, Bar } from 'react-chartjs-2';
import moment from 'moment';
import { Files } from '../../Files';
import { Topbar } from '../../../components/Topbar';
import { Files_837 } from '../../Files_837';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Urls from '../../../../helpers/Urls';
import { Link } from 'react-router-dom'
import { getDetails } from '../../../../helpers/getDetails';

const data = {
    labels: [
        'Accepted',
        'Rejected'
    ],
    datasets: [{
        data: [95, 5],
        backgroundColor: [
            '#139DC9',
            '#83D2B4'
        ],
        hoverBackgroundColor: [
            '#139DC9',
            '#83D2B4'
        ]
    }],
    flag: ''
};

const second_data = {
    labels: [
        'ICD Code not found',
        'Accident Date not present',
        'Member Not Found',
        'Newborn Setup Pending',
        'Provider Setup Pending',
        'Misdirected Claims'
    ],
    datasets: [{
        data: [100, 100, 70, 20, 50, 20],
        backgroundColor: [
            '#139DC9',
            '#83D2B4',
            '#9DC913',
            '#EC6236',
            '#C9139D',
            'blue',
        ],
        hoverBackgroundColor: [
            '#139DC9',
            '#83D2B4',
            '#9DC913',
            '#EC6236',
            '#C9139D',
            'blue',
        ]
    }],
    flag: ''
};


const bardata = {
    labels: ['TP1', 'TP2', 'TP3', 'TP4'],
    showFile: false,
    datasets: [
        {
            label: 'Total Claims',
            backgroundColor: '#139DC9',
            borderColor: '#139DC9',
            borderWidth: 1,
            hoverBackgroundColor: '#139DC9',
            hoverBorderColor: '#139DC9',
            data: [65, 59, 80, 81]
        }
    ],
    legend: {
        display: false
    }
};

export class Claims extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsList: [],
            summaryList: [],
            apiflag: this.props.apiflag,
            tradingpartner: [],
            startDate: '',
            endDate: '',
            selectedTradingPartner: ''
        }
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);

        this.showFile = this.showFile.bind(this)
        this.renderSummary = this.renderSummary.bind(this)
        // this.getData = this.getData.bind(this)
    }

    componentWillReceiveProps() {
        this.setState({
            apiflag: this.props.apiflag
        })
        setTimeout(() => {
            this.getData()
        }, 50);
    }

    componentDidMount() {
        this.getTradingPartnerDetails()
        this.getData()
    }

    getTradingPartnerDetails = async() => {
        getDetails("Claim837")
        .then((tradingpartner) => {
            if(tradingpartner && tradingpartner.length > 0){
                this.setState({
                    tradingpartner: tradingpartner
                })
            }
        })
    }

    getData() {
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : ''
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : ''
        
        let query = `{
            FileInTake(fileId: 0, submitter:"`+this.state.selectedTradingPartner+`",fromDt:"`+ startDate+`",ToDt:"`+endDate+`"){
              FileName
              FileDate
              ExtraField2
              Submitter_N103
              dCount
            }
            ClaimCount (submitter:"`+this.state.selectedTradingPartner+`",fromDt:"`+ startDate+`",ToDt:"`+endDate+`"){
                SubCount
            }
            ClaimAccCount (submitter:"`+this.state.selectedTradingPartner+`",fromDt:"`+ startDate+`",ToDt:"`+endDate+`"){
                AccCount
            }
            ClaimRejCount (submitter:"`+this.state.selectedTradingPartner+`",fromDt:"`+ startDate+`",ToDt:"`+endDate+`", RecType: "Inbound"){
                RejCount
            }
            ClaimPaidCount {
                PaidCount
            }
            ClaimDeniedCount {
                DeniedCount
            }
            FileInCount(submitter:"`+this.state.selectedTradingPartner+`",fromDt:"`+ startDate+`",ToDt:"`+endDate+`"){
                totalFile
            }
            FileFailedFileCount {
                FailedFileCount
            }
        }`

        console.log('Query ', query)

        if (this.state.apiflag) {
            query = `{
                FileInTake835 {
                  FileName
                  FileDate
                  ExtraField2
                  Submitter_N103
                  Receiver_N103
                }
            }`
            console.log("hey here it is !!", JSON.stringify(this.props.state))
        }

        fetch(Urls.claims_837 , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                let array = []
                let summary = []
                let data = res.data
                let iterator = data.FileInTake
                if (this.state.apiflag) {
                    iterator = data.FileInTake835
                }

                iterator.forEach(item => {
                    array.push({
                        name: item.FileName,
                        date: item.FileDate,
                        status: item.ExtraField2,
                        submitter: item.Submitter_N103,
                        dCount: item.dCount
                    })
                })

                summary = [
                    { name: 'Total Files', value: data.FileInCount ? data.FileInCount[0].totalFile : '' },
                    { name: 'Failed File Load', value: data.FileFailedFileCount ? data.FileFailedFileCount[0].FailedFileCount : '' },
                    { name: 'Submitted Claims', value: data.ClaimCount ? data.ClaimCount[0].SubCount : '' },
                    { name: 'Accepted Claims', value: data.ClaimAccCount ? data.ClaimAccCount[0].AccCount : '' },
                    { name: 'Rejected Claims', value: data.ClaimRejCount ? data.ClaimRejCount[0].RejCount : '' },
                    // {name:'Claims Queue', value : 250},
                    // {name:'Work in Progress', value : 123},
                    // {name:'Paid Claims', value : data.ClaimPaidCount ? data.ClaimPaidCount[0].PaidCount : '' },
                    // {name:'Partial Paid Claims', value : data.ClaimDeniedCount ? data.ClaimDeniedCount[0].DeniedCount : ''}
                ]

                this.setState({
                    claimsList: array,
                    summaryList: summary
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderSearchBar() {
        return (
            <div className="row">
                <input type="text" name="name" className="input-style" placeholder="Search" />
            </div>
        )
    }

    renderTableHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text">File Name</td>
                <td className="table-head-text list-item-style">File Date</td>
                <td className="table-head-text list-item-style">File Status</td>
                <td className="table-head-text list-item-style">Submitter</td>
                <td className="table-head-text list-item-style">Claim Count</td>
            </tr>
        )
    }

    renderCharts() {
        return (
            <div className="row chart">
                <div className="col-6">
                    <Pie data={data}
                        options={{
                            elements: {
                                arc: {
                                    borderWidth: 0
                                }
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }}
                        width={100}
                        height={60} />
                </div>
                <div className="col-6">
                    
                    <Bar
                        data={bardata}
                        width={100}
                        height={60}
                        options={{
                            legend: {
                                position: 'bottom'
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        userCallback: function(label, index, labels) {
                                            // when the floored value is the same as the value we have a whole number
                                            if (Math.floor(label) === label) {
                                                return label;
                                            }
                       
                                        },
                                    }
                                }],
                            },
                        }} />
                </div>
            </div>
        )
    }

    renderList() {
        let row = []
        const data = this.state.claimsList;
        data.forEach((d) => {
            row.push(
                <tr>
                    <td>{d.name}</td>
                    <td className="list-item-style">{moment(d.date).format('DD/MM/YYYY')}<br />{moment(d.date).format('h:m a')}</td>
                    <td className={"list-item-style " + (d.status == 'SentToQnxt' || d.status == 'Accepted' ? 'green ' : (d.status == 'Rejected' ? 'red ' : ''))}>{d.status}</td>
                    <td className="list-item-style">{d.submitter}</td>
                    <td className="list-item-style">{d.dCount}</td>
                </tr>
            )
        });

        return (
            <table className="table table-bordered claim-list">
                {this.state.claimsList && this.state.claimsList.length > 0 ? this.renderTableHeader() : null}
                <tbody>
                    {row}
                </tbody>
            </table>
        );
    }

    showFile(name) {
        this.setState({
            showFile: true,
            flag: name
        })
    }

    renderSummary() {
        let row = []
        const data = this.state.summaryList;
        // this.state.flag
        // this.state.selectedTradingPartner
        // this.state.startDate
        // this.state.endDate
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : 'n'
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : 'n'
        let selectedTradingPartner = this.state.selectedTradingPartner ? this.state.selectedTradingPartner : 'n'

        data.forEach((d) => {
            let addon = ''
            let data=[]
            if(d.name == 'Accepted Claims'){
                addon = '/accept'
            } else if(d.name == 'Rejected Claims'){
                addon = '/reject'
            } else {
                addon = '/other'
            }
 
            data = [
                {flag:addon, selectedTradingPartner:selectedTradingPartner, startDate:startDate ,endDate:endDate},
               ]
            row.push(
                <tr>
                    <td className="bold-text">{d.name}</td>
                    <td><a href="#" onClick={() => { 
                        // this.showFile(d.name) 
                    }} className={
                        (d.name == 'Total Files' || d.name == 'Submitted Claims') ? 'blue bold-text summary-values' :
                            (d.name == 'Paid Claims' || d.name == 'Accepted Claims') ? 'green bold-text summary-values' :
                                (d.name == 'Claims Queue' || d.name == 'Work in Progress') ? 'dark_red bold-text summary-values' :
                                    (d.name == 'Failed File Load' || d.name == 'Rejected Claims') ? 'red bold-text summary-values' :
                                        (d.name == 'Partial Paid Claims') ? 'orange bold-text summary-values' : ''
                    }>
                        
                          <Link to={{ pathname: '/Files_837' , state: {data}}}> {d.value} </Link>     
                        {/* <Link to={'/Files_837' + addon + '/' + selectedTradingPartner + '/' + startDate + '/' + endDate}>{d.value}</Link> */}
                    </a></td>
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

    renderChart() {
        return (
            <Pie data={second_data}
                options={{
                    elements: {
                        arc: {
                            borderWidth: 0
                        }
                    },
                    legend: {
                        display: false
                        // position: 'bottom'
                    }
                }}
                width={500}
                height={450} />
        )
    }

    getoptions = () => {
        let row = []
        this.state.tradingpartner.forEach(element => {
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }

    handleStartChange(date) {
        this.setState({
            startDate: date
        });
        setTimeout(() => {
            this.getData()
        }, 50);
    };

    handleEndChange(date) {
        this.setState({
            endDate: date
        });
        setTimeout(() => {
            this.getData()
        }, 50);
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

    renderTopbar() {
        return (
            <div className="row">
                <div className="form-group col-2">
                    <div className="list-header-dashboard">State</div>
                    <select className="form-control list-header-dashboard" id="state">
                        <option value="">State</option>
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

                <div className="form-group col-2">
                    <div className="list-header-dashboard">Trading partner </div>
                    <select className="form-control list-header-dashboard" id="TradingPartner" 
                        onChange={(event) => {
                            this.onSelect(event, 'selectedTradingPartner')
                        }}>
                        <option value="select">Trading partner</option>
                        {this.getoptions()}
                    </select>
                </div>
                <div className="form-group col-2">
                    <div className="list-header-dashboard">Provider Name</div>
                    <select className="form-control list-header-dashboard" id="option" 
                        onChange={(event) => {
                            this.onSelect(event, 'providerName')
                        }}
                    >
                        <option value="0">Provider Name</option>
                        <option value="1">Provider Name 1</option>
                        <option value="2">Provider Name 2</option>
                    </select>
                </div>
                <div className="form-group col-2">
                    <div className="list-header-dashboard">Start Date</div>
                    <DatePicker className="datepicker form-control list-header-dashboard"
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                    />
                </div>
                <div className="form-group col-2">
                    <div className="list-header-dashboard">End Date</div>
                    <DatePicker className="datepicker form-control list-header-dashboard"
                        selected={this.state.endDate}
                        onChange={this.handleEndChange}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                
                {
                    this.state.showFile
                        ?
                        <Files_837
                            flag={this.state.flag}
                            selectedTradingPartner = {this.state.selectedTradingPartner}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                        />
                        :
                        <div>
                        {/* {this.renderSearchBar()} */}
                        <br></br>
                        <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Claims Dashboard</h5><br></br>
                        {/* <p style={{ color: '#139DC9', fontWeight: 'bold' }}>Claims Dashboard</p>  */}
                            {this.renderTopbar()}
                            <div className="row">
                                <div className="col-9">
                                    {this.renderCharts()}
                                    {this.renderList()}
                                </div>
                                <div className="col-3">
                                    {this.renderSummary()}
                                    {this.renderChart()}
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}