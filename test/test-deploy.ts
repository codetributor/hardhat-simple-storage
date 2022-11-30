import { ethers, run, network } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", () => {
    let SimpleStorage: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;

    beforeEach(async function () {
        SimpleStorage = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory;
        simpleStorage = await SimpleStorage.deploy();
    });
    it("Should start with a favorite number of zero", async () => {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("Should update", async () => {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("check insert of mapping Person", async () => {
        const expectedFavoriteNumber = "10";
        const transactionResponse = await simpleStorage.addPerson("Steve", 10);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.nameToFavoriteNumber("Steve");
        expect(currentValue).to.equal(expectedFavoriteNumber);
    });
    it("check added to array", async () => {
        const currentLength = await simpleStorage.getLength();
        const transactionResponse = await simpleStorage.addPerson("Steve", 10);
        await transactionResponse.wait(1);
        const updatedValue = await simpleStorage.getLength();
        expect(updatedValue).to.equal(currentLength + 1);
    });
});
