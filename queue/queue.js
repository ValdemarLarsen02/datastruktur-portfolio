export default class Queue {
    constructor() {
        this.head = null; // Vores først/front
        this.tail = null; // Vores sidst/bagerste
        this.count = 0;
    }


    #createNode(data) {
        return {
            data: data,
            next: null
        };
    }


    //Tilføjer til tail
    enqueue(data) {
        const node = this.#createNode(data);
        if (this.tail === null) {
            this.head = node;
            this.tail = node;
        } else {
            //Tilføjer til tail
            this.tail.next = node;
            this.tail = node;
        }
        this.count++;
    }


    //Fjrner fra head
    dequeue() {
        if (this.head === null) return undefined;

        const data = this.head.data;

        //Flytter
        this.head = this.head.next;

        //hvis tom så er tail også tom
        if (this.head === null) this.tail = null;

        this.count--;

        return data;
    }

    peek() {
        return this.head ? this.head.data : undefined;
    }

    //Antal elementer
    size() {
        return this.count;
    }

    //Finder data ved givende index
    get(index) {
        if (index < 0 || index >= this.count) return undefined;

        let current = this.head;
        let i = 0;

        while (i < index) {
            current = current.next;
            i++;
        }

        return current.data;
    }
}