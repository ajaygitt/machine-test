import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './Signup.css'
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Server from '../../Server';

function Signup() {
	
	useEffect(()=>{
		let token=localStorage.getItem('jwt')
		if(token)
		{
		  history.push('/home')
		}
	  })

let history=useHistory()

const SubmitLogin=()=>{




	if(UserName.length<1||password.length<1)
	{
		alert('enter the password')
	}
	else
	{
	
		let data={
			User:UserName,
			Password:password
		}
		setUserName('')
		setPassword('')
		document.getElementById('SignupUsername').value=""
		document.getElementById('SignupPassword').value=""

	
axios.post(Server+'/signup',data).then((result)=>{

	console.log(result);
if(result.data==true)
{
	alert('success')
}
if(result.data==false)
{
	alert('username already exists')
}
})

	}
}


const LoginForm=()=>{




	if(LoginName.length<1||LoginPassword<1)
	{
		alert('enter the login info')
	}
	else
	{
		let LoginData={
			User:LoginName,
			Password:LoginPassword
		}
		setUserName('')
		setPassword('')
		document.getElementById('LoginUsername').value=""
		document.getElementById('LoginPassword').value=""

		axios.post(Server+'/Login',LoginData).then((result)=>{

			console.log("askj",result);
		if(result.data.invalidUser){
alert('user doesnt exists')
		}
		else if(result.data.passwordInvalid)
		{
			alert('incorrect password')
		}
		else
		{
localStorage.setItem('jwt',result.data.jwtToken)
localStorage.setItem('user',result.data.id)

history.push('/home')
		}
		})
	}
}



const [LoginName,setLoginUser]=useState('')
const [LoginPassword,setLoginPassword]=useState('')

	const [UserName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    return (
     
        <div>
   <div className="container-fluid">
		<div className="container">
			<h2 className="text-center" id="title">Machine Test</h2>
			 <p className="text-center">
				<small id="passwordHelpInline" className="text-muted"> Developer: AjayPradeep <a href="http://www.ajaypradeep.ga/">ajaypradeep.ga</a>.</small>
			</p>

			<div className="row">
				<div className="col-md-5">
 					<form role="form">
											
							<p className="text-uppercase pull-center"> SIGN UP FORM</p>	
 							<div className="form-group">
								<input type="text" name="SignupUsername" id="SignupUsername"  onChange={(event)=>setUserName(event.target.value)} className="form-control input-lg" placeholder="username"/>
							</div>

							
							
								<div className="form-group">
								<input type="password" name="SignupPassword" id="SignupPassword" onChange={(event)=>setPassword(event.target.value)} className="form-control input-lg" placeholder="Password2"/>
							</div>
							<div className="form-check">
								<label className="form-check-label">
								  <input type="checkbox" className="form-check-input"/>
								  By Clicking register you're agree to our policy & terms
								</label>
							  </div>
 							<div>
 									  <input  className="btn btn-lg btn-primary"  id="Register" onClick={SubmitLogin} value="Register"/>
 							</div>
				
					</form>
				</div>
				
				<div className="col-md-2">

				</div>
				
				<div className="col-md-5">
 				 		<form role="form" >
						<fieldset>							
							<p className="text-uppercase"> Login using your account: </p>	
 								
							<div className="form-group">
								<input type="email" name="LoginUsername" id="LoginUsername" className="form-control input-lg"  onChange={(event)=>setLoginUser(event.target.value)} placeholder="username"/>
							</div>
							<div className="form-group">
								<input type="password" name="LoginPassword" id="LoginPassword" className="form-control input-lg" onChange={(event)=>setLoginPassword(event.target.value)}  placeholder="Password"/>
							</div>
							<div>
								<input className="btn btn-primary" value="Sign In" onClick={LoginForm}  />
							</div>
								 
 						</fieldset>
				</form>	
				</div>
			</div>
		</div>
		<p className="text-center">
			<small id="passwordHelpInline" className="text-muted"> Developer:<a href="http://www.ajaypradeep.ga/"> Ajay Pradeep</a> </small>
		</p>
	</div>
      </div>
    
    
    );
  }
  
  export default Signup;
  