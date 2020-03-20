import React from 'react';
import './style.css';
import { Pie, Bar } from 'react-chartjs-2';
import moment from 'moment';
import { Files_834 } from '../../Files_834';
import { Topbar } from '../../../components/Topbar';
import Urls from '../../../../helpers/Urls';
import Strings from '../../../../helpers/Strings';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const data = {
    labels: [
        'Additions (55%)',
        'Terminations (15%)',
        'Changes (30%)',
    ],
    datasets: [{
        data: [160, 60, 140],
        backgroundColor: [
            '#139DC9',
            '#9dc913',
            '#83D2B4',

        ],
        hoverBackgroundColor: [
            '#139DC9',
            '#9dc913',
            '#83D2B4',
        ]
    }],
    flag: ''
};

const bardata = {
    labels: ['TP1', 'TP2', 'TP3', 'TP4', 'TP5'],
    showFile: false,
    datasets: [
        {
            label: 'Total Enrollments',
            backgroundColor: '#139DC9',
            borderColor: '#139DC9',
            borderWidth: 1,
            hoverBackgroundColor: '#139DC9',
            hoverBorderColor: '#139DC9',
            data: [9, 20, 10, 15, 27]
        }
    ],
    legend: {
        display: false
    }
};

const pieErrorData = {
    labels: [
        'Missing subscriber demographic details(40%)',
        'Matching SSN not found(10%)',
        'Missing member Policy Number(20%)',
        'Missing employee begin/hiring date(15%)',
        'Dependent original benefit effective date(15%)',
    ],
    datasets: [{
        data: [140, 40, 80, 50, 50],
        backgroundColor: [
            '#139DC9',
            '#1342c9',
            '#83D2B4',
            '#9dc913',
            '#c9139d',
        ],
        hoverBackgroundColor: [
            '#139DC9',
            '#1342c9',
            '#83D2B4',
            '#9dc913',
            '#c9139d',
        ]
    }],
    flag: ''
}

