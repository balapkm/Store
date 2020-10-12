/**
 * Modules
 */

import Store from '../routes/Store';

/**
 * List of routes
 */
const routes = [
    {
        path: '/store',
        module: Store
    },
    {
        path: '/store/create',
        module: Store,
        action: 'create'
    },
    {
        path: '/store/update',
        module: Store,
        action: 'update'
    },
    {
        path: '/store/search',
        module: Store,
        action: 'search'
    },
    {
        path: '/store/delete',
        module: Store,
        action: 'delete'
    }
];

export default routes;