<template>
  <div>
    <a-layout class="HomeLay_demo">
      <div class="HomeLay_demo_left">
        <a-layout-sider
          hide-trigger
          collapsible
          :style="{ width: '240px', marginBottom: '24px' }"
        >
          <ul class="Home_Nav">
            <li v-for="item in routerList" :key="item.key">
              <p class="Home_Nan_title">{{ item.label }}</p>
              <a-menu
                :default-selected-keys="defaultSelectKey"
                @menu-item-click="handleMenuChild"
                :style="{ width: `${width}px` }"
              >
                <a-menu-item v-for="i in item.child" :key="i.key"
                  >{{ i.label }}<span style="padding-left:4px">{{ i.title }}</span></a-menu-item
                >
              </a-menu>
            </li>
          </ul>
        </a-layout-sider>
      </div>
      <a-layout>
        <a-layout>
          <a-layout-content style="padding: 0 16px">
            <!-- <router-view /> -->
            <!-- 内容显示 -->
            <common ref="ChildU" :typeRouter="defaultAnchor" />
          </a-layout-content>
          <!-- 右侧锚点 -->
          <anchor-siderchild
            ref="ChildAnchor"
            :key="isReload"
            :typeAnchor="defaultAnchor"
          ></anchor-siderchild>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { computed, provide, ref } from "vue";
import TransferLay from "./TransferLay";
import common from "../components/common.vue";
import anchorSiderchild from "../components/anchor.vue";
export default {
  components: {
    TransferLay,
    common,
    anchorSiderchild,
  },

  watch: {
    defaultAnchor: function (newValue, old) {
      this.defaultAnchor = newValue;
    },
  },
  data() {
    return {
      isReload: new Date().getTime(),
      defaultOpenKey: ["dataInput"],
      defaultAnchor: "input",
      defaultSelectKey: ["input"],
      width: 240,
      routerList: [
        {
          key: "dataInput",
          label: "数据输入",
          child: [
            {
              key: "input",
              label: "输入框",
              title: "Input",
            },
            {
              key: "select",
              label: "选择器",
              title: "Select",
            },
            {
              key: "transfer",
              label: "数据穿梭框",
              title: "Transfer",
            },
          ],
        },
      ],
    };
  },

  //   // 组件内的守卫
  //   beforeRouteEnter(to, from, next) {
  //     console.log("想要进到setting页面了");
  //     next((vm) => {
  //       console.log(vm);
  //       vm.test = "修改后的数据";
  //     });
  //   },
  //   beforeRouteLeave(to, from, next) {
  //     console.log("从setting页面离开了");
  //   },
  mounted() {
    if (localStorage.getItem("menuname")) {
      this.defaultSelectKey[0] = localStorage.getItem("menuname");
    } else {
      if (this.$route.name == "HomeLay") {
        this.$router.push({
          path: "/HomeLay",
        });
      } else {
        this.defaultSelectKey[0] = this.$route.name;
      }
    }
    this.defaultAnchor = this.defaultSelectKey[0];
  },
  methods: {
    handleMenuChild(key) {
      // 点击当前菜单页面路由即组件不刷新
      if (localStorage.getItem("menuname") != key) {
        this.isReload = new Date().getTime();
        this.$router.replace({
          path: "/HomeLay",
        });
      }
      this.defaultAnchor = key;
      localStorage.setItem("menuname", key);

      //   menu

      //   this.$ref.Child.getData(key)
    },
  },
  beforeUnmount() {
    localStorage.removeItem("menuname");
  },
};
</script>

<style scoped>
.HomeLay_demo {
  /* background-color: rgb(var(--arcoblue-6)); */
  /* height: calc(100vh - 60px); */
  color: #333;
  /* overflow: hidden; */
  padding: 20px 0 0 0;
}
.HomeLay_demo :deep(.arco-layout-sider),
.HomeLay_demo :deep(.arco-layout-content) {
  height: 100%;
}
.HomeLay_demo :deep(.arco-layout-content) {
  overflow-y: auto;
}
.HomeLay_demo .HomeLay_demo_left {
  width: 240px;
}
.HomeLay_demo .HomeLay_demo_left :deep(.arco-layout-sider-light) {
  border-right: 1px solid #dbdee2;
  box-shadow: none;
  position: fixed;
  left: 0px;
  top: 80px;
}

.HomeLay_demo :deep(.arco-menu-vertical .arco-menu-inner) {
  padding: 0;
}
.HomeLay_demo :deep(.arco-menu-inline-header) {
  padding-left: 40px;
}
.HomeLay_demo :deep(.arco-menu-item) {
  padding-left: 60px;
}
.HomeLay_demo :deep(.arco-menu-light .arco-menu-item.arco-menu-selected) {
  /* background-color: var(--color-fill-2); */
  background-color: #f7e9ea;
  border-right: 3px solid #c61d29;
}
</style>