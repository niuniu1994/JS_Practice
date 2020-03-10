function ById(id) {
    return typeof(id)=="string" ? document.getElementById(id):id;
}


//核心思想，即用index来控制显示的图片；
var index = 0;
var timer = null;
var pics = ById("banner").getElementsByTagName("div");
var dots = ById("dots").getElementsByTagName("span")
var length = pics.length;
let next = ById("next");
let prev = ById( "prev");
let menus = ById("menu_content");
let menus_items = menus.getElementsByClassName("menu_item");
let sub_menu = ById("sub_menu");
let inner_boxs = sub_menu.getElementsByClassName("inner_box");
function slideimg() {
    let main = ById("main");
    main.onmouseover = function(){
        if (timer) clearInterval(timer);
    }


    main.onmouseout = function(){
        timer = setInterval(function(){
            console.log(index);
            index++;
            if (index >= length){
                index = 0;
            }
            changeImages();//switch image
            }
            ,3000);
    };

    //自动在main上出发鼠标离开事件
    main.onmouseout();
    changeDots();
    showSubMenu();

    //next page
    next.onclick = function () {
        if (index === 2){
            index = 0;
        }else {
            index += 1;
        }
        changeImages();
    }

    //previous page
    prev.onclick = function () {
        if (index === 0){
            index = 2;
        }else {
            index -= 1;
        }
        changeImages();
    }



}


//switch image
function changeImages() {
    for (let i = 0; i < length; i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    pics[index].style.display = "block";
    dots[index].className = "dot_active";
}

//定选图片通过点击小圆点
function changeDots() {
    for (let i = 0; i < length; i ++){
        dots[i].id = i;
        dots[i].onclick = function () {
            index = this.id;
            changeImages();
        }
    }
}

function showSubMenu() {
    for (let i = 0; i < menus_items.length; i ++){
        menus_items[i].setAttribute("data_index",i);

        menus_items[i].onmouseover = function () {
            let id = this.getAttribute("data_index");
            sub_menu.className = "sub_menu";
            for (let j = 0; j < inner_boxs.length; j ++){
                inner_boxs[j].style.display = "none";
                menus_items[j].style.background = "none";
            }
            menus_items[id].style.background = "rgba(7,17,27,0.5)";
            inner_boxs[id].style.display = "block";
        }

        menus_items[i].onmouseout = function () {
            sub_menu.className = "sub_menu hide";
        }

        inner_boxs[i].onmouseover = function () {
            sub_menu.className = "sub_menu";
        }

        inner_boxs[i].onmouseout = function () {
            sub_menu.className = "sub_menu hide";
        }

    }


}