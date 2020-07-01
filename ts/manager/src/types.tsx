// 用户信息
export interface IUser {
  username: string;
  [propName: string]: any;
}

export interface ILogin {
  login: boolean;
  user: IUser;
}

// action格式
export interface IAction {
  type: string;
  data?: any;
}