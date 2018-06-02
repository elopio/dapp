pragma solidity ^0.4.21;

import { Jurisdiction } from "./tpl-contracts/Jurisdiction.sol";
import { TransactionChecker } from "./tpl-contracts/checks/TransactionChecker.sol";


contract DummyValidator is TransactionChecker {

  Jurisdiction jurisdiction;

  function DummyValidator(Jurisdiction _jurisdiction)
    TransactionChecker(_jurisdiction)
    public
  {
    jurisdiction = _jurisdiction;
  }

  function validate() public {
    jurisdiction.addAttribute(msg.sender, "VALID", 1);
  }

  function transferAllowed(
    address _from,
    address _to,
    uint256 _value
  )
    public
    view
    returns (bool)
  {
    return registry.hasAttribute(_to, "VALID");
  }

}
