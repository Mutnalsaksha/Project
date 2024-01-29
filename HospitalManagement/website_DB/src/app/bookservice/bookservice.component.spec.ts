import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookserviceComponent } from './bookservice.component';

describe('BookserviceComponent', () => {
  let component: BookserviceComponent;
  let fixture: ComponentFixture<BookserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookserviceComponent]
    });
    fixture = TestBed.createComponent(BookserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
