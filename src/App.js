import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepae/homepage.page';
import Solution from './components/solution/solution.component';
import Header from './components/header/header.component';
import QUESTION_DATA from './components/question-container/question-container.data';

class App extends React.Component{
  constructor(props){
    super(props);
    this.QUESTION_DATA = QUESTION_DATA;

    this.state = {
      question_data : QUESTION_DATA,
      filteredText : "",
      showSearchField : true
    };
  }
  handleChange = (e) => {
    
    this.setState({
      filteredText : e.target.value
    },()  =>  this.updateQuestionData());
  }

  updateQuestionData = () => { 
    let filteredSet = this.QUESTION_DATA.filter(({question})=>{
      return question.includes(this.state.filteredText);
    });
    this.setState({
      question_data : filteredSet
    })
  }

  toggleSearchField = () => {
    this.setState({
      showSearchField : !this.state.showSearchField
    }, ()=>console.log(this.state))

  }

  render(){
    return (
      <div className='App'>
        <Header handleChange={this.handleChange} showSearchField={this.state.showSearchField} filteredText={this.state.filteredText}/>
        <Switch>
          <Route exact path='/' render={()=>{
            return (
              <HomePage props={this.state.question_data}/>
            )
          }} />
          <Route path='/solution/:id' render={(props)=>{
            return (
              <Solution toggleSearchField={this.toggleSearchField} {...props}/>
            )
          }}/>
        </Switch>
      </div>
    )
  }
}
export default App;
