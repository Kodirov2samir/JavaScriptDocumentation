///////////////////////////////////////////cachingDecorator///////////////////////////////////////////////////////
//In javacript there may be cpu-heavy functions(cpu heavy functions are the functions that make the processor suffer it can be mathematical expressions or the functions that work with big objects or arrays) that always repeat its value, for example always returns the same x. So normally we would like to cache(remember) these functions, tot do that we have cachingDecorator, example:
function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) /* so here in the parameter the func authomatically makes the function slow work and then returns x */ {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);

console.log( slow(1) ); // slow(1) is cached and the result returned
console.log( "Again: " + slow(1) ); // slow(1) result returned from cache

console.log( slow(2) ); // slow(2) is cached and the result returned
console.log( "Again: " + slow(2) ); // slow(2) result returned from cache

// this example we wrap a function info caching function which will prevent the extra usage of a function in case the result is the same

//however this method doesnt work with object methods
/*
// сделаем worker.slow кеширующим
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // здесь может быть страшно тяжёлая задача для процессора
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// тот же код, что и выше
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // оригинальный метод работает

worker.slow = cachingDecorator(worker.slow); // теперь сделаем его кеширующим

alert( worker.slow(2) ); // Ой! Ошибка: не удаётся прочитать свойство 'someMethod' из 'undefined'
*/

// so here this.someMethod will be equal to undefined
//to avoid this we have funt.call() property, in func.call(always what will be instead of this,and arguments) for example:

function name(x){
  console.log(`hello ${this.familyName} ${x}`);
}
let familyName = {familyName:"Qodirov"}
name.call(familyName /* we literaly say put familyName instead of this it would look like this:familyName.familyName*/,"samir"/* here we are just continueing giving argumetns*/)
//so to fix the example above we need to do 
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorato(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // by doing it we say keep original this
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorato(worker.slow); // теперь сделаем её кеширующей

console.log( worker.slow(2) ); // работает
console.log( worker.slow(2) ); // работает, не вызывая первоначальную функцию (кешируется)
