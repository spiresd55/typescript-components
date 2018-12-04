export abstract class Component {
    private tagName: string;
    private html: string;
    private css: string;
    private attrs: string;
    private componentClass: any;

    protected constructor(
        private _tagName: string,
        private _html: string,
        private _css: string,
        private _attrs: string,
        private _componentClass: any
    ) {
        this.tagName = _tagName;
        this.html = _html;
        this.css = _css;
        this.attrs = _attrs;
        this.componentClass = _componentClass;
    }

    abstract mount();
    abstract unmount();
    abstract update();
}