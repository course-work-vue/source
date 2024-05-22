<template>

<div v-if="!loading">

  <div class="col col-xs-9 col-lg-12 list">
    <div class="col col-12 ">
      <div class="d-inline-flex">
        <div v-if="!spisok">
        <h1> Список всех студентов </h1>
        
      </div>
    <h1 v-if="spisok"> Список студентов {{ groupn }} группы </h1>
    <h1 v-if="subg">, {{ subgn }} подгруппы</h1>
      </div>
      
    <div class="col col-12">
    
      <button @click="navigateToAddStudent" class="btn btn-primary float-start" type="button"><i class="material-icons-outlined">add</i>Добавить студента</button>
      <button @click="previewDocx" class="mx-2 btn btn-primary float-start" type="button">Отчёт о формах обучения</button>
      <div class="col col-6 float-end d-inline-flex align-items-center">
      <button @click="clearFilters" :disabled="!filters" class="btn btn-sm btn-primary text-nowrap mx-2" type="button"><i class="material-icons-outlined">close</i>Очистить фильтры</button>
      <input class="form-control" type="text" v-model="quickFilterValue" id="filter-text-box" v-on:input="onFilterTextBoxChanged()" placeholder="Поиск..."> 

      
    </div>
  </div>
  

</div>
<div>
<div class="col col-6 float-start">
<div class="form-group d-inline-flex align-items-center">
              <label class="bigger form-label" for="group_id">Фильтр по группе:</label>

                <select class="form-select" id="group_id" v-model="myValue" @change="handleSelectChange(myValue)">
                  <option selected="selected" value="">
                      Нет
                  </option>
                  <option v-for="group in groups" :key="group.id" :value="group.text">{{ group.text }}</option>
                </select>
        
            </div>
          </div>
          <div class="col col-6 float-start">
<div class="form-group d-inline-flex align-items-center">
              <label class="bigger form-label" for="subgroup_id">Фильтр по подгруппе:</label>

                <select class="form-select" id="subgroup_id" v-model="myValue4" @change="handleSelectChange2(myValue4)">
                  <option selected="selected" value="">Нет</option>
                <option value="1">1</option>
                <option value="2">2</option>
                 
                </select>
        
            </div>
          </div>
        </div>
<div style="height: 90vh">
<div class="h-100 pt-5">
  <ag-grid-vue
    class="ag-theme-alpine"
    style="width: 100%; height: 100%;"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    includeHiddenColumnsInQuickFilter = true
    @cell-clicked="cellWasClicked"
    @grid-ready="onGridReady"
    @firstDataRendered="onFirstDataRendered"
    @filter-changed="onFilterChanged"

  >
  </ag-grid-vue>
</div>
</div>

