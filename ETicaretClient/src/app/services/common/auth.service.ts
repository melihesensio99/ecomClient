import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");

    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }

  get isAdmin(): boolean {
    if (!this.isAuthenticated) return false;
    const token: string = localStorage.getItem("accessToken");
    if (!token) return false;
    const decodeToken = this.jwtHelper.decodeToken(token);
    const roles: string[] = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodeToken["role"];
    const userName = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decodeToken["name"];

    if (userName === "gokalaf12") return true; // Super Admin

    if (roles) {
      if (Array.isArray(roles)) {
        return roles.includes("Admin");
      } else {
        return roles === "Admin";
      }
    }

    return false;
  }

  get currentUserName(): string {
    const token: string = localStorage.getItem("accessToken");
    if (!token) return "";
    const decodeToken = this.jwtHelper.decodeToken(token);
    return decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decodeToken["name"];
  }
}

export let _isAuthenticated: boolean;
