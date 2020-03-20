import React from 'react';
import './style.css';
import Urls from '../../../../helpers/Urls';
import '../../color.css';

export class Outbound_TradingPartnerConfiguration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            tradingpartner : [],
            Trading_Partner_Name:'',
            FunctionalAcknowledgmentOptions: '',
            Element_Delimiter:'',
            Doc_Envelope_Option: '',
            Segment_Termination_Character:'',
            Filter_Functional_Acknowledgments: false,
            Reject_Duplicate_ISA: false,
            Validate_Outbound_Interchanges: false,
            Outbound_Validation_Option: '',
            Authorization_Info_Qualifier: '',
            Authorization_Info_ID: '',
            Security_Information_Qualifier: '',
            Security_Information_Id: '',
            Interchange_ID_Qualifier: '',
            Interchange_ID: '',
            Interchange_Standard_ID: '',
            Interchange_Version: '',
            ISA14: false,
            Test_Indicator: '',
            Component_Separator: '',
            Application_Code: '',
            Responsible_Agency_Code: '',
            GSVersion: '',
            Communication_Type: '',
            Use_Default_Settings: false,
            Host: '',
            Port: '',
            UserName: '',
            Password: '',
        

        };
        this.onChange = this.onChange.bind(this);
        this.getoptions = this.getoptions.bind(this)
        this.getData = this.getData.bind(this)
        this.ChangeTradingPartner= this.ChangeTradingPartner.bind(this)
        this.changeCheckbox= this.changeCheckbox.bind(this)
        this.Save = this.Save.bind(this)
    }

    componentDidMount() {
        this.getData()
        this.ChangeTradingPartner()
        
    }
    handleEntailmentRequest(e) {

        window.location.reload();
    //     e.preventDefault();
    
    //    this.setState({
    //     files: [],
    //     tradingpartner : [],
    //     Change_Trading_Partner: '',
    //     FunctionalAcknowledgmentOptions: '',
    //     Element_Delimiter:'',
    //     Doc_Envelope_Option: '',
    //     Segment_Termination_Character:'',
    //     Filter_Functional_Acknowledgments: false,
    //     Reject_Duplicate_ISA: false,
    //     Validate_Outbound_Interchanges: false,
    //     Outbound_Validation_Option: '',
    //     Authorization_Info_Qualifier: '',
    //     Authorization_Info_ID: '',
    //     Security_Information_Qualifier: '',
    //     Security_Information_Id: '',
    //     Interchange_ID_Qualifier: '',
    //     Interchange_ID: '',
    //     Interchange_Standard_ID: '',
    //     Interchange_Version: '',
    //     ISA14: false,
    //     Test_Indicator: '',
    //     Component_Separator: '',
    //     Application_Code: '',
    //     Responsible_Agency_Code: '',
    //     GSVersion: '',
    //     Communication_Type: '',
    //     Use_Default_Settings: false,
    //     Host: '',
    //     Port: '',
    //     UserName: '',
    //     Password: '',

    //    })
    //    setTimeout(() => {
    //     this.getData()
    //    }, 50);
    }
    getData() {
        let query = `{
            Trading_PartnerList (Transaction:"TradingPartner" RecType:"Outbound") { 
                 
                Trading_Partner_Name 
            }
        }`
        console.log(query);
        fetch(Urls.common_data, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
        .then(res => res.json())
            .then(res => {
                 
                this.setState({
                    tradingpartner: res.data.Trading_PartnerList
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getoptions() {
        let row = []
        this.state.tradingpartner.forEach(element => {
            row.push(<option>{element.Trading_Partner_Name}</option>)
        })
        return row
    }
    ChangeTradingPartner(event){
        if(!event){
            return
        }
   
        this.setState({
            Change_Trading_Partner: event.target.options[event.target.selectedIndex].text,
            Trading_Partner_id : event.target.options[event.target.selectedIndex].value,
        })
        let query1 = '{Trading_Partner(TPName:"' + event.target.options[event.target.selectedIndex].text +`") {
            ID
            Trading_Partner_Name
            Identifier
            Functional_Ack_Options
            Doc_Envelope_Option
            Element_Delimiter
            Segment_Termination_Character
            Filter_Functional_Acknowledgments
            Reject_Duplicate_ISA
            Validate_Outbound_Interchanges
            Outbound_Validation_Option
            Authorization_Info_Qualifier
            Authorization_Info_ID
            Security_Information_Qualifier
            Security_Information_Id
            Interchange_ID_Qualifier
            Interchange_ID
            Interchange_Standard_ID
            Interchange_Version
            ISA14
            Test_Indicator
            Component_Separator
            X12
            Application_Code
            Responsible_Agency_Code
            GSVersion
            Communication_Type
            Use_Default_Settings
            Host
            Port
            UserName
            Password
            Directory
            Create_Directory
            File_Naming_Options
          }}`    
          
          console.log()
          fetch(Urls.tradingPartner, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query1 })
        })
            .then(res => res.json())
            .then(r => {
                           console.log(";fksdlfjsjfs", r.data)
                this.setState({
                    Trading_Partner_id:r.data.Trading_Partner[0].ID,
                    
                    FunctionalAcknowledgmentOptions: r.data.Trading_Partner[0].Functional_Ack_Options,
                    Doc_Envelope_Option: r.data.Trading_Partner[0]. Doc_Envelope_Option,
                    Element_Delimiter: r.data.Trading_Partner[0].Element_Delimiter,
                    Segment_Termination_Character: r.data.Trading_Partner[0].Segment_Termination_Character,
                    Filter_Functional_Acknowledgments: r.data.Trading_Partner[0].Filter_Functional_Acknowledgments,
                    Reject_Duplicate_ISA: r.data.Trading_Partner[0].Reject_Duplicate_ISA,
                    Validate_Outbound_Interchanges: r.data.Trading_Partner[0].Validate_Outbound_Interchanges,
                    Outbound_Validation_Option: r.data.Trading_Partner[0].Outbound_Validation_Option,
                    Authorization_Info_Qualifier: r.data.Trading_Partner[0].Authorization_Info_Qualifier,
                    Authorization_Info_ID: r.data.Trading_Partner[0].Authorization_Info_ID,
                    Security_Information_Qualifier: r.data.Trading_Partner[0].Security_Information_Qualifier,
                    Security_Information_Id: r.data.Trading_Partner[0].Security_Information_Id,
                    Interchange_ID_Qualifier: r.data.Trading_Partner[0].Interchange_ID_Qualifier,
                    Interchange_ID: r.data.Trading_Partner[0].Interchange_ID,
                    Interchange_Standard_ID: r.data.Trading_Partner[0].Interchange_Standard_ID,
                    Interchange_Version: r.data.Trading_Partner[0].Interchange_Version,
                    ISA14: r.data.Trading_Partner[0].ISA14,
                    Test_Indicator: r.data.Trading_Partner[0].Test_Indicator,
                    Component_Separator: r.data.Trading_Partner[0].Component_Separator,
                    Application_Code: r.data.Trading_Partner[0].Application_Code,
                    Responsible_Agency_Code: r.data.Trading_Partner[0].Responsible_Agency_Code,
                    GSVersion: r.data.Trading_Partner[0].GSVersion,
                    Communication_Type: r.data.Trading_Partner[0].Communication_Type,
                    Use_Default_Settings: r.data.Trading_Partner[0].Use_Default_Settings,
                    Host: r.data.Trading_Partner[0].Host,
                    Port: r.data.Trading_Partner[0].Port,
                    UserName: r.data.Trading_Partner[0].UserName,
                    Password: r.data.Trading_Partner[0].Password,
                })
   
            })
            .catch(err => {
                console.log(err)
            })
        // console.log(event.target.options[event.target.selectedIndex].text)
    }

    onChange(e) {
        var files = e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        console.log(filesArr);
        this.setState({ files: [...this.state.files, ...filesArr] });
    }

    // displayFile() {
    //     this.setState({selectValue:e.target.value});
    // }

    Save(){
   
        if(this.state.Trading_Partner_id == undefined){
            this.state.Trading_Partner_id = 0
        }
        if(this.state.Change_Trading_Partner!=undefined && this.state.Change_Trading_Partner!="" )
        {
          var query = 'mutation{'+
                'SP_Trading_Partner_Save(ID : '+ this.state.Trading_Partner_id +
                'Trading_Partner_Name : "'+ this.state.Change_Trading_Partner +'"'+
                'Identifier : "" '+
                'Functional_Ack_Options : "'+ this.state.FunctionalAcknowledgmentOptions +'"'+
                'Doc_Envelope_Option : "'+ this.state.Doc_Envelope_Option +'"'+
                'Element_Delimiter : "'+ this.state.Element_Delimiter +'"'+
                'Segment_Termination_Character : "'+ this.state.Segment_Termination_Character +'"'+
                'Filter_Functional_Acknowledgments : '+ this.state.Filter_Functional_Acknowledgments +' '+
                'Reject_Duplicate_ISA : '+ this.state.Reject_Duplicate_ISA +' '+
                'Validate_Outbound_Interchanges : '+ this.state.Validate_Outbound_Interchanges +' '+
                'Outbound_Validation_Option : "'+ this.state.Outbound_Validation_Option +'"'+
                'Authorization_Info_Qualifier : "'+ this.state.Authorization_Info_Qualifier +'"'+
                'Authorization_Info_ID : "'+ this.state.Authorization_Info_ID +'"'+
                'Security_Information_Qualifier : "'+ this.state.Security_Information_Qualifier +'"'+
                'Security_Information_Id : "'+ this.state.Security_Information_Id +'"'+
                'Interchange_ID_Qualifier : "'+ this.state.Interchange_ID_Qualifier +'"'+
                'Interchange_ID : "'+ this.state.Interchange_ID +'"'+
                'Interchange_Standard_ID : "'+ this.state.Interchange_Standard_ID +'"'+
                'Interchange_Version : "'+ this.state.Interchange_Version +'"'+
                'ISA14 : '+ this.state.ISA14 +' '+
                'Test_Indicator : "'+ this.state.Test_Indicator +'"'+
                'Component_Separator : "'+ this.state.Component_Separator +'"'+
                'X12 : "AAA"'+
                'Application_Code : "'+ this.state.Application_Code +'"'+
                'Responsible_Agency_Code : "'+ this.state.Responsible_Agency_Code +'"'+
                'GSVersion : "'+ this.state.GSVersion +'"'+
                'Communication_Type : "'+ this.state.Communication_Type +'"'+
                'Use_Default_Settings : '+ this.state.Use_Default_Settings +' '+
                'Host : "'+ this.state.Host +'"'+
                'Port : "'+ this.state.Port +'"'+
                'UserName : "'+ this.state.UserName +'"'+
                'Password : "'+ this.state.Password +'"'+
                'Directory : "" '+
                'RecType : "Outbound"'+
                'Create_Directory : false'+' '+
                'File_Naming_Options : "")'+
  
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
          .then(data => alert(data.data.SP_Trading_Partner_Save))

          setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    else
    {
        alert("Please Enter the Trading Partner Name");
    }

    }

    ChangeVal(event, key){
        this.setState({
            [key] : event.target.options[event.target.selectedIndex].text,
        })
    }
    onChangeName(event, key) {
        this.setState({
            [key]: event.target.value
        });
    }

    changeCheckbox(event, key){
        console.log(event.target.checked)
        this.setState({
            [key] : event.target.checked
        })
    }

    render() {
        return (
            <div>
                {
                    <div>
                        <div style={{ display: 'none' }}>
                            <div style={{ borderBottom: '1px solid lightslategrey', width: '95%', height: '28px' }}>
                                <p>Add new Client(Outbound)</p>
                            </div>
                            <div className="row">

                                <div className="form-group col-sm-3">
                                    <label className="list-header1">Name of Client</label>
                                    <select className="form-control list-header1" id="sel1">
                                        <option value="0">Select Name of Client</option>
                                        <option value="1">Name of Client1</option>
                                        <option value="2">Name of Client2</option>
                                        <option value="3">Name of Client3</option>
                                    </select>
                                </div>

                                <div className="form-group col">
                                    <span className="list-header1">Types of Transactions</span>
                                    <div className="checkbox list-header1">
                                        <label>
                                            <input type="checkbox" name="claims" value="837Inbound" /> 837Inbound
                            </label>
                                    </div>
                                    <div className="checkbox list-header1">
                                        <label>
                                            <input type="checkbox" name="claims" value="837Outbound" /> 837Outbound
                            </label>
                                    </div>
                                    <div className="checkbox list-header1">
                                        <label>
                                            <input type="checkbox" name="claims" value="834Inbound" /> 834Inbound
                            </label>
                                    </div>
                                    <div className="checkbox list-header1">
                                        <label>
                                            <input type="checkbox" name="claims" value="834Outbound" /> 834Outbound
                            </label>
                                    </div>
                                    <div className="checkbox list-header1">
                                        <label>
                                            <input type="checkbox" name="claims" value="835Inbound" /> 835Inbound
                            </label>
                                    </div>
                                    <div className="checkbox list-header1">
                                        <label>
                                            <input type="checkbox" name="claims" value="835Outbound" /> 835Outbound
                            </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                        <h5 className="headerText">Trading Partner Configuration(Outbound)</h5>
                        </div><br></br>
                        <div className="row">

                            <div className="form-group col-sm-3">
                                <label className="list-header1">Trading partner</label>
                                <select className="form-control list-header1" id="fao1" onChange={this.ChangeTradingPartner}>
                                    <option value="0">Trading partner</option>
                                    {this.getoptions()}
                                </select>
                            </div>

                            <div className="form-group col-sm-3">
                                <label className="list-header1">Trading Partner Name</label>
                                <input className="form-control list-header1" autoComplete="off" type="text" value={this.state.Change_Trading_Partner} onChange={(e) => this.onChangeName(e, 'Change_Trading_Partner')} />
                            </div>

                            <div className="form-group col-sm-1">
                            <button type="submit" className="btn light_blue btn-xs" onClick={this.Save}>Save</button>
                        </div>

                            <div className="form-group col-sm-2">
                            <button type="submit" className="btn light_blue btn-xs" onClick={this.handleEntailmentRequest.bind(this)}>Add New</button>
                        </div>
                        </div>
                        
                        <div className="container">
                            <div className="panel-group">
                                <div className="panel panel-default">
                                    <div className="panel-heading collapsible" data-toggle="collapse" href="#BasicX12Options">
                                        <span className="panel-title">
                                            Basic X12 Options
                       </span>
                                    </div>
                                    <div id="BasicX12Options"  className="panel-collapse content collapse">
                                        <div style={{display:'block'}} className="panel-body">
                                        <br/>
                                            <div className="row">

                                                <div className="form-group col-sm-3">
                                                    <label className="list-header1">Functional Acknowledgment Options</label>
                                                    <select ref="imageType" className="form-control list-header1" id="fao1" onChange={(e) => this.ChangeVal(e, 'FunctionalAcknowledgmentOptions')}>
                                                        <option value="Select Acknowledgment">Select Acknowledgment</option>
                                                        <option selected={this.state.FunctionalAcknowledgmentOptions == 'Do Not Acknowledge' ? "selected" : ''} value="Do Not Acknowledgment">Do Not Acknowledgment</option>
                                                        <option selected={this.state.FunctionalAcknowledgmentOptions == 'Acknowledge Functional Groups' ? "selected" : ''} value="Acknowledge Functional Groups"> Acknowledge Functional Groups</option>
                                                        <option selected={this.state.FunctionalAcknowledgmentOptions == 'Acknowledge Transaction Sets' ? "selected" : ''} value="Acknowledge Transaction Sets">Acknowledge Transaction Sets</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col">
                                                    <label className="list-header1">Document Envelope Option</label>
                                                    <select className="form-control list-header1" id="fao1" onChange={(e) => this.ChangeVal(e, 'Doc_Envelope_Option')}>
                                                        <option value="0">Select Document</option>
                                                        <option selected={this.state.Doc_Envelope_Option == 'Group By InterChange' ? "selected" : ''} value="Group By InterChange">Group By InterChange</option>
                                                        <option selected={this.state.Doc_Envelope_Option == 'Group By Functional Group' ? "selected" : ''} value="Group By Functional Group">Group By Functional Group</option>
                                                        <option selected={this.state.Doc_Envelope_Option == 'Group By Transaction Set' ? "selected" : ''} value="Group By Transaction Set">Group By Transaction Set</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col">
                                                    <label className="list-header1">Element Delimiter</label>
                                                    <select className="form-control list-header1" id="fao1" onChange={(e) => this.ChangeVal(e, 'Element_Delimiter')}>
                                                        <option value="0">Select Element</option>
                                                        <option selected={this.state.Element_Delimiter == 'Star Delimited' ? "selected" : ''} value="Star Delimited">Star Delimited</option>
                                                        <option selected={this.state.Element_Delimiter == 'Comma Delimited' ? "selected" : ''} value="Comma Delimited">Comma Delimited</option>
                                                        <option selected={this.state.Element_Delimiter == 'Tab Delimited' ? "selected" : ''} value="Tab Delimited">Tab Delimited</option>
                                                        <option selected={this.state.Element_Delimiter == 'Bar(|) Delimited' ? "selected" : ''} value="Bar(|) Delimited">Bar(|) Delimited</option>
                                                        <option selected={this.state.Element_Delimiter == 'Other Character' ? "selected" : ''} value="Other Character">Other Character</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col" style={{ marginRight: "27px" }}>
                                                    <label className="list-header1">Segment Termination Character</label>
                                                    <select className="form-control list-header1" id="fao1" onChange={(e) => this.ChangeVal(e, 'Segment_Termination_Character')}>
                                                        <option value="0">Select Segment</option>
                                                        <option selected={this.state.Segment_Termination_Character == 'Single Quote' ? "selected" : ''} value="Single Quote">Single Quote</option>
                                                        <option selected={this.state.Segment_Termination_Character == 'Tilde(~)' ? "selected" : ''} value="Tilde(~)">Tilde(~)</option>
                                                        <option selected={this.state.Segment_Termination_Character == 'Other Characher' ? "selected" : ''} value="Other Characher">Other Characher</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-sm-3 checkbox center">
                                                    <label className="list-header1">
                                                        Filter Functional Acknowledgments<br></br>
                                                        <input 
                                                            className="checkbox-margin" 
                                                            checked={this.state.Filter_Functional_Acknowledgments} 
                                                            onChange={(e) => {this.changeCheckbox(e, 'Filter_Functional_Acknowledgments')}} 
                                                            type="checkbox" 
                                                            name="claims"/>
                                                    </label>
                                                </div>
                                                <div className="form-group col checkbox center">
                                                    <label className="list-header1">
                                                        Reject Duplicate ISA<br></br>
                                                        <input type="checkbox" className="checkbox-margin"
                                                         checked={this.state.Reject_Duplicate_ISA == true ? "checked" : false}
                                                         onChange={(e) => {this.changeCheckbox(e, 'Reject_Duplicate_ISA')}}  name="claims" value="" />
                                                    </label>
                                                </div>
                                                <div className="form-group col checkbox center">
                                                    <label className="list-header1">
                                                        Validate Outbound Interchanges<br></br>
                                                        <input type="checkbox" checked={this.state.Validate_Outbound_Interchanges == true ? "checked" : false} 
                                                        onChange={(e) => {this.changeCheckbox(e, 'Validate_Outbound_Interchanges')}}  className="checkbox-margin" name="claims" value="" />
                                                    </label>
                                                </div>
                                                <div className="form-group col checkbox" style={{ marginRight: "27px", marginTop: "-5px" }}>
                                                    <label className="list-header1">Outbound Validation Option</label>
                                                    <select className="form-control list-header1" id="ovo1" onChange={(e) => this.ChangeVal(e, 'Outbound_Validation_Option')}>
                                                        <option selected={this.state.Outbound_Validation_Option == 'Filter Errored Documents' ? "selected" : ''} value="Filter Errored Documents">Filter Errored Documents</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="panel-heading collapsible" data-toggle="collapse" href="#ISAIdentificationOptions">
                                 <span className="panel-title">
                                            ISA Identification Options
                       </span>
                                    </div>
                                    
                                    <div id="ISAIdentificationOptions" className="panel-collapse content collapse">
                                        <div className="panel-body">
                                        <br/>
                                            <div className="row">
                                                <div className="list-header1" style={{ borderBottom: '1px solid lightslategrey', width: '95%', height: '28px', marginLeft: '30px' }}>
                                                    <p>Authorization Information (ISA01,ISA02)</p>
                                                </div>
                                                <div className="form-group col">
                                                    <label className="list-header1">Qualifier</label>
                                                    <select className="form-control list-header1" style={{ marginLeft: "10px" }} id="Qualifier" onChange={(e) => this.ChangeVal(e, 'Authorization_Info_Qualifier')}>
                                                        <option selected={this.state.Authorization_Info_Qualifier == '00-No Authorization Information Present' ? "selected" : ''} value="00-No Authorization Information Present">00-No Authorization Information Present</option>
                                                        <option selected={this.state.Authorization_Info_Qualifier == '01-UCS Communication ID' ? "selected" : ''} value="01-UCS Communication ID">01-UCS Communication ID</option>
                                                        <option selected={this.state.Authorization_Info_Qualifier == '02-EDXCommunication ID' ? "selected" : ''} value="02-EDXCommunication ID">02-EDXCommunication ID</option>
                                                        <option selected={this.state.Authorization_Info_Qualifier == '03-Additional Data Information' ? "selected" : ''} value="03-Additional Data Information">03-Additional Data Information</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col-sm-3" style={{ marginRight: "500px" }}>
                                                    <label>
                                                        ID
                                                   </label>
                                                    <input type="text" className="list-header1 form-control" value={ this.state.Authorization_Info_ID == null ? '' : this.state.Authorization_Info_ID } onChange={(e) => this.onChangeName(e, 'Authorization_Info_ID')} />
                                                </div>

                                                <div className="list-header1" style={{ borderBottom: '1px solid lightslategrey', width: '95%', height: '28px', marginLeft: "30px" }}>
                                                    <p>Security Information (ISA03,ISA04)</p>
                                                </div>
                                                <div className="form-group col">
                                                    <label className="list-header1">Qualifier</label>
                                                    <select className="form-control list-header1" style={{ marginLeft: "10px" }} id="qualifier" onChange={(e) => this.ChangeVal(e, 'Security_Information_Qualifier')}>
                                                        <option selected={this.state.Security_Information_Qualifier == '00-No Security Information Present' ? "selected" : ''} value="00-No Security Information Present"> 00-No Security Information Present</option>
                                                        <option selected={this.state.Security_Information_Qualifier == '01-Password' ? "selected" : ''} value="01-Password"> 01-Password</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col-sm-3" style={{ marginRight: "500px" }}>
                                                    <label>
                                                        ID
                            </label>
                                                    <input type="text" className="list-header1 form-control" value={ this.state.Security_Information_Id == null ? '' : this.state.Security_Information_Id} onChange={(e) => this.onChangeName(e, 'Security_Information_Id')} />
                                                </div>

                                                <div className="list-header1" style={{ borderBottom: '1px solid lightslategrey', width: '95%', height: '28px', marginLeft: "30px" }}>
                                                    <p>Interchange ID (ISA05/07,ISA06/08)</p>
                                                </div>
                                                <div className="form-group col">
                                                    <label className="list-header1">Qualifier</label>
                                                    <select className="form-control list-header1" style={{ marginLeft: "10px" }} id="Qualifier" onChange={(e) => this.ChangeVal(e, 'Interchange_ID_Qualifier')}>
                                                        <option selected={this.state.Interchange_ID_Qualifier == '01-Duns' ? "selected" : ''} value="01-Duns"> 01-Duns</option>
                                                        <option selected={this.state.Interchange_ID_Qualifier == '02-SCAC' ? "selected" : ''} value="02-SCAC"> 02-SCAC</option>
                                                        <option selected={this.state.Interchange_ID_Qualifier == '03-FMC' ? "selected" : ''} value="03-FMC"> 03-FMC</option>
                                                        <option selected={this.state.Interchange_ID_Qualifier == '04-IATA' ? "selected" : ''} value="04-IATA"> 04-IATA</option>
                                                        <option selected={this.state.Interchange_ID_Qualifier == '30-US Federal Tax ID Number' ? "selected" : ''} value="30-US Federal Tax ID Number"> 30-US Federal Tax ID Number</option>
                                                        <option selected={this.state.Interchange_ID_Qualifier == 'ZZ-Mutually Defined' ? "selected" : ''} value="ZZ-Mutually Defined"> ZZ-Mutually Defined</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col-sm-3" style={{ marginRight: "500px" }}>
                                                    <label>
                                                        ID
                            </label>
                                                    <input type="text" className="list-header1 form-control" value={this.state.Interchange_ID} onChange={(e) => this.onChangeName(e, 'Interchange_ID')} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-heading collapsible" data-toggle="collapse" href="#ISAVersion_ControlOptions">
                                        <span className="panel-title">
                                            ISA Version/Control Options
                       </span>
                                    </div>
                                    <div id="ISAVersion_ControlOptions" className="panel-collapse content collapse">
                                        <div className="panel-body">
                                            <br/>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <label className="list-header1">
                                                        Interchange Standard ID (ISA11)
                            </label>
                                                    <input type="text" className="form-control list-header1" value={ this.state.Interchange_Standard_ID }  onChange={(e) => this.onChangeName(e, 'Interchange_Standard_ID')} />
                                                </div>

                                                <div className="form-group col">
                                                    <label className="list-header1">
                                                        Interchange Version (ISA12)
                            </label>
                                                    <input type="text" className="form-control list-header1" value={ this.state.Interchange_Version } onChange={(e) => this.onChangeName(e, 'Interchange_Version')} />
                                                </div>

                                                <div className="form-group col-sm-3 checkbox center" style= {{marginTop: "4px"}}>
                                                    <label className="list-header1">
                                                        Interchange Ack. Requested (ISA14)<br></br>
                                                        <input type="checkbox" className="checkbox-margin list-header1" 
                                                        checked={this.state.ISA14 == true ? "checked" : ''} 
                                                        onChange={(e) => {this.changeCheckbox(e, 'ISA14')}} name="claims" value="" />
                                                    </label>
                                                </div>

                                                <div className="form-group col" style={{ marginRight: "30px" }}>
                                                    <label className="list-header1">Test Indicator (ISA15)</label>
                                                    <select className="form-control list-header1" id="testIndicator" onChange={(e) => this.ChangeVal(e, 'Test_Indicator')}>
                                                        <option selected={this.state.Test_Indicator == 'P-Production' ? "selected" : ''} value="P-Production">P-Production</option>
                                                        <option selected={this.state.Test_Indicator == 'T-Test' ? "selected" : ''} value="T-Test">T-Test</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-sm-3">
                                                    <label className="list-header1">
                                                        Component Separator (ISA16)
                            </label>
                                                    <input type="text" className="form-control list-header1" value={ this.state.Component_Separator } onChange={(e) => this.onChangeName(e, 'Component_Separator')} />
                                                </div>
                                                { /*<div className="form-group">
                                                    <select className="form-control list-header1" id="x12select">
                                                        <option value="0"> Select an X12</option>
                                                        <option value="1">837I</option>
                                                        <option value="2">270/271</option>
                                                        <option value="3">276/277</option>
                                                        <option value="4">835</option>
                                                        <option value="5">837P</option>
                                                        <option value="6">837D</option>
                                                    </select>
                                </div>  */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-heading collapsible" data-toggle="collapse" href="#GSVersion_ControlOptions">
                                        <span className="panel-title">
                                            GS Version/Control Options
                       </span>
                                    </div>
                                    <div id="GSVersion_ControlOptions" className="panel-collapse content collapse">
                                        <div className="panel-body">
                                        <br/>
                                            <div className="row">
                                                <div className="form-group col">
                                                    <label className="list-header1">
                                                        Application Code (GS02/03)
                            </label>
                                                    <input type="text" className="form-control list-header1" value={ this.state.Application_Code } onChange={(e) => this.onChangeName(e, 'Application_Code')} />
                                                </div>
                                                <div className="form-group col">
                                                    <label className="list-header1">Responsible Agency Code (GS07)</label>
                                                    <select className="form-control list-header1" id="testIndicator" onChange={(e) => this.ChangeVal(e, 'Responsible_Agency_Code')}>
                                                        <option>Select</option>
                                                        <option selected={this.state.Responsible_Agency_Code == 'T-Transportation Data Coordinating Committee' ? "selected" : ''} value="T-Transportation Data Coordinating Committee">T-Transportation Data Coordinating Committee</option>
                                                        <option selected={this.state.Responsible_Agency_Code == 'X-Accredited Standards Commitess' ? "selected" : ''} value="X-Accredited Standards Commitess">X-Accredited Standards Commitess</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col" style={{ marginRight: "20px" }}>
                                                    <label className="list-header1">
                                                        GS Version (GS08)
                            </label>
                                                    <input type="text" className="form-control list-header1" value={ this.state.GSVersion } onChange={(e) => this.onChangeName(e, 'GSVersion')} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="panel-heading collapsible" data-toggle="collapse" href="#CommunicationMethods">
                                        <span className="panel-title">
                                            Communication Methods
                       </span>
                                    </div>
                                    <div id="CommunicationMethods" className="panel-collapse collapse content">
                                        <div className="panel-body">
                                        <br/>
                                            <div className="row">
                                                <div className="form-group col" style={{display:"none"}}>
                                                    <label className="list-header1">Communication Type</label>
                                                    <select className="form-control list-header1" id="testIndicator" onChange={(e) => this.ChangeVal(e, 'Communication_Type')}>
                                                        <option value="0">Select Communication</option>
                                                        <option selected={this.state.Communication_Type == "SFTP" ? "selected" : ''} value="SFTP">SFTP</option>
                                                        <option selected={this.state.Communication_Type == "Disk" ? "selected" : ''} value="Disk">Disk</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-sm-3" style={{marginTop: "4px"}}>
                                                    <label className="list-header1">
                                                        Use Default Settings<br></br>
                                                        <input type="checkbox" checked={this.state.Use_Default_Settings == true ? "checked" : ''} 
                                                        onChange={(e) => {this.changeCheckbox(e, 'Use_Default_Settings')}}
                                                        className="checkbox-margin" name="defaultSettings" value="" style={{marginLeft:"50px"}} />
                                                    </label>
                                                </div>
                                                <div className="form-group col-sm-3">
                                                    <label className="list-header1">
                                                        Host
                            </label>
                                                    <input type="text"  className="form-control list-header1" value={ this.state.Host } onChange={(e) => this.onChangeName(e, 'Host')} />
                                                </div>

                                                <div className="form-group col-sm-3" style={{ marginRight: "20px" }}>
                                                    <label className="list-header1">
                                                        Port
                            </label>
                                                    <input type="text" className="form-control list-header1" value={ this.state.Port } onChange={(e) => this.onChangeName(e, 'Port')} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-sm-3">
                                                    <label className="list-header1">
                                                        User Name
                            </label>
                                                    <input type="text" className="form-control list-header1" value={ this.state.UserName } onChange={(e) => this.onChangeName(e, 'UserName')} />
                                                </div>
                                                <div className="form-group col-sm-3">
                                                    <label className="list-header1">
                                                        Password
                            </label>
                                                    <input type="password" className="form-control list-header1" value={ this.state.Password } onChange={(e) => this.onChangeName(e, 'Password')} />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="panel-heading collapsible" data-toggle="collapse" href="#CompanionGuide">
                                        <span className="panel-title">
                                            837 Companion Guide
                                        </span>
                                    </div>
                                    <div id="CompanionGuide" className="panel-collapse collapse content">
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="form-group col-sm-3">
                                                    <label className="list-header1">Companion Guide</label>
                                                    <select className="form-control list-header1" id="CompanionGuide">
                                                        <option value="0">Select Companion</option>
                                                        <option value="1">Medicare Companion Guide</option>
                                                        <option value="2">Medicaid Companion Guide</option>
                                                    </select>
                                                </div>
                                                {this.state.files.map(x =>
                                                            <div className="file-preview list-header1" style={{marginTop:'35px'}} onClick={this.displayFile.bind()}>Selected File name: {x.name}</div>
                                                        )}
                                                <div className="form-group col">
                                                    <button type="submit" className="btn light_blue" style={{ marginLeft: '60px', marginTop: '18px' }}>Upload</button>
                                                    <label className="btn light_blue" style={{ marginLeft: '60px', marginTop: '27px' }}>Add New
                                                    <input type="file" name="filename" onChange={this.onChange} style={{ display: "none" }} /> 
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}