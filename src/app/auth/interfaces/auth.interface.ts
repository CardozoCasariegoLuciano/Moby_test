export interface IuserRegister {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  photo: string;
  birthDate: string;
}

export interface FireAuth {
  email: string;
  password: string;
}
