const router = require("express").Router();
const controller = require("./controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

const upload = multer({ destination: "./uploads", storage: storage });
router
  .route("/generator")
  .get(controller.get)
  .post(upload.single("json"), controller.post);

router.route("/download").post(controller.download);
module.exports = router;
