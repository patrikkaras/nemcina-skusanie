var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var appLogic = require('./appLogic');

// Globals
var slova;
appLogic.getSlova(function(slovaObj) { slova = slovaObj; });

// Routes
app.get('/', function(req, res) {
	res.status(200).sendFile(__dirname + '/public/index.html');
});
app.get('/export', function(req, res) {
	appLogic.exportSlova(req, res);
});
app.get('/export/:to', function(req, res) {
	appLogic.exportSlova(req, res, req.params.to);
});
app.get('/export/:from/:to', function(req, res) {
	appLogic.exportSlova(req, res, req.params.to, req.params.from);
});

// App use
app.use(express.static('public'));

// Socket IO
io.on('connection', function(socket) {
	console.log('client connected');
	socket.on('disconnect', function() {
		console.log('client disconnected');
	});
	socket.on('submit', function(word) {
		console.log('submitted result from client: ' + word.result + '. Input: ', word.pad, word.clen_typ, word.clen, word.prid, word.podst);
		if (!word.result || !word.pad || !word.clen) {
			console.log('Result or word is not given');
			return;
		}
		var correctResult = appLogic.calcResult(word);
		console.log('correct result: ' + correctResult);
		if (word.result == correctResult) {
			console.log('correct answer!');
			socket.emit('correct-answer', correctResult);
		} else {
			console.log('incorrect answer!');
			socket.emit('incorrect-answer', correctResult);
		}
	});
	socket.on('next', function(data) {
		var randomWord = appLogic.getRandomWord();
		socket.emit('next', randomWord);
		console.log('emitting next from server with word: ' + randomWord.pad + ' ' + randomWord.clen + ' ' + randomWord.prid + ' ' + randomWord.podst);
	});
});

// Server run
var server = http.listen(process.env.PORT || '1337', function() {
	console.log('Running on port ' + server.address().port);
});
