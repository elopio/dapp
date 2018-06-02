pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import { TransactionChecker } from "./tpl-contracts/checks/TransactionChecker.sol";
import { TPLToken } from "./tpl-contracts/TPLToken.sol";


/**
 * @title SampleToken
 * @dev Mintable ERC20 Token.
 */
contract SampleToken is TPLToken, MintableToken {

  string public constant name = "SampleToken";  // solium-disable-line uppercase
  string public constant symbol = "TPL";  // solium-disable-line uppercase
  uint8 public constant decimals = 18;  // solium-disable-line uppercase

  function SampleToken(TransactionChecker _validator)
    TPLToken(_validator)
    public
  {
    totalSupply_ = 0;
  }

  function mint(address _to, uint256 _amount)
    onlyOwner
    canMint
    public
    returns (bool)
  {
    require(validator.transferAllowed(msg.sender, _to, _amount));
    return super.mint(_to, _amount);
  }

}
