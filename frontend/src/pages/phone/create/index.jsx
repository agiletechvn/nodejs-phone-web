import React from 'react';
import { Row, Col, message } from 'antd';
import BasicLayout from '@/layouts';
import PhoneForm from '@/components/PhoneCatalogue/PhoneForm';
import { useRequest } from '@umijs/hooks';
import { createPhone } from '@/domains/services/phones';



const PhoneCreate = (props) => {
    const createRequest = useRequest(createPhone, {
        manual: true,
        onSuccess: () => {
            props.history.goBack();
            message.success('Create Phone Model Success');
        },
        onError: () => {
            message.error('Something wrong happen! Please try again');
        }
        
    });

    const onFinish = (values) => {
        createRequest.run({ ...values, imageFile: values.imageFile.file.originFileObj, })
    }
    

    return (
        
            <Row justify='center'> 
                <Col span={20}>
                    <PhoneForm 
                        loading={createRequest.loading}
                        onFinish={onFinish}
                    />
                </Col>
            </Row>
    )
}

export default PhoneCreate;