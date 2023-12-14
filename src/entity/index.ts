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

import { isEqual } from "lodash"
import { ValueFields } from "@unipackage/utils"

/**
 * Interface defining common methods for entities.
 */
interface EntityInterface {
    /**
     * Creates a clone of the entity.
     * @returns A cloned instance of the entity.
     */
    clone(): this

    /**
     * Compares the entity with another for equality.
     * @param other - The entity to compare.
     * @param fields - Optional array of fields to compare. If not provided, compares all fields.
     * @returns True if the entities are equal, false otherwise.
     */
    equal(other: this, fields?: Array<keyof this>): boolean

    /**
     * Gets the identifier of the entity.
     * @returns The identifier of the entity.
     */
    getId(): any

    /**
     * Gets an array of all keys (fields) in the entity.
     * @returns An array of keys in the entity.
     */
    getKeys(): string[]

    /**
     * Gets a human-readable name for the entity.
     * @returns A human-readable name for the entity.
     */
    getName(): string

    /**
     * Gets the type of the entity.
     * @returns The type of the entity.
     */
    getType(): string
}

/**
 * Abstract base class for entities providing common functionality.
 * @template T - The type of data associated with the entity.
 */
export abstract class Entity<T extends Object> implements EntityInterface {
    /**
     * The identifier of the entity.
     */
    id?: any

    /**
     * Creates an instance of the entity.
     * @param data - The initial data for the entity.
     */
    constructor(data: ValueFields<T>) {
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data provided to the constructor")
        }
        Object.assign(this, data)
    }

    /**
     * Creates a clone of the entity.
     * @returns A cloned instance of the entity.
     */
    clone(): this {
        const result: Record<string, any> = {}

        Object.entries(this).forEach(([key, value]) => {
            if (this.hasOwnProperty(key) && typeof value !== "function") {
                result[key] = value instanceof Entity ? value.clone() : value
            }
        })

        return new (this.constructor as any)(result)
    }

    /**
     * Compares the entity with another for equality.
     * @param other - The entity to compare.
     * @param fields - Optional array of fields to compare. If not provided, compares all fields.
     * @returns True if the entities are equal, false otherwise.
     */
    equal(other: this, fields?: Array<keyof this>): boolean {
        const properties = fields ?? (Object.keys(this) as Array<keyof this>)
        for (const property of properties) {
            if (!isEqual(this[property], other[property])) {
                return false
            }
        }
        return true
    }

    /**
     * Gets the identifier of the entity.
     * @returns The identifier of the entity.
     */
    getId(): any {
        return this.id
    }

    /**
     * Gets an array of all keys (fields) in the entity.
     * @returns An array of keys in the entity.
     */
    getKeys(): string[] {
        return Object.keys(this)
    }

    /**
     * Gets a human-readable name for the entity.
     * @returns A human-readable name for the entity.
     */
    getName(): string {
        return `${this.constructor.name} - ID: ${this.getId()}`
    }

    /**
     * Gets the type of the entity.
     * @returns The type of the entity.
     */
    getType(): string {
        return `${this.constructor.name}`
    }

    /**
     * Gets the identifier of the entity.
     * @returns The identifier of the entity.
     */
    setId(id: any) {
        this.id = id
    }
}
