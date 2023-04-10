export const isPublicRouteWithoutParamAndWildCard = (route:string, publicRules:string[]):boolean => {
  return publicRules.includes(route);
}

export const isPublicRouteWithWildcard = (route:string, publicRules:string[]):boolean => {
  const rulesWithWildcard = publicRules.filter((rule) => rule.includes("*"));
  return rulesWithWildcard.some((rule) => {
    const normalizedRule = normalizeRoute(rule).replace(".*", "");
    return normalizeRoute(route).startsWith(normalizedRule);
  });
}

export const isPublicRouteWithParam = (route:string, publicRules:string[]):boolean => {
  const rulesWithParam = publicRules.filter((rule) => rule.includes(":"));
  return rulesWithParam.some((rule) => {
    const [_route,_rule] = normalizeParams(route, rule);
    return (isPublicRoute(_route,[_rule]))
  });
}

export const isPublicRoute = (route:string, publicRules:string[]):boolean => { 
  if(publicRules.find((rule) => rule === "/*")) return true;
  const _isPublicRouteWithoutParamAndWildCard = isPublicRouteWithoutParamAndWildCard(route, publicRules);
  const _isPublicRouteWithWildCard = isPublicRouteWithWildcard(route, publicRules);
  const _isPublicRouteWithParam = isPublicRouteWithParam(route, publicRules);

  return _isPublicRouteWithoutParamAndWildCard || _isPublicRouteWithWildCard || _isPublicRouteWithParam;
}

export const normalizeRoute = (route:string):string => {
  return route.split("/").filter((item) => item !== "").join(".");
}

export const normalizeParams = (route:string,rule:string):any => {
  let newRoute = []
  let newRules = []
  const splitedRule = rule.split("/")
  const splitedRoute = route.split("/")

  for(let i in splitedRoute) {
    if(splitedRule[i] === undefined) {
      newRoute.push(splitedRoute[i])
    } else {
      if(!(splitedRule[i] as any).includes(":")) {
        newRules.push(splitedRule[i])
        newRoute.push(splitedRoute[i])
      } else {
        newRules.push(splitedRoute[i])
        newRoute.push(splitedRoute[i])
      }
    }
  }
  return [newRoute.join("/"), newRules.join("/")]
}