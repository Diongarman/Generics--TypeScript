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

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    return this.data.push(item);
  }

  removeItem(item: T) {
    return this.data.splice(this.data.indexOf(item), 1);
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
