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
import { Entities } from "../entities"
import { ValueFields } from "@unipackage/utils"

/**
 * interface of the aggregate.
 */
export interface Aggregate<T extends Object> {
    readonly id: string | number
    name: string
    entities: {
        [key: string]: Entity<T>
    }
    entityCollections: {
        [key: string]: Entities<Entity<T>>
    }
    extra: {
        [key: string]: any
    }
}

/**
 * Represents an aggregate.
 * @template T - Type of the aggregate properties.
 */
export class Aggregate<T extends Object> {
    /**
     * Creates an instance of the aggregate.
     * @param data - The initial data for the entity.
     */
    constructor(data: ValueFields<T>) {
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data provided to the constructor")
        }
        Object.assign(this, data)
    }

    /**
     * Gets the ID of the aggregate.
     * @returns The ID of the aggregate.
     */
    getId(): string | number {
        return this.id
    }

    /**
     * Gets the name of the aggregate.
     * @returns The name of the aggregate.
     */
    getName(): string {
        return this.name
    }

    /**
     * Gets the total count of entity types in the aggregate.
     * @returns The total count of entity types.
     */
    getEntityTypeCount(): number {
        const entitiesCount = Object.keys(this.entities).length

        const entityCollectionsCount = Object.values(
            this.entityCollections
        ).reduce(
            (count, entityCollection) => count + entityCollection.count(),
            0
        )

        return entitiesCount + entityCollectionsCount
    }

    /**
     * Gets an entity by key.
     * @param key - The key of the entity.
     * @returns The entity with the specified key, or undefined if not found.
     */
    getEntityByKey(key: string): Entity<Object> | undefined {
        return this.entities[key]
    }

    /**
     * Gets entity collections by key.
     * @param key - The key of the entity collections.
     * @returns The entity collections with the specified key, or undefined if not found.
     */
    getEntityCollectionsByKey(
        key: string
    ): Entities<Entity<Object>> | undefined {
        return this.entityCollections[key]
    }

    /**
     * Adds an entity to the aggregate.
     * @param key - The key of the entity.
     * @param entity - The entity to add.
     */
    addEntity(key: string, entity: Entity<Object>): void {
        this.entities[key] = entity
    }

    /**
     * Removes an entity from the aggregate.
     * @param key - The key of the entity to remove.
     */
    removeEntity(key: string): void {
        delete this.entities[key]
    }

    /**
     * Adds entity collections to the aggregate.
     * @param key - The key of the entity collections.
     * @param entity - The entity collections to add.
     */
    addEntityCollections(key: string, entity: Entities<Entity<Object>>): void {
        this.entityCollections[key] = entity
    }

    /**
     * Removes entity collections from the aggregate.
     * @param key - The key of the entity collections to remove.
     */
    removeEntityCollections(key: string): void {
        delete this.entityCollections[key]
    }

    /**
     * Gets extra information by key.
     * @param key - The key of the extra information.
     * @returns The extra information with the specified key, or undefined if not found.
     */
    getExtraInfo(key: string): any {
        return this.extra[key]
    }

    /**
     * Sets extra information by key.
     * @param key - The key of the extra information.
     * @param value - The value of the extra information.
     */
    setExtraInfo(key: string, value: any): void {
        this.extra[key] = value
    }
}
