import React from 'react';
import './UserList.css';
import '../color.css'
import Urls from '../../../helpers/Urls';
const $ = window.$;

export class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNo: '',
            userRole: '',
            userRoleList: [],
            userListDisplay: [],
            disabled: false,
            UserStatus: 'Create User',
            id: 0
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
        this.clearState = this.clearState.bind(this);
        this.displayUser = this.displayUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentWillReceiveProps() {

    }

    componentDidMount() {
        this.getUserRole();
    }
    saveUser() {
        let { firstName, lastName, email, password, userRole } = this.state;
        if (!firstName || !lastName || !email || !password || !userRole) {
            alert("Please enter the fields");
        }else{

        let query = `mutation{updateuser(
            Id:`+ this.state.id + ` 
            roleid:`+ this.state.userRole + `  
            FirstName:"`+ this.state.firstName + `" 
            LastName:"`+ this.state.lastName + `" 
            Email:"`+ this.state.email + `" 
            PhoneNumber:"`+ this.state.phoneNo + `" 
            PasswordHash:"`+ this.state.password + `" 
            is_Active:`+ 1 + `
            )
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
                if (res.errors) {
                    alert(res.errors[0].message)
                } else {
                    $("#myModal2").modal("hide");
                    if (res.data.updateuser == "") {
                        alert("User Updated Successfully.")
                    } else {
                        alert(res.data.updateuser);
                    } setTimeout(() => {
                        this.getUserRole()
                    }, 50);
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
    getUserRole() {
        let query = `{
            Userrole(role_id:0) {
                Role_id
                role_description
                is_active
              }
              User(Userid:0 Email:"") {
                Id
                role_id
                FirstName
                LastName
                Email
                PhoneNumber
                PasswordHash
                is_active
                CreationDatetime
                role_description
              }
            }`
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
                    userRoleList: res.data.Userrole,
                    userListDisplay: res.data.User
                })
            }).catch(err => {
                console.log(err)
            })
    }
    getoptions() {
        let row = []
        this.state.userRoleList.forEach(element => {
            row.push(<option value={element.Role_id}>{element.role_description}</option>)
        })
        return row
    }

    onHandleChange(e, key) {

        this.setState({
            [key]: e.target.value
        });
    }

    RenderUserList() {
        let row = []
        const data = this.state.userListDisplay;
        console.log(data)
        data.forEach((d) => {
            var FullName = d.FirstName + " " + d.LastName

            row.push(
                <tr>
                    <td>{d.Email}</td>
                    <td>{d.role_description}</td>
                    <td>{FullName}</td>
                    {
                        d.is_active == "1" ?  
                    <td><img src={require('../../components/Images/pencil.png')} onClick={this.displayUser} data-value={d.Id} data-toggle="modal" data-target="#myModal2" style={{ width: '14px', marginLeft: '10px', cursor: 'pointer' }}></img></td>
                    : <td></td>
                    }
                    {d.is_active == "1" ?
                        <td><img src={require('../../components/Images/trash.png')} style={{ width: '14px', marginLeft: '10px', cursor: 'pointer' }} data-value={d.Id} onClick={this.displayUser} data-toggle="modal" data-target="#myModal" ></img></td>
                    : <td>InActive</td>
                    }
                    
                </tr>
            )
        });

        return (
            <table className="table table-bordered" id="userList" style={{ fontSize: "10px", backgroundColor: 'white' }}>
                <tr>
                    <td className="table-text">Email</td>
                    <td className="table-text">User Role</td>
                    <td className="table-text">Name</td>
                    <td className="table-text"></td>
                    <td className="table-text"></td>
                </tr>
                <tbody>
                    {row}
                </tbody>
            </table>
        );


    }
    displayUser(event) {
        // alert(event.target.dataset.value)
        let query = `{
              User(Userid:${event.target.dataset.value} Email:"") {
                Id
                role_id
                FirstName
                LastName
                Email
                PhoneNumber
                PasswordHash
              }
            }`
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
                let data = res.data.User[0]

                this.setState({
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    email: data.Email,
                    password: data.PasswordHash,
                    phoneNo: data.PhoneNumber,
                    userRole: data.role_id,
                    disabled: true,
                    UserStatus: 'Update User',
                    id: data.Id
                })
            }).catch(err => {
                console.log(err)
            })
    }
    clearState() {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNo: '',
            userRole: 0,
            disabled: false,
            UserStatus: 'Create User',
            id: 0
        })
    }

    deleteUser() {
        let query = `
            mutation{InactiveUser(
                Id:${this.state.id}
                Email:"${this.state.email}"
                is_Active:0
                )
              }
          `
        //   console.log(query)
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
                alert(res.data.InactiveUser)
                setTimeout(() => {
                    this.getUserRole()  
                }, 50);
            }).catch(err => {
                console.log(err)
            })
    }

    UserList() {

        return (
            <div>
                <div className="row">
                    <h5 className="headerText">HiPaaS User List</h5>
                    <button type="button" class="btn btn-design" data-toggle="modal" onClick={this.clearState} data-target="#myModal2">
                        Add New
                    </button>
                </div>
                <div className="row" style={{ marginTop: '30px'}}>
                    <div className="col-7" style={{padding: '0'}}>
                        {this.RenderUserList()}
                    </div>
                </div>


                <div class="modal right fade widthHandling" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="myModalLabel2" style={{ color: 'white' }}>{this.state.UserStatus}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style={{ color: 'white', marginRight: "10px" }}>&times;</span></button>

                            </div>

                            <div class="modal-body">
                                <div className="row">
                                    <div class="form-group col-6">
                                        <label for="FirstName">First Name</label>
                                        <input onChange={(e) => this.onHandleChange(e, 'firstName')} type="text" className="form-control width1" name="firstName" id="FirstName"
                                            placeholder="Enter First Name" value={this.state.firstName} />
                                    </div>
                                    <div class="form-group col-6">
                                        <label for="LastName">Last Name</label>
                                        <input onChange={(e) => this.onHandleChange(e, 'lastName')} name="lastName" type="text" className="form-control width1" id="LastName"
                                            placeholder="Enter Last Name" value={this.state.lastName} />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="Email">Email address</label>
                                    <input onChange={(e) => this.onHandleChange(e, 'email')} name="email" type="text" className="form-control width1" id="Email"
                                        disabled={(this.state.disabled) ? "disabled" : ""} placeholder="Enter email" value={this.state.email} />
                                </div>
                                <br/><br/>

                                <div class="form-group">
                                    <label for="Password">Password</label>
                                    <input onChange={(e) => this.onHandleChange(e, 'password')} name="password" type="password" className="form-control width1" id="Password"
                                        disabled={(this.state.disabled) ? "disabled" : ""} placeholder="Enter Password" value={this.state.password} />
                                </div>
                                <div class="form-group">
                                    <label for="PhoneNo">Phone No.</label>
                                    <input onChange={(e) => this.onHandleChange(e, 'phoneNo')} name="phoneNo" type="text" className="form-control width1" id="phoneno"
                                        placeholder="Enter Phone Number" value={this.state.phoneNo} />
                                </div>
                                <br/><br/>
                                <div class="form-group">
                                    <label for="UserRole">User Role</label>
                                    <select className="form-control width1" name="userRole" onChange={(e) => this.onHandleChange(e, 'userRole')} value={this.state.userRole}>
                                        <option value="0">Select User Role</option>
                                        {this.getoptions()}
                                    </select>
                                </div>

                                <button type="submit" class="btn btn-display" style={{ marginLeft: '0px' }} data-value={this.state.id} onClick={this.saveUser} >{this.state.UserStatus}</button>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-body">
                                <p>Are you sure you want to Inactivate this user!</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-display" data-dismiss="modal" onClick={this.deleteUser} >Ok</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }

    // modal(){
    //     return(

    //     )
    // }
    render() {
        return (
            <div>

                {this.UserList()}

            </div>
        );
    }
}