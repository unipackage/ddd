import { Entity, EntityProperties } from "../entity"

export abstract class Entities<T extends Entity<EntityProperties>> {
    protected entities: T[]

    constructor(entities: T[]) {
        this.entities = entities
    }

    getEntities(): T[] {
        return this.entities
    }

    add(entity: T): void {
        this.entities.push(entity)
    }

    clear(): void {
        this.entities = []
    }

    count(): number {
        return this.entities.length
    }

    find(findFn: (entity: T) => boolean): T | undefined {
        return this.entities.find((entity) => findFn(entity))
    }

    remove(entity: T): void {
        const index = this.entities.indexOf(entity)
        if (index === -1) {
            throw new Error("Entity not found in the list.")
        }
        this.entities.splice(index, 1)
    }

    sort(compareFn: (a: T, b: T) => number): void {
        this.entities.sort(compareFn)
    }
}
