import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls'
import ReactPaginate from 'react-paginate';

export class Outbound_Covered extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CoveredList: [],
            files: [],
            allData: [],
            page: 1,
            count:1
        }
        this.onChange = this.onChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        // this.getData()
    }

    getData() {
        let query = `{
            CoveredList(page:${this.state.page}  State:"" RecType:"Outbound") {
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
                let data = res.data
                let count = 1
                if (data && data.CoveredList.length > 0) {

                    count = Math.floor(data.CoveredList[0].RecCount / 10)
                    if (data.CoveredList[0].RecCount % 10 > 0) {
                        count = count + 1
                    }
                }

                this.setState({
                    CoveredList: data.CoveredList,
                    count: count
                })
            })
            .catch(err => {
                console.log(err)
            })
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

      renderTableHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text">CPT</td>
                <td className="table-head-text">ICDCode</td>
                <td className="table-head-text">C_eff_date</td>
                <td className="table-head-text">policy rule key</td>
                <td className="table-head-text">policy Description</td>
            </tr>
        )
    }

      renderRows() {


        let row = []
        let array = this.state.CoveredList


        array.forEach(item => {
            row.push(
                <tr>
                    <td>{item.CPT}</td>
                    <td>{item.ICDCode}</td>
                    <td>{item.C_eff_date}</td>
                    <td>{item.policyrulekey}</td>
                    <td>{item.policyDesc}</td>
                </tr>
            )

        });
        return (
            <div>
                <table className="table table-bordered claim-list" style={{ width: '100%' }}>
                    {this.state.CoveredList && this.state.CoveredList.length > 0 ? this.renderTableHeader() : null}
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
                    <h5 className="headerText">Covered ICD Code(Outbound)</h5>
                </div>
              
                <div className="row">
                    <label className="btn" style={{ backgroundColor: "#139DC9", marginLeft: '15px', color: 'white' }}>Add File
                    <input type="file" name="filename" onChange={this.onChange} style={{ display: "none"  }} />
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