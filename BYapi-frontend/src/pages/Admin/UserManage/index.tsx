import { ActionType, ProColumns, ProFormUploadDragger } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { Button, Image, message, Popconfirm, Tag } from 'antd';
import { deleteUser, searchUsers, updateUserInfoByAdmin } from '@/services/ant-design-pro/api';
import { ProFormSelect } from '@ant-design/pro-form';
import { selectGender, selectUserRole, selectUserStatus } from '@/constants';
// @ts-ignore
import type { API } from '@/services/ant-design-pro/typings';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

// 定义各列对应后端的字段

// @ts-ignore
const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: '序号',
    dataIndex: 'id',
    valueType: 'indexBorder',
    tooltip: 'id具有唯一性',
    width: 48,
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    copyable: true,
    align: 'center',
    tooltip: '用户账号具有唯一性',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={50} />
      </div>
    ),
    copyable: true,
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="error">女</Tag> },
      1: { text: <Tag color="success">男</Tag> },
    },
    align: 'center',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    align: 'center',
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="success">正常</Tag>, status: 'Success' },
      1: { text: <Tag color="warning">注销</Tag>, status: 'Default' },
      2: { text: <Tag color="error">封号</Tag>, status: 'Error' },
    },
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="default">普通用户</Tag> },
      1: { text: <Tag color="success">管理员</Tag> },
    },
    align: 'center',
  },
  {
    title: '用户编号',
    dataIndex: 'manageCode',
    copyable: true,
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    align: 'center',
  },

  {
    title: '操作',
    align: 'center',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      // 修改用户信息的表单
      <ModalForm<API.CurrentUser>
        title="修改用户信息"
        trigger={<Button type="link">修改</Button>}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(1000);
          //点击了提交
          console.log('values 的值为-------');
          //发起请求
          values.id = record.id;
          const isModify = await updateUserInfoByAdmin(values);
          if (isModify) {
            message.success('提交成功');
            // 刷新用户信息表单
            location.reload();
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            initialValue={record.username}
          />
          <ProFormText
            width="md"
            name="userAccount"
            label="用户账户"
            placeholder="请输入账号"
            initialValue={record.userAccount}
          />

          <ProFormText
            width="md"
            name="manageCode"
            label="用户编号"
            placeholder="请输入编号"
            initialValue={record.manageCode}
          />
          {/*<ProFormText*/}
          {/*    width="md"*/}
          {/*    name="gender"*/}
          {/*    label="性别"*/}
          {/*    placeholder="请输入性别"*/}
          {/*    initialValue={record.gender}*/}
          {/*/>*/}

          <ProFormText
            width="md"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            initialValue={record.phone}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            initialValue={record.email}
          />
          <ProFormSelect
            name="userStatus"
            fieldProps={{
              size: 'large',
            }}
            label="用户状态"
            options={selectUserStatus}
            initialValue={record.userStatus}
            placeholder={'选择用户状态'}
            rules={[
              {
                required: true,
                message: '请选择用户状态',
              },
            ]}
          />

          {/*<ProFormSelect*/}
          {/*    name="avatarUrl"*/}
          {/*    fieldProps={{*/}
          {/*      size: 'large',*/}
          {/*    }}*/}
          {/*    label="用户头像"*/}
          {/*    options={selectAvatarUrl}*/}
          {/*    placeholder={'请选择用户头像 '}*/}
          {/*    initialValue={record.avatarUrl}*/}
          {/*    rules={[*/}
          {/*      {*/}
          {/*        required: true,*/}
          {/*        message: '请选择用户头像!',*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*/>*/}
          <ProFormSelect
            name="gender"
            fieldProps={{
              size: 'large',
            }}
            label="性别"
            options={selectGender}
            initialValue={record.gender}
            placeholder={'选择用户性别'}
            rules={[
              {
                required: true,
                message: '请选择性别',
              },
            ]}
          />
          <ProFormSelect
            name="userRole"
            fieldProps={{
              size: 'large',
            }}
            label="用户角色"
            options={selectUserRole}
            initialValue={record.userRole}
            placeholder={'选择用户角色'}
            rules={[
              {
                required: true,
                message: '请选择用户角色',
              },
            ]}
          />
          <ProFormUploadDragger
            label="Dragger"
            name="avatarUrl"
            action="upload.do"
            title={'点击上传头像'}
            width={'sm'}
          />
        </ProForm.Group>
      </ModalForm>,

      <a key="view">
        <Popconfirm
          title="删除用户"
          // description="你确定要删除他吗？"
          onConfirm={async (e) => {
            console.log('e', e);
            console.log('id', record.id);
            const id = record.id;

            const isDelete = await deleteUser({ id: id });

            if (isDelete) {
              message.success('删除成功');
              // 刷新用户信息表单
              location.reload();
            } else {
              message.error('删除失败');
            }
          }}
          onCancel={(e) => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger style={{ marginLeft: '-30px' }}>
            删除
          </Button>
        </Popconfirm>
      </a>,
    ],
  },
];
// export default () => {
// render: (text, record, _, action) => [

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser, API.PageParams, API.RuleListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // request中获得后台数据，直接填到表单中

      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        // 通过查询获得后台数据并进行封装
        const userList = await searchUsers({
          ...params,
        });
        // if (userList.data){
        //   return {
        //     data:userList?.data || [],
        //     success: true
        //   }
        // }
        console.log(userList);
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户信息"
    />
  );
};
