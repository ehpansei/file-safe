import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesPage } from '@pages-module/pages.page';
import { AuthGuard } from '@infrastructure-module/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import(
        './business-modules/authentication-module/authentication.module'
      ).then((mod) => mod.AuthenticationModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: PagesPage,
    loadChildren: () =>
      import('./business-modules/pages-module/pages.module').then(
        (mod) => mod.PagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
