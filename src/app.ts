//GENERICS
/*
About


Generics allow for flexibiity whilst still having strongly typed code. They work for functions, classes

*/

//Built-in generics

// const names: Array<string> = ['Hello world'];
// names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('resolve string');
//   }, 2000);
// });

// promise.then((data) => {
//   data.split('');
// });

//Creating a generic function & Working with constraints

//returns an intersection type set implicitly
//I have written it explicitly below though it is not neccessary
function merge<T extends object, T2 extends object>(objA: T, objB: T2): T & T2 {
  return Object.assign(objA, objB);
}

//Generic types are inferred below from the argument objects
const mergedObj = merge({ name: 'Dion' }, { age: 30 });
//Below fails because of generic contraint 'T2 extends object' above
// const mergedObj = merge({ name: 'Dion' }, 30);
const mergedObj2 = merge({ name: 'MJ', hobbies: ['gimp'] }, { age: 1000 });

console.log(mergedObj.age);
console.log(mergedObj2.hobbies[0]);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionTxt = 'Got no value';
  if (element.length === 1) {
    descriptionTxt = 'got 1 element';
  } else if (element.length > 1) {
    descriptionTxt = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionTxt];
}

console.log(countAndDescribe('some string'));

//The 'keyof' Constraint

function extractAndConvert<T extends object, K extends keyof T>(
  obj: T,
  key: K
) {
  return 'Key: ' + key + ' Value: ' + obj[key];
}
//Satisfies keyof type constraint
console.log(extractAndConvert({ name: 'dion' }, 'name'));
//fails keyof type constraint
//extractAndConvert({ name: 'dion' }, 'age');

//Generic Classes

/*
They allow for flexibiity whilst still having strongly typed code
*/

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    return this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('test string');
textStorage.addItem('12345');
textStorage.removeItem('test string');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

//Object typing reference issues

/*
objects are reference types (vs primitive values)

class generics changed to not work with objects and only primitives because objects require distinct bespoke method logic
*/

// const objStorage = new DataStorage<object>();
// const rickyObject = { name: 'Ricky' };
// objStorage.addItem(rickyObject);
// objStorage.addItem({ name: 'MJ' });

// //Object passed as an argument below is a new object and therefore doesn't fulfill removeItem method's index based remove logic
// objStorage.removeItem(rickyObject);
// console.log(objStorage.getItems());

//GENERIC UTILITY TYPES

interface CourseGoal {
  name: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  name: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  //incase need to add values dynamically and do some sort of logic
  courseGoal.name = name;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

let noHomersClub: Readonly<string[]> = ['Moe', 'Barney', 'Homer1'];
//noHomersClub.push('Homers');
