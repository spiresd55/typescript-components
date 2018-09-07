import {BasicComponent} from "./components/BasicComponent";
import {BasicComponent2} from "./components/BasicComponent2";
import {AppBootstrap} from "./lib/AppBootstrap";

//Initialize the app
let app = AppBootstrap.getInstance()
app.initialize();

//Register components
app.componentRegistry.addComponent(BasicComponent);
app.componentRegistry.addComponent(BasicComponent2);
