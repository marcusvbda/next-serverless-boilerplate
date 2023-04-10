import type { NextRequest } from 'next/server'
import { keycloakMiddleware } from './middlewares/KeycloakMiddleware/index';

//all rules must start with a slash
const publicRoutes = [
  "/",
  "/api/auth/keycloak-callback",
]


const middleware = async (req: NextRequest) => await keycloakMiddleware(req, publicRoutes)
export default middleware;
