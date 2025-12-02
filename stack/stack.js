export default class Stack {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    #createNode(data) {
        return {
            data: data,
            next: null
        };
    }


    push(data) {
        const newNode = this.#createNode(data);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    pop() {
        if (!this.head) return null;

        const popped = this.head.data;
        this.head = this.head.next;
        this.length--;
        return popped;
    }

    peek() {
        return this.head ? this.head.data : null;
    }

    size() {
        return this.length;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;
        let i = 0;

        while (i < index) {
            current = current.next;
            i++;
        }

        return current.data;
    }
}