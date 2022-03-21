import service from '../until/request'
import { ref, computed, onMounted, reactive } from 'vue'
import Clipboard from "clipboard";
import { Message } from "@arco-design/web-vue";
import $ from 'jquery' //在需要使用的页面中

// 获取 json
const getData = (url, params) => {
  return service.request(url, {
    params
  })
}
// 格式化xml数据
// fragment 返回xml片段
// element 提取元素名称
const formatData = (fragment, element) => {
  const formatArr = []
  let elementList = $(fragment).find(element)
  if (elementList) {
    elementList.each(function (index, item) {
      let obj = {
        name: '',
        childXml: [
        ]
      }
      if ($(item).attr("name")) {
        obj.name = $(item).attr("name")
        let itemobj = $(item).find('code')
        itemobj.each(function (i, childItem) {
          if ($(childItem).attr("name")) {
            obj.childXml.push({
              title: $(childItem).attr("name"),
              code: $(childItem).html()
            })
          } else {
            return
          }
        })
        formatArr.push(obj)
      }
    })
  } else {
    formatArr = []
  }

  return formatArr
}

// 获取xml
// filePath  本地xml路径
// element 获取类型
const readXML = (filePath, element) => {
  let xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {// IE
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.open('GET', filePath, false);
  xhr.overrideMimeType('text/html;charset=utf-8');
  xhr.send(null);
  // console.log(xhr.responseText.replace(/\s*/g, ""))
  let div = document.createElement("div");
  if (typeof xhr.responseText === "string") div.innerHTML = xhr.responseText;
  return formatData(div, element + 'Code codeFragment')
}

// 拷贝功能能
// type 值 Html CSS JS
// newcodeList 需拷贝的内容列表
const copy = function (e, type, newcodeList) {
  var text = "";
  if (newcodeList.length > 0) {
    for (let i = 0; i < newcodeList.length; i++) {
      if (type == newcodeList[i].title) {
        text = newcodeList[i].code;
      }
    }
    const clipboard = new Clipboard(e.target, { text: () => text });
    clipboard.on("success", (e) => {
      Message.success("复制成功");
      // 释放内存
      clipboard.off("error");
      clipboard.off("success");
      clipboard.destroy();
    });
    clipboard.on("error", (e) => {
      // 不支持复制
      Message.warning("该浏览器不支持自动复制");
      // 释放内存
      clipboard.off("error");
      clipboard.off("success");
      clipboard.destroy();
    });
    clipboard.onClick(e);
  }
}


// 页面内容获取公共函数 type类型，根据哪个页面路由
const getConTentList = function (type, list) {
  const newType = ref(type)
  let ConTentList = reactive({})
  let newResultList = list
  newResultList.map(function (item) {
    if (newType.value == item.typeTag) {
      return ConTentList.value = item
    }
  })
  return {
    ConTentList
  }
}


export {
  getData,
  copy,
  getConTentList,
  readXML
}
