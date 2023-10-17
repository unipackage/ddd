import { Record } from "immutable"
import lodash from "lodash"

export class ValueObject<T extends Object> {
    private obj: T
    constructor(obj: T) {
        this.obj = obj
    }

    immutable(): Record<T> {
        return Record<T>(this.obj)().asImmutable()
    }

    equals(other: T | ValueObject<T>): boolean {
        if (!(other instanceof ValueObject)) {
            return lodash.isEqual(this.obj, other)
        }
        return lodash.isEqual(
            this.immutable().toObject(),
            other.immutable().toObject()
        )
    }

    toObject(): T {
        return this.immutable().toObject()
    }

    cloneObject(): T {
        return lodash.cloneDeep(this.obj)
    }
}
