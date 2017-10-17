import { Component, Input, OnInit }    from '@angular/core';
import { ContainerService }            from '../_core/container.service';

@Component ({
  moduleId: module.id,
  selector: 'tree-view',
  template: `
    <ul>
      <li *ngFor="let item of treeData; let idx = index">
        <span (click)="select(item, 'forward')">{{item.value}}</span>
        <tree-view *ngIf="item?.list" [treeData]="item?.list"></tree-view>
      </li>
    </ul>
  `,
  providers: [ContainerService]
})
export class TreeViewComponent {
  @Input() treeData: any;
  path = []; // path of selected container, exept the last list
  itret = 0; // rectract function iterator
  itsort = 0; // sort function iterator
  maxlevel = 0; // component iterator for the last level of the last list
  itgetlev = 0; // getlevel function iterator
  contlev: any; // the selected container level found in getlevel function
  // test = [
  //   {container_id: 111, title_id:112, value:'hello'},
  //   {container_id: 111, title_id:112, value:'hello'},
  //   {container_id: 111, title_id:112, value:'hello'},
  //   {list: [
  //     {container_id: 111, title_id:112, value:'hel'},
  //     {list: [
  //       {container_id: 111, title_id:112, value:'h'},
  //       {container_id: 111, title_id:112, value:'h'},
  //       {container_id: 111, title_id:112, value:'h'}
  //     ]},
  //     {container_id: 111, title_id:112, value:'hel'}
  //   ]},
  //   {container_id: 111, title_id:112, value:'hello'}
  // ];
  constructor(
    private cs: ContainerService
  ){
    // this.treeData = this.test
  }

  ngOnInit(){
    // Since the treeData variable is already set by the note component
    // the current maxlevel must set to 1
    this.maxlevel = 1;
  }

  // Add sublist to treeData
  addsub = (array, sub, container)=>{
    return new Promise((reso, rej)=>{
      this.itsort++;
      this.maxlevel++;
      let j = 0;
      return array.map(x => {
        j++;
        if(x.list){
          return this.addsub(x.list, sub, container);
        }else if (x.container_id == container.container_id){
          array.splice(j--, 0, {list: sub});
        }
      })
    })
  };

  // Remove the older and different branch
  retract = (array, lv)=> {
    return new Promise((resolve, rej)=>{
      this.itret++;
      let it = 0; // promise iterator
      array.map(x => {
        it++;
        if(x.list){
          // if(x.list[0].l == lv +1){
          if(this.itret == lv){
            array.splice(it-1, 1)
            return;
          }else {
            return this.retract(x.list, lv);
          }
        }
      })
      resolve(array)
    })
  }

  // This function allow to get the hierarchical level of the selected
  // container for the rectract function
  getlevel = (array, container)=>{
    return new Promise( (resolve, rej)=>{
      this.itgetlev++;
      let idx;
      array.map(x => {
        if(x.container_id == container.container_id){
          this.contlev = this.itgetlev;
          resolve()
        }else if(x.list){
          idx = array.indexOf(x);
        }
      })
      if(this.contlev > 0){
        resolve();
      }else if(idx){
        this.getlevel(array[idx].list, container).then( ()=>{
          resolve();
        });
      }else{
        resolve() ;
      }

    })
  }

  // Remove older branch compared to the selected container
  definepath(){
    this.path.filter(x => {
      return x.level < this.contlev;
    });
  };

  select(container, direction){
    // Avoid to select the same data if clicking on the previous container
    if(this.path.length && this.path[this.path.length -1].container_id == container.container_id){
      return;
    }
    // Return sub list of a container if exist
    this.cs.containers(container.container_id)
    .subscribe(res => {
      // set to contlev variable the level of the selected conainer
      this.getlevel(this.treeData, container)
      .then(()=>{

        // launch the retract function if the arboresence level of the
        // selected container is higher than the deep level on the
        // treeData global list
        if(this.contlev < this.maxlevel){
          this.retract(this.treeData, this.contlev);
          this.itret = 0;
        };
        // clean path
        this.definepath();

        container.level = this.contlev
        this.path.push(container);

        // Add sub container list if the api result is not empty
        if(res.response.status != 204) {
          this.addsub(this.treeData, res.data.data, container)
          this.contlev = 0;
          this.itgetlev = 0;
        }

      });

    }, err => {
      console.log(err);
    })
  }

}