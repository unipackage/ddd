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

import { Entity } from "../entity"

/**
 * Abstract class representing a collection of entities.
 * @template T - The type of entities in the collection, extending Entity<Object>.
 */
export class Entities<T extends Entity<Object>> {
    /**
     * The array of entities in the collection.
     */
    protected entities: T[]

    /**
     * Creates an instance of the Entities class.
     * @param entities - An array of entities to initialize the collection.
     */
    constructor(entities: T[]) {
        this.entities = entities
    }

    /**
     * Gets the array of entities in the collection.
     * @returns An array of entities.
     */
    getEntities(): T[] {
        return this.entities
    }

    /**
     * Adds an entity to the collection.
     * @param entity - The entity to add.
     */
    add(entity: T): void {
        this.entities.push(entity)
    }

    /**
     * Clears all entities from the collection.
     */
    clear(): void {
        this.entities = []
    }

    /**
     * Gets the count of entities in the collection.
     * @returns The number of entities.
     */
    count(): number {
        return this.entities.length
    }

    /**
     * Finds an entity in the collection based on the provided find function.
     * @param findFn - The function used to find the entity.
     * @returns The found entity or undefined if not found.
     */
    find(findFn: (entity: T) => boolean): T | undefined {
        return this.entities.find((entity) => findFn(entity))
    }

    /**
     * Removes the specified entity from the collection.
     * @param entity - The entity to remove.
     * @throws Error if the entity is not found in the collection.
     */
    remove(entity: T): void {
        const index = this.entities.indexOf(entity)
        if (index === -1) {
            throw new Error("Entity not found in the list.")
        }
        this.entities.splice(index, 1)
    }

    /**
     * Sorts the entities in the collection based on the provided compare function.
     * @param compareFn - The function used to compare entities for sorting.
     */
    sort(compareFn: (a: T, b: T) => number): void {
        this.entities.sort(compareFn)
    }
}
