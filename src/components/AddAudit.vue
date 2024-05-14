<template>
  <div class="col col-xs-9 col-lg-12 mt-4 offset-md-1">
      <div class="col col-10 align-self-end">
          <table v-if="loading" class="table">
              <tbody>
              <tr v-for="n in subjects" :key="n">
                  <td><div class="skeleton skeleton-animate"></div></td>
                  <td><div class="skeleton skeleton-animate"></div></td>
                  <td><div class="skeleton skeleton-animate"></div></td>
                  <td><div class="skeleton skeleton-animate"></div></td>
                  <td><div class="skeleton skeleton-animate"></div></td>
                  <td><div class="skeleton skeleton-animate"></div></td>
              </tr>
              </tbody>
          </table>
          <div  v-else>
            <Form @submit="addToSchedule" :validation-schema="schema" >
              <div class="d-flex">
                  <!-- Выбор группы -->
                  <table class="table" id="table_teacher">
                <thead>
                  <tr><th>Преподаватель</th></tr>
                </thead>
                <tbody>
                  <tr v-for="teacher in teachers" :key="teacher.teacher_id">
                    <th 
                      @click="selectTeacher(teacher)" 
                    > 
                    {{ teacher.last_name }} 
                    </th>
                  </tr>
                </tbody>
              </table>
                   <!-- Расписание выбранного преподавателя -->
              <div v-if="selectedTeacher">
                <h5>Расписание преподавателя: {{ selectedTeacher.last_name }}</h5>
                <table class="table" id="table_tsch">
                  <thead>
                    <tr>
                      
                      <th>День недели</th>
                      <th>Пара</th>
                      <th>Группа</th>
                      <th>Предмет</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="scheduleItem in selectedTeacherSchedule" :key="scheduleItem.id">
                      <td>{{ scheduleItem.dayofweek }}</td>
                      <td>{{ scheduleItem.time }}</td>
                      <td>{{ scheduleItem.group_number }}</td>
                      <td @click="selectDiscipline(scheduleItem)">{{ scheduleItem.subject_name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div v-if="selectedAuditoriums">
                
                <table class="table" id="table_audit">
                  <h5>Список аудиторий:</h5>
                  
                  <tbody>
                    <tr v-for="auditorium in selectedAuditoriums" :key="auditorium.aud_id" 
                    v-bind:class="{ 'table-active' : auditorium === selectedAuditorium }">
                    <td @click="selectAuditorium(auditorium) "> 
                    {{ auditorium.number }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>

                 
              </div>
              <router-link to="/audits" class="btn btn-secondary ml-2 float-start">Отмена</router-link>
             <button class="btn btn-primary btn-block float-end" :disabled="loading">
               <span
                 v-show="loading"
                 class="spinner-border spinner-border-sm"
               ></span>
              Сохранить
             </button>
            </Form>
          </div>
          
          
      </div>
  </div>
</template>
  
<script>
import UserService from "../services/user.service";

export default {
  data() {
      return {
          groups: [

          ], // массив всех групп
          subjects: [ 

          ], // массив предметов
          teachers: [

          ], // массив преподов
          employment: [
              
          ], // связь многие-ко-многим преподы/предметы
          wl: [

          ],
          auditorium: [],
          selectedTeacherSchedule: [], // конечная связь
          rels: [], // связи группа+предмет / препод
          selected_group: -1,
          selected_subject: -1,
          selectedTeacher: null,
          selectedAuditoriums: null,
          saved_num: -1,
          saved_group: 0,
          saved_subject: 0,
          saved_teacher: 0,
          saved: false,
          loading: true,
          searchQuery: ''
      };
  },
  methods: {
      // грузим данные
      async loadGroupsData() {
          try {
              const response = await UserService.getAllGroups(); // Replace with your API endpoint
              this.groups = Array.isArray(response.data) ? response.data : [response.data];
              this.loading=false;
          } catch (error) {
          console.error('Error loading groups data:', error);
          }
      },
      async loadTeachersData() {
        try {
          const response = await UserService.getAllTeachers(); 
          this.teachers = Array.isArray(response.data) ? response.data : [response.data];
          this.dataLoading=false;
        } catch (error) {
          console.error('Error:', error);
        }
      },
     
      
      async selectTeacher(teacher) {
      this.selectedTeacher = teacher;
      this.loading = true;
      await this.loadTeacherSchedule(teacher.teacher_id);
    },

    async loadTeacherSchedule(teacherId) {
      try {
        const response = await UserService.getAllTeacherSchedule(teacherId); // Получить расписание преподавателя по его teacher_id
        this.selectedTeacherSchedule = Array.isArray(response.data) ? response.data : [response.data];
        this.loading = false;
      } catch (error) {
        console.error('Ошибка при загрузке расписания преподавателя:', error);
      }
    },
    
    async selectDiscipline(discipline) {
    this.selectedDiscipline = discipline;
    this.loadingAuditoriums = true;
    await this.loadAuditoriums();
  },

    async loadAuditoriums() {
    try {
      const response = await UserService.getAuditoriumsByDiscipline();
      this.selectedAuditoriums = Array.isArray(response.data) ? response.data : [response.data];
      this.loadingAuditoriums = false;
    } catch (error) {
      console.error('Ошибка при загрузке аудиторий:', error);
    }
  },

  async selectAuditorium(auditorium) {
    this.selectedAuditorium = auditorium;
  },
  
  


      


      // смотрим детали о группе
      viewGroupDetail(groupId) {
          this.$router.push(`/groups/${groupId}`);
      },

      viewRightsDetail(){
          this.$router.push(`/Rights/groups`);
      },

      

      
  },
  created() {
      const query = this.$route.query;
      this.currentPage = parseInt(query.page) || 1;
      this.searchQuery = query.search || '';
      this.loadGroupsData();
      this.loadTeachersData();
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

.ml-240px{
  margin-left: 240px;
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
tbody th{
  font-weight: normal;
}

table{
  margin: 2%;
  height: fit-content;
}

#table_group{
  width: 15%;
}
#table_audit{
  width: 35%;
  margin-left: 100px;
}
#table_teacher{
  width: 20%;
}

.bold{
  font-weight: bold !important;
}

.highlighted{
  background-color: lightblue;
}
</style>