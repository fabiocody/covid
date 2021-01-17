import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDataComponent } from './region-data.component';

describe('RegionDataComponent', () => {
  let component: RegionDataComponent;
  let fixture: ComponentFixture<RegionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
