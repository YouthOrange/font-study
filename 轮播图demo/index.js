window.onload = function(){
    var main_box = document.getElementById('main_box');
    var image_box = document.getElementById('image_box');
    var buttons = document.getElementById('botton_box').getElementsByTagName('span');
    var prev = document.getElementById('prev_box');
    var next = document.getElementById('next_box');
    var index = 1;
    var timer;
    function play(){
        timer = setInterval(function(){
            autoShow();
        },3000)
    }
    function stop(){
        clearInterval(timer);
    }
    function buttonShow(){
        for(var i = 0;i<buttons.length;i++){
            if(buttons[i].className =='on'){
                buttons[i].className = '';
            }
        }
        buttons[index - i].className = 'on';
    }
    prev.onclick = function(){
        index =index -1;
        if(index<1){
            index  = 5;
        }
        buttonShow();
    }
    next.onclick =function(){
        index = index +1;
        if(index>5){
            index = 1;
        }
        buttonShow();
    }
    function autoShow(){
        var i = 0;
        while(i<5){
            i++;
            show(i);
            if(i==5){
                i =0;
            }
        }
    }

    function show (pagNum){
        image_box.style.left = -500*pagNum;
    }

    for(var i = 0;i<buttons.length;i++){
        function(){
            buttons[i].onclick = function(){
                var clickIndex = parseInt(this.getAttribute('index'));
                index = clickIndex;
                buttonShow();
            }
        }
    }
    main_box.onmouseover = stop;
    main_box.onmouseout = play;
}