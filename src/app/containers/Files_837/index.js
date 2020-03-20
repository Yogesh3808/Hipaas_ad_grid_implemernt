import React from 'react';
import '../Files/files-styles.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Urls from '../../../helpers/Urls';
import { getDetails } from '../../../helpers/getDetails';

export class Files_837 extends React.Component {

    constructor(props) {
        super(props);
        console.log('hello these are the props', props)
        let flag 
      flag = props.location.state.data[0].flag;
      
        if(flag == 'accept'){
            flag = 'Accepted Claims'
        } else if(flag == 'reject'){
            flag = 'Rejected Claims'
        } else {
            flag = 'Other'
        }
  
        this.state = {
            intakeClaims: [],
            page: 1,
            initialPage: 0,
            lineData: [],
            file: [],
            showDetails: false,
            memberInfo: {},
            subscriberNo : '',
            selectedTradingPartner:props.location.state.data[0] &&props.location.state.data[0].selectedTradingPartner != 'n'?props.location.state.data[0].selectedTradingPartner : '',
            enrollment_type : '',
            plan_code : '',
            startDate:props.location.state.data[0] &&props.location.state.data[0].startDate != 'n' ?props.location.state.data[0].startDate : '',
            endDate:props.location.state.data[0] &&props.location.state.data[0].endDate != 'n' ?props.location.state.data[0].endDate : '',
            flag: flag,
            coverage_data: [],
            tradingpartner: [],
            ICDCode: '',
            ClaimExt: '',
            SelectFileID: '',
            AccidentDate: '',
            Icdcode: [],
            checkError: '',
            selectedICdCode:'',
        }

        this.getData = this.getData.bind(this)
        this.getClaimData = this.getClaimData.bind(this)
        this.renderList = this.renderList.bind(this)
        this.sortData = this.sortData.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
        this.Saved = this.Saved.bind(this)
        this.getICDCode = this.getICDCode.bind(this)
        this.ChangeVal = this.ChangeVal.bind(this)
        this.ClaimExtNm = this.ClaimExtNm.bind(this)
    }

    componentDidMount() {
      
        this.getData()
        this.getTradingData()
        this.getICDCode()  
    }

