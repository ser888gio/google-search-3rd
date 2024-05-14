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

const downloadButton = document.getElementById('button-downlaod');
downloadButton.addEventListener('click', () => {
    const formattedData = document.getElementById('search-results').innerHTML;;
    const downloadParsed = parseArticleInfo(formattedData)
    const blob = new Blob([downloadParsed], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'search_results.txt';

    downloadLink.click();
    window.URL.revokeObjectURL(url);

});

function parseArticleInfo(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const results = Array.from(doc.querySelectorAll('.result'))
        .map(result => {
            const titleElement = result.querySelector('h2 a');
            const title = titleElement ? titleElement.textContent.trim() : ''; // Extract title

            const linkElement = titleElement; // Assuming link is within the title anchor
            const link = linkElement ? linkElement.href : ''; // Extract link

            const snippetElement = result.querySelector('p');
            const snippet = snippetElement ? snippetElement.textContent.trim() : '';

            return `Article - Title: ${title}\nLink: ${link}\nSnippet: ${snippet}\n\n`;
        });

    return results.join('');
}







