// @declaration: true

type Constructor<T> = new (...args: any[]) => T;

class Base {
    constructor(public x: number, public y: number) {
    }
}

class Derived extends Base {
    constructor(x: number, y: number, public z: number) {
        super(x, y);
    }
}

interface Printable {
    print(): void;
}

const Printable = <T extends Constructor<Base>>(superClass: T): Constructor<Printable> & { message: string } & T =>
    class extends superClass {
        static message = "hello";

        print() {
            const output = this.x + "," + this.y;
        }
    };

interface Tagged {
    _tag: string;
}

function Tagged<T extends Constructor<{}>>(superClass: T): Constructor<Tagged> & T {
    class C extends superClass {
        _tag: string;

        constructor(...args: any[]) {
            super(...args);
            this._tag = "hello";
        }
    }

    return C;
}

const Thing1 = Tagged(Derived);
const Thing2 = Tagged(Printable(Derived));
Thing2.message;

const thing = new Thing1(1, 2, 3);
let x = thing.x;
let tag = thing._tag;