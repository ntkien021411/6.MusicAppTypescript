import { Router} from "express";
import * as controller from "../../controllers/admin/song.controller"
import multer from "multer";
const upload = multer();
import * as uploadCloud from "../../middlewares/admin/uploadImageCloud.middleware";

const router: Router = Router();

router.get("/", controller.index);

router.get("/create", controller.createPage);

router.post("/create"
,upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }])
,uploadCloud.uploadFields
,controller.create);

export const songRoutes: Router = router;
