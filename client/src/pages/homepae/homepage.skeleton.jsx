import React from 'react';
import './homepage.styles.scss';
import { selectSkeletonLoading } from '../../redux/question/question.selector';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';

class HomepageSkeleton extends React.Component {
  createCol = () => {
    const { skeletonLoading, totalItems } = this.props;
    let col = [];

    for (let i = 0; i < totalItems; i++) {
      col.push(
        <Col key={i} className='HomePage-skeleton' flex='auto'>
          <Skeleton
            loading={skeletonLoading}
            active
            paragraph={false}
          ></Skeleton>
        </Col>,
      );
    }
    return col;
  };
  render() {
    return (
      <div>
        <Row gutter={[32, 8]}>{this.createCol()}</Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  skeletonLoading: selectSkeletonLoading(state),
});

export default connect(mapStateToProps, null)(HomepageSkeleton);
