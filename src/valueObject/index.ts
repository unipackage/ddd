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

import { Record } from "immutable"
import lodash from "lodash"

/**
 * Represents a generic value object.
 * @template T - The type of the underlying object.
 */
export class ValueObject<T extends Object> {
    /**
     * The underlying object.
     */
    private obj: T

    /**
     * Creates an instance of the ValueObject.
     * @param obj - The underlying object.
     */
    constructor(obj: T) {
        this.obj = obj
    }

    /**
     * Converts the underlying object to an immutable Record.
     * @returns An immutable Record instance.
     */
    immutable(): Record<T> {
        return Record<T>(this.obj)().asImmutable()
    }

    /**
     * Checks if this ValueObject is equal to another object.
     * @param other - The object to compare.
     * @returns True if equal, false otherwise.
     */
    equals(other: T | ValueObject<T>): boolean {
        if (!(other instanceof ValueObject)) {
            return lodash.isEqual(this.obj, other)
        }
        return lodash.isEqual(
            this.immutable().toObject(),
            other.immutable().toObject()
        )
    }

    /**
     * Converts the underlying object to a plain JavaScript object.
     * @returns A plain JavaScript object.
     */
    toObject(): T {
        return this.immutable().toObject()
    }

    /**
     * Creates a deep clone of the underlying object.
     * @returns A deep clone of the underlying object.
     */
    cloneObject(): T {
        return lodash.cloneDeep(this.obj)
    }
}
