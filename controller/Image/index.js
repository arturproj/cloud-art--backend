import express from "express";
import multer from "multer";

var router = express.Router();

const upload = multer({ dest: "uploads/" });

function middleware(req, res, next) {
  console.log("middleware", req.body, req.files);

  return multipart();
}

router.get("/:id", async function (req, res) {});

router.get("/", async function (req, res) {});

router.post("/", upload.single("picture"), async function (req, res) {
  console.log(req.body, req.file, req.files);
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    }

    console.log(req.files);
    // //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    // let avatar = req.files.avatar;

    // //Use the mv() method to place the file in upload directory (i.e. "uploads")
    // avatar.mv("./uploads/" + avatar.name);

    // //send response
    // res.send({
    //   status: true,
    //   message: "File is uploaded",
    //   data: {
    //     name: avatar.name,
    //     mimetype: avatar.mimetype,
    //     size: avatar.size,
    //   },
    // });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/", async function (req, res) {});

router.delete("/", async function (req, res) {});

export default router;
