///////////////////////////////////////////cachingDecorator///////////////////////////////////////////////////////
//In javacript there may be cpu-heavy functions(cpu heavy functions are the functions that make the processor suffer it can be mathematical expressions or the functions that work with big objects or arrays) that always repeat its value, for example always returns the same x. So normally we would like to cache(remember) these functions, tot do that we have cachingDecorator, example:
function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
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