const me = {
  name: 'Serge',
  whoAmI() {
    console.log(this.name)
  }
}

me.whoAmI();

me.name = '123456'
me.whoAmI();

//========================

function logThis(arg1, arg2, arg3) {
  console.log(`this ${arg1} + ${arg2} + ${arg3}`, this);
}

logThis();

logThis.call(42);
logThis.apply(42);
logThis.apply(42, [1, 2, 3]);
logThis(1, 2, 3)
logThis.call(42, 1, 2, 3);

const fu = logThis.bind(45);
fu();


const mee = {
  name: 'Serge',
  whoAmI() {
    console.log(this.name)
  }
}

const notMee = {
  name: 'not Serge'
};

me.whoAmI.call(notMee);
