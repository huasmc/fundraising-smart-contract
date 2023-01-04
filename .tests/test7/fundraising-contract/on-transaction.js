const { addTransaction, updateContractState } = (await import('./blockchain-helpers.js'));

const contractState = JSON.parse(process.env.CONTRACT_STATE);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const creatorAddress = process.env.CREATOR_ADDRESS;
const transaction = JSON.parse(process.env.TRANSACTION);
// Add your code below

console.log(transaction);
// Put transaction in state
contractState.transactions.push(transaction);
// Add funds to raised
contractState.raised += transaction.amount;

updateContractState(contractAddress, contractState);
// If there's  150 - send funds to contract creator
if (contractState.raised >= 150) {
    addTransaction(privateKey, creatorAddress, contractState.raised)
    contractState.status = "closed";
    updateContractState(contractAddress, contractState);
}