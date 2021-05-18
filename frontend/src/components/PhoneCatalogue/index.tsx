import React from 'react';
import { Table, Button, Row, Col, Popconfirm, Typography, Space } from 'antd';
import { PhoneController } from './services';
import strings from './strings';
import PhoneModal from './PhoneModal';
import styles from './index.css';
import { useRequest } from '@umijs/hooks';
import { PhoneInterface } from './Phone';
import DeleteConfirm from './DeleteConfirm';

const controller = new PhoneController();

const PhoneCatalogue = () => {
  const { loading, refresh, data } = useRequest(controller.loadPhones);

  const columns = [
    {
      title: strings.name,
      key: strings.name,
      render: ({ name, color, processor }: PhoneInterface) => {
        return <>
          <Typography.Title level={4}>{name}</Typography.Title>
          <Typography.Text>{color} | {processor}</Typography.Text>
        </>
      }
    },
    {
      title: strings.description,
      key: strings.description,
      render: ({ imageFileName, description }: { imageFileName: string, description: string }) => {
        return <>
          <div>
            <Typography.Text>{imageFileName}</Typography.Text>
          </div>
          <Typography.Text>{description}</Typography.Text>
        </>
      }
    },
    {
      title: strings.manufacturer,
      key: strings.manufacturer,
      dataIndex: 'manufacturer'
    },
    {
      title: strings.price,
      key: strings.price,
      dataIndex: 'price',
      align: 'right',
      render: (price: string) => <Typography.Text className={styles.price}>${price}</Typography.Text>
    },
    {
      title: strings.action,
      key: strings.action,
      fixed: 'right',
      align: 'right',
      render: (_: any, item: any) => {
        return (
          <Row type="flex" align="middle" justify="end" gutter={[16, 16]}>
            <Col>
              <PhoneModal title={strings.editPhone} item={item} onSubmitSuccess={refresh} itemId={item.id}/>
            </Col>
            <Col>
              <DeleteConfirm id={item.id} refresh={refresh}/>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Row type="flex" justify="end" align="middle" gutter={[16, 16]}>
        <Col>
          <PhoneModal title={strings.addPhone} onSubmitSuccess={refresh}/>
        </Col>
        <Col span={24}>
          <Table columns={columns} bordered loading={loading} dataSource={data} pagination={false}/>
        </Col>
      </Row>
    </div>
  );
};

export default PhoneCatalogue;
