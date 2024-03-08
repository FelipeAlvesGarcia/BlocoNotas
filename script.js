const scrol = document.getElementById("scroll");
scrol.addEventListener("click", function (){
    window.scroll({
        top:0,
        behavior:"smooth",
    });
})