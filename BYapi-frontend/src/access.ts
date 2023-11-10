/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * 用户权限校验
 * */
export default function access(initialState: InitialState| undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser, // 用户已登录
    canAdmin: loginUser?.userRole === 'admin', // 用户为管理员
  };
}
