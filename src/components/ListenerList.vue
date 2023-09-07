
<template>
  <div class="col col-xs-9 col-lg-12 mt-4 list">
    <div class="col col-12">
    <div class="mb-3 col col-12">
      <button @click="navigateToAddListener" class="btn btn-primary float-start" type="button"><i class="material-icons-outlined">add</i>Добавить Слушателя</button>
      <div class="col col-3 float-end">
      <input class="form-control" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..."> 
    </div>
  </div>
      <!-- список студентов -->
      <table v-if="loading" class="table">
        <tbody>
        <tr v-for="n in listenersPerPage" :key="n">
          <td><div class="skeleton skeleton-animate"></div></td>
          <td><div class="skeleton skeleton-animate"></div></td>
          <td><div class="skeleton skeleton-animate"></div></td>
          <td><div class="skeleton skeleton-animate"></div></td>
          <td><div class="skeleton skeleton-animate"></div></td>
          <td><div class="skeleton skeleton-animate"></div></td>
        </tr>
      </tbody>
    </table>
    <table v-else class="table">
        <!-- таблица -->
        <thead>
          <!-- колонки -->
          <tr>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Email</th>
          </tr>
        </thead>
        <!-- тело таблицы -->
        <tbody>
          <!-- цикл по строкам студентов -->
          <tr v-for="listener in paginatedListeners" :key="listener.listener_id">
            <td>{{ listener.full_name }}</td>
            <td>{{ listener.phone_number }}</td>
            <td>{{ listener.email }}</td>

            <td>
              <!-- кнопошка -->
              <button @click="viewListenerDetail(listener.id)" class="btn btn-primary btn-sm"><i class="material-icons-outlined">visibility</i>Детали</button>
             
            </td>
          </tr>
        </tbody>
      </table>


      <!-- странички -->
      <nav class="float-start">
        <ul class=" pagination">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button @click="prevPage" class="btn page-link btn-sm"><i class="material-icons-outlined">chevron_left</i></button>
          </li>
          <li class="page-item" v-for="pageNumber in pageRange" :key="pageNumber" :class="{ 'active': pageNumber == currentPage }">
            <button @click="changePage(pageNumber)" class="btn page-link nmbr btn-sm">{{ pageNumber }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button @click="nextPage" class="btn page-link btn-sm"><i class="material-icons-outlined">chevron_right</i></button>
          </li>
        </ul>
      </nav>
      <div class="float-end"> <button @click="viewRightsDetail()" class="btn btn-primary btn-sm">Права ролей</button>
      </div>
    </div>
  </div>
  </template>
  
  <script>

  import UserService from "../services/user.service";




  export default {
  

    data() {




      return {

        
        listeners: [], // массив всех студентов
        currentPage: 1, // теущий номер страницы
        listenersPerPage: 10, // кол-во студентов на странице
        maxPageButtons: 3,
        loading: true,
        searchQuery: ''
      };
    },
    computed: {
      // подсчет страниц

  totalPages() {
    const filteredListeners = this.filterListeners();
    return Math.ceil(filteredListeners.length / this.listenersPerPage);
  },
  paginatedListeners() {
    const startIndex = (this.currentPage - 1) * this.listenersPerPage;
    const endIndex = startIndex + this.listenersPerPage;

    const filteredListeners = this.filterListeners();
    return filteredListeners.slice(startIndex, endIndex);
  },
  pageRange() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const maxButtons = this.maxPageButtons;
    const ellipsis = '...';

    if (totalPages <= maxButtons) {
      // If total pages are less than or equal to the max buttons, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate the start and end page numbers for the limited display
    const halfMaxButtons = Math.floor(maxButtons / 2);
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Ensure that we always show maxButtons, if possible
    if (endPage - startPage + 1 < maxButtons) {
      startPage = endPage - maxButtons + 1;
    }

    // Insert an ellipsis and the last page when appropriate
    const pageRange = [];

    if (startPage > 1) {
      pageRange.push(1, ellipsis);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }

    if (endPage < totalPages) {
      pageRange.push(ellipsis, totalPages);
    }

    return pageRange;
  },
    },
    methods: {
      filterListeners() {
    const queryString = this.searchQuery.toLowerCase();
    return this.listeners.filter(listener => {
      return (
        String(listener.full_name).toLowerCase().includes(queryString) ||
        String(listener.phone_number).toLowerCase().includes(queryString) ||
        String(listener.email).includes(queryString) 
      );
    });
  },
      // грузим данные
      async loadListenersData() {
        try {
          const response = await UserService.getAllListeners(); // Replace with your API endpoint
          this.listeners = Array.isArray(response.data) ? response.data : [response.data];
          this.loading=false;
        } catch (error) {
          console.error('Error loading listeners data:', error);
        }
      },

      updateSearchQuery() {
  const query = { page: 1 }; // когда меняется фильтр летим на первую страницу
  if (this.searchQuery.trim() !== '') {
    query.search = this.searchQuery;
  }
  this.currentPage = 1; 
  this.$router.replace({ query });
},
      // смена страницы
      changePage(pageNumber) {
  const query = { ...this.$route.query, page: pageNumber };
  if (this.searchQuery.trim() !== '') {
    query.search = this.searchQuery;
  }
  this.$router.replace({ query });
},
      prevPage() {
        if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.changePage(this.currentPage + 1);
        }
      },
      // смотрим детали о студенте
      viewListenerDetail(listenerId) {
        this.$router.push(`/listeners/${listenerId}`);
      },
      viewRightsDetail(){
        this.$router.push(`/Rights/listeners`);
      },

      navigateToAddListener() {
    
        this.$router.push(`/addListener`); // Navigate to the AddListener route
    },
    },

    beforeRouteUpdate(to, from, next) {
  // берём филтр из роутера
  this.searchQuery = to.query.search || '';
  // берём страницу из роутера
  this.currentPage = parseInt(to.query.page) || 1;
  next();
},

    created() {
    const query = this.$route.query;
    this.currentPage = parseInt(query.page) || 1;
    this.searchQuery = query.search || '';
    this.loadListenersData();
    },
  };
  </script>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  height: 1.2em;
  background-image: linear-gradient(125deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonShimmer 3.5s infinite linear;
  border-radius: 4px;
  margin: 0.2em 0;
}



