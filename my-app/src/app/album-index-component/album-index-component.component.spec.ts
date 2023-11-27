import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumIndexComponentComponent } from './album-index-component.component';

describe('AlbumIndexComponentComponent', () => {
  let component: AlbumIndexComponentComponent;
  let fixture: ComponentFixture<AlbumIndexComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumIndexComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumIndexComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
