import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiaPage } from './dia.page';

describe('DiaPage', () => {
  let component: DiaPage;
  let fixture: ComponentFixture<DiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
