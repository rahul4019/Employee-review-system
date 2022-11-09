const User = require('../models/user');

// render the sign in page
module.exports.signIn = (req, res) => {
  return res.render('user_sign_in', {
    title: 'Review system | Sign In',
  });
};

// render the sign up page
module.exports.signUp = (req, res) => {
  return res.render('user_sign_up', {
    title: 'Review system | Sign Up',
  });
};

// get Sign Up data
module.exports.create = async (req, res) => {
  try {
    const { username, email, password, confirm_password, role } = req.body;

    // if password doesn't match
    if (password != confirm_password) {
      req.flash('error', 'Password and Confirm password are not same');
      return res.redirect('back');
    }

    // check if user already exist
    User.findOne({ email }, async (err, user) => {
      if (err) {
        console.log('Error in finding user in signing up');
        return;
      }

      if (!user) {
        await User.create(
          {
            email,
            password,
            username,
            role,
          },
          (err, user) => {
            if (err) {
              req.flash('error', "Couldn't sign Up");
            }
            req.flash('success', 'Account created!');
            return res.redirect('/');
          }
        );
      } else {
        req.flash('error', 'Email already registed!');
        return res.redirect('back');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  req.flash('success', 'Logged in successfully');
  if (req.user.role === 'admin') {
    return res.redirect('/admin-dashboard');
  }
  return res.redirect('/employee-dashboard');
};

// clears the cookie
module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logged out successfully!');
    return res.redirect('/');
  });
};
