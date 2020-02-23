import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepae/homepage.page';
import Solution from './components/solution/solution.component';
import Header from './components/header/header.component';

class App extends React.Component{
  render(){
    return (
      <div className='App'>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/solution/:id' component={Solution} />
        </Switch>
      </div>
    )
  }
}
export default App;
