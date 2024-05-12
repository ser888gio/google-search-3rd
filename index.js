import {apiKey, searchEngineId} from './apikey.js'

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








