import add from "./index.js";

(async () => {
  const result = await add(3, 4);
  console.log("Sum:", result);
})();
