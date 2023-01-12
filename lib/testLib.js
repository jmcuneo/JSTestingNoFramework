/**
 * @author Joshua Cuneo
 * 
 * Modified from
 * Unit Test Your JavaScript Code Without a Framework
 * by Amit Gupta
 * https://javascript.plainenglish.io/unit-test-front-end-javascript-code-without-a-framework-8f00c63eb7d4
 */

'use strict';

/**
 * Defines a unit test.
 * @param {string} desc The description of the test being run.
 * @param {function} fn The unit testing function, which should include a call to assert().
 */
function test(desc, fn) {
	try {
		fn();
		console.log('%c%s', 'color: #00AA00', '\u2713 ' + desc);
	} 
	catch (error) {
		console.log('%c%s', 'color: #AA0000', '\u2718 ' + desc);
		console.error(error);
	}
}

/**
 * Asserts a given condition is true.
 * @param {boolean} condition The condition to test.
 */
function assertTrue(condition) {
	if (!condition) {
		let e = new Error();
		e.message = "Expected TRUE but was FALSE";
		throw e;
	}
}

/**
 * Asserts a given condition is false.
 * @param {boolean} condition The condition to test.
 */
function assertFalse(condition) {
	if (condition) {
		let e = new Error();
		e.message = "Expected FALSE but was TRUE";
		throw e;
	}
}


/**
 * Asserts an expected value is equal to an actual value.
 * @param expected The expected value from the computation.
 * @param actual The actual value from the computation.
 */
function assertEquals(expected, actual) {
	let expectedType = Object.prototype.toString.call(expected);
	let actualType = Object.prototype.toString.call(actual);

	//Don't let the user use assertEquals to compare two arrays
	if (expectedType === "[object Array]" && actualType === "[object Array]") {
		let e = new Error();
		e.message = "Both parameters are arrays.\n" +
		"Fix parameters or use arrayAssertEquals() instead.";
		throw e;
	}

	//Run the comparison
	if (expected !== actual) {
		let e = new Error();
		e.message = "Expected " + expected + " of type " + cleanType(expectedType)
			+ "\n but was " + actual + " of type " + cleanType(actualType);
		throw e;
	}

	//Clean up the type so that it's easier to read
	function cleanType(typeString) {
		return typeString.split(" ")[1].replace("]", "");
	}
}

/**
 * Asserts that two arrays are equal.
 * We define array equality as the same elements in the same order.
 * @param {array} expected The expected array from the computation.
 * @param {array} actual The actual array from the computation.
 */
function assertArrayEquals(expected, actual) {
	let expectedType = Object.prototype.toString.call(expected);
	let actualType = Object.prototype.toString.call(actual);

	//Check that we have two arrays
	if (expectedType !== "[object Array]" || actualType !== "[object Array]") {
		let e = new Error();
		e.message = "Both parameters must be arrays.\nYour parameter types are " +
			cleanType(expectedType) + " and " + cleanType(actualType) +
			"\nFix parameters or use assertEquals() instead.";
		throw e;
	}

	//Compare the array contents
	try {
		assertArrayEqualsHelper(expected, actual);
	}
	catch (error) {
		error.message += "\nExpected array: " + expected + "\n  Actual array: " + actual;
		throw error;
	}

	//Clean up the type so that it's easier to read
	function cleanType(typeString) {
		return typeString.split(" ")[1].replace("]", "");
	}

	//Function with the logic to actually compare the contents of the two arrays
	//Function is inner to keep it private
	function assertArrayEqualsHelper(expected, actual)
	{
		//The arrays must be equal in length to be equal
		if(expected.length !== actual.length) {
			let e = new Error();
			e.message = "Arrays are of different lengths.\n" +
				"Expected Length: " + expected.length + "\n" +
				"  Actual Length: " + actual.length;
			throw e;
		}

		//Compare each item in the arrays to make sure they're equal.
		for(let i = 0; i < expected.length; i++) {

			let exp = expected[i];
			let act = actual[i];
			let expectedType = Object.prototype.toString.call(exp);
			let actualType = Object.prototype.toString.call(act);

			//If we have multidimensional arrays, we need to recursively compare them.
			//Otherwise, we can just fall back on assertEquals().
			if(expectedType === "[object Array]" && actualType === "[object Array]") {
				assertArrayEqualsHelper(exp, act);
			}
			else {
				try {
					assertEquals(exp, act);
				}
				catch (error) {
					throw error;
				}
			}
		}
	}
}

/**
 * Asserts a given value is null.
 * @param value The value to test.
 */
function assertNull(value) {
	if (value !== null) {
		let e = new Error();
		e.message = "Expected NULL but was " + value;
		throw e;
	}
}


