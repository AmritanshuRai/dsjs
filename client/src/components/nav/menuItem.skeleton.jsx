import React from 'react';
import { Skeleton } from 'antd';

class MenuItemSkeleton extends React.PureComponent {
  render() {
    return (
      <>
        <Skeleton.Button active={true} size={'default'} shape={'default'} />
      </>
    );
  }
}
export default MenuItemSkeleton;
