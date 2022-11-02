import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostListComponent } from './post-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent, NewPostFormStubComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Title Input', () => {
    it("should have the default value as 'Lists'", () => {
      expect(component.title).toBe('List');
    });

    it('Should be printed in DON into H2 tag', () => {
      const element: HTMLElement = fixture.debugElement.query(
        By.css('h2')
      ).nativeElement;

      expect(element.innerText).toBe('List');
    });

    it('Should be printed in DOM into H2 tag with custom string', () => {
      const newTitle = 'Lista de posts';
      component.title = newTitle;
      fixture.detectChanges();

      const element: HTMLElement = fixture.debugElement.query(
        By.css('h2')
      ).nativeElement;

      expect(element.innerText).toBe(newTitle);
    });
  });

  describe('Data Input', () => {
    describe('When there are not elements', () => {
      it('should have the default value as emty array', () => {
        expect(component.data).toEqual([]);
      });

      it('Should be printed in DOM "There are no posts load"', () => {
        const element: HTMLElement = fixture.debugElement.query(
          By.css('h3')
        ).nativeElement;

        expect(element.innerText).toBe('There are no posts load');
      });

      it('and click on "Create new post" showAddPostModal value must change', () => {
        const pElement: DebugElement = fixture.debugElement.query(By.css('p'));

        expect(component.showAddPostModal).toBeFalse();
        pElement.triggerEventHandler('click', null);
        expect(component.showAddPostModal).toBeTrue();
      });
    });

    describe('When there are some elements', () => {
      const data = [
        {
          title: 'post01',
          body: 'post',
          author: {
            id: 'asdasd',
            name: 'Lucho',
            email: 'a@asd',
          },
          isHide: false,
          commentsDisabled: false,
          id: 'ID1',
        },
        {
          title: 'post02',
          body: 'post',
          id: 'ID2',
          author: {
            id: 'asdasd',
            name: 'Lucho',
            email: 'a@asd',
          },
          isHide: false,
          commentsDisabled: false,
        },
      ];

      it('Should be printed in DOM a table', () => {
        component.data = data;
        fixture.detectChanges();

        const element: HTMLElement = fixture.debugElement.query(
          By.css('table')
        ).nativeElement;

        expect(element).toBeTruthy();
      });

      it('Should be printed in the table a row for each data elemet', () => {
        component.data = data;
        fixture.detectChanges();

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(
          By.css('tbody tr')
        );

        expect(debugElements).toHaveSize(component.data.length);
      });

      it('Should be have a link to its post details', () => {
        component.data = data;
        fixture.detectChanges();

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(
          By.directive(RouterLinkWithHref)
        );

        debugElements.forEach((element, i) => {
          expect(element.nativeElement.attributes.href.value).toContain(
            `/posts/${data[i].id}`
          );
        });
      });
    });
  });
});

@Component({
  selector: 'app-new-post-form',
  template: '',
})
class NewPostFormStubComponent {}
