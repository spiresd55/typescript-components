import {Component} from "./Component";
import * as riot from "riot";

// @ts-ignore
export class RiotComponent extends Component {
    constructor(private _tagName: string,
                private _html: string,
                private _css: string,
                private _attrs: string,
                private _componentClass: any) {
        //Extend Super Class
        super(_tagName, _html, _css, _attrs, _componentClass);
    }

    mount() {
        //Mount using riot
        riot.tag(this._tagName, this._html, this._css, this._attrs, this._componentClass);
    }

    unmount() {

    }

    update() {

    }

}