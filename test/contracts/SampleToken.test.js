const DummyValidator = artifacts.require('DummyValidator');
const Jurisdiction = artifacts.require('Jurisdiction');
const SampleToken = artifacts.require('SampleToken');

const BigNumber = web3.BigNumber;

var should = require('chai')
      .use(require('chai-as-promised'))
      .use(require('chai-bignumber')(BigNumber))
      .should();

contract('SampleToken', function ([owner, investor1, investor2]) {

  beforeEach(async function () {
    this.jurisdiction = await Jurisdiction.new();

    this.validator = await DummyValidator.new(this.jurisdiction.address);
    await this.jurisdiction.addValidator(this.validator.address);

    this.token = await SampleToken.new(this.validator.address);
    await this.token.transferOwnership(owner);
  });

  it('should not accept not validated minting', async function () {
    const investmentAmount = new BigNumber(web3.toWei(1, 'ether'));
    await this.token.mint(
      investor1, investmentAmount,
      { from: investor1 }
    ).should.be.rejectedWith('revert');
    (await this.token.balanceOf(investor1))
      .should.be.bignumber.equal(0);
    (await this.token.totalSupply())
      .should.be.bignumber.equal(0);
  });

  it('should accept validated minting', async function () {
    await this.validator.validate({from: investor1});

    const investmentAmount = new BigNumber(web3.toWei(1, 'ether'));
    await this.token.mint(
      investor1, investmentAmount,
      { from: owner }
    ).should.be.fulfilled;
    (await this.token.balanceOf(investor1))
      .should.be.bignumber.equal(investmentAmount);
    (await this.token.totalSupply())
      .should.be.bignumber.equal(investmentAmount);
  });

  it('should not accept not validated transfer', async function () {
    await this.validator.validate({from: investor1});
    const investmentAmount = new BigNumber(web3.toWei(1, 'ether'));
    await this.token.mint(
      investor1, investmentAmount,
      { from: owner }
    ).should.be.fulfilled;

    await this.token.transfer(
      investor2, investmentAmount,
      { from: investor1 }
    ).should.be.rejectedWith('revert');
    (await this.token.balanceOf(investor1))
      .should.be.bignumber.equal(investmentAmount);
    (await this.token.balanceOf(investor2))
      .should.be.bignumber.equal(0);
  });

  it('should accept validated transfer', async function () {
    await this.validator.validate({from: investor1});
    const investmentAmount = new BigNumber(web3.toWei(1, 'ether'));
    await this.token.mint(
      investor1, investmentAmount,
      { from: owner }
    ).should.be.fulfilled;

    await this.validator.validate({from: investor2});
    await this.token.transfer(
      investor2, investmentAmount,
      { from: investor1 }
    ).should.be.fulfilled;
    (await this.token.balanceOf(investor1))
      .should.be.bignumber.equal(0);
    (await this.token.balanceOf(investor2))
      .should.be.bignumber.equal(investmentAmount);
  });

  it('should not accept not validated transferFrom', async function () {
    await this.validator.validate({from: investor1});
    const investmentAmount = new BigNumber(web3.toWei(1, 'ether'));
    await this.token.mint(
      investor1, investmentAmount,
      { from: owner }
    ).should.be.fulfilled;
    await this.token.approve(
      owner, investmentAmount,
      { from: investor1 }
    ).should.be.fulfilled;

    await this.token.transferFrom(
      investor1, investor2, investmentAmount,
      { from: owner }
    ).should.be.rejectedWith('revert');
    (await this.token.balanceOf(investor1))
      .should.be.bignumber.equal(investmentAmount);
    (await this.token.balanceOf(investor2))
      .should.be.bignumber.equal(0);
  });

  it('should accept validated transferFrom', async function () {
    await this.validator.validate({from: investor1});
    const investmentAmount = new BigNumber(web3.toWei(1, 'ether'));
    await this.token.mint(
      investor1, investmentAmount,
      { from: owner }
    ).should.be.fulfilled;
    await this.token.approve(
      owner, investmentAmount,
      { from: investor1 }
    ).should.be.fulfilled;

    await this.validator.validate({from: investor2});
    await this.token.transferFrom(
      investor1, investor2, investmentAmount,
      { from: owner }
    ).should.be.fulfilled;
    (await this.token.balanceOf(investor1))
      .should.be.bignumber.equal(0);
    (await this.token.balanceOf(investor2))
      .should.be.bignumber.equal(investmentAmount);
  });

});
