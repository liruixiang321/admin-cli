import { defineStore } from 'pinia';

export const useRouteStoreHooks = defineStore('route', () => {
  const breadcrumb = ref<string[]>([]);

  function setBreadcrumb(paths: string[]) {
    breadcrumb.value = paths;
  }
  return { breadcrumb, setBreadcrumb };
});
