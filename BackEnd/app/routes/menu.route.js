const express = require("express");
const menu = require("../controllers/menu.controller");

const multer  = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
      const originalname = file.originalname;
      const filename = originalname.replace(/\s+/g, '-');

      cb(null, filename)
      console.log(filename);
    }
  })    
const upload = multer({ storage });
const router = express.Router();

router.route("/category")
    .get(menu.findAllCategory)
    .post(menu.createCategory)
    .delete(menu.deleteCategory);
    
router.route("/category/:id")
    .get(menu.findOneCategory)
    .put(menu.updateCategory)
    .delete(menu.deleteCategory);

router.route("/")
    .get(menu.findAll)
    .post(upload.single("image"), menu.create)
    // .post(menu.create)
    .delete(menu.deleteAll);


router.route("/:id")
    .get(menu.findOne)
    .put(upload.single("image"), menu.update)
    .delete(menu.delete);

module.exports = router;