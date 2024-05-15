<template>


  <div class="col col-xs-9 col-lg-12 mt-4 list">
    
    <div class="col col-12">
      
    <div class="mb-3 col col-12">
      
      <div class="col col-6 float-end d-inline-flex align-items-center mb-2 ">

      <button @click="exportExcel" class="btn btn-sm btn-primary text-nowrap mx-2" type="button">Сформировать отчёт</button>

      <button @click="clearFilters" :disabled="!filters" class="btn btn-sm btn-primary text-nowrap mx-2" type="button"><i class="material-icons-outlined">close</i>Очистить фильтры</button>
      
      <input class="form-control" type="text" v-model="quickFilterValue" id="filter-text-box" v-on:input="onFilterTextBoxChanged()" placeholder="Поиск..."> 
    </div>
    
  </div>
</div>

<div style="height: 80vh">
<div class="h-100 pt-5">
  <ag-grid-vue
    class="ag-theme-alpine"
    style="width: 100%; height: 100%;"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :getRowStyle="getRowStyle"
    :pinned-top-row-data="pinnedTopRowData"
    :pinned-bottom-row-data="pinnedBottomRowData"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @cell-clicked="cellWasClicked"
    @grid-ready="onGridReady"
    @firstDataRendered="onFirstDataRendered"
    @filter-changed="onFilterChanged"
    :pagination="true"            
    :paginationPageSize="paginationPageSize"  

  >
  </ag-grid-vue>
  
</div>
</div></div>

</template>

<script>

import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";
import ButtonCell from "@/components/TegrsuButtonCell.vue";
import JournalHref from "@/components/JournalHrefCellRenderer.vue";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
//import CustomPinnedRowRenderer from '@/customPinnedRowRendererVue.js';
import UserService from "../services/user.service";

/* eslint-disable vue/no-unused-components */
export default {
  name: "App",
  components: {
    AgGridVue,
    ButtonCell,
    JournalHref,
   // CustomPinnedRowRenderer
  },
  setup() {
    const gridApi = ref(null); // Optional - for accessing Grid's API
    const gridColumnApi = ref();
    // Obtain API from grid's onGridReady event

    const paginationPageSize = 60;


    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;
     
    };
    const navigateToJournal = () => {
 
  };
    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row
    
    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [
          { field: "group_number", headerName: 'number',hide:true},
          { field: "group_id", headerName: 'id',hide:true},
          { field: "full_name", headerName: 'ФИО',pinned: 'left',minWidth:300},
          { field: "date",headerName:"12.10.2023" , width:200, flex:1,
            children: [
                        {
                      field: "status",
                      editable: true,
                      headerName: 'Пр',
                      maxWidth:100,
                      },
                            {
                        field: "grade",
                        editable: true,
                      headerName: 'Т/к',
                      maxWidth:100
                          }
                    ],
                        },
      
                        {
           valueGetter: params => {
               return params.data.grade;
           },
           valueSetter: params => {
               params.data.grade = params.newValue;
               return true;
           },hide:true
       },
            {field: "Result", headerName: 'Итого',pinned: 'right',width:300,
                children: [

                        {
                      field: "kol-vopra",
                      headerName: "Всего пропусков",
                      pinned: 'right',
                      width:150,
                      
                      valueGetter: abValueGetter
                      },
                            {
                        field: "Sredn",
                      headerName: "Ср. балл",
                      pinned: 'right',
                      width:150,
                      valueGetter: absrValueGetter
                          }
                    ],}
         
      ],
    });
    function abValueGetter(params) {
      if(params.data.status=='н')
        return 1;
}
function absrValueGetter(params) {
  
return params.data.grade;
}
    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      sortable: true,
      filter: true,
      
      resizable: true,
      
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
      navigateToJournal,

    };
  },
  data() {
  return {
    quickFilterValue: '',
    filters:false,
    pinnedTopRowData: null,
    pinnedBottomRowData: null
  
    

  };
},

  
  
  methods: {
    exportExcel(){
      import("@/plugins/Export2Excel").then((excel)=>{
        this.$store.dispatch('journal/GET_JOURNAL').then(response=>{
          console.log(response.data.journal)
          const OBJ=response.data.journal;
          const Header=["FIO","Date","Status","Grade"];
          const Field=["full_name","date","status","grade"];
          const Data=this.FormatJSon(Field,OBJ);
          excel.export_json_to_excel({
            header:Header,
            date:Data,
            sheetName:"Name Of Sheets",
            filename:"journal",
            autoWidth:true,
            bookType:"xlsx",
          })
        })
      })
     
    },

    FormatJSon(FilterData,JsonData){
return JsonData.map((v)=>FilterData.map((j=>{
  return v[j];
})))
    },
    
    async loadJournalsData() {
        try {
          const response = await UserService.getAllJournals(); // Replace with your API endpoint
          this.rowData.value = Array.isArray(response.data) ? response.data : [response.data];
          this.loading=false;
        } catch (error) {
          console.error('Error loading journal data:', error);
        }
      },
      navigateToUpdateJournal() {
    
    this.$router.push(`/updateJournal`); // Navigate to the AddTegrsu route
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
    
    this.loadJournalsData();
    },

    
};


</script>

<style lang="scss" scoped>
.ag-header-group-cell {
  justify-content: center;
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