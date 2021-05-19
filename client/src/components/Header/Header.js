
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,ButtonToolbar,Button,FormControl,Navbar,Form} from 'react-bootstrap'
import { useHistory } from 'react-router';

function Header(){
let history=useHistory()
  function logout(){

    localStorage.removeItem('jwt')
    history.push('/')
  }
    return(

        <div>
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Machine test</Navbar.Brand>
    <Nav className="mr-auto">

      <Nav.Link onClick={logout} className='Logout' >Logout</Nav.Link>
    </Nav>
    <Form inline>
    </Form>
  </Navbar>
  </div>
    )
}
export default Header;