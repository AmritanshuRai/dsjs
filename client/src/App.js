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
// import VerifyEmail from './pages/verify-email/verifyEmail.page';

import { Layout } from 'antd';
import { checkUserSession } from './redux/user/user.action';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import {
  setQuestionDataAsync,
  setCurrentPage,
} from './redux/question/question.action';
const Solution = lazy(() => import('./components/solution/solution.component'));
const VerifyEmail = lazy(() => import('./pages/verify-email/verifyEmail.page'));
const ResetPassword = lazy(() =>
  import('./pages/reset-password/resetPassword.page')
);

const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const Donate = lazy(() => import('./pages/donate/donate.page'));
const Approve = lazy(() => import('./pages/approve/approve.page'));
const PageNotFound = lazy(() => import('./pages/404/404.page'));
const Success = lazy(() => import('./pages/success/success.page'));

const Canceled = lazy(() => import('./pages/canceled/canceled.page'));

const MyEditor = lazy(() => import('./pages/upload/upload.page'));
const Thanks = lazy(() => import('./pages/thanks/thanks.page'));
const GithubAuth = lazy(() => import('./pages/githubAuth/githubAuth.page'));

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
                  path='/verifyemail/:id'
                  render={(props) => <VerifyEmail {...props} />}
                />
                <Route
                  path='/resetpassword/:id'
                  render={(props) => <ResetPassword {...props} />}
                />
                <Route
                  path='/githubauth'
                  render={(props) =>
                    this.props.currentUser ? (
                      <Redirect to='/' />
                    ) : (
                      <GithubAuth {...props} />
                    )
                  }
                />
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
                <Route exact path='/success' component={Success}></Route>
                <Route exact path='/canceled' component={Canceled}></Route>


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
