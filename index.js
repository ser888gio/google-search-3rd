const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetch(`http://localhost:63342/goole-search/`)
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
    const formattedData = document.getElementById('search-results').innerHTML;
    const downloadParsed = parseArticleInfo(formattedData)
    const blob = new Blob([downloadParsed], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'results.txt';

    downloadLink.click();
    window.URL.revokeObjectURL(url);

});

function parseArticleInfo(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const results = Array.from(doc.querySelectorAll('.result'))
        .map(result => {
            const titleElement = result.querySelector('h2 a');
            const title = titleElement ? titleElement.textContent.trim() : '';

            const linkElement = titleElement;
            const link = linkElement ? linkElement.href : '';

            const snippetElement = result.querySelector('p');
            const snippet = snippetElement ? snippetElement.textContent.trim() : '';

            return `Article - Title: ${title}\nLink: ${link}\nSnippet: ${snippet}\n\n`;
        });

    return results.join('');
}







