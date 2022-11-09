module.exports.adminDashboard = (req, res) => {
    return res.render('admin_dashboard',{
        title: "Admin dashboard",
    })
}

module.exports.employeeDashboard = (req, res) => {
    return res.render('employee_dashboard',{
        title: "Employee dashboard",
    })
}