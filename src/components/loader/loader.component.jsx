import React from "react";
import "./loader.styles.scss";
import { connect } from "react-redux";
const Loading = () => (
    <>
        <div className="overlay">
            <div className="loading">
                <div></div>
                <div></div>
            </div>
        </div>
    </>
);

class Loader extends React.Component {
    // state = {
    //     loading: true
    // };

    // componentDidMount() {
    //     this.isLoading = setTimeout(() => {
    //         this.setState({ loading: false });
    //     }, 930000);
    // }
    // componentWillUnmount() {
    //     clearTimeout(this.isLoading);
    // }

    // timer = () =>
    //     setTimeout(() => {
    //         this.setState({ loading: false });
    //     }, 930000);

    render() {
        const { loading } = this.props;
        return loading ? <Loading /> : null;
    }
}
//refactor loading todo
const mapStateToProps = state => ({
    loading: state.question.loading
});
export default connect(mapStateToProps)(Loader);
