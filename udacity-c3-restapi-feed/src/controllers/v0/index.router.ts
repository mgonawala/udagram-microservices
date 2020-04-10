import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';

const router: Router = Router();

router.use('/feed', FeedRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`from version v2`);
});

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send(`OK`);
});

router.get('/probe', async (req: Request, res: Response) => {
    res.status(200).send(`OK`);
});
export const IndexRouter: Router = router;