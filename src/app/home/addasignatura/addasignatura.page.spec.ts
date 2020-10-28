import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddasignaturaPage } from './addasignatura.page';

describe('AddasignaturaPage', () => {
  let component: AddasignaturaPage;
  let fixture: ComponentFixture<AddasignaturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddasignaturaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddasignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
