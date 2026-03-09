const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

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


let allIssues = [];

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {

                allIssues = data.data;

                displayIssues(allIssues);
                updateCount(allIssues);

        

            },);
        });
};



const displayIssues = (issues) => {

    const container = document.getElementById("level-container");
    container.innerHTML = "";

    issues.forEach(issue => {

        const statusColor = issue.status === "open" ? "border-green-600" : "border-purple-600";
        const statusIcon = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";

        const card = document.createElement("div");
        

        card.innerHTML = `
        <div id="level-container"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-10/11 md:w-5/6 lg:w-7/9 mx-auto mt-4">

            <div class="bg-white rounded-xl py-5 px-5 space-y-4 border-t-4 ${statusColor}">
                <div class="flex justify-between ">
                    <img class="size-8" src="./assets/Open-Status.png">
                    <span class="bg-gray-300 py-1 px-4 rounded-2xl">HIGH</span>
                </div>
                <h2 class="font-bold text-2xl">${issue.title}</h2>
                <p class=" text-gray-500">${issue.description}</p>

                <div class="flex gap-3 text-sm font-normal ">
                    <p class="bg-red-100 text-red-600 px-4 py-2 rounded-3xl font-semibold"> <i class="fa-solid fa-bug"
                            style="color: rgb(246, 69, 69);"></i> ${issue.label}</p>
                    <p class="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-3xl font-semibold"> <i
                            class="fa-solid fa-life-ring" style="color: rgb(170, 135, 11);"></i>${issue.label}</p>

                </div>
`;

card.addEventListener("click", () => {
    openModal(issue);
});

        container.appendChild(card);
    });
};

loadIssues();