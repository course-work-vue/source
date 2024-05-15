<template>
  <div class="col col-xs-9 col-lg-12 mt-4 list">
    <div class="col col-12">
      <div class="col col-12">
        <button @click="Back" class="btn btn-primary float-start" type="button" style="margin-right: 25px;">
          <i class="material-icons-outlined"></i>Назад
        </button>
        <button @click="SaveToDB" class="btn btn-primary float-start" type="button">
          <i class="material-icons-outlined">add</i>Сохранить
        </button>
      </div>
    </div>

    <div style="height: 35vh;">
      <div class="h-100 pt-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Факультет</th>
              <th scope="col">Кафедра</th>
              <th scope="col">Годы</th>
              <th scope="col">Лекции, бюджет</th>
              <th scope="col">Лекции, договор</th>
              <th scope="col">Практика, бюджет</th>
              <th scope="col">Практика, договор</th>
              <th scope="col">Лабы, бюджет</th>
              <th scope="col">Лабы, договор</th>
              <th scope="col">Конс экз</th>
            </tr>
            <tr v-for="(item, index) in groupedData" :key="index">
              <td>{{ item.fac }}</td>
              <td>{{ item.dep }}</td>
              <td>{{ item.years }}</td>
              <td>{{ item.lek_budj }}</td>
              <td>{{ item.lek_dogovor }}</td>
              <td>{{ item.p_budg }}</td>
              <td>{{ item.p_dogovor }}</td>
              <td>{{ item.lab_budj }}</td>
              <td>{{ item.lab_dogovor }}</td>
              <td>{{ item.cons_ex }}</td>
            </tr>
            <tr>
              <th scope="col">Конс ЗФО</th>
              <th scope="col">Контр. раб</th>
              <th scope="col">Зачёт</th>
              <th scope="col">Экзамен Устный</th>
              <th scope="col">Экзамен Письменный</th>
              <th scope="col">Руководство ВКР</th>
              <th scope="col">Рецензии ВКР</th>
              <th scope="col">Нормоконтроль ВКР</th>
              <th scope="col">Проверка Плагиата ВКР</th>
              <th scope="col">ГОСЭкз</th>
              <th scope="col">Защита ВКР</th>
            </tr>
            <tr v-for="(item, index) in groupedData" :key="'additional' + index">
              <td>{{ item.cons_zfo }}</td>
              <td>{{ item.control_work }}</td>
              <td>{{ item.zachet_h }}</td>
              <td>{{ item.ex_speak }}</td>
              <td>{{ item.ex_wr }}</td>
              <td>{{ item.manageVKR }}</td>
              <td>{{ item.recVKR }}</td>
              <td>{{ item.normContVKR }}</td>
              <td>{{ item.checkPlagVKR }}</td>
              <td>{{ item.GOSexam }}</td>
              <td>{{ item.defVKR }}</td>
            </tr>
            <tr>
              <th scope="col">Руководство</th>
            </tr>
            <tr v-for="(item, index) in groupedData" :key="'manag' + index">
              <td>{{ item.manag }}</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import ButtonCell from "@/components/ProfileButtonCell.vue";
import ProfileHref from "@/components/ProfileHrefCellRenderer.vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import UserService from "../services/user.service";
/* eslint-disable vue/no-unused-components */
export default {
  name: "App",
  components: {
    AgGridVue,
    ButtonCell,
    ProfileHref
  },
  setup() {
    const gridApi = ref(null); // Optional - for accessing Grid's API
    const gridColumnApi = ref();
    const groupedData = ref([]);
    const fac = ref("");
    // Obtain API from grid's onGridReady event

    onMounted(async () => {
      await loadTempVO();
    });

    const loadTempVO = async () => {
      try {
        const response = await UserService.getTempVO();
        groupedData.value = Array.isArray(response.data) ? response.data : [response.data];
        fac.value = response.data.fac; // Сохраняем значение fac
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    const paginationPageSize = 60;


    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;
     
    };

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row


    // Example load data from server
    onMounted(() => {

    });

    const onFilterTextBoxChanged = () => {
      gridApi.value.setQuickFilter(
        document.getElementById('filter-text-box').value
      );
    };


    return {
      groupedData,
      fac,
      onGridReady,
      rowData,
      cellWasClicked: (event) => { // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
      deselectRows: () =>{
        gridApi.value.deselectAll()
      },

      onFilterTextBoxChanged,
      paginationPageSize,
    };
  },
  data() {
  return {
    quickFilterValue: '',
    filters:false
  };
},
  methods: {

      async loadTempVO() {
        try {
          const response = await UserService.getTempVO(); // Replace with your API endpoint
          this.rowData.value = Array.isArray(response.data) ? response.data : [response.data];
          console.log(response.data)
          this.loading=false;
        } catch (error) {
          console.error('Error loading students data:', error);
        }
      },

      SaveToDB() {
        this.Back()
},

Back() {
          this.$router.push(`/xlparse`); // Navigate to the AddStudent route
        },

onFirstDataRendered(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;

      // Check if filterModel exists in the route query
      const filterModelQuery = this.$route.query.filterModel;
      if (filterModelQuery) {
        const filterModel = JSON.parse(filterModelQuery);
        this.gridApi.setFilterModel(filterModel);
        this.filters=true;
        
      }

      const quickFilterQuery = this.$route.query.quickFilter;
      if (quickFilterQuery) {
        const quickFilter = JSON.parse(quickFilterQuery);
        this.gridApi.setQuickFilter(quickFilter);
        this.quickFilterValue = quickFilter;
        this.filters=true;
      }
    },
    onFilterChanged() {
  // This function will be called whenever filters change.
  // You can perform your desired action here.
  // For example, you can get the current filter model:
  this.filters=false;
  const savedQuickFilter = this.gridApi.getQuickFilter();
  const savedFilterModel = this.gridApi.getFilterModel();

  // Initialize an empty object for queryParams
  const queryParams = {};

  // Check if savedQuickFilter is not empty, then add it to queryParams
  if (savedQuickFilter) {
    queryParams.quickFilter = JSON.stringify(savedQuickFilter);
    this.filters=true;
  }

  // Check if savedFilterModel is not empty, then add it to queryParams
  if (savedFilterModel && Object.keys(savedFilterModel).length > 0) {
    queryParams.filterModel = JSON.stringify(savedFilterModel);
    this.filters=true;
  }

  // Push the query parameters to the router
  this.$router.push({ query: queryParams });

  // Do something with the filterModel or trigger other actions as needed.
},
  clearFilters(){

  
    this.gridApi.setFilterModel();
    this.gridApi.setQuickFilter();
    this.quickFilterValue='';
    this.filters=false;
  },

  
    },

    created() {
    this.loadTempVO()
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
