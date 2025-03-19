export class User {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  zipCode: number | string = '';
  city: string = '';
  birthDate: number | string | Date = ''; // Allow birthDate to be either a number or a Date
  street: string = '';
  id: string = '';

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      zipCode: this.zipCode,
      city: this.city,
      birthDate:
        this.birthDate instanceof Date
          ? this.birthDate.getTime()
          : this.birthDate, // Ensure birthDate is serialized as a number
      street: this.street,
      id: this.id,
    };
  }
}
