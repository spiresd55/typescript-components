import {BasicComponent} from "./componentsV2/BasicComponent";
import {BasicComponent2} from "./componentsV2/BasicComponent2";
import {AppBootstrap} from "./lib/AppBootstrap";

//import {LineGraph} from "./graph/line/LineGraph";

//Implement Custom Components
//customElements.define('test-component', TestComponent);
console.log("Initializing Components");
//let test = new TestComponent(); //TODO: AUTO GENERATE THIS
//let componentRegistry = ComponentRegistry.getInstance();
//componentRegistry.addComponent("child-component", ChildTestComponent);
//componentRegistry.addComponent("test-component", TestComponent);
//componentRegistry.addComponent("basic-component", BasicComponent);
//componentRegistry.addComponent("basic-component2", BasicComponent2);

//Initialize the app
let app = AppBootstrap.getInstance()
app.initialize();

//Register components
//TODO: Figure out how to remove first param
app.componentRegistry.addComponent("test", BasicComponent);
app.componentRegistry.addComponent("test2", BasicComponent2);

//componentRegistry.initialize();
