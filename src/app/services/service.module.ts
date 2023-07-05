import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServicesProviders } from './providers';

@NgModule({
  imports: [HttpClientModule],
  providers: [...ServicesProviders],
})
export class ServiceModule {}
