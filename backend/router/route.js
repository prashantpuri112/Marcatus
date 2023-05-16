import { Router } from "express";
import upload from "../uploads/upload.js"
import uploadData from "../uploads/uploadData.js"
const router = Router();

/** import all controllers */
import * as stockDataController from '../controllers/stockDataController.js';
import * as controller from '../controllers/appController.js';
import * as newsController from '../controllers/newsController.js'
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';

// Market Data from stored MongoDB
router.route('/market-summary').get(stockDataController.marketSummary)
router.route('/forex').get(stockDataController.forex)


/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

/** GET Methods */
router.route('/user/:email').get(controller.getUser) // user with username

router.route('/user').get(controller.getUserByToken) // get user details via token

router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password
router.route('/changePassword').put(Auth, controller.changePassword); // use to reset password

// Admin CRUD for news posts
router.route('/createNews').post(newsController.verifyAdmin, upload.single('image'), newsController.createNews) // create news post
router.route('/news').get(newsController.getNews) // get single news post
router.route('/news/:slug').get(newsController.getSingleNews) // get single news post
router.route('/updateNews/:slug').put(newsController.verifyAdmin, upload.single('image'), newsController.updateNews) // update news post
router.route('/deleteNews/:slug').delete(newsController.verifyAdmin, newsController.deleteNews) // delete news post

router.route('/extract-data').post(newsController.verifyAdmin, uploadData.single('file'), stockDataController.ExtractData) // extract data


// Stock comparison
router.route('/stock-data').get(stockDataController.StockData) // extract data


// PMS route
router.route('/add-portfolio').post(Auth, stockDataController.addPortfolio)
router.route('/my-portfolio').get(Auth, stockDataController.myPortfolio)
router.route('/individual-portfolio').get(Auth, stockDataController.individualPortfolio)
router.route('/delete-portfolio').delete(Auth, stockDataController.deletePortfolio)


export default router;