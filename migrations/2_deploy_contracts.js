var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var GroveLib = artifacts.require("./GroveLib.sol");
var Grove = artifacts.require("./Grove.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(GroveLib);
  deployer.link(GroveLib, Grove);
  deployer.deploy(Grove);
};
