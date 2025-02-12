document.addEventListener("DOMContentLoaded", function () {
    const tutorialsContainer = document.getElementById("tutorials");
    const searchInput = document.getElementById("search");
    const topicsContainer = document.getElementById("topics");
    const modesContainer = document.getElementById("modes");

    let selectedTopics = new Set();
    let selectedModes = new Set();

    function renderFilters() {
        const topicsSet = new Set();
        const modesSet = new Set();

        tutorialsData.forEach(tutorial => {
            tutorial.topics.forEach(topic => topicsSet.add(topic));
            tutorial.mode.forEach(mode => modesSet.add(mode));
        });

        topicsContainer.innerHTML = "";
        topicsSet.forEach(topic => {
            const btn = document.createElement("button");
            btn.textContent = topic;
            btn.classList.add("filter-btn");
            btn.onclick = () => toggleFilter(selectedTopics, topic);
            topicsContainer.appendChild(btn);
        });

        modesContainer.innerHTML = "";
        modesSet.forEach(mode => {
            const btn = document.createElement("button");
            btn.textContent = mode;
            btn.classList.add("filter-btn");
            btn.onclick = () => toggleFilter(selectedModes, mode);
            modesContainer.appendChild(btn);
        });
    }

    function toggleFilter(set, value) {
        if (set.has(value)) {
            set.delete(value);
        } else {
            set.add(value);
        }
        renderTutorials();
    }

    function renderTutorials() {
        tutorialsContainer.innerHTML = "";

        let filteredData = tutorialsData.filter(tutorial => {
            let matchesSearch = tutorial.title.toLowerCase().includes(searchInput.value.toLowerCase());
            let matchesTopics = selectedTopics.size === 0 || tutorial.topics.some(topic => selectedTopics.has(topic));
            let matchesModes = selectedModes.size === 0 || tutorial.mode.some(mode => selectedModes.has(mode));
            return matchesSearch && matchesTopics && matchesModes;
        });

        filteredData.forEach(tutorial => {
            const div = document.createElement("div");
            div.classList.add("tutorial-block");

            const header = document.createElement("h3");
            header.textContent = tutorial.title;
            header.classList.add("tutorial-title");
            header.onclick = () => window.open(tutorial.link, "_blank");

            const meta = document.createElement("p");
            meta.textContent = `Topics: ${tutorial.topics.join(", ")} | Mode: ${tutorial.mode.join(", ")}`;

            div.appendChild(header);
            div.appendChild(meta);
            tutorialsContainer.appendChild(div);
        });
    }

    searchInput.addEventListener("input", renderTutorials);
    
    renderFilters();
    renderTutorials();
});
