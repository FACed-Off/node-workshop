const { sum, subtract } = require('./sum');

describe('testing sum function', () =>{
    test('1 plus 1 should equal 2', () => {
        expect(sum(1,1)).toBe(2);
    })
    test('1 plus 4 should equal 5', () => {
        expect(sum(1,4)).toBe(5);
    })
    test('1 plus 4 should not equal 6', () => {
        expect(sum(1,4)).not.toBe(6);
    })
})

describe('testing subtract function', () =>{
    test('1 minus 1 should equal 0', () => {
        expect(subtract(1,1)).toBe(0);
    })
    test('1 minus 4 should equal -3', () => {
        expect(subtract(1,4)).toBe(-3);
    })
    test('1 minus 4 should not equal 6', () => {
        expect(subtract(1,4)).not.toBe(6);
    })
})
