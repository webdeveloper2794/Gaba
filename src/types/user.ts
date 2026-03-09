export interface Company {
  department?: string;
  name?: string;
  title?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phone?: string;
  company?: Company;
  age?: number;
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchParams {
  q: string;
  limit?: number;
  skip?: number;
}
