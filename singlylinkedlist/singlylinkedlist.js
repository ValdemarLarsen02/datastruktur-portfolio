/**
 * @author Valdemar Larsen <cph-vl91@stud.ek.dk>
 */

const createNode = (data) => ({ data, next: null });


export default class SinglyLinkedList {
    constructor() {
        this.head = null;
        this._size = 0;
    }

    /* Utility */
    printList() {
        let current = this.head;
        let index = 0;
        while (current) {
            console.log(`[${index}] data=`, current.data, " next=", current.next);
            current = current.next;
            index++;
        }
        if (index === 0) console.log("(empty list)");
    }

    /* Metoder */
    add(data) {
        const newNode = createNode(data);


        if (!this.head) {
            this.head = newNode;
        } else {
            let last = this.getLastNode();
            last.next = newNode;
        }

        this._size++;
        return data;
    }

    get(index) {
        return this.getNode(index).data;
    }


    getFirst() {
        if (!this.head) return undefined;
        return this.head.data;
    }


    getLast() {
        const lastNode = this.getLastNode();
        return lastNode ? lastNode.data : undefined;
    }

    set(index, data) {
        this.getNode(index).data = data;
    }

    insert(index, data) {
        if (index < 0 || index > this._size) {
            throw new RangeError(`Index ${index} out of bounds`);
        }

        const newNode = createNode(data);

        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            const previous = this.getNode(index - 1);
            newNode.next = previous.next;
            previous.next = newNode;
        }

        this._size++;
    }


    remove(index) {
        if (index < 0 || index >= this._size) {
            throw new RangeError(`Index ${index} out of bounds`);
        }

        let removedNode;
        if (index === 0) {
            removedNode = this.head;
            this.head = this.head.next;
        } else {
            const previous = this.getNode(index - 1);
            removedNode = previous.next;
            previous.next = removedNode.next;
        }

        this._size--;
        return removedNode.data;
    }


    removeFirst() {
        if (!this.head) return undefined;

        const oldHead = this.head;
        this.head = this.head.next;
        this._size--;
        return oldHead.data;
    }

    removeLast() {
        if (!this.head) return undefined;


        if (this._size === 1) {
            const data = this.head.data;
            this.head = null;
            this._size = 0;
            return data;
        }

        const previous = this.getNode(this._size - 2);
        const data = previous.next.data;
        previous.next = null;
        this._size--;
        return data;
    }

    size() {
        return this._size;
    }

    clear() {
        this.head = null;
        this._size = 0;
    }

    getNode(index) {
        if (index < 0 || index >= this._size) {
            throw new RangeError(`Index ${index} out of bounds`);
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }


    getFirstNode() {
        return this.head;
    }

    getLastNode() {
        if (!this.head) return null;
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        return current;
    }

    getNextNode(node) {
        return node ? node.next : null;
    }

    getPreviousNode(node) {
        if (node === this.head) return null;
        let current = this.head;
        while (current && current.next !== node) {
            current = current.next;
        }
        return current || null;
    }

    insertBefore(node, data) {
        if (node === this.head) {
            //Indsætter i starten
            const newNode = createNode(data);

            newNode.next = this.head;
            this.head = newNode;
            this._size++;
            return;
        }

        const previous = this.getPreviousNode(node);
        if (!previous) {
            throw new Error("Node not found in the current list");
        }

        const newNode = createNode(data);

        newNode.next = node;
        previous.next = newNode;
        this._size++;
    }

    insertAfter(node, data) {
        if (!node) throw new Error("Node is null or not valid");


        const newNode = createNode(data);

        newNode.next = node.next;
        node.next = newNode;

        this._size++;
    }

    removeNode(node) {
        if (!node) throw new Error("Node is null or not valid");

        if (node === this.head) {
            this.head = this.head.next;
            this._size--;
            return node.data;
        }

        const previous = this.getPreviousNode(node);
        if (!previous) throw new Error("Node not found in the current list");

        previous.next = node.next;
        this._size--;
        return node.data;
    }

}