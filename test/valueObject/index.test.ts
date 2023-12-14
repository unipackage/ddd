import { expect } from "chai"
import { it } from "mocha"
import { ValueObject } from "../../src/valueObject"
import lodash from "lodash"

describe("ValueObject", () => {
    // Sample object for testing
    const sampleObject = {
        name: "John Doe",
        age: 25,
        address: {
            city: "Example City",
            zip: "12345",
        },
    }

    // Creating a ValueObject instance for testing
    const valueObject = new ValueObject(sampleObject)

    it("[constuctor test]: should create a ValueObject", () => {
        expect(valueObject).to.be.an.instanceOf(ValueObject)
    })

    it("[immutable test]: should convert the underlying object to an immutable Record", () => {
        const immutableRecord = valueObject.immutable()
        expect(immutableRecord).to.exist
    })

    it("[equals test]: should check equality with another object", () => {
        const equalObject = lodash.cloneDeep(sampleObject)
        const differentObject = { name: "Jane Doe", age: 30 }

        expect(valueObject.equals(equalObject)).to.be.true
        //@ts-nocheck
        //@ts-ignore
        expect(valueObject.equals(differentObject)).to.be.false
    })

    it("[toObject test]: should convert the underlying object to a plain JavaScript object", () => {
        const plainObject = valueObject.toObject()
        expect(plainObject).to.deep.equal(sampleObject)
    })

    it("[cloneObject test]: should create a deep clone of the underlying object", () => {
        const clonedObject = valueObject.cloneObject()
        expect(clonedObject).to.deep.equal(sampleObject)
        expect(clonedObject).to.not.equal(sampleObject)
    })
})
