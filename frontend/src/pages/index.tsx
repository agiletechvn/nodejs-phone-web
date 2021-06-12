import 'antd/dist/antd.css';

import React from 'react';
import { Typography, Row } from 'antd';
import styles from './index.less';
import { Link } from 'umi';

export default function () {
  return (
    <div className={styles.normal}>
      <Row align='middle' justify='center'>
        <Typography.Title>Welcome</Typography.Title>
        
      </Row>
      <Row align='middle' justify='center'>
        <Typography.Text level={1}>To <Link to='/phone'>Phone catalog</Link></Typography.Text>
        </Row>
    </div>
  );
}
