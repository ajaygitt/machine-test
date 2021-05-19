
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,ButtonToolbar,Button,FormControl,Navbar,Dropdown,Table,Form} from 'react-bootstrap'
import './Home.css'
import Header from '../Header/Header'
import { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios'
import Server from '../../Server'


export default function Home(){
  let jwt=localStorage.getItem('jwt')

  const[companies,SetCompanies]=useState([])

useEffect(()=>{
let obj={
  jwt
}
  axios.post(Server+'/getCompanies',obj).then((response)=>{
SetCompanies(response.data)

  })
  console.log("ds"+companies);
},[])




  const [open,setOpen]=useState(false)

  const onCloseModal=()=>setOpen(false)

  const [appointmentOpen,setappOpen]=useState(false)
  const onAppointmentClose=()=>setappOpen(false)
 


  // company Modal opening
  function onOpenModal()
  {
      setOpen(true);
  }


function openAppoint()
{

setappOpen(true)

}


// addCompany

function addComapany(){
let address=document.getElementById('address').value
let companyName=document.getElementById('companyName').value
let state=document.getElementById('state').value
let city=document.getElementById('city').value
let email=document.getElementById('email').value
let zip=document.getElementById('zip').value
let phone=document.getElementById('phone').value
let website=document.getElementById('website').value

if(address==''||companyName==''||state==''||city==''||zip==''||email==''||phone==''||website=='')
{
alert('please enter sufficient details')
}
else
{
 let obj={
   jwt,
   companyName,
   address,
   state,
   city,
   email,
   zip,
   phone,
   website
 }

axios.post(Server+'/addCompany',obj).then((response)=>{

if(response.status==200)
{
  alert('New Company Added')
  window.location.reload()
}
})

}


}

// add appointment

function addAppointment(){

  let day=document.getElementById('day').value
  let startTime=document.getElementById('StartTime').value
  let endTime=document.getElementById('EndTime').value
if(day==''||startTime==''||endTime=='')
{
  alert('please Give Sufficient Data')
}
else
{
  
  let obj={
    day,
    startTime,
    endTime
    
  }

  axios.post(Server+'/addTime',obj).then((result)=>{

    console.log(result.data);
    if(result.data==false)
    {
      alert("cannot insert. the time is already exists")
    }
    else
    {
      alert('data inserted successfully')
    }

  })
}
}

function bulkDelete(){

  let x= window.confirm("This will delete all the companies.. sure to continue?")

  if(x)
  {
    
    let obj={
      jwt
    }
    axios.post(Server+'/bulkDelete',obj).then((response)=>{

      if(response.status==200)
      {
        alert('deleted the companies')
SetCompanies('')
      }

    })
  }

}









    return(
 

<div>
<Header/>


<div className='row button1 '>

<button className='btn btn-primary ' onClick={openAppoint}> add new appointment </button>


<div className='row button2'>
<button className=' btn btn-primary '   onClick={(e)=>onOpenModal()} > add company</button>

</div>
<div className='row button3'>
<button className=' btn btn-primary ' onClick={bulkDelete}> Bulk Delete</button>

</div>

</div>


<Table striped bordered hover>
  <thead>
    <tr>
      <th>comapny Name</th>
      <th>address</th>
      <th>PHONE</th>
      <th>Email</th>
      <th>ACTIONS</th>
    </tr>
  </thead>
  <tbody>


{companies.length>0? (

  companies.map((data,index)=>{

return(



<tr>
      <td>{data.companyName}</td>
      <td>{data.address}</td>
      <td>{data.phone}</td>
      <td>{data.email}</td>
      <td> 
        
      <Dropdown>
  <Dropdown.Toggle  variant="success" id="dropdown-basic" >
...
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Edit </Dropdown.Item>
    <Dropdown.Item href="#/action-2">Deactivate</Dropdown.Item>
    <Dropdown.Item href="#/action-3">  <i class="fa-trash"></i>
 Delete</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>


          </td>
    </tr>





)


  })
): (
  <div></div>
)}

   
  </tbody>
</Table>


<div className='modalid'>
<Modal open={open} onClose={onCloseModal} center>
       
<Form>

    <Form.Group  controlId="formGridEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" id='companyName' placeholder="Enter the company name" />
    </Form.Group>


  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" id='address' />
  </Form.Group>

<Form.Row>


<Form.Group controlId="formGridAddress1">
    <Form.Label>city</Form.Label>
    <Form.Control placeholder="1234 Main St" id='city' />
  </Form.Group>
  
  <Form.Group  controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." id='state'>
        <option value='kerala'>Kerala</option>
        <option value='Karnataka'>Karnataka</option>
        <option value='tamilnadu'>Tamilnadu</option>
        <option value='other'>Other</option>

      </Form.Control>
    </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label >Zip</Form.Label>
    <Form.Control placeholder="1234 Main St" id='zip' />
  </Form.Group>

</Form.Row>




  <Form.Group controlId="formGridAddress2">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control placeholder="10 digit phone number"  id='phone'/>
  </Form.Group>

  <Form.Row>
    <Form.Group  controlId="formGridCity">
      <Form.Label>Website</Form.Label>
      <Form.Control placeholder='enter your website' id='website' />
    </Form.Group>


    <Form.Group  controlId="formGridZip">
      <Form.Label>Email</Form.Label>
      <Form.Control placeholder='enter your mail' id='email' />
    </Form.Group>
  </Form.Row>


  <Button variant="primary" type="button" onClick={addComapany}>
    Submit
  </Button>
</Form>








      </Modal>

</div>



{/* appointment modal */}


<div className='modal2'>
<Modal open={appointmentOpen} onClose={onAppointmentClose} center>
       
<Form>

    


<Form.Group  controlId="formGridState">
      <Form.Label>Select The Day</Form.Label>
      <Form.Control as="select"  id='day'>
        <option value='Mon'>Monday</option>
        <option value='Tue'>Tuesday</option>
        <option value='Wed'>Wednesday</option>
        <option value='Thu'>Thursday</option>
        <option value='Fri'>Friday</option>
        <option value='Sat'>Saturday</option>
        <option value='Sun'>Sunday</option>

      </Form.Control>
    </Form.Group>

  <Form.Row>
    <Form.Group  controlId="formGridCity">
      <Form.Label>Start Time</Form.Label>
      <Form.Control  type='time' id='StartTime' />
    </Form.Group>


    <Form.Group  controlId="formGridZip">
      <Form.Label>End Time</Form.Label>
      <Form.Control type='time' id='EndTime'  />
    </Form.Group>
  </Form.Row>


  <Button variant="primary" type="button" onClick={addAppointment}>
    Submit
  </Button>
</Form>








      </Modal>

</div>







  </div>


    )
}