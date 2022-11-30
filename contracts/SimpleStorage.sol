//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 favoriteNumber;

    struct Person {
        uint256 _favoritNumber;
        string name;
    }

    Person[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoritNumber) public {
        favoriteNumber = _favoritNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoritNumber) public {
        people.push(Person(_favoritNumber, _name));
        nameToFavoriteNumber[_name] = _favoritNumber;
    }

    function getLength() public view returns (uint256) {
        return people.length;
    }
}
