import userDatabase from '../database/userDatabase';

class User {
  constructor() {
    this.fullName = '';
    this.email = '';
    this.phoneNumber = null;
    this.password = '';
    this.role = 'user';
    this.companyName = '';
    this.location = '';
    this.ifUserExist = false;
  }
  createUser(fullName, email, phoneNumber, password) {
    let userExist = false;
    userDatabase.data.forEach((user) => {
      if (user.email === email) {
        userExist = true;
      }
    });

    if (userExist) {
      return userExist;
    }

    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    userDatabase.data.push({
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      role: this.role,
      companyName: this.companyName,
      location: this.location,
    });

    return userDatabase.data;
  }
  loginUser(email, password) {
    let user = '';
    userDatabase.data.forEach((checkUser) => {
      if ((checkUser.email === email) && (checkUser.password === password)) {
        user = checkUser;
        this.ifUserExist = true;
      }
    });
    if (this.ifUserExist === false) {
      return this.ifUserExist;
    }
    this.ifUserExist = false;
    return user;
  }
}

export default new User();
