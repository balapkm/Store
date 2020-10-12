import { Router } from 'express';
import routes from '@shared/routes';

// Init router and path
const router = Router();

// Add Dynamaic routes
routes.forEach((route) => {
    router.post(route.path, route.module.callModule.bind(route.module));
})

// Export the base-router
export default router;
