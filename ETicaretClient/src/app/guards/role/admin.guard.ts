import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AuthService } from '../../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallAtom);

    if (!this.authService.isAdmin) {
      this.router.navigate(["admin"]);
      this.toastrService.message("Bu yetkili alanı sadece süper yönetici tarafından erişilebilir!", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
      this.spinner.hide(SpinnerType.BallAtom);
      return false;
    }

    this.spinner.hide(SpinnerType.BallAtom);
    return true;
  }
}
