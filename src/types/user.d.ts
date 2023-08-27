// // 用户信息
// export type User = {
//   token: string;
//   id: string;
//   account: string;
//   mobile: string;
//   avatar: string;
// };
// // 短信验证码类型
// export type CodeType = 'login' | 'register'

// 1. 登录响应数据
export interface User {
  /**
   * 用户名
   */
  account?: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 用户id
   */
  id?: string
  /**
   * 脱敏手机号，带星号的手机号
   */
  mobile?: string
  /**
   * refreshToken
   */
  refreshToken?: string
  /**
   * token
   */
  token: string
}

// 短信验证码类型
export type CodeType = 'login' | 'register'

// == add 个人信息 ==
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

// 家庭档案-患者信息
export type Patient = {
  id?: string
  name: string
  idCard: string
  defaultFlag: 0 | 1
  gender: 0 | 1
  genderValue?: string
  age?: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]