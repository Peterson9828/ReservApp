import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeportePage } from './deporte.page';

describe('DeportePage', () => {
  let component: DeportePage;
  let fixture: ComponentFixture<DeportePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeportePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
