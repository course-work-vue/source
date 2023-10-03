<template>
    <div class="col col-xs-9 col-lg-12 mt-4">
        <div class="col col-12">
            <div class="mb-3 col col-12">
                <div id="v-model-select" class="demo">
                    <select class="form-select w-25" v-model="selected_group">
                        <option disabled value="">Выберите группу</option>
                        <option v-for="group in groups" :key="group.group_id" :value=group>
                            {{ group.group_number }}
                        </option>
                    </select>
                    <div v-if="selected_group">Выбрана {{ selected_group.group_number }} группа, направление {{ selected_group.dir_code }}</div>
                </div>
                <!-- <div class="col col-3 float-end">
                    <input class="form-control" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..."> 
                </div> -->
            </div>
            <!-- список студентов -->
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
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                </table>



                <table class="table">
                    <!-- таблица -->
                    <thead>
                        <!-- колонки -->
                        <tr>
                            <th>Дисциплина</th>
                            <th>Лекции</th>
                            <th>Лабы</th>
                            <th>Практики</th>
                        </tr>
                    </thead>
                    <!-- тело таблицы -->
                    <tbody>
                        <tr v-for="subject in subjects" :key="subject.subject_id">
                            <th>{{ subject.subject_name }}</th>
                            <th>
                                <select class="form-select" v-model="selected_teacher_lc[subject.subject_id]">
                                    <option disabled value="">Выберите преподавателя</option>
                                    <option v-for="teacher in teachersForSub(subject.subject_id)" :key="teacher.teacher_id">
                                        {{ this.teachers[teacher].teacher_name }}
                                    </option>
                                </select>
                            </th>
                            <th>
                                <select class="form-select" v-model="selected_teacher_lab[subject.subject_id]">
                                    <option disabled value="">Выберите преподавателя</option>
                                    <option v-for="teacher in teachersForSub(subject.subject_id)" :key="teacher.teacher_id">
                                        {{ this.teachers[teacher].teacher_name }}
                                    </option>
                                </select>
                            </th>
                            <th>
                                <select class="form-select" v-model="selected_teacher_pr[subject.subject_id]">
                                    <option disabled value="">Выберите преподавателя</option>
                                    <option v-for="teacher in teachersForSub(subject.subject_id)" :key="teacher.teacher_id">
                                        {{ this.teachers[teacher].teacher_name }}
                                    </option>
                                </select>
                            </th>
                        </tr>
                
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
    
<script>
import UserService from "../services/user.service";

export default {
    data() {
        return {
            selected_group: '',
            groups: [

            ], // массив всех групп
            subjects: [
                {
                    subject_id: 0,
                    subject_name: "Math"
                },
                {
                    subject_id: 1,
                    subject_name: "Comp Scie"
                },
                {
                    subject_id: 2,
                    subject_name: "Web"
                },
                {
                    subject_id: 3,
                    subject_name: "Foreign"
                },
                {
                    subject_id: 4,
                    subject_name: "Assembler"
                },
            ], // массив предметов
            teachers: [
                {
                    teacher_id: 0,
                    teacher_name: "John"
                },
                {
                    teacher_id: 1,
                    teacher_name: "Alexa"
                },
                {
                    teacher_id: 2,
                    teacher_name: "Ivan"
                },
                {
                    teacher_id: 3,
                    teacher_name: "Rebecca"
                },
                {
                    teacher_id: 4,
                    teacher_name: "Henry"
                },
                {
                    teacher_id: 5,
                    teacher_name: "Steve"
                },
            ], // массив преподов
            teachers_subs: [
                {
                    teacher_id: 0,
                    subject_id: 0
                },
                {
                    teacher_id: 0,
                    subject_id: 1
                },
                {
                    teacher_id: 0,
                    subject_id: 2
                },
                {
                    teacher_id: 1,
                    subject_id: 1
                },
                {
                    teacher_id: 2,
                    subject_id: 0
                },
                {
                    teacher_id: 2,
                    subject_id: 2
                },
                {
                    teacher_id: 3,
                    subject_id: 3
                },
                {
                    teacher_id: 4,
                    subject_id: 0
                },
                {
                    teacher_id: 5,
                    subject_id: 2
                },
                {
                    teacher_id: 1,
                    subject_id: 4
                },
                {
                    teacher_id: 2,
                    subject_id: 4
                },
            ], // связь многие-ко-многим преподы/предметы
            selected_teacher_lc: [],
            selected_teacher_lab: [],
            selected_teacher_pr: [],
            loading: true,
            searchQuery: ''
        };
    },
    methods: {
        filterGroups() {
            const queryString = this.searchQuery.toLowerCase();
            return this.groups.filter(group => {
                return (
                    String(group.group_id).toLowerCase().includes(queryString) ||
                    String(group.group_number).toLowerCase().includes(queryString) ||
                    String(group.prof_name).includes(queryString)  ||
                    String(group.dir_name).includes(queryString)  ||
                    String(group.dir_code).includes(queryString) 
                );
            });
        },

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

        // смотрим детали о группе
        viewGroupDetail(groupId) {
            this.$router.push(`/groups/${groupId}`);
        },

        viewRightsDetail(){
            this.$router.push(`/Rights/groups`);
        },

        contains(obj, list) {
            var x;
            for (x in list) {
                if (list[x] === obj) {
                    return true;
                }
            }
            return false;
        },

        teachersForSub(sub) {
            var ts = []
            
            this.teachers_subs.forEach(function(entry){
                if (sub == entry.subject_id){
                    ts.push(entry.teacher_id)
                }
            });
            return ts;
            }
    },
    created() {
        const query = this.$route.query;
        this.currentPage = parseInt(query.page) || 1;
        this.searchQuery = query.search || '';
        this.loadGroupsData();
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