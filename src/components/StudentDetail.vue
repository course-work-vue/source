<template>
  <div class="col-md-12 list">
    <div v-if="student" >
      <Form @submit="updateStudent" :validation-schema="schema" v-slot="{ errors }">
        
        <div class="col col-12">
          <div class="form-group">
            <label for="last_name">Фамилия</label>
            <Field name="last_name" type="text" value="" class="form-control" :class="{'is-invalid': errors.last_name}" v-model="editedStudent.last_name"/>
            <ErrorMessage name="last_name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="first_name">Имя</label>
            <Field name="first_name" type="text" class="form-control" value="" :class="{'is-invalid': errors.first_name}" v-model="editedStudent.first_name"/>
            <ErrorMessage name="first_name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="patronymic">Отчество</label>
            <Field name="patronymic" type="text" class="form-control" value="" :class="{'is-invalid': errors.patronymic}" v-model="editedStudent.patronymic"/>
            <ErrorMessage name="patronymic" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="gender">Пол</label>
            <br>
            <Field name="gender" type="radio" value="m" class="form-check-input" :class="{'is-invalid': errors.gender}" v-model="editedStudent.gender"/> Мужской
            <Field name="gender" type="radio" value="f" class="form-check-input" :class="{'is-invalid': errors.gender}" v-model="editedStudent.gender"/> Женский
            <br>
            <ErrorMessage name="gender" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="date_of_birth">Дата рождения</label>
            <Field name="date_of_birth" type="date" class="form-control" value="" :class="{'is-invalid': errors.date}" v-model="editedStudent.date_of_birth"/>
         
            <ErrorMessage name="date_of_birth" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="passport_series_and_number">Серия и номер паспорта</label>
            <Field name="passport_series_and_number" type="text" class="form-control" value="" :class="{'is-invalid': errors.passport_series_and_number}" v-model="editedStudent.passport_series_and_number"/>
            <ErrorMessage name="passport_series_and_number" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="INN">ИНН</label>
            <Field name="INN" type="text" class="form-control" value="" :class="{'is-invalid': errors.INN}" v-model="editedStudent.INN"/>
            <ErrorMessage name="INN" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="SNILS">СНИЛС</label>
            <Field name="SNILS" type="text" class="form-control" value="" :class="{'is-invalid': errors.SNILS}" v-model="editedStudent.SNILS"/>
            <ErrorMessage name="SNILS" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="place_of_birth">Страна рождения</label>
            <Field name="place_of_birth" type="text" class="form-control" value="" :class="{'is-invalid': errors.place_of_birth}" v-model="editedStudent.place_of_birth"/>
            <ErrorMessage name="place_of_birth" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="text" class="form-control"  value="" :class="{'is-invalid': errors.email}"  v-model="editedStudent.email"/>
            <ErrorMessage name="email" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="student_login">Логин студента</label>
            <Field name="student_login" type="text" class="form-control" value="" :class="{'is-invalid': errors.student_login}" v-model="editedStudent.student_login"/>
            <ErrorMessage name="student_login" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="enrollment_order">Приказ о зачислении</label>
            <Field name="enrollment_order" type="text" class="form-control" value="" :class="{'is-invalid': errors.enrollment_order}" v-model="editedStudent.enrollment_order"/>
            <ErrorMessage name="enrollment_order" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="enrolled_date">Дата зачисления</label>
            <Field name="enrolled_date" type="date" class="form-control" value="" :class="{'is-invalid': errors.enrolled_date}" v-model="editedStudent.enrolled_date"/>
            <ErrorMessage name="enrolled_date" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="course">Курс</label>
            <Field name="course" type="text" class="form-control" value="" :class="{'is-invalid': errors.course}" v-model="editedStudent.course"/>
            <ErrorMessage name="course" class="error-feedback" />
          </div>
          
          <div class="form-group">
            <label for="group_id">Группа</label>
            
            <Select2 :class="{'form-control is-invalid': errors.group_id}" v-model="editedStudent.group_id" 
            :options="groups" 
            :settings=" { theme: 'bootstrap-5', width: '100%'}"
            
             />

             <Field  name="group_id" as="select" v-model="editedStudent.group_id" hidden>
              <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.text }}</option>
            </Field>
            <ErrorMessage name="group_id" class="error-feedback" />
          </div>

          <div class="form-group float-none">
            <label for="subgroup">Подгруппа</label>
            <Field name="subgroup" type="text" class="form-control" :class="{'is-invalid': errors.subgroup}" v-model="editedStudent.subgroup"/>
            <ErrorMessage name="subgroup" class="error-feedback" />
            
          </div>

          <div class="form-group mt-3">
            
            <router-link to="/students" class="mx-2 btn btn-secondary  float-start">Отмена</router-link>
          </div>

          <div class="form-group mt-3">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Обновить студента
            </button>
        
          </div>
          <div class="form-group mt-3">
            <button class="btn btn-danger  float-end" @click="deleteStudent">
              Удалить студента
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
        
        email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),


          group_id: yup
          .string()
          .required("Email is required!")
          
       
      });

      return {
        schema,
        loading:false,
        student: null, // заглушка для данных студента
        editedStudent: null, // заглушка для новых данных студента
        groups: null,

      };
    },
    methods: {
      // грузим студента из psql по id 
      async loadStudentDetail() {
        const studentId = this.$route.params.studentId;
        try {
          const response = await UserService.getStudentById(studentId);
          this.student = response.data;
          // Клонирование объекта, для избежание редактирования данных сразу
          this.editedStudent = { ...response.data };
        } catch (error) {
          console.error('Error loading student details:', error);
        }
      },
      // Метод для обновления данных о студенте
      async updateStudent() {
        try {
          // запрос в psql
          this.loading=true;

          const response = await UserService.updateStudentById(this.student.student_id, this.editedStudent.first_name, this.editedStudent.last_name, this.editedStudent.patronymic, 
          this.editedStudent.gender, this.editedStudent.date_of_birth, this.editedStudent.passport_series_and_number, this.editedStudent.INN, this.editedStudent.SNILS, this.editedStudent.place_of_birth, this.editedStudent.email,
          this.editedStudent.student_login, this.editedStudent.enrollment_order, this.editedStudent.enrolled_date, this.editedStudent.course, this.editedStudent.group_id, this.editedStudent.subgroup);
          response.data;
          this.student = { ...this.editedStudent };
          this.loading=false;
          this.toast.success("Успешно обновили студента!");
        } catch (error) {
          console.error('Ошибка загрузки данных о студенте:', error);
        }
      },
      async deleteStudent() {
        try {
          // запрос в psql
          this.loading=true;

          const response = await UserService.deleteStudentById(this.student.student_id);
          response.data;
          this.student = { ...this.editedStudent };
          this.loading=false;
          this.toast.success("Успешно удалили студента!");
        } catch (error) {
          console.error('Ошибка загрузки данных о студенте:', error);
        }
      },
      async loadGroupsData() {
        try {
          const response = await UserService.getGroupsAsIdText(); 
          this.groups = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Ошибка загрузки данных о студенте:', error);
        }
      }
    },
    created() {
      this.loadGroupsData();
      this.loadStudentDetail();
     
    },
  };
  </script>

<style lang="scss" scoped>
.form-group{
  width: 33%;
  padding-right: 10px;
  float: left;
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