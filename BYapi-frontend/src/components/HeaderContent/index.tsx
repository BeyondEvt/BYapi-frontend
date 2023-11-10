import React from 'react';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export type HeaderContent = {
  collapse?: boolean;
  onCollapse?: (collapsed: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const HeaderContent: React.FC<HeaderContent> = (props: any) => {
  const [collapsed, setCollapsed] = useMergedState<boolean>(props.collapse ?? false, {
    value: props.collapse,
    onChange: props.onCollapse,
  });

  const urlParams = new URL(window.location.href);
  return (
    <>
      <div>
        <Button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            cursor: 'pointer',
            fontSize: '16px',
            border:0,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        Welcome
      </div>
    </>
  );
};

export default HeaderContent;
