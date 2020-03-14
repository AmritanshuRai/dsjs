import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepae/homepage.page";
import Solution from "./components/solution/solution.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import Loader from "./components/loader/loader.component";
import { connect } from "react-redux";
import {
    toggleLoader,
    setQuestionData
} from "./redux/question/question.action";
import { firestore } from "./firebase/firebase.utils";

class App extends React.Component {
    state = {
        currentUser: null
    };

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    this.setState(
                        {
                            currentUser: {
                                id: snapshot.id,
                                ...snapshot.data()
                            }
                        },
                        () => console.log(this.state.currentUser)
                    );
                });
            } else {
                this.setState(
                    {
                        currentUser: userAuth
                    },
                    () => console.log(this.state.currentUser)
                );
            }
        });

        this.fetchData();
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
                    <Header currentUser={this.state.currentUser} />
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
                        <Route path="/signin" component={SignInAndSignUpPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    toggleLoader: () => dispatch(toggleLoader()),
    setQuestionData: data => dispatch(setQuestionData(data))
});
export default connect(null, mapDispatchToProps)(App);
