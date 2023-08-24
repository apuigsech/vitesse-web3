// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Counter} from "@src/Counter.sol";

contract CounterTest is Test {
    function testConstructir(int x) public {
	Counter counter = new Counter(x);
	assertEq(counter.getCounter(), x);
    }

    function testSetCounter(int x) public {
	Counter counter = new Counter(0);
	counter.setCounter(x);
	assertEq(counter.getCounter(), x);
    }

    function testIncCounter(int x) public {
	vm.assume(-100 < x && x < 100);
	Counter counter = new Counter(x);
        counter.incCounter();
        assertEq(counter.getCounter(), x + 1);
    }

    function testDecCounter(int x) public {
	vm.assume(-100 < x && x < 100);
	Counter counter = new Counter(x);
	console2.log(x);
        counter.decCounter();
        assertEq(counter.getCounter(), x - 1);
    }

}
