export interface UserModel {
  name: string;
  email: string;
  password: string;
  role: string;
  passwordConfirm?: string;
  active?: boolean;
  photo?: string;
  id?: string;
}
