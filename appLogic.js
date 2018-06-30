var fs = require('fs');
var xml2js = require('xml2js').parseString;

// globals
var slova;
var pady = ['N', 'G', 'D', 'A'];
var clen_typy = ['urcity_clen', 'neurcity_clen', 'bez_clena'];
var deklinacia = {
	urcity_clen: {
		muz: {
			N: ['der', 'e', ''],
			G: ['des', 'en', 'es'],
			D: ['dem', 'en', ''],
			A: ['den', 'en', '']
		},
		zen: {
			N: ['die', 'e', ''],
			G: ['der', 'en', ''],
			D: ['der', 'en', ''],
			A: ['die', 'e', '']
		},
		stred: {
			N: ['das', 'e', ''],
			G: ['des', 'en', 'es'],
			D: ['dem', 'en', ''],
			A: ['das', 'e', '']
		},
		mnoz: {
			N: ['die', 'en', ''],
			G: ['der', 'en', ''],
			D: ['den', 'en', 'en'],
			A: ['die', 'en', '']
		}
	},
	neurcity_clen: {
		muz: {
			N: ['ein', 'er', ''],
			G: ['eines', 'en', 'es'],
			D: ['einem', 'en', ''],
			A: ['einen', 'en', '']
		},
		zen: {
			N: ['eine', 'e', ''],
			G: ['einer', 'en', ''],
			D: ['einer', 'en', ''],
			A: ['eine', 'e', '']
		},
		stred: {
			N: ['ein', 'es', ''],
			G: ['eines', 'en', 'es'],
			D: ['einem', 'en', ''],
			A: ['ein', 'es', '']
		}
	},
	bez_clena: {
		muz: {
			N: ['', 'er', ''],
			G: ['', 'en', 'es'],
			D: ['', 'em', ''],
			A: ['', 'en', '']
		},
		zen: {
			N: ['', 'e', ''],
			G: ['', 'er', ''],
			D: ['', 'er', ''],
			A: ['', 'e', '']
		},
		stred: {
			N: ['', 'es', ''],
			G: ['', 'en', 'es'],
			D: ['', 'em', ''],
			A: ['', 'es', '']
		},
		mnoz: {
			N: ['', 'e', ''],
			G: ['', 'er', ''],
			D: ['', 'en', 'en'],
			A: ['', 'e', '']
		}
	}
};

var getSlova = function(cb) {
	var data = fs.readFileSync('./data/slovnik.xml');
	var slovnikXmlString = data.toString();
	xml2js(slovnikXmlString, function(err, result) {
		if (err) throw err;
		cb(result.slovicka.slovo);
	});
};
getSlova(function(slovaObj) { slova = slovaObj; });

var calcResult = function(wordObject) {
	var rod, pad, clen_typ, clen, prid, podst, mnoz;
	pad = wordObject.pad;
	clen_typ = wordObject.clen_typ;
	clen = wordObject.clen;
	prid = wordObject.prid;
	podst = wordObject.podst;
	mnoz = (wordObject.mnoz && wordObject.mnoz.length > 0) ? wordObject.mnoz : null;
	switch (clen) {
		case 'der':
			rod = 'muz';
			break;
		case 'die':
			rod = 'zen';
			break;
		case 'das':
			rod = 'stred';
			break;
		case '(Plural) der':
		case '(Plural) die':
		case '(Plural) das':
		case 'mnoz':
			rod = 'mnoz';
			break;
	}
	if (rod == 'mnoz') {
		if (clen_typ == 'neurcity_clen') {
			// console.log('cannot calculate plural for neurcity clen');
			return null;
		}
		mnoz = mnoz == null ? getMnozByPodst(podst) : mnoz;
		if (mnoz == undefined) {
			console.log('mnoz is undefined');
			mnoz = '|cannot find word in slovnik to find mnoz|';
		}
		if (mnoz == '-') {
			podst = podst;
		} else if (mnoz.indexOf('-') < 0 && mnoz.length <= 3) {
			podst += mnoz;
		} else if (mnoz.indexOf('-') < 0 && mnoz.length > 3) {
			podst = mnoz;
		} else if (mnoz.indexOf('-') >= 0) {
			var vowelMnoz = mnoz.substring(0, 1);
			var vowelPodst = '';
			switch (vowelMnoz) {
				case 'ä':
					vowelPodst = 'aA';
					break;
				case 'ö':
					vowelPodst = 'oO';
					break;
				case 'ü':
					vowelPodst = 'uU';
					break;
				default:
					// console.log('cannot find vowel in dash mnoz');
			}
			var vowelPodstPosition = podst.lastIndexOf(vowelPodst.charAt(0));
			if (vowelPodstPosition < 0 ) {
				vowelPodstPosition = podst.lastIndexOf(vowelPodst.charAt(1));
				vowelMnoz = vowelMnoz.toUpperCase();
			}
			podst = podst.substring(0, vowelPodstPosition) + vowelMnoz + podst.substr(vowelPodstPosition + 1) + mnoz.substr(2);
		} else {
			podst += '|cannot build mnoz|';
		}
	}
	var correctClen = deklinacia[clen_typ][rod][pad][0] == '' ? '' : deklinacia[clen_typ][rod][pad][0] + ' ';
	var correctKoncPrid = deklinacia[clen_typ][rod][pad][1];
	var correctKoncPodst = deklinacia[clen_typ][rod][pad][2];
	// Exceptions - start
	if (
		'en'.indexOf(podst.substr(podst.length - 2)) >= 0 ||
		'es'.indexOf(podst.substr(podst.length - 2)) >= 0 ||
		('sn'.indexOf(podst.substr(podst.length - 1)) >= 0
			&& 'nn'.indexOf(podst.substr(podst.length - 2)) < 0
			&& 'is'.indexOf(podst.substr(podst.length - 2)) < 0
		)
	) {	// word in ending with -n / -s so no additional -en is added
		correctKoncPodst = '';
	} else if ('aeiourlsg'.indexOf(podst.charAt(podst.length - 1)) >= 0
		&& 'ung'.indexOf(podst.substr(podst.length - 3)) < 0
	) {	// word in ending with vowel or -r / -l / -s / -g so only -n is added
		correctKoncPodst = correctKoncPodst.substr(1);
	}
	if ('e'.indexOf(prid.charAt(prid.length - 1)) >= 0 && correctKoncPrid.charAt(0) == 'e') { // prid is ending on -e and koncovka has 'e' at start
		correctKoncPrid = correctKoncPrid.substr(1);
	}
	// Exceptions - end
	var correctResult = correctClen + prid + correctKoncPrid + ' ' + podst + correctKoncPodst;
	return correctResult;
}

