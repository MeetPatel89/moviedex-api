require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movies = require('./movies-dataset.json');

// Initializing the express server
const app = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());



// Middleware function to validate bearer token

const validateBearerToken = (req, res, next) => {
    const apiToken = process.env.API_TOKEN;
    const authorizationToken = req.get('Authorization');
    console.log('Common middleware function');
    
    (!authorizationToken || authorizationToken.split(" ")[1] !== apiToken) &&
    res.status(401).json({error: 'Unauthorized request'});
    
    next();
};


// Middleware handler function for controller action 

const handleGetMovie = (req, res) => {
    console.log('Get movie middleware');
    console.log(req.query);
    let response = movies;
    if (req.query.genre) {
        response = response.filter(movie => {
            return movie.genre.toLowerCase().includes(req.query.genre.toLowerCase());
        });
    };

    if (req.query.country) {
        response = response.filter(movie => {
            return movie.country.toLowerCase().includes(req.query.country.toLowerCase());
        });
    };

    if (req.query.avg_vote) {
        response = response.filter(movie => {
            return parseFloat(movie.avg_vote) >= parseFloat(req.query.avg_vote);
        });
    };

    res.json(response);


};



app.use(validateBearerToken);

// Express GET requests

app.get('/movie', handleGetMovie);

const port = 3000;
const serverListen = () => {
    console.log(`Server listening at http://localhost:${port}`);
}

app.listen(port, serverListen);

