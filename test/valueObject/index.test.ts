/*******************************************************************************
 *   (c) 2023 unipackage
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

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
