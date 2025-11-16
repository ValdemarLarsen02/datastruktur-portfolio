/**
 * @author Valdemar Larsen <cph-vl91@stud.ek.dk>
 */


//Vi bruger plain objects så vores test.js forstår det..
function createNode(data) {
    return { data, next: null, prev: null };
}

export default class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /* Utils */
    printList() {
        let current = this.head;
        let index = 0;
        while (current) {
            console.log(
                `[${index}] data=`, current.data,
                " prev=", current.prev ? current.prev.data : null,
                " next=", current.next ? current.next.data : null
            );
            current = current.next;
            index++;
        }
        if (index === 0) console.log("(empty list)");
    }

    /* Vores standarde tilføj fjern metoder */
    addLast(data) {
        const newNode = createNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this._size++;
        return data;
    }

    addFirst(data) {
        const newNode = createNode(data);


        if (!this.head) {
            this.head = newNode;
            this.tail = newNode
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;

        }

        this._size++;
        return data;
    }

    removeFirst() {
        if (!this.head) return undefined;

        const oldHead = this.head;
        this.head = oldHead.next;
        if (this.head) this.head.prev = null;
        else this.tail = null; // Listen blev nu tom
        this._size--;
        return oldHead.data
    }

    removeLast() {
        if (!this.tail) return undefined;

        const oldTail = this.tail;
        this.tail = oldTail.prev;
        if (this.tail) this.tail.next = null;
        else this.head = null; // Listen blev nu tom
        this._size--;
        return oldTail.data;
    }


    remove(index) {
        const node = this.getNode(index);
        return this.removeNode(node);
    }


    getFirst() {
        return this.head ? this.head.data : undefined;
    }

    getLast() {
        return this.tail ? this.tail.data : undefined;
    }


    get(index) {
        const node = this.getNode(index); //Henter node udfra index
        return node.data;
    }

    set(index, data) {
        const node = this.getNode(index);
        node.data = data;
    }

    size() {
        return this._size;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }


    /* Vores adgang/vej til givende node */
    getNode(index) {
        if (index < 0 || index >= this._size) {
            throw new RangeError(`Index ${index} out of bounds`);
        }

        let current;
        //Henter fra head eller tail afhænig af hvad vores index er.
        if (index < this._size / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) current = current.next;
        } else {
            current = this.tail;
            for (let i = this._size - 1; i > index; i--) current = current.prev;
        }
        return current;
    }

    getFirstNode() { return this.head; }
    getLastNode() { return this.tail; }

    getNextNode(node) { return node ? node.next : null; }
    getPreviousNode(node) { return node ? node.prev : null; }


    insert(index, data) {
        if (index === 0) return this.addFirst(data);
        if (index === this._size) return this.addLast(data);

        const nodeAtIndex = this.getNode(index);
        return this.insertBeforeNode(nodeAtIndex, data);
    }

    insertAfter(index, data) {
        if (index === this._size - 1) return this.addLast(data);
        const nodeAtIndex = this.getNode(index);
        return this.insertAfterNode(nodeAtIndex, data);
    }

    insertBefore(index, data) {
        if (index === 0) return this.addFirst(data);
        const nodeAtIndex = this.getNode(index);
        return this.insertBeforeNode(nodeAtIndex, data);
    }

    insertAfterNode(node, data) {
        if (!node) throw new Error("Node is null or not valid");

        const newNode = createNode(data);
        newNode.prev = node;
        newNode.next = node.next;

        if (node.next) node.next.prev = newNode;
        else this.tail = newNode;

        node.next = newNode;
        this._size++;
        return data;
    }


    insertBeforeNode(node, data) {
        if (!node) throw new Error("Node is null or not valid");


        const newNode = createNode(data);
        newNode.next = node;
        newNode.prev = node.prev;

        if (node.prev) node.prev.next = newNode;
        else this.head = newNode;

        node.prev = newNode;
        this._size++;
        return data;

    }

    removeNode(node) {
        if (!node) throw new Error("Node is null or not valid");

        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;

        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;

        node.next = null;
        node.prev = null;
        this._size--;
        return node.data;

    }

    makeFirst(node) {
        if (!node || node === this.head) return;

        this.removeNode(node);
        this.addFirst(node.data);
    }

    makeLast(node) {
        if (!node || node === this.tail) return;
        this.removeNode(node);
        this.addLast(node.data);
    }

    swap(nodeA, nodeB) {
        if (!nodeA || !nodeB || nodeA === nodeB) return;

        //Her bytter vi blot data deres
        const temp = nodeA.data;
        nodeA.data = nodeB.data;
        nodeB.data = temp;
    }

}