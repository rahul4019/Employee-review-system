// render the sign in page
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in',{
        title: "Review system | Sign In"
    })
}

// render the sign up page
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up',{
        title: "Review system | Sign Up"
    })
}