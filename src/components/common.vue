<template>
  <div class="mode_cont">
    <h1 class="article_title">{{ pageContent.title }}</h1>
    <div class="article_description">
      {{ pageContent.content }}
    </div>
    <div class="article_content">
      <section
        class="code_blok"
        v-for="(item, index) in pageContent.child"
        :key="item"
        :id="item.herf"
      >
        <h2>{{ item.title }}</h2>
        <div v-if="item.cont.length > 0">
          <p v-for="itemp in item.cont" :key="itemp">{{ itemp }}</p>
        </div>
        <p>
          {{ item.codeFlag }}
        </p>
        <div v-if="item.codeFlag">
          <div class="cell_demo">
            <iframe
              name="iframeMap"
              id="iframeMapViewComponent"
              :src="item.codeStyle"
              width="100%"
              height="100%"
              frameborder="0"
              scrolling="no"
              ref="iframeDom"
            ></iframe>
          </div>
          <div class="cell_code">
            <div class="cell_code_operation">
              <div
                class="cell_code_icon"
                v-for="(itemImg, i) in imgArr"
                :key="itemImg.key"
                @click="handleSwitch($event, itemImg.type, index, i)"
              >
                <a-tooltip :content="itemImg.content">
                  <div class="img_all" v-if="itemImg.type == 'open'">
                    <img
                      :src="itemImg.defaultImg"
                      v-if="!item.codeTagList[i].flag"
                      alt=""
                    />
                    <img :src="itemImg.clickImg" v-else alt="" />
                  </div>
                  <div
                    v-if="itemImg.type == 'Html'"
                    class="img_all Html_img"
                  ></div>
                  <div
                    v-if="itemImg.type == 'CSS'"
                    class="img_all Css_img"
                  ></div>
                  <div v-if="itemImg.type == 'JS'" class="img_all Js_img"></div>
                </a-tooltip>
              </div>
            </div>
            <div class="cell_code_content" v-show="item.codeShow">
              <p class="cell_edition">代码版本：jQurery EasyUI 1.4.5</p>
              <div class="code_content">
                <a-tabs type="line">
                  <a-tab-pane
                    v-for="itemtab in xml[index].childXml"
                    :key="itemtab.title"
                    :title="itemtab.title"
                  >
                    <div class="tab_cont">
                      <pre
                        v-highlight
                      ><code :class="itemtab.title">{{ itemtab.code }}</code></pre>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import velocity from "velocity-animate";
import { copy, getConTentList, getData, readXML } from "../until/api";
import {
  inject,
  ref,
  onMounted,
  watch,
  toRefs,
  computed,
  watchEffect,
  reactive,
  toRef,
  onBeforeUpdate,
  onUpdated,
} from "vue";
import $ from "jquery"; //在需要使用的页面中
export default {
  components: {
  },
  props: {
    typeRouter: String,
  },
  data() {
    return {};
  },

  methods: {
    beforeEnter: function (el) {
      el.style.height = 0;
    },
    enter: function (el, done) {
      console.log("enter");
      var realHeight = 500 + "px";
      el.style.height = realHeight;
    },
    leave: function (el, done) {
      console.log("leave");
      el.style.height = 0;
    },
  },
  setup(props, context) {
    // 操作按钮icon
    const imgArr = reactive([
      {
        key: 1116,
        content: "展开代码",
        type: "open",
        defaultImg: "/static/image/icon/CodePutAway.svg",
        clickImg: "/static/image/icon/CodePutAwayClick.svg",
      },
      {
        key: 1117,
        type: "Html",
        content: "复制HTML",
      },
      {
        key: 1118,
        type: "CSS",
        content: "复制CSS",
      },
      {
        key: 1119,
        type: "JS",
        content: "复制JS",
      },
    ]);

    let type = props.typeRouter;
    // let pageContent = reactive({});
    let a = ref("");
    let resultList = reactive([]);
    let pageContent = ref("");
    let obj = reactive({});
    let xml = ref("");

    // 获取页面数据
    const dataC = function (type, arr) {
      const { ConTentList } = getConTentList(type, arr);
      obj = ConTentList;
      pageContent.value = obj.value;
      // 获取展示代码数据
      xml.value = readXML("/static/xml/codeList.xml", type);
    };
    const dataFun = (type) => {
      getData("/static/json/dataJson.json").then((res) => {
        dataC(type, res);
      });
    };
    // 监听数据 父组件传递的prop是否改变
    watchEffect(() => {
      dataFun(props.typeRouter);
      // dataC(props.typeRouter);
    });

    // 数据更新
    onUpdated(() => {
      // dataC(props.typeRouter);
    });

    const handleSwitch = function (e, type, key, i) {
      var newcodeList = xml.value[key].childXml;
      switch (type) {
        case "open":
          {
            pageContent.value.child[key].codeTagList[i].flag = !pageContent
              .value.child[key].codeTagList[i].flag;
            pageContent.value.child[key].codeShow = !pageContent.value.child[
              key
            ].codeShow;
            if (pageContent.value.child[key].codeTagList[i].flag) {
              pageContent.value.child[key].codeTagList[i].content = "收起代码";
            } else {
              pageContent.value.child[key].codeTagList[i].content = "展开代码";
            }
            break;
          }
          复制icon;
        case "Html": {
          copy(e, type, newcodeList);
          break;
        }
        case "CSS": {
          copy(e, type, newcodeList);
          break;
        }
        case "JS": {
          copy(e, type, newcodeList);
          break;
        }
      }
    };

    return {
      pageContent,
      handleSwitch,
      imgArr,
      xml,
    };
  },
};
</script>

<style>
.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: auto;
  color: black;
  direction: ltr;
}
.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>