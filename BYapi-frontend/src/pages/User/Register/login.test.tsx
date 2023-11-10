﻿import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { TestBrowser } from '@@/testBrowser';

// @ts-ignore
import { startMock } from '@@/requestRecordMock';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let server: {
  close: () => void;
};

describe('Login Page', () => {
  beforeAll(async () => {
    server = await startMock({
      port: 8000,
      scene: 'register',
    });
  });

  afterAll(() => {
    server?.close();
  });

  it('should show register form', async () => {
    const historyRef = React.createRef<any>();
    const rootContainer = render(
      <TestBrowser
        historyRef={historyRef}
        location={{
          pathname: '/user/register',
        }}
      />,
    );

    await rootContainer.findAllByText('Ant Design');

    act(() => {
      historyRef.current?.push('/user/register');
    });

    expect(rootContainer.baseElement?.querySelector('.ant-pro-form-login-desc')?.textContent).toBe(
      'Ant Design is the most influential web design specification in Xihu district',
    );

    expect(rootContainer.asFragment()).toMatchSnapshot();

    rootContainer.unmount();
  });

  it('should login success', async () => {
    const historyRef = React.createRef<any>();
    const rootContainer = render(
      <TestBrowser
        historyRef={historyRef}
        location={{
          pathname: '/user/register',
        }}
      />,
    );

    await rootContainer.findAllByText('Ant Design');

    const userNameInput = await rootContainer.findByPlaceholderText('Username: admin or user');

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'admin' } });
    });

    const passwordInput = await rootContainer.findByPlaceholderText('Password: ant.design');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'ant.design' } });
    });

    await (await rootContainer.findByText('register')).click();

    // 等待接口返回结果
    await waitTime(5000);

    await rootContainer.findAllByText('Ant Design Pro');

    expect(rootContainer.asFragment()).toMatchSnapshot();

    await waitTime(2000);

    rootContainer.unmount();
  });
});
