import { loginRequest, refreshUserInfo, userLogin } from "@/api/user";
import pinia from "@/store";
import { defineStore } from "pinia";

export const useUserStoreHook = defineStore("userInfo", {
  state: () => ({
    username: "admin",
    password: "123456",
    accessToken: "",
    roles: ["admin"],
  }),
  getters: {},
  actions: {
    storeUserLogin(data: loginRequest) {
      userLogin(data).then((res) => {
        this.username = res.username;
        this.accessToken = res.accessToken;
        this.roles = res.roles;
        return res;
      });
    },
    storeRefreshToken() {
      if (this.accessToken) {
        refreshUserInfo({ accessToken: this.accessToken }).then((res) => {
          this.accessToken = res.accessToken;
          this.username = res.username;
          this.roles = res.roles;
        });
      }
    },
  },
  persist: {
    key: "userInfo",
    storage: localStorage,
    pick: ["username", "accessToken", "roles"],
  },
});
export function useUserStore() {
  return useUserStoreHook(pinia);
}
