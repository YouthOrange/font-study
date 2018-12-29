function fnLogin() {
    const oUname = document.getElementById("uname");
    const oUpass = document.getElementById("upass");
    const oError = document.getElementById("error_box");
    if (oUname.value.length > 20 || oUname.value.length < 6) {
        oError.innerHTML = "用户名请输入6-20位字符";
        return;
    } else if ((oUname.value.charCodeAt(0) >= 48) && (oUname.value.charCodeAt(0) <= 57)) {
        oError.innerHTML = "首字符必须为字母";
        return;
    } else
        for (var i = 0; i < oUname.value.charCodeAt(i); i++) {
            if ((oUname.value.charCodeAt(i) < 48) || (oUname.value.charCodeAt(i) > 57) && (oUname.value.charCodeAt(i) < 97) || (oUname.value.charCodeAt(i) > 122)) {
                oError.innerHTML = "必须为字母跟数字组成";
                return;
            }
        }
    if (oUpass.value.length > 20 || oUpass.value.length < 6) {
        oError.innerHTML = "密码请输入6-20位字符"
        return;
    }
    window.alert("登录成功")
}

// function setCookie(name, value) {
//     var Days = 30;
//     var exp = new Date();
//     exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
//     document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
// }

// function setCookie(c_name, value, expiredays) {
//     var exdate = new Date()
//     exdate.setDate(exdate.getDate() + expiredays)
//     document.cookie = c_name + "=" + escape(value) +
//         ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString())
// }
function setCookie(name,value,expires){
    var now = new Date();
    now.setTime(now.getTime+expires*60*1000);
    document.cookie = name+"="+escape(value)+((expires==null)? "":";expires="+now.toGMTString());
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
function setUser() {
    var oUname = document.getElementById("uname").value;
    var oUpass = document.getElementById("upass").value;
    var oError = document.getElementById("error_box");
    if (oUname.length > 20 || oUname.length < 6) {
        oError.innerHTML = "用户名请输入6-20位字符";
        return;
    } else if ((oUname.charCodeAt(0) >= 48) && (oUname.charCodeAt(0) <= 57)) {
        oError.innerHTML = "首字符必须为字母";
        return;
    } else
        for (var i = 0; i < oUname.charCodeAt(i); i++) {
            if ((oUname.charCodeAt(i) < 48) || (oUname.charCodeAt(i) > 57) && (oUname.charCodeAt(i) < 97) || (oUname.charCodeAt(i) > 122)) {
                oError.innerHTML = "必须为字母跟数字组成";
                return;
            }
        }
    if (oUpass.length > 20 || oUpass.length < 6) {
        oError.innerHTML = "密码请输入6-20位字符"
        return;
    }
    console.log(oUname);
    console.log(oUpass);
    setCookie(oUname, oUpass, 24*60);
    setCookie(oUname+"_money", 10000, 24*60);
    window.alert("注册成功");
    window.location.href = "index.html"
}

function checkUser() {
    var oUname = document.getElementById("uname").value;
    var oUpass = document.getElementById("upass").value;
    var oError = document.getElementById("error_box");
    if (oUname.length > 20 || oUname.length < 6) {
        oError.innerHTML = "用户名请输入6-20位字符";
        return;
    } else if ((oUname.charCodeAt(0) >= 48) && (oUname.charCodeAt(0) <= 57)) {
        oError.innerHTML = "首字符必须为字母";
        return;
    } else
        for (var i = 0; i < oUname.charCodeAt(i); i++) {
            if ((oUname.charCodeAt(i) < 48) || (oUname.charCodeAt(i) > 57) && (oUname.charCodeAt(i) < 97) || (oUname.charCodeAt(i) > 122)) {
                oError.innerHTML = "必须为字母跟数字组成";
                return;
            }
        }
    if (oUpass.length > 20 || oUpass.length < 6) {
        oError.innerHTML = "密码请输入6-20位字符"
        return;
    }
    if (oUpass != getCookie(oUname)) {
        oError.innerHTML = "账户或密码错误";
        return;
    }
    setLoginUser(oUname);
    window.alert("登录成功");
    window.location.href = "account.html";
}

function getMoney() {
    var loginUser = getLoginUser();
    if(loginUser == null){
        window.alert("当前登录已过期！");
        window.location.href = "index.html";
    }
    var userMoney = loginUser+"_money";
    var total = getCookie(userMoney);
    var totalMoney = parseInt(total);
    return totalMoney;
}

function draw() {
    var loginUser = getLoginUser();
    var userMoney = loginUser+"_money";
    var cash = document.getElementById("money").value;
    var outputMoney = parseInt(cash);
    var total = getCookie(userMoney);
    var totalMoney = parseInt(total);
    var oError = document.getElementById("error_box");
    var re = /^[0-9]+$/;
    if (!re.test(outputMoney / 100)) {
        oError.innerHTML = "请输入100的整数倍";
        return;
    }
    if (outputMoney > totalMoney) {
        window.alert("余额不足");
        window.location.href = "drawing.html";
        return;
    }
    if (outputMoney > 10000) {
        oError.innerHTML = "单次取现限10000以内";
        return;
    }
    total = total - cash;
    setCookie(userMoney, total,24*60);
    window.alert('取款成功 '+cash+'元')
    window.location.href = "account.html";
}

function deposit() {
    var loginUser = getLoginUser();
    var userMoney = loginUser+"_money";
    var cash = document.getElementById("money").value;
    var oError = document.getElementById("error_box");
    var inputMoney = parseInt(cash);
    var total = getMoney();
    if (!(/(^[1-9]\d*$)/.test(inputMoney / 100))) {
        oError.innerHTML = "请输入100的整数倍";
        return false;
    }
    if (inputMoney > 10000) {
        oError.innerHTML ="单次存款不超过10000";
        return;
    }
    total = total + inputMoney;
    setCookie(userMoney, total,24*60);
    window.alert("存款成功:" + cash + "元");
    window.location.href = "account.html";
}
function setLoginUser(name){
    var loginUser = "loginUser";
    setCookie(loginUser,name,30);
}
function getLoginUser(){
    var loginUser = "loginUser";
    return getCookie(loginUser);
}
function logout(){
    var loginUser = "loginUser";
    setCookie(loginUser,null,-1);
    window.alert("已退出登录，欢迎再次光临");
    window.location.href = "index.html";  
}

function welcome(){
    var loginUser = getLoginUser();
    var welcomeBox = document.getElementById("title_box");
    console.log(loginUser);
    if(loginUser==null){
        return;
    }
    welcomeBox.innerHTML="<h2>"+loginUser+"，欢迎光临大玩家银行</h2>";
}