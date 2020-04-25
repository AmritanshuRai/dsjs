import React, { lazy, Suspense } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Loader from './components/loader/loader.component';
import PlainLoader from './components/loader/plainLoader.component';
import HomePage from './pages/homepae/homepage.page';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import { toggleLoader } from './redux/universal/universal.action';
import Nav from './components/nav/nav.component';
import { Layout } from 'antd';
import { checkUserSession } from './redux/user/user.action';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
const Solution = lazy(() => import('./components/solution/solution.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'),
);
const Donate = lazy(() => import('./pages/donate/donate.page'));
const Approve = lazy(() => import('./pages/approve/approve.page'));
const PageNotFound = lazy(() => import('./pages/404/404.page'));
const MyEditor = lazy(() => import('./pages/upload/upload.page'));

class App extends React.PureComponent {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // if (this.props.location.pathname === '/') {
    //   this.props.toggleLoader(true);
    //   const fetchedData = await fetchData(this.onFetchedData, {
    //     toggleLoader: this.props.toggleLoader,
    //   });
    //   this.props.setQuestionData(fetchedData);
    //   this.props.toggleLoader(false);
    // document.addEventListener('keydown', this.handleKeyPress, false);
    // }
    const { checkUserSession } = this.props;
    checkUserSession();
  }
  // onFetchedData = fetchedData => {
  //   this.props.setQuestionData(fetchedData);
  //   if (this.props.location.pathname === '/') {
  //     this.props.toggleLoader(false);
  //   }
  // };
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
  // handleKeyPress = event => {
  //   event.preventDefault();
  //   if (event.keyCode === 32 && !!event.shiftKey) {
  //     this.props.history.push('/approve');
  //   }
  // };
  componentWillUnmount() {
    this.unsubscribeFromAuth();
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }
  render() {
    return (
      <div>
        <Loader />
        <ErrorBoundary>
          <Nav />
          <Layout className='App'>
            <Suspense fallback={<PlainLoader />}>
              <Switch>
                <Route exact path='/' render={() => <HomePage />} />
                <Route
                  path='/solution/:id'
                  render={(props) => <Solution {...props} />}
                />
                <Route
                  exact
                  path='/signin'
                  render={() =>
                    this.props.currentUser ? (
                      <Redirect to='/' />
                    ) : (
                      <SignInAndSignUpPage />
                    )
                  }
                />
                <Route exact path='/upload' component={MyEditor}></Route>
                <Route exact path='/donate' component={Donate}></Route>
                <Route exact path='/preview' component={Solution}></Route>
                <Route exact path='/approve' component={Approve}></Route>
                <Route path='/404' component={PageNotFound} />
                <Redirect to='/404' />
              </Switch>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  toggleLoader: (data) => dispatch(toggleLoader(data)),
  checkUserSession: () => dispatch(checkUserSession()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
