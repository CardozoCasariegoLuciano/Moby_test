import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Post } from '../interfaces/posts.interface';
import { PostService } from './post.service';

describe('ProfileService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: true },
        { provide: AngularFirestore, useValue: true },
      ],
    });
    service = TestBed.inject(PostService);
  });

  const user = [
    {
      id: 'userID001',
      name: 'Lucho',
      email: 'a@asd',
    },
    {
      id: 'userID002',
      name: 'Cornelio',
      email: 'c@asd',
    },
  ];

  const data: Post[] = [
    {
      title: 'post01',
      body: 'post',
      author: user[0],
      isHide: false,
      commentsDisabled: false,
      id: 'ID1',
    },
    {
      title: 'post01',
      body: 'post',
      author: user[0],
      isHide: false,
      commentsDisabled: false,
      id: 'ID2',
    },
    {
      title: 'post02',
      body: 'post',
      id: 'ID3',
      author: user[1],
      isHide: false,
      commentsDisabled: false,
    },
  ];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPosts() should retrn an Observable of Post[]', () => {
    spyOn(service, 'getPosts').and.returnValue(of(data));

    service.getPosts().subscribe((val) => {
      expect(val).toEqual(data);
      expect(val).toHaveSize(data.length);
    });
  });

  it('getPostsByUserID(userID) should return an Observable of Post[]', () => {
    const userPosts = [data[0], data[1]];
    spyOn(service, 'getPostsByUserID').and.returnValue(of(userPosts));

    service.getPostsByUserID(user[0].id).subscribe((val) => {
      expect(val).toEqual(userPosts);
      val.forEach((post) => {
        expect(post.author.id).toBe(user[0].id);
      });
    });
  });

  it('getPostByID(postID) should return an Observable of Post', () => {
    spyOn(service, 'getPostByID').and.returnValue(of(data[2]));

    service.getPostByID(data[2].id!).subscribe((val) => {
      expect(val.id).toBe(data[2].id);
    });
  });
});
