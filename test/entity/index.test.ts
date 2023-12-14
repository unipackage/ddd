import { expect } from "chai"
import { it } from "mocha"
import { Entity } from "../../src/entity"
import { ValueFields } from "@unipackage/utils"

// Sample class extending Entity for testing
class SampleEntity extends Entity<{
    name: string
    age: number
    address: {
        city: string
        zip: string
    }
}> {}

describe("Entity", () => {
    it("[constuctor test]:should create an instance of the entity", () => {
        const data: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity = new SampleEntity(data)
        expect(entity).to.be.an.instanceOf(SampleEntity)
    })

    it("[clone test]: should clone the entity", () => {
        const data: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity = new SampleEntity(data)
        const clonedEntity = entity.clone()
        expect(clonedEntity).to.be.an.instanceOf(SampleEntity)
        expect(clonedEntity).to.deep.equal(entity)
        expect(clonedEntity).to.not.equal(entity)
    })

    it("[equal test]: should compare entities for equality", () => {
        const data1: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity1 = new SampleEntity(data1)

        const data2: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity2 = new SampleEntity(data2)

        const data3: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "Jane Doe",
            age: 30,
            address: {
                city: "Another City",
                zip: "67890",
            },
        }
        const entity3 = new SampleEntity(data3)

        expect(entity1.equal(entity2)).to.be.true
        expect(entity1.equal(entity3)).to.be.false
    })

    it("[getId test]: should get the identifier of the entity", () => {
        const data: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity = new SampleEntity(data)
        expect(entity.getId()).to.be.undefined // Assuming id is not defined in the provided Entity class
    })

    it("[getKeys test]: should get an array of keys in the entity", () => {
        const data: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity = new SampleEntity(data)
        const keys = entity.getKeys()
        expect(keys).to.deep.equal(["name", "age", "address"])
    })

    it("[getName test]: should get a human-readable name for the entity", () => {
        const data: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity = new SampleEntity(data)
        const name = entity.getName()
        expect(name).to.equal("SampleEntity - ID: undefined")
    })

    it("[getType test]: should get the type of the entity", () => {
        const data: ValueFields<{
            name: string
            age: number
            address: {
                city: string
                zip: string
            }
        }> = {
            name: "John Doe",
            age: 25,
            address: {
                city: "Example City",
                zip: "12345",
            },
        }
        const entity = new SampleEntity(data)
        const type = entity.getType()
        expect(type).to.equal("SampleEntity")
    })
})
