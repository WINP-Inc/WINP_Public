require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: __dirname + '/.env.local' })
require('dotenv').config({ path: __dirname + '/.env' })
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 11155111,
      forking: {
        url: process.env.NEXT_PRIVATE_ALCHEMY_API_KEY_TESTNET
      }
    },
    sepolia: {
      url: process.env.NEXT_PRIVATE_ALCHEMY_API_KEY_TESTNET,
      accounts: [process.env.NEXT_PRIVATE_ACCOUNT1_SECRET_KEY]
    },
    matic: {
      url: process.env.NEXT_PRIVATE_ALCHEMY_API_KEY_MAINNET_FOR_MATIC,
      accounts: [process.env.NEXT_PRIVATE_ACCOUNT2_SECRET_KEY_MATIC],
      timeout: 20000,
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
