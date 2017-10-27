  class Property {
    id: number;
    label: string;
    value: string;
    container_id?: number;
    constructor(_?){
      if(_){
        this.id = _.id;
        this.label = _.label;
        this.value = _.value;
        this.container_id = _.container_id;
      }
    }
  }

  class Container extends Property{
    container_id?: number;
    title?: Property;
    main?: Property[];
  }


// export class LabelsData {
//   initialLabel: string;
//   list: string[];
//   tryLabel:string;
// }

export {Property, Container}
