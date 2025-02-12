const tutorialsData = [];
const topicsSet = new Set();
const modesSet = new Set();

// Fetch and load the tutorials JSON data
fetch('https://raw.githubusercontent.com/hernandezj1/digital-humanities-resources/e33749c76fe8bd2e749564c1dafd8b2a2c1dded9/data/tutorials.json')
    .then(response => response.json())
    .then(data => {
        tutorialsData.push(...data);
        data.forEach(tutorial => {
            tutorial.topics.forEach(topic => topicsSet.add(topic));
            tutorial.mode.forEach(mode => modesSet.add(mode));
        });
        renderFilters();
        renderTutorials(tutorialsData);
    });

// Render the topic and mode filters
function renderFilters() {
    const topicList = document.getElementById('topicList');
    topicsSet.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        li.onclick = () => filterByTopic(topic);
        topicList.appendChild(li);
    });

    const modeList = document.getElementById('modeList');
    modesSet.forEach(mode => {
        const li = document.createElement('li');
        li.textContent = mode;
        li.onclick = () => filterByMode(mode);
        modeList.appendChild(li);
    });
}

// Render the tutorials
function renderTutorials(tutorials) {
    const tutorialsContainer = document.getElementById('tutorials');
    tutorialsContainer.innerHTML = '';
    tutorials.forEach(tutorial => {
        const tutorialBlock = document.createElement('div');
        tutorialBlock.classList.add('tutorial-block');
        tutorialBlock.innerHTML = `
            <h3><a href="${tutorial.link}" target="_blank">${tutorial.title}</a></h3>
            <p>${tutorial.description}</p>
        `;
        tutorialsContainer.appendChild(tutorialBlock);
    });
}

// Filter tutorials by search term
function filterData() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredTutorials = tutorialsData.filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchTerm)
    );
    renderTutorials(filteredTutorials);
}

// Filter tutorials by topic
function filterByTopic(topic) {
    const filteredTutorials = tutorialsData.filter(tutorial => 
        tutorial.topics.includes(topic)
    );
    renderTutorials(filteredTutorials);
}

// Filter tutorials by mode
function filterByMode(mode) {
    const filteredTutorials = tutorialsData.filter(tutorial => 
        tutorial.mode.includes(mode)
    );
    renderTutorials(filteredTutorials);
}
