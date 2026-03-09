const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");

allBtn.onclick = function () {
    allBtn.classList.add("btn-active");
    openBtn.classList.remove("btn-active");
    closedBtn.classList.remove("btn-active");
};

openBtn.onclick = function () {
    openBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    closedBtn.classList.remove("btn-active");
};

closedBtn.onclick = function () {
    closedBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    openBtn.classList.remove("btn-active");
};
