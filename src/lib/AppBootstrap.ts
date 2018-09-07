import {ComponentRegistry} from "./ComponentRegistry";

export class AppBootstrap {
  private static instance: AppBootstrap;
  public componentRegistry: ComponentRegistry;

  constructor() {}

  static getInstance() {
    if(!AppBootstrap.instance) {
      AppBootstrap.instance = new AppBootstrap();
    }
    return AppBootstrap.instance;
  }

  public initialize() {
    this.componentRegistry = ComponentRegistry.getInstance();
  }
}
