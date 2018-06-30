var assert = require('assert');
var should = require('should');
var appLogic = require('./appLogic');

describe('result calculation', function() {
	// describe('equal', function() {
	// 	it('should return -1 when the value is not present', function() {
	// 		assert.equal(-1, [1, 2, 3].indexOf(-1));
	// 	});
	// });
	// describe('should be', function() {
	// 	it('5 should be 10', function() {
	// 		(10).should.be.exactly(10).and.be.a.Number();
	// 	});
	// });
	describe('from word', function() {
		describe('urcity clen', function() {
			describe('muzsky rod', function() {
				it('N: der junge Mann', function() {
					(appLogic.calcResult({pad: 'N', clen_typ: 'urcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
						.should.be.exactly('der junge Mann');
				});
				it('G: des jungen Mannes', function() {
					(appLogic.calcResult({pad: 'G', clen_typ: 'urcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
						.should.be.exactly('des jungen Mannes');
				});
				it('D: dem jungen Mann', function() {
					(appLogic.calcResult({pad: 'D', clen_typ: 'urcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
						.should.be.exactly('dem jungen Mann');
				});
				it('A: den jungen Mann', function() {
					(appLogic.calcResult({pad: 'A', clen_typ: 'urcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
						.should.be.exactly('den jungen Mann');
				});it('A: den jungen Mann', function() {
					(appLogic.calcResult({pad: 'A', clen_typ: 'urcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
						.should.be.exactly('den jungen Mann');
				});
			});
			describe('zensky rod', function() {
				it('N: die schöne Frau', function() {
					(appLogic.calcResult({pad: 'N', clen_typ: 'urcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
						.should.be.exactly('die schöne Frau');
				});
				it('G: der schönen Frau', function() {
					(appLogic.calcResult({pad: 'G', clen_typ: 'urcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
						.should.be.exactly('der schönen Frau');
				});
				it('D: der schönen Frau', function() {
					(appLogic.calcResult({pad: 'D', clen_typ: 'urcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
						.should.be.exactly('der schönen Frau');
				});
				it('A: die schöne Frau', function() {
					(appLogic.calcResult({pad: 'A', clen_typ: 'urcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
						.should.be.exactly('die schöne Frau');
				});
			});
			describe('stredny rod', function() {
				it('N: das kleine Kind', function() {
					(appLogic.calcResult({pad: 'N', clen_typ: 'urcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('das kleine Kind');
				});
				it('G: des kleinen Kindes', function() {
					(appLogic.calcResult({pad: 'G', clen_typ: 'urcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('des kleinen Kindes');
				});
				it('D: dem kleinen Kind', function() {
					(appLogic.calcResult({pad: 'D', clen_typ: 'urcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('dem kleinen Kind');
				});
				it('A: das kleine Kind', function() {
					(appLogic.calcResult({pad: 'A', clen_typ: 'urcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('das kleine Kind');
				});
			});
			describe('mnozne cislo', function() {
				it('N: die kleinen Kinder', function() {
					(appLogic.calcResult({pad: 'N', clen_typ: 'urcity_clen', clen: 'mnoz', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('die kleinen Kinder');
				});
				it('G: der kleinen Kinder', function() {
					(appLogic.calcResult({pad: 'G', clen_typ: 'urcity_clen', clen: 'mnoz', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('der kleinen Kinder');
				});
				it('D: den kleinen Kindern', function() {
					(appLogic.calcResult({pad: 'D', clen_typ: 'urcity_clen', clen: 'mnoz', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('den kleinen Kindern');
				});
				it('A: die kleinen Kinder', function() {
					(appLogic.calcResult({pad: 'A', clen_typ: 'urcity_clen', clen: 'mnoz', prid: 'klein', podst: 'Kind'}))
						.should.be.exactly('die kleinen Kinder');
				});
			});
		});
	});
	describe('neurcity clen', function() {
		describe('muzsky rod', function() {
			it('N: ein junger Mann', function() {
				(appLogic.calcResult({pad: 'N', clen_typ: 'neurcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('ein junger Mann');
			});
			it('G: eines jungen Mannes', function() {
				(appLogic.calcResult({pad: 'G', clen_typ: 'neurcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('eines jungen Mannes');
			});
			it('D: einem jungen Mann', function() {
				(appLogic.calcResult({pad: 'D', clen_typ: 'neurcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('einem jungen Mann');
			});
			it('A: einen jungen Mann', function() {
				(appLogic.calcResult({pad: 'A', clen_typ: 'neurcity_clen', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('einen jungen Mann');
			});
		});
		describe('zensky rod', function() {
			it('N: eine schöne Frau', function() {
				(appLogic.calcResult({pad: 'N', clen_typ: 'neurcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('eine schöne Frau');
			});
			it('G: einer schönen Frau', function() {
				(appLogic.calcResult({pad: 'G', clen_typ: 'neurcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('einer schönen Frau');
			});
			it('D: einer schönen Frau', function() {
				(appLogic.calcResult({pad: 'D', clen_typ: 'neurcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('einer schönen Frau');
			});
			it('A: eine schöne Frau', function() {
				(appLogic.calcResult({pad: 'A', clen_typ: 'neurcity_clen', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('eine schöne Frau');
			});
		});
		describe('muzsky rod', function() {
			it('N: ein kleines Kind', function() {
				(appLogic.calcResult({pad: 'N', clen_typ: 'neurcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('ein kleines Kind');
			});
			it('G: eines kleinen Kindes', function() {
				(appLogic.calcResult({pad: 'G', clen_typ: 'neurcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('eines kleinen Kindes');
			});
			it('D: einem kleinen Kind', function() {
				(appLogic.calcResult({pad: 'D', clen_typ: 'neurcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('einem kleinen Kind');
			});
			it('A: ein kleines Kind', function() {
				(appLogic.calcResult({pad: 'A', clen_typ: 'neurcity_clen', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('ein kleines Kind');
			});
		});
	});
	describe('bez clena', function() {
		describe('muzsky rod', function() {
			it('N: junger Mann', function() {
				(appLogic.calcResult({pad: 'N', clen_typ: 'bez_clena', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('junger Mann');
			});
			it('G: jungen Mannes', function() {
				(appLogic.calcResult({pad: 'G', clen_typ: 'bez_clena', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('jungen Mannes');
			});
			it('D: jungem Mann', function() {
				(appLogic.calcResult({pad: 'D', clen_typ: 'bez_clena', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('jungem Mann');
			});
			it('A: jungen Mann', function() {
				(appLogic.calcResult({pad: 'A', clen_typ: 'bez_clena', clen: 'der', prid: 'jung', podst: 'Mann'}))
					.should.be.exactly('jungen Mann');
			});
		});
		describe('zensky rod', function() {
			it('N: schöne Frau', function() {
				(appLogic.calcResult({pad: 'N', clen_typ: 'bez_clena', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('schöne Frau');
			});
			it('G: schöner Frau', function() {
				(appLogic.calcResult({pad: 'G', clen_typ: 'bez_clena', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('schöner Frau');
			});
			it('D: schöner Frau', function() {
				(appLogic.calcResult({pad: 'D', clen_typ: 'bez_clena', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('schöner Frau');
			});
			it('A: schöne Frau', function() {
				(appLogic.calcResult({pad: 'A', clen_typ: 'bez_clena', clen: 'die', prid: 'schön', podst: 'Frau'}))
					.should.be.exactly('schöne Frau');
			});
		});
		describe('muzsky rod', function() {
			it('N: kleines Kind', function() {
				(appLogic.calcResult({pad: 'N', clen_typ: 'bez_clena', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('kleines Kind');
			});
			it('G: kleinen Kindes', function() {
				(appLogic.calcResult({pad: 'G', clen_typ: 'bez_clena', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('kleinen Kindes');
			});
			it('D: kleinem Kind', function() {
				(appLogic.calcResult({pad: 'D', clen_typ: 'bez_clena', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('kleinem Kind');
			});
			it('A: kleines Kind', function() {
				(appLogic.calcResult({pad: 'A', clen_typ: 'bez_clena', clen: 'das', prid: 'klein', podst: 'Kind'}))
					.should.be.exactly('kleines Kind');
			});
		});
		describe('mnozne cislo', function() {
			it('N: kleine Ziegen', function() {
				(appLogic.calcResult({pad: 'N', clen_typ: 'bez_clena', clen: 'mnoz', prid: 'klein', podst: 'Ziege'}))
					.should.be.exactly('kleine Ziegen');
			});
			it('G: kleiner Ziegen', function() {
				(appLogic.calcResult({pad: 'G', clen_typ: 'bez_clena', clen: 'mnoz', prid: 'klein', podst: 'Ziege'}))
					.should.be.exactly('kleiner Ziegen');
			});
			it('D: kleinen Ziegen', function() {
				(appLogic.calcResult({pad: 'D', clen_typ: 'bez_clena', clen: 'mnoz', prid: 'klein', podst: 'Ziege'}))
					.should.be.exactly('kleinen Ziegen');
			});
			it('A: kleine Ziegen', function() {
				(appLogic.calcResult({pad: 'A', clen_typ: 'bez_clena', clen: 'mnoz', prid: 'klein', podst: 'Ziege'}))
					.should.be.exactly('kleine Ziegen');
			});
		});
	});
});