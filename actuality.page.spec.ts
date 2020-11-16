import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualityPage } from './actuality.page';

describe('ActualityPage', () => {
  let component: ActualityPage;
  let fixture: ComponentFixture<ActualityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
