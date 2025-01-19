import { Router } from "express";
import { getCourses, getFinishedCourses, getLevelLessons, getFirstLessonWords, getCourseSentence, getThirdLesson, getSecondLessonWords, updateLesson } from "../controllers/courseController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/main", requireAuth(), getCourses);
router.get("/main/finished", requireAuth(), getFinishedCourses);
router.get("/main/course/:userLevel/", requireAuth(), getLevelLessons);
router.get("/main/firstLessonWords/:userLevel/:course", requireAuth(), getFirstLessonWords);
router.get("/main/secondLessonWords/:userLevel/:course", requireAuth(), getSecondLessonWords);
router.get("/main/secondLessonSentence/:userLevel/:course", requireAuth(), getCourseSentence); /////
router.get("/main/thirdLesson/:userLevel/:course", requireAuth(), getThirdLesson);             
router.patch("/main/course/:userLevel/:course", requireAuth(), updateLesson);

export default router;