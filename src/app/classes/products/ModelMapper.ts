
export class ModelMapper<T> {
  // tslint:disable-next-line:variable-name
  _propertyMapping: any;
  _target: any;
  constructor(type: { new(): T ;}){
    this._target = new type();
    this._propertyMapping = this._target.constructor._propertyMap;
  }

  map(source: { [x: string]: any; }){
    Object.keys(this._target).forEach((key) => {
      const mappedKey = this._propertyMapping[key]
      if(mappedKey){
        this._target[key] = source[mappedKey];
      }
      else {
        this._target[key] = source[key];
      }
    });
    Object.keys(source).forEach((key)=>{
      const targetKeys = Object.keys(this._target);
      if(targetKeys.indexOf(key) === -1){
        this._target[key] = source[key];
      }
    });
    return this._target;
  }
}
