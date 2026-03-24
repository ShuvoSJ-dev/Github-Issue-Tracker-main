1.	What is the difference between var, let, and const?

Var:
var is the older way to declare variables. It’s function-scoped, available throughout the function where it’s declared. It’s also hoisted to the top of the scope, but initialized with undefined until the declaration line is reached. It can redeclare and reassign.

Let:
let is a newer way to declare variables. It’s block-scoped, which means it’s only available within the block of code where it’s declared. It’s hoisted, but can’t use it before the declaration. Values can reassign to a let variable but can’t redeclare in the same scope.

Const:
const is also block-scoped as like let, but the key difference is, it cannot be reassigned once give it a value. If the variable holds an object or an array, can still modify its properties or items, but can't change the reference to a new object or array.

2.	 What is the spread operator (...)?

The spread operator (...) is used for copying and merging arrays or objects, or even expanding them into individual elements.

3.	What is the difference between map(), filter(), and forEach()?

map():
map() is used to transform every element in an array and returns a new array. It doesn’t change the original one. It used to create a new array based on some logic.

filter():
filter() creates a new array containing only the elements that meet a certain condition. It’s useful to select a subset of the original array.

forEach():
forEach() runs a function on each element of the array but doesn’t return anything. It is used to perform an action on each element of the array.

4.	What is an arrow function?

An arrow function is just a shorter syntax for writing functions. It’s especially useful to write smaller more concise functions. Arrow functions don’t have their own this. , they inherit this from the surrounding context.

5.	What are template literals?

Template literals helps to create multiline strings and embed expressions inside strings. They are wrapped in backticks (`) instead of regular quotes. We can use ${} to insert variables or expressions directly in the string.
