import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AyuntamientoLDDPage } from './ayuntamiento-ldd.page';

describe('AyuntamientoLDDPage', () => {
  let component: AyuntamientoLDDPage;
  let fixture: ComponentFixture<AyuntamientoLDDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyuntamientoLDDPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AyuntamientoLDDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
