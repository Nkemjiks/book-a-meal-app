export default class User {
  constructor(id, fullName, email, phoneNumber, password) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.role = 'user';
    this.companyName = '';
    this.location = '';
  }
}
