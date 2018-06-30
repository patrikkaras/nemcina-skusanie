var socket = io();
var resultStatus = 'none';
var actualWord = {};

$(document).ready(function() {
	$('#submit').on('click', function(e) {
		if ($('#result').val() != '' && resultStatus == 'none') {
			actualWord.result = $('#result').val();
			socket.emit('submit', actualWord);
		} else if (resultStatus == 'correct' || $('#podst').val() == '') {
			nextWord();
		}
		e.preventDefault();
	});
	$('#next').on('click', function(e) {
		nextWord();
		e.preventDefault();
	});
	$('#result').on('keydown', function(e) {
		if (e.which == 9) {
			nextWord();
			e.preventDefault();
		}
	});
	socket.on('next', function(randomWord) {
		actualWord = randomWord;
		if ($('#show-transl').prop('checked')) {
			actualWord.pridFin = randomWord.prid + ' (' + randomWord.pridSk + ')';
			if (randomWord.clen.substr(0, 8) == "(Plural)") {
				randomWord.podstSk += " | " + randomWord.mnoz;
			}
			actualWord.podstFin = randomWord.podst + ' (' + randomWord.podstSk + ')';
		} else {
			actualWord.pridFin = randomWord.prid;
			actualWord.podstFin = randomWord.podst;
		}
		if ($('#show-artik').prop('checked')) {
			actualWord.podstFin = randomWord.clen + ' ' + randomWord.podstFin;
		} else {
			actualWord.podstFin = randomWord.podst;
		}
		$('#pad').val(actualWord.pad);
		$('#clen-typ').val(actualWord.clen_typ);
		$('#prid').val(actualWord.pridFin);
		$('#podst').val(actualWord.podstFin);
		$('#result').val('');
		$('#submit').addClass('disabled');
		resultStatus = 'none';
	});
	$('#result').on('input', function(e) {
		if ($('#result').val() == '' || $('#podst').val() == '') {
			$('#submit').addClass('disabled');
		} else {
			$('#submit').removeClass('disabled');
		}
		markValidationResult();
		resultStatus = 'none';
	})
	socket.on('correct-answer', function(correctResult) {
		markValidationResult('success');
		$('#correct-result').val(correctResult);
		resultStatus = 'correct';
	});
	socket.on('incorrect-answer', function(correctResult) {
		markValidationResult('error');
		$('#correct-result').val(correctResult);
		resultStatus = 'incorrect';
	});
});

function markValidationResult(result) {
	if (result == 'success') {
		$('#result-group').removeClass('has-error');
		$('#result-glyph').removeClass('glyphicon-remove');
		$('#result-group').addClass('has-success');
		$('#result-glyph').addClass('glyphicon-ok');
	} else if (result == 'error') {
		$('#result-group').removeClass('has-success');
		$('#result-glyph').removeClass('glyphicon-ok');
		$('#result-group').addClass('has-error');
		$('#result-glyph').addClass('glyphicon-remove');
	} else {
		$('#result-group').removeClass('has-error');
		$('#result-glyph').removeClass('glyphicon-remove');
		$('#result-group').removeClass('has-success');
		$('#result-glyph').removeClass('glyphicon-ok');
	}
};

function nextWord() {
	socket.emit('next', $('#result').val());
		if ($('#result').val() == '' || $('#podst').val() == '') {
			$('#submit').addClass('disabled');
		} else {
			$('#submit').removeClass('disabled');
		}
		markValidationResult();
}