import React from 'react';
import './style.css'
import '../Files/files-styles.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import Urls from '../../../helpers/Urls';

const $ = window.$;
export class Files_834 extends React.Component {

    constructor(props) {
        super(props);
    console.log("sdfhdshv" ,props)
        this.state = {
            intakeClaims: [],
            page: 1,
            initialPage: 0,
            lineData: [],
            file: {},
            memberInfo: {},
            File_ID : '',
            subscriberNo : '',
            enrollment_type : '',
            plan_code : '',
            coverage_data: [],
            error_status: '',
            Error_Field:'',
            isInitial: true,
            Total:props.location.state.data[0] &&props.location.state.data[0].Total != 'Total' || props.location.state.data[0].Total != 'error'   ?props.location.state.data[0].Total : '',
            
        }

        this.getData = this.getData.bind(this)
        this.getClaimData = this.getClaimData.bind(this)
        this.renderList = this.renderList.bind(this)
        this.sortData = this.sortData.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.Ignore = this.Ignore.bind(this)
        this.Saved = this.Saved.bind(this)
        this.onClick = this.onClick.bind(this)
        
    }

    componentDidMount() {
        this.getData()
    }
    

    Ignore() {
        console.log(this.state.File_ID);
        var query = 'mutation{ SP_Ignore834errordetails(FileId :"'+ this.state.File_ID +'" '+ 'Nm109 :"'+this.state.subscriberNo +'"'+   
         ')'+
'}'
    fetch(Urls.base_url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
   },
   body: JSON.stringify({
     query
     
   })
 })
   .then(r => r.json())
   .then(data => 
    alert(data.data.SP_Ignore834errordetails),
    setTimeout(() => {
        window.location.reload()
    }, 1000)
   
    );
    }

    
    Saved() {
        console.log(this.state.subscriberNo);
        var Updatefild='';
        if (this.state.Error_Field == "Subscriber")
        {
            Updatefild = this.state.subscriberNo;
            
        }
      if (this.state.Error_Field == "dob")
        {
            Updatefild = this.state.dateofbirth;
            
        }
        if (this.state.Error_Field == "gender")
        {
            Updatefild = this.state.gender;
            
        }
        if (this.state.Error_Field == "PolicyNo")
        {
            Updatefild = this.state.PolicyNo;
            
        }
        if (this.state.Error_Field == "DTP336")
        {
            Updatefild = this.state.DepartmentNo;
            
        }
        var query = 'mutation{ SP_Update834errordetails(FileId :"'+ this.state.File_ID +'" '+ 'Nm109 :"'+this.state.subscriberNo +'" '+ ' Errordesc :"'+this.state.Error_Field +'" '+ 'Value :"'+ Updatefild +'"'+   
        ')'+
'}'
   fetch(Urls.base_url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query
    
  })
})
  .then(r => r.json())
  .then(data => 
    alert(data.data.SP_Update834errordetails),
    setTimeout(() => {
        window.location.reload()
    }, 1000)
      
  );
  
  
    }
  
  
    getData() {
        let query = '{SP_834FilecountwisedetailsGQL(Type:'+'"'+this.state.Total +'"'+'){ FileName FileID  sender receiver FileStatus CreateDateTime dcount  }}'
        console.log('query : ' + query)
        fetch(Urls.enrollment_details, {
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
                data = r.data.SP_834FilecountwisedetailsGQL

                this.setState({
                    intakeClaims: data
                })

                setTimeout(() => {
                    this.sortData()
                }, 50);
            })
            .then(data => console.log('data returned:', data));
    }

    getClaimData(FileID, ClaimID) {
        fetch(Urls.claim_details, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: "{ IntakeClaimLineDataFileIDClaimID(FileID:\"" + FileID + "\",ClaimID:\"" + ClaimID + "\"){ ClaimID LX SVD02 ServiceDate SVD03 SVD05 ErrorCode type_of_adjustment adjustment RemainigAmt RemainingPatientLiability } }"
            })
        })
            .then(res => res.json())
            .then(r => {
                console.log("Here is the data hurray : " + JSON.stringify(r))
                this.setState({
                    lineData: r.data.IntakeClaimLineDataFileIDClaimID
                })
            })
            .then(data => console.log('data returned:', data));
    }

    onClick(fileId){
        if(this.state.isInitial){
            return
        }
        let query = '{ SP_834FileDetailsPagingGQL(Type :'+'"'+this.state.Total +'"'+', PageIndex:'+this.state.page+', FileID: '+fileId+') { SubscriberNo fileid Enrollment_type InsLineCode Insurer_Status TransCode MemberAmount Error CreateDateTime status1 } }'
        console.log(query)
        fetch(Urls.enrollment_details, {
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
                data = r.data.SP_834FileDetailsPagingGQL
                console.log(data);
                this.sortData(fileId, data)
            })
            .then(data => console.log('data returned:', data));
    }

    sortData(fileId, data) {
        let files = {}
        let intakeClaims = this.state.intakeClaims

        if(fileId && data){
            files = this.state.claimsObj
            if (fileId in files) {
                files[fileId].array = []
                data.forEach(item => {
                    files[fileId].array.push(item)
                });
            }
        } else {
            intakeClaims.forEach(item => {
                files[item.FileID] = {
                    value: item,
                    array: []
                }
            })
        }

        this.setState({
            claimsObj: files
        })

        setTimeout(() => {
            this.setState({isInitial : false})
        }, 500);
    }

    Subscriber(event, key) {
       
        this.setState({
            [key]: event.target.value
        });
    }
    PolicyNo(event, key) {
       
        this.setState({
            [key]: event.target.value
        });
    }
    dateofbirth(event, key) {
       
        this.setState({
            [key]: event.target.value
        });
    }
    gender(event, key) {
       
        this.setState({
            [key]: event.target.value
        });
    }
    DepartmentNo(event, key) {
       
        this.setState({
            [key]: event.target.value
        });
    }

    handleClick(fileId, subscriber, type) {
        let query = '{ SP_834FileHeaderDetails(FileID: '+'"'+fileId +'"'+', Subscriber:'+'"'+subscriber +'"'+', Type: '+type +') { FileName FileID sender receiver SubscriberNo MemberFName MemberLName Telephone StreetAddress City State PostalCode Enrollment_type dob gender InsLineCode MemberAmount EnrollmentStatus StartDate EndDate CreateDateTime relationship member_relationship_name } }'
        console.log('query : ', query)
        fetch(Urls.enrollment_details, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(r => {
                let data1 = []
                data1 = r.data.SP_834FileHeaderDetails
              
             
                let coverage_data = []
                data1.forEach(element => {
                    coverage_data.push({
                        'startDate': element.StartDate,
                        'endDate': element.EndDate
                    })
                });

                this.setState({
                    coverage_data: coverage_data
                })
            })
            .then(data => console.log('data returned:', data));

            let query1 = '{ SP_834EnrollementDetails(FileID: '+'"'+fileId +'"'+', Subscriber:'+'"'+subscriber +'") { FileName   FileID   sender   receiver   IdentificationCode   InsurerStatus   SubscriberNo   MemberFName   MemberLName   Telephone   StreetAddress   City   State   PostalCode   Enrollment_type   dob   gender   Emplymentstatus   CreateDateTime   INS_Insurer_relationship   member_relationship_name   Plan_Coverage_Level   DTP_336_Employment_BeginDT   Member_Policy_No   Department_Agency   Error_Field   N1_Plan_insurer_name } }'
        
            fetch(Urls.enrollment_details, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: query1 })
            })
                .then(res => res.json())
                .then(r => {
                    let data = []
                   data = r.data.SP_834EnrollementDetails
               
                    let file = [
                       {key : "File Name", value : data[0].FileName},
                        {key : "File Date", value : data[0].CreateDateTime},
                        {key : "Sender", value : data[0].sender}, 
                   // {key : "Receiver", value : data[0].receiver}     
                    ]
                  
                  var CheckError=  data[0].Error_Field;
                  var SubscriberNo="";           
                  if(CheckError=="Subscriber")
                  {
                    SubscriberNo= <input onChange={(e) => this.subscriber(e, 'subscriberNo')} type='text' style={{width:"80px"}}></input>
                  }else{
                    SubscriberNo= data[0].SubscriberNo
                  }
                  var Member_Policy_No="";           
                  if(CheckError=="PolicyNo")
                  {
                    Member_Policy_No= <input  onChange={(e) => this.PolicyNo(e, 'PolicyNo')} type='text' style={{width:"80px"}}></input>
                  }else{
                    Member_Policy_No= data[0].Member_Policy_No
                  }
                  var dateofbirth="";    
               
                  if(CheckError=="dob")
                  {
                    dateofbirth= <input  onChange={(e) => this.dateofbirth(e, 'dateofbirth')} type='text' style={{width:"80px"}}></input>
                  }else{
                    dateofbirth= data[0].dob
                  }

                  var gender="";    
               
                  if(CheckError=="gender")
                  {
                    gender= <input type='text' onChange={(e) => this.gender(e, 'gender')} style={{width:"80px"}}></input>
                  }else{
                    gender= data[0].gender
                  }
                  var DepartmentNo="";    
               
                  if(CheckError=="DTP336")
                  {
                    DepartmentNo= <input type='text' onChange={(e) => this.DepartmentNo(e, 'DepartmentNo')} style={{width:"80px"}}></input>
                  }else{
                    DepartmentNo= data[0].DTP_336_Employment_BeginDT
                  }
                    let memberInfo = [
                       {key : "First Name", value: data[0].MemberFName},
                        {key : "Last Name", value: data[0].MemberLName},
                        {key : "Telephone", value: data[0].Telephone},
                        {key : "Address", value: data[0].StreetAddress},
                        {key : "City", value: data[0].City},
                        {key : "State", value: data[0].State},
                        {key : "Postal Code", value: data[0].PostalCode},
                        {key : "Insurer Name", value: data[0].N1_Plan_insurer_name},
                        {key : "Dob", value: dateofbirth},
                        {key : "Gender", value: gender},                                            
                        {key : "Subscriber No",  value:SubscriberNo },
                        {key : "Department Agency", value: data[0].Department_Agency},
                        {key : "Policy No", value:Member_Policy_No},
                        {key : "Enrollment Type", value: data[0].Enrollment_type},
                        {key : "Employment Begin Date", value:DepartmentNo},
                        {key : "Insurer Status", value: data[0].InsurerStatus},
                        {key : "Relationship", value: data[0].member_relationship_name},
                        {key : "Employment Status", value: data[0].Emplymentstatus},
                   
                    
                      
                    ]
    
                    // let coverage_data = []
                    // data.forEach(element => {
                    //     coverage_data.push({
                    //         'startDate': element.StartDate,
                    //         'endDate': element.EndDate
                    //     })
                    // });
    
                    this.setState({
                        file: file,
                        // coverage_data: coverage_data,
                        memberInfo: memberInfo,
                        File_ID:fileId,
                        Error_Field:data[0].Error_Field,
                        
                    })
                })
                .then(data => console.log('data returned:', data));
    
    }

