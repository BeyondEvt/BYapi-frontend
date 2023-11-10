import {PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import '@umijs/max';
import { Button } from 'antd';
import React from "react";

export type SiderTheme = 'light' | 'dark';
export const Release = () => {
  return (
    <Button shape="round" key="1"><PlusOutlined/> 发布接口 </Button>
  );
};
export const SelectLang = () => {

  return (

    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};
export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
