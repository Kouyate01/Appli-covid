import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MesurePage } from './mesure.page';

describe('MesurePage', () => {
  let component: MesurePage;
  let fixture: ComponentFixture<MesurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MesurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
