import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PstContractService } from 'src/app/contract/pst-contract.service';
import { PstService } from 'src/app/services/pst.service';
import { pstServices, pstServicesFirebase } from 'src/app/interfaces/pst-service.interface'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
})
export class AppTooltipsComponent {
  //  disabled
  disabled = new FormControl(false);

  // show and hide
  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  // change message
  ServiceName = new FormControl('');
  HostName = new FormControl('');
  Price = new FormControl(0);
  isPublished = new FormControl(false);

  selectedFile: File | null = null;

  constructor(private pstService: PstService, private pstContractService: PstContractService,
    private router: Router, 
  ){}

  addPst(): void{
    const newPst = {      
      title: this.ServiceName.value,
      hostName: this.HostName.value,
      price: this.Price.value,
      isPublished: this.isPublished.value      
     } as pstServices;
      //console.log(newPst);
    this.pstService.addPst(newPst).subscribe((addedPstId)=>{
      this.pstContractService.addPst(newPst, addedPstId);
      if(addedPstId != null || addedPstId != undefined )
        {
          this.router.navigate(['/pst-services']);
        }
      // this.ServiceName.setValue('');
      // this.HostName.setValue('');
      // this.Price.setValue(0);
      // this.isPublished.setValue(false);
    })    
  }

  //Carga de archivo
  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //   }
  // }
}