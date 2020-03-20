import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './style.css';
import Urls from '../../../helpers/Urls';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const $ = window.$;

export class MedicalMonthly_Metrics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claimsList: [],
        }
    }

    componentDidMount() {

    }

    renderStatus() {
        return (
            <div class="dashfrm-LR1 row">
                <div className="col-5">
                    <div className="col-7">
                    <div className="medium-text" style={{ fontSize: "14px" }}><b>LoadMonth</b></div><br />
                    <div className="small-text float-left time" style={{ fontSize: "12px" }}>Dec, 2016</div>
                    <hr></hr>
                   <br />
                    <div className="small-text float-left time" style={{ fontSize: "12px" }}>Jan, 2017</div>
                    <hr></hr>
                  <br />
                    <div className="small-text float-left time" style={{ fontSize: "12px" }}>Nov, 2016</div>
                    <hr></hr>

                </div></div>
               
             
                <div className="col-6 div_color" style={{ backgroundColor: '#139DC9', height:'60px', marginleft:'78px' }}>
                    <span>Plan Integration <br></br>116</span>
                    </div>
            </div>
        )
    }


    render_eligibility_header() {
        return (
          
               
             <div></div>     
             
          
        )
    }

    

    eligibility_error() {
        return (
          
            <div class="dashfrm-LR1 row">
            <div className="col-3">
                <div className="medium-text" style={{ fontSize: "12px" }}><b>PreRemediationEligibility </b></div><br />

            </div>
            <div className="col-3">
                <div className="medium-text" style={{ fontSize: "12px" }}>Eligibility Discrepancies</div><br />
                <div className="disc">78</div>

            </div>
            <div className="col-3" >
                <table className="table table-bordered eligibility-list" >
                    <tr>
                        <td style={{fontWeight:"bold"}}>
                        Dup In File
                        </td>
                        <td style={{fontWeight:"bold"}}>
                        Members
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Dup In File
                        </td>
                        <td style={{backgroundColor:"#139DC9"}}>
                       <label >35</label> 
                        </td>
                    </tr>
                </table>
            </div>
            <div className="col-3" >
                <label style={{fontWeight:"bold" , fontSize:"10px"}}>Error Details</label>
                <table className="table table-bordered eligibility-list" >
                    <tr>
                        <td style={{fontWeight:"bold"}}>
                        Error Type
                        </td>
                        <td style={{fontWeight:"bold"}}>
                        Error Description
                        </td>
                        <td style={{fontWeight:"bold"}}>
                       count
                        </td>
                    </tr>
                    
                    <tr>
                        <td style={{backgroundColor:"#daebf2"}}>
                      -
                        </td>
                        <td style={{backgroundColor:"#daebf2"}}>
                       -
                        </td>
                        <td style={{backgroundColor:"#139DC9"}}> 0</td>
                    </tr>
                </table>
            </div>
           
            <div className="col-4">
                <label className="medium-text" style={{ fontSize: "12px", fontWeight:"bold" }}>Monthly Eligibility Errors
</label>
            <table>
                    <tr>
                        <td>
                        <div>Active Delta</div>
                        </td>
                        <td>
                        <div style={{height:"20px" , width: "200px" , background: "#e66722"}}>
                    </div>
                        </td>
                        <td>
                        <div >67</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div>Term Delta
</div>
                        </td>
                        <td>
                        <div style={{height:"20px" , width: "100px" , float:"left" , background: "#e66722"}}>
                    </div>  10
                        </td>
                       
                    </tr>
                </table>
          
                 
            </div>
      
            <div className="col-6" >
            <label className="medium-text" style={{ fontSize: "12px", fontWeight:"bold" }}>RateCode Errors
</label>
                <table>
                    <tr>
                        <td>
                        <div>RateCode Delta</div>
                        </td>
                        <td>
                        <div style={{height:"20px" , width: "200px" , background: "#e66722"}}>
                    </div>
                        </td>
                        <td>
                        <div >71</div>
                        </td>
                    </tr>
                </table>
          
                 
                   
            </div>
                      
            <div className="col-6" style={{marginTop:"20px"}}>
                <label className="medium-text" style={{ fontSize: "12px", fontWeight:"bold" }}>History Eligibility Errors
</label>
            <table>
                    <tr>
                        <td>
                        <div>Active Delta</div>
                        </td>
                        <td>
                        <div style={{height:"20px" , width: "400px" , background: "grey"}}>
                    </div>
                        </td>
                        <td>
                        <div >184</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div>Hold Delta
</div>
                        </td>
                      <td>
                        <div style={{height:"20px" ,float:"left", width: "100px" , background: "grey"}}>
                    </div> <div style={{fontSize:"13px"}}>58</div>
                   
                    </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <div>Term Delta
</div>
                        </td>
                      <td>
                        <div style={{height:"25px" ,float:"left", width: "70px" , background: "grey"}}>
                    </div> <div style={{fontSize:"13px"}}>41</div>
                   
                    </td>
                        
                    </tr>
                    
                </table>
          
                 
            </div>
      
            <div className="col-6"  >

<div style={{height:"20px" , width: "290px" , background: "grey", marginTop:"40px"}}>
                    </div>
               
          
                 
                   
            </div>
            <div className="col-12" style={{marginTop:"20px"}}>
            <label className="medium-text" style={{ fontSize: "12px" , fontWeight:"bold" }}>Post Remediation</label> 
            </div>
            <div className="col-4" >
            {/* <label className="medium-text" style={{ fontSize: "12px", fontWeight:"bold" }}>Monthly Eligibility Errors
</label> */}
            <table>
                    <tr>
                        <td>
                        <div>Active Delta</div>
                        </td>
                        <td>
                        <div style={{height:"20px" , width: "200px" , background: "#e66722"}}>
                    </div>
                        </td>
                        <td>
                        <div >4</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div>Term Delta
</div>
                        </td>
                        <td>
                        <div style={{height:"20px" , width: "100px" , float:"left" , background: "#e66722"}}>
                    </div>1
                        </td>
                      
                    </tr>
                </table>
          
                 
            </div>
            <div className="col-3">
                <div className="medium-text" style={{ fontSize: "12px" }}>Eligibility Discrepancies</div><br />
                <div className="disc">5</div>

            </div>
            <div className="col-3" style={{marginTop:"20px"}}>
                <table className="table table-bordered eligibility-list" >
                    <tr>
                        <td style={{fontWeight:"bold"}}>
                        Dup In File
                        </td>
                        <td style={{fontWeight:"bold"}}>
                        Members
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Dup In File
                        </td>
                        <td style={{backgroundColor:"#139DC9"}}>
                       <label >24</label> 
                        </td>
                    </tr>
                </table>
            </div>
            <div className="col-6" style={{marginTop:"20px"}}>
                <label className="medium-text" style={{ fontSize: "12px", fontWeight:"bold" }}>History Eligibility Errors
</label>
            <table>
                    <tr>
                        <td>
                        <div>Active Delta</div>
                        </td>
                        <td>
                        <div style={{height:"20px" , width: "400px" , background: "grey"}}>
                    </div>
                        </td>
                        <td>
                        <div >63</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div>Hold Delta
</div>
                        </td>
                      <td>
                        <div style={{height:"20px" ,float:"left", width: "100px" , background: "grey"}}>
                    </div> <div style={{fontSize:"13px"}}>31</div>
                   
                    </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <div>Term Delta
</div>
                        </td>
                      <td>
                        <div style={{height:"20px" ,float:"left", width: "70px" , background: "grey"}}>
                    </div> <div style={{fontSize:"13px"}}>28</div>
                   
                    </td>
                        
                    </tr>
                    
                </table>
          
                 
            </div>
        </div>
        )
    }


    renderSearchBar() {
        return (
            <div className="row">

                <input type="text" name="name" className="input-style" placeholder="Search" />
            </div>
        )
    }

    render() {
        return (
            <div className="container-fluid">
                {/* {this.renderSearchBar()} */}
                <hr style={{color:"#139DC9"}}></hr>
                <div>
                <br></br>
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Medical Monthly Metrics</h5><br></br>
               
                </div>
               
                {this.renderStatus()}
<br></br>
              
                  
                    {this.eligibility_error()}
                 
     
            </div>
        );
    }
}