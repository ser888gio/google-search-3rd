const express = require('express')
const app = express();

app.listen(63342, ()=>{
    console.log('Server is listening on port 63342')
})

app.get('/api', (request, response) =>{
    const apiKey = 'AIzaSyBJ6nxs8xXs9GlftJyVGrfaW4O9SGppvNw';
    const searchEngineId = 'b6019a74f4ac248ff';
    const searchTerm = request.query.q

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchTerm}`)
        .then(responseObj => response.json(responseObj))
        .catch(error => {
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching search results');
})
