import StaticArray from "../staticarray/staticarray.js";

export default class DynamicArray {
    constructor(capacity = 4) {
        this._capacity = capacity;
        this._size = 0;
        this._array = new StaticArray(capacity);
    }

    capacity() {
        return this._capacity;
    }

    grow() {
        const newCapacity = this._capacity * 2;
        const newArray = new StaticArray(newCapacity);

        for (let i = 0; i < this._size; i++) {
            newArray.set(i, this._array.get(i));
        }

        this._array = newArray;
        this._capacity = newCapacity;
    }

    /* Vores array metoder */
    size() {
        return this._size;
    }

    add(item) {
        if (this._size === this._capacity) {
            this.grow();
        }

        this._array.set(this._size, item);
        this._size++;
    }


    get(index) {
        this.#checkIndex(index);
        return this._array.get(index);
    }

    set(index, value) {
        this.#checkIndex(index);
        this._array.set(index, value);
    }

    insert(index, item) {
        if (index < 0 || index > this._size) {
            throw new RangeError(`Index ${index} is out of bounds (size: ${this._size})`);
        }

        if (this._size === this._capacity) {
            this.grow();
        }

        //Skubber vores elementer en tak frem af
        for (let i = this._size; i > index; i--) {
            const previous = this._array.get(i - 1);
            this._array.set(i, previous);
        }

        this._array.set(index, item);
        this._size++;
    }

    remove(index) {
        this.#checkIndex(index);

        //Skubber elementer tilbage af en tak
        for (let i = index; i < this._size - 1; i++) {
            const next = this._array.get(i + 1);
            this._array.set(i, next);
        }


        //Det betyder sidste element nu er tomt
        this._array.set(this._size - 1, undefined);
        this._size--;
    }

    clear() {
        //Nulstiller men har stadig kapaciteten

        for (let i = 0; i < this._size; i++) {
            this._array.set(i, undefined);
        }
        this._size = 0;
    }

    /* Hjælper metoder til check af index. */
    #checkIndex(index) {
        if (index < 0 || index >= this._size) {
            throw new RangeError(`Index ${index} is out of bounds (size: ${this._size})`);
        }
    }
}