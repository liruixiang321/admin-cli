## 面包屑技术方案

### 实现思路1:参考大豆

- **时机**：在路由守卫中处理。

- **存储**：使用Store来存储面包屑数组。

- **逻辑**：
  1. 获取全部路由配置和当前路由信息。
  2. 将全部路由信息存入Store中。
  3. 通过深度优先遍历找到当前路由的所有上级路由。
  4. 将找到的上级路由转化为面包屑所需的数据格式，并存入Store中。

### 难点及解决方案

- **难点**：如何找到父级路由。

- **解决方案**：采用深度优先遍历算法，从根路由开始遍历，记录每个路由的父级关系，直到找到当前路由的所有上级路由。

### 代码实现

```ts
**
 * Transform menu to breadcrumb
 *
 * @param menu
 */
function transformMenuToBreadcrumb(menu: App.Global.Menu) {
  const { children, ...rest } = menu;

  const breadcrumb: App.Global.Breadcrumb = {
    ...rest
  };

  if (children?.length) {
    breadcrumb.options = children.map(transformMenuToBreadcrumb);
  }

  return breadcrumb;
}


/**
 * Get breadcrumbs by route
 *
 * @param route
 * @param menus
 */
export function getBreadcrumbsByRoute(
  route: RouteLocationNormalizedLoaded,
  menus: App.Global.Menu[]
): App.Global.Breadcrumb[] {
  const key = route.name as string;

  for (const menu of menus) {
    if (menu.key === key) {
      return [transformMenuToBreadcrumb(menu)];
    }
    if (menu.children?.length) {
      const result = getBreadcrumbsByRoute(route, menu.children);
      if (result.length > 0) {
        return [transformMenuToBreadcrumb(menu), ...result];
      }
    }
  }

  return [];
}

```

### 实现思路2:参考vben

-**时机**：在breadcrumb.vue中处理。

-**存储**：存储在breadcrumb.vue中。

-**逻辑**：

1. 获取全部路由配置和当前路由信息。
2. 通过深度优先遍历找到当前路由的所有上级路由。
3. 将找到的上级路由转化为面包屑所需的数据格式。
4. 将转换后的数据存入breadcrumb.vue中。

### 代码实现

```ts
export function getAllParentMenu(treeData: any[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return menuList || [];
}

export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {},
): T | T[] | null {
  config = getConfig(config);
  const path: T[] = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children!] && list.unshift(...node[children!]);
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

let matchedMenu = getAllParentMenu(menus, currentRoute.value.fullPath);
```

以上两种方案，我个人认为第二种比较合适一些，因为第一种方案，需要将全部路由信息存入Store中，代码分布在组件，store,和路由守卫中比较分散，而第二种只需要在breadcrumb.vue中处理即可，更加集中一些。虽然第1种方案将信息存在store中全局都可以使用，但一般的场景只会在面包屑组件中使用且全局只有一个面包屑组件。

<!--
前端是基于html+css+javascript,并使用bootStrap3.0框架进行开发。代码规范基于prettier来确保代码风格一致。项目创建完成，通过在终端中输入python manage.py runserver命令来启动本地服务器。将项目在本地环境中运行起来，便于进行源码的编写和调试。主要的源码编写工作将在biz文件夹的html文件中进行，您可以在这里使用bootStrap预定于义的css类和组件、jquery语法等来构建系统用户界面和逻辑。部署完成后，用户就可以通过访问服务器的地址来查看和使用本系统[9]。前端关键代码如图4 所示。 -->
