import { RouteLocationNormalizedGeneric } from 'vue-router';

export function getBreadcrumbsByRoute(route: RouteLocationNormalizedGeneric, menus: any[]): any[] {
  const path = route.path as string;
  for (const menu of menus) {
    if (menu.path === path) {
      //如何找到当前路由，则返回当前菜单
      return [menu];
    }
    //如何没有遍历到当前路由，则递归遍历子菜单
    if (menu.children?.length) {
      // 递归获取面包屑路径
      const result = getBreadcrumbsByRoute(route, menu.children);
      // 如果有结果，则返回结果和当前菜单
      if (result.length > 0 && menu.path !== '/') {
        return [menu, ...result];
      } else if (result.length > 0) {
        return [...result];
      }
    }
  }

  return [];
}
