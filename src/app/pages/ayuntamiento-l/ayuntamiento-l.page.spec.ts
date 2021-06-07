import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AyuntamientoLPage } from './ayuntamiento-l.page';

describe('AyuntamientoLPage', () => {
  let component: AyuntamientoLPage;
  let fixture: ComponentFixture<AyuntamientoLPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyuntamientoLPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AyuntamientoLPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
