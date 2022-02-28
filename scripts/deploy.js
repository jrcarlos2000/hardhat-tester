const fs = require('fs');

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("deploying contract with address : ", deployer.address);

    const balance = await deployer.getBalance();
    console.log(`Balance of deployer is ${balance.toString()}`);

    const Contract = await ethers.getContractFactory('Vault');
    const contract = await Contract.deploy();
    //const contract = await Contract.deploy([]) .... pass params into brackets

    console.log('contract deployed succesfully with address : ',contract.address);

    const data = {
        address : contract.address,
        abi : JSON.parse(contract.interface.format('json'))
    }

    fs.writeFileSync('src/Vault.json', JSON.stringify(data));
}

main()
    .then(()=> process.exit(0))
    .catch(e => {
        console.log(e);
        process.exit(1);
    });