// Filter the user details that are returned after signing up
const filterUserDetail = user => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  address: user.address,
});

// Filter the menu details that is displayed to users
const filterMenuDetails = menu => ({
  id: menu.id,
  date: menu.date,
  catererId: menu.userId,
  meals: menu.meals,
  caterer: menu.user,
});

export {
  filterUserDetail,
  filterMenuDetails,
};
