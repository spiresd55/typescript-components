import {IdGenerator} from "../util/IdGenerator";
import "reflect-metadata";

export class DecorationHelper {
  static ensureComponentId(target: any) {
    if(!target.componentId) {
      target.componentId = IdGenerator.generateRandomId();
      //Allows metadata to reflect
      (Reflect as any).defineMetadata("componentId",
      {'id': target.componentId}, target.constructor);
    }
  }
}
