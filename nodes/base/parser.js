const parser = require('postcss-selector-parser');
const transform = selectors => {
  selectors.each(n => {
    console.log(66666)
    console.log(n)
  })
};

const processor = parser(transform)

// Example
const result = processor.processSync('*.class');
// => .class

