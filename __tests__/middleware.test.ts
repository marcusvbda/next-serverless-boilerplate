import {isPublicRoute} from "@/middlewares/KeycloakMiddleware/routeMatcher";

describe('Route Validator Tests', () => {
  const publicRoutes = [
    "/products/list",
    "/products/xyz",
    "/products/test/*",

    "/users/:id",
    "/users/:id/edit",

    "/posts/:id/*",
  ]

  it('should accept any route', () => {
    expect(isPublicRoute("/products/list", ["/*"])).toBe(true)
    expect(isPublicRoute("/test", ["/*"])).toBe(true)
    expect(isPublicRoute("/xyz/aas/z", ["/*"])).toBe(true)
  })

  it('should validate public routes without parameters and wildcard', () => {
    expect(isPublicRoute("/products/list", publicRoutes)).toBe(true)
    expect(isPublicRoute("/products/xyz", publicRoutes)).toBe(true)
    expect(isPublicRoute("/products/abc", publicRoutes)).toBe(false)
  })

  it('should validate public routes with wildcard and no parameters', () => {
    expect(isPublicRoute("/products/test", publicRoutes)).toBe(true)
    expect(isPublicRoute("/products/test/a", publicRoutes)).toBe(true)
    expect(isPublicRoute("/products/test/a/b", publicRoutes)).toBe(true)
    expect(isPublicRoute("/products/test/a/b/c", publicRoutes)).toBe(true)
    expect(isPublicRoute("/products/_test/a/b/c", publicRoutes)).toBe(false)
    expect(isPublicRoute("/products/_test/a", publicRoutes)).toBe(false)
    expect(isPublicRoute("/products/_test/a/b", publicRoutes)).toBe(false)
  })

  it('should validate public routes with parameters and without wildcard', () => {
    expect(isPublicRoute("/users/2/edit", publicRoutes)).toBe(true)
    expect(isPublicRoute("/users/2/editx", publicRoutes)).toBe(false)
  })

  it('should validate public routes with parameters and wildcard', () => {
    expect(isPublicRoute("/posts/1", publicRoutes)).toBe(true)
    expect(isPublicRoute("/posts/1/abc", publicRoutes)).toBe(true)
    expect(isPublicRoute("/posts/1/abc/teste", publicRoutes)).toBe(true)
    expect(isPublicRoute("/postx/1/abc/teste", publicRoutes)).toBe(false)
  })
})