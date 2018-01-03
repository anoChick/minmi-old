import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSegmentComponent } from './post-segment.component';

describe('PostSegmentComponent', () => {
  let component: PostSegmentComponent;
  let fixture: ComponentFixture<PostSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
