import { Injectable, signal } from '@angular/core';
import { pstServices, pstServicesFirebase } from '../interfaces/pst-service.interface';
import { FilterEnum } from '../interfaces/enums/filter.enum';

@Injectable({
  providedIn: 'root'
})
export class PstContractService {
  pstServicesSig = signal<pstServicesFirebase[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);  

  constructor() { }

  changeFilter(filterName: FilterEnum): void {
    this.filterSig.set(filterName);
  }

  addPst(newPstService: pstServices, newId: string): void {
    const pstService: pstServicesFirebase = {
      id: newId,
      title: newPstService.title,
      hostName: newPstService.hostName,
      price: newPstService.price,
      isPublished: newPstService.isPublished,
      imgSrc: ''
    }
    this.pstServicesSig.update((psts => [... psts, pstService]))
  }

  updatePst(updatedPstService: pstServicesFirebase): void {
    this.pstServicesSig.update((psts) =>
      psts.map((pst) => (pst.id === updatedPstService.id ? { ...pst, pst } : pst))
    );
  }

  removePst(id: string): void {
    this.pstServicesSig.update((psts) => psts.filter((pst) => pst.id !== id));
  }

  toggleTodo(id: string): void {
    this.pstServicesSig.update((psts) =>
      psts.map((pst) =>
        pst.id === id ? { ...pst, isCompleted: !pst.isPublished } : pst
      )
    );
  }

  toggleAll(isPublished: boolean): void {
    this.pstServicesSig.update((psts) =>
      psts.map((pst) => ({ ...pst, isPublished }))
    );
  }
}