export default class Menu {
  constructor(id, menu) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.day = days[new Date().getDay()];
    this.date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    this.time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    this.id = id;
    this.menu = menu;
  }
}
