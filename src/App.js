import React from 'react';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './pages/homepae/homepage.page';
import Solution from './components/solution/solution.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Loader from './components/loader/loader.component';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selector';
import { setQuestionData } from './redux/question/question.action';
import { toggleLoader } from './redux/universal/universal.action';

// import { firestore } from './firebase/firebase.utils';
import MyEditor from './pages/upload/upload.page';
import Donate from './pages/donate/donate.page';
import { fetchData } from './utils/fetchData';

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromQuestions = null;
  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.props.toggleLoader(true);
      this.unsubscribeFromQuestions = fetchData(this.onFetchedData, {
        toggleLoader: this.props.toggleLoader,
      });
    }

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }
  onFetchedData = fetchedData => {
    this.props.setQuestionData(fetchedData);
    if (this.props.location.pathname === '/') {
      this.props.toggleLoader(false);
    }
  };
  // async fetchData() {
  //   this.props.toggleLoader();
  //   // const userRef = firestore.doc(`questions/b41rFEKQw3OOzuzImSci`);
  //   // const { questions } = await (await userRef.get()).data();
  //   let questions = {};
  //   const value = await firestore
  //     .collection('questions')
  //     .orderBy('timestamp', 'desc')
  //     .get();
  //   value.forEach(doc => {
  //     // console.log(`${doc.id} => ${doc.data()}`);
  //     questions[doc.id] = doc.data();
  //   });

  //   this.props.setQuestionData(questions);

  //   this.props.toggleLoader();
  // }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromQuestions();
  }
  render() {
    return (
      <div className='App'>
        <Loader />
        <div className='App_container'>
          <Header />
          <Switch>
            <Route
              exact
              path='/'
              render={() => {
                return <HomePage />;
              }}
            />
            <Route
              path='/solution/:id'
              render={props => {
                return <Solution {...props} />;
              }}
            />
            <Route
              exact
              path='/signin'
              render={() => {
                return this.props.currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignInAndSignUpPage />
                );
              }}
            />
            <Route exact path='/upload' component={MyEditor}></Route>
            <Route exact path='/donate' component={Donate}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  toggleLoader: data => dispatch(toggleLoader(data)),

  setQuestionData: data => dispatch(setQuestionData(data)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
