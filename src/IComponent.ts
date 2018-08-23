export interface IComponent { //All components in this project need to implement this
    //render(): void; //Function to attach html to shadowdom
    render: () => void;
    //render: any; //TODO: make function interface
    //connectedCallback: () => void; //This is where render needs to run
    template: string;
    //selector: string; // Selector for component
    initializeComponent: (name: string) => void; //Used in base classes to initialize component
}
