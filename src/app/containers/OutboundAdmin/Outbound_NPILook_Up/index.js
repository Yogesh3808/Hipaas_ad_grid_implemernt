import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../../helpers/Urls'
import ReactPaginate from 'react-paginate';

export class Outbound_NPILook_Up extends React.Component {

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
            NPILookup(page:${this.state.page}) {
                NPI
                Provider_Secondary_Practice_Location_Address__Address_Line_1
                Provider_Secondary_Practice_Location_Address___Address_Line_2
                Provider_Secondary_Practice_Location_Address___City_Name
                Provider_Secondary_Practice_Location_Address___State_Name
                Provider_Secondary_Practice_Location_Address___Postal_Code
                Provider_Secondary_Practice_Location_Address___Country_Code__If_outside_U_S__
                Provider_Secondary_Practice_Location_Address___Telephone_Number
                Provider_Secondary_Practice_Location_Address___Telephone_Extension
                Provider_Practice_Location_Address___Fax_Number
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
                console.log(res)
                let data = res.data
                let count = 1
                if (data && data.NPILookup.length > 0) {

                    count = Math.floor(data.NPILookup[0].RecCount / 10)
                    if (data.NPILookup[0].RecCount % 10 > 0) {
                        count = count + 1
                    }
                }

                this.setState({
                    claimsList: data.NPILookup,
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
                <td className="table-head-text list-item-style">NPI</td>
                <td className="table-head-text list-item-style">Address1</td>
                <td className="table-head-text list-item-style">Address2</td>
                <td className="table-head-text list-item-style">City</td>
                <td className="table-head-text list-item-style">State</td>
                <td className="table-head-text list-item-style">Postal Code</td>
                <td className="table-head-text list-item-style">Country Code</td>
                <td className="table-head-text list-item-style">Telephone No.</td>
                <td className="table-head-text list-item-style">Telephone Ext.</td>
                <td className="table-head-text list-item-style">Fax No.</td>
                
                
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
                    <td>{item.NPI}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address__Address_Line_1}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address___Address_Line_2}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address___City_Name}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address___State_Name}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address___Postal_Code}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address___Country_Code__If_outside_U_S__}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address___Telephone_Number}</td>
                    <td>{item.Provider_Secondary_Practice_Location_Address___Telephone_Extension}</td>
                    <td>{item.Provider_Practice_Location_Address___Fax_Number}</td>
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
                    <h5 className="headerText">NPI LookUp(Outbound)</h5>
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