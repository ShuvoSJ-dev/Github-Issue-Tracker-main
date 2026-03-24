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
    searchInput.value = "";
    filterAndDisplayIssues();
};

openBtn.onclick = function () {
    currentStatusFilter = "open";
    openBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    closedBtn.classList.remove("btn-active");
    searchInput.value = "";
    filterAndDisplayIssues();
};

closedBtn.onclick = function () {
    currentStatusFilter = "closed";
    closedBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    openBtn.classList.remove("btn-active");
    searchInput.value = "";
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
    toggleLoader(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                allIssues = data.data;
                displayIssues(allIssues);
                updateCount(allIssues);

                toggleLoader(false);
            }, 500);
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


searchBtn.onclick = () => {
    const keyword = searchInput.value.trim().toLowerCase();

    allBtn.classList.remove("btn-active");
    openBtn.classList.remove("btn-active");
    closedBtn.classList.remove("btn-active");

    const filteredIssues = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(keyword) ||
        issue.description.toLowerCase().includes(keyword) ||
        issue.labels.some(label => label.toLowerCase().includes(keyword))
    );
    displayIssues(filteredIssues);
    updateCount(filteredIssues);
};

const toggleLoader = (show) => {
    const loader = document.getElementById("loader");

    if (show) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
};


const openModal = (issue) => {
    document.getElementById("modal-title").innerText = issue.title;

    const statusEl = document.getElementById("modal-status");

    if (issue.status === "open") {
        statusEl.innerText = "Opened";
        statusEl.className = "px-3 py-1 rounded-full text-white text-sm bg-green-500";
    } else {
        statusEl.innerText = "Closed";
        statusEl.className = "px-3 py-1 rounded-full text-white text-sm bg-purple-500";
    }

    document.getElementById("modal-author").innerText = issue.author;
    document.getElementById("modal-date").innerText =
        issue.createdAt.slice(0, 10);
    document.getElementById("modal-description").innerText =
        issue.description;
    document.getElementById("modal-assignee").innerText =
        issue.author;

    const priorityEl = document.getElementById("modal-priority");
    priorityEl.innerText = issue.priority.toUpperCase();

    if (issue.priority === "high") {
        priorityEl.className =
            "px-3 py-1 rounded-full text-white text-sm bg-red-500";
    } else if (issue.priority === "medium") {
        priorityEl.className =
            "px-3 py-1 rounded-full text-white text-sm bg-yellow-500";
    } else {
        priorityEl.className =
            "px-3 py-1 rounded-full text-white text-sm bg-gray-500";
    }

    const labelsContainer = document.getElementById("modal-labels");
    labelsContainer.innerHTML = "";

    issue.labels.forEach(label => {
        const span = document.createElement("span");

        span.className =
            "px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700";

        span.innerText = label;

        labelsContainer.appendChild(span);
    });

    document.getElementById("issueModal").showModal();
};

loadIssues();