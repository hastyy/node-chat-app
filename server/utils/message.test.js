const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');


describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        const from = 'hastyy@example.com';
        const text = 'This is a message';
        const message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });

});

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        const from = 'hastyy@example.com';
        const latitude = 1;
        const longitude = 1;
        const expectedURL = 'https://www.google.com/maps?q=1,1';
        const locationObj = generateLocationMessage(from, latitude, longitude);

        expect(locationObj.from).toBe(from);
        expect(locationObj.createdAt).toBeA('number');
        expect(locationObj.url).toBe(expectedURL);
    });

});