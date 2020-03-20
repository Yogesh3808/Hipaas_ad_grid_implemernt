import React from 'react'
import moment from 'moment';
import ReactPaginate from 'react-paginate';

var val = ''
export class CommonNestedTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderTableHeader() {
        let header_row = []
        let headerArray = this.props.headerArray
        headerArray.forEach(item => {
            header_row.push(
                    item.method ?
                    <div className={headerArray.length > 10 ? "col-1 col-header justify-align" : item.upScale == 1 ? "col-2 col-header justify-align" : "col col-header justify-align"}>
                        <img onClick={() => item.method()} src={require('../../components/Images/up_arrow.png')} style={{ width: '14px', transform: `rotate(${item.key}deg)`, marginLeft : '-2px' }}></img> {item.value}
                    </div>
                    :
                    <div className={headerArray.length > 10 ? "col-1 col-header justify-align" : item.upScale == 1 ? "col-2 col-header justify-align" : "col col-header justify-align"}>
                        {item.value}
                    </div>
            )
        })
        return headerArray
    }
    
    renderTable = () => {
        let row = []
        let col = []
        let data = this.state.claimsObj;
        let count = 0
       
        console.log(data)
        let rowArray = []
        // try {         
        //     count = data[Object.keys(data)[0]].value.Claimcount / 10
        //     if(data[Object.keys(data)[0]].value.Claimcount % 10 > 0){
        //         count = count + 1
        //     }
        // } catch (error) {
            
        // }
        
        
        Object.keys(data).map((keys) => {
            row.push(
                <div className="row">
                    <div className="col-4 small-font left-align"><a href={"#" + data[keys].value.FileID} 
                        onClick={() => {
                            this.getTransactions(data[keys].value.FileID)
                        }} style={{ color: "#6AA2B8" }} data-toggle="collapse" aria-expanded="false">{data[keys].value.FileName}</a></div>
                    <div className="col-2 small-font col-style">{moment(data[keys].value.FileDate).format('MMM D YYYY')}<br/>{moment(data[keys].value.FileDate).format('hh:mm a')}</div>
                    <div className="col-3 small-font col-style">{data[keys].value.FileStatus}</div>
                    <div className="col-3 small-font col-style">{data[keys].value.Sender}</div>
                </div>
            )

            {
                col = []
                data[keys].array.forEach((d) => {
                    col.push(
                        <tr>
                            <td className="list-item-style"><a href="#" onClick={() => {
                                this.setState({
                                    claimId : d.ClaimID
                                }, () => {
                                    this.getDetails(d.ClaimID, d.FileID)
                                })
                            }} style={{ color: "#6AA2B8" }}>{d.ClaimID}</a></td>
                            <td className="list-item-style">{moment(d.ClaimDate).format('MMM D YYYY hh:mm a') != "Invalid date" ? moment(d.ClaimDate).format('MMM D YYYY hh:mm a') : d.ClaimDate}</td>
                            <td className="list-item-style">{d.Claim_Amount}</td>
                            <td className="list-item-style">{d.ClaimStatus}</td>
                            <td className="list-item-style">{d.adjudication_status}</td>
                            <td className="list-item-style">{d.ClaimLevelErrors}</td>
                        </tr>
                    )
                })
            }

            row.push(
                <div id={keys} className="collapse">
                    <table id="" className="table table-bordered claim-details">
                        {this.renderClaimsHeader()}
                        {col}
                    </table>
                    
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'page-link'}
                        initialPage={this.state.initialPage}
                        pageCount={Math.floor((data[keys].value.Claimcount / 10) + (data[keys].value.Claimcount % 10 > 0 ? 1 : 0))}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(page) => {this.handlePageClick(page, keys)}}
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
        });

        return (
            <div>
                {this.renderTableHeader()}
                {row}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'page-link'}
                    initialPage={0}
                    pageCount={this.setState.recount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(page) => { this.handlePageClick1(page) }}
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

    render() {
        return (
            this.renderTable()
        );
    }
}