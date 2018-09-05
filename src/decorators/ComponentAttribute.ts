export default function (target: any, property: string): any {
  let val: any;
  return{
    set: function (value: any) {
      return this.setAttribute(property, value);
    },
    get: function() {
      return this.getAttribute(property);
    },
    enumerable: true,
    configurable: true
  }
}
