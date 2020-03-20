import React from 'react';
import moment from 'moment';
import '../color.css'
import Urls from '../../../helpers/Urls';

export class Outbound_View_customEditNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customList: [],
            apiflag: this.props.apiflag,
            tradingpartner: [],
            selectedTradingPartner: '',
            transaction: 'Encounter 837P',
            UpdateCheckBox: '',
            checked: [],
            unchecked: [],
            TransactionMasterList: [],
            
        }

        this.showFile = this.showFile.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.gettrans = this.gettrans.bind(this)
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
        this.getData()
        this.gettranaction()
        this.getTransdata()
    }

    gettranaction() {

        let query = `{

                RulesNew(transaction:"${this.state.transaction}" RecType : "Outbound") {
                  seqid
                  RuleName
                  Rule_Desc
                  Validation_Level
                  mainloop
                  loopid
                  segment
                  element
                  opert
                  value
                  flag
                  severity
                  condition
                  is_condition
                  Ignore
                  Min_Value
                  Max_Value
                  max_length
                  Min_Length
                  Error_Type
                  Error_Description
                  is_mandatory
                  Post_Processing
                  PostProcessingAPI
                  Transaction
                }
                
            }`

        // Rules(transaction:"`+ this.state.transaction + `") {
        //     seqid
        //     loopid
        //     segment
        //     element
        //     opert
        //     value
        //     flag
        //     severity
        //     condition
        //     Ignore
        //   }
        console.log('Query ', query)

        fetch(Urls.base_url, {
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
                let iterator = data.RulesNew
                iterator.forEach(item => {
                    array.push({
                        loopid: item.loopid,
                        segment: item.segment,
                        element: item.element,
                        condition: item.Rule_Desc,
                        value: item.value,
                        severity: item.severity,
                        isChecked: item.Ignore,
                        seqid: item.seqid,
                        mainLoopId: item.mainloop,
                        operator: item.opert,
                        is_mandatory: item.is_mandatory,
                        max_length: item.max_length,
                        Min_Length: item.Min_Length,
                        Min_Value: item.Min_Value,
                        Max_Value: item.Max_Value,
                        Post_Processing: item.Post_Processing,
                        PostProcessingAPI: item.PostProcessingAPI,
                        Validation_Level: item.Validation_Level,
                        Transaction: item.Transaction
                    })
                })

                this.setState({
                    customList: array,
                    // tradingpartner: res.data.Trading_PartnerList
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getData() {

        let query = `{
            Trading_PartnerList (Transaction:"TradingPartner") { 
                 
                Trading_Partner_Name 
            }
        }`
        console.log(query);
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
                console.log('Data : ', res)
                this.setState({
                    tradingpartner: res.data.Trading_PartnerList
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

    gettrans() {

        let row = []
        console.log(this.state.TransactionMasterList)
        this.state.TransactionMasterList.forEach(element => {
            row.push(<option selected={this.state.transaction == element.Trans_Code ? element.Trans_Code : ''} value={element.Trans_Code}>{element.Trans_Code}</option>)
        })
        return row

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
                {/* <td className="table-head-text list-item-style">Transaction</td>  */}
                <td className="table-head-text list-item-style" style={{width: '10%'}}>Loop Id</td>
                {/* <td className="table-head-text list-item-style">Sub Loop Id</td> */}
                <td className="table-head-text list-item-style">Segment</td>
                <td className="table-head-text list-item-style">Element</td>
                <td className="table-head-text list-item-style" style={{width: '10%'}}>Validation Level</td> 
                {/* <td className="table-head-text list-item-style">Usage Req.</td>
                <td className="table-head-text list-item-style">Min | Max length</td> */}
                <td className="table-head-text list-item-style" style={{width: '9%'}}>Operator</td>
                <td className="table-head-text list-item-style" style={{width: '16%'}}>Value / URL</td>
                {/* <td className="table-head-text list-item-style">Rules</td> */}
                
               
                <td className="table-head-text list-item-style">Severity</td>
                <td className="table-head-text list-item-style">Ignore</td>
                <td className="table-head-text list-item-style">Post Processing</td>
                <td className="table-head-text list-item-style">Post Processing API</td>
            </tr>
        )
    }

    renderList() {
        let row = []
        const data = this.state.customList;
        data.forEach((d) => {
            let usageReq = d.is_mandatory == true ? "Required" : "Absent"
            let value = d.Min_Value
            if(value){
                value =  d.Min_Value + " | " + d.Max_Value
            }else{
                value = d.value
            }
            row.push(
                <tr>
                    {/* <td className="list-item-style">{d.Transaction}</td> */}
                    <td className="list-item-style">{d.mainLoopId} {d.loopid}</td>
                    {/* <td className="list-item-style">{d.loopid}</td> */}
                    <td className="list-item-style">{d.segment}</td>
                    <td className="list-item-style">{d.element}</td>
                    <td className="list-item-style">{d.Validation_Level}</td>
                    {/* <td className="list-item-style">{usageReq}</td>
                    <td className="list-item-style">{d.Min_Length} | {d.max_length}</td> */}
                    <td className="list-item-style">{d.operator}</td>
                    <td className="list-item-style">{value}</td>
                    {/* <td className="list-item-style">{d.condition}</td> */}
                  
                  
                    <td className="list-item-style">{d.severity}</td>
                    <td className="list-item-style"><input type="checkbox" checked={d.isChecked} onChange={(e) => { 
                        d.isChecked = e.target.checked
                        this.setState({
                            customList: [...data]
                        })
                        }} value={d.seqid} /></td>
                     <td className="list-item-style"><input type="checkbox" checked={d.Post_Processing} onChange={(e) => { 
                        d.Post_Processing = e.target.checked
                        this.setState({
                            customList: [...data]
                        })
                        }} value={d.seqid} /></td>
                     <td className="list-item-style">{d.PostProcessingAPI}</td>
                </tr>
            )
        });

        return (
            <div>
                <div className="panel-heading collapsible" style={{ background: "var(--main-bg-color)" }}>
                    <span className="panel-title" style={{ color: "white" }}>Custom Edits </span>
                </div>
                <div className="panel-collapse content">
                    <div className="panel-body">
                        <div>
                            <table className="table table-bordered claim-list" align="center" style={{ width: '95%' }}>
                                {this.state.customList && this.state.customList.length > 0 ? this.renderTableHeader() : null}
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    changeCheckbox(event, key) {
        let checkboxValue = event.target.checked;
        if (checkboxValue == true) {
            this.state.checked.push(event.target.value)
        } else {
            this.state.unchecked.push(event.target.value)
        }
        this.setState({
            checkedCheckbox: this.state.checked,
            uncheckCheckbox: this.state.unchecked
        })
        // console.log(this.state.UpdateCheckBox)
    }
    showFile(name) {
        this.setState({
            showFile: true,
            flag: name
        })
    }

    ChangeTradingPartner(event) {
        alert(event)
    }

    getoptions() {
        let row = []
        this.state.tradingpartner.forEach(element => {
            row.push(<option value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }

    onSelect(event, key) {

        if (event.target.options[event.target.selectedIndex].text == 'Transaction Name') {
            this.setState({
                [key]: ''
            })
        } else {
            this.setState({
                [key]: event.target.options[event.target.selectedIndex].text
            })
        }

        setTimeout(() => {
            this.gettranaction()
        }, 50);
    }

    onUpdate(e) {
        // e.preventDefault();
        let data = this.state.customList
        let true_val = ''
        let false_val = ''
        data.forEach(element => {
            if (element.isChecked) {
                true_val = true_val + element.seqid + ','
            } else {
                false_val = false_val + element.seqid + ','
            }
        });
        let query = `
            mutation{
                updateIgnoreCodeNew(uncheck:"`+ false_val + `" check:"` + true_val + `")
              }
        `
        console.log(query)
        fetch(Urls.base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                alert(res.data.updateIgnoreCodeNew)
            })
            .catch(err => {
                console.log(err)
            })
    }
    renderTopbar() {
        return (
            <form className="form-style" id='filters'>
                <div className="form-row">
                    <div className="form-group col-2">
                        <div className="list-dashboard">State</div>
                        <select className="form-control list-dashboard" id="state">
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
                        <div className="list-dashboard">Transaction</div>
                        <select className="form-control list-dashboard" id="option"
                            onChange={(event) => {
                                this.onSelect(event, 'transaction')
                            }}
                        >
                            <option value=""></option>
                            {this.gettrans()}
                        </select>
                    </div>

                    <div className="form-group col-2">
                        <div className="list-dashboard">Submitter </div>
                        <select className="form-control list-dashboard" id="TradingPartner" >
                            <option value="select">Trading partner</option>
                            {this.getoptions()}
                        </select>
                    </div>
                    <div className="form-group col-2">
                        <button type="button" className="button" onClick={(e)=> {this.onUpdate(e)}}>Save</button>
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
                        <h5 className="headerText">View Custom Edits (Outbound)</h5>
                        {this.renderTopbar()}
                        <div className="row">
                            <div className="col-12">
                                {this.renderList()}
                            </div>

                        </div>
                    </div>
                }
            </div>
        );
    }
}