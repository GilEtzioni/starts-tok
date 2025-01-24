import { Router } from "express";
import { getCourses, getFinishedCourses, getLevelLessons, getFirstLessonWords, updateLesson, getSecondLesson, getThirdLesson } from "../controllers/courseController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/main", requireAuth(), getCourses);
router.get("/main/finished", requireAuth(), getFinishedCourses);
router.get("/main/course/:userLevel/", requireAuth(), getLevelLessons);
router.get("/main/firstLessonWords/:course", requireAuth(), getFirstLessonWords);
router.get("/main/secondLesson/:course", requireAuth(), getSecondLesson);
router.get("/main/thirdLesson/:course", requireAuth(), getThirdLesson);             
router.patch("/main/course/:userLevel/:course", requireAuth(), updateLesson);

export default router;