import { useEffect } from "react"


function appointment(){

    useEffect(()=>{


        
    })

    return (

<div>

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



</div>


    )
}