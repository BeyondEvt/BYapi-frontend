import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean
};
const UpdateModal: React.FC<Props> = (props) => {
  const {values, visible, columns, onCancel, onSubmit} = props;

  // 监听外部user的变化，来填充更新框的默认值
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {

      formRef.current?.setFieldsValue(values);
    }

  }, [values])

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        formRef={formRef}
        columns={columns}


        onSubmit={async (value) => {
          value.id = values.id;
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default UpdateModal;
/*
function userEffect(arg0: () => void) {
    throw new Error('Function not implemented.');
}
*/

