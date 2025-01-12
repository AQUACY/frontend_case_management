import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null,
    caseDetails: [],
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserEmail: (state) => state.user?.email,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setCaseDetails(caseDetails) {
      this.caseDetails = caseDetails;
      localStorage.setItem('caseDetails', JSON.stringify(caseDetails));
    },
    loadFromLocalStorage() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const caseDetails = localStorage.getItem('caseDetails');
      if (token) this.token = token;
      if (user) this.user = JSON.parse(user);
      if (caseDetails) this.caseDetails = JSON.parse(caseDetails);
    },
    clearUserData() {
      this.token = null;
      this.user = null;
      this.caseDetails = [];
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('caseDetails');
    }
  }
});
