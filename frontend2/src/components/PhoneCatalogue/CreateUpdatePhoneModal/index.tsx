import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Upload, Typography, InputNumber, message } from 'antd';
import strings from '../strings';
import { useRequest } from '@umijs/hooks';
import { createPhone, updatePhone } from '@/domains/services/phones';
import { PhoneInterface } from '@/domains/entities/phones';

const MAX_LENGTH = 60;

const inputDefaultProps = {
  maxLength: MAX_LENGTH,
};

const labelDefaultProps = {
  labelCol: {
    span: 24,
  },
};

type PhoneModalProps = {
  title: string;
  item?: PhoneInterface;
  itemId?: number;
  onSubmitSuccess?: Function;
};

const CreateUpdatePhoneModal: React.FC<PhoneModalProps> = (props: PhoneModalProps) => {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const createRequest = useRequest(createPhone, {
    manual: true,
    onSuccess: () => {
      setVisible(false);
      props.onSubmitSuccess && props.onSubmitSuccess();
    },
    onError: (er) => {
      console.log(er);
      // message.error(er)
    }

  });

  const editRequest = useRequest(updatePhone, {
    manual: true,
    // debounceInterval: 250,
    onSuccess: () => {
      setVisible(false);
      props.onSubmitSuccess && props.onSubmitSuccess();
    },
  });

  const onFinish = (values: any) => {
    const {
      name,
      manufacturer,
      description,
      color,
      price,
      screen,
      processor,
      ram,
      imageFile,
    } = values;

    if (props.itemId) {
      editRequest.run(
        {
          name,
          manufacturer,
          description,
          color,
          price,
          screen,
          processor,
          ram,
          imageFile: imageFile ? imageFile.file.originFileObj : undefined,
        },
        props.itemId,
      );
    } else {
      createRequest.run({
        name,
        manufacturer,
        description,
        color,
        price,
        screen,
        processor,
        ram,
        imageFile: imageFile.file.originFileObj,
      });
    }
  };

  const onOk = () => {
    form.submit();
  };
  
  useEffect(() => {
    if (visible) {
      if (props.item) {
        form.setFieldsValue({ ...props.item });
      } else {
        form.resetFields();
      }
    }
    
  }, [form, props.item, visible])

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
      >
        {props.title}
      </Button>
      <Modal
        visible={visible}
        mask
        closable={false}
        onCancel={() => {
          form.resetFields();
          setVisible(false);
        }}
        title={props.title}
        maskClosable
        onOk={onOk}
        okButtonProps={{
          disabled: createRequest.loading || editRequest.loading,
          loading: editRequest.loading || createRequest.loading,
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            {...labelDefaultProps}
            label={strings.name}
            name="name"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.name} />
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.manufacturer}
            name="manufacturer"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.manufacturer} />
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.description}
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder={strings.description} maxLength={255} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.processor}
            name="processor"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.processor} maxLength={60} />
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.screen}
            name="screen"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.screen} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.ram}
            name="ram"
            rules={[{ required: true }]}
          >
            <InputNumber {...inputDefaultProps} placeholder={strings.ram} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.color}
            name="color"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.color} maxLength={24} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.imageFileName}
            name="imageFile"
            rules={[{ required: !props.itemId }]} // is Create
          >
            <Upload
              accept="image/*"
              maxCount={1}
              itemRender={(_, file: any) => <Typography.Text>{file.name}</Typography.Text>}
            >
              <Button>{strings.clickToUpload}</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.price}
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber {...inputDefaultProps} placeholder={strings.price} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUpdatePhoneModal;
