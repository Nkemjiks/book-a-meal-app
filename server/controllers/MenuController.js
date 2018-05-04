// import Menu from '../models/menu';

// const MenuController = {
//   createMenu(req, res) {
//     const { id } = req.params;
//     if (isNaN(id)) {
//       return res.status(404).send({ message: 'Provide a valid meal id' });
//     }

//     const createdMenu = Menu.create(id);
//     if (createdMenu === false) {
//       res.status(404).send({ message: 'Meal not found' });
//     }
//     return res.status(201).send({ message: 'Menu created successfully', data: createdMenu });
//   },
//   getMenu(req, res) {
//     const todayMenu = Menu.getMenu();
//     return res.status(200).send({ data: todayMenu });
//   },
// };

// export default MenuController;
