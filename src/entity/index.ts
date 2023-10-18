import { ValueObject } from "../valueObject"
import { MemberVariables } from "@unipackage/utils"
import { isEqual } from "lodash"

export abstract class Entity<T extends Object> {
    [key: string]: any

    constructor(properties: MemberVariables<T> & { id: any }) {
        if (
            !properties ||
            typeof properties !== "object" ||
            properties.id === undefined
        ) {
            throw new Error("Invalid data provided to the constructor")
        }
        Object.assign(this, properties)
    }

    protected initialize() {}

    protected getKeys(): string[] {
        return Object.keys(this)
    }

    equal(other: T, fields?: Array<keyof T & keyof this>): boolean {
        const properties =
            fields ?? (Object.keys(this) as Array<keyof T & keyof this>)
        for (const property of properties) {
            if (!isEqual(this[property], other[property])) {
                return false
            }
        }
        return true
    }

    getName(): string {
        return `${this.constructor.name} - ID: ${this.getId()}`
    }

    getType(): string {
        return `${this.constructor.name}`
    }

    protected validate(): boolean {
        return true
    }

    getId(): any {
        return this.id
    }

    serialize(): string {
        return JSON.stringify(this)
    }

    deserialize(data: string): void {
        try {
            const parsedData = JSON.parse(data)
            Object.assign(this, parsedData)
        } catch (error: any) {
            throw new Error("Failed to deserialize the data. " + error.message)
        }
    }

    clone(): Entity<T> {
        const clonedData = JSON.parse(JSON.stringify(this))
        return new (this.constructor as any)(clonedData)
    }

    //no use
    compareProperties(entity: Entity<T>): boolean {
        const thisKeys = Object.keys(this)
        const entityKeys = Object.keys(entity)

        if (thisKeys.length !== entityKeys.length) {
            return false
        }

        for (const key of thisKeys) {
            const thisValue = this[key]
            const entityValue = entity[key]

            if (
                thisValue instanceof ValueObject &&
                entityValue instanceof ValueObject
            ) {
                if (!thisValue.equals(entityValue.immutable())) {
                    return false
                }
            } else if (thisValue !== entityValue) {
                return false
            }
        }

        return true
    }
}
