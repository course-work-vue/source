<template>
    <div class="col col-xs-9 col-lg-12 mt-4 offset-md-1">
        <div class="col col-10 align-self-end">
            <div class="col col-10 align-self-end">
                <div class="d-flex col-2 mb-2">
                    <select 
                        class="form-select col-2 mr-2" 
                        v-model.number="selected_course" 
                        @change="
                        this.loadSubjectsData(this.selected_dir.dirCode)
                        this.loadGroupsData(this.selected_dir.dirId);
                        " 
                        value=1
                    >
                        <option value=1>1 курс</option>
                        <option value=2>2 курс</option>
                        <option v-if="isMag=='0'" value=3>3 курс</option>
                        <option v-if="isMag=='0'" value=4>4 курс</option>
                    </select>
                    
                    <div class="col-2"></div>
                    
                    <select 
                        class="form-select col-2" 
                        v-model.number="selected_sem" 
                        value=1
                        @change="
                            this.loadSubjectsData(this.selected_dir.dirCode);    
                            this.loadGroupsData(this.selected_dir.dirId);
                        "
                    >
                        <option value=1>1 семестр</option>
                        <option value=2>2 семестр</option>
                    </select>
                </div>

                <div class="d-flex col-6" @click="this.loadDirsData()">
                    <div class="">
                        <input class="form-check-input m-1" type="radio" name="magistracy" id="magistracyYes" value='1' v-model="isMag">
                        <label class="form-check-label" for="magistracyYes">
                        Магистратура
                        </label>
                    </div>
                    <div class="col-1"></div>
                    <div class="">
                        <input class="form-check-input m-1" type="radio" name="magistracy" id="magistracyNo" value='0' v-model="isMag" checked>
                        <label class="form-check-label" for="magistracyNo">
                        Бакалавриат
                        </label>
                    </div>
                </div>
            </div>
            <div class="d-flex col-10">
                <!-- Выбор направления -->
                <table class="table col-2" v-if="this.dir_loaded" id="table_dirs">
                    <thead>
                        <tr><th>Направление</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="dir in dirs" :key="dir.dir_id">
                            <th
                                @click="
                                    this.selected_dir = dir; 
                                    this.loadSubjectsData(dir.dirCode);
                                    this.loadGroupsData(dir.dirId);
                                "
                                v-bind:class="{ 'table-active': this.selected_dir.dirId == dir.dirId }"
                            >
                                {{ dir.dirCode }}
                            </th>
                        </tr>
                    </tbody>
                </table>
                
                <!-- Выбор предмета -->
                <table class="table col-4" v-if="this.sub_loaded" id="table_subject">
                    <thead>
                        <tr><th>Предмет</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="subject in this.subjects" :key="subject.subject_id">
                            <th
                                @click="
                                    this.selected_subject = subject;
                                    this.findSubject(subject);
                                    this.groups_and_teachers = 0;
                                    // console.log(this.selected_subject_obj);
                                    
                                "
                                v-bind:class="{ 'table-active': this.selected_subject == subject }"
                            >
                            {{ subject }}
                            </th>
                        </tr>
                    </tbody>
                </table>

                <!-- Выбор группы -->
                <table class="table col-1" v-if="this.group_loaded" id="table_group">
                    <thead>
                        <tr><th>Группа</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="(group) in this.groups" :key="group.groupId">
                            <th
                                @click="
                                    this.selected_group = group.groupId; 
                                    this.selected_group_obj = group;
                                    // console.log(selected_group_obj);
                                    this.loadTeachersData(group);
                                "


                                v-bind:class="{ 
                                    'table-active': this.selected_group == group.groupId, 
                                    // 'text-success bold': this.selected_subject_id != -1 
                                }"
                            >
                            <div class="d-flex">
                                {{ group.groupNumber }}
                                <div class="m-1 mt-0 mb-0 text-black text-opacity-25" v-if="true">
                                    <!-- {{ this.groups_and_teachers }} -->
                                </div>
                            </div>
                            </th>
                        </tr>
                    </tbody>
                </table>

                <!-- Выбор преподавателя -->
                <table class="table table-sm col-4" v-if="this.teacher_loaded" id="table_teacher">
                    <thead>
                        <tr><th>Преподаватель</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="teacher in this.teachers" :key="teacher.teacherId">
                            <th
                                @click="
                                    this.selected_teacher = teacher.teacherId;
                                    this.selected_teacher_obj = teacher;    
                                "
                                v-bind:class="{ 
                                    'table-active': this.selected_teacher == teacher.teacherId, 
                                    'table-success': teacher.teacherId == this.marked_teacher.teacherId
                                }"
                            >
                            <!-- {{ teacher.teacherId }}
                            {{ this.marked_teacher.teacherId }} -->
                            {{ teacher.lastName }}
                            <!-- {{ this.teacher_load[index].length }}/5 час -->
                            <!-- при length жалуется на undefined -->
                            </th>
                        </tr>
                    </tbody>
                </table>
                
                
            </div> 
            <div>
                <button v-if="selected_teacher != -1" class="btn btn-primary btn-block" @click="
                    saveRel();
                    ">
                    Сохранить связь
                </button>
                <transition name="fade">
                    <div 
                        :class="{
                            alert_success: not_suc,
                            alert_attention : not_upd,
                            alert_error : not_ex
                        }"
                        
                        class="alert col-4"
                        v-if="this.showNotification"
                    >
                        {{ this.notify_text }}
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
    
