import { http } from '@/http';

export default class PostServices {
  static async getPosts(currentPage: number = 1, limitPages: number = 10) {
    const params = {
      _page: currentPage,
      _limit: limitPages,
    };

    return http.get('/posts', {
      params,
    });
  }

  static async getAuthors() {
    return http.get('/users');
  }

  static async getOnePost(id: string) {
    return http.get('/posts/' + id);
  }
}
