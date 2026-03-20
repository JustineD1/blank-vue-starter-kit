import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/login.vue'; // Adjust paths based on your folder structure
import CreateUser from '../components/Createuser.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/create',
    name: 'CreateUser',
    component: CreateUser
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;