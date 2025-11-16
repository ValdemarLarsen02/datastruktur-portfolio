import assert from "assert";
import Grid from "./grid.js";

describe("Grid datastruktur", () => {

    describe("Constructor", () => {
        it("should create a grid with correct dimensions", () => {
            const g = new Grid(3, 4);
            assert.strictEqual(g.rows(), 3);
            assert.strictEqual(g.cols(), 4);
            assert.strictEqual(g.size(), 12);
        });
    });

    describe("Set & Get", () => {
        const g = new Grid(2, 3);

        it("should set and get values", () => {
            g.set({ row: 0, col: 1 }, "X");
            assert.strictEqual(g.get({ row: 0, col: 1 }), "X");
        });

        it("should return undefined for out-of-bounds", () => {
            assert.strictEqual(g.get({ row: 9, col: 9 }), undefined);
        });
    });

    describe("Index mapping", () => {
        const g = new Grid(3, 3);

        it("should compute index from row/col", () => {
            assert.strictEqual(g.indexFor({ row: 0, col: 0 }), 0);
            assert.strictEqual(g.indexFor({ row: 1, col: 0 }), 3);
            assert.strictEqual(g.indexFor({ row: 2, col: 2 }), 8);
        });

        it("should compute row/col from index", () => {
            assert.deepStrictEqual(g.rowColFor(0), { row: 0, col: 0 });
            assert.deepStrictEqual(g.rowColFor(4), { row: 1, col: 1 });
            assert.deepStrictEqual(g.rowColFor(8), { row: 2, col: 2 });
        });
    });

    describe("Neighbours", () => {
        const g = new Grid(3, 3);
        g.fill(1);

        it("should return correct neighbour positions", () => {
            const n = g.neighbours({ row: 1, col: 1 });
            assert.strictEqual(n.length, 8); // midten har 8 naboer
        });

        it("should return fewer neighbours at edges", () => {
            const n = g.neighbours({ row: 0, col: 0 });
            assert.strictEqual(n.length, 3);
        });

        it("should return neighbour values", () => {
            g.set({ row: 1, col: 1 }, 99);
            const values = g.neighbourValues({ row: 1, col: 1 });

            assert(values.includes(1));
            assert(!values.includes(99));
        });
    });

    describe("Directional helpers", () => {
        const g = new Grid(3, 3);
        g.set({ row: 1, col: 1 }, "CENTER");
        g.set({ row: 1, col: 2 }, "E");
        g.set({ row: 1, col: 0 }, "W");
        g.set({ row: 0, col: 1 }, "N");
        g.set({ row: 2, col: 1 }, "S");

        it("east", () => {
            const c = g.east({ row: 1, col: 1 });
            assert.deepStrictEqual(c, { row: 1, col: 2, value: "E" });
        });

        it("west", () => {
            const c = g.west({ row: 1, col: 1 });
            assert.deepStrictEqual(c, { row: 1, col: 0, value: "W" });
        });

        it("north", () => {
            const c = g.north({ row: 1, col: 1 });
            assert.deepStrictEqual(c, { row: 0, col: 1, value: "N" });
        });

        it("south", () => {
            const c = g.south({ row: 1, col: 1 });
            assert.deepStrictEqual(c, { row: 2, col: 1, value: "S" });
        });

        it("out-of-bounds should return undefined", () => {
            assert.strictEqual(g.north({ row: 0, col: 1 }), undefined);
            assert.strictEqual(g.west({ row: 1, col: 0 }), undefined);
        });
    });

    describe("Row/col traversal", () => {
        const g = new Grid(2, 3);
        g.set({ row: 0, col: 0 }, "A");
        g.set({ row: 0, col: 1 }, "B");
        g.set({ row: 0, col: 2 }, "C");

        it("nextInRow", () => {
            assert.deepStrictEqual(g.nextInRow({ row: 0, col: 0 }), { row: 0, col: 1, value: "B" });
            assert.strictEqual(g.nextInRow({ row: 0, col: 2 }), undefined);
        });

        it("nextInCol", () => {
            g.set({ row: 1, col: 0 }, "X");
            assert.deepStrictEqual(g.nextInCol({ row: 0, col: 0 }), { row: 1, col: 0, value: "X" });
            assert.strictEqual(g.nextInCol({ row: 1, col: 0 }), undefined);
        });
    });

    describe("Fill", () => {
        it("should fill entire grid with same value", () => {
            const g = new Grid(2, 2);
            g.fill(7);
            assert.strictEqual(g.get({ row: 0, col: 0 }), 7);
            assert.strictEqual(g.get({ row: 1, col: 1 }), 7);
        });
    });
});