function getMnozByPodst(podst) {
	var slovaLength = slova.length;
	for (var i = 0; i < slovaLength; i++) {
		if (podst == slova[i].de) {
			return slova[i].mnoz[0];
		}
	}
}

var exportSlova = function(req, res, to, from) {
	var fileString = '';
	var slovaLength = slova.length;
	var clen_typLength = clen_typy.length;
	var padLength = pady.length;
	var clen, row;
	var rowNum = 0;
	var rowCount = 0;
	var logFromToString = (!from && !to) ? '' : ((!from && to) ? ' to '+to+' ' : ' from '+from+' to '+to+' ');
	var isEnd = false;
	var startTime = new Date();
	for (var i = 0; i < slovaLength; i++) {	// 0 - slovaLength
		if (slova[i].druh != 'prid.m.')
			continue;
		if (isEnd)
			break;
		for (var j = 0; j < slovaLength; j++) {
			if (slova[j].druh != 'podst.m.')
				continue;
			if (isEnd)
				break;
			for (var k = 0; k < clen_typLength; k++) {
				for (var l = 0; l < padLength; l++) {
					for (var m = 0; m < 2; m++) {
						clen = slova[j].clen[0];
						if (m == 1) {
							clen = '(Plural) ' + clen;
							if (clen_typy[k] == 'neurcity_clen') break;
						}
						if ((from && to && rowNum >= from && rowNum <= to) || (!from && to && rowNum <= to) || (!from && !to)) {
							row = calcResult({pad: pady[l], clen_typ: clen_typy[k], clen: clen, prid: slova[i].de[0], podst: slova[j].de[0], mnoz: slova[j].mnoz[0]});
							fileString += row + ',\r\n';
							if (rowCount % 100000 == 0) {
								console.log('exported ' + rowCount.toLocaleString() + ' records');
							}
							rowCount++;
						}
						if (to && to == rowNum)
							isEnd = true;
						rowNum++;
					}
				}
			}
		}
	}
	var endTime = new Date();
	var runTimeSecs = (endTime.getTime() - startTime.getTime()) / 1000;
	fs.writeFile('./data/export.csv', fileString, function(err) {
		if (err) throw err;
		res.status(200).send(rowCount.toLocaleString() + ' rows ' + logFromToString + 'exported to file ./data/export.csv in ' + runTimeSecs + ' seconds.');
	});
}

var getRandomWord = function() {
	var randomWord = {};
	randomWord.pad = pady[Math.floor(Math.random() * 4)];
	randomWord.clen_typ = clen_typy[Math.floor(Math.random() * 3)];
	var i;
	do {
		i = Math.floor(Math.random() * slova.length);
		console.log('traversing ' + slova[i].druh[0] + ': ' + slova[i].clen[0] + ' ' + slova[i].de[0] + ' - ' + i);
		switch (slova[i].druh[0]) {
			case 'prid.m.':
				randomWord.prid = slova[i].de[0];
				randomWord.pridSk = slova[i].sk[0];
				break;
			case 'podst.m.':
				randomWord.clen = slova[i].clen[0];
				randomWord.podst = slova[i].de[0];
				randomWord.podstSk = slova[i].sk[0];
				randomWord.mnoz = slova[i].mnoz[0];
				break;
			default:
				break;
		};
	} while (!randomWord.prid || !randomWord.podst);
	randomWord.clen = (randomWord.clen_typ != 'neurcity_clen' && Math.random() > 0.75) ? '(Plural) ' + randomWord.clen : randomWord.clen;
	return randomWord;
}


module.exports.calcResult = calcResult;
module.exports.getSlova = getSlova;
module.exports.exportSlova = exportSlova;
module.exports.getRandomWord = getRandomWord;