import { Entity } from "../entity"
import { Entities } from "../entities"

export interface AggregateProperties {
    id: string | number
    name: string
    entities: {
        [key: string]: Entity<Object>
    }
    entityCollections: {
        [key: string]: Entities<Entity<Object>>
    }
    extra: {
        [key: string]: any
    }
}

export class Aggregate<T extends AggregateProperties> {
    private properties: T

    constructor(properties: T) {
        this.properties = properties
    }

    getId(): string | number {
        return this.properties.id
    }

    getName(): string {
        return this.properties.name
    }

    getEntityTypeCount(): number {
        const entities = this.properties.entities
        const entityCollections = this.properties.entityCollections
        return (
            Object.keys(entities).length + Object.keys(entityCollections).length
        )
    }

    getEntityByKey(key: string): Entity<Object> | undefined {
        return this.properties.entities[key]
    }

    getEntityCollectionsByKey(
        key: string
    ): Entities<Entity<Object>> | undefined {
        return this.properties.entityCollections[key]
    }

    addEntity(key: string, entity: Entity<Object>): void {
        this.properties.entities[key] = entity
    }

    removeEntity(key: string): void {
        delete this.properties.entities[key]
    }

    addEntityCollections(key: string, entity: Entities<Entity<Object>>): void {
        this.properties.entityCollections[key] = entity
    }

    removeEntityCollections(key: string): void {
        delete this.properties.entityCollections[key]
    }

    getExtraInfo(key: string): any {
        return this.properties.extra[key]
    }

    setExtraInfo(key: string, value: any): void {
        this.properties.extra[key] = value
    }
}
