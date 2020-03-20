import React from 'react'
import moment from 'moment';
import ReactPaginate from 'react-paginate';

var val = ''
export class CommonTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    renderPagination() {
        return (
            <div style={{marginLeft: '-14px'}}>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'page-link'}
                initialPage={0}
                pageCount={this.props.count}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(page) => { this.props.handlePageClick && this.props.handlePageClick(page) }}
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

    renderTable() {
        let row = []
        let header_row = []
        const data = this.props.data ? this.props.data : []
        let rowArray = this.props.rowArray
        let headerArray = this.props.headerArray
        headerArray.forEach(item => {
            header_row.push(
                item.method ?
                    <div className={headerArray.length > 10 ? "col-1 col-header justify-align" : item.upScale == 1 ? "col-2 col-header justify-align" : "col col-header justify-align"}>
                        <a className="clickable" onClick={() => item.method()}>{item.value}</a>
                        {/* {item.value} <img src={require('../../components/Images/search_table.png')} style={{ height: '14px', marginTop: '3px', float: 'right', marginRight: '4px' }}></img> */}
                    </div>
                    :
                    <div className={headerArray.length > 10 ? "col-1 col-header justify-align" : item.upScale == 1 ? "col-2 col-header justify-align" : "col col-header justify-align"}>
                        {item.value} 
                        {/* <img src={require('../../components/Images/search_table.png')} style={{ height: '14px', marginTop: '3px', float: 'right', marginRight: '4px' }}></img> */}
                    </div>
            )
        })

        // {item.value + item.isBar == 1 ? '| ' + item.secondVal : ''}

        row.push(
            <div className="row">
                {header_row}
            </div>
        )

        data.forEach(data_item => {
            let col = []
            let count = 0
            let timeformat = "MM/DD/YYYY, hh:mm a"

            rowArray.forEach(row_item => {
                if (row_item.isNottime) {
                    timeformat = "MM/DD/YYYY"
                }

                col.push(
                    <div className={headerArray.length > 10 ? ("col-1 col-small-style small-font word-wrap" + (count == 0 ? " border-left" : "")) : row_item.upScale == 1 ? "col-2 col-small-style small-font" + (count == 0 ? " border-left" : "") : "col col-small-style small-font" + (count == 0 ? " border-left" : "")}>
                        {
                            this.props.onClick && count == 0 || row_item.isClick == 1 && row_item.method ?
                                <a style={{ color: "#6AA2B8", cursor: "pointer" }}
                                    onClick={() => { 
                                        if(row_item.isClick){
                                            row_item.method(row_item.key_argument ? data_item[row_item.key_argument] : '')
                                        } else {
                                            this.props.onClick(data_item[this.props.onClickKey]) 
                                        }
                                    }}
                                >
                                    {row_item.isAmount == 1 ? '$' : ''}{row_item.isDate == 1 ? moment(Number(data_item[row_item.value]) ? Number(data_item[row_item.value]) : data_item[row_item.value]).format(timeformat) != 'Invalid date' ? moment(Number(data_item[row_item.value]) ? Number(data_item[row_item.value]) : data_item[row_item.value]).format(timeformat) : data_item[row_item.value] : data_item[row_item.value]} {row_item.isBar == 1 ? ' | ' + data_item[row_item.secondVal] : ''}
                                </a> :
                                <a>
                                    {row_item.isAmount == 1 ? '$' : ''}{row_item.isDate == 1 ? moment(Number(data_item[row_item.value]) ? Number(data_item[row_item.value]) : data_item[row_item.value]).format(timeformat) != 'Invalid date' ? moment(Number(data_item[row_item.value]) ? Number(data_item[row_item.value]) : data_item[row_item.value]).format(timeformat) : data_item[row_item.value] : data_item[row_item.value]} {row_item.isBar == 1 ? ' | ' + data_item[row_item.secondVal] : ''}
                                </a>
                        }
                    </div>)
                count++
            })

            count = 0

            return (
                row.push(
                    <div className="row">
                        {col}
                    </div>
                )
            )
        })

        return (
            <div className="margin scrollmenu">
                {row}
                <br/>
                {this.renderPagination()}
            </div>
        )
    }

    render() {
        return (
            this.renderTable()
        );
    }
}