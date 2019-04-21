import { Automator } from "./automator";
import { Resource } from "../resource/resource";

export class RobotAutomator extends Automator {
  constructor(public robot: Resource) {
    super(robot.id + "R");
    this.name = "Buy " + robot.name;
    this.resource = robot;
    this.stopWhenFactoryUi = true;
  }
  execCondition(): boolean {
    return !this.robot.isCapped;
  }
  doAction(): boolean {
    const maxBuy = this.robot.buyAction.multiPrice.getMaxBuy(
      this.robot.buyAction.quantity,
      this.resourcePercentToUse
    );

    return maxBuy.lt(1) ? false : this.robot.buyAction.buy(new Decimal(1));
  }
}
