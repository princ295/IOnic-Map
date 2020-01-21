import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaxiPage } from './taxi.page';

describe('TaxiPage', () => {
  let component: TaxiPage;
  let fixture: ComponentFixture<TaxiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
