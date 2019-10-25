import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ShareId } from "../models";

@Injectable()
export class CommunicationService {

    private actionSource = new Subject<ShareId>();

    // Observable string streams
    contentChanged$ = this.actionSource.asObservable();

    OnContentChanged(shareId: ShareId) {
        this.actionSource.next(shareId)
    }
}