<script>
import UserService from "../services/user.service";

export default {
    data() {
        return {
            selected_course: 1,
            selected_sem: 1,
            isMag: false,
            dirs: [],
            groups: [], // массив всех групп
            subjects: [], // массив предметов
            teachers: [], // массив преподов
            groups_and_teachers: 0,
            tgz: [],
            wl: [],
            teacher_load: [], // нагрузка на препода
            selected_dir: {},
            selected_group: -1,
            selected_group_obj: null,
            selected_subject: {},
            selected_subject_obj: null,
            selected_subject_id : 0,
            selected_teacher: -1,
            selected_teacher_obj: null,
            marked_teacher: 0,
            dir_loaded: false,
            sub_loaded: false,
            group_loaded: false,
            teacher_loaded: false,
            saved_num: -1,
            saved_group: 0,
            saved_subject: 0,
            saved_teacher: 0,
            saved: false,
            t_loading: true,
            s_loading: true,
            wl_loading: true,
            loading: true,
            notify_text: '123',
            showNotification: false,
            searchQuery: '',
            not_suc: false,
            not_upd: false,
            not_ex: false
        };
    },
    methods: {
        // грузим данные
        async loadDirsData() {
            try {
                const response = await UserService.getAllDirections(); // Replace with your API endpoint
                this.dirs = Array.isArray(response.data) ? response.data.filter(dir => dir.magister == this.isMag) : [response.data.filter(dir => dir.magister == this.isMag)];
                this.loading = false;
                this.dir_loaded = true;
                this.sub_loaded = false;
                this.group_loaded = false;
                this.teacher_loaded = false;
                // console.log(this.dirs);
                // console.log(this.isMag);
            } catch (error) {
                console.error('Error loading groups data:', error);
            }
        },
        async loadTeacherGruz(){
            try {
                const response = await UserService.getAllTeachGruz(); // Replace with your API endpoint
                this.tgz = Array.isArray(response.data) ? response.data : [response.data];
            } catch (error) {
                console.error('Error loading tgz data:', error);
            }
        },
        async loadSubjectsData(dirCode) {
            if (dirCode)
                try {
                    this.sub_loaded = false;
                    // console.log(1);
                    // Фильтруем массив "tgz" по полям "codeNapr", "kurs" и "semestr", чтобы получить только объекты, соответствующие переданным параметрам
                    const filteredTgz = this.tgz.filter(subject => subject.codeNapr === dirCode && subject.kurs === this.selected_course && subject.semestr === this.selected_sem);

                    // Получаем уникальные значения поля "disName" из отфильтрованного массива
                    const uniqueDisNames = [...new Set(filteredTgz.map(subject => subject.disName))];

                    // Записываем уникальные значения в массив "subjects"
                    this.subjects = uniqueDisNames;

                    
                    // console.log(2);
                    this.sub_loaded = true;
                    this.group_loaded = false;
                    this.teacher_loaded = false;

                    // console.log("curs: ", this.selected_course);
                    // console.log("sem: ", this.selected_sem);
                    // console.log(this.subjects);
                } catch (error) {
                    console.error('Error loading subjects data:', error);
                }
        },
        async findSubject(subName) {
            try {
                const response = await UserService.getAllSubjects();
                const subjects = Array.isArray(response.data) ? response.data : [response.data];

                // Находим объект, у которого поле "subjectName" равно параметру "subName"
                const subject = subjects.find(subject => subject.subjectName === subName);
                
                this.selected_subject_obj = subject
                this.selected_subject_id = subject ? subject.subjectId : null;
                // console.log(subject);
                // console.log(this.selected_subject_obj);
                
                this.loadTeachersData();

            } catch (error) {
                console.error('Error loading subjects data:', error);
            }
        },

        async loadGroupsData(dir_id) {
            if (dir_id)
            try {
                const response = await UserService.getAllGroups(); // Replace with your API endpoint
                this.groups = Array.isArray(response.data) ? response.data : [response.data];

                // Фильтруем массив "groups" по полю "course", чтобы получить только группы, соответствующие выбранному курсу
                this.groups = this.groups.filter(group => 
                    (group.course === this.selected_course) && (group.groupDirId == dir_id)
                );

                this.group_loaded = true;
                this.teacher_loaded = false;
                // console.log(this.groups);
            } catch (error) {
                console.error('Error loading groups data:', error);
            }
        },
        async loadTeachersData(group) {
            if(this.selected_subject_id && this.selected_group_obj)
                try {
            
                    const response = await UserService.getAllTeachers(); // Replace with your API endpoint
                    this.teachers = Array.isArray(response.data) ? response.data : [response.data];
                    // console.log(this.teachers);

                    // Создаем список уникальных значений поля "fam" из объектов массива "tgz", которые соответствуют выбранному предмету
                    const tmp_teach = [...new Set(this.tgz.filter(subject => subject.disName === this.selected_subject).map(subject => subject.fam))];

                    // Фильтруем массив "response" по полю "lastName", чтобы получить только преподавателей, которые преподают выбранный предмет
                    // console.log(this.teachers);
                    // console.log(tmp_teach);
                    this.teachers = this.teachers.filter(teacher => tmp_teach.includes(teacher.lastName));
                    // this.marked_teacher = this.findWlID(this.selected_group, this.selected_subject_id);

                    // console.log(this.teachers);
                    if (group){
                        
                        this.marked_teacher = await this.loadWorkloads(group);
                    }
                    // console.log(this.wl);
                } catch (error) {
                    console.error('Error loading teachers data:', error);
                }
        },
        async loadWorkloads(group){
            try {
                const response = await UserService.getAllWorkloads(); // Replace with your API endpoint
                // console.log(response.data);
                this.wl = Array.isArray(response.data) ? response.data : [response.data];
                // console.log(this.wl);
                // console.log(this.teacher_loaded);

                if (group) {
                    this.teacher_loaded = true;
                    return this.whosTeacher(group);
                }
                this.teacher_loaded = true;
                
            } catch (error) {
                console.error('Error loading workloads data:', error);
            }
        },

        async saveRel(){
            console.log('sel_gr : ' + this.selected_group);
            console.log('sel_su : ' + this.selected_subject_id);
            let tmp = await this.findWl(this.selected_group, this.selected_subject_id);
            console.log(tmp);
            if (tmp == -1){
                UserService.addWorkload(this.selected_group, this.selected_subject_id, this.selected_teacher, this.selected_group_obj, this.selected_subject_obj, this.selected_teacher_obj);
                // console.log(this.findWl(this.selected_group, this.selected_subject_id));
                // console.log(this.selected_teacher);
                this.notify_text = 'Преподаватель добавлен';
                this.not_suc = true;
                this.not_upd = false;
                this.not_ex = false;
                
                this.teacher_loaded = false;
                this.loadTeachersData(this.selected_group_obj);
            }
            else if (tmp != this.selected_teacher){
                console.log('cur_teacher = ' + tmp);
                console.log('selected = ' + this.selected_teacher);
                var wlid = await this.findWlID(this.selected_group, this.selected_subject_id);
                console.log('wlid = ' + wlid);
                UserService.editWorkload(wlid, this.selected_group, this.selected_subject_id, this.selected_teacher, this.selected_group_obj, this.selected_subject_obj, this.selected_teacher_obj);
                // console.log(this.findWl(this.selected_group, this.selected_subject_id));
                // console.log(this.selected_teacher);
                this.notify_text = 'Преподаватель обновлен';
                this.not_suc = false;
                this.not_upd = true;
                this.not_ex = false;
                
                this.teacher_loaded = false;
                this.loadTeachersData(this.selected_group_obj);
            }
            else {
                console.log("Такая запись уже есть");
                this.notify_text = 'Преподаватель уже назначен';
                this.not_suc = false;
                this.not_upd = false;
                this.not_ex = true;
                this.showNotification = true; // Показать уведомление
                setTimeout(() => {
                    this.showNotification = false; // Скрыть уведомление через 3 секунды
                }, 3000
            );
                return;
            }
            // console.log(this.not_suc);
            // console.log(this.not_upd);
            // console.log(this.not_ex);
            this.loadTeachersData();
            while (this.loading == true && this.wl_loading == true){
                this.findWl(this.selected_group, this.selected_subject_id);
            }
            this.saved = true;

            this.showNotification = true; // Показать уведомление
            setTimeout(() => {
                this.showNotification = false; // Скрыть уведомление через 3 секунды
                }, 3000
            );
        },

        async findWl(group_id, subject_id){
            var i;
            // console.log('FINDING IN:');
            // console.log(this.wl);
            for (i in this.wl) {
                // console.log('FINDING IN:');
                // console.log('Group in wl: ' + this.wl[i].groupId);
                // console.log('Group in find: ' + group_id);
                // console.log(this.wl[i]);
                if (this.wl[i].groupId == group_id) {
                    if (this.wl[i].subjectId == subject_id) 
                        // console.log('FOUND: ' + this.wl[i].teacherId);
                        return this.wl[i].teacherId;
                }
            }
            
            return -1;
        },

        async findWlID(group_id, subject_id){
            var i;
            for (i in this.wl) {
                if (this.wl[i].groupId == group_id) {
                    if (this.wl[i].subjectId == subject_id) 
                        // console.log(this.wl[i]);
                        return this.wl[i].wlId;
                }
            }
            this.s_loading = false;
            return 0;
        },

        findWlTeacher(group_id, subject_id){
            var i;
            for (i in this.wl) {
                if (this.wl[i].groupId == group_id) {
                    if (this.wl[i].subjectId == subject_id) {
                        console.log(this.wl[i]);
                        return this.wl[i].teacherId;
                    }
                }
            }
            // console.log(0);
            return 0;
        },


        whosTeacher(group_obj){
            var marked_id = this.findWlTeacher(group_obj.groupId, this.selected_subject_id);
            // console.log(9999);
            if (marked_id){
                // console.log(marked_id);
                // console.log(this.teachers);
                var answ = 0;
                this.teachers.forEach(function(teacher){
                    if (teacher.teacherId == marked_id){
                        answ = teacher;
                    }
                })
                return answ;
            }
            return 0;
        },


        // СНИЗУ ЛЕГАСИ КОД
        
        async loadGroups(dir_id){
            try {
                const response = await UserService.getGroupByDir(dir_id); // Replace with your API endpoint
                this.groups = Array.isArray(response.data) ? response.data : [response.data];
                this.s_loading=false;
            } catch (error) {
                console.error('Error loading employments data:', error);
            }
        },
        
        async loadEmploymentData() {
            try {
                const response = await UserService.getAllEmployments(); // Replace with your API endpoint
                this.employment = Array.isArray(response.data) ? response.data : [response.data];
                this.loading=false;
            } catch (error) {
                console.error('Error loading employments data:', error);
            }
        },
        
        async loadTeacherLoad(teachers){
            try {
                var arr = [];
                for (let index = 0; index < teachers.length; index++) {
                    const element = teachers[index];
                    const response = await UserService.getSubjectsForTeacher(element.teacher_id); // Replace with your API endpoint
                    var item = Array.isArray(response.data) ? response.data : [response.data];
                    
                    item == "Пустой вывод." ? arr.push([]) : arr.push(item);
                    // console.log(item);
                }
                //console.log(arr);
                this.teacher_load = arr;
                this.loading=false;
                this.t_loading = false;
            } catch (error) {
                console.error('Error loading employments data:', error);
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
            this.employment.forEach(function(entry){
                if (sub == entry.subject_id){
                    ts.push(entry);
                }
            });
            return ts;
        },
        
        

        

        loadData(){
            this.loadDirsData();
            this.loadTeacherGruz();
            // this.loadGroupsData();
            // this.loadSubjectsData();
            // this.loadEmploymentData();
            // this.loadWorkloads();
        },

        reloadData(){
            if (this.teacher_loaded) {
                console.log(this.teacher_loaded);
            } else if (this.group_loaded){
                console.log(this.group_loaded);
            } else if (this.sub_loaded){
                console.log(this.sub_loaded);
            } else {
                console.log(this.dir_loaded);
            }
            this.loadWorkloads();
        }
    },
    created() {
        const query = this.$route.query;
        this.currentPage = parseInt(query.page) || 1;
        this.searchQuery = query.search || '';
        this.loadData();
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

#table_dirs{
    width: 20%;
}

#table_group{
    width: 15%;
}
#table_subject{
    width: 35%;
}
#table_teacher{
    width: 35%;
}

.bold{
    font-weight: bold !important;
}

.skelet{
    width: 25%;
}
.form-check-input:checked{
  background-color: rgb(68,99,52);
    border: none;
}
.alert {
    padding: 15px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.alert_success {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
}

.alert_attention {
    color: #76763c;
    background-color: #ecf0d8;
    border-color: #ecf0d8;
}

.alert_error {
    color: #763c3c;
    background-color: #f0d8d8;
    border-color: #f0d8d8;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active в версии 2.1.8+ */ {
  opacity: 0;
}



</style>