// contracts/AlienFactory.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AlienFactory is Ownable {

    struct Alien {
        string name;
    }

    Alien[] public aliens;

    function _createAlien() internal {

    }


}
