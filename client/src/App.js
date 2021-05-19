import {BrowserRouter as Router,Route} from 'react-router-dom'
import User from './components/user'
function App() {
  return (
   
    <div>

<Router>


<Route path='/'>   <User/>  </Route>

</Router>
    </div>
  );
}

export default App;
