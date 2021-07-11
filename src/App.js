import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Create from './component/Create.jsx';
import NotFound from './component/NotFound.jsx';
import Search from './component/Search.jsx';
import Home from './component/Home.jsx';
import ViewFamily from './component/ViewFamily.jsx';
import EditMember from './component/EditMember.jsx';
import Faltu from './component/Faltu.jsx';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
          <Switch>
            <Route exact path ="/">
              <Home/>
            </Route>
            <Route exact path ="/faltu">
              <Faltu/>
            </Route>
            <Route exact path ="/create">
              <Create/>
            </Route>
            <Route  path ="/create/:id">
              <Create/>
            </Route>
            <Route path ="/search">
              <Search/>
            </Route>
            <Route path ="/viewfamily/:id">
              <ViewFamily/>
            </Route>
            <Route path ="/editmember/:id">
              <EditMember/>
            </Route>
            <Route path ="*">
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
