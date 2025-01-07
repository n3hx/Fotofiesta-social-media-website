// Import functions that we are testing
import { emailValidation, passwordValidation, nameValidation, ageValidation, phoneNumberValidation } from './validation.js';

//Import expect from chai
let expect = chai.expect;

// Mocha test for nameValidation function
describe('#testNameValidation', () => {
  it('should verify whether the name is not blank', () => {
      let result = nameValidation('');
      expect(result).to.equal(false);

      result = nameValidation('Arusha Ramessur');
      expect(result).to.equal(true);
  });
});

//Mocha test for emailValidation function
describe('#testEmailValidation', () => {
    it('should verify whether the email satisfies the regular expressions', (done) => {
        let result = emailValidation('aru$ha@ramessur.mdx');
        expect(result).to.equal(false);

        result = emailValidation('ar1736@live.mdx.ac.uk');
        expect(result).to.equal(true);

        done();
    });
});

//Mocha test for passwordValidation function
describe('#testPasswordValidation', () => {
    it('should verify whether the password is strong', (done) => {
        let result = passwordValidation('');
        expect(result).to.equal(false);

        result = passwordValidation('Arusha@3005');
        expect(result).to.equal(true);

        done();
    });
});

// Mocha test for ageValidation function
describe('#testAgeValidation', () => {
    it('should verify whether the age is above 16', () => {
        let result = ageValidation(15);
        expect(result).to.equal(false);

        result = ageValidation(20);
        expect(result).to.equal(true);
    });
});

// Mocha test for phoneNumberValidation function
describe('#testPhoneNumberValidation', () => {
    it('should verify whether the phone number meets criteria', () => {
        let result = phoneNumberValidation('12345');
        expect(result).to.equal(false);

        result = phoneNumberValidation('12345678901234567890');
        expect(result).to.equal(false);

        result = phoneNumberValidation('12345678');
        expect(result).to.equal(true);
    });
});

