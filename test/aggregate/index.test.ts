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
import { Entity } from "../../src/entity"
import { Entities } from "../../src/entities"
import { Aggregate } from "../../src/aggregate"

describe("Aggregate", () => {
    // Sample entity class for testing
    class SampleEntity extends Entity<{ id: number; name: string }> {}
    class SampleEntity2 extends Entity<{
        id: number
        name: string
        isStudent: boolean
    }> {}

    // Sample entities for testing
    const entity1 = new SampleEntity({ id: 1, name: "Entity 1" })
    const entity2 = new SampleEntity2({
        id: 2,
        name: "Entity 2",
        isStudent: true,
    })

    // Sample entities collection for testing
    const entityCollection = new Entities([entity1, entity2])

    // Sample properties for testing
    const sampleProperties = {
        id: "aggregate_id",
        name: "Test Aggregate",
        entities: { entity1, entity2 },
        entityCollections: { entityCollection },
        extra: { key1: "value1", key2: "value2" },
    }

    // Creating a Sample Aggregate instance for testing
    const aggregate = new Aggregate(sampleProperties)

    it("[constuctor test]: should create an Aggregate", () => {
        expect(aggregate).to.be.an.instanceOf(Aggregate)
    })

    it("[getId test]: should get the ID of the aggregate", () => {
        const aggregateId = aggregate.getId()
        expect(aggregateId).to.equal(sampleProperties.id)
    })

    it("[getName test]: should get the name of the aggregate", () => {
        const aggregateName = aggregate.getName()
        expect(aggregateName).to.equal(sampleProperties.name)
    })

    it("[getEntityTypeCount test]:  should get the total count of entity types in the aggregate", () => {
        const entityTypeCount = aggregate.getEntityTypeCount()
        expect(entityTypeCount).to.equal(4) // 2 entities + 1 entity collection(including 2 entities)
    })

    it("[getEntityByKey test]: should get an entity by key", () => {
        const retrievedEntity = aggregate.getEntityByKey("entity1")
        expect(retrievedEntity).to.equal(entity1)
    })

    it("[getEntityCollectionsByKey  test]: should get entity collections by key", () => {
        const retrievedEntityCollection =
            aggregate.getEntityCollectionsByKey("entityCollection")
        expect(retrievedEntityCollection).to.equal(entityCollection)
    })

    it("[addEntity  test]: should add an entity to the aggregate", () => {
        const newEntity = new SampleEntity({ id: 3, name: "New Entity" })
        aggregate.addEntity("newEntity", newEntity)
        const retrievedEntity = aggregate.getEntityByKey("newEntity")
        expect(retrievedEntity).to.equal(newEntity)
    })

    it("[removeEntity test]: should remove an entity from the aggregate", () => {
        aggregate.removeEntity("newEntity")
        const retrievedEntity = aggregate.getEntityByKey("newEntity")
        expect(retrievedEntity).to.be.undefined
    })

    it("[addEntityCollections test]: should add entity collections to the aggregate", () => {
        const newEntityCollection = new Entities([])
        aggregate.addEntityCollections(
            "newEntityCollection",
            newEntityCollection
        )
        const retrievedEntityCollection = aggregate.getEntityCollectionsByKey(
            "newEntityCollection"
        )
        expect(retrievedEntityCollection).to.equal(newEntityCollection)
    })

    it("[removeEntityCollections test]: should remove entity collections from the aggregate", () => {
        aggregate.removeEntityCollections("newEntityCollection")
        const retrievedEntityCollection = aggregate.getEntityCollectionsByKey(
            "newEntityCollection"
        )
        expect(retrievedEntityCollection).to.be.undefined
    })

    it("[getExtraInfo test]: should get extra information by key", () => {
        const extraInfoValue = aggregate.getExtraInfo("key1")
        expect(extraInfoValue).to.equal("value1")
    })

    it("[setExtraInfo test]: should set extra information by key", () => {
        aggregate.setExtraInfo("key3", "value3")
        const extraInfoValue = aggregate.getExtraInfo("key3")
        expect(extraInfoValue).to.equal("value3")
    })
})
