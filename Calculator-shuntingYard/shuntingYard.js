/* @Author Valdemar Larsen */

import Stack from "../stack/stack.js";
import Queue from "../queue/queue.js";

const operators = {
    "^": { prec: 5, assoc: 'right' },
    "*": { prec: 4, assoc: 'left' },
    "/": { prec: 4, assoc: 'left' },
    "+": { prec: 3, assoc: 'left' },
    "-": { prec: 3, assoc: 'left' }
};


//error handling
const assert = (predicate, msg) => {
    if (predicate) return;
    throw new Error(msg || 'Assertion failed due to invalid token');
};

const toRPN = (input) => {
    // Tokeniser input: tal, operatorer og parenteser
    const tokens = input.match(/\d+(\.\d+)?|[+\-*/^()]|\S/g);

    const operatorStack = new Stack();
    const outputQueue = new Queue();

    for (let token of tokens) {
        if (!isNaN(parseFloat(token))) {
            // Tal vi sender til output queue
            outputQueue.enqueue(token);
        } else if (token in operators) {
            // Operator
            const o1 = token;
            let o2 = operatorStack.peek();

            while (
                o2 !== null &&
                o2 in operators &&
                (operators[o2].prec > operators[o1].prec ||
                    (operators[o2].prec === operators[o1].prec &&
                        operators[o1].assoc === 'left'))
            ) {
                outputQueue.enqueue(operatorStack.pop());
                o2 = operatorStack.peek();
            }
            operatorStack.push(o1);
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            // Pop indtil '('
            let top = operatorStack.peek();
            while (top !== "(") {
                assert(operatorStack.size() !== 0, "Mismatched parentheses");
                outputQueue.enqueue(operatorStack.pop());
                top = operatorStack.peek();
            }
            operatorStack.pop(); // fjerner '('
        } else {
            throw new Error(`Invalid token: ${token}`);
        }
    }

    // Pop alle resterende operatorer til output queue
    while (operatorStack.size() > 0) {
        assert(operatorStack.peek() !== "(", "Mismatched parentheses");
        outputQueue.enqueue(operatorStack.pop());
    }

    // Laver vores output string
    let output = "";
    while (outputQueue.size() > 0) {
        output += outputQueue.dequeue() + " ";
    }

    return output.trim();
};

// --- Test ---
const input = "12 + 3 * 4 - 5";
const result = toRPN(input);
console.log(result); // Forventet output: "12 3 4 * + 5 -"
