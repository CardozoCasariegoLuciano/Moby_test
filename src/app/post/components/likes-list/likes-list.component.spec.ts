import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LikesListComponent } from './likes-list.component';

describe('LikesListComponent', () => {
  let component: LikesListComponent;
  let fixture: ComponentFixture<LikesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikesListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const likes = [
    {
      id: '001',
      userName: 'Rolo01',
      photo: '',
    },
    {
      id: '002',
      userName: 'Rolo02',
      photo: 'rolopic',
    },
  ];

  describe('Likes Input', () => {
    it('Should print in the DOM the same quantity of user as likes', () => {
      component.likes = likes;
      fixture.detectChanges();

      const userlikes: DebugElement[] = fixture.debugElement.queryAll(
        By.css('.userLike')
      );

      expect(userlikes).toHaveSize(likes.length);
    });

    it('Should print in the DOM the userName', () => {
      component.likes = likes;
      fixture.detectChanges();

      const userNames: DebugElement[] = fixture.debugElement.queryAll(
        By.css('.userLike p')
      );

      userNames.forEach((user, i) => {
        expect(user.nativeElement.innerText).toBe(likes[i].userName);
      });
    });
  });

  describe('Methods', () => {
    it('Should return the user photo URL => getImage(like: ShortUser)', () => {
      const firtsUserIMG = component.getImage(likes[0]);
      const secondUserIMG = component.getImage(likes[1]);

      expect(firtsUserIMG).toBe('../../../../assets/images/defaultUser.png');
      expect(secondUserIMG).toBe('rolopic');
    });
  });
});
