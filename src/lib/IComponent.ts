export interface IComponent { //All components in this project need to implement this
    render: () => void;
    template: string;
    model: any,
    element: any, //TODO: replace with element object
}
