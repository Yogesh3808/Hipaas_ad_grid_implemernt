import React from 'react';
import './style.css';
import { MDBDataTable } from 'mdbreact';
import Urls from '../../../helpers/Urls'
import ReactPaginate from 'react-paginate';

export class CompanionGuide extends React.Component {

    constructor(props) {



        super(props);
        this.state = {
            claimsError: [],
            array: [],
            page: 1,
            count: 1
        }


    }

    componentDidMount() {

        this.getData()
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

    getData() {
        let query = `{
            GetCompanion(page:${this.state.page} RecType:"Inbound")    {
                RecCount
                Edit_Reference
                Segment
                Description
                ID
                Min_Max
                Usage_Req
                Values5010A1
                TA1_999_277CA
                Accept_Reject
                Disposition
                PartB
                CEDI
                MiscNotes
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
                let data = res.data
                let count = 1
                if (data && data.GetCompanion.length > 0) {

                    count = Math.floor(data.GetCompanion[0].RecCount / 10)
                    if (data.GetCompanion[0].RecCount % 10 > 0) {
                        count = count + 1
                    }
                }
                this.setState({

                    array: res.data.GetCompanion,
                    count: count
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
            this.getData()
        }, 50);
    }

    renderRows() {


        let row = []
        let array = this.state.array


        array.forEach(item => {
            row.push(
                <tr>
                    <td>{item.Edit_Reference}</td>
                    <td>{item.Segment}</td>
                    <td>{item.Description}</td>
                    <td>{item.ID}</td>
                    <td>{item.Min_Max}</td>
                    <td>{item.Usage_Req}</td>

                    <td>{item.Values5010A1}</td>
                    <td>{item.TA1_999_277CA}</td>
                    <td>{item.Disposition}</td>




                </tr>
            )

        });
        return (
            <div>
                <table className="table table-bordered claim-list" style={{ width: '100%' }}>
                    {this.state.array && this.state.array.length > 0 ? this.renderTableHeader() : null}
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

    renderTableHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text">Edit Reference</td>
                <td className="table-head-text">Segment</td>
                <td className="table-head-text">Description</td>
                <td className="table-head-text">ID</td>
                <td className="table-head-text">Min Max</td>
                <td className="table-head-text">Usage Req</td>
                <td className="table-head-text">5010A1 Values</td>
                <td className="table-head-text">TA1/999/277CA</td>
                <td className="table-head-text">Disposition/Error Code</td>
            </tr>
        )
    }

    render() {

        return (

            <div>
                {
                    <div>
                        <div>
                            {/* <p style={{ color: '#139DC9', fontWeight: 'bold' }}>Companion Guide</p> */}
                            <h5 className="headerText">Companion Guide</h5>
                        </div>
                        <br/>
                        <div className="row">

                            <div className="form-group col-sm-3">
                                <label className="list-header1">Select Companion Guide</label>
                                <select onChange={this.ChangeTradingPartner} className="form-control list-header1" id="fao1">
                                    <option>834 Medicare</option>
                                    <option>837I Medicaid CA</option>
                                    <option>837P Medicaid CA</option>
                                    <option>Encounters 837I Medicaid CA</option>
                                    <option>Encounters 837P Medicaid CA</option>
                                    <option>270 Medicare</option>
                                    <option>270 Medicaid CA</option>
                                    <option>276 Medicare</option>
                                    <option>276 Medicaid CA</option>
                                </select>
                            </div>

                            <div className="pull-right col-sm-2">
                                <p class="form" style={{marginTop: '-5px'}}>

                                    <label class="add-photo-btn">Add New<span><input type="file" id="myfile" name="myfile" /></span>
                                    </label>
                                </p>
                            </div>
                        </div>

                        <div className="container">

                        </div>
                    </div>


                }

                {  /*        <table className="table table-bordered claim-list summary-list">
                <thead>
                    <tr className="table-head">
                        <td className="table-head-text">Edit Reference</td>
                        <td className="table-head-text list-item-style">Segment or Element	</td>
                        <td className="table-head-text list-item-style">Description</td>
                        <td className="table-head-text list-item-style">ID</td>
                        <td className="table-head-text list-item-style">Min.Max.</td>
                        <td className="table-head-text list-item-style">Usage Req</td>
                        <td className="table-head-text list-item-style">5010A1 Values</td>
                        <td className="table-head-text list-item-style">TA1/999/277CA</td>
                        <td className="table-head-text list-item-style">Disposition/Error Code</td>
                    </tr>
                   
                </thead>

                <tbody>
               
                {this.renderRows()}
                    </tbody>
                    
            </table>*/}
                {this.renderRows()}
            </div>
        );


    }
}





