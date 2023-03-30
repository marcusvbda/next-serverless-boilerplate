import type { NextRequest } from 'next/server'
import { DefaultMiddleware } from '@/core/auth';
import publicRoutes from "@/config/public_routes";

const middleware = async (request: NextRequest) => DefaultMiddleware(request, publicRoutes);
export default middleware;