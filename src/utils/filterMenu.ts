import { RouteRecordRaw } from 'vue-router';

export function filterMenu(menu: RouteRecordRaw[]): RouteRecordRaw[] {
  return menu
    .filter((item) => item.meta?.isShow !== false)
    .map((item) => {
      if (item.children && item.children.length > 0) {
        item.children = filterMenu(item.children);
      }
      return item;
    });
}
