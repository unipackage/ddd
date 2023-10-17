import { ValueObject } from "../valueObject"

export interface EntityProperties {
    id: string | number
    [key: string]: any
}

export abstract class Entity<T extends EntityProperties> {
    protected properties: T

    constructor(properties: T) {
        if (
            !properties ||
            typeof properties !== "object" ||
            properties.id === undefined
        ) {
            throw new Error("Invalid data provided to the constructor")
        }
        this.properties = properties
    }

    protected initialize() {}

    protected getKeys(): string[] {
        return Object.keys(this.properties)
    }

    getName(): string {
        return `${this.constructor.name} - ID: ${this.getId()}`
    }

    getType(): string {
        return `${this.constructor.name}}`
    }

    protected validate(): boolean {
        return true
    }

    getId(): string | number {
        return this.properties.id
    }

    getProperties(): T {
        return this.properties
    }

    setProperties(data: T): void {
        this.properties = data
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
