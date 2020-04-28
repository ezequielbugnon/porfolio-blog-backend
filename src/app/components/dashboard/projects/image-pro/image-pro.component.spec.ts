import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageProComponent } from './image-pro.component';

describe('ImageProComponent', () => {
  let component: ImageProComponent;
  let fixture: ComponentFixture<ImageProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
