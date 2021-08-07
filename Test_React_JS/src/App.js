import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import { HomeComponent } from './components/Home';
import { MainContext } from './config/context.config';
import { MainHeader } from './header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Postingan } from './components/Postingan';

const App = () => {
  const [data, setData] = useState({
    query: null,
    select: null,
    search: [],
    count: 2
  })
  return (
    <div className="container py-4">
      <MainContext.Provider value={{ data, setData }}>
        <Router>
        <MainHeader></MainHeader>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/article/:topicId" component={Postingan} />
          </Switch>
        </Router>
      </MainContext.Provider>
    </div>
  );
}

export default App;
