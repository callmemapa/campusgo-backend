export interface AuthDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  document_type: string;
  id_user: number;
  type: string;
}
