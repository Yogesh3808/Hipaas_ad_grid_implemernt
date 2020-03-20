import React from 'react';
import './style.css';
import Urls from '../../../helpers/Urls'
import ReactPaginate from 'react-paginate';
var val = ''
export class StatewiseTradingPartner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            TradingPartnerList: [],
            StateList: [],
            TransactionMasterList: [],
            ISA_06: '',
            ISA_06_Name: '',
            State: '',
            Transaction_Type: '',
            ISA_08: '',
            ISA_08_Name: '',
            PayerID: '',
            PayerName: '',
            Trans_ID: '',
            ID: 0,
            page: 1,
            count: 0,
            Search_Senderid: '',
            Search_Sendername: '',
            Search_PayerID: '',
            Search_PayerName: '',
            Search_State: "",
            Search_Tran_Type: "",
            orderby: '',
            ISA06_Name_Rotation : 180,
            ISA06_ID_Rotation : 180,
            PayerName_Rotation : 180,
            PayerID_Rotation : 180,
            ISA08_Name_Rotation : 180,
            ISA08_ID_Rotation : 180,
            State_Rotation : 180,
            Transaction_Code_Rotation : 180,
        };

        this.displaydata = this.displaydata.bind(this)
        this.ChangeVal = this.ChangeVal.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.getData()
        this.getTransdata()
        this.gettranaction()
    }


    gettranaction() {

        let query =
            `{
                TradingPartnerlist (ID:0 page:` + this.state.page + ` OrderBy:"${this.state.orderby}" Transaction:"` + this.state.Search_Tran_Type + `" State:"` + this.state.Search_State + `" PayerID:"` + this.state.Search_PayerID + `" PayerName:"` + this.state.Search_PayerName + `"  ISA06_ID:"` + this.state.Search_Senderid + `" ISA06_Name:"` + this.state.Search_Sendername + `" ISA08_ID :"" ISA08_Name:"") { 
                Rcount
                ID
                ISA06_ID
                Transaction_Code
                State
                ISA08_ID
                PayerName
                PayerID
                ISA06_Name
                ISA08_Name
                TradingPartnerName
                Is_Active
                
                     }
                   
               }`

        console.log('Query ', query)

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
                let count = 1
                let array = []
                let summary = []
                let data = res.data

                let iterator = data.TradingPartnerlist
                console.log("ejfsdfhdj", iterator)
                iterator.forEach(item => {
                    array.push({
                        ID: item.ID,
                        ISA06_ID: item.ISA06_ID,
                        Transaction_Code: item.Transaction_Code,
                        state: item.State,
                        ISA08_ID: item.ISA08_ID,
                        PayerName: item.PayerName,
                        PayerID: item.PayerID,
                        ISA06_Name: item.ISA06_Name,
                        ISA08_Name: item.ISA08_Name

                    })
                })


                if (data && data.TradingPartnerlist.length > 0) {

                    count = Math.floor(data.TradingPartnerlist[0].Rcount / 10)
                    if (data.TradingPartnerlist[0].Rcount % 10 > 0) {
                        count = count + 1
                    }
                }
                this.setState({
                    TradingPartnerList: array,
                    count: count
                    // tradingpartner: res.data.Trading_PartnerList
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getTransdata() {
        let query = `{      
            TransactionMaster  {                  
                Trans_Code
                Transaction_Type
            }           
        }`

        console.log(query)
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
                    TransactionMasterList: res.data.TransactionMaster

                })
            })

            .catch(err => {
                console.log(err)
            })
    }
    getData() {
        let query = `{
                  StateList  (UserId:0 Flag:0) {
                  State
                StateCode
            }
       }`
        console.log(query)
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
                    StateList: res.data.StateList

                })
            })

            .catch(err => {
                console.log(err)
            })
    }
    handlePageClick(data) {
        let page = data.selected + 1
        this.setState({
            page: page,

        })

        setTimeout(() => {
            this.gettranaction()
        }, 50);
    }
    ChangeVal(event, key) {

        this.setState({
            [key]: event.target.options[event.target.selectedIndex].value,
        })
    }
    getoptions() {

        let row = []
        this.state.StateList.forEach(element => {
            row.push(<option selected={this.state.State == element.StateCode ? element.StateCode : ''} value={element.StateCode}>{element.State}</option>)
        })
        return row

    }
    Search_getoptions() {

        let row = []
        this.state.StateList.forEach(element => {
            row.push(<option value={element.StateCode}>{element.State}</option>)
        })
        return row

    }
    Search_gettrans() {

        let row = []
        this.state.TransactionMasterList.forEach(element => {
            row.push(<option value={element.Trans_Code}>{element.Trans_Code}</option>)
        })
        return row

    }
    gettrans() {

        let row = []
        this.state.TransactionMasterList.forEach(element => {
            row.push(<option selected={this.state.Transaction_Type == element.Trans_Code ? element.Trans_Code : ''} value={element.Trans_Code}>{element.Trans_Code}</option>)
        })
        return row

    }
    handleClick(event) {
        if (this.state.ISA_06_Name != undefined && this.state.ISA_06_Name != "") {
            var query = 'mutation{TradingPartnerSave(ID : ' + this.state.ID + ' ' +
                'ISA06_ID :"' + this.state.ISA_06 + '"  ' +
                'Transaction_Code :"' + this.state.Transaction_Type + '"  ' +
                'State :"' + this.state.State + '" ' +
                'ISA08_ID :"' + this.state.ISA_08 + '"  ' +
                'PayerName :"' + this.state.PayerName + '"  ' +
                'PayerID :"' + this.state.PayerID + '"  ' +
                'ISA06_Name :"' + this.state.ISA_06_Name + '"  ' +
                'ISA08_Name :"' + this.state.ISA_08_Name + '"  ' +
                'TradingPartnerName :""  ' +
                ')' + '{ Msg  ID }' +
                '}'


            console.log(query)
            fetch(Urls.base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query

                })
            })
                .then(r => r.json())
                .then(data => alert(data.data.TradingPartnerSave[0].Msg))
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
        else { alert("Plaese Enter the Sender Name") }
    }

    onChangeName(event, key) {
        this.setState({
            [key]: event.target.value
        });
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
            this.gettranaction()
        }, 50);
    }
    
    renderTableHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.ISA06_Name", this.state.ISA06_Name_Rotation, 'ISA06_Name_Rotation')}>Sender Name</a></td>
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.ISA06_ID", this.state.ISA06_ID_Rotation, 'ISA06_ID_Rotation')}>Sender Id(ISA06)</a></td>
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.PayerName", this.state.PayerName_Rotation, 'PayerName_Rotation')}>Payer Name</a></td>
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.PayerID", this.state.PayerID_Rotation, 'PayerID_Rotation')}> Payer ID</a></td>
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.ISA08_Name", this.state.ISA08_Name_Rotation, 'ISA08_Name_Rotation')}>Receiver Name</a></td>
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.ISA08_ID", this.state.ISA08_ID_Rotation, 'ISA08_ID_Rotation')}>Receiver Id(ISA08)</a></td>
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.state", this.state.State_Rotation, 'State_Rotation')}>State</a></td>
                <td className="table-head-text"><a className="clickable" onClick={() => this.handleSort((localStorage.getItem("DbTech") === "SQL") ? "" : "TradingPartnerlist.Transaction_Code", this.state.Transaction_Code_Rotation, 'Transaction_Code_Rotation')}>Transaction Type</a></td>
                <td style={{ width: "10px" }}></td>
                <td style={{ width: "10px" }}></td>
            </tr>
        )
    }

    Inactive(event) {
        var query = 'mutation{' +
            'InActiveTradingPartner(ID : ' + event.target.dataset.value +
            'Is_Active : 0)' +

            '}'
        console.log(query)
        fetch(Urls.base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query

            })
        })
            .then(r => r.json())
            .then(data => alert(data.data.InActiveTradingPartner))
        setTimeout(() => {
            window.location.reload()
        }, 1000)

    }
    displaydata(event) {
        let query =
            '{TradingPartnerlist(ID:' + event.target.dataset.value + ` page:` + this.state.page + ` OrderBy:"" Transaction:"" State:"" PayerID:"" PayerName:"" ISA06_ID:"" ISA06_Name:"" ISA08_ID:"" ISA08_Name:"")
              {
                Rcount
                ID
                ISA06_ID
                Transaction_Code
                State
                ISA08_ID
                PayerName
                PayerID
                ISA06_Name
                ISA08_Name
                TradingPartnerName
                Is_Active
                 }
               
           }`


        console.log(query)
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
                    ISA_06: res.data.TradingPartnerlist[0].ISA06_ID,
                    State: res.data.TradingPartnerlist[0].State,
                    Transaction_Type: res.data.TradingPartnerlist[0].Transaction_Code,
                    ISA_08: res.data.TradingPartnerlist[0].ISA08_ID,
                    PayerID: res.data.TradingPartnerlist[0].PayerID,
                    PayerName: res.data.TradingPartnerlist[0].PayerName,
                    TradingPartnerName: res.data.TradingPartnerlist[0].TradingPartnerName,
                    ISA_08_Name: res.data.TradingPartnerlist[0].ISA08_Name,
                    ISA_06_Name: res.data.TradingPartnerlist[0].ISA06_Name,
                    ID: res.data.TradingPartnerlist[0].ID,



                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    renderList() {
        let row = []
        const data = this.state.TradingPartnerList;
        data.forEach((d) => {
            row.push(
                <tr>
                    <td>{d.ISA06_Name}</td>
                    <td>{d.ISA06_ID}</td>
                    <td>{d.PayerName}</td>
                    <td>{d.PayerID}</td>
                    <td>{d.ISA08_Name}</td>
                    <td>{d.ISA08_ID}</td>
                    <td>{d.state}</td>
                    <td>{d.Transaction_Code}</td>

                    <td className="clickable"><img src={require('../../components/Images/pencil.png')} onClick={this.displaydata} data-value={d.ID} style={{ width: '14px', marginLeft: '10px' }}></img></td>
                    <td className="clickable"><img src={require('../../components/Images/trash.png')} onClick={this.Inactive} data-value={d.ID} style={{ width: '14px', marginLeft: '10px' }}></img></td>
                </tr>
            )
        });

        return (
            <div className="overall-padding">
                <table className="table table-bordered claim-list" align="center">
                    {this.state.TradingPartnerList && this.state.TradingPartnerList.length > 0 ? this.renderTableHeader() : null}
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
                    pageCount={this.state.count}
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

    Headerview() {

        return (
            <div>
                <div>
                    <h5 className="headerText">Trading Partner Details</h5><br />
                </div>
                <div>
                    <div className="panel-group">
                        <div className="panel panel-default" style={{ border: "1px" }}>
                            <div className="panel-heading collapsible" style={{ background: "#139DC9", }} href="#BasicX12Options">
                                <span className="panel-title" style={{ color: "white", fontSize: "12px" }}>
                                    Trading Partner Configuration
                                </span>
                            </div>
                            <div id="BasicX12Options"   > <div className=" content">


                                <br />
                                <div className="row" style={{ marginLeft: "2px" }}>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">Sender Name</label>
                                        <input className="form-control list-header1" value={this.state.ISA_06_Name == null ? '' : this.state.ISA_06_Name} onChange={(e) => this.onChangeName(e, 'ISA_06_Name')}></input>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">Sender Id(ISA06)</label>
                                        <input className="form-control list-header1" value={this.state.ISA_06 == null ? '' : this.state.ISA_06} onChange={(e) => this.onChangeName(e, 'ISA_06')}></input>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">Payer Name</label>
                                        <input className="form-control list-header1" value={this.state.PayerName == null ? '' : this.state.PayerName} onChange={(e) => this.onChangeName(e, 'PayerName')}></input>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">Payer Id</label>
                                        <input className="form-control list-header1" value={this.state.PayerID == null ? '' : this.state.PayerID} onChange={(e) => this.onChangeName(e, 'PayerID')}></input>
                                    </div>


                                </div>

                                <div className="row" style={{ marginLeft: "2px" }}>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">Receiver Id(ISA08)</label>
                                        <input className="form-control list-header1" value={this.state.ISA_08 == null ? '' : this.state.ISA_08} onChange={(e) => this.onChangeName(e, 'ISA_08')}></input>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">Receiver Name</label>
                                        <input className="form-control list-header1" value={this.state.ISA_08_Name == null ? '' : this.state.ISA_08_Name} onChange={(e) => this.onChangeName(e, 'ISA_08_Name')}></input>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">State</label>
                                        <select className="form-control list-header1" onChange={(e) => this.ChangeVal(e, 'State')}>
                                            <option value="0"></option>
                                            {this.getoptions()}
                                        </select>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="list-header1">Transaction Type</label>
                                        <select className="form-control list-header1" va id="fao1" onChange={(e) => this.ChangeVal(e, 'Transaction_Type')}>
                                            <option value="0" ></option>
                                            {this.gettrans()}
                                            {/* <option selected={this.state.Transaction_Type == '270' ? "selected" : ''} value="270" >270</option>
                                    <option selected={this.state.Transaction_Type == '834' ? "selected" : ''} value="834" >834</option>
                                    <option selected={this.state.Transaction_Type == '837P' ? "selected" : ''} value="837P" >837P</option>
                                    <option selected={this.state.Transaction_Type == '837I' ? "selected" : ''} value="837I" >834</option> */}
                                        </select>
                                    </div>
                                    <div className="pull-right col-sm-2">
                                        <button type="submit" className="btn light_blue1 btn-xs" style={{ marginRight: "120px" }} onClick={this.handleClick}>Save</button>
                                    </div>
                                </div>

                                <div className="clickable" data-toggle="collapse" href="#BasicX12Options1">
                                    <span style={{ fontSize: "15px", color: "#139DC9", fontWeight: "700", marginLeft: "30px" }}>
                                        Search
       </span>
                                </div>
                                <div id="BasicX12Options1" className="collapse" >
                                    <div className="row" style={{ marginLeft: "2px" }}>
                                        {/* <div className="form-group col-sm-2">
                                        <label className="list-header1">Sender Name</label>
                                        <input className="form-control list-dashboard"  id="state"
                            onChange={(e) => {clearTimeout(val)
                                let value = e.target.value
                                val = setTimeout(() => {
                                    this.setState({ Search_Sendername: value, showDetails: false })
                                    setTimeout(() => {
                                        this.gettranaction()
                                    }, 50);
                                }, 300);
                            }}
                        />
                        
                                    </div> */}
                                        <div className="form-group col-sm-2">
                                            <label className="list-header1">Sender Id(ISA06)</label>
                                            <input className="form-control list-header1" id="state"
                                                onChange={(e) => {
                                                    clearTimeout(val)
                                                    let value = e.target.value
                                                    val = setTimeout(() => {
                                                        this.setState({ Search_Senderid: value, showDetails: false })
                                                        setTimeout(() => {
                                                            this.gettranaction()
                                                        }, 50);
                                                    }, 300);
                                                }}
                                            />
                                        </div>
                                        {/* <div className="form-group col-sm-2">
                                        <label className="list-header1">Payer Name</label>
                                        <input className="form-control list-dashboard"  id="state"
                            onChange={(e) => {clearTimeout(val)
                                let value = e.target.value
                                val = setTimeout(() => {
                                    this.setState({ Search_PayerName: value, showDetails: false })
                                    setTimeout(() => {
                                        this.gettranaction()
                                    }, 50);
                                }, 300);
                            }}
                        />
                                    </div> */}
                                        <div className="form-group col-sm-2">
                                            <label className="list-header1">Payer Id</label>
                                            <input className="form-control list-header1" id="state"
                                                onChange={(e) => {
                                                    clearTimeout(val)
                                                    let value = e.target.value
                                                    val = setTimeout(() => {
                                                        this.setState({ Search_PayerID: value, showDetails: false })
                                                        setTimeout(() => {
                                                            this.gettranaction()
                                                        }, 50);
                                                    }, 300);
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-sm-2">
                                            <label className="list-header1">State</label>
                                            <select className="form-control list-header1" onChange={(event) => {
                                                this.ChangeVal(event, 'Search_State')
                                                setTimeout(() => {
                                                    this.gettranaction()
                                                }, 50);
                                            }} >
                                                <option value=""></option>
                                                {this.Search_getoptions()}
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-2">
                                            <label className="list-header1">Transaction Type</label>
                                            <select className="form-control list-header1" va id="fao1"
                                                onChange={(event) => {
                                                    this.ChangeVal(event, 'Search_Tran_Type')
                                                    setTimeout(() => {
                                                        this.gettranaction()
                                                    }, 50);
                                                }} >>
                                            <option value="" ></option>
                                                {this.Search_gettrans()}

                                            </select>


                                        </div>

                                    </div>

                                </div>
                                {this.renderList()}
                            </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {
                    <div>

                        {this.Headerview()}
                        <div className="row">
                            <div className="col-12">

                            </div>

                        </div>
                    </div>


                }

            </div>
        );
    }
}