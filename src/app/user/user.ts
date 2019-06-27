export class User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: {
      mobile: string;
      work: string;
    }
  }