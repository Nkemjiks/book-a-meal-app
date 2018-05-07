const filterUserDetail = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    address: user.address,
  };
};

export default filterUserDetail;
