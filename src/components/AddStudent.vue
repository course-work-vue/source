<template>
  <div class="list">
  <div v-if="dataLoading">
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
      <div class="form-group">
        <label class="form-control skeleton-text skeleton-animate"></label>
        <input type="text" class="form-control skeleton skeleton-animate">
      </div>

  </div>
    <div v-else class="col-md-12">
        <Form @submit="addStudent" :validation-schema="schema" v-slot="{ errors }">
          <div>
            <div class="form-group d-inline-flex align-items-center col-12 mb-2">
              <label for="last_name">Фамилия:</label>
              <Field name="last_name" type="text" value="" class="form-control" :class="{'is-invalid': errors.last_name}" />
              <ErrorMessage name="last_name" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center col-12 mb-2">
              <label for="first_name">Имя:</label>
              <Field name="first_name" type="text" class="form-control" value="" :class="{'is-invalid': errors.first_name}" />
              <ErrorMessage name="first_name" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center col-12 mb-2">
              <label for="patronymic">Отчество:</label>
              <Field name="patronymic" type="text" class="form-control" value="" :class="{'is-invalid': errors.patronymic}"/>
              <ErrorMessage name="patronymic" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2">
              <label for="gender">Пол:</label>
              <br>
              <Field name="gender" type="radio" value="m" class="form-check-input" :class="{'is-invalid': errors.gender}"/>М 
              <Field name="gender" type="radio" value="f" class="form-check-input" :class="{'is-invalid': errors.gender}"/>Ж 
              <br>
              <ErrorMessage name="gender" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2">
              <label for="date_of_birth">Дата рождения:</label>
              <Field name="date_of_birth" type="date"  class="form-control" value="" :class="{'is-invalid': errors.date}"/>
              <ErrorMessage name="date_of_birth" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2 col-6">
              <label for="passport_series_and_number">Серия и номер паспорта:</label>
              <Field name="passport_series_and_number" type="text" class="form-control" value="" :class="{'is-invalid': errors.passport_series_and_number}"/>
              <ErrorMessage name="passport_series_and_number" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2 col-5">
              <label for="place_of_birth">Страна рождения:</label>
              <Field name="place_of_birth" type="text" class="form-control" value="" :class="{'is-invalid': errors.place_of_birth}"/>
              <ErrorMessage name="place_of_birth" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2">
              <label for="INN">ИНН:</label>
              <Field name="INN" type="text" class="form-control" value="" :class="{'is-invalid': errors.INN}"/>
              <ErrorMessage name="INN" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2">
              <label for="SNILS">СНИЛС:</label>
              <Field name="SNILS" type="text" class="form-control" value="" :class="{'is-invalid': errors.SNILS}"/>
              <ErrorMessage name="SNILS" class="error-feedback" />
            </div>
  
            <div class="form-group d-inline-flex align-items-center mb-2 col-5">
              <label for="email">Email:</label>
              <Field name="email" type="text" class="form-control"  value="" :class="{'is-invalid': errors.email}"  />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
 
            <div class="form-group d-inline-flex align-items-center mb-2 col-5">
              <label for="student_login">Логин студента:</label>
              <Field name="student_login" type="text" class="form-control" value="" :class="{'is-invalid': errors.student_login}"/>
              <ErrorMessage name="student_login" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2 col-5">
              <label for="enrollment_order">Приказ о зачислении:</label>
              <Field name="enrollment_order" type="text" class="form-control" value="" :class="{'is-invalid': errors.enrollment_order}"/>
              <ErrorMessage name="enrollment_order" class="error-feedback" />
            </div>
            <div class="form-group d-inline-flex align-items-center mb-2">
              <label for="enrolled_date">Дата зачисления:</label>
              <Field name="enrolled_date" type="date" class="form-control" value="" :class="{'is-invalid': errors.enrolled_date}"/>
              <ErrorMessage name="enrolled_date" class="error-feedback" />
            </div>
            <div class="d-flex flex-wrap">
            <div class="form-group d-inline-flex align-items-center mb-2">
              <label for="group_id">Группа:</label>
              
              <Select2 :class="{'form-control is-invalid': errors.group_id}" v-model="myValue" 
              :options="groups" 
              :settings=" { theme: 'bootstrap-5', width: '100%'}"
              
               />

               <Field  name="group_id" as="select" v-model="myValue" hidden>
                <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.text }}</option>
              </Field>
              <ErrorMessage name="group_id" class="error-feedback" />
            </div>

            <div class="form-group d-inline-flex align-items-center float-none mb-2 col-3">
              <label for="subgroup">Подгруппа:</label>
              <Field  name="subgroup" as="select" class="form-select">
                <option value="Нет">Нет</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Field>
              <ErrorMessage name="subgroup" class="error-feedback" />
              
            </div>

            <div class="form-group d-inline-flex align-items-center float-none mb-2 col-5">
              <label for="zachetka_number">Номер зачётки:</label>
              <Field name="zachetka_number" type="text" class="form-control" :class="{'is-invalid': errors.zachetka_number}"/>
              <ErrorMessage name="zachetka_number" class="error-feedback" />
              
            </div>

            <div class="form-group d-inline-flex align-items-center float-none mb-2 col-6">
              <label for="phonenumber">Номер телефона:</label>
              <Field name="phonenumber" type="text" class="form-control" :class="{'is-invalid': errors.phonenumber}"/>
              <ErrorMessage name="phonenumber" class="error-feedback" />
              
            </div>
            <div class="form-group d-inline-flex align-items-center float-none mb-2 col-8">
              <label for="phonenumber_rod">Номер телефона родителей:</label>
              <Field name="phonenumber_rod" type="text" class="form-control" :class="{'is-invalid': errors.phonenumber_rod}"/>
              <ErrorMessage name="phonenumber_rod" class="error-feedback" />
              
            </div>
           
          </div>
            <div class="form-group mt-3">
             
              <router-link to="/students" class="btn btn-secondary ml-2 float-start">Отмена</router-link>
              <button class="btn btn-primary btn-block float-end" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Добавить студента
              </button>
            </div>
          </div>
        </Form>
  
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
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

    name: "AddStudent",
    components: {
      Form,
      Field,
      ErrorMessage,

      
    },
    data() {
      const schema = yup.object().shape({
  last_name: yup.string().required('Требуется фамилия'),
  first_name: yup.string().required('Требуется имя'),
  patronymic: yup.string().required('Требуется отчество'),
  gender: yup.string().required('Требуется указать пол'),
  date_of_birth: yup.date().required('Требуется указать дату рождения'),
  passport_series_and_number: yup.string().required('Требуется серия и номер паспорта'),
  place_of_birth: yup.string().required('Требуется указать место рождения'),
  INN: yup.string().required('Требуется указать ИНН').matches(/^\d{12}$/, 'Некорректный ИНН'),
  SNILS: yup.string().required('Требуется указать СНИЛС').matches(/^\d{11}$/, 'Некорректный СНИЛС'),
  email: yup.string().required('Требуется электронная почта').email('Некорректный адрес электронной почты'),
  student_login: yup.string().required('Требуется указать логин студента'),
  enrollment_order: yup.string().required('Требуется указать приказ о зачислении'),
  enrolled_date: yup.date().required('Требуется указать дату зачисления'),
  group_id: yup.string().required('Требуется указать группу'),


});
  
      return {
        successful: false,
        loading: false,
        dataLoading:true,
        message: "",
        schema,
        groups: null,
        courses: [
        { id: 'Нет', text: 'Нет' },
        { id: '1', text: '1' },
        { id: '2', text: '2' },
      ],
        myValue: '',
      };
    },
    computed: {

    },
    mounted() {
    
    },
    methods: {

      async addStudent(student) {
        try {
          // запрос в psql
          this.loading=true;

          const response = await UserService.addStudent(student.last_name, student.first_name, student.patronymic, 
          student.gender, student.date_of_birth, student.passport_series_and_number, student.INN, student.SNILS, student.place_of_birth, student.email,
           student.student_login, student.enrollment_order, student.enrolled_date, student.group_id, student.subgroup, student.zachetka_number, student.phonenumber,student.phonenumber_rod);
          response.data;
          this.loading=false;
          this.successful=true;

          this.toast.success("Успешно добавили студента!");
        } catch (error) {
          this.message="Ошибка";
          this.toast.error("Ошибка добавления студента");
          console.error('Error updating student details:', error);
        }
      },


      async loadGroupsData() {
        try {
          const response = await UserService.getGroupsAsIdText(); 
          this.groups = Array.isArray(response.data) ? response.data : [response.data];
          this.dataLoading=false;
        } catch (error) {
          console.error('Error loading students data:', error);
        }
      },



    },

    created() {
    this.loadGroupsData();
    },
  };
  </script>

<style lang="scss" scoped>

.error-feedback{
  white-space: nowrap;
  margin-left:5px;
}

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