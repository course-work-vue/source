<template>
  <div class="col-md-12 list">
    <div v-if="schedules" >
      <Form @submit="updateSchedule" :validation-schema="schema" v-slot="{ errors }">
       
        <div >
          <div class="form-group d-inline-flex align-items-center mb-2">
            <label for="group_id">Группа:</label>
            
            <Select2 :class="{'form-control is-invalid': errors.group_id}" v-model="editedSchedule.group_id" 
            :options="groups" 
            :settings=" { theme: 'bootstrap-5', width: '100%'}"
            
             />

             <Field  name="group_id" as="select" v-model="editedSchedule.group_id" hidden>
              <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.text }}</option>
            </Field>
            <ErrorMessage name="group_id" class="error-feedback" />
          </div>
          <div class="form-group d-inline-flex align-items-center float-none mb-2 col-3">
            <label for="subgroup">Подгруппа:</label>
            <Field name="subgroup" type="text" class="form-control" :class="{'is-invalid': errors.subgroup}" v-model="editedSchedule.subgroup"/>
            <ErrorMessage name="subgroup" class="error-feedback" />
            
          </div>
          <div class="form-group d-inline-flex align-items-center col-5 mb-2">
              <label for="audit_day_id">День недели</label>
              
              <Select2 class="col-5" :class="{'form-control is-invalid': errors.day_id}" v-model="editedSchedule.day_id" 
              :options="days" 
              :settings=" { theme: 'bootstrap-5', width: '100%'}"
              
               />
  
               <Field name="audit_day_id" as="select" v-model="editedSchedule.day_id" hidden>
                    <option v-for="day in days" :key="day.id" :value="day.id">{{ day.text }}</option>
               </Field>
              <ErrorMessage name="audit_day_id" class="error-feedback" />
            </div>

            <div class="form-group d-inline-flex align-items-center col-5 mb-2">
              <label for="audit_subject_id">Предмет</label>
              
              <Select2 class="col-10" :class="{'form-control is-invalid': errors.subject_id}" v-model="editedSchedule.subject_id" 
              :options="subjects" 
              :settings=" { theme: 'bootstrap-5', width: '100%'}"
              
               />
  
               <Field  name="audit_subject_id" as="select" v-model="editedSchedule.subject_id" hidden>
                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.text }}</option>
              </Field>
              <ErrorMessage name="audit_prof_id" class="error-feedback" />
            </div>

            <div class="form-group d-inline-flex align-items-center col-5 mb-2">
              <label for="audit_teacher_id">Преподаватель</label>
              
              <Select2 class="col-10" :class="{'form-control is-invalid': errors.teacher_id}" v-model="editedSchedule.teacher_id" 
              :options="teachers" 
              :settings=" { theme: 'bootstrap-5', width: '100%'}"
              
               />
  
               <Field  name="audit_teacher_id" as="select" v-model="editedSchedule.teacher_id" hidden>
                <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.text }}</option>
              </Field>
              <ErrorMessage name="audit_prof_id" class="error-feedback" />
            </div>

            <div class="form-group d-inline-flex align-items-center col-5 mb-2">
            <label for="audit_para_id">Пара</label>
            <select id="numberSelect">
              <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
            </select>
          </div>

            <div class="form-group d-inline-flex align-items-center col-10 mb-2">
              <label for="audit_subject_id">Аудитория</label>
              
              <Select2 class="col-5" :class="{'form-control is-invalid': errors.aud_id}" v-model="editedSchedule.aud_id" 
              :options="auditorium" 
              :settings=" { theme: 'bootstrap-5', width: '100%'}"
              
               />
  
            <Field name="audit_id" as="select" v-model="editedSchedule.aud_id" hidden>
                <option v-for="audit in auditorium" :key="audit.id" :value="audit.id">{{ audit.text }}</option>
            </Field>
              <ErrorMessage name="audit_aud_id" class="error-feedback" />
            </div>
          
            
            

            <div class="form-group  mt-3">
            
            <router-link to="/audits" class="mx-2 btn btn-secondary  float-start">Отмена</router-link>
          </div>
          <div class="form-group float-end">
            <button class="btn btn-danger float-end" @click="deleteAudit">
              Удалить аудиторию
            </button>
          </div>
          <div class="form-group mt-3">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Обновить аудиторию
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

  document.addEventListener("DOMContentLoaded", function() {
    const select = document.getElementById('numberSelect');
    
    for (let i = 1; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
});
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
        loading:false,
        successful: false,
        schedules: null,
        groups: null, // заглушка для данных студента
        editedSchedule: null, // заглушка для новых данных студента
        profiles: null,
        directions: null,
        options: [],
        auditorium: null,
        teachers: null
      };
    },
    mounted() {
    // Генерация вариантов с 1 по 10 и добавление их в массив options
      for (let i = 1; i <= 8; i++) {
        this.options.push({ value: i, label: i });
      }
    },
    methods: {
      // грузим студента из psql по id 
      async loadAuditoriumData() {
        const scheduleId = this.$route.params.scheduleId;
        try {
          const response = await UserService.getAuditById(scheduleId);
          this.schedules = response.data;
          // Клонирование объекта, для избежание редактирования данных сразу
          this.editedSchedule = { ...response.data };
        } catch (error) {
          console.error('Error', error);
        }
      },

      async updateSchedule() {
        try {
          // запрос в psql
          this.loading=true;

          const response = await UserService.updateScheduleById(this.schedules.t_id,this.editedSchedule.aud_id,this.editedSchedule.day_id,
          this.editedSchedule.subject_id,this.editedSchedule.teacher_id,this.editedSchedule.group_id);
          response.data;
          this.schedules = { ...this.editedSchedule };
          this.loading=false;
          this.toast.success("Успешно обновили аудиторию!");
        } catch (error) {
          console.error('Ошибка загрузки данных :', error);
        }
      },
      async deleteAudit() {
        try {
          // запрос в psql
          this.loading=true;

          const response = await UserService.deleteScheduleById(this.schedules.schedule_id);
          response.data;
          this.schedules = { ...this.editedSchedule };
          this.loading=false;
          this.toast.success("Успешно удалили аудиторию!");
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      },
        async loadGroupsData() {
        try {
          const response = await UserService.getGroupsAsIdText(); 
          this.groups = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Ошибка загрузки данных :', error);
        }
      },
      // Метод для обновления данных о студенте
      async loadDaysData() {
        try {
          const response = await UserService.getDaysAsIdText(); 
          this.days = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async loadAuditData() {
        try {
          const response = await UserService.getAuditAsIdText(); 
          this.auditorium = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Error:', error);
        }
      },
      
      async loadTeachersData() {
        try {
          const response = await UserService.getTeachersAsIdText(); 
          this.teachers = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async loadSubjectsData() {
        try {
          const response = await UserService.getSubjectAsIdText(); 
          this.subjects = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Error:', error);
        }
      }
      
    },
    created() {
      this.loadDaysData();
      this.loadSubjectsData();
      this.loadGroupsData();
      this.loadAuditData();
      this.loadTeachersData();
      this.loadAuditoriumData();
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
  margin-right: 10px;
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

