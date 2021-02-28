// contracts/AlienOwnership.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AlienFactory.sol";

contract AlienOwnership is AlienFactory, ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint purchaseCost = 0.0005 ether;

    constructor() public ERC721("Alien", "ITM") {}

    function mintAlien(uint amount) external onlyOwner {
        for (uint i = 0; i < amount; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(address(this), newItemId);
            //_setTokenURI(newItemId, tokenURI);
        }
    }

    function purchaseAlien(uint _amount) external payable {
        require(msg.value == (purchaseCost * _amount));
    }
}
