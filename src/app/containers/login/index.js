import React from 'react';
import './style.css';
import Urls from '../../../helpers/Urls';
import '../color.css'

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            EmailId: '',
            Password: ''

        };
        this.loginUser = this.loginUser.bind(this);


    }

    loginUser() {
        let query = `{
            UserLogin(Email:"`+ this.state.EmailId +`" Password:"`+ this.state.Password +`") {
              Login, Id, DbTech, role_id
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

                console.log(res)
                if (res.data.UserLogin[0].Login == 1) {
                    this.setState({
                        loggedIn: true
                    })
                    setTimeout(() => {
                        localStorage.setItem("token", "sdjjasdnjas")
                        localStorage.setItem("UserId", res.data.UserLogin[0].Id)
                        localStorage.setItem("DbTech", res.data.UserLogin[0].DbTech)
                        localStorage.setItem("role_id", res.data.UserLogin[0].role_id)
                        this.props.handleFlag(this.state.loggedIn)
                    }, 100);

                }else if(res.data.UserLogin[0].Login == 2){
                    alert("You do not have access to this portal, please contact Administrator")
                } else {
                    alert("You have entered wrong username or password")
                }

            }).catch(err => {
                console.log(err)
            })
    }

    onHandleChange(e, key) {
        this.setState({
            [key]: e.target.value
        });
    }

    handleKeyPress = event => {
        if (event.key == 'Enter') {
          this.loginUser();
        }
      };

    render() {
        return (


            <div className="container-fluid">
                <div className="row">
                    <div className="gradient-color col-9" style={{ minHeight: '100vh', marginLeft: '-15px' }}>
                        <img src={require('../../components/Images/HiPaaS_logo.png')} alt="logo" className="Hipaas_logo" align="center" />
                        <p className="para">HiPaaS is a HIPAA compliant microservices-based Healthcare cloud platform to enable EHR integration, resolve interoperability issues, <br />
                            simplify healthcare standards and aggregate healthcare data
                        </p>
                        <a href="https://www.hipaas.com/" target="blank" className="contact"> Contact Us </a>

                    </div>
                    <div className="col-3 vartical-center" >
                       
                            <div style={{ padding: "20px" }}>
                                <span style={{ color: "var(--gray-dark-color)", fontSize: "16px" }}>Log in to <b>HiPaaS Portal </b></span>
                                <p>Enter your username and password to log into your HiPaaS Portal</p>
                            </div>
                            <div class="form-group" style={{ paddingLeft: "20px", marginTop: "-5px" }}>
                                <label className="header_login"><b>Username</b></label>
                                <input onChange={(e) => this.onHandleChange(e, 'EmailId')} name="email" type="text" className="form-control shadow-none widthText" id="Email"
                                    placeholder="Enter Username" onKeyPress={this.handleKeyPress} />
                            </div>
                            <div class="form-group" style={{ paddingLeft: "20px" }}>
                                <label className="header_login"><b>Password</b></label>
                                <input onChange={(e) => this.onHandleChange(e, 'Password')} name="password" type="password" className="form-control shadow-none widthText" id="Password"
                                    placeholder="Enter Password" onKeyPress={this.handleKeyPress} />
                            </div>
                            <div style={{ marginTop: "15px", paddingLeft: "22px" }} >
                                <a href="#" style={{ color: "var(--login-color)", fontSize: "12px" }}>Forgot your password?</a>
                            </div>
                            <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                                <button onClick={this.loginUser} class="btn btn-demo">Log in to Account</button>
                            </div>
                       
                    </div>
                </div>

            </div>

        );
    }
}