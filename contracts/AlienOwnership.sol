// contracts/AlienOwnership.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AlienFactory.sol";

contract AlienOwnership is AlienFactory, ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint purchaseCost = 0.0005 ether;
    uint nonce = 0;

    constructor() public ERC721("Alien", "ALN") {
        _setBaseURI("ipfs://");
    }

    function mintAlien(uint amount, string memory _tokenURI) external onlyOwner {
        for (uint i = 0; i < amount; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(address(this), newItemId);
            _setTokenURI(newItemId, _tokenURI);
        }
    }

    function purchaseAliens(uint _amount) external payable {
        require(msg.value == (purchaseCost * _amount));

        for (uint i = 0; i < _amount; i++) {
            uint256 tokenId = _randomAvailableAlien();
            _transfer(address(this), msg.sender, tokenId);
        }
    }

    function _randomAvailableAlien() private returns (uint256) {
        uint256 availableBalance = balanceOf(address(this));
        return tokenOfOwnerByIndex(address(this), _random(availableBalance));
    }

    function _random(uint _max) private returns (uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(now, msg.sender, nonce))) % _max;
        nonce++;
        return randomNumber;
    }
}
