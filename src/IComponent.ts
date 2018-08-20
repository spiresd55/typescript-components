export interface IComponent { //All components in this project need to implement this
    render: () => void; //Function to attach html to shadowdom
    //connectedCallback: () => void; //This is where render needs to run
    template: string;
    selector: string; // Selector for component
    initializeComponent: () => void; //Used in base classes to initialize component
}
