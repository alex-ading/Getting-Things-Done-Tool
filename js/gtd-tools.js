var body = document.getElementsByTagName("body")[0]
var addclass = document.getElementById("addclass") //新增分类按钮
var confirmadd = document.getElementsByClassName("confirmadd")[0] //确认新增分类的弹窗
var quitaddclass = document.getElementById("quitaddclass") //取消按钮
var confirmaddclass = document.getElementById("confirmaddclass") //确认按钮
var select = document.getElementsByTagName("select")[0] //下拉框
var newclassname = document.getElementById("newclassname") //文本框
var allclass = document.getElementsByClassName("class")[0] //最左栏所有分类，包括main和sub
var chosenclass = "" //记录被选中的分类 (可能是主，可能是子)
var allclasses = document.getElementsByClassName("allclasses")[0] //最左测包括main、sub、所有任务在内的div
var chosenclassinaddtask = "" //记录点击“新增任务”时选中的subclass，与chosenclass不同，点击“新增任务”后，chosenclass仍旧可能变，但是chosenclassinaddclass不会，是新增的任务的所属类

var addtask = document.getElementById("addtask") //新增任务按钮
var alltasks = document.getElementById("alltasks") //保存所有task的div
var doneornot = document.getElementsByClassName("doneornot")[0] //已完成、未完成、所有的div
var allbtn = doneornot.getElementsByTagName("span")[0] //所有选项
var unfinishedbtn = doneornot.getElementsByTagName("span")[1]
var finishedbtn = doneornot.getElementsByTagName("span")[2]
var chosenbtn = "" //标记被选中的按钮
var chosentask = "" //标记被选中的task
var taskstatus = document.getElementsByClassName("taskstatus")[0] //中间列

var startstatus = document.getElementsByClassName("startstatus")[0]
var editstatus = document.getElementsByClassName("editstatus")[0]
var updatestatus = document.getElementsByClassName("updatestatus")[0]
var quitedit = document.getElementById("quitedit") //取消新增任务按钮
var confirmedit = document.getElementById("confirmedit") //确定新增任务按钮
var quitupdate = document.getElementById("quitupdate") //取消修改任务按钮
var confirmupdate = document.getElementById("confirmupdate") //确定修改任务按钮
var rightshowntask = "" //记录第三栏展示的task
//var edittasktitle3 = document.getElementsByClassName("edittasktitle3")[0].firstChild.value
//var edittasktime = document.getElementsByClassName("edittasktime")[0].getElementsByTagName("input")[0].value
//var textarea = document.getElementsByTagName("textarea")[0].value
var taskcontent = document.getElementsByClassName("taskcontent")[0]

var backtaskstatus = document.getElementById("backtaskstatus")// 任务列表页返回按钮
var backtaskcontent = document.getElementById("backtaskcontent")// 任务详情页返回按钮

var storage = window.localStorage //存储在本地

//按照传入的tasks信息，在中间栏按日期显示task
function showTaskByDate(tasks) {
    if (tasks.length !== 0) {
        //将task按日期倒叙排列
        tasks.sort(function(a,b) {
            var date1 = new Date(Number(a.date.slice(0,4)), a.date.slice(5,7), a.date.slice(8)).getTime()
            var date2 = new Date(Number(b.date.slice(0,4)), b.date.slice(5,7), b.date.slice(8)).getTime()
            if (date1 > date2) {
                return -1
            } else {
                return 1
            }
        })

        //将日期保存起来并去重
        var datelist = [] 
        for (var z=0; z<tasks.length; z++) {
            datelist.push(tasks[z].date)
        }
        datelist = uniqArray(datelist)
        //console.log(datelist)
        
        for (var y=0; y<datelist.length; y++) {
            var taskdiv = document.createElement("div")
                taskdiv.setAttribute("class", "task")
                var date = document.createElement("p")
                date.innerHTML = datelist[y]
                date.setAttribute("class", "date")
                taskdiv.appendChild(date)
                alltasks.appendChild(taskdiv)            
            
            for (var l=0; l<tasks.length; l++) {
                if (tasks[l].date === datelist[y]) {
                    var tasktitle = document.createElement("p")
                    tasktitle.innerHTML = tasks[l].name
                    tasktitle.setAttribute("class", "tasktitle")
                    if (tasks[l].status) {
                        addClass(tasktitle, "true")
                    } else {
                        addClass(tasktitle, "false")
                    }
                    tasktitle.setAttribute("id", "tasktitle" + tasks[l].id)
                    taskdiv.appendChild(tasktitle)
                }

            }
        }
    }
}

