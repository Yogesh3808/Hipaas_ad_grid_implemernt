import React from 'react';
import './styles.css';


import { Pie, Bar } from 'react-chartjs-2';
const data = {
	labels: [
	
	],
	datasets: [{
		data: [310,50],
		backgroundColor: [
		'#139DC9',
        '#83D2B4',
        '#DA4322'
		],
		hoverBackgroundColor: [
		'#139DC9',
        '#83D2B4',
        '#DA4322'
		]
    }],
    flag:''
};

const pieErrorData = {
    labels: [
      
    ],
    datasets: [{
        data: [56, 16, 11, 7, 4 ,2],
        backgroundColor: [
            '#1342c9',
            '#139DC9',
            '#83D2B4',
            '#9dc913',
            '#ec6236',
            '#c9139d',
        ],
        hoverBackgroundColor: [
            '#1342c9',
            '#139DC9',
            '#83D2B4',
            '#9dc913',
            '#ec6236',
            '#c9139d',
        ]
    }],
    flag: ''
}



export class Outbound_dashboard extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
   
        }

      
    }

    componentWillReceiveProps(){
      
    }

    componentDidMount(){
      
    }

 
    renderPieChart() {
        return (
            <div >
                <div className="col-12">
                    <Pie data={pieErrorData}
                        options={{
                            elements: {
                                arc: {
                                    borderWidth: 0
                                }
                            },
                            tooltips: {
                                enabled: false
                            },
                            pieceLabel: {
                                render: 'label',
                                position: 'outside'
                            },
                            responsive: true,
                            legend: {
                                position: 'bottom',
                                display: 'false'
                            },
                            animation: {
                                animateScale: true,
                                animateRotate: true
                            }
                        }}
                        width={100}
                        height={100} />
                </div>
            </div>
        )
    }
    renderSearchBar(){
        return(
            <div>
            <div className="row">
           
           <input type="text" name="name" className="input-style" placeholder="Search" />
       </div>
       <hr style={{color:"#139DC9"}}></hr>
      
        </div>
        )
    }
    rendermaindiv(){
        return(
            <div>
           <div style={{width: "240px",  float:"left" , height:"60px" , color: "white" , background:"#43cc4c" , marginleft:"30px"}}>
            <label style={{fontSize:"10px"}}>    All MC Eligibility to Beacon <br></br> 156.14K</label>
           </div>
   
           <div style={{width: "240px",  float:"right" , height:"60px" , color: "white" , background:"#1c8c39" , marginleft:"50px"}}>
           <label style={{fontSize:"10px"}}>  All MC Eligibility to VSP <br></br> 156.14K </label>
           </div>
         
           <div style={{width: "240px",  float:"left" , height:"60px" , marginTop:"3px" , color: "white" , background:"#5578ad" , marginleft:"30px"}}>
           <label style={{fontSize:"10px"}}>  All MC Eligibility to perRxMCStatus <br></br> 156.14K </label>
           </div>
           <div style={{width: "240px",  float:"right" , height:"60px" ,  marginTop:"3px" ,color: "white" , background:"#5578ad" , marginleft:"50px"}}>
           <label style={{fontSize:"10px"}}>  All Part D Eligibility to perRxMMStatus<br></br> 156.14K </label>
           </div>
           <div style={{width: "240px",  float:"left" , height:"60px" ,  marginTop:"3px" , color: "white" , background:"#f5c507" , marginleft:"30px"}}>
           <label style={{fontSize:"10px"}}>Outbound Errors
 <br></br> 156.14K </label>
           </div>
           <div style={{width: "240px",  float:"right" , height:"60px" ,  marginTop:"3px",  color: "black" , background:"#ddedeb" , marginleft:"50px"}}>
           <label style={{fontSize:"10px"}}>   To DPH & CPG <br></br> 156.14K </label>
           </div>

        </div>
        )
    }

    renderCharts() {
        return (
            <div >
                <div className="col-8 barchartcss">
                    <Pie data={data}
                        options={{
                            elements: {
                                arc: {
                                    borderWidth: 0
                                }
                            },
                            tooltips: {
                                enabled: false
                            },
                            pieceLabel: {
                                render: 'label',
                                position: 'outside'
                            },
                            responsive: true,
                            legend: {
                                position: 'bottom',
                                display: 'false'
                            },
                            animation: {
                                animateScale: true,
                                animateRotate: true
                            }
                        }}
                        width={100}
                        height={70} />
                </div>
                <div className="col-5 barchartcss">
                      <div class="column">
                         
                      </div>
                </div>
            </div>
        )
    }

    rendertable(){
        return(
            <div>
            <table className="table table-bordered enrollment-list">
                <tr className="table-head">
                    <td className="table-header-text">Error</td>
                    <td className="table-header-text">SFHPID</td>
                    <td className="table-header-text">CIN</td>
                    <td className="table-header-text">Inbound X12 Status</td>
                    <td className="table-header-text">Qnxt Status</td>
                    <td className="table-header-text">Outbound Status	</td>
                    <td className="table-header-text">PlanIntegration Status</td>
                    <td className="table-header-text">PlanIntegration Desc</td>
                </tr>   
                <tr>
                    <td></td>
                    <td>123456783424</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                
                </tr>
                <tr>
                    <td></td>
                    <td>1234567842</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456786456</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>12345678656</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456786464</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>12345678646</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>1234567864565</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456786456</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>1234567865645</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>12345678456</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456785665</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456782321</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456782312</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456783232</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>123456783232</td>
                    <td>1231376HIPAAS</td>
                    <td>Dup In File</td>
                    <td></td>
                    <td>No Outbound</td>
                    <td></td>
                    <td></td>
                </tr>
             
            </table>

        </div>
        )
    }
    render() {
        return (
            <div>
                {/* {this.renderSearchBar()} */}
                <br></br>
                <h5 style={{ color: '#139DC9',fontsize: "20px" }}>Outbound Dashboard</h5><br></br>
                {/* <label style={{ color: '#139DC9' }}><b>Outbound Dashboard</b></label> */}
                <div className="row" >
                                <div className="col-2">
                                  <label  style={{fontSize:"15px"}}>Eligibility Status</label>
                                  <br></br>
                                  <span style={{fontSize:"12px"}}>Active</span>
                              <hr></hr>
                         
                                  <span style={{fontSize:"12px"}}>Dup In File</span>
                              <hr></hr>
                           
                                  <span style={{fontSize:"12px"}}>Hold No Eligibility Data</span>
                              <hr></hr>
                          
                                  <span style={{fontSize:"12px"}}>Other Health Plan(not 307)</span>
                              <hr></hr>
                           
                                  <span style={{fontSize:"12px"}}>Term</span>
                              <hr></hr>
                                </div>
                                <div className="col-3" >
                                {this.renderPieChart()}

                                </div>
                                <div className="col-6" >
                             {this.rendermaindiv()}

                                </div>
                                <br>
                                </br>
                                <div  className="col-12">
                                    {this.rendertable()}
                                </div>
                            </div>
            </div>
        );
    }
}