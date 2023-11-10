import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Form, message} from "antd";
import {
  getInterfaceInfoByIdUsingGET, interfaceInvokeUsingPOST,
} from "@/services/BYapi-backend/interfaceInfoController";
import {useParams} from "react-router";


/**
 * 主页
 * @constructor
 */


import {Badge, Descriptions} from 'antd';
import type {DescriptionsProps} from 'antd';
import TextArea from "antd/es/input/TextArea";
import moment from "moment/moment";


const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const params = useParams()
  const [invokeRes, setInvokeRes] = useState<any>()
  {/*        create_time?: string;
        description?: string;
        id?: number;
        is_deleted?: number;
        method?: string;
        name?: string;
        request_header?: string;
        response_header?: string;
        status?: number;
        update_time?: string;
        url?: string;
        user_id?: number;*/
  }


  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '接口状态',
      children: data?.status ? <Badge status="processing" text="开启"/> :
        <Badge status="error" text="关闭"/>,
    },
    {
      key: '2',
      label: '请求描述',
      // children: 'Cloud Database',
      children: data?.description,
    },
    {
      key: '3',
      label: '请求地址',
      children: data?.url,
    },
    {
      key: '4',
      label: '请求方法',
      children: data?.method,
    },
    {
      key: '5',
      label: '请求参数',
      children: data?.requestParams,
    },
    {
      key: '6',
      label: '请求头',
      children: data?.request_header,
    },
    {
      key: '7',
      label: '响应头',
      children: data?.response_header,
    },
/*    {
      key: '8',
      label: '创建时间',
      children: data?.create_time,


// data?.create_time.format('yyyy-MM-dd HH:mm:ss')
    },
    {
      key: '9',
      label: '更新时间',
      children: data?.update_time,
    },*/
  ];

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id)
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);

    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error("接口不存在");
      return
    }
    setInvokeLoading(true);
    try {
      const res = await interfaceInvokeUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('请求发送成功');
    } catch (error: any) {
      message.error('请求发送失败，' + error.message);
    }
    setInvokeLoading(false);
  };



  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1} bordered items={items}/>
        ) : (<>接口不存在</>
        )}

        {/*{*/}
        {/*    JSON.stringify(data)*/}
        {/*}*/}
      </Card>
      <Divider></Divider>
      <Card title="在线测试">
        <Form
          name="invoke"
          layout={"vertical"}
          onFinish={onFinish}
        >
          <Form.Item
            label="请求参数"
            name="userRequestParams"

          >
            <TextArea autoSize={{minRows: 5, maxRows: 10}}/>
          </Form.Item>


          <Form.Item wrapperCol={{span: 16}}>
            <Button type="primary" htmlType="submit">
              发送请求
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider></Divider>
      <Card title="返回结果" loading={invokeLoading}>

        {invokeRes}
      </Card>

    </PageContainer>
  );
};

export default Index;