function showClass() {
    var main = JSON.parse(storage.main)
    var sub = JSON.parse(storage.sub)
    var task = JSON.parse(storage.task)
    //处理所有任务
    var alltasksp = document.getElementsByClassName("allclasses")[0].getElementsByTagName("p")[0]
    alltasksp.innerHTML = "所有任务 (" + task.length + ")"
    console.log(main,sub,task)
    var mainclassnames = []
    var tasksums = []
    for (var i=0; i<main.length; i++) {
        //console.log(i)

        //处理主分类
        var theli = document.createElement("li")
        theli.setAttribute("id", "mainclass" + main[i].id)
        theli.setAttribute("class", "mainclass")
        theli.innerHTML = '<span><img src="img/folder.png" alt="folder">' + main[i].name + " (" + "" + ")" + '<img class="delete"  alt="delete" src="img/delete.png"></span>'
        allclass.appendChild(theli)
        mainclassnames.push(main[i].name)

        //处理子分类
        var subidlist = main[i].subid
        var theul = document.createElement("ul")
        //通过ul的class可知subclass的mainclass
        theul.setAttribute("class", "mainclass" + main[i].id)
        theli.appendChild(theul)
        var sum = 0
        if (subidlist.length !== 0) {
            for (var j=0; j<subidlist.length; j++) {
                for (var k=0; k<sub.length; k++) {
                    if (subidlist[j] === sub[k].id) {
                        if (sub[k].id != 0) {
                            //console.log(sub[k].id, subidlist[j])
                            var subli = document.createElement("li")
                            subli.setAttribute("id", "subclass" + sub[k].id)
                            subli.setAttribute("class", "subclass")
                            subli.innerHTML = '<span><img src="img/task.png" alt="task">' + sub[k].name + " (" + sub[k].taskid.length + ")" + '<img class="delete" src="img/delete.png" alt="delete"></span>'
                            theul.appendChild(subli)
                            //console.log(sub[k].name)
                            sum += sub[k].taskid.length
                            //console.log(sum)
                            break
                        } else {
                            //console.log(sub[k].id, subidlist[j])
                            var subli = document.createElement("li")
                            subli.setAttribute("id", "subclass" + sub[k].id)
                            subli.setAttribute("class", "subclass")
                            subli.innerHTML = '<span><img src="img/task.png">' + sub[k].name + " (" + sub[k].taskid.length + ")" + '</span>'
                            theul.appendChild(subli)
                            //console.log(sub[k].name, sub[k].taskid.length)
                            sum += sub[k].taskid.length
                            //console.log(sum)
                            break
                        }
                    }
                }
            }
        tasksums.push(sum)
        //console.log(i, sum)
        //console.log(tasksums)
        } else {
            tasksums.push(sum)
        }
    }
    var mainclasses = document.getElementsByClassName("mainclass")
    //console.log(mainclasses.length)
    for (var l=0; l<mainclasses.length; l++) {
        var thespan = mainclasses[l].getElementsByTagName("span")[0]
        if (l === 0) {
            thespan.innerHTML = '<img src="img/folder.png">' + mainclassnames[l] + " (" + tasksums[l] + ")"
        } else {
            //console.log(l,tasksums[l])
            thespan.innerHTML = '<img src="img/folder.png">' + mainclassnames[l] + " (" + tasksums[l] + ")" + '<img class="delete" src="img/delete.png" alt="delete">'
        }
    }
}

function intialData() {
    if (!storage.main) {
        var main = [{
            id: 0,
            name: "默认分类",
            subid: [0]
        }, {
            id: 3,
            name: "IFE",
            subid: [1, 5, 6]
        }]

        var sub = [{
            id: 0,
            mainid: 0,
            name: "默认子分类",
            taskid: [0, 1, 6]
        }, {
            id: 1,
            mainid: 3,
            name: "task0001",
            taskid: [3]
        }, {
            id: 5,
            mainid: 3,
            name: "task0002",
            taskid: [4, 5]
        }, {
            id: 6,
            mainid: 3,
            name: "task0003",
            taskid: []
        }]

        var task = [{
            id: 0,
            subid: 0,
            name: "使用指南",
            date: "2020-02-13",
            content: "<p>简易 GTD 工具</p><p>数据保存在本地</p>",
            status: false
        }, {
            id: 1,
            subid: 0,
            name: "学习css",
            date: "2020-02-14",
            content: "菜鸟教程 2h",
            status: true
        }, {
            id: 3,
            subid: 1,
            name: "学习BFC",
            date: "2020-02-14",
            content: "看 CSDN 相关博文",
            status: false
        }, {
            id: 4,
            subid: 5,
            name: "5个任务",
            date: "2020-02-06",
            content: "做完任务，部署到云端",
            status: false
        }, {
            id: 5,
            subid: 5,
            name: "学习事件代理",
            date: "2020-01-06",
            content: "学习并实践",
            status: true
        }, {
            id: 6,
            subid: 0,
            name: "完成 GTD",
            date: "2020-02-13",
            content: "做完任务，部署到云端",
            status: false
        }]
        storage.main = JSON.stringify(main)
        storage.sub = JSON.stringify(sub)
        storage.task = JSON.stringify(task)
    }
}

