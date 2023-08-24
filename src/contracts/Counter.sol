// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    event UpdateCounter(int);

    int private count = 0;

    constructor(int _count) {
        count = _count;
    }

    function setCounter(int _count) public {
        count = _count;
        emit UpdateCounter(count);
    }

    function incCounter() public {
        count += 1;
        emit UpdateCounter(count);
    }

    function decCounter() public {
        count -= 1;
        emit UpdateCounter(count);
    }

    function getCounter() public view returns (int) {
        return count;
    }
}
