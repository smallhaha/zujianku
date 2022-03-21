// 根据iframe的src获取显示对应的id searchName
// 页面模块共同类名 classname
function show(searchName, classname) {
    var propId = searchName
    $('#' + propId).show().siblings(classname).hide()
}