//初始化
function intialClassColumn() {
    var task = JSON.parse(storage.task)
    var main = JSON.parse(storage.main)

    console.log(main)
    //标记chosenbtn
    chosenbtn = allbtn
    showClass()

    //更新select
    for (var i=0; i<main.length; i++) {
        var option = document.createElement("option")
        option.innerHTML = main[i].name
        select.appendChild(option)
    }

    //console.log(tasksums, mainclassnames)
    //默认选中默认分类
    var defaultchosenclass = document.getElementsByClassName("mainclass")[0].getElementsByTagName("span")[0]
    chosenclass = defaultchosenclass
    defaultchosenclass.setAttribute("id", "chosenclass")
    
    //显示默认分类下任务列表
    var tasklist =[]
    for (var p=0; p<task.length; p++) {
        if (task[p].subid === 0) {
            tasklist.push(task[p])
        }
    }
    //console.log(tasklist)
    showTaskByDate(tasklist)
   
    //显示默认分类的第一个任务
    chosentask = document.getElementById("tasktitle0")
    rightshowntask = document.getElementById("tasktitle0")

    //consoleconsole.log(chosentask)
    document.getElementsByClassName("tasktitle3")[0].innerHTML = task[0].name
    document.getElementsByClassName("tasktime")[0].innerHTML = task[0].date
    document.getElementsByClassName("taskallcontent")[0].innerHTML = task[0].content
}

//与分类相关的事件
//点击分类切换背景颜色，显示中间任务
function chooseSubClass(event) {
    var main = JSON.parse(storage.main)
    var sub = JSON.parse(storage.sub)
    var task = JSON.parse(storage.task)  
    var target = event.target
    var parentclass = target.parentNode.getAttribute("class")
    if (examDeviceType()) {
        if (target.nodeName.toLowerCase() === "span" || (target.nodeName.toLowerCase() === "p" && target.getAttribute("class") === "marked")) {
            //切换背景颜色
            if (!chosenclass) {
                chosenclass = target
            } else {
                chosenclass.setAttribute("id", "")
                chosenclass = target
            }
            if (target.nodeName.toLowerCase() === "span") {
                target.setAttribute("id", "chosenclass")
            } else {
                target.setAttribute("id", "thealltask")
            }
        
            //清除中间原有内容
            alltasks.innerHTML = ""
            //清除之前选择的task和btn css
            if (chosentask) {
                removeClass(chosentask, "chosentask")
                chosentask = ""
            }
            if (chosenbtn) {
                chosenbtn.parentNode.setAttribute("class", "unchosenbtn")
            }
            chosenbtn = allbtn
            allbtn.parentNode.setAttribute("class", "chosenbtn")

            //选中子分类
            var tasklist = [] //用于保存task的id
            if (parentclass === "subclass") {
                var subclassid = Number(target.parentNode.getAttribute("id").slice(8))
                for (var i=0; i<sub.length; i++) {
                    if (sub[i].id === subclassid) {
                        tasklist = sub[i].taskid
                        //console.log(tasklist, sub[i].taskid)
                        break
                    }
                }
                var tasks = []
                if (tasklist.length !== 0) {
                    for (var j=0; j<tasklist.length; j++) {
                        for (var k=0; k<task.length; k++) {
                            if (tasklist[j] === task[k].id) {
                                tasks.push(task[k])
                                break
                            }
                        }
                    }
                }
            } else if (parentclass === "mainclass") {
                //选中主分类
                var subclassidlist = []
                var mainclassid = Number(target.parentNode.getAttribute("id").slice(9))
                for (var i=0; i<main.length; i++) {
                    if (main[i].id === mainclassid) {
                        subclassidlist = main[i].subid
                        break
                    }
                }
                if (subclassidlist.length !== 0) {
                    for (var j=0; j<subclassidlist.length; j++) {
                        for (var k=0; k<sub.length; k++) {
                            if (subclassidlist[j] === sub[k].id) {
                                tasklist = tasklist.concat(sub[k].taskid)
                                break
                            }
                        }
                    }
                }
                var tasks = []
                if (tasklist.length !== 0) {
                    for (var j=0; j<tasklist.length; j++) {
                        for (var k=0; k<task.length; k++) {
                            if (tasklist[j] === task[k].id) {
                                tasks.push(task[k])
                                break
                            }
                        }
                    }
                }
            } else {
                tasks = task
            }
            showTaskByDate(tasks)
        } 
    } else {
        if (target.nodeName.toLowerCase() === "span" || (target.nodeName.toLowerCase() === "p" && target.getAttribute("class") === "marked")) {
            //切换背景颜色
            if (!chosenclass) {
                chosenclass = target
            } else {
                chosenclass.setAttribute("id", "")
                chosenclass = target
            }
            if (target.nodeName.toLowerCase() === "span") {
                target.setAttribute("id", "chosenclass")
            } else {
                target.setAttribute("id", "thealltask")
            }
        
            allclasses.style.display = "none"
            taskstatus.style.display = "block"
            backtaskstatus.style.display = "block"
            //清除中间原有内容
            alltasks.innerHTML = ""
            //清除之前选择的task和btn css
            if (chosentask) {
                removeClass(chosentask, "chosentask")
                chosentask = ""
            }
            if (chosenbtn) {
                chosenbtn.parentNode.setAttribute("class", "unchosenbtn")
            }
            chosenbtn = allbtn
            allbtn.parentNode.setAttribute("class", "chosenbtn")

            //选中子分类
            var tasklist = [] //用于保存task的id
            if (parentclass === "subclass") {
                var subclassid = Number(target.parentNode.getAttribute("id").slice(8))
                for (var i=0; i<sub.length; i++) {
                    if (sub[i].id === subclassid) {
                        tasklist = sub[i].taskid
                        //console.log(tasklist, sub[i].taskid)
                        break
                    }
                }
                var tasks = []
                if (tasklist.length !== 0) {
                    for (var j=0; j<tasklist.length; j++) {
                        for (var k=0; k<task.length; k++) {
                            if (tasklist[j] === task[k].id) {
                                tasks.push(task[k])
                                break
                            }
                        }
                    }
                }
            } else if (parentclass === "mainclass") {
                //选中主分类
                var subclassidlist = []
                var mainclassid = Number(target.parentNode.getAttribute("id").slice(9))
                for (var i=0; i<main.length; i++) {
                    if (main[i].id === mainclassid) {
                        subclassidlist = main[i].subid
                        break
                    }
                }
                if (subclassidlist.length !== 0) {
                    for (var j=0; j<subclassidlist.length; j++) {
                        for (var k=0; k<sub.length; k++) {
                            if (subclassidlist[j] === sub[k].id) {
                                tasklist = tasklist.concat(sub[k].taskid)
                                break
                            }
                        }
                    }
                }
                var tasks = []
                if (tasklist.length !== 0) {
                    for (var j=0; j<tasklist.length; j++) {
                        for (var k=0; k<task.length; k++) {
                            if (tasklist[j] === task[k].id) {
                                tasks.push(task[k])
                                break
                            }
                        }
                    }
                }
            } else {
                tasks = task
            }
            showTaskByDate(tasks)
        } 

    }
}

