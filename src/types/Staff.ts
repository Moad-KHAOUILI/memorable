export interface Staff {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface NewStaff {
  title: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
}
