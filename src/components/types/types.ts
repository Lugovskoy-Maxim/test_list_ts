interface Name {
  first: string;
  last: string;
}

export interface Row {
  type: string;
  _id: string;
  amount: string;
  name: Name;
  company: string;
  email: string;
  phone: string;
  address: string;
}