// 对数组进行去重
function uniqArray(arr) {
    if (arr.length === 0) {
        return []
    }
    var newarr = []
    newarr[0] = arr[0]
    for (i in arr) {
        var a
        for (j in newarr) {
            if (newarr[j] === arr[i]) {
                a = 0
                break 
            } else {
                a = 1
                continue 
            }
        }
        if (a == 1) {
            newarr.push(arr[i])
        }
    }
    return newarr
}

// 增加一个newClassName样式
function addClass(element, newClassName) {
    if (element.getAttribute("class")) {
        var classname = element.getAttribute("class")
        newname = classname + " " + newClassName
        element.setAttribute("class", newname)
    } else {
        element.setAttribute("class", newClassName)
    }
}


// 移除样式oldClassName
function removeClass(element, oldClassName) {
    var classname = element.getAttribute("class")
    var len = oldClassName.length //字符长度
    //console.log(classname, oldClassName)

    var start = classname.indexOf(oldClassName)
    classname = (classname.replace(classname.slice(start, start+len), "")).trim()
    classname = classname.replace("  ", " ")
    element.setAttribute("class", classname)
}
