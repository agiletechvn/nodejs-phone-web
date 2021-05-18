import React from 'react';
import { useRequest } from '@umijs/hooks';
import { Button, message, Popconfirm } from 'antd';
import { PhoneController } from './services';
import strings from './strings';

const controller = new PhoneController();

type DeleteConfirmProps = {
  id: string;
  refresh?: Function;
};

const DeleteConfirm: React.FC<DeleteConfirmProps> = (props: DeleteConfirmProps) => {

  const deleteRequest = useRequest(controller.deletePhone, {
    manual: true,
    onSuccess: () => {
      props.refresh && props.refresh();
    },
    onError: (err) => {
        message.error(err)
    }
  });

  return (
    <Popconfirm
      title={strings.deletePhoneQuestion}
      okText={strings.ok}
      cancelText={strings.cancel}
      okButtonProps={{ loading: deleteRequest.loading }}
      onConfirm={() => deleteRequest.run(props.id)}
    >
      <Button>{strings.delete}</Button>
    </Popconfirm>
  );
};

export default DeleteConfirm;
