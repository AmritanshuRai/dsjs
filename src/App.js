import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepae/homepage.page';
import Solution from './components/solution/solution.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

class App extends React.Component{

  render(){
    return (
      <div className='App'>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=>{
            return (
              <HomePage />
            )
          }} />
          <Route path='/solution/:id' render={(props)=>{
            return (
              <Solution  {...props}/>
            )
          }}/>
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App;
