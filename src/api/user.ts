
import type { CodeType, User ,UserInfo,PatientList} from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
    request.post<any, User>('/login/password', { mobile, password })
// 短信登录
export const loginByMobile = (mobile: string, code: string) =>
    request.post<any, User>('/login', { mobile, code })

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) =>
    request.get<any, { code: string }>('/code', { params: { mobile, type } })

// 获取个人信息
export const getUserInfo = () => request.get<any, UserInfo>('/patient/myUser')

// 获患者信息列表
export const getPatientList = () => request.get<any, PatientList>('/patient/mylist')