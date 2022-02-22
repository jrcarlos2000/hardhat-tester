const { expect } = require ("chai");
const { ethers, waffle } = require ('hardhat');
const { BigNumber } = require ("ethers");
const provider = waffle.provider;

describe('Lottery contract', () => {
    let Lottery, lottery, owner, addr1, addr2;

    beforeEach(async ()=>{
        Lottery = await ethers.getContractFactory('Lottery');
        lottery  = await Lottery.deploy();

        [owner, addr1, addr2, _] = await ethers.getSigners();

        // console.log(owner,addr2,addr1);
    })

    it('Contract deployed',() => {
        expect(lottery.address).to.exist;
    })

    it('Manager is right', async () => {
        expect(await lottery.manager()).to.equal(owner.address);
    })

    it('Allows account to enter', async ()=>{
        await lottery.enter({value : ethers.utils.parseEther('0.5')});
        const playerList = await lottery.getPlayers();
        expect(playerList[0]).to.equal(owner.address);
    })

    it('Allows multiple accounts to enter', async () => {
        await lottery.enter({value : ethers.utils.parseEther('0.5')});
        await lottery.connect(addr1).enter({value : ethers.utils.parseEther('0.5')});

        const playerList = await lottery.getPlayers();
        expect(playerList[0]).to.equal(owner.address);
        expect(playerList[1]).to.equal(addr1.address);
    })

    it('Fails to add user with low betting amount', async ()=> {
        await expect (
            lottery.connect(addr2).
            enter({value : ethers.utils.parseEther('0.005')})
        ).to
         .be
         .revertedWith('not enough money');
        
    })
    it('only manager can pick winner', async () => {
        await expect (
            lottery.connect(addr1)
            .pickWinner()
        ).to
         .be
         .revertedWith('not manager');
    })

    it('money sent to winner, list empty', async()=>{

        await lottery.connect(addr1).enter({value: ethers.utils.parseEther('2')});

        const balanceIn = await provider.getBalance(addr1.address);

        await lottery.pickWinner();

        const balanceOut = await provider.getBalance(addr1.address);

        expect(balanceOut.sub(balanceIn).gt(ethers.utils.parseEther('1.8')));

    })
    
})