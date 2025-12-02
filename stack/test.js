import assert from "assert";
import Stack from "./stack.js";

describe("Stack datastruktur", () => {

    describe("Constructor", () => {
        it("should start empty", () => {
            const s = new Stack();
            assert.strictEqual(s.head, null);
            assert.strictEqual(s.size(), 0);
            assert.strictEqual(s.peek(), null);
        });
    });

    describe("Push", () => {
        it("should push items on top of the stack", () => {
            const s = new Stack();
            s.push("A");
            s.push("B");

            assert.strictEqual(s.size(), 2);
            assert.strictEqual(s.peek(), "B");
        });
    });

    describe("Pop", () => {
        it("should pop items in LIFO order", () => {
            const s = new Stack();
            s.push("A");
            s.push("B");
            s.push("C");

            assert.strictEqual(s.pop(), "C");
            assert.strictEqual(s.pop(), "B");
            assert.strictEqual(s.pop(), "A");
        });

        it("should return null when popping an empty stack", () => {
            const s = new Stack();
            assert.strictEqual(s.pop(), null);
        });
    });

    describe("Peek", () => {
        it("should return the top element without removing it", () => {
            const s = new Stack();
            s.push(10);
            s.push(20);

            assert.strictEqual(s.peek(), 20);
            assert.strictEqual(s.size(), 2); // nothing removed
        });

        it("should return null on empty stack", () => {
            const s = new Stack();
            assert.strictEqual(s.peek(), null);
        });
    });

    describe("Size", () => {
        it("should correctly track the number of elements", () => {
            const s = new Stack();
            assert.strictEqual(s.size(), 0);

            s.push("A");
            s.push("B");
            assert.strictEqual(s.size(), 2);

            s.pop();
            assert.strictEqual(s.size(), 1);
        });
    });

    describe("Get(index)", () => {
        const s = new Stack();
        s.push("A"); // index 2
        s.push("B"); // index 1
        s.push("C"); // index 0

        it("should return correct element by index", () => {
            assert.strictEqual(s.get(0), "C");
            assert.strictEqual(s.get(1), "B");
            assert.strictEqual(s.get(2), "A");
        });

        it("should return null for invalid index", () => {
            assert.strictEqual(s.get(-1), null);
            assert.strictEqual(s.get(999), null);
        });
    });
});
