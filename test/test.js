var expect = require('expect.js');

var pipe = require('../dist/index.js').pipe;
var compose = require('../dist/index.js').compose;

describe('单元测试', function() {
    this.timeout(1000);

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
});
