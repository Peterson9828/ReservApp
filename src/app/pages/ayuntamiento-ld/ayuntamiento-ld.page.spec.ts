import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AyuntamientoLDPage } from './ayuntamiento-ld.page';

describe('AyuntamientoLDPage', () => {
  let component: AyuntamientoLDPage;
  let fixture: ComponentFixture<AyuntamientoLDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyuntamientoLDPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AyuntamientoLDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
