// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PlayerBook {

  uint public totalSupply = 200000000 * 10 ** 8;
  string public name = 'PlayerCoin';
  string public symbol = 'PLC';
  string public originalAddress = 'https://playerbook.com.br';
  uint public decimals = 8;

  event Transfer(address indexed from, address indexed to, uint value);
  event Approval(address indexed owner, address indexed spender, uint value);

  constructor() {
    balances[msg.sender] = totalSupply;
  }

  uint private amount;
  address private owner;

  bool public allowed;
  uint[] users_id;
  
  mapping(address => uint) balances;
  mapping(address => mapping(address => uint)) public allowance;

  function getAmmount() external view returns(uint) {
    return amount;
  }

  function setAmmount(uint _amount ) external {
    amount = _amount ;
  }

  function balanceOf(address _owner) public view returns (uint) {
    return balances[_owner];
  }

  function transfer(address to, uint value ) public returns (bool) {
    require(balanceOf(msg.sender) >= value, 'balance too low');
    balances[to] += value;
    balances[msg.sender] -= value;
    emit Transfer(msg.sender, to, value);
    return true;
  }

  function transferFrom(address from, address to, uint value) public returns (bool) {
    require(balanceOf(from) >= value, 'balance too low');
    require(allowance[from][msg.sender] >= value, 'allowance too low');
    balances[to] += value;
    balances[from] -= value;
    emit Transfer(from, to, value);
    return true;
  }

  function approve(address spender, uint value) public returns(bool) {
    allowance[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
    return true;
  }
  
}
