import React from 'react';
import './style.css';
import Urls from '../../../helpers/Urls';
import '../color.css'

export class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword:'',
            newPassword:'',
            confirmNewPassword:''

        };
        this.updatePassword = this.updatePassword.bind(this);


    }

    updatePassword(){
        let userId = localStorage.getItem("UserId")
        let query = `mutation{
            ChangePassword(Id:`+userId+` OldPassword:"`+this.state.oldPassword+`" NewPassword:"`+this.state.newPassword+`" ForgotOrNot:0)
          }`
          console.log(query)
            fetch(Urls.base_url , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: query })
            })
                .then(res => res.json())
                .then(res => {
                    alert(res.data.ChangePassword);
                    window.location.reload()
                }).catch(err => {
                    console.log(err)
                })
    }

    onHandleChange(e, key){
        this.setState ({
            [key]: e.target.value
        });
    }

    render() {
        return (


            <div className="container-fluid" style={{marginTop: "-10px"}}>
                <div class="row" >
                    <div class=" col-8 linear_gradient" style={{ backgroundColor: 'var(--main-bg-color)', height: "615px"}}>
                    <img src={require('../../components/Images/HiPaaS_logo.png')} alt="logo" className="Hipaas_logo" align="center" />
                       

                    </div>

                    <div class=" col-4" >
                        <div style={{ paddingTop: "150px" }}>
                            <h5 className="headerText">Change Password</h5>
                        </div>
                        <div class="form-group" style={{marginTop:"20px"}}>
                            <label>Old Password</label>
                                <input onChange={(e) => this.onHandleChange(e, 'oldPassword')} name="OldPassword" type="password" className="form-control textInput" id="OldPassword"
                                        placeholder="Enter Old Password" value={this.state.oldPassword} />
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                                <input onChange={(e) => this.onHandleChange(e, 'newPassword')} name="password" type="password" className="form-control textInput" id="Password"
                                        placeholder="Enter New Password" value={this.state.newPassword} />
                        </div>
                        <div class="form-group">
                            <label>Confirm New Password</label>
                                <input onChange={(e) => this.onHandleChange(e, 'confirmNewPassword')} name="password1" type="password" className="form-control textInput" id="Password1"
                                        placeholder="Confirm New Password" value={this.state.confirmNewPassword} />
                        </div>
                        
                        <div class="form-group" style={{ marginTop: "15px" }}>
                            <button style={{ marginLeft: "20px",marginTop:"10px", backgroundColor: 'var(--button-login-color)' }} onClick={this.updatePassword} class="btn btn-display">Update Password</button>
                        </div>
                       
                    </div>
            
                    </div>

            </div>

        );
    }
}