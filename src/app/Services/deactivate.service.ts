import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


export interface IdeactivateComponent{
    canexit :() =>Observable<boolean>| Promise <boolean>| boolean;
}

export class DeactivateService implements CanDeactivate<IdeactivateComponent>
{
    canDeactivate(component: IdeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canexit();
    }
    
}