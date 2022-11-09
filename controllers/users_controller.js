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
      console.log('error', 'Password and Confirm password are not same');
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
              console.log('error', err);
            }
            console.log('Account created!');
            return res.redirect('/');
          }
        );
      } else {
        console.log('error', 'Email already registed!');
        return res.redirect('back');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  console.log('Logged in successfully');
  return res.redirect('/');
};
