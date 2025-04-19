const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const host = '127.0.0.1';

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set up the view engine
app.set('view engine', 'ejs');

// FizzBuzz function for a single number
function fizzBuzzSingle(number) {
    if (number % 3 === 0 && number % 5 === 0) {
        return "FizzBuzz";
    } else if (number % 3 === 0) {
        return "Fizz";
    } else if (number % 5 === 0) {
        return "Buzz";
    } else {
        return number.toString();
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { result: null });
});

app.post('/fizzbuzz', (req, res) => {
    const number = parseInt(req.body.number);

    if (isNaN(number) || number < 1) {
        return res.render('index', {
            error: 'Please enter a positive number',
            result: null
        });
    }

    const result = fizzBuzzSingle(number);
    res.render('index', { result, number });
});

// Server start
app.listen(port, host, () => {
    console.log(`FizzBuzz server running at http://${host}:${port}`);
});