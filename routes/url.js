import { Router } from 'express';
import { handleGenerateShortUrl,handleRedirect,handleGetAnalytics,handleDelete } from '../controllers/url.js';
const router = Router();

router.get("/:shortURL",handleRedirect);
router.get("/analytics/:shortURL",handleGetAnalytics);
router.post("/", handleGenerateShortUrl);
router.delete("/:shortURL",handleDelete);

export default router;
