import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AyuntamientosPage } from './ayuntamientos.page';

describe('AyuntamientosPage', () => {
  let component: AyuntamientosPage;
  let fixture: ComponentFixture<AyuntamientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyuntamientosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AyuntamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
