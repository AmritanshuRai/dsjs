import React from 'react';
import './loader.styles.scss';
import { connect } from 'react-redux';
import { selectToggleLoader } from '../../redux/universal/universal.selector';
const Loading = () => (
  <>
    <div className='overlay'>
      <div className='loading'>
        <div></div>
        <div></div>
      </div>
    </div>
  </>
);

class Loader extends React.Component {
  render() {
    const { loading } = this.props;
    return loading ? <Loading /> : null;
  }
}
//refactor loading todo
const mapStateToProps = (state) => ({
  loading: selectToggleLoader(state),
});
export default connect(mapStateToProps)(Loader);
