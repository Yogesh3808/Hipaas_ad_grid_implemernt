import React from 'react';
import './style.css';
import '../color.css'
import moment from 'moment';
import Urls from '../../../helpers/Urls';

export class MenuCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customList: [],
            apiflag: this.props.apiflag,
            userrole: [],
            fileId: '',
            UpdateCheckBox: '',
            checked: [],
            unchecked: [],
            Menucheckall: '',
            isChecked: '',
            menuType: "I",
            userroleID: ""
        }

        this.showFile = this.showFile.bind(this)
        this.Update = this.Update.bind(this)
        this.ChangeVal = this.ChangeVal.bind(this)
        this.ChangeFunAccess = this.ChangeFunAccess.bind(this)
        this.ChangeMenuAcces = this.ChangeMenuAcces.bind(this)
        this.RenderUserRoleList = this.RenderUserRoleList.bind(this)
        this.AddUserRole = this.AddUserRole.bind(this)
    }

    componentWillReceiveProps() {
        this.setState({
            apiflag: this.props.apiflag,

        })

    }

    componentDidMount() {

        this.getData()
        this.getbinduser()
    }
    AddUserRole() {
        var query = `mutation{
         updateuserrole(roleid: 0 role_description:"`+ this.state.userRoleName + `" is_Active:0 ) {
           Role_id
           role_description
           is_active
         }
       }`
       console.log('Query ', query)
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
                alert("User Role Saved Successfully");
                let userrole = this.state.userrole
                userrole.push(res.data.updateuserrole[0])
                console.log(userrole)
                this.setState({
                    userrole: [...userrole],
                    userRoleName: ''
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    onHandleChange(e, key) {

        this.setState({
            [key]: e.target.value
        });
    }

    getData() {
        this.setState({
            customList: [],
            UserAccess: [],
            Menucheckall: '',

        })

        let query = '{UserwiseMenu (role_id:' + this.state.userroleID + ` menutype:"${this.state.menuType}" For:"A") {
            role_id
            menu_id
            menu_description
            sequence_id
            parent_node
            menuflag
            usermenuflag
            is_editor      
            is_editable
          }}`
        console.log(query)
        fetch(Urls.users, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(res => {
                let array = []
                let summary = []
                let data = res.data.UserwiseMenu
                let iterator = data
                console.log(res.data);
                iterator.forEach(item => {
                    array.push({
                        loopid: item.menu_description,
                        parent_node: item.parent_node,
                        menu_id: item.menu_id,
                        isChecked: item.usermenuflag,
                        isAccessValue: item.is_editor,
                        is_editable: item.is_editable


                    })
                })

                this.setState({
                    customList: array,



                })
            })
            .catch(err => {
                console.log(err)
            })



    }

    getbinduser() {

        let query = `{
      
            Userrole(role_id:0){
                Role_id
                role_description
                is_active
            }
           
        }`
        console.log('Query ', query)
        fetch(Urls.users, {
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
                    userrole: res.data.Userrole,

                })

            })
            .catch(err => {
                console.log(err)
            })

    }
    getoptions() {
        let row = []

        this.state.userrole.forEach(element => {
            row.push(<option value={element.Role_id}>{element.role_description}</option>)
        })
        return row
    }
    renderSearchBar() {
        return (
            <div className="row">
                <input type="text" name="name" className="input-style" placeholder="Search" />
            </div>
        )
    }

    renderTableHeader() {
        return (
            <tr className="table-head">
                <td className="table-text">Menu List</td>

                   <td className="table-text"><div className="row" style={{marginLeft: '5px'}}><div>View Access </div>

                <input style={{ marginLeft: "10px", alignSelf: 'center', marginTop: '3px'}} type="checkbox" onChange={this.ChangeMenuAcces}></input>
                </div></td>
                <td className="table-text"><div className="row" style={{marginLeft: '5px'}}><div>Edit Functionality </div>
                <input style={{ marginLeft: "10px", alignSelf: 'center', marginTop: '3px' }} type="checkbox" onChange={this.ChangeFunAccess}></input>
                </div></td>


            </tr>
        )
    }


    ChangeFunAccess(event) {

        const data = this.state.customList;
        let checkboxValue = event.target.checked;
        if (checkboxValue == true) {

            data.forEach((d) => {
                if(d.is_editable == true){
                    d.isAccessValue = true
                }
                

            })
            console.log(data);
            this.setState({
                customList: data,
            })
        }
        else {
            data.forEach((d) => {
                d.isAccessValue = false

            })
            console.log(data);
            this.setState({
                customList: data,
            })
        }
    }

    ChangeMenuAcces(event) {
        const data = this.state.customList;
        let checkboxValue = event.target.checked;
        if (checkboxValue == true) {

            data.forEach((d) => {
                d.isChecked = true

            })
            console.log(data);
            this.setState({
                customList: data,
            })
        }
        else {
            data.forEach((d) => {
                d.isChecked = false

            })
            console.log(data);
            this.setState({
                customList: data,
            })
        }
    }
    renderList() {
        let row = []
        const data = this.state.customList;
        console.log(data);
        data.forEach((d) => {
            var roletype = d.parent_node;
            var menuID = d.menu_id;
            var isDisabled = "";
            if(d.is_editable == false){
                isDisabled = "disabled";
                d.isAccessValue = false
            }
            if(d.isChecked == "0"){
                d.isChecked = false
            }
            if(d.isAccessValue == "0"){
                d.isAccessValue = false
            }
           console.log(d.isAccessValue)
            row.push(

                <tr>

                    <td style={{ fontWeight: roletype=="0" ? "bold" : "" }}>

                        {d.loopid}
                    </td>

                    <td className="list-item-style"><input checked={d.isChecked} type="checkbox" onChange={(e) => {
                       d.isChecked = e.target.checked
                       let parent = d.parent_node
                       let menuId = d.menu_id
                       let data2 = [...data]
                       let count=0;
                       // alert(parent)true
                       data2.forEach((item) => {
                            
                            if(item.parent_node == parent || item.menu_id == parent){
                               // if(item.parent_node==1)
                               // {
                                                              
                               //        count++;
                               //        alert(count);
                                                                     
                               // }
                               
                               if(item.menu_id == parent){ 
                                   if(item.isChecked == false) 
                                   {
                                       item.isChecked = true 
                                   } 
                                   // if(item.isChecked == false){
                                   //     item.isChecked = true 
                                   // }  
                                  
                               }
                              

                           }
                           else if(menuId == item.parent_node){
                               item.isChecked = e.target.checked
                           }
  
                       })
                        this.setState({
                            customList: [...data]
                        })
                    }} /></td>
                    <td className="list-item-style">{d.is_editable == false ? '' : <input checked={d.isAccessValue} type="checkbox" onChange={(e) => {
                        d.isAccessValue = e.target.checked
                        d.isChecked = e.target.checked
                        this.setState({
                            customList: [...data]
                        })
        }} />}</td>


                </tr>

            )



        });

        return (
            <div>



                <table className="table table-bordered" id="userList" align="center" style={{ width: '100%' }}>
                    {this.state.customList && this.state.customList.length > 0 ? this.renderTableHeader() : null}
                    <tbody>
                        {row}
                    </tbody>
                </table>
            </div>


        );
    }

    changeCheckbox(event, key) {
        let checkboxValue = event.target.checked;
        if (checkboxValue == true) {
            this.state.checked.push(event.target.value)
        } else {
            this.state.unchecked.push(event.target.value)
        }
        this.setState({
            checkedCheckbox: this.state.checked,
            uncheckCheckbox: this.state.unchecked
        })
        console.log(this.state.checkedCheckbox)
    }
    showFile(name) {
        this.setState({
            showFile: true,
            flag: name
        })
    }

    ChangeVal(event, key) {
        this.setState({
            [key]: event.target.value
        });

        setTimeout(() => {
            this.getData();
        }, 50);

    }


    Update() {
        if (this.state.userroleID != 0) {
            let data = this.state.customList
            let true_val = ''
            let false_val = ''
            let str1 = ''
            let str2 = ''
            data.forEach(element => {
                if (element.isChecked) {
                    true_val = true_val + element.menu_id + ','
                    str1 = true_val.replace(/,(?=\s*$)/, '');

                } else {
                    false_val = false_val + element.menu_id + ','
                    str2 = false_val.replace(/,(?=\s*$)/, '');
                }
            });
            let access_Val = ''
            let falseaccess_Val = ''
            let access_Val_str1 = ''
            let falseaccess_Val_str2 = ''
            data.forEach(element => {
                if (element.isAccessValue) {
                    access_Val = access_Val + element.menu_id + ','
                    access_Val_str1 = access_Val.replace(/,(?=\s*$)/, '');

                } else {
                    falseaccess_Val = falseaccess_Val + element.menu_id + ','
                    falseaccess_Val_str2 = falseaccess_Val.replace(/,(?=\s*$)/, '');
                }
            });

            var query = 'mutation{ updateuserwisemenu(roleid : ' + this.state.userroleID+ ' ' +
                'uncheck :"' + str2 + '"' +
                'check :"' + str1 + '"' +
                'unchkeditor :"' + falseaccess_Val_str2 + '"' +
                'chkeditor :"' + access_Val_str1 + '"' +
                ')' +
                '}'
                console.log('Query ', query)
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
                .then(data =>{
                    alert(data.data.updateuserwisemenu)
                    setTimeout(() => {
                        window.location.reload()
                    }, 100);
                } )
                
        }
        else {
            alert("Please Select User Role")
        }


    }

    RenderUserRoleList() {
        let row = []
        const data = this.state.userrole;
        data.forEach((d) => {
            row.push(
                <tr>
                    <td>{d.role_description}</td>
                    <td><img src={require('../../components/Images/trash.png')} style={{ width: '20px' }}></img></td>
                </tr>
            )
        });
        return (
            <table className="table table-bordered" id="userList" style={{ fontSize: "11px" }}>
                <tr>
                    <th style={{ width: "85%" }}>User Role List</th>
                    <th></th>
                </tr>
                <tbody>
                    {row}
                </tbody>
            </table>
        );


    }





    renderTopbar() {
        return (
            
            <div className="row" style={{padding: '0'}}>
                <div className="form-group col-3">
                    <div className="list-header-dashboard">Select User Role</div>
                    <select className="form-control list-header-dashboard" id="state" onChange={(e) => this.ChangeVal(e, 'userroleID')}>
                        <option value="0">Select User Role</option>
                        {this.getoptions()}
                    </select>
                </div>
                <div className="form-group col-3" >
                    <div className="list-header-dashboard">Select Menu Type</div>
                    <select className="form-control list-header-dashboard" id="state" onChange={(e) => this.ChangeVal(e, 'menuType')}>
                        <option value="I" selected>Inbound</option>
                        <option value="O">Outbound</option>
                        <option value="B">Both</option>
                    </select>
                </div>

                <div className="form-group col-sm-1">
                    <button type="submit" className="btn btn-display" onClick={this.Update}>Save</button>
                </div>
                <div className="form-group col-sm-2">
                    <button type="button" class="btn btn-display" data-toggle="modal" data-target="#myModal"
                        onClick={this.RenderUserRoleList}
                    >
                        Add User Role
                    </button>
                </div>

                <div class="modal right fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content" style={{paddingRight: "25px"}}>
                            <div class="modal-header">
                                <h5 class="modal-title" id="myModalLabel2" style={{ color: 'white' }}>User Role</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style={{ color: 'white', marginRight: "20px" }}>&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div class="form-group col-6">
                                        <label for="FirstName">User Role</label>
                                        <input onChange={(e) => this.onHandleChange(e, 'userRoleName')} type="text" className="form-control width1" name="userRoleName" id="userRoleName"
                                            placeholder="Enter User Role Name" value={this.state.userRoleName} />
                                    </div>
                                    <div class="form-group col-6">
                                        <button type="submit" class="btn btn-display" style={{ marginTop: "20px" }} onClick={this.AddUserRole} >Save User Role</button>
                                    </div>
                                </div>

                                {this.RenderUserRoleList()}




                            </div>
                        </div>
                    </div>
                </div>



            </div>
           
        )
    }

    render() {
        return (
            <div>
                <div>
                    <h5 className="headerText">User Role Management</h5>
                </div>
                
                {

                    <div>
                        <p style={{ color: 'var(--main-bg-color)', fontWeight: 'bold' }}></p>
                        {this.renderTopbar()}
                        <div className="row">
                            <div className="col-7">
                                {this.renderList()}
                            </div>

                        </div>
                    </div>
                }
            </div>
        );
    }
}