import { createWebHashHistory , createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import jwt_decode from "jwt-decode";
import AuthService from './services/auth.service';
// lazy-loaded
const Profile = () => import("./components/Profile.vue")

const BoardUser = () => import("./components/BoardUser.vue")

const StudentList = () => import("./components/StudentList.vue")
const StudentDetail = () => import("./components/StudentDetail.vue")
const AddStudent = () => import("./components/AddStudent.vue")
const RightsTable = () => import("./components/RightsTable.vue")
const DirectionList = () => import("./components/DirectionList.vue")
const AddDirection = () => import("./components/AddDirection.vue")
const DirectionDetail = () => import("./components/DirectionDetail.vue")
const ProfileList = () => import("./components/ProfileList.vue")
const AddProfile = () => import("./components/AddProfile.vue")
const ProfileDetail = () => import("./components/ProfileDetail.vue")

const GroupList = () => import("./components/GroupList.vue")
const AddGroup = () => import("./components/AddGroup.vue")
const GroupDetail = () => import("./components/GroupDetail.vue")

const ListenerList = () => import("./components/ListenerList.vue")
const ListenerDetail = () => import("./components/ListenerDetail.vue")
const AddListener = () => import("./components/AddListener.vue")

const PayerList = () => import("./components/PayerList.vue")
const PayerDetail = () => import("./components/PayerDetail.vue")
const AddPayer = () => import("./components/AddPayer.vue")

const ContractList = () => import("./components/ContractList.vue")
const ContractDetail = () => import("./components/ContractDetail.vue")
const AddContract = () => import("./components/AddContract.vue")



const CWList = () => import("./components/CwList.vue")

const ProgramList = () => import("./components/ProgramList.vue")
const AddProgram = () => import("./components/AddProgram.vue")
const ProgramDetail = () => import("./components/ProgramDetail.vue")

const AddPayment = () => import("./components/AddPayment.vue")
const PaymentList = () => import("./components/PaymentList.vue")
const PaymentDetail = () => import("./components/PaymentDetail.vue")

const routes = [
  { 
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  { path: '/students', component: StudentList },

  { path: '/students/:studentId', component: StudentDetail },
  { path: '/rights/:table', component: RightsTable },
  { path: '/directions', component: DirectionList },
  { path: '/directions/:directionId', component: DirectionDetail },
  { path: '/AddDirection', component: AddDirection },
  { path: '/profiles', component: ProfileList },
  { path: '/profiles/:profileId', component: ProfileDetail },
  { path: '/AddProfile', component: AddProfile },

  { path: '/groups', component: GroupList },
  { path: '/groups/:groupId', component: GroupDetail },
  { path: '/AddGroup', component: AddGroup },

  { path: '/listeners', component: ListenerList },
  { path: '/listeners/:listenerId', component: ListenerDetail },
  { path: '/AddListener', component: AddListener },

  { path: '/payers', component: PayerList },
  { path: '/payers/:payerId', component: PayerDetail },
  { path: '/Addpayer', component: AddPayer },

  { path: '/contracts', component: ContractList },
  { path: '/contracts/:contractId', component: ContractDetail },
  { path: '/AddContract', component: AddContract },

  { path: '/courseworks', component: CWList },


  { path: '/programs', component: ProgramList },
  { path: '/programs/:programId', component: ProgramDetail },
  { path: '/AddProgram', component: AddProgram },

  { path: '/payments', component: PaymentList },
  { path: '/payments/:paymentID', component: PaymentDetail },
  { path: '/AddPayment', component: AddPayment },

  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  { path: '/AddStudent', component: AddStudent },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    next('/login'); // Redirect to login page if not logged in
  } else if (loggedIn) {
    const token = JSON.parse(loggedIn).accessToken;
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        // Token has expired, perform logout and redirect to login
        AuthService.logout();
        next('/login');
      } else {
        next(); // Continue to the intended route
      }
    } catch (error) {
      // Handle token decoding errors if needed
      next();
    }
  } else {
    next(); // Continue to the intended route (public page)
  }
});

/*
на случай если мы не хотим проверять токен
router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/checkTokenExpiration'); // Check token expiration

  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  
  if (authRequired && !loggedIn) {
    next('/login'); // Redirect to login page if not logged in
  } else {
    next(); // Continue to the intended route
  }
});
*/

export default router;