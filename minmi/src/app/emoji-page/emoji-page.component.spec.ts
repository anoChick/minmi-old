import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPageComponent } from './emoji-page.component';

describe('EmojiPageComponent', () => {
  let component: EmojiPageComponent;
  let fixture: ComponentFixture<EmojiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