//删除分类
function deleteClass(event) {
    var target = event.target
    if (target.getAttribute("class") === "delete") {
        var con = confirm("确定删除该分类及其所有任务吗？") 
        if (con == true) {
            var parent = target.parentNode.parentNode
            var main = JSON.parse(storage.main)
            var sub = JSON.parse(storage.sub)
            var task = JSON.parse(storage.task)   
            if (parent.getAttribute("class") === "mainclass") {
                var mainclassid = Number(parent.getAttribute("id").slice(9))
                var subclassid = []
                for (var i=0; i<main.length; i++) {
                    if (mainclassid === main[i].id) {
                        subclassid = main[i].subid
                        //删除main
                        main.splice(i, 1)
                        break
                    }
                }
                var taskidlist = []
                if (subclassid.length !== 0) {
                    for (var j=0; j<subclassid.length; j++) {
                        for (var k=0; k<sub.length; k++) {
                            if (subclassid[j] === sub[k].id) {
                                taskidlist = taskidlist.concat(sub[k].taskid)
                                //console.log(sub[k].taskid)
                                //删除sub
                                sub.splice(k, 1)
                                //console.log(taskidlist)
                                break
                            }
                        }
                    }
                }
                if (taskidlist.length !== 0) {
                    for (var l=0; l<taskidlist.length; l++) {
                        for (var m=0; m<task.length; m++) {
                            if (taskidlist[l] === task[m].id) {
                                //删除task
                                task.splice(m, 1)
                                //console.log(task)
                                break
                            }
                        }

                    }
                }
            } else {
                var subclassid = Number(parent.getAttribute("id").slice(8))
                var taskidlist = []
                for (var i=0; i<sub.length;i++) {
                    if (subclassid === sub[i].id) {
                        taskidlist = sub[i].taskid
                        sub.splice(i, 1)
                        break
                    }
                }
                if (taskidlist.length !== 0) {
                    for (var j=0; j<taskidlist.length; j++) {
                        for (var k=0; k<task.length; k++) {
                            if (taskidlist[j] === task[k].id) {
                                task.splice(k, 1)
                                break
                            }
                        }
                    }
                }
            }
            storage.main = JSON.stringify(main)
            storage.sub = JSON.stringify(sub)
            storage.task = JSON.stringify(task)

            var newtask = JSON.parse(storage.task)      
            var taskflag = 0
            if (chosentask) {
                var chosentaskid = Number(chosentask.getAttribute("id").slice(9))
                //标记目前选择的chosentask是否被删除了
                for (var z=0; z<newtask.length; z++) {
                    if (chosentaskid === newtask[z].id) {
                        taskflag = 1
                        break
                    }
                }
            }
            if (taskflag === 0) {
                //如果chosentask已经被删，更新右栏目，恢复为默认值
                editstatus.style.display = "none"
                updatestatus.style.display = "none"
                startstatus.style.display = "block"
                chosentask = document.getElementById("tasktitle0")
                document.getElementsByClassName("tasktitle3")[0].innerHTML = task[0].name
                document.getElementsByClassName("tasktime")[0].innerHTML = task[0].date
                document.getElementsByClassName("taskallcontent")[0].innerHTML = task[0].content
            }

            alltasks.innerHTML = ""
            showTaskByDate(newtask)

            allclass.innerHTML = ""
            showClass()

            //更新select
            var newmain = JSON.parse(storage.main)     
            select.innerHTML = "<option>新增主分类</option>" 
            for (var i=0; i<newmain.length; i++) {
                var option = document.createElement("option")
                option.innerHTML = newmain[i].name
                select.appendChild(option)
            }
        } else {
            return false
        }
    }
}