export class EnrollmentInbound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tradingpartner: [],
            claimsList: [],
            summaryList: [],
            errorCount: [],
            tradingpartner: [],
        }

        this.showFile = this.showFile.bind(this)
        this.renderSummary = this.renderSummary.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
    }

    componentDidMount() {
        this.Trading_PartnerList()
        this.getData()
        setTimeout(() => {
            this.getErrorCount()
        }, 50);
    }


    Trading_PartnerList() {
        let query = `{
  
        Trading_PartnerList (RecType :"Inbound", Transaction:"TradingPartner") { 
             
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
                this.setState({
                    tradingpartner: res.data.Trading_PartnerList
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getErrorCount() {
        let query = '{ CompareFileError834 { dbdesc error_desc RCount } }'
        fetch(Urls.enrollment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(r => {
                let data = []
                data = r.data.CompareFileError834
                this.setState({
                    errorCount: data
                })
            })
            .then(data => console.log('data returned:', data));
    }

    getoptions() {
        let row = []
        this.state.tradingpartner.forEach(element => {
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }

    getData() {
        let query = `{
            SP_Daily834headerData {
              FileName
              FileID
              sender
              receiver
              total
              FileStatus
              CreateDateTime
            }
            SP_834DailyDashboardCount {
                total_file
                Total_enrollment
                addition
                Change
                term
                Auditcount
                Error
                Resubmit
            }
        }`

        fetch(Urls.enrollment, {
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
                let iterator = data.SP_Daily834headerData

                iterator.forEach(item => {
                    array.push({
                        name: item.FileName,
                        date: item.CreateDateTime,
                        status: item.FileStatus,
                        submitter: item.sender,
                        receiver: item.receiver
                    })
                })

                let counts = data.SP_834DailyDashboardCount && data.SP_834DailyDashboardCount.length > 0 ? data.SP_834DailyDashboardCount[0] : 0

                summary = [
                    { name: 'Total Files', value: counts.total_file },
                    // { name: 'Total Enrollment', value: counts.Total_enrollment },
                    // { name: 'Additions', value: counts.addition },
                    // { name: 'Changes', value: counts.Change },
                    // { name: 'Termination', value: counts.term },
                    { name: 'Total Errors', value: counts.Error },
                    { name: 'Resubmit', value: counts.Resubmit }
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

    Trading_PartnerList() {
        let query = `{
      
            Trading_PartnerList (RecType :"Inbound", Transaction:"TradingPartner") { 
                 
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
                this.setState({
                    tradingpartner: res.data.Trading_PartnerList
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
                <td className="table-head-text"></td>
                <td className="table-head-text">File Name <img src={require('../../../components/Images/search_table.png')} style={{ height: '14px', marginTop: '3px', float: 'right', marginRight: '4px' }}></img> </td>
                <td className="table-head-text list-item-style">File Date <img src={require('../../../components/Images/search_table.png')} style={{ height: '14px', marginTop: '3px', float: 'right', marginRight: '4px' }}></img></td>
                <td className="table-head-text list-item-style">Submitter <img src={require('../../../components/Images/search_table.png')} style={{ height: '14px', marginTop: '3px', float: 'right', marginRight: '4px' }}></img></td>
                <td className="table-head-text list-item-style">Enrollments | Errors <img src={require('../../../components/Images/search_table.png')} style={{ height: '14px', marginTop: '3px', float: 'right', marginRight: '4px' }}></img></td>
                <td className="table-head-text list-item-style">File Status <img src={require('../../../components/Images/search_table.png')} style={{ height: '14px', marginTop: '3px', float: 'right', marginRight: '4px' }}></img></td>
            </tr>
        )
    }

    renderCharts() {
        return (
            <div className="row chart-div">
                <div className="chart-container chart">
                    <Pie data={data}
                        options={{
                            elements: {
                                arc: {
                                    borderWidth: 0
                                }
                            },
                            tooltips: {
                                enabled: false
                            },
                            pieceLabel: {
                                render: 'label',
                                position: 'outside'
                            },
                            responsive: true,
                            legend: {
                                position: 'bottom',
                                display: 'false'
                            },
                            animation: {
                                animateScale: true,
                                animateRotate: true
                            }
                        }}
                        width={80}
                        height={40} />
                </div>
                <div className="chart-container chart">
                    <Bar
                        data={bardata}
                        width={80}
                        height={40}
                        options={{
                            legend: {
                                position: 'bottom',
                            },
                            pieceLabel: {
                                render: 'label',
                                position: 'outside'
                            },
                        }} />
                </div>
            </div>
        )
    }

    renderPieChart() {
        return (
            <div className="row chart">
                <div className="col-12">
                    <Pie data={pieErrorData}
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
                        width={90}
                        height={60} />
                </div>
            </div>
        )
    }
    renderValues() {
        let row = []
        let data = pieErrorData.labels
        let colors = pieErrorData.datasets[0].backgroundColor

        let count = 0
        data.forEach(item => {
            row.push(
                <div className="row" style={{ textAlign: 'center', fontSize: '12px', marginTop: '4px', color: 'slategrey', alignItems: 'center' }}>
                    <div style={{ height: '10px', width: '20px', backgroundColor: colors[count], marginRight: '12px' }}></div>{item}
                </div>
            )
            count++
        })
        return (
            <div style={{ marginTop: '20px', marginLeft: '24%' }}>
                {row}
            </div>
        )
    }

    renderList() {
        let row = []
        const data = this.state.claimsList;
        data.forEach((d) => {
            row.push(
                <tr>
                    <td><input type="checkbox" /></td>
                    <td className="" >{d.name} </td>
                    <td className="list-item-style">{moment(d.date).format('YYYY/MM/DD')}</td>
                    <td className="list-item-style">{d.submitter}</td>
                    <td className="list-item-style">{d.receiver}</td>
                    <td className={"list-item-style " + (d.status == 'Errors' || d.status == 'File Error' ? 'red ' : (d.status == 'Verified' ? 'green ' : ''))}>{d.status}</td>
                </tr>
            )
        });

        return (
            <table className="table table-bordered claim-list">
                {this.renderTableHeader()}
                <tbody>
                    {row}
                </tbody>
            </table>
        );
    }

    showFile(name) {
        let input = ''
        if (name == 'Additions') {
            input = 'add'
        } else if (name == 'Total Files') {
            input = 'total'
        } else if (name == 'Changes') {
            input = 'change'
        } else if (name == 'Termination') {
            input = 'term'
        } else if (name == 'Total Errors') {
            input = 'error'
        }
        else if (name == 'Resubmit') {
            input = 'Resubmit'
        }

        this.setState({
            showFile: true,
            flag: input
        })
    }

    renderSummary() {
        let row = []
        const data = this.state.summaryList;

        data.forEach((d) => {
            let url = ''
            let data = []
            if (d.name == 'Total Files') {
                url = Strings.claimsDashboard_834_details
                data = [
                    { Total: 'total' },
                ]

            } else if (d.name == 'Total Errors') {
                url = Strings.EnrollmentError
                data = [
                    { Total: 'error' },
                ]
            } else if (d.name == 'Resubmit') {
                url = Strings.claimsDashboard_834_details
                data = [
                    { Total: 'Resubmit' },
                ]
            }

            row.push(
                <tr>
                    <td className="bold-text">{d.name}</td>
                    {
                        d.name == 'Total Enrollment' ?
                            <td className="blue bold-text summary-values">{d.value}</td> :
                            <td>
                                <a href="#"
                                    onClick={() => {
                                        // this.showFile(d.name) 
                                    }} className={
                                        (d.name == 'Total Enrollment' || d.name == 'Additions' || d.name == 'Total Files') ? 'blue bold-text summary-values' :
                                            (d.name == 'Changes' || d.name == 'Termination') ? 'purple bold-text summary-values' :
                                                (d.name == 'Total Errors' || d.name == 'Resubmit') ? 'red bold-text summary-values' : ''

                                    }>  <Link to={{ pathname: '/' + url + '', state: { data } }}>{d.value}</Link></a>


                            </td>
                    }
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

    renderCountTable() {
        let row = []
        let data = this.state.errorCount
        data.forEach(element => {
            row.push(
                <tr>
                    <td className="padding">{element.error_desc}</td>
                    <td className="padding" style={{ paddingLeft: "30px", padding: "5px", textAlign: "right" }}>
                        {element.RCount}
                    </td>
                </tr>
            )
        });

        return (row)
    }


    getOptions() {
        let row = []

        this.state.tradingpartner.forEach(element => {
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }
   
    handleStartChange(date) {
        this.setState({
            showDetails: false,
            startDate: date
        });
        setTimeout(() => {
            this.getData()
        }, 50);
    };

    renderSummaryDetails() {
        let row = []
        let array = this.state.summaryList

        array.forEach(item => {
            let url = ''
            let data = []
            if (item.name == 'Total Files') {
                url = Strings.claimsDashboard_834_details
                data = [
                    { Total: 'total' },
                ]

            } else if (item.name == 'Total Errors') {
                url = Strings.EnrollmentError
                data = [
                    { Total: 'error' },
                ]
            } else if (item.name == 'Resubmit') {
                url = Strings.claimsDashboard_834_details
                data = [
                    { Total: 'Resubmit' },
                ]
            }
            row.push(
                <Link to={{ pathname: '/' + url + '', state: { data } }} className="col-2 summary-container">
                    <div className="summary-header">{item.name}</div>
                    <div className={
                        (item.name == 'Total Files') ? 'blue summary-title' :
                            (item.name == 'Total Errors' || item.name == 'Resubmit') ? 'red summary-title' : ''
                    }>{Number(item.value) ? item.value : 0}{item.name == 'ERROR PERCENTAGE' || item.name == 'NO RESPONSE' ? '%' : ''}</div>
                </Link>
            )
        });

        return (
            <div className="row padding-left">
                {row}
            </div>
        )
    }

    handleStartChange(date) {
        this.setState({
            showDetails: false,
            startDate: date
        });
        setTimeout(() => {
            this.getData()
        }, 50);
    };
    handleEndChange(date) {
        this.setState({
            showDetails: false,
            endDate: date
        });
        setTimeout(() => {
            this.getData()
        }, 50);
    }

    renderTopbar() {
        return (
            <form className="form-style" id='filters'>
                <div className="form-row">
                    <div className="form-group col-2">
                        <div className="list-dashboard">State</div>
                        <select className="form-control list-dashboard" id="state"
                            onChange={(event) => {
                                // this.onSelect(event, 'State')
                            }}
                        >
                            <option value=""></option>
                            <option selected value="1">California</option>
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
                        <div className="list-dashboard">
                            Submitter
                        </div>
                        <select className="form-control list-dashboard" id="TradingPartner"
                            onChange={(event) => {
                                // this.onSelect(event, 'selectedTradingPartner')
                            }}
                        >
                            <option value="select"></option>
                            {this.getOptions()}
                        </select>
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Start Date</div>
                        <DatePicker className="form-control list-dashboard"
                            selected={this.state.startDate ? new Date(moment(this.state.startDate).format('YYYY-MM-DD')) : ''}
                            onChange={this.handleStartChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">End Date</div>
                        <DatePicker className="form-control list-dashboard"
                            selected={this.state.endDate ? new Date(moment(this.state.endDate).format('YYYY-MM-DD')) : ''}
                            onChange={this.handleEndChange}
                        />
                    </div>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div>
                {
                    <div>
                        <h5 style={{ color: "var(--main-bg-color)", fontWeight: "700", marginTop: "10px", fontSize: '18px' }}>834 Enrollment Dashboard</h5>
                        {this.renderTopbar()}
                        <div className="row">
                            <div className="col-12">
                                {this.renderSummaryDetails()}
                                {this.renderCharts()}
                                <div className="row">
                                    <div className="col-8">
                                        {this.renderList()}
                                    </div>
                                    <div className="col-4 form-style">
                                        {this.renderPieChart()}
                                        {this.renderValues()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div >
        );
    }
}