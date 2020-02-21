import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

// import Highlight from "react-highlight.js";
import HomePage from './pages/homepae/homepage.page';
import Solution from './components/solution/solution.component';

class App extends React.Component{
  render(){
    return (
      <div className='App'>
        {/* <Highlight language="javascript">
          {
            `   const rootElement = document.getElementById("root"); 
            ReactDOM.render(<App />, rootElement);`
          }
        </Highlight> */}
               <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/solution/:id' component={Solution} />
        </Switch>
      </div>
    )
  }
}
// function App() {
//   return (
//     <Highlight language="javascript">
//       {`const rootElement = document.getElementById("root"); 
// ReactDOM.render(<App />, rootElement);`}
//     </Highlight>
//   );
// }
export default App;
