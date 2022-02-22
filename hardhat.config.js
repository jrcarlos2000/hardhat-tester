/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: {
    version : "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }},
  networks : {
    rinkeby : {
      url : process.env.INFURA_RINKEBY,
      accounts : [`0x${process.env.PRIVATE_KEY}`],
      allowUnlimitedContractSize: true
    },
    hardhat: {
      allowUnlimitedContractSize: true
    }
  }
};
