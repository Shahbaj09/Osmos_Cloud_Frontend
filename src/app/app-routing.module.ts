import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNames } from './@constants/route-names';
import { AuthGuard } from './@services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/singup/singup.module').then(m => m.SingupModule),
    pathMatch: 'full'
  },
  {
    path: RouteNames.signup,
    loadChildren: () => import('./pages/singup/singup.module').then(m => m.SingupModule)
  },
  {
    path: RouteNames.login,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: RouteNames.verifyEmail,
    loadChildren: () => import('./pages/verify-email/verify-email.module').then(m => m.VerifyEmailModule)
  },
  {
    path: RouteNames.recoverPassword,
    loadChildren: () => import('./pages/recover-password/recover-password.module').then(m => m.RecoverPasswordModule)
  },
  {
    path: RouteNames.home,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
