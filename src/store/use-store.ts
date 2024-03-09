import { defineStore } from 'pinia';
import PostServices from '../servises/PostServices';
import { type Post } from '../types/index';

interface State {
  pages: number;
  currentPage: number;
  isLoading: boolean;
  searchQuery: string;
  limitPages: number;
  posts: Post[];
  authors: Post[];
  isLightTheme: boolean;
}

export default defineStore('store', {
  state: (): State => ({
    limitPages: 10,
    pages: 1,
    currentPage: 1,
    posts: [],
    authors: [],
    isLightTheme: false,
    isLoading: false,
    searchQuery: '',
  }),
  getters: {
    concatArray: (state) => {
      const arrayWidthName = state.posts.map((post) => {
        const author = state.authors.find(
          (authorArg) => post.userId === authorArg.id,
        );

        if (author) {
          return {
            ...post,
            authorName: author.name,
          };
        }
      });

      return arrayWidthName;
    },
  },
  actions: {
    setSearchQuery(value: string) {
      this.searchQuery = value;
    },
    async fetchPosts() {
      try {
        const response = await PostServices.getPosts(
          this.currentPage,
          this.limitPages,
        );
        this.posts = [...response.data];

        this.pages = Math.ceil(
          +response.headers['x-total-count'] / this.limitPages,
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async getAuthorsAndPosts() {
      try {
        this.isLoading = true;
        const [posts, authors] = await Promise.all([
          PostServices.getPosts(this.currentPage, this.limitPages),
          PostServices.getAuthors(),
        ]);

        this.pages = Math.ceil(
          +posts.headers['x-total-count'] / this.limitPages,
        );

        this.posts = [...posts.data];
        this.authors = [...authors.data];

        this.isLoading = false;
      } catch (e) {
        console.error(e);
      }
    },

    setPage(currentPage: number) {
      this.currentPage = currentPage;
    },
    setFirstPage() {
      this.currentPage = 1;
    },
    setLastPage() {
      this.currentPage = this.pages;
    },
    incrementPage() {
      if (this.currentPage === this.pages) return;
      this.currentPage += 1;
    },
    decrementPage() {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage -= 1;
    },
    changeTheme() {
      this.isLightTheme = !this.isLightTheme;
      document.querySelector('body')?.classList.toggle('light-theme');
    },
    setTheme() {
      document.querySelector('body')?.classList.toggle('light-theme');
    },
  },
});
