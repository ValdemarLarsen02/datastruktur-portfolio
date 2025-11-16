# StaticArray
The **StaticArray** is an implementation of a classic static array, as known from C or Java, in JavaScript. Usual JavaScript arrays allows for elements to be added or removed anywhere in the array, and can modify their size (```.length```) at anytime. The **StaticArray** is created with an initial size, which can never be changed, and any attempt to access indexes beyond that size, will result in a ```RangeError``` being thrown.

Of course there is no practical use for this kind of array, except in demonstrating data structures that can work around the limitations of such an array. 

## Usage
Create a new static array by calling the constructor with the specified size:

    const arr = new StaticArray(10);

The ```.length``` property will then reflect the specified size:

    console.log(arr.length); // will show 10

Trying to modify the ```.length``` will throw an error:

    try {
      arr.length = 5;
    }
    catch(error) {
      console.log(error); // will show TypeError: .length property is read-only
    }

You can access the indexes of the StaticArray, like any other array:

    arr[0] = 'a';
    arr[1] = 'b';

    console.log(arr[0]); // will print a
    console.log(arr[1]); // will print b

trying to access an index outside of the size, will throw an error:

    try {
      arr[5] = 'f';
    }
    catch(error) {
      console.log(error); // will show RangeError: Index must be between 0 and length: 5
    }

You can also access the array using the ```.set``` and ```.get```methods:

    arr.set(2, 'c');
    arr.set(3, 'd');

    console.log(arr.get(2)); // will print c
    console.log(arr.get(3)); // will print d

They will also throw an ```RangeException``` if trying to access an index outside the size:

    try {
      arr.get(-1);
    }
    catch(error) {
      console.log(error); // will show RangeError: Index must be between 0 and length: 5
    }

There are no other methods on the ```StaticArray``` and trying to call one, will result in a TypeError.

### Iteration
You can of course iterate through all elements of a StaticArray the same way you would any other array, using a traditional for loop:

    for(let i=0; i < arr.length; i++) {
      const val = arr[i];
      // do something with val 
      // ...
    }

But remember that going beyond .length will throw an exception!

You can also use the more convenient for...of loop:

    for(const val of arr) {
      // do something with val 
      // ...
    }

which will automatically access all .length elements in the array.

Any operation that requires an iterable, like spread operator, yield* or destructuring will work just as well with a StaticArray as with a traditional JavaScript array.

## Reference
The ```StaticArray``` object wraps an actual JavaScript array as a private internal property, to keep the values set at indexes - but this array is completely inaccessible from the outside.

The ```.length``` property is also a private internal property, but with a getter exposed, so it seems like a *normal* property.

Indexes in square brackets [ ] work as you would expect - but only indexes from 0 (including) to ```.length``` (excluding) will work.

The ```StaticArray``` is iterable, and can be used by any operation that requires an iterator.

### Properties
* ```.length``` (read-only) the size, aka. number of indexes, of the array.
* ```[```*```index```*```]``` (read/write) will return or set the value as that index. Unless the index is greater than or equal to the size, or less than zero - in those cases, a ```RangeError``` will be thrown.

### Methods
* ```.get( index )``` returns the value at that index. Equivalent to ```[index];```
* ```.set( index, value )``` sets the value at that index. Equivalent to ```[index] = value;```

## Test

Run the tests defined in ```test.js``` with mocha, by writing

    npx mocha

when in the current folder (```staticarray/```).