//点击显示新增分类弹窗
function showConfirmAdd() {
    confirmadd.style.display = "block"
    newclassname.value = ""
}

//点击取消隐藏新增分类弹窗
function quitAddClass() {
    confirmadd.style.display = "none"
}

//点击新增主或子分类
function addMainClass() {
    var main = JSON.parse(storage.main)
    var sub = JSON.parse(storage.sub)
    var name = newclassname.value
    
    if (name === "") {
        alert("请检查输入，不能为空噢~")
        return false
    }
    if (select.selectedIndex === 0) {
        //新增主分类
        //创建新的li节点
        var theli = document.createElement("li")
        theli.setAttribute("class", "mainclass")
        //console.log(main[main.length-1].id)
        var id = main[main.length-1].id + 1
        theli.setAttribute("id", "mainclass" + id)
        theli.innerHTML = "<span><img src='img/folder.png' alt='folder'>" + name + " (0)" + "<img class='delete' src='img/delete.png'>"
        allclass.appendChild(theli)
        var theul = document.createElement("ul")
        theli.appendChild(theul)
        theul.setAttribute("class", "mainclass" + id)
        confirmadd.style.display = "none"
        //console.log(theli)
        
        //把新创建的信息加入到storage.main里
        main.push({
            id: id,
            name: name,
            subid: []
        })
        //console.log(main)
        storage.main = JSON.stringify(main)
        var newmain = JSON.parse(storage.main)
        //更新option
        select.innerHTML = "<option>新增主分类</option>" 
        for (var i=0; i<newmain.length; i++) {
            var option = document.createElement("option")
            option.innerHTML = newmain[i].name
            select.appendChild(option)
        }
    } else {
        //新增子分类
        //创建新的li节点
        
        var index = select.selectedIndex
        //console.log(index)
        var mainclassid = main[index-1].id
        //console.log(mainclassid)

        var subclassid = sub[sub.length-1].id + 1
        var theul = document.getElementsByTagName("ul")[index]
        var theli = document.createElement("li")
        theli.setAttribute("class", "subclass")
        theli.setAttribute("id", "subclass" + subclassid)
        theli.innerHTML = '<span><img src="img/task.png">' + name + " (0)" + '<img class="delete" src="img/delete.png"></span>'
        theul.appendChild(theli)
        //console.log(theli)
        //把新创建的信息加入到storage.sub里
        sub.push({
            id: subclassid,
            mainid: mainclassid,
            name: name,
            taskid: []
        })
        storage.sub = JSON.stringify(sub)

        //把新创建的信息加入到storage.main里
        main[index-1].subid.push(subclassid)
        storage.main = JSON.stringify(main)
        confirmadd.style.display = "none"
        //console.log(main)
    }
}

//与任务相关的事件
// 任务栏的返回按钮
function clickBackToClass (event) {
    var target = event.target
    if (target.getAttribute("id") === "backtaskstatus") {
        allclasses.style.display = "block"
        taskstatus.style.display = "none"
        backtaskstatus.style.display = "none"
        //console.log("返回1")
    }
}

