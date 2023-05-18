
function logThis(arg1, arg2, arg3) {
  console.log(`this ${arg1} + ${arg2} + ${arg3}`, this);
}

logThis(); //? window

logThis.call(42);              //? Number {42}
logThis.apply(42);             //? Number {42}
logThis.apply(42, [1, 2, 3]);  //? this 1 + 2 + 3 Number {42}
logThis(1, 2, 3)               //? this 1 + 2 + 3 Window {window: …}
logThis.call(42, 1, 2, 3);     //? this 1 + 2 + 3 Number {42}

const fu = logThis.bind(45);
fu();                          //? this undefined + undefined + undefined Number {45}



const mee = {
  name: 'Serge',
  whoAmI() {
    console.log(this)
    console.log(this.name)
  }
}

mee.whoAmI()                //?  this =>       {name: 'Serge', whoAmI: ƒ}
                            //? this.name  =>  Serge

const notMee = {
  name: 'not Serge'
};

mee.whoAmI.call(notMee);   //? {name: 'not Serge'}
                           //? not Serge

