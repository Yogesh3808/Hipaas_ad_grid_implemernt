import React from 'react'
// import '../../Claims/Dashboard/styles.css'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import Urls from '../../../helpers/Urls';


export class ServiceDetails278 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            files_list: [],
            count: 1,
            page: 1,
            showDetails: false,
            message_270: '',
            message_271:'',
            TransStatus:props.location.state.data[0].TransStatus,
            ErrorCode:props.location.state.data[0].ErrorCode,
        }


    }

    componentDidMount() {
        this.getData()
    }

    getData() {

        let query = `{
            ServiceDetails278 (TransStatus:"${this.state.TransStatus}" ErrorCode:"${this.state.ErrorCode}" page:${this.state.page}) {
                TranID
                TranName
                TranDate
                TranStatus
                Submitter
                ErrorCode
                RecCount
              }
        }`

        console.log('query ', query)

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
                let count = 1
                let data = res.data.ServiceDetails278



                if (data && data.length > 0) {
                    count = Math.floor(data[0].RecCount / 10)
                    if (data[0].RecCount % 10 > 0) {
                        count = count + 1
                    }
                }

                this.setState({
                    files_list: data,
                    count: count
                })

            })
            .catch(err => {
                console.log(err)
            });
    }

    getDetails(HiPaaSUniqueID) {
        let message_270 = `ISA*00* *00* *ZZ*TPID *ZZ*BCBSLA001 *090826*2207*{*00501*410834725*0*T*:~ GS*HI*TPID*BCBSLA001*20090826*2207292*410834725*X*005010X217~ ST*278*728087203*005010X217~ BHT*0007*13*ABCD1234TRAILERCITY*20090826*2203340~ HL*1**20*1~ NM1*X3*2*BCBSLA*****PI*53120~ HL*2*1*21*1~ NM1*1P*2*PROVIDER NAME*****XX*1111111111~ HL*3*2*22*1~ NM1*IL*1*SSSSSSSSSS*NNNNNNN****MI*XUP212132323~ DMG*D8*19630701*M~ HL*4*3*EV*1~ TRN*1*BX828709082622072928400*993ITSA ~ UM*SC*I*1*21:B~ HI*BK:53081~ CRC*11*Y*25~ CR5***A*B**1*****87*N*****A~ PWK*OB*VO~ HL*5*4*SS*0~ NM1*SJ*2*PROVIDER NAME*****XX*1111111111~ SE*19*728087203~ GE*1*410834725~ IEA*1*410834725~.......`
        let message_271 = `ISA*00* *00* *ZZ*BCBSLA001 *ZZ*TPID *110509*1144*{*00501*000000026*1*T*:~ GS*HI*BCBSLA001*TPID*20110509*1144*2*X*005010X217~ ST*278*10194*005010X217~ BHT*0007*11*ABCD1234TRAILERCITY*20110509*0644*18~ HL*1**20*1~ NM1*X3*2*BCBSLA*****PI*53120~ PER*IC**TE*8005236435~ HL*2*1*21*1~ NM1*1P*2*PROVIDER NAME*****XX*1111111111~ HL*3*2*22*1~ NM1*IL*1*SSSSSSSSSS*NNNNNNN****MI*XUP212132323~ DMG*D8*19600706~ HL*4*3*EV*1~ TRN*2*BX828709082622072928400*993ITSA ~ UM*SC*I*1*21:B~ HCR*CT~ MSG*YOUR REQUEST HAS BEEN RECEIVED AND ANY ADDITIONAL INFORMATION IS PROVIDED OUTSIDE OF 278 TRANSACTION~ HL*5*4*SS*0~ NM1*SJ*2*PROVIDER NAME*****XX*1111111111~ SE*18*10194~ GE*1*2~ IEA*1*000000026~..........`

     this.setState({
        showDetails: true,
        message_270: message_270,
        message_271: message_271,
        })
                
    }

    renderTableList() {
        let row = []
        const data = this.state.files_list ? this.state.files_list : []

        data.forEach((d) => {
            row.push(
                <tr>
                    <td><a onClick={() => {
                        // this.getData(d.HiPaaSUniqueID)
                        this.getDetails(d.HiPaaSUniqueID)
                    }} style={{ color: "var(--light-blue)", cursor: "pointer" }}>{d.TranName}</a></td>
                    <td>{moment(d.TranDate).format("MM/DD/YYYY hh:mm a")}</td>
                    <td>{d.TranStatus}</td>
                    <td>{d.Submitter}</td>
                    {this.state.status != 'Pass' ? <td>{d.ErrorCode}</td> : null}

                </tr>
            )
        })

        return (
            <div style={{ padding: '0' }}>
                <table className="table table-bordered claim-list">
                    <tr className="table-head">
                        <td className="table-head-text list-item-style">Transaction Name</td>
                        <td className="table-head-text list-item-style">Transaction State</td>
                        <td className="table-head-text list-item-style">Status</td>
                        <td className="table-head-text list-item-style">Submitter</td>
                        <td className="table-head-text list-item-style">Error Code</td>
                    </tr>
                    {row}
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

    renderDetails(flag) {
        return (
            <div className="row">
                <div className={"col-12"}>
                    <div className="top-padding"><a href={'#' + 'hello' + flag} data-toggle="collapse">{flag ? '278-11 Transaction Response' : '278-13 Transaction Request'}</a></div>
                    <div className="border-view collapse" id={'hello' + flag}>{flag ? this.state.message_271 : this.state.message_270}</div>
                </div>
            </div>
        )
    }

    handlePageClick = (data) => {
        let page = data.selected + 1
        this.setState({
            page: page
        })

        setTimeout(() => {
            this.getData()
        }, 50);
    }


    renderTopbar() {
        return (
            <div>
                <div className="row">
                    <div className="form-group col-3">
                        <div className="list-dashboard">State</div>
                        <select className="form-control list-dashboard" id="state"
                            // onChange={(event) => {
                            //     this.onSelect(event, 'State')
                            // }}
                        >
                            <option value=""></option>
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
                    <div className="form-group col-3">
                        <div className="list-dashboard">
                            Submitter
                        </div>
                        <select className="form-control list-dashboard" id="TradingPartner"
                        // onChange={(event) => {
                        //     this.onSelect(event, 'selectedTradingPartner')
                        // }}
                        >
                            <option selected="selected" value="select">GH GENERATIONS</option>
                            <option value="select">AVAILITY</option>

                        </select>
                    </div>
                    <div className="form-group col-3">
                        <div className="list-dashboard">Provider Name</div>
                        <select className="form-control list-dashboard" id="ProviderName">
                            <option value="">Provider Name</option>
                            <option selected="selected" value="1">Provider Name 1</option>
                            <option value="2">Provider Name 2</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-3">
                        <div className="list-dashboard">Transaction Name</div>
                        <input className="form-control" type="text" />
                    </div>

                    <div className="form-group col-3">
                        <div className="list-dashboard">Date</div>
                        <input className="form-control" type="text" />
                    </div>

                    <div className="form-group col-3">
                        <div className="list-dashboard">Submitter</div>
                        <input className="form-control" type="text" />
                    </div>

                    <div className="form-group col-3">
                        <div className="list-dashboard">Error Code</div>
                        <input className="form-control" type="text" />
                    </div>
                </div>
            </div>
        )

    }

    render() {
        return (
            <div>
                <h5 className="headerText">Service Details</h5>
                {this.renderTopbar()}
                <div className="row">
                    <div className="col-7">
                        {this.renderTableList()}
                    </div>
                    <div className="col-5">
                    {this.state.showDetails ? <div><h6 style={{marginTop: '15px'}}>278 Transaction Details</h6><hr /> </div>: null}
                        {this.state.showDetails ? this.renderDetails() : null}
                        {this.state.showDetails ? this.renderDetails(1) : null}
                    </div>
                </div>

            </div>
        );
    }
}