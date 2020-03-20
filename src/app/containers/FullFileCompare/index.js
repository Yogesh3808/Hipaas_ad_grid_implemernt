import React from 'react';
import { Topbar } from '../../components/Topbar';
import Urls from '../../../helpers/Urls';

export class FullFileCompare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buildin_rules: [],
            custom_rules: [],
        }

        this.getData = this.getData.bind(this)
        this.renderTable = this.renderTable.bind(this)
    }

    componentDidMount() {
        this.getData()
        setTimeout(() => {
            this.getData(1)
        }, 200);
    }

    getData(flag) {
        let query = '{ Rules(flag:"B" transaction:"Claims 837I Medicaid") { seqid transid loopid segment element sub_element operator value severity condition elementname flag }}'
        if (flag) {
            query = '{ Rules(flag:"c" transaction:"Claims 837I Medicaid") { seqid transid loopid segment element sub_element operator value severity condition elementname flag }}'
        }

        fetch(Urls.base_url, {
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
                data = r.data.Rules

                if (flag) {
                    this.setState({
                        custom_rules: data,
                    })
                } else {
                    this.setState({
                        buildin_rules: data,
                    })
                }
            })
            .then(data => console.log('data returned:', data));
    }

    renderHeader() {
        return (
            <div className="row form-group">
                <div className="col-2" style={{ fontSize: "12px" }}>LoadMonth</div>
                <div className="col-2" style={{ fontSize: "12px" }}>Eligibilty Errors</div>
                <div className="col-2" style={{ fontSize: "12px" }}>Total Inbound Eligibility</div>
                <div className="col-2" style={{ fontSize: "12px" }}>Active Reconciled</div>
                <div className="col-2" style={{ fontSize: "12px" }}>Hold Reconciled</div>
                <div className="col-2" style={{ fontSize: "12px" }}>Term Reconciled</div>
            </div>
        )
    }

    renderSecondHeader() {
        return (
            <div className="row form-group">
                <div className="col-2" style={{ fontSize: "10px", color: "rgb(19, 157, 201)" }}>Total Eligibility in X12 834 File</div>
                <div className="col-2" style={{ fontSize: "10px", color: "rgb(19, 157, 201)" }}>Members</div>
                <div className="col-2" style={{ fontSize: "10px", color: "rgb(19, 157, 201)" }}>Total Eligibility FAME</div>
                <div className="col-2" style={{ fontSize: "10px", color: "rgb(19, 157, 201)" }}>Members</div>
                <div className="col-2" style={{ fontSize: "10px", color: "rgb(19, 157, 201)" }}>Eligibility in Qnxt</div>
                <div className="col-2" style={{ fontSize: "10px", color: "rgb(19, 157, 201)" }}>Members</div>
            </div>
        )
    }

    renderDownHeader() {
        return (
            <div className="row">
                <div className="col-2 col-header">Loop Id</div>
                <div className="col-2 col-header">Segment</div>
                <div className="col-2 col-header">Element</div>
                <div className="col-2 col-header">Sub Element</div>
                <div className="col-2 col-header">Rule</div>
                <div className="col-2 col-header">Severity</div>
            </div>
        )
    }

    renderTable(flag) {
        let row = []
        let data = this.state.buildin_rules;
        if (flag) {
            data = this.state.custom_rules
        }

        data.forEach((item) => {
            row.push(
                <div className="row">
                    <div className="col-2 col-style claim-line-data">{item.loopid}</div>
                    <div className="col-2 col-style claim-line-data">{item.segment}</div>
                    <div className="col-2 col-style claim-line-data">{item.element}</div>
                    <div className="col-2 col-style claim-line-data">{item.sub_element}</div>
                    <div className="col-2 col-style claim-line-data">{item.condition}</div>
                    <div className="col-2 col-style claim-line-data">{item.severity}</div>
                </div>
            )
        });

        return (
            <div>
                {row}
            </div>
        )
    }

    renderView() {
        return (
            <div>
                { this.renderHeader() }
                {this.renderTopView()}
            </div>
        )
    }

    renderDown(flag) {
        return (
            <div>
                {(!flag && this.state.buildin_rules.length > 0) || (flag && this.state.custom_rules.length > 0) ? this.renderDownHeader() : null}
                {this.renderTable()}
            </div>
        )
    }
    renderTopView() {
        return (
            <div className="row">
                <div className="col-2" style={{ align: "center" }}>Jan 28 5:43 PM <hr></hr></div>
                <div className="col-2" style={{ align: "center", fontSize: "45px", color: "red" }}>3</div>
                <div className="col-2" style={{ align: "center", fontSize: "45px", color: "rgb(19, 157, 201)" }}>500K</div>
                <div className="col-2" style={{ align: "center", fontSize: "45px", color: "green" }}>0</div>
                <div className="col-2" style={{ align: "center", fontSize: "45px", color: "green" }}>0</div>
                <div className="col-2" style={{ align: "center", fontSize: "45px", color: "green" }}>0</div>
            </div>
        )
    }
    renderSecondTopView() {
        return (
            <div class="container" style={{ fontSize: "13px" }}>
                <table class="inline" style={{ float: "left", marginRight: "130px" }}>
                    <tbody><tr>
                        <th style={{ color: "rgb(19, 157, 201)", textAlign: "left" }}> Total Eligibility in X12 834 File </th>
                        <th style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "rgb(19, 157, 201)" }}>Members</th>
                    </tr>
                        <tr>
                            <td></td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                2
                    </td>
                        </tr>
                        <tr>
                            <td>Active</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                400
                    </td>
                        </tr>
                        <tr>
                            <td>Dup in File</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                11
                    </td>
                        </tr>
                        <tr>
                            <td>Hold</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                50
                    </td>
                        </tr>
                        <tr>
                            <td>No Eligibility Data</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                2
                    </td>
                        </tr>
                        <tr>
                            <td>Other Health Plan(not 307)</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                15
                    </td>
                        </tr>
                        <tr>
                            <td>Term</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                20
                    </td>
                        </tr>
                    </tbody>
                </table>
                <table className="inline" style={{ float: "left", marginRight: "130px" }}>
                    <tbody><tr>
                        <th style={{ color: "rgb(19, 157, 201)", textAlign: "left" }}> Total Eligibility FAME </th>
                        <th style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "rgb(19, 157, 201)" }}>Members</th>
                    </tr>
                        <tr>
                            <td></td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                15
                    </td>
                        </tr>
                        <tr>
                            <td>Active</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                400
                    </td>
                        </tr>
                        <tr>
                            <td>Hold</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                50
                    </td>
                        </tr>
                        <tr>
                            <td>Other Health Plan(not 307)</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                40
                    </td>
                        </tr>
                        <tr>
                            <td>Term</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                20
                    </td>
                        </tr>
                    </tbody>
                </table>
                <table className="inline" style={{ float: "left" }}>
                    <tbody><tr>
                        <th style={{ color: "rgb(19, 157, 201)", textAlign: "left" }}> Eligibility in Qnxt </th>
                        <th style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "rgb(19, 157, 201)" }}>Members</th>
                    </tr>
                        <tr>
                            <td></td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                10
                    </td>
                        </tr>
                        <tr>
                            <td>Active</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                350
                    </td>
                        </tr>
                        <tr>
                            <td>Active Delta</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                50
                    </td>
                        </tr>
                        <tr>
                            <td>Hold</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                30
                    </td>
                        </tr>
                        <tr>
                            <td>Term</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                20
                    </td>
                        </tr>
                        <tr>
                            <td>Term Delta</td>
                            <td style={{ paddingLeft: "30px", padding: "5px", textAlign: "right", color: "white", background: "rgb(19, 157, 201)" }}>
                                40
                    </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <Topbar onSelect={this.onSelect} />
                <br></br>
                {this.renderView()}
                <br></br>
                {this.renderSecondTopView()}
                <br></br><br></br>
                {this.state.custom_rules && this.state.custom_rules.length > 0 ? <h3 style={{marginTop:"215px"}}>Custom Edits</h3> : ''}
                {this.renderDown(1)}
            </div>
        );
    }
}