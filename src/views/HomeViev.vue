<template>
  <!-- 组件库homeview首页 -->
  <div class="layout-demo">
    <a-layout>
      <a-layout-header>
        <a-row class="grid-demo">
          <a-col :span="12">
            <div class="grid_head">
              <img src="../assets/image/logo.svg" alt="avatar" />
              <!-- <a-image width="100px" src="../assets/image/logo.svg"></a-image> -->
            </div>
          </a-col>
          <a-col :span="12">
            <div class="grid_head">
              <div class="menu-demo">
                <a-menu
                  mode="horizontal"
                  :default-selected-keys="defaultKy"
                  @menu-item-click="handleMenu"
                >
                  <div class="hover_menu">
                    <a-dropdown trigger="hover">
                      <a-button
                        style="background: transparent; padding: 0; color: #333"
                        >设计</a-button
                      >
                      <template #content>
                        <a-doption>设计一</a-doption>
                        <a-doption>设计二</a-doption>
                      </template>
                    </a-dropdown>
                  </div>
                  <a-menu-item key="HomeLay">基础组件</a-menu-item>
                  <a-menu-item key="AboutLay">关于</a-menu-item>
                  <a-badge :max-count="10" :count="9" :offset="[-10, -1]">
                    <IconNotification
                      :style="{
                        color: '#333',
                        fontSize: '20px',
                        padding: '0 12px',
                        verticalAlign: '-11px',
                      }"
                    />
                  </a-badge>
                </a-menu>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { IconSettings, IconNotification } from "@arco-design/web-vue/es/icon";
export default {
  components: {
    IconNotification,
    IconSettings,
  },
  data() {
    return {
      defaultKy: ["HomeLay"],
    };
  },
  mounted() {
    if (this.$route.path == "/") {
      this.defaultKy[0] = "HomeLay";
      this.handleMenu("HomeLay");
    } else {
      if (localStorage.getItem("localname")) {
        if (localStorage.getItem("localname") == "HomeLay") {
          this.defaultKy[0] = "HomeLay";
        } else {
          this.defaultKy[0] = localStorage.getItem("localname");
          this.handleMenu(localStorage.getItem("localname"));
        }
      } else {
        this.defaultKy[0] = "HomeLay";
        this.handleMenu("HomeLay");
      }
    }
  },
  methods: {
    handleMenu(key) {
      if (key != "DesignLay") {
        if (key == "HomeLay") {
          if (!(localStorage.getItem("localname") == "HomeLay")) {
            this.$router.replace({
              path: "/HomeLay",
            });
          } else if (this.$route.path == "/") {
            this.$router.replace({
              path: "/HomeLay",
            });
            localStorage.setItem("menuname", 'input')
          }
        } else {
          if (!(localStorage.getItem("localname") == key)) {
            this.$router.push({
              path: key,
            });
          }
        }
        localStorage.setItem("localname", key);
      }
    },
  },
};
</script>

<style scoped>
/* .layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
} */
.layout-demo :deep(.arco-layout-content) {
  padding-top: 60px;
}
.layout-demo {
  height: 100vh;
  font-size: 12px;
  font-family: "PingFangSC-Regular", "Microsoft YaHei";
  /* height: 100vh;
  overflow: hidden; */
}

.layout-demo :deep(.arco-layout-header) {
  /* background-color: var(--color-primary-light-4); */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  color: #333;
  padding: 0 16px;
}
.layout-demo :deep(.arco-row),
.layout-demo :deep(.arco-col) {
  height: 100%;
}

/* .layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
} */

.grid_head {
  display: flex;
  align-items: center;
  height: 100%;
}
.menu-demo {
  box-sizing: border-box;
  width: 100%;
}
.menu-demo :deep(.arco-menu-overflow-wrap) {
  display: flex;
  justify-content: end;
}
.hover_menu {
  position: absolute;
  right: 230px;
}
</style>