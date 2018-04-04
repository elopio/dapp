const Jurisdiction = artifacts.require("Jurisdiction");

module.exports = function (deployer) {
  deployer.deploy(Jurisdiction);
};
