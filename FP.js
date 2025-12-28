// const sum = (a,b,c) => a + b + c
// const product = (a,b,c,d) => a * b * c * d

// const curry = (fn) => {
//     return function сur(...args) {
//         if (fn.length === args.length) {
//             return fn(...args);
//         } else {
//             return function(...lArgs) {
//                 return fn(...args, ...lArgs);
//             }
//         } 
//     }
// }


// const sumFunc = curry(sum)
// const prodFunc = curry(product)

// console.log(sumFunc(1)(2,3)) //6
// console.log(sumFunc(1,2)(3)) //6
// console.log(sumFunc(1,2,3))   //6
// console.log(prodFunc(1,2,3,4))   //24
// console.log(prodFunc(1)(2,3,4))   //24
// console.log(prodFunc(1,2)(3,4))   //24
// console.log(prodFunc(1,2,3)(4))   //24



function memoize(fn) {
    let cache = {};
    return function(...args) {
        let key = JSON.stringify(args);
        console.log(key)
        if (cache[key]) {
            return cache[key];
        }
        let res = fn(...args);
        cache[key] = res;
        return res;
    }
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

const foo = memoize(factorial) // ենթադրում ենք, որ factorial-ը նկարագրված է
console.log(foo(5)) // hաշվում է 120
console.log(foo(5)) // վերադարձնում է 120 cache-ից


// function foo(a,b){
//    return a + b
// } 

// function trace(fn) {
//     let res = [];
//     function fn2(...args) {
//         let output = fn(...args);
//         res.push({args, output});
//         return output;
//     }
//     fn2.history = res;
//     return fn2;
// }

// const tracedFunc = trace(foo)
// console.log(tracedFunc(1,2)) //3
// console.log(tracedFunc(2,4,6)) //6

// console.log(tracedFunc.history) //[{args:[1,2], output: 3}, {args:[2,4], output:6}}]




const add5 = a => a + 5
const double = a => 2 * a
const sub4 = a => a - 4


function pipe(...args) {
    return function fn(a) {
        for (let fn of args) {
            a = fn(a);
        }
        return a;
    }   
}




const func = pipe(add5, add5, double, sub4)
console.log(func(2)) //20

//բացատրություն

//2 -> add5(2) => 7
//7 -> add5(7) => 12
//12 -> double(12)=> 24
//sub4 -> sub4(24) => 20