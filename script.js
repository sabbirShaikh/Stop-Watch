let lapbtn = document.getElementById("lapbtn");
let switchbtn = document.getElementById("switchbtn");
let rstbtn = document.getElementById("reset");

let mindis = document.getElementById("min");
let secdis = document.getElementById("sec");
let msdis = document.getElementById("ms");

let laptime = document.getElementById("lap-body");

let min = 0;
let sec = 0;
let ms = 0;

let laptiming = "";
let laptimarr = [];

let terminate = null;

switchbtn.value = "start";
switchbtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
switchbtn.addEventListener("click", () => {
  switchbtn.innerHTML = `<i class="bi bi-pause-fill"></i>`;
  if (switchbtn.value === "start") {
    if (terminate == null) {
      terminate = setInterval(() => {
        ms += 10;
        ms % 1000;
        if (ms === 1000) {
          sec++;
          ms = 0;
          if (sec === 60) {
            min++;
            sec = 0;
          }
        }
        msdis.innerText = ms < 100 ? ms : ms / 10;
        secdis.innerText = sec < 10 ? `0${sec}` : sec % 60;
        mindis.innerText = min < 10 ? `0${min}` : min % 60;
        laptiming = `${mindis.innerText} : ${secdis.innerText} : ${msdis.innerText}`;
      }, 10);
      switchbtn.value = "stop";
    }
  } else {
    switchbtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
    clearInterval(terminate);
    terminate = null;
    switchbtn.value = "start";
  }
});

rstbtn.addEventListener("click", () => {
  clearInterval(terminate);
  terminate = null;
  min = 0;
  sec = 0;
  ms = 0;
  msdis.innerText = "00";
  secdis.innerText = "00";
  mindis.innerText = "00";
  laptiming = "";
  laptimarr = [];
  lap.innerHTML = "";
  laptime.innerHTML = "";
});

lapbtn.addEventListener("click", () => {
  if (laptiming == "") {
    return;
  } else {
    laptimarr.push(laptiming);
    lapdisplay();
  }
});

function lapdisplay() {
  let row = "";
  laptimarr.forEach((time, i) => {
    row += `<tr><td>${i + 1}</td><td>${time}</td></tr>`;
  });
  laptime.innerHTML = row;
}
