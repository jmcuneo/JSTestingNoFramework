# JavaScript Unit Testing Without a Framework
A basic set of JavaScript unit testing functions that can be used without a framework, built for CS 4731 (Computer Graphics) at WPI to be used with WebGL programs. The functions are integrated into a simple WebGL example to show how they can be used.

When your page loads, the status of each test will appear in your Console in your Web Developer Tools. The tests below all pass:

![Selection_365](https://user-images.githubusercontent.com/34037938/212177206-01987d74-334a-41c6-95e3-7e197ac65098.png)

Make sure that the console is set to show Log messages (circled in red), or any passing tests won't appear.

If one or more tests fail, you'll see something like the following:

![Selection_366](https://user-images.githubusercontent.com/34037938/212177791-2175aefd-0415-4073-9694-869e56ecb734.png)

Remember that proper unit testing means you should minimize your reliance on global variables, as these make testing harder and more error-prone. Try to pass in whatever you need as parameters.

Note that some functions cannot be be unit-tested, such as ones that send data to the vertex shader, set event handlers, or initialize the drawing canvas. Try to keep testable and non-testable functionality as separate as possible to maximize the amount of code logic you can unit-test.