rendersearchbar()
{
    return(
        <div>
            <div className="row">
           
           <input type="text" name="name" className="input-style" placeholder="Search" />
       </div>
       <hr class="colorhr"></hr>
      
        </div>
    )
}

    renderTableHeader() {
             return (
         
            <div className="row">
                <div className="col-5 col-header justify-align" style={{fontWeight:"bold"}}>File Name <img src={require('../../components/Images/search_table.png')} style={{marginRight : '4px'}} className="SearchBarImage"></img></div>
                <div className="col-3 col-header justify-align" style={{fontWeight:"bold"}}>File Date <img src={require('../../components/Images/search_table.png')} style={{marginRight : '4px'}} className="SearchBarImage"></img></div>
                <div className="col-2 col-header justify-align" style={{fontWeight:"bold"}}>Submitter <img src={require('../../components/Images/search_table.png')} style={{marginRight : '4px'}} className="SearchBarImage"></img></div>
                <div className="col-2 col-header justify-align" style={{fontWeight:"bold"}}>File Status <img src={require('../../components/Images/search_table.png')} style={{marginRight : '4px'}} className="SearchBarImage"></img></div>
            </div>
        )
    }

    renderClaimsHeader() {
        return (
            <tr className="table-head claims-text">				
                <td className="table-head-text">Subscriber No <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
                <td className="table-head-text">Enrollment Type <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
                <td className="table-head-text list-item-style">Insurer Status <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
                <td className="table-head-text list-item-style">Status <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
                <td className="table-head-text list-item-style">Error Code<img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
            </tr>
        )
    }

    renderCoverageHeader() {
        return (
            <tr className="table-head">
              {/* <td className="table-head-text small-font">Subscriber No</td>*/} 
                <td className="table-head-text small-font">Enrollment Type <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
                <td className="table-head-text  small-font list-item-style">Plan Code <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
                <td className="table-head-text  small-font list-item-style">Coverage Start Date <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
                <td className="table-head-text  small-font list-item-style">Coverage End Date <img src={require('../../components/Images/search_table.png')} className="SearchBarImage"></img></td>
            </tr>
        )
    }

    handlePageClick(data, fileId){
        let page = data.selected + 1
        this.setState({
            page : page,
        })

        setTimeout(() => {
            this.onClick(fileId)
        }, 50);
    }

    renderList() {
        let row = []
        let col = []
        let data = this.state.claimsObj;
        console.log('this is the data ', data)
        Object.keys(data).map((keys) => {
            row.push(
                <div className="row">
                    <div className="col-5 col-style border-left"><a href={"#" + data[keys].value.FileID} 
                        onClick={() => {
                            this.onClick(data[keys].value.FileID)
                        }} style={{ color: "#6AA2B8" }} data-toggle="collapse" aria-expanded="false">{data[keys].value.FileName}</a></div>
                    <div className="col-3 col-style">{moment(data[keys].value.CreateDateTime).format('DD/MM/YYYY, ')}<br/>{moment(data[keys].value.CreateDateTime).format('hh:mm a')}</div>
                    <div className="col-2 col-style">{data[keys].value.sender}</div>
                    <div className={"col-2 col-style"}>{data[keys].value.FileStatus}</div>
                </div>
            )

            {
                col = []
                data[keys].array.forEach(item => {
                    console.log(item.Insurer_Status);
                    col.push(
                        <tr>
                          
                            <td className="list-item-style claims"><a className="clickable" style={{ color: "#6AA2B8" }} 
                                onClick={() => { 
                                    this.setState({
                                        subscriberNo: item.SubscriberNo,
                                        enrollment_type: item.Enrollment_type,
                                        Insurer_Status: item.Insurer_Status,
                                        error_status: item.Error_Field
                                        
                                    })

                                    setTimeout(() => {
                                        this.handleClick(keys, item.SubscriberNo, 2)
                                    }, 50);
                                }}>{item.SubscriberNo}</a></td>
                            <td className="list-item-style claims">{item.Enrollment_type}</td>
                            <td className="list-item-style claims">{item.Insurer_Status}</td>
                            <td className="list-item-style claims">{item.status1}</td>
                            <td className="list-item-style claims">{item.Error}</td>
                            
                        </tr>
                    )
                })
            }

            row.push(
                <div id={keys} className="collapse">
                    <table id="" className="table table-bordered claim-list">
                        {this.renderClaimsHeader()}
                        {col}
                    </table>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'page-link'}
                        initialPage={this.state.initialPage}
                        pageCount={Math.floor((data[keys].value.dcount / 10) + (data[keys].value.dcount % 10 > 0 ? 1 : 0))}
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
            </div>
        );
    }
 

    renderHeader(header) {
        return (
            <tr className="table-head">
                <td className="table-head-text">{header}</td>
            </tr>
        )
    }

    renderRows(dictionary) {
        let row = []
        let col = []
        let count = 0

        dictionary.forEach(item => {
            col.push(
                <div className="col">
                    <div className="header">{item.key}</div>
                    <div>{item.value}</div>
                </div>
            )

            if (col.length % 4 == 0) {
                row.push(<div className="row">{col}</div>)
                col = []
            }
            count++
            if (count == dictionary.length && col.length > 0) {
                row.push(<div className="row">{col}</div>)
            }
        });

        return (
            <div className="summary-style">
                {row}
            </div>
        )
    }
    renderButton() {
        if(this.state.Error_Field!="")
        {
        return (
            
            <div>
                
            <button onClick={this.Saved} style={{backgroundColor:"#139DC9" ,color:"#FFFFFF" }}>Correct & Resubmit</button>
            <button onClick={this.Ignore} style={{backgroundColor:"#139DC9" ,color:"#FFFFFF"}}>Ignore Error</button>
            </div>               
        )
        }
    }
    renderTable() {
        let row = []
        const data = this.state.coverage_data;
   console.log("testing",data);
        data.forEach((item) => {
            row.push(
                <tr>
                  {/*  <td className="claim-line-data">{this.state.subscriberNo}</td> */}
                    <td className="claim-line-data">{this.state.enrollment_type}</td>
                    <td className="claim-line-data">{this.state.Insurer_Status}</td>
                    <td className="claim-line-data">{item.startDate}</td>
                    <td className="claim-line-data">{item.endDate}</td>
                </tr>
            )
        });

        return (
            <tbody>
                {row}
            </tbody>
        )
    }

    renderSummary() {
        return (
            <div>
                {
                    this.state.file && this.state.file.length > 0 ?
                        <table className="table claim-Details border">
                            {this.renderHeader('File')}
                            {this.renderRows(this.state.file)}
                        </table> : null
                }
                {
                    this.state.memberInfo && this.state.memberInfo.length > 0 ?
                        <table className="table claim-Details border">
                            {this.renderHeader('Member Info')}
                            {this.renderRows(this.state.memberInfo)}
                            <br></br>
                            {this.renderButton()}
                            
                            </table> : null
                }
                {
                    this.state.coverage_data.length > 0 ?
                        <div>
                            <div className="table-head header-style claim-list">Coverage Data</div>
                            <table className="table-bordered body-style" style={{width: "100%"}}>
                                {this.renderCoverageHeader()}
                                {this.renderTable()}
                            </table> 
                        </div> : null
                }
            </div>
        );
    }

    render() {
        var title=""
        if(this.props.location.state.data[0].Total=="error")
        {
            title="Enrollment Errors";
        }
        else
        {
            title="Enrollment Details";
        }
        return (
          
            <div>
                
                {/* {this.rendersearchbar()} */}
        <h5 style={{ color: "var(--main-bg-color)", fontWeight: "700", marginTop: "10px", fontSize: '18px' }}>{title}</h5>
            <div className="row padding-left">
                <div className="col-6 claim-list file-table">
                    {this.state.claimsObj ? this.renderList() : null}
                </div>
                <div className="col-6">
                    {this.renderSummary()}
                </div>
                </div>
            </div>
        );
    }
}