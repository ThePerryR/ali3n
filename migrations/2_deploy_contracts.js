var AlienOwnership = artifacts.require("./AlienOwnership.sol");

module.exports = function(deployer) {
  deployer.deploy(AlienOwnership);
};
