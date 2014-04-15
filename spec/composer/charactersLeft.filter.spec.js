describe ('minerva.composer', function () {
  beforeEach(module('minerva.composer'));

  describe('charactersLeft', function () {

    it('returns max length as the number of characters left when input text is empty', inject(function ($filter) {
      var maxlength = 10;

      var charactersLeftCount = $filter('charactersLeft')("", maxlength);
      expect(charactersLeftCount).to.equal(10);
    }));

    it('returns max length as the number of characters left when input text is undefined', inject(function ($filter) {
      var maxlength = 10;

      var charactersLeftCount = $filter('charactersLeft')(undefined, maxlength);
      expect(charactersLeftCount).to.equal(10);
    }));

    it('returns max length as the number of characters left when input text is null', inject(function ($filter) {
      var maxlength = 10;

      var charactersLeftCount = $filter('charactersLeft')(null, maxlength);
      expect(charactersLeftCount).to.equal(10);
    }));

    it('calculates number of characters left in a text to reach the max length', inject(function ($filter) {
      var maxlength = 10;

      var charactersLeftCount = $filter('charactersLeft')("abcd", maxlength);
      expect(charactersLeftCount).to.equal(6);

      var charactersLeftCount = $filter('charactersLeft')("abcde", maxlength);
      expect(charactersLeftCount).to.equal(5);
    }));

    it('returns a negative number of characters left when text length is greater than the max allowed length', inject(function ($filter) {
      var maxlength = 3;

      var charactersLeftCount = $filter('charactersLeft')("abcd", maxlength);

      expect(charactersLeftCount).to.equal(-1);
    }));

    it('ignores line break characters', inject(function ($filter) {
      var maxlength = 10;

      var charactersLeftCount = $filter('charactersLeft')("abcd\nef", maxlength);

      expect(charactersLeftCount).to.equal(4);
    }));

    it('ignores carriage return characters', inject(function ($filter) {
      var maxlength = 10;

      var charactersLeftCount = $filter('charactersLeft')("abcd\ref", maxlength);

      expect(charactersLeftCount).to.equal(4);
    }));
  });
});