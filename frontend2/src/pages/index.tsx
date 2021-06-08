import 'antd/dist/antd.css';

import React from 'react';
import PhoneCatalogue from '@/components/PhoneCatalogue';
import styles from './index.less';

export default function() {
  return (
    <div className={styles.normal}>
      <PhoneCatalogue />
    </div>
  );
}
