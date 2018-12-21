import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './pages/input/input.component';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';

const routes: Routes = [
  { path: 'input', component: InputComponent },
  { path: 'accessibility', component: AccessibilityComponent },
  { path: '', pathMatch: 'full', redirectTo: 'accessibility' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
