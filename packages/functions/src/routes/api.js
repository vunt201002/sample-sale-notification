import Router from 'koa-router';
import * as sampleController from '../controllers/sampleController';
import {verifyRequest} from '@avada/shopify-auth';

const router = new Router({
  prefix: '/api'
});

router.use(verifyRequest());

router.get('/samples', sampleController.exampleAction);

export default router;
