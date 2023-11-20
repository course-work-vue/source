<template>
  <div class="col-md-12 list">
    <div v-if="group" >
      <Form @submit="updateGroup" :validation-schema="schema" v-slot="{ errors }">
        
        <div>

<div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="group_number">Номер группы:</label>
    <Field name="group_number" type="text" class="form-control" :class="{'is-invalid': errors.group_number}" v-model="editedGroup.group_number"/>
    <ErrorMessage name="group_number" class="error-feedback" />
    
  </div>


 

  <div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="group_program_id">Программа:</label>
    
    <Select2 class="col-5" :class="{'form-control is-invalid': errors.group_program_id}" v-model="editedGroup.group_program_id" 
    :options="programs" 
    :settings=" { theme: 'bootstrap-5', width: '100%'}"
    
     />

     <Field  name="group_program_id" as="select" v-model="editedGroup.group_program_id" hidden>
      <option v-for="program in programs" :key="program.id" :value="program.id">{{ program.text }}</option>
    </Field>
    <ErrorMessage name="group_program_id" class="error-feedback" />
  </div>

  <div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="hours">Общее количество часов:</label>
    <Field name="hours" type="number" class="form-control" :class="{'is-invalid': errors.hours}" v-model="editedGroup.hours"/>
    <ErrorMessage name="hours" class="error-feedback" />
    
  </div>

  <div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="start_date">Дата начала:</label>
    <Field name="start_date" type="date" class="form-control" :class="{'is-invalid': errors.start_date }" v-model="editedGroup.start_date"/>
    <ErrorMessage name="start_date" class="error-feedback" />
    
  </div>

  <div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="end_date">Дата окончания:</label>
    <Field name="end_date" type="date" class="form-control" :class="{'is-invalid': errors.end_date}" v-model="editedGroup.end_date"/>
    <ErrorMessage name="end_date" class="error-feedback" />
    
  </div>


  <div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="starttime">Время начала:</label>
    <Field name="starttime" type="time" class="form-control" :class="{'is-invalid': errors.starttime}" v-model="editedGroup.starttime"/>
    <ErrorMessage name="starttime" class="error-feedback" />
    
  </div>
  <div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="endtime">Время окончания:</label>
    <Field name="endtime" type="time" class="form-control" :class="{'is-invalid': errors.endtime}" v-model="editedGroup.endtime"/>
    <ErrorMessage name="endtime" class="error-feedback" />
    
  </div>

  <div class="form-group d-inline-flex align-items-center col-5 mb-2">
    <label for="people_count">Общее количество человек:</label>
    <Field name="people_count" type="number" class="form-control" :class="{'is-invalid': errors.pc}" v-model="editedGroup.people_count"/>
    <ErrorMessage name="people_count" class="error-feedback" />
    
  </div>

  <div class="form-group mt-3">
   
   <router-link to="/lgroups" class="btn btn-secondary ml-2 float-start">Отмена</router-link>
   <button class="btn btn-primary btn-block float-end" :disabled="loading">
     <span
       v-show="loading"
       class="spinner-border spinner-border-sm"
     ></span>
     Добавить группу
   </button>
 </div>
</div>
      </Form>
    </div>
    <div v-else>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>
    </div>
      
      
   
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>

</template>

  <script>

import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import UserService from "../services/user.service";
  import { useToast } from "vue-toastification";
  export default {

    setup() {
      const toast = useToast();
      return { toast }
    },
    components: {
      Form,
      Field,
      ErrorMessage,

      
    },


    data() {
      const schema = yup.object().shape({
        
      
       
      });

      return {
        schema,
        dataLoading:false,
        group: null, // заглушка для данных студента
        editedGroup: null, // заглушка для новых данных студента
        profiles: null,
        directions: null,
        programs:null

      };
    },
    methods: {
      // грузим студента из psql по id 

      async updateGroup() {
        try {
          // запрос в psql
          this.loading=true;

          const response = await UserService.updateLgroupById(this.group.group_id, this.editedGroup.group_number,this.editedGroup.group_program_id,this.editedGroup.hours,this.editedGroup.start_date,this.editedGroup.end_date,this.editedGroup.starttime,this.editedGroup.endtime, this.editedGroup.people_count);
          response.data;
          this.group = { ...this.editedgroup };
          this.toast.success("Успешно обновили группу!");
        } catch (error) {
          console.error('Ошибка загрузки данных о группе:', error);
        }
      },
      async loadGroupDetail() {
        const groupId = this.$route.params.groupId;
        try {
          const response = await UserService.getLgroupById(groupId);
          this.group = response.data;
          // Клонирование объекта, для избежание редактирования данных сразу
          this.editedGroup = { ...response.data };
        } catch (error) {
          console.error('Error', error);
        }
      },
      async loadProgramsData() {
        try {
          const response = await UserService.getProgramsAsIdText(); 
          this.programs = Array.isArray(response.data) ? response.data : [response.data];
          this.dataLoading=false;
        } catch (error) {
          console.error('Error:', error);
        }
      },


    },
    created() {
      this.loadGroupDetail();
      this.loadProgramsData();
     
    },
  };
  </script>

<style lang="scss" scoped>
label{
  margin-right: 15px;
  white-space: nowrap;
}
.form-group{
  margin-right: 20px;
}
.skeleton-text {
  width: 15%;
  height: 1.0em;
  background-image: linear-gradient(125deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeletonShimmer 3.5s infinite linear;
  border-radius: 4px;
  margin: 0.2em 0;
}

.skeleton {
  width: 100%;
  height: 2.2em;
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

.btn-primary:active{
  --bs-btn-bg: rgb(68,99,52);
  
}
.form-control:focus, .select2-container--bootstrap-5.select2-container--focus,.select2-container--bootstrap-5.select2-container--open .select2-selection {
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
.form-check-input:checked{
  background-color: rgb(68,99,52);
    border: none;
}
</style>