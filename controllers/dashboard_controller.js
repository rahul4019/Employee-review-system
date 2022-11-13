const Review = require('../models/review');
const User = require('../models/user');

// Render admin dashboard
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

// Render employee dashboard
module.exports.employeeDashboard = async (req, res) => {
  try {
    // populate the employee with reviews assigned to it 
    const employee = await User.findById(req.params.id).populate(
      'assignedReviews'
    );

    // extract the reviews assigned to it
    const assignedReviews = employee.assignedReviews;

    // TODO: fix it 
    // populate reviews given from others
    const populatedResult = await Review.find().populate({
      path: 'reviewer',
      model: 'User',
    });


    return res.render('employee_dashboard', {
      title: 'Employee dashboard',
      employee,
      assignedReviews,
      reviewsGivenByothers: populatedResult,
    });
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
};
