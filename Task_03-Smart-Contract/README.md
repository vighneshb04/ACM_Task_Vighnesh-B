
# BasicToken Contract - README

## Overview

This project demonstrates the development and deployment of a basic ERC-20-like token on the Ethereum blockchain. The contract was written in Solidity and tested on the Sepolia test network using MetaMask and Remix IDE. I funded the wallet through Google Cloud’s Ethereum faucet and deployed the contract using the Sepolia test network for transactions.

The token created is named **BasicToken (BTK)**, and it incorporates basic functionality such as minting and transferring tokens between accounts. Below are the steps, features, and requirements involved in the project.

---

## Project Setup

1. **Ethereum Funding**:
    - I utilized Google Cloud to set up an Ethereum node, which provided me with ETH for transactions.
    - Using MetaMask, I connected to the Sepolia test network, where I received 0.05 SepoliaETH.

2. **Development Environment**:
    - The Solidity contract was developed using **Remix IDE**.
    - I used MetaMask as my wallet to deploy and interact with the contract.
    - Remix IDE was connected to the Sepolia test network for transaction execution.

---

## Contract Features

### Token Information
- **Name**: BasicToken (BTK)
- **Decimals**: 18 (Standard for most ERC-20 tokens)
- **Symbol**: BTK
- **Total Supply**: Managed dynamically via minting function

### Key Functionalities

1. **Mint Function**:
    - Allows the minting of new tokens to a specified address.
    - Increases the total supply and updates the recipient’s balance.
    - Emits a `Mint` event when new tokens are created.

   **Code**:
   ```solidity
   function mint(address to, uint256 amount) public {
       totalSupply += amount;
       balanceOf[to] += amount;
       emit Mint(to, amount);
   }
   ```

2. **Transfer Function**:
    - Users can transfer tokens between addresses.
    - Checks that the sender has sufficient balance before allowing the transfer.
    - Emits a `Transfer` event on successful token transfer.

   **Code**:
   ```solidity
   function transfer(address to, uint256 amount) public returns (bool) {
       require(balanceOf[msg.sender] >= amount, "Insufficient balance");
       balanceOf[msg.sender] -= amount;
       balanceOf[to] += amount;
       emit Transfer(msg.sender, to, amount);
       return true;
   }
   ```

3. **Balance Function**:
    - Retrieves the token balance of any given address.
    
   **Code**:
   ```solidity
   function getBalance(address account) public view returns (uint256) {
       return balanceOf[account];
   }
   ```

---

## Deployment Process

1. **Network Configuration**:
    - Connected MetaMask to the **Sepolia test network** (Chain ID: 11155111).
    - Funded the account with SepoliaETH (required for gas fees).
    
2. **Deploying the Contract**:
    - The contract was deployed using Remix IDE and MetaMask as the wallet.
    - Gas limit was estimated at 99, and deployment required a small amount of SepoliaETH to cover gas fees.

---

## Interaction

- **MetaMask** was used to interact with the contract (e.g., minting, transferring tokens).
- The contract was tested for its functionalities, including minting tokens and transferring them between accounts.

---

## Key Points

- **Test Network**: Sepolia
- **Gas Fees**: Paid using SepoliaETH for minting and transfers.
- **Events**: `Transfer` and `Mint` events were implemented to log activity on the blockchain.

---

## Future Improvements

- Adding more advanced features like token burning, ownership controls, and pausing transfers.
- Deployment on the Ethereum mainnet after thorough testing and audits.

---

## Conclusion

This project demonstrates how to create and interact with a basic ERC-20-like token using Solidity, MetaMask, and Remix IDE on the Sepolia test network. It covers key token functionalities and provides a solid foundation for further development and enhancement of blockchain-based applications.