//按“所有”、“未完成”、“已完成”分类
function clickClassify(event) {
    var main = JSON.parse(storage.main)
    var sub = JSON.parse(storage.sub)
    var task = JSON.parse(storage.task)   
    var target = event.target
    if (target.nodeName.toLowerCase() === "span") {
        //清除选任务的css
        if (chosentask) {
            removeClass(chosentask, "chosentask")
        }
        //console.log(chosenbtn)
        //console.log(target)
        if (chosenbtn) {
            chosenbtn.parentNode.setAttribute("class", "unchosenbtn")
        } 
        chosenbtn = target
        //console.log(chosenbtn)
        target.parentNode.setAttribute("class", "chosenbtn")

        var finishedtask = []
        var unfinishedtask = []
        var tasklist = [] //用于保存task的id
        if (chosenclass.parentNode.getAttribute("class") === "subclass") {
            var subclassid = Number(chosenclass.parentNode.getAttribute("id").slice(8))
            for (var i=0; i<sub.length; i++) {
                if (sub[i].id === subclassid) {
                    tasklist = sub[i].taskid
                    //console.log(tasklist, sub[i].taskid)
                    break
                }
            }
            var tasks = []
            if (tasklist.length !== 0) {
                for (var j=0; j<tasklist.length; j++) {
                    for (var k=0; k<task.length; k++) {
                        if (tasklist[j] === task[k].id) {
                            tasks.push(task[k])
                            break
                        }
                    }
                }
            }
        } else if (chosenclass.parentNode.getAttribute("class") === "mainclass") {
            //选中主分类
            var subclassidlist = []
            var mainclassid = Number(chosenclass.parentNode.getAttribute("id").slice(9))
            for (var i=0; i<main.length; i++) {
                if (main[i].id === mainclassid) {
                    subclassidlist = main[i].subid
                    break
                }
            }
            if (subclassidlist.length !== 0) {
                for (var j=0; j<subclassidlist.length; j++) {
                    for (var k=0; k<sub.length; k++) {
                        if (subclassidlist[j] === sub[k].id) {
                            tasklist = tasklist.concat(sub[k].taskid)
                            break
                        }
                    }
                }
            }
            var tasks = []
            if (tasklist.length !== 0) {
                for (var j=0; j<tasklist.length; j++) {
                    for (var k=0; k<task.length; k++) {
                        if (tasklist[j] === task[k].id) {
                            tasks.push(task[k])
                            break
                        }
                    }
                }
            }
        } else {
            tasks = task
        }
        if (tasks.length !== 0) {
            for (var z=0;z<tasks.length; z++) {
                if (tasks[z].status) {
                    finishedtask.push(tasks[z])
                } else {
                    unfinishedtask.push(tasks[z])
                }
            }
        }
        var list = []
        switch(target.innerHTML) {
            case "未完成":
                list = unfinishedtask
                //console.log(list)
                break
            case "已完成":
                list = finishedtask
                break
            default:
                list = tasks
        }
        alltasks.innerHTML = ""
        showTaskByDate(list)
    }
}

//点击中间任务名称，右侧显示任务详情
function clickShowContent(event) {
    var task = JSON.parse(storage.task)  
    target = event.target
    //console.log(target)

    if (target.getAttribute("class").indexOf("tasktitle") !== -1) {
        if (!chosentask) {
            chosentask = target
        } else {
            removeClass(chosentask, "chosentask")
            chosentask = target
        }
        addClass(target, "chosentask")

        rightshowntask = target

        editstatus.style.display = "none"
        startstatus.style.display = "block"
        var taskid = Number(target.getAttribute("id").slice(9))
        for (var i=0; i<task.length; i++) {
            if (taskid === task[i].id) {
                var thetask = task[i]
            }
        }

        if (target.getAttribute("class").indexOf("false") !== -1) {
            document.getElementsByClassName("tasktitle3")[0].innerHTML = thetask.name + '<img class="taskdone" src="img/taskdone.png"><img class="edit" src="img/edit.png">'
        } else {
            document.getElementsByClassName("tasktitle3")[0].innerHTML = thetask.name
        }
        document.getElementsByClassName("tasktime")[0].innerHTML = thetask.date
        document.getElementsByClassName("taskallcontent")[0].innerHTML = thetask.content
    }
    if (examDeviceType() === false) {
        taskcontent.style.display = "block"

        taskstatus.style.display = "none"
        startstatus.style.display = "blcok"
        backtaskcontent.style.display = "block"
        backtaskstatus.style.display = "none"
    }
}

//点击"新增任务"，切换状态
function editStatus() {
    //console.log(startstatus, editstatus)
    if (!chosenclass || chosenclass.parentNode.getAttribute("class") !== "subclass") {
        if (!examDeviceType()) {
            alert("请先返回建立子分类~")
            taskstatus.style.display = "none"
            allclasses.style.display = "block"
            backtaskstatus.style.display = "none"
        } else {
            alert("请选择一个子分类~")
            return false            
        }
    } else {
        //var main = JSON.parse(storage.main)
        //console.log(main)
        if (!examDeviceType()) {
            taskcontent.style.display = "block"

            taskstatus.style.display = "none"
            backtaskstatus.style.display = "none"
        } 
        startstatus.style.display = "none"
        editstatus.style.display = "block"
        
        document.getElementsByClassName("edittasktitle3")[0].firstChild.value = ""
        document.getElementsByClassName("edittasktime")[0].getElementsByTagName("input")[0].value = ""
        document.getElementsByTagName("textarea")[0].value = ""
        chosenclassinaddtask = chosenclass
        //console.log(chosenclassinaddtask.parentNode)
    }
}

function quitEdit() {
    if (examDeviceType()) {
        startstatus.style.display = "block"
        editstatus.style.display = "none"        
    } else {
        taskcontent.style.display = "none"
        editstatus.style.display = "none"
        taskstatus.style.display = "block"
        backtaskstatus.style.display = "block"
    }
}