</div>
<div class="container mt-3">
    <table class="table table-striped">
      Список отстающих студентов
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataFromApi" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.sum }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
 import { Form, Field, ErrorMessage } from "vee-validate";
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import ButtonCell from "@/components/StudentButtonCell.vue";
import StudentHref from "@/components/StudentHrefCellRenderer.vue";
import StudentHref2 from "@/components/StudentHrefCellRenderer2.vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import UserService from "../services/user.service";
import { useRoute } from 'vue-router';
/* eslint-disable vue/no-unused-components */
export default {
  name: "App",
  components: {
    AgGridVue,
    ButtonCell,
    StudentHref,
    StudentHref2,
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const gridApi = ref(null); // Optional - for accessing Grid's API
    const gridColumnApi = ref();

    const dataFromApi = ref(null); // This will store the data from the API
    const dataLoaded = ref(false); // This flag will indicate if data is loaded
    // Obtain API from grid's onGridReady event
    const route = useRoute();
    const paginationPageSize = 60;


    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;
     
    };
    const navigateToStudent = () => {
 
  };



    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
      {
      sortable: false,
      filter: false,
      headerName: 'Действия',
      headerClass: 'text-center',
      cellRenderer: 'ButtonCell',
      cellRendererParams: {
        onClick: navigateToStudent,
        label: 'View Details', // Button label
      },
      maxWidth: 120, resizable: false
     
    },
        
           { field: "full_name", headerName: 'ФИО', minWidth:250, cellRenderer: "StudentHref2" },
           { field: "group_number", headerName: 'Группа', maxWidth:129 },
           { field: "subgroup", headerName: 'Подгруппа', maxWidth:129 },
           { field: "enrollment_order", headerName: 'Приказ о зачислении', minWidth: 200, hide: true },
           {
            field: 'formatted_enrolled_date', 
            filter: 'agDateColumnFilter',
            filterParams: filterParams, headerName: 'Дата зачисления', minWidth: 170, hide: true
           },
           
           { field: "formatted_date_of_birth", filter: 'agDateColumnFilter', filterParams: filterParams, headerName: 'Дата рождения', minWidth: 170, hide: true }
      ],
    });
    const restoreFromHardCoded2 = (myValue3) => {

      const filterModelQuery = route.query.filterModel;
      if (filterModelQuery) {
  // Parse the filterModel from the query parameter
  const filterModel = JSON.parse(filterModelQuery);

  // Your hardcoded filter
  const hardcodedFilter = {
    subgroup: { type: 'equals', filter: myValue3 }
  };

  // Merge the filterModel and hardcodedFilter using the spread operator
  const mergedFilter = {
    ...filterModel,
    ...hardcodedFilter
  };

  // Now 'mergedFilter' contains the combined filters
  console.log(mergedFilter);
  gridApi.value.setFilterModel(mergedFilter);
}
else{
  const hardcodedFilter = {
    subgroup: { type: 'equals', filter: myValue3 }
  };
  gridApi.value.setFilterModel(hardcodedFilter);
}
     
     
    };

    const  handleSelectChange2 = async (myValue3) => {

      restoreFromHardCoded2(myValue3); 
    };

    const restoreFromHardCoded = (myValue2) => {




const filterModelQuery = route.query.filterModel;
      if (filterModelQuery) {
  // Parse the filterModel from the query parameter
  const filterModel = JSON.parse(filterModelQuery);

  // Your hardcoded filter
  const hardcodedFilter = {
    group_number: { type: 'equals', filter: myValue2 }
  };

  // Merge the filterModel and hardcodedFilter using the spread operator
  const mergedFilter = {
    ...filterModel,
    ...hardcodedFilter
  };

  // Now 'mergedFilter' contains the combined filters 
  console.log(mergedFilter);
  gridApi.value.setFilterModel(mergedFilter);
}
else{
  const hardcodedFilter = {
    group_number: { type: 'equals', filter: myValue2 }
  };
  gridApi.value.setFilterModel(hardcodedFilter);
}


      
    };

    const handleSelectChange =async (myValue2) => {

      dataFromApi.value= (await UserService.getRetardsByGroupId(myValue2)).data;
      dataLoaded.value = true; 
      restoreFromHardCoded(myValue2);
    };
 

    
    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      flex: 1,
      resizable: true,
      minWidth: 150
    };


    // Example load data from server
    onMounted(() => {
    
    });

    const onFilterTextBoxChanged = () => {
      gridApi.value.setQuickFilter(
        document.getElementById('filter-text-box').value
      );
    };


    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked: (event) => { // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
      deselectRows: () =>{
        gridApi.value.deselectAll()
      },

      onFilterTextBoxChanged,
      paginationPageSize,
      navigateToStudent,
      restoreFromHardCoded,
      restoreFromHardCoded2,
      handleSelectChange,
      handleSelectChange2,
      dataFromApi,
      dataLoaded
     

      

    };
  },
  data() {



  return {
    quickFilterValue: '',
    filters:false,
    groups: ["Нет"],
    myValue: '',
    myValue4:'',
    spisok:false,
    subg:false,
    groupn:null,
    subgn:null,
    
  };
},

  methods: {
    previewDocx() {
    
      window.open(`https://docs.google.com/viewerng/viewer?url=http://195.93.252.168:5050/api/Students/Export`);
    },
    async loadGroupsData() {
        try {
          const response = await UserService.getGroupsAsKOSTIL(); 
          console.log("aaaa");
          console.log(response);
          this.groups = Array.isArray(response.data) ? response.data : [response.data];
       
        } catch (error) {
          console.error('Error loading students data:', error);
        }
      },

    async loadStudentsData() {
        try {
          const response = await UserService.getAllFormattedStudents(); // Replace with your API endpoint
          this.rowData.value = Array.isArray(response.data) ? response.data : [response.data];
          this.loading=false;
        } catch (error) {
          console.error('Error loading students data:', error);
        }
      },
      navigateToAddStudent() {
    if(this.groupn){
      this.$router.push(`/addStudent/`+this.groupn)
    }
    else{
    this.$router.push(`/addStudent`); }
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
        if(filterModel.group_number){
          this.myValue=filterModel.group_number.filter;
        this.groupn=filterModel.group_number.filter;
        if(this.groupn){
        this.spisok=true;
      }
        }
        
        if(filterModel.subgroup){
          this.myValue4=filterModel.subgroup.filter;
          this.subgn=filterModel.subgroup.filter;

          if(this.subgn){
        this.subg=true;
      }
        }

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
    if(savedFilterModel.group_number){
      this.myValue=savedFilterModel.group_number.filter;
    this.groupn=savedFilterModel.group_number.filter;
        if(this.groupn){
        this.spisok=true;
      }
    }
    else{
      this.spisok=false;
    }
    if(savedFilterModel.subgroup){
          this.myValue4=savedFilterModel.subgroup.filter;
          this.subgn=savedFilterModel.subgroup.filter;

          if(this.subgn){
        this.subg=true;
      }
        }
        else{
          this.subg=false;
        }
  }
  else{
    this.spisok=false;
    this.subg=false;
  }


  // Push the query parameters to the router
  this.$router.push({ query: queryParams });

  // Do something with the filterModel or trigger other actions as needed.
},
  clearFilters(){

  
    this.gridApi.setFilterModel();
    this.gridApi.setQuickFilter();
    this.quickFilterValue='';
    this.myValue="";
    this.myValue4="";
    this.subg=false;
    this.spisok=false;
    this.filters=false;
  },

  
    },

    created() {
    this.loadGroupsData();
    this.loadStudentsData();

    },

    
};
var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

</script>

<style lang="scss" scoped>
.bigger{
  font-size: 30px;
  white-space: nowrap;
}
.ag-row .ag-cell {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
}

.skeleton {
  width: 100%;
  height: 1.2em;
  background-image: linear-gradient(125deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonShimmer 3.5s infinite linear;
  border-radius: 4px;
  margin: 0.2em 0;
}
  .list{
    padding-left: 100px;
    font-size: 5px;

  }

    .text-center * {
      justify-content: center;
      display:flex 
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