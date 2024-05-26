let [seconds, minutes, hours] = [0,0,0]
let displayTime = document.getElementById('displayTime');
let timer = null;
let reset = document.getElementById('reset');
let play = document.getElementById('play');
let pause = document.getElementById('pause');
const stopWatch = () => {
    seconds++;
    if(seconds == 60){

        seconds = 0;
        minutes++;
        if(minutes == 60){
            minutes = 0;
            hours++;
        }
    }
let h = hours < 10 ? "0" + hours : hours ;
let m = minutes < 10 ? "0" + minutes : minutes ;
let s = seconds < 10 ? "0" + seconds : seconds;


    displayTime.innerHTML = h + ":" + m + ":" + s;
}
play.addEventListener("click", () => {
    if(timer!== null){
        clearInterval(timer);
    }
   timer = setInterval(stopWatch, 1000);
})
pause.addEventListener("click", () => {
clearInterval(timer);
});
reset.addEventListener("click", () => {
    clearInterval(timer);
     [seconds, minutes, hours] = [0,0,0];
     displayTime.innerHTML = "00:00:00"
    });
function watchStop() {
    clearInterval(timer);
}
function watchReset(){
    clearInterval(timer);
    clearInterval(timer);
  [seconds, minutes, hours] = [0,0,0];
  displayTime.innerHTML = "00:00:00"
}