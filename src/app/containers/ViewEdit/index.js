import React from 'react';
import '../Files/files-styles.css';
import { Topbar } from '../../components/Topbar';
import Urls from '../../../helpers/Urls';

export class ViewEdit extends React.Component {

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
        if(flag){
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

                if(flag){
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
        if(flag){
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

    renderView(flag){
        return(
            <div className="claim-list">
                {(!flag && this.state.buildin_rules.length > 0) || (flag && this.state.custom_rules.length > 0) ? this.renderHeader() : null}
                {this.renderTable(flag)}
            </div> 
        )
    }

    render() {
        return (
            <div className="container">
                <Topbar flag={1} onSelect={this.onSelect}/>
                {this.state.buildin_rules && this.state.buildin_rules.length > 0 ? <h3 className="top-padding-table">Build In Edits</h3> : ''}
                {this.renderView()}
                {this.state.custom_rules && this.state.custom_rules.length > 0 ? <h3 className="top-padding-table">Custom Edits</h3> : ''}
                {this.renderView(1)}
            </div>
        );
    }
}