@keyframes skeletonShimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes skeletonFade {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }

  
}

@media (max-width: 769px) {
  .list{
    padding-left: 100px;
    font-size: 10px;
    max-width: 1100px;
  }
}

@media (max-width: 1023px) {



  .list{
    padding-left: 100px;
    font-size: 13px;

  }
}
@media (min-width: 1023px) {



.list{
  padding-left: 100px;
  padding-right: 5px;

}
}
.nmbr{
  height: 44px;
}



.btn-primary{
    --bs-btn-bg: rgb(68,99,52);
    border: none;
    --bs-btn-hover-bg:rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
    --bs-btn-active-bg: rgb(68,99,52);
    --bs-btn-disabled-bg: rgb(68,99,52);
    display: flex;
  justify-content: center;
  align-items: center;
}
.form-control:focus {
  border-color: rgba(1, 20, 8, 0.815);
  box-shadow: inset 0 1px 1px rgba(6, 215, 29, 0.075), 0 0 8px rgba(6, 215, 29, 0.6);
}
.form-select:focus {
  border-color: rgba(1, 20, 8, 0.815);
  box-shadow: inset 0 1px 1px rgba(6, 215, 29, 0.075), 0 0 8px rgba(6, 215, 29, 0.6);
}
.page-link{
  height: 40px;
  width: 40px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active{
  .page-link{
    background-color: rgb(68,99,52);
    border: none;
    --bs-btn-hover-bg:rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
 
  }
}
.disabled{
  .page-link{
    background-color: rgb(57, 79, 46);
    border: none;
    --bs-btn-hover-bg:rgb(6 215 29);
    --bs-btn-hover-border-color: rgb(6 215 29);
  }
}
</style>