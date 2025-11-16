/**
 * @author Valdemar Larsen <cph-vl91@stud.ek.dk>
 */



export default class Grid {
    constructor(rows, cols) {
        this._rows = rows;
        this._cols = cols;
        this._data = new Array(rows * cols).fill(undefined);
    }


    /* Hjælper funktioner */
    #inBounds(row, col) {
        return row >= 0 && row < this._rows && col >= 0 && col < this._cols;
    }

    indexFor({ row, col }) {
        if (!this.#inBounds(row, col)) return undefined;
        return row * this._cols + col;
    }

    rowColFor(index) {
        if (index < 0 || index >= this._data.length) return undefined;
        const row = Math.floor(index / this._cols);
        const col = index % this._cols;
        return { row, col };
    }

    /* getters og setters */
    set({ row, col }, value) {
        const idx = this.indexFor({ row, col });
        if (idx === undefined) return;
        this._data[idx] = value;
    }

    get({ row, col }) {
        const idx = this.indexFor({ row, col });
        if (idx === undefined) return undefined;
        return this._data[idx];
    }

    /* Vores struktur */
    rows() { return this._rows; }
    cols() { return this._cols; }
    size() { return this._rows * this._cols; }

    neighbours({ row, col }) {
        const offsets = [
            { r: -1, c: 0 }, // north
            { r: +1, c: 0 }, // south
            { r: 0, c: -1 }, // west
            { r: 0, c: +1 }, // east
            { r: -1, c: -1 }, // NW
            { r: -1, c: +1 }, // NE
            { r: +1, c: -1 }, // SW
            { r: +1, c: +1 }, // SE
        ];

        const list = [];

        for (const { r, c } of offsets) {
            const nr = row + r;
            const nc = col + c;
            if (this.#inBounds(nr, nc)) {
                list.push({ row: nr, col: nc });
            }
        }

        return list
    }

    neighbourValues(pos) {
        return this.neighbours(pos).map(rc => this.get(rc));
    }


    /* til navigationen */
    #cell(row, col) {
        if (!this.#inBounds(row, col)) return undefined;
        return { row, col, value: this.get({ row, col }) };
    }

    north({ row, col }) { return this.#cell(row - 1, col); }
    south({ row, col }) { return this.#cell(row + 1, col); }
    west({ row, col }) { return this.#cell(row, col - 1); }
    east({ row, col }) { return this.#cell(row, col + 1); }

    nextInRow({ row, col }) { return this.east({ row, col }); }
    nextInCol({ row, col }) { return this.south({ row, col }); }

    fill(value) {
        this._data.fill(value);
    }

}