
const apiKey = 'AIzaSyBJ6nxs8xXs9GlftJyVGrfaW4O9SGppvNw ';
const searchEngineId = 'b6019a74f4ac248ff';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const resultsHtml = data.items.map(result => {
                    return `
                                <div class="result">
                                    <h2><a href="${result.link}">${result.title}</a></h2>
                                    <p>${result.snippet}</p>
                                </div>                            
                            `
                }).join('');
                searchResults.innerHTML = resultsHtml;
            })
            .catch(error => console.error(error));
    }
});


const buttonDownload = document.getElementById('button-downlaod');

buttonDownload.addEventListener('click', (e) => {
    const textContent = searchResults.innerHTML.replace(/<[^>]*>/g, '');
    const data = { results: textContent };
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], {type: 'application/json'});
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'results';
    downloadLink.click();
});

