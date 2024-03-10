import { defineStore } from 'pinia';
import PostServices from '../servises/PostServices';
import { type Post, type Author } from '../types/index';

interface State {
  pages: number;
  currentPage: number;
  isLoading: boolean;
  searchQuery: string;
  limitPages: number;
  posts: Post[];
  authors: Author[];
  isLightTheme: boolean;
  onePost: Post | null;
}

export default defineStore('store', {
  state: (): State => ({
    limitPages: 9,
    pages: 1,
    currentPage: 1,
    posts: [],
    authors: [],
    isLightTheme: false,
    isLoading: false,
    searchQuery: '',
    onePost: null,
  }),
  getters: {
    postsAndAuthors(state) {
      return state.posts.map((post) => {
        const findAuthor = state.authors.find(
          (authorArg) => post.userId === authorArg.id,
        );

        if (!findAuthor) return;

        return {
          ...post,
          authorName: findAuthor.name,
        };
      });
    },
    filtredPosts(state): Post[] {
      return this.postsAndAuthors.filter(
        (item) =>
          item?.authorName
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()),
      );
    },
  },
  actions: {
    setSearchQuery(value: string) {
      this.searchQuery = value;
    },
    async fetchPosts() {
      try {
        this.isLoading = true;

        const response = await PostServices.getPosts(
          this.currentPage,
          this.limitPages,
        );
        this.posts = [...response.data];

        this.pages = Math.ceil(
          +response.headers['x-total-count'] / this.limitPages,
        );

        this.isLoading = false;
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

    async getOnePost(id: string) {
      try {
        this.isLoading = true;
        const response = await PostServices.getOnePost(id);
        this.onePost = { ...response.data };
        this.isLoading = false;
      } catch (e) {
        console.log(e);
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
  },
});
