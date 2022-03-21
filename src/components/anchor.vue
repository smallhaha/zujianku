<template>
  <div class="HomeLay_demo_right" :style="{ width: `${count}px` }">
    <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
      <div class="collapse_main">
        <div @click="onCollapse">
          <div class="collapse_right" v-if="collapsed">
            <IconLeft />
          </div>
          <div class="collapse" v-else>
            <IconRight />
          </div>
        </div>
      </div>
      <a-anchor :style="{ width: '200px' }">
        <a-anchor-link
          v-for="item in pageList.child"
          :key="item.herf"
          :href="'#' + item.herf"
          >{{ item.label }}</a-anchor-link
        >
      </a-anchor>
    </a-layout-sider>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  watch,
  watchEffect,
  reactive,
  onBeforeUpdate,
  onUpdated,
  inject,
} from "vue";
import {
  IconCaretRight,
  IconCaretLeft,
  IconRight,
  IconLeft,
} from "@arco-design/web-vue/es/icon";
export default {
  components: {
    IconCaretRight,
    IconCaretLeft,
    IconRight,
    IconLeft,
  },
  props: {
    typeAnchor: String,
  },
  setup(props) {
    let type = props.typeAnchor;
    let collapsed = ref("");
    let count = ref(200);
    let pageList = ref("");
    if (localStorage.getItem("collapsed")) {
      if (localStorage.getItem("collapsed") == 'true') {
        count.value = 0;
        collapsed.value = true;
      } else {
        count.value = 200;
        collapsed.value = false;
      }
    } else {
      collapsed.value = false;
    }
    // let pageContent = reactive({});
    let AnchorList = reactive({
      input: {
        key: "input",
        child: [
          {
            herf: "basic",
            label: "基本用法",
          },
          {
            herf: "line-less",
            label: "远程搜索输入框",
          },
        ],
      },
      select: {
        key: "select",
        child: [
          {
            herf: "basic",
            label: "基本用法",
          },
          {
            herf: "line-less",
            label: "可添加的下拉框",
          },
          {
            herf: "line-noseach",
            label: "无搜索可添加的下拉框",
          },
        ],
      },
      transfer: {
        key: "transfer",
        child: [
          {
            herf: "basic",
            label: "基本用法",
          },
          {
            herf: "standard",
            label: "标准穿梭框",
          },
          {
            herf: "addtransfer",
            label: "可添加穿梭框",
          },
          {
            herf: "nosearch",
            label: "无搜索穿梭框",
          },
          {
            herf: "nosearchadd",
            label: "无搜索可添加的穿梭框",
          },
          {
            herf: "treetransfer",
            label: "树形穿梭框",
          },
          {
            herf: "addtree",
            label: "树形可添加的穿梭框",
          },
        ],
      },
    });
    const anchorFun = (type) => {
      pageList.value = AnchorList[type];
      //   getData("/static/json/dataJson.json").then((res) => {
      //     dataC1(type, res);
      //   });
    };
    const onCollapse = function () {
      collapsed.value = !collapsed.value;
      localStorage.setItem("collapsed", collapsed.value);
      if (!collapsed.value) {
        count.value = 200;
      } else {
        count.value = 0;
      }
    };
    // 监听数据 父组件传递的prop是否改变
    watchEffect(() => {
      anchorFun(props.typeAnchor);
    });

    return {
      pageList,
      collapsed,
      count,
      onCollapse,
    };
  },
};
</script>

<style scoped>
.HomeLay_demo_right {
  width: 200px;
  transition: 0.2s;
}
.HomeLay_demo_right :deep(.arco-layout-sider-light) {
  box-shadow: none;
  position: fixed;
  right: 0px;
}
.HomeLay_demo_right :deep(.arco-anchor-link-active > .arco-anchor-link) {
  color: #c61d29;
}
.HomeLay_demo_right :deep(.arco-anchor-line-slider) {
  background-color: #c61d29;
}
.HomeLay_demo_right :deep(.arco-anchor-link-item .arco-anchor-link) {
  padding: 8px 20px;
}
.HomeLay_demo_right :deep(.arco-layout-sider-collapsed) {
  width: 0 !important;
}
.HomeLay_demo_right :deep(.arco-anchor-line-slider) {
  height: 20px;
}
.collapse_main {
  width: 100%;
  height: 34px;
}

.collapse_main::before {
  position: absolute;
  left: 0px;
  width: 2px;
  height: 34px;
  background-color: #e5e6eb;
  content: "";
}
.collapse {
  width: 20px;
  height: 20px;
  background-color: #ffaea9;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  z-index: 9999;
  right: 158px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  line-height: 20px;
  transition: 1s;
}
.collapse_right {
  width: 20px;
  height: 20px;
  background-color: #ffaea9;
  border-radius: 50%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  position: absolute;
  top: 4px;
  z-index: 9999;
  right: 0;
  text-align: center;
  font-size: 14px;
  color: #fff;
  transition: 1s;
  line-height: 20px;
}
</style>