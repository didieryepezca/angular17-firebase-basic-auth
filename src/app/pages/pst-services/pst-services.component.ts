import { Component, OnInit, computed } from '@angular/core';
import { PstContractService } from 'src/app/contract/pst-contract.service';
import { FilterEnum } from 'src/app/interfaces/enums/filter.enum';
import { pstServicesFirebase } from 'src/app/interfaces/pst-service.interface';
import { PstService } from 'src/app/services/pst.service';

@Component({
  selector: 'app-pst-services', 
  templateUrl: './pst-services.component.html',
  styleUrl: './pst-services.component.scss'
})
export class PstServicesComponent implements OnInit {
  pstsArray: pstServicesFirebase[] = [];
  filterEnum = FilterEnum;
  
  constructor(
    private pstService: PstService,
    public pstServiceContract: PstContractService
  ){}

  ngOnInit(): void {
    this.listPsts();       
  }

  listPsts(){
    this.pstService.getPsts().subscribe(psts=>{      
      this.pstsArray = psts;
      this.pstsArray.forEach(pst => {
        pst.imgSrc = '/assets/images/products/p2.jpg'
      });
      this.pstServiceContract.pstServicesSig.set(this.pstsArray);
      //console.log(this.pstsArray);
    }) 
  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.pstServiceContract.changeFilter(filterName);    
  }

  visiblePsts = computed(()=> {
    const psts = this.pstServiceContract.pstServicesSig();
    const filter = this.pstServiceContract.filterSig();

    if (filter === FilterEnum.noPublished) {
      return psts.filter((pst) => !pst.isPublished);
    } else if (filter === FilterEnum.published) {
      return psts.filter((pst) => pst.isPublished);
    }
    return psts;
  })

  totalCount = computed(() => {
    return this.pstServiceContract.pstServicesSig().length;
  });

  // isAllTodosSelected = computed(() =>
  //   this.pstServiceContract.pstServicesSig().every((pst) => pst.isPublished)
  // );

  // noTodosClass = computed(() => this.pstServiceContract.pstServicesSig().length === 0); 

}