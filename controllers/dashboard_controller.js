const User = require('../models/user');

module.exports.adminDashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // populate all users
      let users = await User.find({}).populate('username');

      // filter logged in user
      let filteredUsers = users.filter((user) => user.email !== req.user.email);

      return res.render('admin_dashboard', {
        title: 'Admin dashboard',
        users: filteredUsers,
      });
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};

module.exports.employeeDashboard = (req, res) => {
  return res.render('employee_dashboard', {
    title: 'Employee dashboard',
  });
};
