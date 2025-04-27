import add from "./index.js";


(async () => {
  const result = await add(3, 4);
  if (result !== 7) {
    throw new Error("Test failed: Addition result was not correct");
  }else{
    console.log("Test passed: Addition test passed.")
  }
})();

(async () => {
  try {
    const result = await add("fish", 4);
    throw new Error(`Test 2 failed! Got ${result} instead of error.`)
  } catch (error) {
    if (error.message === 'fish or 4 is not numeric!') {
      console.log("Test passed: Correct error thrown for non-numeric input");
    } else {
      console.log("Test failed: Unexpected error message:", error.message);
    }
  }
})();