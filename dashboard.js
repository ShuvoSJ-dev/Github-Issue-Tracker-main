const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let currentStatusFilter = "all";

allBtn.onclick = function () {
    currentStatusFilter = "all";
    allBtn.classList.add("btn-active");
    openBtn.classList.remove("btn-active");
    closedBtn.classList.remove("btn-active");
    filterAndDisplayIssues();
};

openBtn.onclick = function () {
    currentStatusFilter = "open";
    openBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    closedBtn.classList.remove("btn-active");
    filterAndDisplayIssues();
};

closedBtn.onclick = function () {
    currentStatusFilter = "closed";
    closedBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    openBtn.classList.remove("btn-active");
    filterAndDisplayIssues();
};


const filterAndDisplayIssues = () => {
    let filtered = allIssues;

    if (currentStatusFilter !== "all") {
        filtered = filtered.filter(issue => issue.status === currentStatusFilter);
    }

    displayIssues(filtered);
    updateCount(filtered);
};

const updateCount = (issues) => {
    const countElement = document.getElementById("issue-count");
    const count = issues.length;
    countElement.textContent = `${count} Issues`;
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

        const statusColor = issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]";
        const statusIcon = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png";

        const card = document.createElement("div");

        let priorityColor = "";

        if (issue.priority === "high") {
            priorityColor = "bg-red-100 text-red-600";
        }
        else if (issue.priority === "medium") {
            priorityColor = "bg-yellow-100 text-yellow-600";
        }
        else {
            priorityColor = "bg-gray-200 text-gray-600";
        }


        const labelConfig = {
            bug: {
                color: "bg-red-100 text-red-600",
                icon: "fa-solid fa-bug"
            },
            enhancement: {
                color: "bg-green-100 text-green-600",
                icon: "fa-solid fa-wand-magic-sparkles"
            },
            documentation: {
                color: "bg-blue-100 text-blue-600",
                icon: "fa-solid fa-book"
            },
            "help wanted": {
                color: "bg-yellow-100 text-yellow-600",
                icon: "fa-solid fa-life-ring"
            },
            "good first issue": {
                color: "bg-lime-100 text-lime-600",
                icon: "fa-solid fa-circle-exclamation"
            }
        };

        card.innerHTML = `
            <div class="bg-white rounded-xl py-5 px-5 space-y-4 border-t-4 ${statusColor} h-full">
                <div class="flex justify-between ">
                    <img class="size-8" src="${statusIcon}">
                    <span class="${priorityColor} py-1 px-4 rounded-2xl font-semibold">${issue.priority.toUpperCase()}</span>
                </div>

                <h2 class="font-bold text-2xl">${issue.title}</h2>
                <p class=" text-gray-500">${issue.description}</p>

                <div class="flex gap-3 text-sm font-normal flex-wrap">
                  ${issue.labels.map(label => {
                       const cfg = labelConfig[label] || { color: "bg-gray-100 text-gray-600", icon: "fa-solid fa-tag" };
                            return `
                           <p class="${cfg.color} px-4 py-2 rounded-3xl font-semibold flex items-center gap-2">
                             <i class="${cfg.icon}"></i> ${label.toUpperCase()}
                           </p>
                        `;
                    }).join("")}
                </div>
                
                <hr class="border-gray-300">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            openModal(issue);
        });

        container.appendChild(card);
    });
};

loadIssues();