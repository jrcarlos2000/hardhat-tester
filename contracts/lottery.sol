//paste contract BELOW
pragma solidity 0.6.12;
import 'hardhat/console.sol';
contract Lottery {
    address public manager;
    address[] public players ;
    
    constructor ()  public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        // console.log('user is entering the lottery');
        require(msg.value > .01 ether, 'not enough money');
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return (uint256(keccak256(abi.encodePacked(block.coinbase))));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager, 'not manager');
        _;
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}   