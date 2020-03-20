import React from 'react'
import '../../Claims/Dashboard/styles.css'
import moment from 'moment';
import { Topbar } from '../../../components/Topbar';
import Strings from '../../../../helpers/Strings';
import Urls from '../../../../helpers/Urls';
import { Link } from 'react-router-dom'
import { getDetails, getProviders } from '../../../../helpers/getDetails';
import DatePicker from "react-datepicker";
import ReactPaginate from 'react-paginate';
import { AutoComplete } from '../../../components/AutoComplete';
import { StateDropdown } from '../../../components/StateDropdown';
import { Tiles } from '../../../components/Tiles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';



let val = ''
export class AuditSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsAudit: [],
            tradingpartne837: [],
            providers: [],
            SubTotal: 0,
            VeriTotal: 0,
            InBizstockTotal: 0,
            selectedTradingPartner: '',
            providerName: '',
            orderby: "",
            State: "",
            PenTotal: 0,
            RejTotal: 0,
            errTotal: 0,
            TotalClaims: '',
            Accepted: '',
            Rejected: '',
            InProgress: '',
            Total999: '',
            Total277CA: '',
            TotalSentToQNXT: '',
            Paid: '',
            denied: '',
            WIP: '',
            Pending: '',
            page: 1,
            count: 1,
            nameRotation: 180,
            statusRotation: 180,
            columnDefs: [
   
                { headerName: "File Name", field: "filename" },
                { headerName: "File Status", field: "FileStatus" },
                { headerName: "Submitted", field: "Submitted" },
                { headerName: "In HiPaaS", field: "Submitted" },
                { headerName: "Accepted PreProcess", field: "Accepted" },
                { headerName: "Rejected PreProcess", field: "Rejected" },
                { headerName: "Error in PreProcess", field: "Rejected" },
                { headerName: "In MCG	", field: "SentToQNXT" },
                { headerName: "999", field: "F999" },
                { headerName: "277 CA", field: "goto277" },
                ],
                
              rowData: [
              
              ],
              autoGroupColumnDef: {
                headerName: 'Group',
                minWidth: 170,
                field: 'athlete',
                valueGetter: function(params) {
                  if (params.node.group) {
                    return params.node.key;
                  } else {
                    return params.data[params.colDef.field];
                  }
                },
                headerCheckboxSelection: true,
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: { checkbox: true },
              },
              defaultColDef: {
                editable: true,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
                sortable: true,
                resizable: true,
                filter: true,
                flex: 1,
                minWidth: 100,
              },
              rowSelection: 'multiple',
              rowGroupPanelShow: 'always',
              pivotPanelShow: 'always',
              rowData: [],                   
              rowSelection: 'multiple',
              rowGroupPanelShow: 'always',
              pivotPanelShow: 'always',
              rowData: [],
            };
          }
        
          onGridReady = params => {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
        
            const httpRequest = new XMLHttpRequest();
            const updateData = data => {
              this.setState({ rowData: data });
            };
        
            httpRequest.open(
              'GET',
              'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
            );
            httpRequest.send();
            httpRequest.onreadystatechange = () => {
              if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                updateData(JSON.parse(httpRequest.responseText));
              }
            
            };
          
        

        this.getData = this.getData.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
    }

    componentDidMount() {

        this.getData()
        this.getCommonData()
    }

    //   FileID
    //   filename
    //   Submitted
    //   Rejected
    //   Pending
    //   Verified
    //   Error
    //   InBizstock

    getData() {
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYY-MM-DD') : ''
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYY-MM-DD') : ''

        let query = `{
            ClaimsDailyAudit(submitter:"`+ this.state.selectedTradingPartner + `",fromDt:"` + startDate + `",ToDt:"` + endDate + `" ,  RecType:"Inbound", page: ${this.state.page}, Provider:"${this.state.providerName}" OrderBy:"${this.state.orderby}", State:"${this.state.State}"){
              FileID
              filename
              Submitted
              Accepted
              Rejected
              SentToQNXT
              Paid
              denied
              WIP
              Pending
              F277
              F999
              FileStatus
              RecCount
            }
           
            FileInCount(submitter:"`+ this.state.selectedTradingPartner + `",fromDt:"` + startDate + `",ToDt:"` + endDate + `",RecType:"Inbound", Provider:"${this.state.providerName}", State:"${this.state.State}"){
                totalFile
                TotalClaims 
                Accepted
                Rejected
                InProgress           
                Total999 
                Total277CA  
                TotalSentToQNXT  
                Paid 
                denied   
                WIP
                Pending
            }
        }`
        console.log(query)
        fetch(Urls.claims_837, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                let data = res.data
                if (res.data) {
                    let totalFile = 0
                    try {
                        totalFile = res.data.FileInCount[0].totalFile
                    } catch (error) {

                    }

                    let count = 1
                    if (data && data.ClaimsDailyAudit.length > 0) {

                        count = Math.floor(data.ClaimsDailyAudit[0].RecCount / 10)
                        if (data.ClaimsDailyAudit[0].RecCount % 10 > 0) {
                            count = count + 1
                        }
                    }


                    // console.log("sdghusighsjgn", res.data.FileInCount[0])
                    this.setState({
                        rowData: res.data.ClaimsDailyAudit,
                        // SubTotal: res.data.ClaimsDailyAuditCount[0].SubTotal,
                        // VeriTotal: res.data.ClaimsDailyAuditCount[0].VeriTotal,
                        // InBizstockTotal: res.data.ClaimsDailyAuditCount[0].InBizstockTotal,
                        // PenTotal: res.data.ClaimsDailyAuditCount[0].PenTotal,
                        // RejTotal: res.data.ClaimsDailyAuditCount[0].RejTotal,
                        // errTotal: res.data.ClaimsDailyAuditCount[0].errTotal,
                        totalFile: totalFile,
                        TotalClaims: res.data.FileInCount[0].TotalClaims,
                        Accepted: res.data.FileInCount[0].Accepted,
                        Rejected: res.data.FileInCount[0].Rejected,
                        InProgress: res.data.FileInCount[0].InProgress,
                        Total999: res.data.FileInCount[0].Total999,
                        Total277CA: res.data.FileInCount[0].Total277CA,
                        TotalSentToQNXT: res.data.FileInCount[0].TotalSentToQNXT,
                        Paid: res.data.FileInCount[0].Paid,
                        denied: res.data.FileInCount[0].denied,
                        WIP: res.data.FileInCount[0].WIP,
                        Pending: res.data.FileInCount[0].Pending,
                        count: count

                    })
                }
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

    goto277 = () => {
        sessionStorage.setItem('isOutbound', true)
        this.props.history.push('/' + Strings.Outbound_277CAResponse)
        setTimeout(() => {
            window.location.reload()
        }, 50);
    }

    goto999 = (fileId) => {
        sessionStorage.setItem('isOutbound', true)
        this.props.history.push('/' + Strings.Outbound_response_999, {
            fileId: fileId
        })
        setTimeout(() => {
            window.location.reload()
        }, 50);
    }

    handleSort(e, rotation, key) {
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

    renderTransactions() {
       return (
            <div>
                 <div className="ag-theme-balham" style={ {height: '400px', width: '1000px'} }>
                 <AgGridReact
                    modules={this.state.modules}
                    columnDefs={this.state.columnDefs}
                    autoGroupColumnDef={this.state.autoGroupColumnDef}
                    defaultColDef={this.state.defaultColDef}
                    suppressRowClickSelection={true}
                    groupSelectsChildren={true}
                    debug={true}
                    rowSelection={this.state.rowSelection}
                    rowGroupPanelShow={this.state.rowGroupPanelShow}
                    pivotPanelShow={this.state.pivotPanelShow}
                    enableRangeSelection={true}
                    paginationAutoPageSize={true}
                    pagination={true}
                    onGridReady={this.onGridReady}
                    rowData={this.state.rowData}
            >
           
               </AgGridReact>
              
                 </div>
               
            
            </div>
        )
    }

    handlePageClick(data) {
        let page = data.selected + 1
        this.setState({
            page: page,

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

    getCommonData() {
        let query = `{
            Trading_PartnerList(RecType :"Inbound", Transaction:"Claim837RT") {
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
                if (res.data) {

                    this.setState({
                        tradingpartne837: res.data.Trading_PartnerList ? res.data.Trading_PartnerList : [],
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    _renderStats() {
        let _summary = [
            { header: 'Total Files', value: this.state.totalFile, style: "green summary-title" },
            { header: 'In HiPaaS', value: this.state.TotalClaims },
            { header: 'Accepted', value: this.state.Accepted },
            { header: 'Rejected', value: this.state.Rejected },
            { header: '999', value: this.state.Total999, style: "green summary-title" },
            { header: 'Send To MCG', value: this.state.TotalSentToQNXT, style: "green summary-title" },
            { header: '277 CA', value: this.state.Total277CA, style: "orange summary-title" }
        ]
        let row = []

        _summary.forEach(item => {
            row.push(
                <Tiles
                    header_text={item.header}
                    value={item.value}
                    isClickable={false}
                    _style={item.style}
                />
            )
        })

        return (
            <div className="row padding-left" >
                {row}
            </div>

        )
    }
    handleStartChange(date) {
        this.setState({
            startDate: date,
            showDetails: false
        });

        setTimeout(() => {
            // this.getCountData()
            this.getData()
        }, 50);
    }

    handleEndChange(date) {
        this.setState({
            endDate: date,
            showDetails: false
        });

        setTimeout(() => {
            // this.getCountData()
            this.getData()
        }, 50);
    }

    onHandleChange = (e) => {
        clearTimeout(val)
        let providerName = e.target.value
        val = setTimeout(() => {
            getProviders("Inbound", providerName)
                .then(list => {
                    this.setState({
                        providers: list
                    })
                }).catch(error => {
                    console.log(error)
                })
        }, 300);
    }

    onSelected = (value) => {
        this.setState({
            providerName: value
        }, () => {
            this.getData()
        })
    }

    _handleStateChange = (event) => {
        this.setState({
            State: event.target.options[event.target.selectedIndex].text,
            showDetails: false
        }, () => {
            this.getData()
        })
    }

    renderTopBar() {
        return (
            <div className="form-style" id='filters'>
                <div className="form-row">
                    <div className="form-group col-2">
                        <div className="list-dashboard">State</div>
                        <StateDropdown
                            method={this._handleStateChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Provider</div>
                        <AutoComplete
                            list={this.state.providers}
                            onHandleChange={this.onHandleChange}
                            onSelected={this.onSelected}
                        />

                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Submitter</div>
                        <select className="form-control list-dashboard" id="TradingPartner"
                            onChange={(event) => {
                                this.onSelect(event, 'selectedTradingPartner')
                            }}
                        >

                            <option value="select"></option>
                            {this.getoptions()}
                        </select>
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">Start Date</div>
                        <DatePicker
                            className="form-control list-header-dashboard"
                            selected={this.state.startDate ? new Date(this.state.startDate) : ''}
                            onChange={this.handleStartChange}
                        />
                    </div>
                    <div className="form-group col-2">
                        <div className="list-dashboard">End Date</div>
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
    getoptions() {
        // console.log("sfsdsds", this.state.tradingpartne837)
        let row = []
        this.state.tradingpartne837.forEach(element => {
            if (!element) {
                return
            }
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }
    render() {
        return (
            <div>
                <h5 className="headerText">Claims Audit </h5>
                {this.renderTopBar()}
                {this._renderStats()}
                <div className="col-12" style={{ padding: "0px" }}>
                {this.renderTransactions()}
                    {/* {this.state.claimsAudit && this.state.claimsAudit.length > 0 ? this.renderTransactions() : null} */}
                </div>
            </div>
        );
    }
}