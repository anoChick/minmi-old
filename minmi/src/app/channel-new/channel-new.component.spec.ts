import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelNewComponent } from './channel-new.component';

describe('ChannelNewComponent', () => {
  let component: ChannelNewComponent;
  let fixture: ComponentFixture<ChannelNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