//新增任务
function addTask() {
    var sub = JSON.parse(storage.sub)
    var task = JSON.parse(storage.task)  
    var main = JSON.parse(storage.main)
    //console.log(main)
    var taskid = task[task.length-1].id + 1
    var subid = Number(chosenclassinaddtask.parentNode.getAttribute("id").slice(8))
    var name = document.getElementsByClassName("edittasktitle3")[0].firstChild.value
    var date = document.getElementsByClassName("edittasktime")[0].getElementsByTagName("input")[0].value
    var content = document.getElementsByTagName("textarea")[0].value
    var status = false
    if (name === "" || date === "" || content === "") {
        alert("请检查输入~有内容没有填写噢")
        return false
    }
    var re = /\d{4}\-\d{2}\-\d{2}/
    if (!re.test(date)) {
        alert("时间格式输入有误~")
        return false
    }
    //修改storage.task
    task.push({
        id: taskid,
        subid: subid,
        name: name,
        date: date,
        content: content,
        status: status
    })
    storage.task = JSON.stringify(task)

    //修改storage.sub
    var list
    for (var i=0; i<sub.length; i++) {
        if (sub[i].id === subid) {
            sub[i].taskid.push(taskid)
            list = sub[i].taskid
            //console.log(list, taskid)
            break
        }
    }
    storage.sub = JSON.stringify(sub)    

    //显示在中间栏
    alltasks.innerHTML = ""
    var tasklist = []
    for (var z=0; z<list.length; z++) {
        for (var y=0; y<task.length; y++) {
            if (list[z] === task[y].id) {
                tasklist.push(task[y])
            }
        }
    }
    //console.log(task, sub)
    //console.log(tasklist)
    showTaskByDate(tasklist)

    //修改左栏数字，包括子分类、主分类、所有任务
    allclass.innerHTML= ""
    showClass()

    // 给之前选中的subclass加上css
    var formersubclassid = chosenclassinaddtask.parentNode.getAttribute("id")
    var formersubclass = document.getElementById(formersubclassid).getElementsByTagName("span")[0]
    chosenclass = formersubclass
    chosenclassinaddtask = formersubclass
    formersubclass.setAttribute("id", "chosenclass")
    
    if (chosenbtn) {
        chosenbtn.parentNode.setAttribute("class", "unchosenbtn")
    }
    chosenbtn = allbtn
    allbtn.parentNode.setAttribute("class", "chosenbtn")
    
    //切换右栏状态
    editstatus.style.display = "none"
    startstatus.style.display = "block"
    document.getElementsByClassName("tasktitle3")[0].innerHTML = name + '<img class="taskdone" src="img/taskdone.png"><img class="edit" src="img/edit.png">'
    document.getElementsByClassName("tasktime")[0].innerHTML = date
    document.getElementsByClassName("taskallcontent")[0].innerHTML = content
    // console.log(chosentask)
    rightshowntask = document.getElementById("tasktitle" + taskid)
    // console.log(JSON.parse(storage.main))

    if (!examDeviceType()) {
        backtaskcontent.style.display = "block"
    }
}

// 任务详情页的返回按钮
function clickBackToTaskList (event) {
    var target = event.target
    if (target.getAttribute("id") === "backtaskcontent") {
        taskstatus.style.display = "block"
        startstatus.style.display = "none"
        taskcontent.style.display = "none"

        backtaskstatus.style.display = "block"
        backtaskcontent.style.display = "none"

        console.log("返回2")
    }
}

//修改任务，切换状态
function clickUpdateTask(event) {
    var target = event.target
    if (target.getAttribute("class") === "edit") {
        var title = document.getElementsByClassName("tasktitle3")[0].innerText
        var date = document.getElementsByClassName("tasktime")[0].innerHTML
        var content = document.getElementsByClassName("taskallcontent")[0].innerHTML
        editstatus.style.display = "none"
        startstatus.style.display = "none"
        updatestatus.style.display = "block"
        
        // 将返回按钮隐藏
        backtaskcontent.style.display = "none"

        document.getElementsByClassName("updatetasktitle3")[0].getElementsByTagName("input")[0].value = title
        document.getElementsByClassName("updatetasktime")[0].getElementsByTagName("input")[0].value = date
        document.getElementsByClassName("updatetaskallcontent")[0].value = content
    }
}

