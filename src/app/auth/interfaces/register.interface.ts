export interface IuserRegister {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  photo: string;
  birthDate: Date;
}

export interface FireAuth {
  email: string;
  password: string;
}
