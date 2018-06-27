#define WASM_EXPORT __attribute__((visibility("default")))

extern long add_js(long int a, long int b);

long int add_wasm(long int a, long int b)
{
  return a + b;
}

WASM_EXPORT
long int fibonacci_wasm(long int num)
{
  long int a = 1, b = 0, temp;

  while (num >= 0) {
    temp = a;
    a = add_wasm(a, b);
    b = temp;
    num--;
  }

  return b;
}

WASM_EXPORT
long int fibonacci_js(long int num)
{
  long int a = 1, b = 0, temp;

  while (num >= 0) {
    temp = a;
    a = add_js(a, b);
    b = temp;
    num--;
  }

  return b;
}