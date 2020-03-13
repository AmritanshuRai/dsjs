import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepae/homepage.page";
import Solution from "./components/solution/solution.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import Loader from "./components/loader/loader.component";

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
            // console.log(user);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        return (
            <div className="App">
                <Loader />
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
        );
    }
}

export default App;
