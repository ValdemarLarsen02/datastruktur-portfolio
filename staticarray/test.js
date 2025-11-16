import assert from 'assert';
import StaticArray from './staticarray.js';

describe('StaticArray', function() {
  describe(".length", function() {
    it('should return the size of the array being created', function() {
      const arr = new StaticArray(5);
      assert.equal(arr.length, 5);
    });
    it("should be read-only", function() {
      const arr = new StaticArray(5);
      try {
        arr.length = 10;
        assert.fail("arr.length should be read-only");
      } catch (error) {
        assert.ok(true);
      }
    });
  });

  describe("#set()", function() {
    it('should set the value at the index', function() {
      const arr = new StaticArray(5);
      arr.set(0,'A');
      arr.set(1,'B');
      arr.set(2,'C');
      arr.set(3,'D');
      arr.set(4,'E');
      assert.equal(arr.get(0), 'A');
      assert.equal(arr.get(1), 'B');
      assert.equal(arr.get(2), 'C');
      assert.equal(arr.get(3), 'D');
      assert.equal(arr.get(4), 'E');
    });
    it('should throw a RangeError if the index is out of bounds', function() {
      const arr = new StaticArray(5);
      try {
        arr.set(5, 'F');
        assert.fail("arr.set(5) should throw a RangeError");
      } catch (error) {
        assert.ok(true);
      }
    });
  });

  describe("#get()", function() {
    it('should return the value at the index', function() {
      const arr = new StaticArray(5);
      arr.set(0,'A');
      arr.set(1,'B');
      arr.set(2,'C');
      arr.set(3,'D');
      arr.set(4,'E');
      assert.equal(arr.get(0), 'A');
      assert.equal(arr.get(1), 'B');
      assert.equal(arr.get(2), 'C');
      assert.equal(arr.get(3), 'D');
      assert.equal(arr.get(4), 'E');
    });
    it('should throw a RangeError if the index is out of bounds', function() {
      const arr = new StaticArray(5);
      try {
        arr.get(5);
        assert.fail("arr.get(5) should throw a RangeError");
      } catch (error) {
        assert.ok(true);
      }
    });
  });

  describe("[index]", function() {
    it('should set the value at the index', function() {
      const arr = new StaticArray(5);
      arr[0] = 'A';
      arr[1] = 'B';
      arr[2] = 'C';
      arr[3] = 'D';
      arr[4] = 'E';
      assert.equal(arr.get(0), 'A');
      assert.equal(arr.get(1), 'B');
      assert.equal(arr.get(2), 'C');
      assert.equal(arr.get(3), 'D');
      assert.equal(arr.get(4), 'E');
    });
    it('should get the value at the index', function() {
      const arr = new StaticArray(5);
      arr.set(0,'A');
      arr.set(1,'B');
      arr.set(2,'C');
      arr.set(3,'D');
      arr.set(4,'E');
      assert.equal(arr[0], 'A');
      assert.equal(arr[1], 'B');
      assert.equal(arr[2], 'C');
      assert.equal(arr[3], 'D');
      assert.equal(arr[4], 'E');
    });
    it('should throw a RangeError if the index >= size', function() {
      const arr = new StaticArray(5);
      try {
        arr[5] = 'F';
        assert.fail("arr[5] should throw a RangeError");
      } catch (error) {
        assert.ok(true);
      }
    });
    it('should throw a RangeError if the index < 0', function() {
      const arr = new StaticArray(5);
      try {
        arr[-1] = 'F';
        assert.fail("arr[-1] should throw a RangeError");
      } catch (error) {
        assert.ok(true);
      }
    });
  });

  describe("iterator", function() {
    it('should iterate over the array', function() {
      const arr = new StaticArray(5);
      arr.set(0,'A');
      arr.set(1,'B');
      arr.set(2,'C');
      arr.set(3,'D');
      arr.set(4,'E');
      let i = 0;
      for(const value of arr) {
        assert.equal(value, String.fromCharCode(65+i));
        i++;
      }
    });
  });
});