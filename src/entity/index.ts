import { ValueObject } from "../valueObject"
import { isEqual } from "lodash"

export interface EntityProperties {
    id?: any
    [key: string]: any
}

export abstract class Entity<T extends EntityProperties> {
    public properties: T

    constructor(properties: T) {
        if (!properties || typeof properties !== "object") {
            throw new Error("Invalid data provided to the constructor")
        }
        this.properties = properties
    }

    protected initialize() {}

    protected getKeys(): string[] {
        return Object.keys(this.properties)
    }

    equal(other: T, fields?: Array<keyof T & keyof this>): boolean {
        const properties =
            fields ??
            (Object.keys(this.properties) as Array<keyof T & keyof this>)
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
        return this.properties.id
    }

    serialize(): string {
        return JSON.stringify(this.properties)
    }

    deserialize(data: string): void {
        try {
            this.properties = JSON.parse(data)
        } catch (error: any) {
            throw new Error("Failed to deserialize the data. " + error.message)
        }
    }

    clone(): Entity<T> {
        const clonedData = JSON.parse(JSON.stringify(this.properties))
        return new (this.constructor as any)(clonedData)
    }

    //no use
    compareProperties(entity: Entity<T>): boolean {
        const thisKeys = Object.keys(this.properties)
        const entityKeys = Object.keys(entity.properties)

        if (thisKeys.length !== entityKeys.length) {
            return false
        }

        for (const key of thisKeys) {
            const thisValue = this.properties[key]
            const entityValue = entity.properties[key]

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
