var expect = require('expect.js');

var pipe = require('../dist/index.js').pipe;
var compose = require('../dist/index.js').compose;
var curry = require('../dist/index.js').curry;
var curryRight = require('../dist/index.js').curryRight;
var debounce = require('../dist/index.js').debounce;
var throttle = require('../dist/index.js').throttle;

describe('单元测试', function() {
    this.timeout(5000);

    describe('pipe', function() {
        it('normal', function() {
            function a(x) {
                return x + 10;
            }
            function b(x) {
                return x * 10;
            }
            expect(pipe(a, b)(1)).to.equal(110);
            expect(pipe(a, b)(10)).to.equal(200);
            expect(pipe(b, a)(1)).to.equal(20);
            expect(pipe(b, a)(10)).to.equal(110);
        });
    })

    describe('compose', function() {
        it('normal', function() {
            function a(x) {
                return x + 10;
            }
            function b(x) {
                return x * 10;
            }
            expect(compose(a, b)(1)).to.equal(20);
            expect(compose(a, b)(10)).to.equal(110);
            expect(compose(b, a)(1)).to.equal(110);
            expect(compose(b, a)(10)).to.equal(200);
        });
    })

    describe('curry', function() {
        it('error', function() {
            expect(function() { curry(1) }).to.throwException('curry: first param must is function')
            expect(function() { curry(function () {}, 'ggg') }).to.throwException('curry: second param must is number')
        })

        it('normal', function() {
            function f(a, b, c) {
                return a + b + c;
            }

            var cf1 = curry(f);
            var cf2 = curry(f);

            expect(cf1(1, 2, 3)).to.equal(6);
            expect(cf1(1, 2, 4)).to.equal(7);
            expect(cf1(1, 2)(5)).to.equal(8);
            expect(cf1(1)(2, 6)).to.equal(9);
            expect(cf1(1)(3)(5)).to.equal(9);

            expect(cf2(1)(2)(3)).to.equal(6);
        })

        it('len', function() {
            function f(a, b, c) {
                return a + b + c;
            }

            var cf1 = curry(f, 4);

            expect(cf1(1, 2, 3)(4)).to.equal(6);
        });
    })

    describe('curryRight', function() {
        it('error', function() {
            expect(function() { curryRight(1) }).to.throwException('curryRight: first param must is function')
            expect(function() { curryRight(function () {}, 'ggg') }).to.throwException('curryRight: second param must is number')
        })

        it('normal', function() {
            function f(a, b, c) {
                return a + b + c;
            }

            var cf1 = curryRight(f);
            var cf2 = curryRight(f);

            expect(cf1(1, 2, 3)).to.equal(6);
            expect(cf1(1, 2, 4)).to.equal(7);
            expect(cf1(1, 2)(5)).to.equal(8);
            expect(cf1(1)(2, 6)).to.equal(9);
            expect(cf1(1)(3)(5)).to.equal(9);

            expect(cf2(1)(2)(3)).to.equal(6);
        })

        it('len', function() {
            function f(a, b, c) {
                return a + b + c;
            }

            var cf1 = curryRight(f, 4);

            expect(cf1(1, 2, 3)(4)).to.equal(7);
        });
    })

    describe('debounce', function() {
        it('error', function() {
            expect(function() { debounce(1) }).to.throwException('debounce: first param must is function')
            expect(function() { debounce(function () {}, 'ggg') }).to.throwException('debounce: second param must is number')
        })

        it('normal', function(done) {
            var a = 1;
            function f() {
                return a++;
            }

            var df = debounce(f, 100);

            df()
            df()
            df()
            expect(a).to.equal(1);

            setTimeout(function () {
                df()
                df()
                df()
                expect(a).to.equal(2)

                setTimeout(function () {
                    expect(a).to.equal(3)
                    done()
                }, 100);
            }, 100);
        })
    })

    describe('throttle', function() {
        it('error', function() {
            expect(function() { throttle(1) }).to.throwException('throttle: first param must is function')
            expect(function() { throttle(function () {}, 'ggg') }).to.throwException('throttle: second param must is number')
        })

        it('normal', function(done) {
            var a = 1;
            function f() {
                return a++;
            }

            var tf = throttle(f, 400);

            var tid = setInterval(function () {
                tf()
            }, 200);

            tf();

            expect(a).to.equal(2);

            setTimeout(function () {
                expect(a).to.equal(3)
            }, 600);
            setTimeout(function () {
                expect(a).to.equal(4)
            }, 1000);
            setTimeout(function () {
                expect(a).to.equal(5)
            }, 1400);
            setTimeout(function () {
                clearInterval(tid);
                expect(a).to.equal(6)
                done()
            }, 1800);
        })
    })
});
