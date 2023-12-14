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
import { it, describe } from "mocha"
import { Entities } from "../../src/entities"
import { Entity } from "../../src/entity"

// Sample class extending Entity for testing
class SampleEntity extends Entity<{
    name: string
    age: number
}> {}

describe("Entities", () => {
    it("[constuctor test]: should create an instance of Entities", () => {
        const entities = new Entities<SampleEntity>([])
        expect(entities).to.be.an.instanceOf(Entities)
    })

    it("[add and getEntities test]: should add an entity to the collection", () => {
        const entities = new Entities<SampleEntity>([])
        const entity = new SampleEntity({ name: "John Doe", age: 25 })
        entities.add(entity)
        expect(entities.getEntities()).to.deep.equal([entity])
    })

    it("[clear test]:should clear all entities from the collection", () => {
        const entities = new Entities<SampleEntity>([
            new SampleEntity({ name: "John Doe", age: 25 }),
            new SampleEntity({ name: "Jane Doe", age: 30 }),
        ])
        entities.clear()
        expect(entities.getEntities()).to.be.an("array").that.is.empty
    })

    it("[count test]:should get the count of entities in the collection", () => {
        const entities = new Entities<SampleEntity>([
            new SampleEntity({ name: "John Doe", age: 25 }),
            new SampleEntity({ name: "Jane Doe", age: 30 }),
        ])
        expect(entities.count()).to.equal(2)
    })

    it("[find test]:should find an entity based on the provided find function", () => {
        const entities = new Entities<SampleEntity>([
            new SampleEntity({ name: "John Doe", age: 25 }),
            new SampleEntity({ name: "Jane Doe", age: 30 }),
        ])
        const foundEntity = entities.find(
            //@ts-ignore
            (entity) => entity.name === "John Doe"
        )
        expect(foundEntity).to.be.an.instanceOf(SampleEntity)
        //@ts-ignore
        expect(foundEntity?.name).to.equal("John Doe")
    })

    it("[remove test]:should remove the specified entity from the collection", () => {
        const entity1 = new SampleEntity({ name: "John Doe", age: 25 })
        const entity2 = new SampleEntity({ name: "Jane Doe", age: 30 })
        const entities = new Entities<SampleEntity>([entity1, entity2])
        entities.remove(entity1)
        expect(entities.getEntities()).to.deep.equal([entity2])
    })

    it("[remove test]:should throw an error if trying to remove an entity not found in the collection", () => {
        const entities = new Entities<SampleEntity>([
            new SampleEntity({ name: "Jane Doe", age: 30 }),
        ])
        const entityToRemove = new SampleEntity({ name: "John Doe", age: 25 })
        const removeFunction = () => entities.remove(entityToRemove)
        expect(removeFunction).to.throw("Entity not found in the list.")
    })

    it("[sort test]:should sort the entities in the collection based on the provided compare function", () => {
        const entity1 = new SampleEntity({ name: "John Doe", age: 25 })
        const entity2 = new SampleEntity({ name: "Jane Doe", age: 30 })
        const entity3 = new SampleEntity({ name: "Alice", age: 22 })

        const entities = new Entities<SampleEntity>([entity1, entity2, entity3])

        // Sort by age in ascending order
        //@ts-ignore
        entities.sort((a, b) => a.age - b.age)

        expect(entities.getEntities()).to.deep.equal([
            entity3,
            entity1,
            entity2,
        ])
    })
})
