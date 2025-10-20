import { authRouter } from '@/modules/auth/server/procedures';
import {  createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedure';
import { productsRouter } from '@/modules/products/server/procedure';
import { tagsRouter } from '@/modules/tags/server/procedure';
import { tenantRouter } from '@/modules/tenants/server/procedure';
export const appRouter = createTRPCRouter({
    auth: authRouter,
    tags: tagsRouter,
    categories : categoriesRouter,
    products: productsRouter,
    tenants: tenantRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;