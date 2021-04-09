import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
      canActivate: [AutoLoginGuard]
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterPageModule),
      canActivate: [AutoLoginGuard]
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'todo', loadChildren: './pages/todo/todo.module#TodoPageModule' },
  { path: 'addtodo', loadChildren: './pages/addtodo/addtodo.module#AddtodoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
