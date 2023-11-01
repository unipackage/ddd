import { ValueObject } from "../valueObject"
import { isEqual } from "lodash"
import { TypeFromProperties } from "@unipackage/utils"

export interface EntityInterface {
    clone(): this
    compareProperties(entity: this): boolean
    deserialize(data: string): void
    equal(other: this, fields?: Array<keyof this>): boolean
    getName(): string
    getType(): string
    getId(): any
    serialize(): string
}

export abstract class Entity<T extends Object> implements EntityInterface {
    id?: any;
    [key: string]: any

    constructor(data: TypeFromProperties<T>) {
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data provided to the constructor")
        }
        Object.assign(this, data)
    }

    protected initialize() {}

    protected getKeys(): string[] {
        return Object.keys(this)
    }

    equal(other: this, fields?: Array<keyof this>): boolean {
        const properties = fields ?? (Object.keys(this) as Array<keyof this>)
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
            this.properties = JSON.parse(data)
        } catch (error: any) {
            throw new Error("Failed to deserialize the data. " + error.message)
        }
    }

    clone(): this {
        const clonedData = JSON.parse(JSON.stringify(this))
        return new (this.constructor as any)(clonedData)
    }

    //no use
    compareProperties(entity: this): boolean {
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
