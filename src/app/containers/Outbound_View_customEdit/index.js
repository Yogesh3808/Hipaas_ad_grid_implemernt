import React from 'react';
import './style.css';
import moment from 'moment';
import '../color.css'
import Urls from '../../../helpers/Urls';

export class Outbound_View_customEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customList: [],
            apiflag: this.props.apiflag,
            tradingpartner: [],
            selectedTradingPartner: '',
            transaction: 'Claims 837P Medicaid',
            UpdateCheckBox: '',
            checked: [],
            unchecked: []
        }

        this.showFile = this.showFile.bind(this)
        this.Update = this.Update.bind(this)
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
        this.gettranaction();
    }

    gettranaction() {

        let query = `{
           
                Rules(transaction:"`+ this.state.transaction + `"  RecType:"Outbound") {
                    seqid
                    loopid
                    segment
                    element
                    opert
                    value
                    flag
                    severity
                    condition
                    Ignore
                  }
                
            }`

        console.log('Query ', query)

        fetch(Urls.tradingPartner, {
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
                let iterator = data.Rules
                iterator.forEach(item => {
                    array.push({
                        loopid: item.loopid,
                        segment: item.segment,
                        element: item.element,
                        condition: item.condition,
                        value: item.value,
                        severity: item.severity,
                        Ignore: item.Ignore,
                        seqid: item.seqid
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
            Trading_PartnerList (Transaction:"TradingPartner"  RecType:"Outbound") { 
                 
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
                <td className="table-head-text list-item-style">Loop Id</td>
                <td className="table-head-text list-item-style">Segment</td>
                <td className="table-head-text list-item-style">Element</td>
                <td className="table-head-text list-item-style">Rules</td>
                <td className="table-head-text list-item-style">Value / Url</td>
                <td className="table-head-text list-item-style">Severity</td>
                <td className="table-head-text list-item-style">Ignore</td>
            </tr>
        )
    }

    renderList() {
        let row = []
        const data = this.state.customList;
        data.forEach((d) => {
            row.push(
                <tr>
                    <td className="list-item-style">{d.loopid}</td>
                    <td className="list-item-style">{d.segment}</td>
                    <td className="list-item-style">{d.element}</td>
                    <td className="list-item-style">{d.condition}</td>
                    <td className="list-item-style">{d.value}</td>
                    <td className="list-item-style">{d.severity}</td>
                    <td className="list-item-style"><input type="checkbox" onChange={(e) => { this.changeCheckbox(e) }} value={d.seqid} /></td>
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

    Update() {
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
                updateIgnoreCode(uncheck:"`+ false_val + `" check:"` + true_val + `")
              }
        `
        console.log(" aslkhsajkfhfakfb",query)
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
                alert(res.data.updateIgnoreCode)
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
                            <option value="0">Select Transaction Name</option>
                            <option value="1" selected>Claims 837P Medicaid</option>
                            <option value="2">Claims 837I Medicaid</option>
                            <option value="3">Enrollments 834 Medicare</option>
                            <option value="4">Encounter 837I</option>
                            <option value="5">Encounter 837P</option>
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
                        <button type="submit" className="button" onClick={this.Update}>Save</button>
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
                        <h5 className="headerText">View Custom Edits(Outbound)</h5>
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