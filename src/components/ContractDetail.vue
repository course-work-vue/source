<template>
  <div class="col-md-12 list">
    <div v-if="contract" >
      <Form @submit="updateContract" :validation-schema="schema" v-slot="{ errors }">
        
        <div >

          
          <div class="form-group">
            <label for="listener_id">Слушатели</label>
            
            <Select2 :class="{'form-control is-invalid': errors.listener_id}" v-model="editedContract.listener_id" 
            :options="listeners" 
            :settings=" { theme: 'bootstrap-5', width: '100%'}"
            
             />

             <Field  name="listener_id" as="select" v-model="editedContract.listener_id" hidden>
              <option v-for="listener in listeners" :key="listener.id" :value="listener.id">{{ listener.text }}</option>
            </Field>
            <ErrorMessage name="listener_id" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="payer_id">Плательщики</label>
            
            <Select2 :class="{'form-control is-invalid': errors.payer_id}" v-model="editedContract.payer_id" 
            :options="payers" 
            :settings=" { theme: 'bootstrap-5', width: '100%'}"
            
             />

             <Field  name="payer_id" as="select" v-model="editedContract.payer_id" hidden>
              <option v-for="payer in payers" :key="payer.id" :value="payer.id">{{ payer.text }}</option>
            </Field>
            <ErrorMessage name="payer_id" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="required_amount">Требуемая сумма</label>
            <Field name="required_amount" type="text" value="" class="form-control" :class="{'is-invalid': errors.required_amount}" v-model="editedContract.required_amount"/>
            <ErrorMessage name="required_amount" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="deposited_amount">Внесённая сумма</label>
            <Field name="deposited_amount" type="text" class="form-control" value="" :class="{'is-invalid': errors.deposited_amount}" v-model="editedContract.deposited_amount"/>
            <ErrorMessage name="deposited_amount" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="expiration_date">Дата окончания срока ожидания выплаты</label>
            <Field name="expiration_date" type="text" class="form-control" value="" :class="{'is-invalid': errors.expiration_date}" v-model="editedContract.expiration_date"/>
            <ErrorMessage name="expiration_date" class="error-feedback" />
          </div>

          <div class="form-group mt-3">
            <button class="btn btn-primary btn-block float-start" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Обновить контракт
            </button>
            <router-link to="/contracts" class="btn btn-secondary ml-2 float-end">Отмена</router-link>
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
        loading:false,
        contract: null, // заглушка для данных студента
        editedContract: null, // заглушка для новых данных студента
        listeners: null,
        payers: null

      };
    },
    methods: {
      // грузим студента из psql по id 
      async loadContractDetail() {
        const contractId = this.$route.params.contractId;
        try {
          const response = await UserService.getContractById(contractId);
          this.contract = response.data;
          // Клонирование объекта, для избежание редактирования данных сразу
          this.editedContract = { ...response.data };
        } catch (error) {
          console.error('Error loading contract details:', error);
        }
      },
      // Метод для обновления данных о студенте
      async updateContract() {
        try {
          // запрос в psql
          this.loading=true;

          const response = await UserService.updateContractById(this.contract.id, this.editedContract.listener_id, this.editedContract.payer_id, this.editedContract.required_amount, 
          this.editedContract.deposited_amount, this.editedContract.expiration_date);
          response.data;
          this.contract = { ...this.editedContract };
          this.loading=false;
          this.toast.success("Успешно обновили!");
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      },
      async loadListenersData() {
        try {
          const response = await UserService.getListenersAsIdText(); 
          this.listeners = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      },

      async loadPayersData() {
        try {
          const response = await UserService.getPayersAsIdText(); 
          this.payers = Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      }
    },
    created() {
      this.loadListenersData();
      this.loadPayersData();
      this.loadContractDetail();
     
    },
  };
  </script>

<style lang="scss" scoped>

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