const express = require('express')
const app = express();

app.listen('PORT NUMBER', ()=>{
    console.log('Server is listening on port PORT NUMBER')
})

app.get('/api', (request, response) =>{
    const apiKey = 'INSERT API KEY';
    const searchEngineId = 'INSERT SEARCH ENIGNE ID';
    const searchTerm = request.query.q

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchTerm}`)
        .then(responseObj => response.json(responseObj))
        .catch(error => {
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching search results');
})
