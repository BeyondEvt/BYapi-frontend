import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'BeyondEvt 出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
/*        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },*/

        {
          key: 'BeyondEvt CSDN',
          title: 'BeyondEvt CSDN',
          href: 'https://blog.csdn.net/Beyondevt',
          blankTarget: true,
        },
        {
          key: 'BeyondEvt GitHub',
          title: <GithubOutlined />,
          href: 'https://github.com/BeyondEvt',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
