const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const dashboardsController = require('../controllers/dashboard_controller');

router.get('/', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.get('/sign-out', usersController.destroySession);
router.get('/admin-dashboard', dashboardsController.adminDashboard);
router.get('/add-employee', usersController.addEmployee);
router.get('/employee-dashboard', dashboardsController.employeeDashboard);

router.post('/create', usersController.create);
router.post('/create-employee', usersController.createEmployee);

// use passport as middleware to authenticate
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/' }),
  usersController.createSession
);

module.exports = router;
