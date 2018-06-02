const Jurisdiction = artifacts.require('Jurisdiction');
const DummyValidator = artifacts.require('DummyValidator');

var should = require('chai').should();

contract('DummyValidator', function ([investor1, investor2]) {

    beforeEach(async function () {
        this.jurisdiction = await Jurisdiction.new();
        this.dummyValidator = await DummyValidator.new(this.jurisdiction.address);
        await this.jurisdiction.addValidator(this.dummyValidator.address);
    });

    it('should validate', async function () {
        await this.dummyValidator.validate({from: investor1});
        (await this.jurisdiction.hasAttribute(investor1, 'VALID')).should.be.true;
    });

  it('should reject not validated transfer', async function() {
        (await this.dummyValidator.transferAllowed(
            investor1, investor2, 10)).should.be.false;
  });

  it('should allow validated transfer', async function() {
        await this.dummyValidator.validate({from: investor2});
        (await this.dummyValidator.transferAllowed(
            investor1, investor2, 10)).should.be.true;
  });
});
