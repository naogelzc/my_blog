module.exports = {
  /**
   * @description 系统标题
   */
  title: 'Naoge Blog',

  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires: 5,

  /**
   * @description 密码过期天数重置
   */
  passwordExpires: 5,

  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,

  /**
   * @description 上传文件大小，单位字节
   */
  uploadFileSize: 10485760,

  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天, 前端代码不涉及token
   */
  // tokenCookieExpires: 1,

  /**
   * @description token key in cookie, 前端代码不涉及token
   */
  // TokenKey: 'LOGIN_USER',

  /**
   * @description token key in header, 前端代码不涉及token
   */
  // TokenHeader: 'LOGIN_USER',
}
