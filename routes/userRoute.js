const express = require('express');
const { registerUser, loginUser, logoutUser, getUserDetails, forgotPassword, resetPassword, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get( getUserDetails);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/password/update').put( updatePassword);

router.route('/me/update').put( updateProfile);

router.route("/admin/users").get( authorizeRoles("admin"), getAllUsers);

router.route("/admin/user/:id")
    .get( authorizeRoles("admin"), getSingleUser)
    .put( authorizeRoles("admin"), updateUserRole)
    .delete( authorizeRoles("admin"), deleteUser);

module.exports = router;
