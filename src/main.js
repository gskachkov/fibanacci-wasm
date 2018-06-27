let x = '../out/main.wasm';

let instance = null;

fetch(x).then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, {
    env: {
      add_js: (a, b) => a + b
    }
  })
).then(results => {
  const count = 1000000;
  instance = results.instance;

  const arr = [];
  const startWasm = performance.now();
  for (var i = 0; i < count; i++) {
    arr.push(instance.exports.fibonacci_wasm(i % 45));
  }
  const finishWasm = performance.now();

  arr.length = 0;
  const startJS = performance.now();
  for (var i = 0; i < count; i++) {
    arr.push(instance.exports.fibonacci_js(i % 45));
  }
  const finishJS = performance.now();

  document.getElementById("container").innerText = arr[ arr.length - 1 ] + ":" + ( finishWasm - startWasm ) + ":" + ( finishJS - startJS );
}).catch(console.error);
