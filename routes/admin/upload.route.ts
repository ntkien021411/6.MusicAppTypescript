import { Router } from "express";
import * as controller from "../../controllers/admin/upload.controller";
import multer from "multer";
const upload = multer();
import * as uploadCloud from "../../middlewares/admin/uploadImageCloud.middleware";
const router: Router = Router();

router.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.index
);

export const uploadRoutes: Router = router;
