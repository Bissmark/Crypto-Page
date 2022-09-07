const { Block, Blockchain } = require('./Block.js');

const CeegeChain = new Blockchain();
CeegeChain.addBlock(new Block(Date.now().toString(), { from: "Quant", to: "CJ", amount: 100 }));
console.log(CeegeChain.chain);