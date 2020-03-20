import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls'
import ReactPaginate from 'react-paginate';

export class Outbound_NonCovered extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsList: [],
            files: [],
            allData: [],
            page: 1,
            count: 1
        }
        this.onChange = this.onChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let query = `{
                NonCoveredList(page:${this.state.page} State:"" RecType:"Outbound") {
                    SeqId
                    CPT
                    ICDCode
                    policy
                    C_eff_date
                    policyrulekey
                    policyDesc
                  RecCount
                  }
        }`

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
                console.log(res)
                let data = res.data
                let count = 1
                if (data && data.NonCoveredList.length > 0) {

                    count = Math.floor(data.NonCoveredList[0].RecCount / 10)
                    if (data.NonCoveredList[0].RecCount % 10 > 0) {
                        count = count + 1
                    }
                }

                this.setState({
                    claimsList: data.NonCoveredList,
                    count: count
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    renderTableHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text">CPT</td>
                <td className="table-head-text">C_eff_date</td>
                <td className="table-head-text">policy rule key</td>
                <td className="table-head-text">policy Description</td>
            </tr>
        )
    }

    onChange(e) {
        var files = e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        console.log(filesArr);
        this.setState({ files: [...this.state.files, ...filesArr] });
    }

    displayFile() {
        this.setState({ files: this.state.files });
    }

    renderRows() {


        let row = []
        let array = this.state.claimsList


        array.forEach(item => {
            row.push(
                <tr>
                    <td>{item.CPT}</td>
                    <td>{item.C_eff_date}</td>
                    <td>{item.policyrulekey}</td>
                    <td>{item.policyDesc}</td>
                </tr>
            )

        });
        return (
            <div>
                <table className="table table-bordered claim-list" style={{ width: '100%' }}>
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


    render() {
        return (
            <div>
                <div>
                    <h5 className="headerText">NonCovered(Outbound)</h5>
                </div>
                <div className="row">
                    <label className="btn" style={{ backgroundColor: "#139DC9", marginLeft: '15px', color: 'white' }}>Add File
                    <input type="file" name="filename" onChange={this.onChange} style={{ display: "none" }} />
                    </label>
                    {this.state.files.map(x =>
                        <div className="file-preview" style={{ marginTop: '10px', marginLeft: '10px' }} onClick={this.displayFile.bind()}>{x.name}</div>
                    )}
                </div>
            
                <div className="row">
                    <div className="col-12">
                        {this.renderRows()}

                    </div>
                </div>
            </div>
        );
    }
}