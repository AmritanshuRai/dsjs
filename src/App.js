import React from "react";
import "./App.css";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import HomePage from "./pages/homepae/homepage.page";
import Solution from "./components/solution/solution.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import Loader from "./components/loader/loader.component";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selector";
import { setQuestionData } from "./redux/question/question.action";
import { toggleLoader } from "./redux/universal/universal.action";
import { firestore } from "./firebase/firebase.utils";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        if (this.props.location.pathname === "/") {
            this.fetchData();
        }
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }

    async fetchData() {
        this.props.toggleLoader();
        const userRef = firestore.doc(`questions/b41rFEKQw3OOzuzImSci`);
        const { questions } = await (await userRef.get()).data();
        this.props.setQuestionData(questions);
        this.props.toggleLoader();
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        return (
            <div className="App">
                <Loader />
                <div className="App_container">
                    <Header />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return <HomePage />;
                            }}
                        />
                        <Route
                            path="/solution/:id"
                            render={props => {
                                return <Solution {...props} />;
                            }}
                        />
                        <Route
                            exact
                            path="/signin"
                            render={() => {
                                return this.props.currentUser ? (
                                    <Redirect to="/" />
                                ) : (
                                    <SignInAndSignUpPage />
                                );
                            }}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
});
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    toggleLoader: () => dispatch(toggleLoader()),
    setQuestionData: data => dispatch(setQuestionData(data))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
