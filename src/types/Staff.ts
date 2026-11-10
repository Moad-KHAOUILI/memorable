export interface Staff {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Data needed to create a new staff account.
export interface NewStaff {
  title: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
}
