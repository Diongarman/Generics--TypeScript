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

//returns an intersection type set implicitly
//I have written it explicitly below though it is not neccessary
function merge<T, T2>(objA: T, objB: T2): T & T2 {
  return Object.assign(objA, objB);
}

//Generic types are inferred below from the argument objects
const mergedObj = merge({ name: 'Dion' }, { age: 30 });
const mergedObj2 = merge({ name: 'MJ', hobbies: ['gimp'] }, { age: 1000 });

console.log(mergedObj.age);
console.log(mergedObj2.hobbies[0]);
