//Example tests
/*
it('should pass', function() {
    assert(1 == 1);
});

it('should fail', function() {
    assert(1 != 1);
});
*/

let DEF_LINECOLOR = {r: 0.0, g: 0.0, b: 0.0};
let DEF_VIEWBOX = [-1, -1, 2, 2];

/* =================================== xmlGetLines() =================================== */
test('xmlGetLines(): valid line elements', function() {
    let testString = "<svg><line x1='10' y1='80' x2='90' y2='20' stroke='#FF0000' /></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetLines(xmlDoc, DEF_LINECOLOR);
    let expectedVal = [
        [
            [10, 80], [90, 20]
        ],
        [
            [1.0, 0.0, 0.0, 1.0], [1.0, 0.0, 0.0, 1.0]
        ]
    ];
    assertArrayEquals(expectedVal, output);
})

test('xmlGetLines(): valid line elements with floats', function() {
    let testString = "<svg><line x1='10.1' y1='80.1' x2='90.1' y2='20.1' stroke='#FF0000' /></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetLines(xmlDoc, DEF_LINECOLOR);
    let expectedVal = [
        [
            [10.1, 80.1], [90.1, 20.1]
        ],
        [
            [1.0, 0.0, 0.0, 1.0], [1.0, 0.0, 0.0, 1.0]
        ]
    ];
    assertArrayEquals(expectedVal, output);
})

test('xmlGetLines(): multiple valid line elements', function() {
    let testString = "<svg><line x1='10' y1='80' x2='90' y2='20' stroke='#FF0000' />" +
                          "<line x1='10' y1='80' x2='90' y2='20' stroke='#FF0000' /></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetLines(xmlDoc, DEF_LINECOLOR);
    let expectedVal = [
        [
            [10, 80], [90, 20],
            [10, 80], [90, 20]
        ],
        [
            [1.0, 0.0, 0.0, 1.0], [1.0, 0.0, 0.0, 1.0],
            [1.0, 0.0, 0.0, 1.0], [1.0, 0.0, 0.0, 1.0]
        ]
    ];
    assertArrayEquals(expectedVal, output);
})

test('xmlGetLines(): no color', function() {
    let testString = "<svg><line x1='10' y1='80' x2='90' y2='20' /></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetLines(xmlDoc, DEF_LINECOLOR);
    let expectedColor = [DEF_LINECOLOR.r, DEF_LINECOLOR.g, DEF_LINECOLOR.b, 1.0];
    let expectedVal = [
        [
            [10, 80], [90, 20]
        ],
        [
            expectedColor, expectedColor
        ]
    ];
    assertArrayEquals(expectedVal, output);
})

test('xmlGetLines(): no line elements', function() {
    let testString = "<svg></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetLines(xmlDoc, DEF_LINECOLOR);
    assertArrayEquals([[],[]], output);
})




/* =================================== xmlGetViewbox() =================================== */

test('xmlGetViewbox(): viewbox attribute exists and is correct', function() {
    let testString = "<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetViewbox(xmlDoc, DEF_VIEWBOX);
    assertArrayEquals([0, 0, 100, 100], output);
})

test('xmlGetViewbox(): viewbox attribute exists has floats', function() {
    let testString = "<svg viewBox='0 0 100.1 100.1' xmlns='http://www.w3.org/2000/svg'></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetViewbox(xmlDoc, DEF_VIEWBOX);
    assertArrayEquals([0, 0, 100.1, 100.1], output);
})

test('xmlGetViewbox(): viewbox attribute exists but is missing values', function() {
    let testString = "<svg viewBox='0 0 100' xmlns='http://www.w3.org/2000/svg'></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetViewbox(xmlDoc, DEF_VIEWBOX);
    assertArrayEquals(DEF_VIEWBOX, output);
})

test('xmlGetViewbox(): viewbox attribute exists but has too many values', function() {
    let testString = "<svg viewBox='0 0 100 100 100' xmlns='http://www.w3.org/2000/svg'></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetViewbox(xmlDoc, DEF_VIEWBOX);
    assertArrayEquals(DEF_VIEWBOX, output);
})

test('xmlGetViewbox(): viewbox attribute has NaNs', function() {
    let testString = "<svg viewBox='0 0 100 abcd' xmlns='http://www.w3.org/2000/svg'></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetViewbox(xmlDoc, DEF_VIEWBOX);
    assertArrayEquals(DEF_VIEWBOX, output);
})

test('xmlGetViewbox(): viewbox attribute does not exist', function() {
    let testString = "<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(testString, "image/svg+xml");
    let output = xmlGetViewbox(xmlDoc, DEF_VIEWBOX);
    assertArrayEquals(DEF_VIEWBOX, output);
})