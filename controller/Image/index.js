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

router.post("/upload", async function (req, res) {
  console.log(req.body);
  try {
   
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/", async function (req, res) {});

router.delete("/", async function (req, res) {});

export default router;
