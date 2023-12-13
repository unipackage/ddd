import { isEqual } from "lodash"
import { TypeFromProperties } from "@unipackage/utils"

export interface EntityInterface {
    clone(): this
    equal(other: this, fields?: Array<keyof this>): boolean
    getName(): string
    getType(): string
    getId(): any
}

export abstract class Entity<T extends Object> implements EntityInterface {
    id?: any

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

    protected validate(): boolean {
        return true
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

    getId(): any {
        return this.id
    }

    clone(): this {
        const clonedData = JSON.parse(JSON.stringify(this))
        return new (this.constructor as any)(clonedData)
    }
}
