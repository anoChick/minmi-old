import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditMiniComponent } from './post-edit-mini.component';

describe('PostEditMiniComponent', () => {
  let component: PostEditMiniComponent;
  let fixture: ComponentFixture<PostEditMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEditMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
