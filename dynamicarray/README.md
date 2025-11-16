# DynamicArray
The **DynamicArray** is an implementation of a *dynamic array* also often known as **ArrayList**. It uses an underlying *static array* - an array that can neither grow, nor shrink - and keeps track of its size and capacity, making sure to *grow* when more elements are added than it currently has capacity for.

Because JavaScript arrays are by nature very dynamic, the **DynamicArray** uses a [StaticArray](../staticarray/) as the underlying array.

## Usage
Create a new dynamic array by calling the constructor with the initial capacity:

    const darr = new DynamicArray(5); // initial capacity of five elements

The capacity is usually an entirely internal property, but in this example it can be read with a call to the `capacity()` method.

However, the more important property, the size, reflects how many elements are currently in the dynamic array. Use `size()` to ask for the current size - it starts with being 0. 

    console.log(`there are currently ${darr.size()} elements in the array`);
    // should output: "There are currently 0 elements in the array"

Adding elements to the end of the list is a simple as calling the `add( item )` method with the item you wish to add:

    darr.add("Harry Potter");
    darr.add("Ronald Weasley");
    darr.add("Hermione Granger");

You can add as many items as you wish - size will reflect the total number of elements being added. You can even add more than the initial capacity.

    darr.add("Fred Weasley");
    darr.add("George Weasley");
    darr.add("Ginny Weasley");

Now there are *six* elements in the list, even though the initial capacity was only *five* - but when the sixth element was added, the list *grew*, by replacing the internal array with another one twice the size, copying every element from the original array to that one. And setting the capacity to the new value.

The usually internal `grow()` method should be called automatically when needed - and handles all of the growing/replacing of internal arrays.

In addition to adding new values, you can also read and modify existing values with the `get( index )` and `set( index, item )` methods:

    console.log("Ginnys brother is: " + darr.get(1)):
    // should output "Ronald Weasley"

    darr.set(1, "Ron Weasley");
    // should replace Ronald with Ron.

Since the array is dynamic, new items can also be inserted between existing ones, or they can removed entirely, with the `insert( index, item )` and `remove( index )` methods.

    darr.insert(1, "Cho Chang");
    // inserts Cho Chang in the list between Harry and Ron
    // - shifting every following item one index ahead.

    darr.remove(1);
    // removes Cho Chang, and restores the list to its' previous state

## Reference

* Constructor
  * `new DynamicArray( [initial capacity] )` - create a new list with the *optional* capacity - if no argument is given, a default capacity is chosen.
* Basic array methods
  * `add( item )` - adds a new item to the end of the list, grows if necessary
  * `get( index )` - returns the item at that index, throws `RangeError` if index doesn't exist
  * `set( index, item )` - replaces the item at that index's position, throws `RangeError` if index doesn't exist
  * `size()` - returns the number of items currently in the list
* Internal functionality
  * `capacity()` - returns the current capacity of the underlying StaticArray
  * `grow()` - increases the capacity without changing any indexes or losing any items
* Dynamic List methods
  * `insert( index, item )` - inserts the new item at the given index, shifting all following items one index up. The index can be at the next available position just after the end, so that no items will be shifted. But throws `RangeError` if outside that
  * `remove( index )` - removes the item at the given index, shifting all following items one index down. If the index doesn't exist, it throws a `RangeError`
  * `clear()` - removes every item in the list, making it have a size of 0

## Test

Run the tests defined in ```test.js``` with mocha, by writing

    npx mocha

when in the current folder (```dynamicarray/```).