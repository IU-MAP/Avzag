let rewire = require('rewire');
let chai = require('chai');
let should = chai.should();

let search = rewire('../src/Dictionary/search.ts');
let checkSegment = search.__get__('checkSegment');
let checkTag = search.__get__('chechTag');

describe("Checking segment", function() {
    it("checks for exact match", function(done) {
        checkSegment("hello", "hello").should.equal(true);
        done();
    });

    it("checks for exact match", function(done) {
        checkSegment("hello", "hell").should.equal(false);
        done();
    });

    it('checks startsWith', function(done) {
        checkSegment("hello", "+he").should.equal(true);
        done();
    });

    it("checks startsWith", function(done) {
        checkSegment("hello", "+").should.equal(true);
        done();
    });

    it("checks startsWith", function(done) {
        checkSegment("hello", "+eh").should.equal(false);
        done();
    });

    it("checks endsWith", function(done) {
        checkSegment("hello", "-llo").should.equal(true);
        done();
    });

    it("checks endsWith", function(done) {
        checkSegment("hello", "-").should.equal(true);
        done();
    });

    it("checks endsWith", function(done) {
        checkSegment("hello", "-oll").should.equal(false);
        done();
    });

    it("checks default", function(done) {
        checkSegment("hello", "ll").should.equal(true);
        done();
    });

    it("checks default", function(done) {
        checkSegment("hello", "").should.equal(true);
        done();
    });

    it("checks default", function(done) {
        checkSegment("hello", "ol").should.equal(false);
        done();
    });
});

describe("Checking tags", function () {
    it("checks for correct tag", function(done) {
        checkSegment("word", "tag").should.equal(true);
        done();
    });
});