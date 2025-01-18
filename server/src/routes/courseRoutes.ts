import { Router } from "express";
import { getCourses, getFinishedCourses, getCourseLessons, updateLesson, getLevelLessons, getCourseWords } from "../controllers/courseController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/main", requireAuth(), getCourses);
router.get("/main/finished", requireAuth(), getFinishedCourses);
router.get("/main/course/:userLevel/", requireAuth(), getLevelLessons);
router.get("/main/course/:userLevel/:course", requireAuth(), getCourseLessons);
router.get("/main/courseWords/:userLevel/:course", requireAuth(), getCourseWords);
router.patch("/main/course/:userLevel/:course", requireAuth(), updateLesson);

export default router;