//确认修改
function confirmUpdateTask() {
    var task = JSON.parse(storage.task)   
    var main = JSON.parse(storage.main)   
    var sub = JSON.parse(storage.sub)   
    var name = document.getElementsByClassName("updatetasktitle3")[0].getElementsByTagName("input")[0].value
    var date = document.getElementsByClassName("updatetasktime")[0].getElementsByTagName("input")[0].value
    var content = document.getElementsByClassName("updatetaskallcontent")[0].value

    if (!examDeviceType()) {
        backtaskcontent.style.display = "block"
    }

    //修改localStorage里的存储内容
    var id = Number(rightshowntask.getAttribute("id").slice(9))
    for (var i=0; i<task.length; i++) {
        if (id === task[i].id) {
            task[i].name = name
            task[i].date = date
            task[i].content = content
            break
        }
    }
    storage.task = JSON.stringify(task)
    // console.log(chosentask)
    // console.log(rightshowntask)


    //点击确认后显示修改后的文本
    startstatus.style.display = "block"
    updatestatus.style.display = "none"
    document.getElementsByClassName("tasktitle3")[0].innerHTML = name + '<img class="taskdone" src="img/taskdone.png"><img class="edit" src="img/edit.png">'
    document.getElementsByClassName("tasktime")[0].innerHTML = date
    document.getElementsByClassName("taskallcontent")[0].innerHTML = content

    //更新中间任务栏
    var tasklist = [] //用于保存task的id
    alltasks.innerHTML = ""
    if (chosenclass.parentNode.getAttribute("class") === "subclass") {
        var subclassid = Number(chosenclass.parentNode.getAttribute("id").slice(8))
        for (var i=0; i<sub.length; i++) {
            if (sub[i].id === subclassid) {
                tasklist = sub[i].taskid
                //console.log(tasklist, sub[i].taskid)
                break
            }
        }
        var tasks = []
        if (tasklist.length !== 0) {
            for (var j=0; j<tasklist.length; j++) {
                for (var k=0; k<task.length; k++) {
                    if (tasklist[j] === task[k].id) {
                        tasks.push(task[k])
                        break
                    }
                }
            }
        }
        //console.log(1)
    } else if (chosenclass.parentNode.getAttribute("class") === "mainclass") {
        //选中主分类
        var subclassidlist = []
        var mainclassid = Number(chosenclass.parentNode.getAttribute("id").slice(9))
        for (var i=0; i<main.length; i++) {
            if (main[i].id === mainclassid) {
                subclassidlist = main[i].subid
                break
            }
        }
        if (subclassidlist.length !== 0) {
            for (var j=0; j<subclassidlist.length; j++) {
                for (var k=0; k<sub.length; k++) {
                    if (subclassidlist[j] === sub[k].id) {
                        tasklist = tasklist.concat(sub[k].taskid)
                        break
                    }
                }
            }
        }
        var tasks = []
        if (tasklist.length !== 0) {
            for (var j=0; j<tasklist.length; j++) {
                for (var k=0; k<task.length; k++) {
                    if (tasklist[j] === task[k].id) {
                        tasks.push(task[k])
                        break
                    }
                }
            }
        }
        //console.log(2)
    } else {
        tasks = task
        //console.log(3)
    }
    showTaskByDate(tasks)
}

//取消修改
function quitUpdateTask() {
    updatestatus.style.display = "none"
    startstatus.style.display = "block"
    if (!examDeviceType()) {
        backtaskcontent.style.display = "block"
    }
}

//完成任务
function finishTask(event) {
    var task = JSON.parse(storage.task)   
    var target = event.target
    //console.log(target)
    if (target.getAttribute("class") === "taskdone") {
        var con = confirm("确定要将这个任务标记为完成吗？")
        if (con == true) {
            //修改localStorage里的存储信息
            //console.log(chosentask)
            var id = Number(rightshowntask.getAttribute("id").slice(9))
            for (var i=0; i<task.length; i++) {
                if (id === task[i].id) {
                    task[i].status = true
                    var title = task[i].name
                    //console.log(task[i])
                    break
                }
            }
            storage.task = JSON.stringify(task)
            //更改右栏显示：删除图标
            var thep = startstatus.getElementsByClassName("tasktitle3")[0]
            thep.innerHTML = title

            //修改li中标记为true
            addClass(rightshowntask, "true")
            removeClass(rightshowntask, "false")

            if (!examDeviceType()) {
                backtaskcontent.style.display = "block"
            }

            //修改中栏
        } else {
            return true
        }
    }
}

function examDeviceType () {
    var mobileAgents = ['Android','iPhone','iPod','BlackBerry','Windows CE']
    var useragent = navigator.userAgent
    // 手机return f
    for (var i of mobileAgents) {
        if (useragent.indexOf(i) !== -1)
        return false
    }
    return true
}

window.onload = function() {
    // console.log(storage.main)
    // console.log(storage.sub)
    // console.log(storage.task)

    intialData()
    intialClassColumn()
    addclass.addEventListener("click", showConfirmAdd, false)
    quitaddclass.addEventListener("click", quitAddClass, false)
    addtask.addEventListener("click", editStatus, false)
    quitedit.addEventListener("click", quitEdit, false)
    confirmaddclass.addEventListener("click", addMainClass, false)
    allclasses.addEventListener("click", chooseSubClass, false)
    confirmedit.addEventListener("click", addTask, false)
    alltasks.addEventListener("click", clickShowContent, false)
    doneornot.addEventListener("click", clickClassify, false)
    startstatus.addEventListener("click", clickUpdateTask, false)
    confirmupdate.addEventListener("click", confirmUpdateTask, false)
    quitupdate.addEventListener("click", quitUpdateTask, false)
    startstatus.addEventListener("click", finishTask, false)
    allclass.addEventListener("click", deleteClass, false)
    backtaskcontent.addEventListener("click", clickBackToTaskList, false)
    backtaskstatus.addEventListener("click", clickBackToClass, false)
}
