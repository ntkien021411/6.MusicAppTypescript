import { Router} from "express";
import * as controller from "../../controllers/client/favoriteSong.controller"

const router: Router = Router();

router.get("/", controller.index);

export const favoriteSongRoutes: Router = router;
