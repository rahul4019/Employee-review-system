const User = require('../models/user');
const Review = require('../models/review');

module.exports.assignReview = async (req, res) => {
  const { recipient_email } = req.body;
  try {
    if (req.isAuthenticated()) {
      const reviewer = await User.findById(req.params.id);
      const recipient = await User.findOne({ email: recipient_email });

      // update reviewer's reviewByMe field by putting reference of recipient
      await reviewer.updateOne({
        $push: { reviewsByMe: recipient },
      });
      req.flash('success', `review assigned successfully!`);
      return res.redirect('back');
    }
  } catch (err) {}
};
