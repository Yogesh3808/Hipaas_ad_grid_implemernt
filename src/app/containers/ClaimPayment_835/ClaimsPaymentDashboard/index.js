import React from 'react';
import '../../RealTime_837_Claim/RealTimeDashboard/styles.css';
import '../../color.css'
import { Pie, Bar } from 'react-chartjs-2';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Urls from '../../../../helpers/Urls';
import { Link } from 'react-router-dom'
import Strings from '../../../../helpers/Strings';
import { CommonTable } from '../../../components/CommonTable';
import Chart1 from "react-google-charts";
import Paper from '@material-ui/core/Paper';
import ReactPaginate from 'react-paginate';

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  PieSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const data = [
    { month: 'Jan', appStore: 101, googlePlay: 13 },
    { month: 'Feb', appStore: 89, googlePlay: 15 },
    { month: 'Mar', appStore: 107, googlePlay: 20 },
    { month: 'Apr', appStore: 113, googlePlay: 17 },

  ];

  const demoStyles = () => ({
    chart: {
      paddingRight: '20px',
      backgroundColor : ['grey', 'black'],
      fill: 'black'
    },
  });

  const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
      backgroundColor: ['grey', 'green'],
      fill: 'black'
    },
  });
  const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
  );
  const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
  const legendLabelStyles = () => ({
    label: {
      whiteSpace: 'nowrap',
      backgroundColor: ['grey', 'blue'],
      fill: 'black'
    },
  });
  const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
  );
  const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

  
  const Area = props => (
    <AreaSeries.Path
      {...props}
      path={area()
        .x(({ arg }) => arg)
        .y1(({ val }) => val)
        .y0(({ startVal }) => startVal)
        .curve(curveCatmullRom)}
    />
  );
  

let val = ''
// const second_data = {
//     labels: [
//         'ICD Code not found',
//         'Accident Date not present',
//         'Member Not Found',
//         'Newborn Setup Pending',
//         'Provider Setup Pending',
//         'Misdirected Claims'
//     ],
//     datasets: [{
//         data: [100, 100, 70, 20, 50, 20],
//         backgroundColor: [
//             '#139DC9',
//             '#83D2B4',
//             '#9DC913',
//             '#EC6236',
//             '#C9139D',
//             'blue',
//         ],
//         hoverBackgroundColor: [
//             '#139DC9',
//             '#83D2B4',
//             '#9DC913',
//             '#EC6236',
//             '#C9139D',
//             'blue',
//         ]
//     }],
//     flag: ''
// };

export class ClaimPaymentDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsList: [],
            summaryList: [],
            type: "",
            apiflag: this.props.apiflag,
            tradingpartner: [],
            pielabels : [],
            pievalues : [],
            startDate : moment().subtract(7,'d').format('YYYY-MM-DD'),
            endDate : moment().format('YYYY-MM-DD'),
            providerName: '',
            chartType: 'Datewise',
            selectedTradingPartner: '',
            State: '',
            Months: 0,
            accepted: 0,
            rejected: 0,
            inProgress: 0,
            Accepted_per: 0,
            rejected_per: 0,
            ClaimBarChart: [],
            claimLabels: [],
             data,
