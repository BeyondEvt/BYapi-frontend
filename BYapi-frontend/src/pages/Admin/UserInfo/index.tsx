import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,

  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, Image, message, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {SortOrder} from "antd/lib/table/interface";

import CreateModal from "@/pages/Admin/UserInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/UserInfo/components/UpdateModal";

import {
    addUserUsingPOST,
    deleteUserUsingPOST,
    listUserByPageUsingGET,
    updateUserUsingPOST
} from "../../../services/BYapi-backend/userController";


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPOST({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };


  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserUpdateRequest) => {
    const hide = message.loading('修改中');

    try {
      await updateUserUsingPOST({
        ...fields,


      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.DeleteRequest) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteUserUsingPOST({
        id: record.id
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.UserVO>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'indexBorder',
      tooltip: 'id具有唯一性',
      width: 48,
      align: 'center',
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      copyable: true,
      align: 'center',
      formItemProps: {
        rules: [{
          required: true,
          message: "用户账号为必填项"
        }]
      }
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      copyable: true,
      ellipsis: true,
      align: 'center',

    },

    {
      title: '头像',
      dataIndex: 'userAvatar',
      hideInSearch: true,
      render: (_, record) => (
        <div>
          <Image src={record.userAvatar} width={50}></Image>
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
        "user": { text: <Tag color="default">普通用户</Tag> },
        "admin": { text: <Tag color="success">管理员</Tag> },
      },
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      align: 'center',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      align: 'center',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,

        <Button
          type="text"
          danger
          key="config"
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'API 接口信息'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
          const res = await listUserByPageUsingGET({
            ...params
          })
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            }
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            }
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal columns={columns} onCancel={() => {
        handleModalOpen(false)
      }} onSubmit={(values) => {
        handleAdd(values)
      }} visible={createModalOpen}/>
    </PageContainer>
  );
};
export default TableList;
