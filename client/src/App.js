import React, { lazy, Suspense } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Loader from './components/loader/loader.component';
import PlainLoader from './components/loader/plainLoader.component';
import HomePage from './pages/homepae/homepage.page';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selector';
import Nav from './components/nav/nav.component';
import { Layout } from 'antd';
import { checkUserSession } from './redux/user/user.action';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import {
  setQuestionDataAsync,
  setCurrentPage,
} from './redux/question/question.action';
const Solution = lazy(() => import('./components/solution/solution.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const Donate = lazy(() => import('./pages/donate/donate.page'));
const Approve = lazy(() => import('./pages/approve/approve.page'));
const PageNotFound = lazy(() => import('./pages/404/404.page'));
const MyEditor = lazy(() => import('./pages/upload/upload.page'));
const Thanks = lazy(() => import('./pages/thanks/thanks.page'));

class App extends React.PureComponent {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    if (!!navigator.onLine) {
      this.props.setCurrentPage(1);
      this.props.setQuestionDataAsync();
    }
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }
  render() {
    return (
      <>
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
                <Route
                  exact
                  path='/upload'
                  render={() =>
                    this.props.currentUser ? <MyEditor /> : <Redirect to='/' />
                  }
                ></Route>
                <Route exact path='/donate' component={Donate}></Route>
                <Route exact path='/preview' component={Solution}></Route>
                <Route exact path='/approve' component={Approve}></Route>
                <Route exact path='/thanks' component={Thanks}></Route>
                <Route path='/404' component={PageNotFound} />
                <Redirect to='/404' />
              </Switch>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  setQuestionDataAsync: () => dispatch(setQuestionDataAsync()),
  setCurrentPage: (data) => dispatch(setCurrentPage(data)),
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

App.whyDidYouRender = true;

export default withRouter(ConnectedApp);