//////////----------table----
            Organization: '',
           startDate: props.location.state.data[0] && props.location.state.data[0].startDate != 'n' ? props.location.state.data[0].startDate : '',
            endDate: props.location.state.data[0] && props.location.state.data[0].endDate != 'n' ? props.location.state.data[0].endDate : '',
            Service_startDate: '',
            Service_endDate: '',
            Sender:'',
            page: 1,
            count: 0,
            orderby:''


    
        }
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);

        this.showFile = this.showFile.bind(this)
        this.getData = this.getData.bind(this)
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
        this.getCommonData()
        this.getData()
        this.getListData()
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
        let chartType = this.state.chartType
        if (!chartType) {
            chartType = "Monthwise"
        }

        let query = `{
            Claim835Dashboard {
              Claims837
              Claims835
              PendingClaims835
            }
            chart1:Claim835Status(ChartType: "PaymenttypeWise") {
                X_axis
                Y_axis
            }
            chart2:Claim835Status(ChartType: "StatusWise") {
                X_axis
                Y_axis
            }
        }`

        console.log(query)
        fetch(Urls.real_time_claim, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                let summary = []
                let data = res.data
                let claimLabels = []
                let pielabels = []
                let pievalues = []

                if (data.Claim835Dashboard && data.Claim835Dashboard.length > 0) {
                    summary = [
                        { name: '837 Claims', value: data.Claim835Dashboard[0].Claims837 ? data.Claim835Dashboard[0].Claims837 : '' },
                        { name: '835 Claims', value: data.Claim835Dashboard[0].Claims835 ? data.Claim835Dashboard[0].Claims835 : '' },
                        { name: 'Pending Claims', value: data.Claim835Dashboard[0].PendingClaims835 ? data.Claim835Dashboard[0].PendingClaims835 : '' },
                    ]
                }

                if (data.Claim835Status && data.Claim835Status.length > 0) {
                    data.Claim835Status.forEach(element => {
                        pielabels.push(element.X_axis)
                        pievalues.push(element.Y_axis)
                    });
                }

                this.setState({
                    summaryList: summary,
                    claimLabels: claimLabels,
                    pielabels: pielabels,
                    pievalues: pievalues,
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
                <td className="table-head-text list-item-style">File Name</td>
                <td className="table-head-text list-item-style">File Date</td>
                <td className="table-head-text list-item-style">Remittance sent</td>
                <td className="table-head-text list-item-style">Remittance sent date</td>
                <td className="table-head-text list-item-style">Compliance vs Submission date</td>
                <td className="table-head-text list-item-style"># of errors</td>
                <td className="table-head-text list-item-style">Receiver</td>
            </tr>
        )
    }

    getBarData(labelArray, dataArray, color) {
        let bardata = {
            labels: labelArray,
            showFile: false,
            datasets: [
                {
                    label: 'Total Claims',
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                    hoverBackgroundColor: color,
                    hoverBorderColor: color,
                    data: dataArray
                }
            ],
            legend: {
                display: false
            }
        }

        return bardata
    }



    renderMonthlyTrendsChart() {

        return (
            <div className = "chart-div chart-container1 chart">
            <div className="row">

            <div className = "col-7">
    
            <h6 > Volume - This Month trends</h6>
            </div>
           
           
            </div>
            
    
        <Chart1
  width={'700px'}
  height={'300px'}
  chartType="LineChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['x', 'EFT'],
    [0, 0],
    [1, 10],
    [2, 23],
    [3, 17],
    [4, 18],
    [5, 9],
    [6, 11],
    [7, 27],
    [8, 33],
    [9, 40],
    [10, 32],
    [11, 35],
  ]}
  options={{
    series: {
        0: { curveType: 'function' },
      },
      chartArea: { width: '100%' },

      colors: ['#139DC9'],

      fill : true
  }}

/>

</div>
        );
    }

    handleSort(e) {
        this.setState({
            type: e
        })
        setTimeout(() => {
            this.getData()
        }, 50);
    }

    getListData = () => {
     
        let count = 1
        let Service_startDate = this.state.Service_startDate ? moment(this.state.Service_startDate).format('YYYY-MM-DD') : ""
        let ServiceEndDate = this.state.ServiceEndDate ? moment(this.state.ServiceEndDate).format('YYYY-MM-DD') : ""
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD') : ""
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : ""
        let providerName = this.state.providerName
        if (!providerName) {
            providerName = ''
        }

        let query = `{            
            RemittanceViewerFileDetails(Sender:"${this.state.Sender}",State:"${this.state.State ? this.state.State : ''}",Organization:"${this.state.Organization}",EFTStartDt:"${Service_startDate}",EFTEndDt:"${ServiceEndDate}",ClaimReceivedStartDt:"${startDate}",ClaimReceivedEndDt:"${endDate}", page: ` + this.state.page + ` , OrderBy:"` + this.state.orderby + `") {
                RecCount
  Sender
  Organization
  FileID
  FileName
  CheckEFTNo
  FileDate
  PayerName
  PayerID
  AccountNo
  CHECKEFTFlag
  CheckEFTDt
  Receiver
            }
        }`
        console.log(query)
        fetch(Urls.real_time_claim_details, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.data && res.data.RemittanceViewerFileDetails) {

                    if (res.data.RemittanceViewerFileDetails.length > 0) {

                        count = Math.floor(res.data.RemittanceViewerFileDetails[0].RecCount / 10)
                        if (res.data.RemittanceViewerFileDetails[0].RecCount % 10 > 0) {
                            count = count + 1
                        }
                        this.setState.recount = count;
                    }

                    this.setState({
                        claimsList: res.data.RemittanceViewerFileDetails,
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    renderList() {
        let row = []
        const data = this.state.claimsList;
        console.log("" , data)
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

    MonthsEvent(event, key) {
        this.setState({
            [key]: event.target.options[event.target.selectedIndex].value
        })
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

    renderTopbar() {
        return (
            <div className="form-style" id='filters'>
                <div className="form-row">
                    <div className="form-group col-2">
                        <div className="list-dashboard">Time Range</div>
                        <select
                            className="form-control list-dashboard" id="state"
                            onChange={(event) => {
                                let day = 0
                                let chartType = ''
                                let selected_val = event.target.options[event.target.selectedIndex].text

                                if (selected_val == 'Last week') {
                                    day = 7
                                    chartType = 'Datewise'
                                } else if (selected_val == 'Last 30 days') {
                                    day = 30
                                    chartType = 'Weekwise'
                                } else if (selected_val == 'Last 90 days') {
                                    day = 90
                                } else if (selected_val == 'Last 180 days') {
                                    day = 180
                                } else if (selected_val == 'Last year') {
                                    day = 365
                                }

                                let startDate = moment().subtract(day, 'd').format('YYYY-MM-DD')
                                let endDate = moment().format('YYYY-MM-DD')

                                if (!selected_val) {
                                    startDate = ''
                                    endDate = ''
                                }

                                this.setState({
                                    startDate: startDate,
                                    endDate: endDate,
                                    selected_val: selected_val,
                                    chartType: chartType
                                })

                                setTimeout(() => {
                                    this.getData()
                                }, 50);
                            }}
                            >
                            <option selected="selected" value="1">Last week</option>
                            <option value="2">Last 30 days</option>
                            <option value="2">Last 90 days</option>
                            <option value="2">Last 180 days</option>
                            <option value="2">Last year</option>
                        </select>
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">State</div>
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
                            <option value="1">California</option>
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
                        <div className="list-dashboard">Provider</div>
                        <input className="form-control" type="text"
                            onChange={(e) => this.onHandleChange(e)}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Submitter</div>
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


    renderSummaryDetails() {
        let row = []
        let array = this.state.summaryList
        let apiflag = this.state.apiflag
        let url = Strings.ElilgibilityDetails270 + '/' + apiflag
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD') : 'n'
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : 'n'
        let selectedTradingPartner = this.state.selectedTradingPartner ? this.state.selectedTradingPartner : 'n'
        let State = this.state.State ? this.state.State : 'n'
        let type = this.state.type ? this.state.type : ''

        
    

        return (
         
           
                <div className="row padding-left">
    
           
        <div className="col-2 summary-container">
            <div className="summary-header"> # of claims</div>
            <div  className= 'blue summary-title' >
            449k
            </div>
        </div>

        <div className="col-2 summary-container">
        <div className="summary-header">   Total # of 835</div>
        <div  className= 'green summary-title' >
        426k
        </div>
    </div>
    
        <div className="col-2 summary-container">
        <div className="summary-header">  Partial</div>
        <div  className= 'blue summary-title' >
        33k
        </div>
    </div>
    <div className="col-2 summary-container">
        <div className="summary-header">  Denied</div>
        <div  className= 'red summary-title' >
        2k
        </div>
    </div>
    <div className="col-2 summary-container">
        <div className="summary-header">  Pending</div>
        <div  className= 'yellow summary-title' >
        1k
        </div>
    </div>
        </div>
                
           
           
        )
    }

    setData = (startDate, endDate, selected_val) => {
        this.setState({
            startDate,
            endDate,
            selected_val
        })
    }

    renderPieChart(heading,labels,data) {

        const second_data = {
            labels: [

                labels
            ],
            datasets: [{
                data: data,
                backgroundColor: [
                    '#BE61CA',
                    'pink',
                    'grey'
                ],
                hoverBackgroundColor: [
                    'blue',
                ]
            }],
        
        };
        
        return (
            <div>

            <h6> {heading}</h6>
            <Pie data={second_data}
               
                width={100}
                height={80} />
                </div>
        )
    }

    renderTransactionsNew(flag) {

       
        let data = this.state.files_list ? this.state.files_list : []
        let headerArray = []
        let rowArray = []
        headerArray.push(
            { value: 'File Generated/Created', upScale: 1 },
            { value: 'File Created Date'},
            { value: 'Remittance sent' },
            { value: 'Remittance sent date' },
            { value: 'Compliance vs Submission date'},
            { value: '# of errors'},
            { value: 'Receiver'}    
        )

      

        rowArray.push(
            { value: 'File_Generated', upScale: 1 },
            { value: 'File_Created_Date', isDate: 1, isNottime: 1 },
            { value: 'Remittance_sent' },
            { value: 'Remittance_sent_date' },
            { value: 'Compliance_vs_Submission_date'},
            { value: 'no_of_errors'},
            { value: 'Receiver'}    
           
        )

        data = [
            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'


            },

            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'


            },

            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'


            },

            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'


            },

            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'
            },

            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'
            },


            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'

            },


            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'

            },

            {
                File_Generated : '99090023232.txt',
                File_Created_Date : 1582810469000,
                Remittance_sent : '99090023232.txt',
                Remittance_sent_date : 1582810469000,
                Compliance_vs_Submission_date : 1582810469000,

                no_of_errors : 2,
                Receiver : 'TRICARE FOR LIFE'

            }





        ]

        if(flag) {

        return (
            <CommonTable
                headerArray={headerArray}
                rowArray={rowArray}
                data={data}
                count={this.state.count}
                handlePageClick={this.handlePageClick}
                onClickKey={'HiPaaSUniqueID'}
                onClick={this.onClick1}
            />
        )
        }
        else {

            return (
                <CommonTable
                    headerArray={headerArray}
                    rowArray={rowArray}
                    data={data}
                    count={this.state.count}
                    handlePageClick={this.handlePageClick}
                    onClickKey={'HiPaaSUniqueID'}
                    onClick={this.onClick}
                />
            )

        }
    }

    handlePageClick = (data) => {
        let page = data.selected + 1
        this.setState({
            page: page
        }, () => {
            this.getListData()
        })
    }


    renderList() {
        let row = []
        const data = this.state.claimsList;
    
        data.forEach((d) => {
            row.push(
                <tr>
                    <td style={{ color: "var(--light-blue)", wordBreak: 'break-all' }}>{d.FileName}</td>
                           <td className="list-item-style">{moment(d.FileDate).format('MM/DD/YYYY ')}<br />{moment(d.FileDate).format('hh:mm a')}</td>
                    <td className="list-item-style"></td>
                    <td className="list-item-style"></td>
                    <td className="list-item-style"></td>
                    <td className="list-item-style"></td>
            <td style={{ wordBreak: 'break-all' }} className="list-item-style">{d.Receiver}</td>
                </tr>
            )
        });

        return (
            <div>
                <table className="table table-bordered claim-list" style={{ tableLayout: 'fixed' }}>
                    {this.state.claimsList && this.state.claimsList.length > 0 ? this.renderTableHeader() : null}
                    <tbody>
                        {row}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'page-link'}
                    initialPage={0}
                    pageCount={Math.floor(this.state.claimsList[0].RecCount / 5) + (this.state.claimsList[0].RecCount % 10 > 0 ? 1 : 0)}
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
        );
    }
    renderGraphs() {

        const data = [
            ["Year", "Avg days for submission", { role: "style" }],
            ["2010", 10, "color: grey"],
            ["2020", 14, "color: grey"],
            ["2030", 16, "color: grey"],
            ["2040", 22,"color: grey"],
            [
              "2050",
              28,
              "stroke-color: grey; stroke-opacity: 0.6; stroke-width: 2; fill-color: grey; fill-opacity: 0.2"
            ]
          ];

         const  options={
            title: 'Average days for submission',
            chartArea: { width: '20%' },
            colors: ['lightgrey'],
            hAxis: {
              title: 'Total Population',
              minValue: 0,
            },
            vAxis: {
              title: '',
            },
          } ;
        
        return(

            <div className = "chart-container1 chart chart-div">
            
            <div style ={{color : "grey"}} className="row">

            <div className="col-4">
            <h6> Providers</h6>
            <Chart1 chartType="Bar" width="100%" height="200px" data={data} options ={options} />
            <br></br> 

            <p style ={{color : "grey"}} > Provider </p>

            <div className ="row">
            <div className="col-9"> Kaiser </div>
            <div className="col-3"> 128</div>
         </div>
           <hr style ={{ borderColor : 'lightgrey'}}  />
       
        <div className ="row">
        <div className="col-9"> Aetna </div>
        <div className="col-3"> 96</div>
     </div>
       <hr style ={{ borderColor : 'lightgrey'}}  />
   

    <div className ="row">
    <div className="col-9"> Cigna </div>
    <div className="col-3"> 64</div>
 </div>
   <hr style ={{ borderColor : 'lightgrey'}}  />

  
<div className ="row">
<div className="col-9"> BCBS </div>
<div className="col-3"> 16</div>
</div>
<hr style ={{ borderColor : 'lightgrey'}}  />
</div>

            <div className="col-4">
            <h6> EFT vs CHK </h6>
            <Chart1 chartType="Bar" width="100%" height="200px" data={data} options ={options} />
            <p style ={{color : "grey"}} > Provider </p>

            <div className ="row">
            <div className="col-9"> Example 1 </div>
            <div className="col-3"> 100% </div>
         </div>
           <hr style ={{ borderColor : 'lightgrey'}}  />
       
        <div className ="row">
        <div className="col-9">  Example 2 </div>
        <div className="col-3"> 86% </div>
     </div>
       <hr style ={{ borderColor : 'lightgrey'}}  />
   

    <div className ="row">
    <div className="col-9"> Example 3 </div>
    <div className="col-3"> 64% </div>
 </div>
   <hr style ={{ borderColor : 'lightgrey'}}  />

  
    <div className ="row">
    <div className="col-9"> Example 4 </div>
    <div className="col-3"> 16% </div>
    </div>
    <hr style ={{ borderColor : 'lightgrey'}}  />
            </div>
            <div className="col-4">
            <h6> Average # of Errors </h6>
            <Chart1 chartType="Bar" width="100%" height="200px" data={data} options ={options} />
            <p style ={{color : "grey"}} > Error Reason </p>

            <div className ="row">
        <div className="col-9">   Negative numbers </div>
        <div className="col-3"> 82 </div>
     </div>
       <hr style ={{ borderColor : 'lightgrey'}}  />
   

    <div className ="row">
    <div className="col-9">  Charge exceeds fee </div>
    <div className="col-3"> 18 </div>
 </div>
   <hr style ={{ borderColor : 'lightgrey'}}  />

  
    <div className ="row">
    <div className="col-9"> Example  </div>
    <div className="col-3"> 12 </div>
    </div>
    <hr style ={{ borderColor : 'lightgrey'}}  />
            </div>
            </div>
            </div>
        )
    }

    renderMaterialChart() {

       
          const { data: chartData } = this.state;

    return (
      <Paper  className = {demoStyles.chart}>
        <Chart
        className = {demoStyles.chart}
          data={chartData}
          
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis className = {demoStyles.chart} />

          <AreaSeries
           className = {demoStyles.chart}
            name="Old claims"
            valueField="appStore"
            argumentField="month"
            seriesComponent={Area}
          />
          <AreaSeries
          className = {demoStyles.chart}
            name="Current Claims"
            valueField="googlePlay"
            argumentField="month"
            seriesComponent={Area}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Volume- This month's trends" />
        </Chart>
      </Paper>
    );

    }


    renderMaterialPieChart() {

        const pieData = [
            { country: 'Russia', area: 12, color : 'blue'},
            { country: 'Canada', area: 7, color :  'black'},
            { country: 'USA', area: 7 },
        
          ];

          return (

            <div>
            <Paper className = {demoStyles.chart}>
              <Chart
                data={pieData}
                options = { {
                    colors : ['lightgrey','green','black']
                }

                }
              >
                <PieSeries
                className = {demoStyles.chart}
                  valueField="area"
                  argumentField="country"
                  options = { {
                    colors : ['lightgrey','green','black']
                }
            }
                 

                />
                <Title
                  text="Claim adjustment reason code"
                />
                <Animation />
              </Chart>
            </Paper>
            </div>
          );

    }

    renderMaterialDonutChart() {

    }

    renderGoogleStackedBarChart() {

        return (

            <div className="row">
<div className="chart-container1 chart">

        <Chart1
  width={'200px'}
  height={'400px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['City', 'Country', 'Month',  { role: 'annotation' }],
    ['USA', 81750, 80080,'USA'],
    ['India', 37920, 36940,'India'],
    ['China', 26950, 28960, 'China'],
    ['Ukraine', 20990, 19530,'Ukraine'],
    ['Philadelphia', 15260, 15170,'Philadelphia'],
  ]}
  options={{
    title: '835 Data Quality',
    chartArea: { width: '100%' },
    colors: ['#139DC9', '#42b0d3'],
    hAxis: {
      minValue: 0,
    },
    vAxis: {
    },
    isStacked : true
  }}
  // For tests
  rootProps={{ 'data-testid': '4' }}
/>
</div>
</div>
        );
    }


    renderChartJSPieChart() {
        const data = {
            labels: this.state.labelArray,
            datasets: [{
                data: this.state.pieArray,
                backgroundColor: [
                    '#139DC9', '#42b0d3'
                ],
                hoverBackgroundColor: [
                    'var(--main-bg-color)',
                    'var(--cyan-color)',
                    'var(--hex-color)',
                    'var(--pacific-blue-color)',
                ]
            }],
            flag: ''
        };
        return (
            <div>
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
                    width={200}
                    height={150} />
            </div>
        )
    }


    renderGooglePieChart(tittle,data,labels,colors) {


        return (

            <div className="row chart-div">
<div className="chart-container1 chart">
            <Chart1
  width={'250px'}
  height={'250px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ]}
  options={{
    title: tittle,
    chartArea: { width: '100%' },
    is3D: true,
    series: {5: {type: 'line'}},
    legend : {position: 'top', textStyle: {color: 'blue', fontSize: 16}, type: 'rectangle'},
    legend : 'none'
 

  }}
  rootProps={{ 'data-testid': '1' }}
/>
</div>
</div>

        );

    }


    render() {

        let lables1 = ['Not Compliant','Compliant'];
        let lables2 = ['Member not eligible', 'Dependent not covered', 'Provider not authorized'];
        let lables3 = ['Negative number', 'Not valid CARC', 'Missing'];

        let data1 = [20,60];
        let data2 = [20,60,30];
        let data3 = [20,60,30];

        return (
            <div>
                <br></br>
                <div className="row">
                

                <div className="col-9">
                <h5 style={{ color: 'var(--main-bg-color)', fontsize: "20px" }}> 835 Dashboard</h5><br></br>
                {this.renderSummaryDetails()}
                {this.renderMonthlyTrendsChart()}
                </div>
                <div className="col-3 nopadding">
                {this.renderGooglePieChart('Compliance',lables1,data1,data1)}
                {this.renderGooglePieChart('Top Denial Reason codes',lables2,data2)}
              
                </div>
                </div>

              

                <div className="row">
                <div className="col-9">
                {this.renderGraphs()}
                </div>
                <div className="col-3 nopadding">
            
                {this.renderGooglePieChart('Top Denial Reason codes',lables2,data2)}
              
                </div>
                </div>



                <div className="row">
                <div className="col-9">
               <br></br>  
               {this.state.claimsList && this.state.claimsList.length > 0 ? this.renderList() : null}
                {/* {this.renderTransactionsNew()} */}
                </div>
                <div className="col-3 nopadding">

          
                {this.renderGoogleStackedBarChart()}
          
              
                </div>
                </div>
            </div>
        );
    }
}
