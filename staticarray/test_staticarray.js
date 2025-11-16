import StaticArray from "./staticarray.js";

function main() {
  console.log("Static array experiments");

  // create a simple array of size 5
  const array5 = new StaticArray(5);
  
  // Test the array using .set and .get methods
  array5.set(0,'A');
  array5.set(1,'B');
  array5.set(2,'C');
  array5.set(3,'D');
  array5.set(4,'E');

  // read the array using .get method
  console.log("Array5 using .get with index");  
  for(let i=0; i < array5.length; i++) {
    console.log(array5.get(i));
  }

  // read the array using an iterator
  console.log("-----------------");
  console.log("Array5 using iterator");
  for(const value of array5) {
    console.log(value);
  }

  // changing the array using [index]
  console.log("-----------------");
  console.log("Array5 setting using [index]");
  array5[0] = 'a';
  array5[1] = 'b';
  array5[2] = 'c';
  array5[3] = 'd';
  array5[4] = 'e';
  
  // reading the array using [index]
  console.log("-----------------");
  console.log("Array5 getting using [index]");
  for(let i=0; i < array5.length; i++) {
    console.log(array5[i]);
  }

  // These next tests should throw execptions

  console.log("-----------------");
  console.log("Array5 should fail w negative indexes");
  try {
    console.error("[-1] erronously read as: " + array5[-1]);
  } catch (error) {
    console.log("reading [-1] succesfully caused " + error);    
  }

  try {
    array5[-1] = '@';
    console.error("[-1] erronously set");
  } catch (error) {
    console.log("setting [-1] succesfully caused " + error);    
  }

  try {
    array5.set(-1, '@');
    console.error("-1 erroneously set");
  } catch (error) {
    console.log("setting -1 succesfully caused " + error);    
  }

  console.log("-----------------");
  console.log("Array5 should fail w out of bound indexes");
  try {
    console.error("[5] erroneously read as: " + array5[5]);
  } catch (error) {
    console.log("reading [5] succesfully caused " + error);    
  }

  try {
    array5.set(5, '@');
    console.error("5 erroneously set");
  } catch (error) {
    console.log("setting 5 succesfully caused " + error);    
  }

  // also, the .length should be readonly
  try {
    array5.length = 5;
    console.error("erroneously set the length");
  } catch (error) {
    console.log("setting the length succesfully caused " + error);
  }
}


main();