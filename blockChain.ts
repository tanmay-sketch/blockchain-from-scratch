import CryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string | null;
    public timestamp: number;
    public data: string;

    constructor(index: number, previousHash: string | null, timestamp: number, data: string) {
        this.index = index;
        this.hash = this.calculateHash();
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
    calculateHash(): string {
        return CryptoJS.SHA256(
            this.index.toString() + 
            (this.previousHash || '') + 
            this.timestamp + 
            this.data
        ).toString();
    }
}

class Blockchain {

    // newblock method has to be written
    private genesisBlock: Block = new Block(
        0, null, 1465154705, 'the genesis block!!'
    );

    private blockchain: Block[] = [this.genesisBlock];

    getLatestBlock(): Block {
        if (this.blockchain.length === 0) {
            throw new Error('No blocks in the blockchain');
        }
        // blockchain will never be empty because the genesis block is already added
        return this.blockchain[this.blockchain.length - 1]!;
    }

    generateNextBlock(blockData: string): Block {
        const previousBlock: Block = this.getLatestBlock();
        const nextIndex: number = previousBlock.index + 1;
        const nextTimestamp: number = new Date().getTime() / 1000;
        const newBlock: Block = new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData);
        return newBlock;
    }

    isValidBlockStructure(block: Block): boolean {
        return typeof block.index === 'number' && 
            typeof block.hash === 'string' && 
            typeof block.previousHash === 'string' && 
            typeof block.timestamp === 'number' && 
            typeof block.data === 'string';
    }

    isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('invalid index');
            return false;
        }
        else if (previousBlock.hash !== newBlock.previousHash) {
            console.log('invalid previousHash');
            return false;
        }
        else if (newBlock.hash !== newBlock.calculateHash()) {
            console.log('invalid hash: ' + newBlock.hash + ' ' + newBlock.calculateHash());
            return false;
        }
        else if (!this.isValidBlockStructure(newBlock)) {
            console.log('invalid block structure');
            return false;
        }
        return true;
    }
}