    getTradingData(){
        getDetails("Claim837")
        .then((tradingpartner) => {
            if(tradingpartner && tradingpartner.length > 0){
                this.setState({
                    tradingpartner: tradingpartner
                })
            }
        }).catch(error => {
            console.log(error)
        })

        this.getData();
    }

    
    ClaimExtNm(event, key) {
    
        this.setState({
            ClaimExt: event.target.value
            
        });
    }
    ChangeVal(event, key){
        this.state.selectedICdCode=  event.target.options[event.target.selectedIndex].text;
   
     }
    getData() {
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : ''
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : ''

        let query = '{ ClaimSubCountDataFileSummary(submitter:"'+this.state.selectedTradingPartner+'",fromDt:"'+startDate+'",ToDt:"'+endDate+'") { FileID FileName FileDate FSubmitter_N103 FReceiver_N103 FExtraField2 BillingProviderLastName BillingProviderFirstName CreateDateTime CountData } }'
        if(this.state.flag == 'Accepted Claims'){
            query = '{ ClaimAccCountDataFileSummary(submitter:"'+this.state.selectedTradingPartner+'",fromDt:"'+startDate+'",ToDt:"'+endDate+'") { FileID FileName FileDate FSubmitter_N103 FReceiver_N103 FExtraField2 BillingProviderLastName BillingProviderFirstName CreateDateTime CountData } }'
        } else if (this.state.flag == 'Rejected Claims'){
            query = '{ ClaimRejCountDataFileSummary(submitter:"'+this.state.selectedTradingPartner+'",fromDt:"'+startDate+'",ToDt:"'+endDate+'") { FileID FileName FileDate FSubmitter_N103 FReceiver_N103 FExtraField2 BillingProviderLastName BillingProviderFirstName CreateDateTime CountData } }'
        }

        console.log(query)

        fetch(Urls.claim_details, {
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
                
                if(this.state.flag == 'Accepted Claims'){
                    data = r.data.ClaimAccCountDataFileSummary
                } else if (this.state.flag == 'Rejected Claims'){
                    data = r.data.ClaimRejCountDataFileSummary
                } else {
                    data = r.data.ClaimSubCountDataFileSummary
                }
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
    getICDCode() {
        let query = `{
            ClaimsICDCODE {
                SeqId
                ICD_CODE
                Year
                ExtraField1
              }
          }
          `


        fetch(Urls.claim_details, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(r => {

                this.setState({
                    Icdcode:"",
                    Icdcode: r.data.ClaimsICDCODE
                })

            })
            .then(data => console.log('data returned:', data));
    }
    onClick(fileId){
        let query = "{ IntakeClaimDatatblwithFile(page:"+this.state.page+", fileId:"+fileId+") { SeqID FileID TransactionID FileName FileDate BatchID TransmissionID ClaimExtNmbr ClaimID ClaimTMTrackingID PaytoPlanInfo Billing_Provider_ID SecondaryBilling_ID Subscriber_ID ExtSubscriber_ID Member_ID Member_Account_Number Member_Last_Name Member_First_Name MemberMI Member_DOB DiagnosisCodes Claim_Amount PatientPaid NetBalance Adjust InsuranceBalance VAN_Trace_Number COB_Claim_Number ClaimStatus ClaimCode OtherID ClaimSupplimentalInfo ContractInformation PatientDueAmmount ExternalCorrelationToken LineCount ExtraField1 ExtraField2 ExtraField3 ExtraField4 ExtraField5 ExtraField6 ExtraField7 ExtraField8 ExtraField9 CreatedBy CreateDateTime Created_Date HL_ID_BillingProvider HL_Level_BillingProvider PRV_Billing01 PRV_Billing02 PRV_Billing03 NM101_BillingProviderId BillingProviderLastName BillingProviderFirstName NM108_BillingProvider NM109_BillingProvider BillingProviderAddress BillingProviderCity_State_Zip BillingProvider_TaxId BillingProvider_PER01 BillingProvider_PER02 BillingProvider_PER03 BillingProvider_PER04 NM101_PayToProvider PayToProviderLastName PayToProviderFirstName NM108_PayToProvider NM109_PayToProvider PayToProviderAddress PayToProviderCity_State_Zip PayToProvider_TaxId PayToProvider_PER01 PayToProvider_PER02 PayToProvider_PER03 PayToProvider_PER04 HL_ID_Subscriber HL_Level_Subscriber SBR01 SBR02 SBR03 SBR09 SubscriberLastName SubscriberFirstName SubscriberDOB NM108_Subscriber NM109_Subscriber SubscriberAddress SubscriberCity_State_Zip SubscriberSecondaryIdentification CasualityClaimNumber PayerLastName PayerFirstName NM108_Payer NM109_Payer PayerAddress PayerCity_State_Zip PayerSecondaryId BillingProviderSecondaryId HL_ID_Patient HL_Level_Patient PatientLastName PatientFirstName NM108_Patient NM109_Patient PatientAddress PatientCity_State_Zip PatientDOB CLM01 CLM02 CLM05_01 CLM05_02 CLM05_03 StatementBegin StatementEnd DischargeHour AdmissionDate RepricerReceivevDate ErrorCode ErrorDesc Field1 ClaimLevelErrors Field3 Field4 NM109_2330 CLM_11 ClaimLevelICDErrorFlag ClaimLevelCLMErrorFlag HI01 adjudication_status FSubmitter_N103 FReceiver_N103 FExtraField2 } }"
        if(this.state.flag == 'Accepted Claims'){
            query = "{ ClaimAccCountData(page:"+this.state.page+", fileId:"+fileId+") { SeqID FileID TransactionID FileName FileDate BatchID TransmissionID ClaimExtNmbr ClaimID ClaimTMTrackingID PaytoPlanInfo Billing_Provider_ID SecondaryBilling_ID Subscriber_ID ExtSubscriber_ID Member_ID Member_Account_Number Member_Last_Name Member_First_Name MemberMI Member_DOB DiagnosisCodes Claim_Amount PatientPaid NetBalance Adjust InsuranceBalance VAN_Trace_Number COB_Claim_Number ClaimStatus ClaimCode OtherID ClaimSupplimentalInfo ContractInformation PatientDueAmmount ExternalCorrelationToken LineCount ExtraField1 ExtraField2 ExtraField3 ExtraField4 ExtraField5 ExtraField6 ExtraField7 ExtraField8 ExtraField9 CreatedBy CreateDateTime Created_Date HL_ID_BillingProvider HL_Level_BillingProvider PRV_Billing01 PRV_Billing02 PRV_Billing03 NM101_BillingProviderId BillingProviderLastName BillingProviderFirstName NM108_BillingProvider NM109_BillingProvider BillingProviderAddress BillingProviderCity_State_Zip BillingProvider_TaxId BillingProvider_PER01 BillingProvider_PER02 BillingProvider_PER03 BillingProvider_PER04 NM101_PayToProvider PayToProviderLastName PayToProviderFirstName NM108_PayToProvider NM109_PayToProvider PayToProviderAddress PayToProviderCity_State_Zip PayToProvider_TaxId PayToProvider_PER01 PayToProvider_PER02 PayToProvider_PER03 PayToProvider_PER04 HL_ID_Subscriber HL_Level_Subscriber SBR01 SBR02 SBR03 SBR09 SubscriberLastName SubscriberFirstName SubscriberDOB NM108_Subscriber NM109_Subscriber SubscriberAddress SubscriberCity_State_Zip SubscriberSecondaryIdentification CasualityClaimNumber PayerLastName PayerFirstName NM108_Payer NM109_Payer PayerAddress PayerCity_State_Zip PayerSecondaryId BillingProviderSecondaryId HL_ID_Patient HL_Level_Patient PatientLastName PatientFirstName NM108_Patient NM109_Patient PatientAddress PatientCity_State_Zip PatientDOB CLM01 CLM02 CLM05_01 CLM05_02 CLM05_03 StatementBegin StatementEnd DischargeHour AdmissionDate RepricerReceivevDate ErrorCode ErrorDesc Field1 ClaimLevelErrors Field3 Field4 NM109_2330 CLM_11 ClaimLevelICDErrorFlag ClaimLevelCLMErrorFlag HI01 adjudication_status FSubmitter_N103 FReceiver_N103 FExtraField2 } }"
        } else if(this.state.flag == 'Rejected Claims'){
            query = "{ ClaimRejCountData(page:"+this.state.page+", fileId:"+fileId+") { SeqID FileID TransactionID FileName FileDate BatchID TransmissionID ClaimExtNmbr ClaimID ClaimTMTrackingID PaytoPlanInfo Billing_Provider_ID SecondaryBilling_ID Subscriber_ID ExtSubscriber_ID Member_ID Member_Account_Number Member_Last_Name Member_First_Name MemberMI Member_DOB DiagnosisCodes Claim_Amount PatientPaid NetBalance Adjust InsuranceBalance VAN_Trace_Number COB_Claim_Number ClaimStatus ClaimCode OtherID ClaimSupplimentalInfo ContractInformation PatientDueAmmount ExternalCorrelationToken LineCount ExtraField1 ExtraField2 ExtraField3 ExtraField4 ExtraField5 ExtraField6 ExtraField7 ExtraField8 ExtraField9 CreatedBy CreateDateTime Created_Date HL_ID_BillingProvider HL_Level_BillingProvider PRV_Billing01 PRV_Billing02 PRV_Billing03 NM101_BillingProviderId BillingProviderLastName BillingProviderFirstName NM108_BillingProvider NM109_BillingProvider BillingProviderAddress BillingProviderCity_State_Zip BillingProvider_TaxId BillingProvider_PER01 BillingProvider_PER02 BillingProvider_PER03 BillingProvider_PER04 NM101_PayToProvider PayToProviderLastName PayToProviderFirstName NM108_PayToProvider NM109_PayToProvider PayToProviderAddress PayToProviderCity_State_Zip PayToProvider_TaxId PayToProvider_PER01 PayToProvider_PER02 PayToProvider_PER03 PayToProvider_PER04 HL_ID_Subscriber HL_Level_Subscriber SBR01 SBR02 SBR03 SBR09 SubscriberLastName SubscriberFirstName SubscriberDOB NM108_Subscriber NM109_Subscriber SubscriberAddress SubscriberCity_State_Zip SubscriberSecondaryIdentification CasualityClaimNumber PayerLastName PayerFirstName NM108_Payer NM109_Payer PayerAddress PayerCity_State_Zip PayerSecondaryId BillingProviderSecondaryId HL_ID_Patient HL_Level_Patient PatientLastName PatientFirstName NM108_Patient NM109_Patient PatientAddress PatientCity_State_Zip PatientDOB CLM01 CLM02 CLM05_01 CLM05_02 CLM05_03 StatementBegin StatementEnd DischargeHour AdmissionDate RepricerReceivevDate ErrorCode ErrorDesc Field1 ClaimLevelErrors Field3 Field4 NM109_2330 CLM_11 ClaimLevelICDErrorFlag ClaimLevelCLMErrorFlag HI01 adjudication_status FSubmitter_N103 FReceiver_N103 FExtraField2 } }"
        }
        console.log("Query : " + query)
        fetch(Urls.claim_details, {
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
                if(this.state.flag == 'Accepted Claims'){
                    data = r.data.ClaimAccCountData
                } else if(this.state.flag == 'Rejected Claims'){
                    data = r.data.ClaimRejCountData
                } else {
                    data = r.data.IntakeClaimDatatblwithFile
                }
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
    }

    handleStartChange(date) {
        this.setState({
            showDetails: false,
            startDate: date
        });
        setTimeout(() => {
            this.getData()
        }, 50);
    };

    handleEndChange(date) {
        this.setState({
            showDetails: false,
            endDate: date
        });
        setTimeout(() => {
            this.getData()
        }, 50);
    }

    getFileData(fileId){
        let startDate = this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : ''
        let endDate = this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : ''

        let query = '{ FileInTake(fileId:'+fileId+', submitter:"'+this.state.selectedTradingPartner+'",fromDt:"'+startDate+'",ToDt:"'+endDate+'") { FileName, FileDate, Submitter_N103, Receiver_N103, Created_Date, FileID } }'
        fetch(Urls.claims_837, {
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
                data = r.data.FileInTake[0]

                let file = [
                    {key : "File Name", value : data.FileName},
                    {key : "File Date", value : moment(data.FileDate).format('MM/DD/YYYY hh:mm A')},
                    {key : "Sender", value : data.Submitter_N103},
                    {key : "Receiver", value : data.Receiver_N103},
                    {key : "Created Date", value : data.Created_Date},
                ]

                this.setState({
                    fileId: data.FileID,
                    file: file
                })
            })
            .then(data => console.log('data returned:', data));

    }
    getClaimTableData(fileId, claimId) {
       
        this.getICDCode();
        let query = '{ IntakeClaimData(fileId: ' + fileId + ', ClaimID: ' + '"' + claimId + '"' + ') { ClaimTMTrackingID SubscriberFirstName SubscriberLastName AdmissionDate Claim_Amount BillingProviderFirstName BillingProviderLastName BillingProviderAddress BillingProviderCity_State_Zip ClaimStatus DiagnosisCodes SeqID ClaimID ClaimLevelErrors  ClaimExtNmbr} }'
        console.log(query);
        fetch(Urls.claim_details, {
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
                data = r.data.IntakeClaimData[0]
                this.state.ICDCode = "";
                this.state.ICDCode = data.ClaimLevelErrors;
                var Accidentnm = '';
                var date = '';
                var IcdCode = '';
                this.checkError = data.ClaimLevelErrors;
                if (data.ClaimLevelErrors == "Accident Date Not Present") {
                    Accidentnm = "Accident Date";
                    date = <input onChange={(e) => this.ClaimExtNm(e)} type='text' style={{ width: "80px" }}></input>
                }
                else {
                    Accidentnm = "Accident Date";
                    date = data.ClaimExtNmbr;
                }
                if (data.ClaimLevelErrors == "ICD Code not found") {
                    
                    IcdCode = <select id="fao1"  onChange={(e) => this.ChangeVal(e)}>
                        <option value="0" >Select ICD Code</option>
                        {this.getIcdcodeoptions()}
                    </select>
                }
                else {
                    IcdCode = data.DiagnosisCodes;
                }
                this.state.SelectFileID = data.SeqID;
            
                let claimsDetails = [
                    { key: 'Claim HiPaaS Id', value: data.ClaimTMTrackingID },
                    { key: 'SubscriberFirstName', value: data.SubscriberFirstName },
                    { key: 'SubscriberLastName', value: data.SubscriberLastName },
                    { key: 'AdmissionDate', value: data.AdmissionDate },
                    { key: 'Claim_Amount', value: data.Claim_Amount },
                    { key: 'BillingProvider', value: (data.BillingProviderFirstName ? data.BillingProviderFirstName : '') + ' ' + (data.BillingProviderLastName ? data.BillingProviderLastName : '') },
                    { key: 'BillingProviderAddress', value: (data.BillingProviderAddress ? data.BillingProviderAddress : '') + ' ' + (data.BillingProviderCity_State_Zip ? data.BillingProviderCity_State_Zip : '') },
                    { key: 'ClaimStatus', value: data.ClaimStatus },
                    { key: 'ICD Code', value: IcdCode },
                    { key: Accidentnm, value: date },
                ]

                this.setState({
                    claimId: data.ClaimID,
                    claimsDetails: claimsDetails
                })
            })
            .then(data => console.log('data returned:', data));
    }
    getIcdcodeoptions() {
        let row = []
        this.state.Icdcode.forEach(element => {
             
            row.push(<option value="">{element.ICD_CODE}</option>)
        })
        return row
    }
    handleClick(fileId, subscriber, type) {
        let query = '{ IntakeClaimLineDataFileIDClaimID(FileID: '+'"'+fileId +'"'+', ClaimID:'+'"'+subscriber +'"'+') { SeqID FileID TransactionID FileName FileDate BatchID TransmissionID ClaimExtNmbr ClaimID ClaimTMTrackingID Subscriber_ID Member_ID ExtSubscriber_ID ICD9ICD10 ProcNo DiagnosisXRef DiagnosisCodes PatientWeight Units UnitMeasure Proc_Amount PatientPaid NetBalance Adjust InsuranceBalance DateofService DateofServiceEnd LineStatus OtherID ExternalCorrelationToken AmbulanceInfo XRayInfo TransportInfo ExtraField1 ExtraField2 ExtraField3 ExtraField4 ExtraField5 ExtraField6 ExtraField7 ExtraField8 ExtraField9 CreatedBy CreateDateTime Created_Date HCP01_PricingMethodology HCP02_Amount HCP03 HCP04 HCP05_Rate HCP06 HCP07 HCP08 HCP12_Quantity HCP13 HCP14 HCP15_ExceptionCode AttendingProviderNameLastOrOrganizationName AttendingProviderNameFirst NM108_AttendingProvider NM109_AttendingProvider AttendingProviderCode AttendingProvider_PRV02 AttendingProvider_PRV03 AttendingProvider_REF01 AttendingProvider_REF02 OperatingPhysicianNameLastOrOrganizationName OperatingPhysicianNameFirst NM108_OperatingPhysician NM109_OperatingPhysician OperatingPhysician_REF01 OperatingPhysician_REF02 OtherOperatingPhysicianNameLastOrOrganizationName OtherOperatingPhysicianNameFirst NM108_OtherOperatingPhysician NM109_OtherOperatingPhysician OtherOperatingPhysician_REF01 OtherOperatingPhysician_REF02 RenderingPhysicianNameLastOrOrganizationName RenderingPhysicianNameFirst NM108_RenderingPhysician NM109_RenderingPhysician RenderingPhysician_REF01 RenderingPhysician_REF02 ServiceFacilityLocationName ServiceFacilityLocation_NM102 ServiceFacilityLocation_NM108 ServiceFacilityLocation_NM109 ServiceFacilityLocationAddress ServiceFacilityLocation_City_State_Zip ServiceFacilityLocation_REF01 ServiceFacilityLocation_REF02 ReferringProviderNameLastOrOrganizationName ReferringProviderNameFirst NM108_ReferringProvider NM109_ReferringProvider ReferringProvider_REF01 ReferringProvider_REF02 SBR01_PayerResponsibilityCode SBR02 SBR03 SBR04 SBR09 CAS01_ClaimAdjustMentGroupCode CAS02 CAS03 CAS04 CAS05 CAS06 CAS07 CAS08 CAS09 CAS10 CAS11 CAS12 CAS13 CAS14 CAS15 CAS16 CAS17 CAS18 CAS19 AMT01_PayerPaidAmmount AMT02_Amount AMT01_RemainingPatientLiability AMT02_RPAmount AMT01_NonCoveredChargeAmmount AMT02_NCAmount OtherInsuranceCoverage_OI03 OtherInsuranceCoverage_OI06 MIA01 MIA02 MIA03 MIA04 MIA05 MIA06 MIA07 MIA08 MIA09 MIA10 MOA01 MOA02 MOA03 MOA04 MOA05 MOA06 MOA07 MOA08 MOA09 MOA10 OtherSubscriberNameLastOrOrganizationName OtherSubscriberNameFirst OtherSubscriber_NM102 NM108_OtherSubscriber NM109_OtherSubscriber OtherSubscriberAddress OtherSubscriberCityStateZip OtherSubscriber_REF01 OtherSubscriber_RF02 OtherPayerNameLastOrOrganizationName OtherPayerNameFirst OtherPayer_NM102 NM108_OtherPayer NM109_OtherPayer OtherPayerAddress OtherPayerCityStateZip ClaimCheckOrRemittanceDate LX SV201 SV202 SV202_1 SV202_2 SV202_3 SV202_4 SV202_5 SV202_6 SV202_7 SV203 SV204 SV205 SV207 LinSupplimentalInfo_PWK01 PWK02 PWK05 ServiceDate LIN02_DrugIdentification LIN03 CTP04_DrugQuantity CTP05 CTP05_1 SVD01 SVD02 SVD03 SVD03_1 SVD03_2 SVD03_3 SVD05 LineCheckOrRemittanceDate RemainingPatientLiability ErrorCode ClaimLineLevelErrors Field1 Field2 Field3 Field4 adjustment type_of_adjustment RemainigAmt } }'
        fetch(Urls.claim_details, {
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
                let coverage_data = []
                data = r.data.IntakeClaimLineDataFileIDClaimID
                data.forEach(element => {
                    coverage_data.push({
                        'ClaimID': element.ClaimID,
                        'LX' : element.LX,
                        'SVD02' : element.SVD02,
                        'ServiceDate' : element.ServiceDate,
                        'SVD03' : element.SVD03,
                        'SVD05' : element.SVD05
                    })
                });

                this.setState({
                    showDetails: true,
                    coverage_data: coverage_data
                })
            })
            .then(data => console.log('data returned:', data));
    }

    renderTableHeader() {
        return (
            <div className="row">
                <div className="col-4 col-header">File Name</div>
                <div className="col-2 col-header">File Date</div>
                <div className="col-3 col-header">File Status</div>
                <div className="col-3 col-header">Submitter</div>
                {/* <div className="col-2 col-header">Status</div> */}
            </div>
        )
    }

    renderClaimsHeader() {
        return (
            <tr className="table-head claims-text">
                <td className="table-head-text">Claim ID</td>
                <td className="table-head-text">Claim Status</td>
                <td className="table-head-text list-item-style">Current State</td>
                <td className="table-head-text list-item-style">Claim Amount</td>
                <td className="table-head-text list-item-style">Error Code</td>
            </tr>
        )
    }

    renderCoverageHeader() {
        return (
            <tr className="table-head">
                <td className="table-head-text small-font">Claim ID</td>
                <td className="table-head-text small-font">Service Line Count</td>
                <td className="table-head-text  small-font list-item-style">Provider Paid Amount</td>
                <td className="table-head-text  small-font list-item-style">Service Date</td>
                <td className="table-head-text  small-font list-item-style">Procedure Date</td>
                <td className="table-head-text  small-font list-item-style">Paid Service Unit Count</td>
            </tr>
        )
    }

    handlePageClick(data, fileId){
        let page = data.selected + 1
        this.setState({
            page : page
        })

        setTimeout(() => {
            this.onClick(fileId)
        }, 50);
    }

    renderList() {
        let row = []
        let col = []
        let data = this.state.claimsObj;
        let count = 0
        try {
            count = data[Object.keys(data)[0]].value.CountData / 10
            if(data[Object.keys(data)[0]].value.dcount % 10 > 0){
                count = count + 1
            }
        } catch (error) {
            
        }

        Object.keys(data).map((keys) => {
            row.push(
                <div className="row">
                    <div className="col-4 col-style"><a href={"#" + data[keys].value.FileID} onClick={() => {this.onClick(data[keys].value.FileID)}} style={{ color: "#6AA2B8" }} data-toggle="collapse" aria-expanded="false">{data[keys].value.FileName}</a></div>
                    <div className="col-2 col-style">{moment(data[keys].value.FileDate).format('MM/DD/YYYY')}<br />{moment(data[keys].value.FileDate).format('h:m a')}</div>
                    <div className="col-3 col-style">{data[keys].value.FExtraField2}</div>
                    <div className="col-3 col-style">{data[keys].value.FSubmitter_N103}</div>
                </div>
            )

            {
                col = []
                data[keys].array.forEach(item => {
                    col.push(
                        <tr>
                            <td className="list-item-style"><a style={{ color: "#6AA2B8" }} 
                                onClick={() => { 
                                    this.setState({
                                        submitter: item.FSubmitter_N103,
                                        receiver: item.FReceiver_N103,
                                    })

                                    setTimeout(() => {
                                        this.handleClick(keys, item.ClaimID, 2)
                                        this.getClaimTableData(keys, item.ClaimID, 2)
                                        this.getFileData(keys)
                                    }, 50);
                                }}>{item.ClaimID}</a></td>
                            <td className="list-item-style ">{item.ClaimStatus}</td>
                            <td className="list-item-style ">{item.adjudication_status}</td>
                            <td className="list-item-style ">{item.Claim_Amount}</td>
                            <td className="list-item-style ">{item.ClaimLevelErrors}</td>
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
                        pageCount={count}
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

    renderTable() {
        let row = []
        const data = this.state.coverage_data;

        data.forEach((item) => {
            row.push(
                <tr>
                    <td className="claim-line-data">{item.ClaimID}</td>
                    <td className="claim-line-data">{item.LX}</td>
                    <td className="claim-line-data">{item.SVD02}</td>
                    <td className="claim-line-data">{item.ServiceDate}</td>
                    <td className="claim-line-data">{item.SVD03}</td>
                    <td className="claim-line-data">{item.SVD05}</td>
                </tr>
            )
        });

        return (
            <tbody>
                {row}
            </tbody>
        )
    }
    renderButton() {
        if (this.state.ICDCode != null) {
            return (

                <div>

                    <button onClick={this.Saved} style={{ backgroundColor: "#139DC9", color: "#FFFFFF", marginLeft: "20px" }}>Save</button>

                </div>
            )
        }

    }

    Saved() {
   
      
        if (this.checkError == "Accident Date Not Present") {
            if(this.state.ClaimExt!="")
            {
            var query = 'mutation{ updateAccidentDate(SeqID :' + this.state.SelectFileID + ' ' + 'AccidentDate :"' + this.state.ClaimExt + '"' +
                ')' +
                '}'
            console.log(query);
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
                    alert(data.data.updateAccidentDate),
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)

                );
            }

        }
        else if (this.checkError == "ICD Code not found") {
          if(this.state.selectedICdCode!="")
          {
            var query = 'mutation{ updateICDCode(SeqID :' + this.state.SelectFileID + ' ' + 'ICDCode :"' + this.state.selectedICdCode + '"' +
                ')' +
                '}'
            console.log(query);
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
                    alert(data.data.updateICDCode),
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)

                );

        }
    }

    }
    renderSummary() {
        return (
            <div>
                {
                    this.state.file && this.state.file.length > 0 ?
                        <table className="table claim-Details">
                            {this.renderHeader('File #' + this.state.fileId)}
                            {this.renderRows(this.state.file)}
                        </table> : null
                }
                {
                    this.state.claimsDetails ?
                        <table className="table claim-Details">
                            {this.renderHeader('Claim #'+ this.state.claimId)}
                            {this.renderRows(this.state.claimsDetails)}
                            <br></br>
                            {this.renderButton()}
                        </table> : null
                }
                {
                    this.state.coverage_data.length > 0 ?
                        <div>
                            <div className="table-head header-style claim-list">Claim Line Data</div>
                            <table className="table-bordered body-style">
                                {this.renderCoverageHeader()}
                                {this.renderTable()}
                             
                            </table> 
                        </div> : null
                }
            </div>
        );
    }

    getoptions(){
        let row = []
        this.state.tradingpartner.forEach(element => {
            row.push(<option selected={this.state.selectedTradingPartner == element.Trading_Partner_Name ? 'selected' : ''} value="">{element.Trading_Partner_Name}</option>)
        })
        return row
    }

    onSelect(event, key){
        if(event.target.options[event.target.selectedIndex].text == 'Provider Name' || event.target.options[event.target.selectedIndex].text == 'Submitter'){
            this.setState({
                showDetails: false,
                [key] : ''
            })
        } else {
            this.setState({
                showDetails: false,
                [key] : event.target.options[event.target.selectedIndex].text
            })
        }

        setTimeout(() => {
            this.getData()
        }, 50);
    }

    renderTopbar(){
        return(
            <div className="row">
                <div className="form-group col-2">
                    <div className="list-header-dashboard">State</div>
                    <select className="form-control list-header-dashboard" id="state">
                        <option value="">State</option>
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

                <div className="form-group col-2">
                    <div className="list-header-dashboard">Trading partner </div>
                    <select className="form-control list-header-dashboard" id="TradingPartner"
                        onChange={(event) => {
                            this.onSelect(event, 'selectedTradingPartner')
                        }}>
                        <option value="select">Trading partner</option>
                        {this.getoptions()}
                    </select>
                </div>
                <div className="form-group col-2">
                    <div className="list-header-dashboard">Provider Name</div>
                    <select className="form-control list-header-dashboard" id="option">
                        <option value="">Provider Name</option>
                        <option selected="selected" value="1">Provider Name 1</option>
                        <option value="2">Provider Name 2</option>
                    </select>
                </div>
                <div className="form-group col-2">
                    <div className="list-header-dashboard">Start Date</div>
                    <DatePicker className="datepicker form-control list-header-dashboard"
                        selected={this.state.startDate ? new Date(moment(this.state.startDate).format('YYYY-MM-DD')) : ''}
                        onChange={this.handleStartChange}
                    />
                </div>
                <div className="form-group col-2">
                    <div className="list-header-dashboard">End Date</div>
                    <DatePicker className="datepicker form-control list-header-dashboard"
                        selected={this.state.endDate ? new Date(moment(this.state.endDate).format('YYYY-MM-DD')) : ''}
                        onChange={this.handleEndChange}
                    />
                </div>
            </div>
        )
    }

    renderSearch(){
        return(
            <div className="row">
                <input type="text" name="name" className="input-style" placeholder="Search"/>
            </div>
        )
    }
    render() {
        return (
            <div>
                <br></br>
                {this.renderTopbar()}
                <div className="row padding-left">
                    <div className="col-6 claim-list file-table">
                        {this.state.claimsObj ? this.renderList() : null}
                    </div>
                    <div className="col-6">
                        {this.state.showDetails ? this.renderSummary() : null}
                    </div>
                </div>
            </div>
        );
    }
}