import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://195.93.252.168:5050/api/Query/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '"SuperHeroes"',{ headers: authHeader() } );
  }
/*
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
*/

// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ STUDENTS
  getAllStudents(){
    
    return axios.get(API_URL+"students", { headers: authHeader() });
  }
  deleteStudentById(student_id){
    const query = {
      query: `DELETE FROM students where "student_id" = '${student_id}'`,
    };

    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getAllFormattedStudents(){
    const query = {
      query: `SELECT 
      s.student_id,
      CONCAT_WS(' ', s.last_name, s.first_name, s.patronymic) AS full_name,
      CONCAT_WS('/', g.group_number, NULLIF(s.subgroup, '')) AS group_name,
      g.group_number,
      s.subgroup,
      TO_CHAR(s.enrolled_date, 'DD/MM/YYYY') AS formatted_enrolled_date,
      s.enrollment_order,
      TO_CHAR(s.date_of_birth, 'DD/MM/YYYY') AS formatted_date_of_birth,
      s.course,
      s.group_id
  FROM 
      students s
  JOIN 
      groups g ON s.group_id = g.group_id
  ORDER BY 
      full_name ASC;`,
    };

    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getStudentById(studentId){
    const query = {
      query: `SELECT
      *,
      TO_CHAR(date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
      TO_CHAR(enrolled_date, 'YYYY-MM-DD') AS enrolled_date
  FROM
      students
  WHERE
      student_id = ${studentId};`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateStudentById(studentId,first_name,last_name,patronymic,gender,date_of_birth,passport_series_and_number,INN,SNILS,place_of_birth,email,student_login,enrollment_order,enrolled_date, group_id,subgroup, zachetka_number, phone_number,phone_number_rod){
    const query = {
      query: `"first_name" = '${first_name}',
      "last_name" = '${last_name}',
      "patronymic" = '${patronymic}',
      "gender" = '${gender}',
      "date_of_birth" = '${date_of_birth}',
      "passport_series_and_number" = '${passport_series_and_number}',
      "INN" = '${INN}',
      "SNILS" = '${SNILS}',
      "place_of_birth" = '${place_of_birth}',
      "email" = '${email}',
      "student_login" = '${student_login}',
      "enrollment_order" = '${enrollment_order}',
      "enrolled_date" = '${enrolled_date}',
      "group_id" = '${group_id}',
      "subgroup" = '${subgroup}',
      "zachetka_number"= '${zachetka_number}',
      "phone_number"= '${phone_number}',
      "phone_number_rod"= '${phone_number_rod}'
  WHERE
      "student_id" = '${studentId}';`,
    };
    
    return axios.put(API_URL+"students", query, { headers: authHeader() });
  }
  
  addStudent(first_name,last_name,patronymic,gender,date_of_birth,passport_series_and_number,INN,SNILS,place_of_birth,email,student_login,enrollment_order,enrolled_date, group_id,subgroup,phone_number,phone_number_rod,zachetka_number){
    const query = {
      query: `INSERT INTO "students" (
        "first_name",
        "last_name",
        "patronymic",
        "gender",
        "date_of_birth",
        "passport_series_and_number",
        "INN",
        "SNILS",
        "place_of_birth",
        "email",
        "student_login",
        "enrollment_order",
        "enrolled_date",
        "group_id",
        "subgroup",
        "phone_number",
        "phone_number_rod",
        "zachetka_number"
    ) VALUES (
        '${first_name}',
        '${last_name}',
        '${patronymic}',
        '${gender}',
        '${date_of_birth}',
        '${passport_series_and_number}',
        '${INN}',
        '${SNILS}',
        '${place_of_birth}',
        '${email}',
        '${student_login}',
        '${enrollment_order}',
        '${enrolled_date}',
        '${group_id}',
        '${subgroup}',
        '${phone_number}',
        '${phone_number_rod}',
        '${zachetka_number}'
    );`,
    };

    return axios.post(API_URL, query, { headers: authHeader() });


  }
  getStudentsAsIdText(){
    const query = {
      query: `SELECT student_id AS id, 
      CONCAT_WS(' ',last_name, first_name,patronymic) AS text
      FROM "students" ORDER BY 
      text ASC;;`,
      };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getDepartamentsAsIdText(){
    const query = {
      query: `SELECT dep_id AS id, 
      dep_name AS text
      FROM "departaments" ORDER BY 
      text ASC;;`,
      };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getGroupsAsIdText(){
    const query = {
      query: `SELECT group_id AS id, group_number AS text
      FROM "groups" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getGroupsAsKOSTIL(){
    const query = {
      query: `SELECT group_number AS id, group_number AS text
      FROM "groups" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getProgramsAsIdText(){
    const query = {
      query: `SELECT id, program_name AS text
      FROM "programs" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getPermissionByTable(tablename){
    const query = {
      query: `SELECT p.*, r."RoleName"
      FROM "Permissions" AS p
      INNER JOIN "Roles" AS r ON p."RoleId" = r."RoleId"
      WHERE p."TableName" = '${tablename}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }


// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ DIRECTIONS 
  getAllDirections(){
    const query = {
      query: `SELECT * from directions ORDER BY 
      dir_name ASC;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getDirectionById(id){
    const query = {
      query: `SELECT * from directions where 
      dir_id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addDirection(dir_name,dir_code){
    const query = {
      query: `INSERT INTO "directions" (
        "dir_name",
        "dir_code"
    ) VALUES (
        '${dir_name}',
        '${dir_code}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateDirectionById(dir_id,dir_name,dir_code){
    const query = {
      query: `"dir_name" = '${dir_name}',
      "dir_code" = '${dir_code}'
  WHERE
      "dir_id" = '${dir_id}';`,
    };
    return axios.put(API_URL +"directions", query, { headers: authHeader() });
  }


  
// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ SUBJECTS
  getAllSubjects(){
    const query = {
      query: `SELECT * from subjects;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getSubjectById(id){
    const query = {
      query: `SELECT * from subjects where 
      subject_id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addSubject(subject_id, subject_name){
    const query = {
      query: `INSERT INTO "subjects" (
        "subject_id",
        "subject_name"
    ) VALUES (
        '${subject_id}',
        '${subject_name}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateSubjectById(subject_id, subject_name){
    const query = {
      query: `"subject_name" = '${subject_name}',
  WHERE
      "subject_id" = '${subject_id}';`,
    };
    return axios.put(API_URL +"subjects", query, { headers: authHeader() });
  }

  
// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ TEACHERS
  getAllTeachers(){
    const query = {
      query: `SELECT * from teachers;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getTeachersForSubject(subject_id){
    const query = {
      query: `SELECT 
      t.teacher_id, 
      t.first_name, 
      t.last_name, 
      t.patronymic 
    FROM 
      "teachers" t 
    JOIN 
      "employment" e 
    ON 
      t.teacher_id = e.teacher_id 
    WHERE 
      e.subject_id = '${subject_id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getSubjectsForTeacher(teacher_id){
    const query = {
      query: `SELECT 
        g.group_number, 
        s.subject_name, 
        t.last_name 
      FROM 
        workload as w 
      JOIN 
        groups as g 
      ON 
        w.group_id = g.group_id 
      JOIN 
        subjects as s 
      ON 
        w.subject_id = s.subject_id 
      JOIN 
        teachers as t 
      ON 
        t.teacher_id = w.teacher_id 
      WHERE 
        w.teacher_id = '${teacher_id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getTeacherById(id){
    const query = {
      query: `SELECT * from teachers where 
      teacher_id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addTeacher(teacher_id, first_name, last_name, patronymic){
    const query = {
      query: `INSERT INTO "teachers" (
        "teacher_id",
        "first_name"
        "last_name"
        "patronymic"
    ) VALUES (
        '${teacher_id}',
        '${first_name}',
        '${last_name}',
        '${patronymic}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateTeacherById(teacher_id, first_name, last_name, patronymic){
    const query = {
      query: `"first_name" = '${first_name}',
      "last_name" = '${last_name}',
      "patronymic" = '${patronymic}'
  WHERE
      "teacher_id" = '${teacher_id}';`,
    };
    return axios.put(API_URL +"teachers", query, { headers: authHeader() });
  }

  
// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ EMPLOYMENT
getAllEmployments(){
  const query = {
    query: `SELECT
    e.emp_id,
    e.teacher_id,
    t.first_name,
    t.last_name,
    t.patronymic,
    e.subject_id,
    s.subject_name   
  FROM 
    "employment" e
  JOIN
    "teachers" t
  ON
    t.teacher_id = e.teacher_id
  JOIN
    "subjects" s
  ON
    s.subject_id = e.subject_id  
    ;`,
  };
  return axios.post(API_URL, query, { headers: authHeader() });
}

getEmploymentById(id){
  const query = {
    query: `SELECT * from employment where 
    emp_id='${id}';`,
  };
  return axios.post(API_URL, query, { headers: authHeader() });
}

addEmployment(emp_id, teacher_id, subject_id){
  const query = {
    query: `INSERT INTO "employment" (
      "emp_id",
      "teacher_id"
      "subject_id"
  ) VALUES (
      '${emp_id}',
      '${teacher_id}',
      '${subject_id}'
  );`,
  };
  return axios.post(API_URL, query, { headers: authHeader() });
}

updateEmploymentById(emp_id, teacher_id, subject_id){
  const query = {
    query: `"teacher_id" = '${teacher_id}',
    "subject_id" = '${subject_id}'
WHERE
    "emp_id" = '${emp_id}';`,
  };
  return axios.put(API_URL +"teachers", query, { headers: authHeader() });
}


getAllWorkloads(){
  const query = {
    query: `SELECT * FROM workload`,
  };
  return axios.post(API_URL, query, { headers: authHeader() });
}

getWorkload(group_id){
  const query = {
    query: `SELECT * FROM workload
    WHERE
     "group_id" = '${group_id}'
    `,
  };
  return axios.post(API_URL, query, { headers: authHeader() });
}



editWorkload(wl_id, teacher_id){
  const query = {
    query: `UPDATE "workload"
    SET
      "teacher_id" = '${teacher_id}'
    WHERE
      "wl_id" = '${wl_id}'
    ;`,
  };
  return axios.post(API_URL, query, { headers: authHeader() });
}

addWorkload(group_id, subject_id, teacher_id){
  const query = {
    query: `INSERT INTO "workload" (
      "group_id",
      "subject_id",
      "teacher_id"
  ) VALUES (
      '${group_id}',
      '${subject_id}',
      '${teacher_id}'
  );`,
  };
  return axios.post(API_URL, query, { headers: authHeader() });
}


// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ PROFILES
  getAllProfiles(){
    const query = {
      query: `SELECT
      p.prof_id,
      p.prof_name,
      d.dir_id,
      d.dir_name,
      d.dir_code
  FROM
      "profiles" p
  JOIN
      "directions" d ON p.prof_dir_id = d.dir_id
      ORDER BY 
      p.prof_name ASC;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getProfileById(id){
    const query = {
      query: `SELECT * from profiles where 
      prof_id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addProfile(prof_dir_id, prof_name){
    const query = {
      query: `INSERT INTO "profiles" (
        "prof_dir_id",
        "prof_name"
    ) VALUES (
        '${prof_dir_id}',
        '${prof_name}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateProfileById(prof_id,prof_dir_id,prof_name){
    const query = {
      query: `"prof_dir_id" = '${prof_dir_id}',
      "prof_name" = '${prof_name}'
  WHERE
      "prof_id" = '${prof_id}';`,
    };
    return axios.put(API_URL +"profiles", query, { headers: authHeader() });
  }
  getDirectionsAsIdText(){
    const query = {
      query: `SELECT dir_id AS id, dir_code AS text
      FROM "directions" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getProfilesAsIdText(){
    const query = {
      query: `SELECT prof_id AS id, prof_name AS text
      FROM "profiles" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }


// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ GROUPS

  getAllGroups(){
    const query = {
      query: `SELECT
      g.group_id,
      g.group_number,
      g.course,
      g.magister,
      p.prof_name,
      d.dir_name,
      d.dir_code
  FROM
      "groups" AS g
  JOIN
      "profiles" AS p
  ON
      g.group_prof_id = p.prof_id
  JOIN
      "directions" AS d
  ON
      g.group_dir_id = d.dir_id  ORDER BY 
      g.group_number ASC;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getGroupById(id){
    const query = {
      query: `SELECT * from groups where 
      group_id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addGroup(group_dir_id, group_prof_id,group_number,course,magister){
    const query = {
      query: `INSERT INTO "groups" (
        "group_dir_id",
        "group_prof_id",
        "group_number",
        "course",
        "magister"
    ) VALUES (
        '${group_dir_id}',
        '${group_prof_id}',
        '${group_number}',
        '${course}',
        '${magister}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateGroupById(group_id, group_dir_id, group_prof_id,group_number,course,magister){
    const query = {
      query: `"group_dir_id" = '${group_dir_id}',
      "group_prof_id" = '${group_prof_id}',
      "group_number" = '${group_number}',
      "course" = '${course}',
      "magister" = '${magister}'
  WHERE
      "group_id" = '${group_id}';`,
    };
    return axios.put(API_URL +"groups", query, { headers: authHeader() });
  }
 
  getAllLgroups(){
    const query = {
      query: `SELECT
      *, g.id as lg_id
  FROM
      "l_groups" AS g
      join programs p ON g.group_program_id=p.id;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addLgroup(group_number,group_program_id,hours,start_date,end_date, people_count,table_data){

    let query0 = `
    INSERT INTO "l_groups" (
      "group_number",
      "group_program_id",
      "hours",
      "start_date",
      "end_date",
      "people_count"
  ) VALUES (
      '${group_number}',
      '${group_program_id}',
      '${hours}',
      '${start_date}',
      '${end_date}',
      '${people_count}'
  );
  `;


    table_data.forEach(entry => {
      query0 += `
      INSERT INTO "l_groups_day" (
          "day_id",
          "starttime",
          "endtime",
          "l_groups"
      ) VALUES (
          '${entry.day_id}',
          '${entry.starttime}',
          '${entry.endtime}',
          currval('l_groups_id_seq')
      );
      `;
  });


    const query = {
      query: query0,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateLgroupById(group_id,group_number,group_program_id,hours,start_date,end_date, people_count,table_data,table_new_rows){
    let query0 = `UPDATE l_groups SET
    "group_number" = '${group_number}',
      "group_program_id" = '${group_program_id}',
      "hours" = '${hours}',
      "start_date" = '${start_date}',
      "end_date" = '${end_date}',
      "people_count" = '${people_count}'
  WHERE
      "id" = '${group_id}';
    `;

    if(table_new_rows){
      query0+=`DELETE FROM l_groups_day WHERE l_groups='${group_id}';`
      table_data.forEach(entry => {
        query0 += `
        INSERT INTO "l_groups_day" (
            "day_id",
            "starttime",
            "endtime",
            "l_groups"
        ) VALUES (
            '${entry.day_id}',
            '${entry.starttime}',
            '${entry.endtime}',
            '${group_id}'
        );
        `;
    });
    }
    else{
    table_data.forEach(entry => {
      query0 += `
      UPDATE "l_groups_day" SET
          "day_id" ='${entry.day_id}',
          "starttime"='${entry.starttime}',
          "endtime"='${entry.endtime}'
    WHERE
          "l_groups_days_id"='${entry.l_groups_days_id}';
      `;
    });
  }
    const query = {
      query: query0,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getLgroupById(id){
    const query = {
      query: `SELECT *,TO_CHAR(end_date, 'YYYY-MM-DD') AS end_date,TO_CHAR(start_date, 'YYYY-MM-DD') AS start_date from l_groups where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getGDaysById(id){
    const query = {
      query: `SELECT * from 
      l_groups_day where l_groups='${id}'; `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }


  
// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ LISTENERS
  getAllListeners(){
    const query = {
      query: `SELECT
      *,
      CONCAT(l.lastname, ' ', l.name, ' ', l.surname) AS full_name,
      l.phone_number,
      l.email,
      l.id as list_id
     
  FROM
      "listeners" as l
      LEFT JOIN l_groups as lg ON l.group_id=lg.id;

      ;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getAllListenersWithoutGroup(){
    const query = {
      query: `SELECT
      *,
      CONCAT(l.lastname, ' ', l.name, ' ', l.surname) AS full_name, TO_CHAR(start_date , 'DD/MM/YYYY') AS start_date, TO_CHAR(end_date , 'DD/MM/YYYY') AS end_date,
      l.phone_number,
      l.email,
      l.id as list_id
     
  FROM
      "listeners" as l
      JOIN listener_wishes as lw ON l.id=lw.listener_id
      WHERE l.group_id IS NULL;

      ;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getListenerById(id){
    const query = {
      query: `SELECT *, TO_CHAR(issue_date , 'YYYY-MM-DD') AS issue_date,TO_CHAR(start_date , 'YYYY-MM-DD') AS start_date,TO_CHAR(end_date, 'YYYY-MM-DD') AS end_date from 
      listeners join listener_wishes on listeners.id=listener_wishes.listener_id where 
      id='${id}'; `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getWishDaysById(id){
    const query = {
      query: `SELECT * from 
      l_wish_days where listener_id='${id}'; `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addListener(name, surname,lastname, group_id,snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email, pc, hours,start_date, end_date,listener_id, wish_description, table_data){


    let query0 = `
    INSERT INTO "listeners" (
      "name",
      "surname",
      "lastname",
      group_id,
      "snils",
      "passport",
      "issued_by",
      "issue_date",
      "department_code",
      "registration_address",
      "phone_number",
      "email"
    ) VALUES (
      '${name}',
      '${surname}',
      '${lastname}',
      ${group_id},
      '${snils}',
      '${passport}',
      '${issued_by}',
      '${issue_date}',
      '${department_code}',
      '${registration_address}',
      '${phone_number}',
      '${email}'
    ) RETURNING id;

    INSERT INTO "listener_wishes" (
      "people_count",
      "hours",
      start_date,
      "end_date",
      "listener_id",
      "wish_description"
    ) VALUES (
      '${pc}',
      '${hours}',
      '${start_date}',
      '${end_date}',
      currval('listeners_id_seq'),
      '${wish_description}'
    );
  `;

  console.log(table_data);
  table_data.forEach(entry => {
    query0 += `
    INSERT INTO "l_wish_days" (
        "day_id",
        "starttime",
        "endtime",
        "listener_id"
    ) VALUES (
        '${entry.day_id}',
        '${entry.starttime}',
        '${entry.endtime}',
        currval('listeners_id_seq')
    );
    `;
});

const query = {
  query:query0
};
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addListenerWishes(pc, hours,start_date, end_date,listener_id, wish_description, suitable_days){


    const query = {
      query: `INSERT INTO "listener_wishes" (
        "people_count",
        "hours",
        "lastname",
        start_date,
        "end_date",
        "listener_id",
        "wish_description",
        "suitable_days"
    ) VALUES (
        '${pc}',
        '${hours}',
        '${start_date}',
        '${end_date}',
        '${listener_id}',
        '${wish_description}',
        ARRAY['${suitable_days}']
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateListenerById(id, name, surname,lastname, group_id, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email,
    pc, hours,start_date, end_date, wish_description, table_data, table_new_rows){



 let query0 = `UPDATE listeners SET
 "name" ='${name}',
"surname" ='${surname}',
"lastname"=  '${lastname}',
"group_id"=  ${group_id},
"snils"= '${snils}',
"passport"= '${passport}',
"issued_by"= '${issued_by}',
"issue_date"='${issue_date}',
"department_code"='${department_code}',
"registration_address"='${registration_address}',
"phone_number"='${phone_number}',
"email"='${email}'
WHERE
"id" = '${id}';

UPDATE listener_wishes SET
 "people_count" ='${pc}',
"hours" ='${hours}',
"start_date"=  '${start_date}',
"end_date"=  '${end_date}',
"wish_description"= '${wish_description}'
WHERE
"listener_id" = '${id}';


`;
if(table_new_rows){
  query0+=`DELETE FROM l_wish_days WHERE listener_id='${id}';`;
  table_data.forEach(entry => {
    query0 += `
    INSERT INTO "l_wish_days" (
        "day_id",
        "starttime",
        "endtime",
        "listener_id"
    ) VALUES (
        '${entry.day_id}',
        '${entry.starttime}',
        '${entry.endtime}',
        '${id}'
    );
    `
});
}
else{

table_data.forEach(entry => {
  query0 += `
  UPDATE "l_wish_days" SET
      "day_id" ='${entry.day_id}',
      "starttime"='${entry.starttime}',
      "endtime"='${entry.endtime}'
WHERE
      "l_wish_day_id"='${entry.l_wish_day_id}';
  `;
});
}
const query = {
  query:query0
};

    return axios.post(API_URL, query, { headers: authHeader() });
  }

  
// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ CONTRACTS
  getAllContracts(){
    const query = {
      query: `SELECT 
      *,
      contracts.id AS contract_id,
      listeners.id AS listener_id,
      CONCAT(listeners.lastname, ' ', listeners.name, ' ', listeners.surname) AS listener_full_name,
      listeners.snils AS listener_snils,
      listeners.passport AS listener_passport,
      listeners.issued_by AS listener_issued_by,
      listeners.issue_date AS listener_issue_date,
      listeners.department_code AS listener_department_code,
      listeners.registration_address AS listener_registration_address,
      listeners.phone_number AS listener_phone_number,
      listeners.email AS listener_email,
      payers.id AS payer_id,
      CONCAT(payers.lastname, ' ', payers.name, ' ', payers.surname) AS payer_full_name,
      payers.snils AS payer_snils,
      payers.passport AS payer_passport,
      payers.issued_by AS payer_issued_by,
      payers.issue_date AS payer_issue_date,
      payers.department_code AS payer_department_code,
      payers.registration_address AS payer_registration_address,
      payers.phone_number AS payer_phone_number,
      payers.email AS payer_email,
      programs.program_name,
      contracts.contr_number,
      contracts.id,TO_CHAR(listeners.issue_date, 'DD/MM/YYYY') AS listener_issue_date,
      TO_CHAR(start_date, 'DD/MM/YYYY') AS start_date,
      TO_CHAR(end_date, 'DD/MM/YYYY') AS end_date,
      TO_CHAR(date_enroll, 'DD/MM/YYYY') AS date_enroll,
      TO_CHAR(date_kick, 'DD/MM/YYYY') AS date_kick
  FROM 
      contracts
  JOIN
      listeners ON contracts.listener_id = listeners.id
  JOIN
      payers ON contracts.payer_id = payers.id
  JOIN
      programs ON contracts.program_id = programs.id;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getContractById(id){
    const query = {
      query: `SELECT * from contracts where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addContract(listener_id, payer_id,contr_number, program_id,cert_date, listened_hours, date_enroll, date_kick,group_to_move){

    const query = {
      query: `INSERT INTO contracts (listener_id, payer_id, contr_number, program_id,cert_date, listened_hours, date_enroll, date_kick,group_to_move)
      VALUES(
        '${listener_id}',
        '${payer_id}',
        '${contr_number}',
        '${program_id}',
        '${cert_date}',
        '${listened_hours}',
        '${date_enroll}',
        ${date_kick !== undefined ? `'${date_kick}'` : null},
        ${group_to_move}
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateContractById(id, listener_id, payer_id,contr_number, program_id){
    const query = {
      query: ` "listener_id" ='${listener_id}',
      "payer_id" ='${payer_id}',
      "contr_number"= '${contr_number}',
      "program_id"= '${program_id}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.put(API_URL +"contracts", query, { headers: authHeader() });
  }

  getPayersAsIdText(){
    const query = {
      query: `SELECT id AS id, CONCAT(lastname, ' ', name, ' ', surname) AS text
      FROM "payers" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getLgroupsAsIdText(){
    const query = {
      query: `SELECT id AS id, group_number AS text
      FROM "l_groups" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getListenersAsIdText(){
    const query = {
      query: `SELECT id AS id, CONCAT(lastname, ' ', name, ' ', surname) AS text
      FROM "listeners" ORDER BY 
      text ASC;`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  
// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ COURSE_WORK
  getAllCws(){
    const query = {
      query: `SELECT
      cw.course_work_id,
      cw.course_work_teacher_id,
      cw.course_work_theme,
      cw.course_work_student_id,
      cw.course_work_kafedra,
      CONCAT(s.last_name, ' ', s.first_name, ' ', s.patronymic) AS full_name,
      s.gender AS student_gender,
      s.date_of_birth AS student_date_of_birth,
      s.passport_series_and_number AS student_passport,
      s."INN" AS student_INN,
      s."SNILS" AS student_SNILS,
      s.place_of_birth AS student_place_of_birth,
      s.email AS student_email,
      s.student_login AS student_login,
      s.enrollment_order AS student_enrollment_order,
      s.enrolled_date AS student_enrolled_date,
      s.course AS student_course,
      s.group_id AS student_group_id,
      s.subgroup AS student_subgroup,
      d.dep_name,
      CONCAT(t.last_name, ' ', t.first_name, ' ', t.patronymic) AS full_name_t
  FROM
      course_work cw
  JOIN
      students s ON cw.course_work_student_id = s.student_id
  JOIN
      departaments d ON cw.course_work_kafedra=d.dep_id
  JOIN
      teachers t ON cw.course_work_teacher_id=t.teacher_id;
  
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getCwById(id){
    const query = {
      query: `SELECT * from course_work where 
      course_work_id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addCw(course_work_theme,course_work_teacher_id,course_work_student_id,course_work_kafedra,course_work_vipysk,course_work_year,course_work_ocenka){
    const query = {
      query: `INSERT INTO course_work (course_work_theme, course_work_teacher_id, course_work_student_id, course_work_kafedra,course_work_vipysk,course_work_year,course_work_ocenka)
      VALUES(
        '${course_work_theme}',
        '${course_work_teacher_id}',
        '${course_work_student_id}',
        '${course_work_kafedra}',
        '${course_work_vipysk}',
        '${course_work_year}',
        '${course_work_ocenka}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateCwById(id,course_work_theme,course_work_teacher_id,course_work_student_id,course_work_kafedra,course_work_vipysk,course_work_year,course_work_ocenka){
    const query = {
      query: ` "course_work_theme" ='${course_work_theme}',
      "course_work_teacher_id" ='${course_work_teacher_id}',
      "course_work_student_id"= '${course_work_student_id}',
      "course_work_kafedra"= '${course_work_kafedra}',
      "course_work_vipysk" ='${course_work_vipysk}',
      "course_work_year" ='${course_work_year}',
      "course_work_ocenka" ='${course_work_ocenka}'
  WHERE
      "course_work_id" = '${id}';`,
    };
    return axios.put(API_URL +"course_work", query, { headers: authHeader() });
  }
  
// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ PAYERS
  getAllPayers(){
    const query = {
      query: `SELECT
      CONCAT(lastname, ' ', name, ' ', surname) AS full_name,
      phone_number,
      email,
      id
  FROM
      payers;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getPayerById(id){
    const query = {
      query: `SELECT *, TO_CHAR(issue_date , 'YYYY-MM-DD') AS issue_date from payers where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addPayer(name, surname,lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email){
    const query = {
      query: `INSERT INTO "payers" (
        "name",
        "surname",
        "lastname",
        "snils",
        "passport",
        "issued_by",
        "issue_date",
        "department_code",
        "registration_address",
        "phone_number",
        "email"
    ) VALUES (
        '${name}',
        '${surname}',
        '${lastname}',
        '${snils}',
        '${passport}',
        '${issued_by}',
        '${issue_date}',
        '${department_code}',
        '${registration_address}',
        '${phone_number}',
        '${email }'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updatePayerById(id, name, surname,lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email){
    const query = {
      query: ` "name" ='${name}',
      "surname" ='${surname}',
      "lastname"=  '${lastname}',
      "snils"= '${snils}',
      "passport"= '${passport}',
      "issued_by"= '${issued_by}',
      "issue_date"='${issue_date}',
      "department_code"='${department_code}',
      "registration_address"='${registration_address}',
      "phone_number"='${phone_number}',
      "email"='${email}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.put(API_URL +"payers", query, { headers: authHeader() });
  }

  getAllCourses(){
    const query = {
      query: `SELECT
      c.course_id,
      c.course,
      c.group_id,
      g.group_number
  FROM
      "courses" c
  JOIN
      "groups" g ON c.group_id = g.group_id
      ORDER BY 
      c.course ASC;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  

  getCourseById(id){
    const query = {
      query: `SELECT * from courses where 
      course_id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addCourse(course, group_id){
    const query = {
      query: `INSERT INTO "courses" (
        "course",
        "group_id"
    ) VALUES (
        '${course}',
        '${group_id}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateCourseById(course_id,course,group_id){
    const query = {
      query: `"course" = '${course}',
      "group_id" = '${group_id}'
  WHERE
      "course_id" = '${course_id}';`,
    };
    return axios.put(API_URL +"courses", query, { headers: authHeader() });
  }



// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ PROGRAMS
  getAllPrograms(){
    const query = {
      query: `SELECT
      id,
      required_amount,
      program_name,
      hours,
      TO_CHAR(start_date , 'YYYY-MM-DD') AS start_date,
      TO_CHAR(end_date , 'YYYY-MM-DD') AS end_date
  FROM
    programs;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getProgramById(id){
    const query = {
      query: `SELECT *, TO_CHAR(start_date , 'YYYY-MM-DD') AS start_date, TO_CHAR(end_date , 'YYYY-MM-DD') AS end_date from programs where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  addProgram(required_amount, program_name,hours, start_date, end_date){
    const query = {
      query: `INSERT INTO "programs" (
        "required_amount",
        "program_name",
        "hours",
        "start_date",
        "end_date"
    ) VALUES (
        '${required_amount}',
        '${program_name}',
        '${hours}',
        '${start_date}',
        '${end_date}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getPaymentById(id){
    const query = {
      query: `SELECT *, TO_CHAR(date_40 , 'YYYY-MM-DD') AS date_40, TO_CHAR(expiration_date , 'YYYY-MM-DD') AS expiration_date from pay_graph where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  updateProgramById(id, required_amount, program_name,hours, start_date, end_date){
    const query = {
      query: `"required_amount" ='${required_amount}',
      "program_name" ='${program_name}',
      "hours"=  '${hours}',
      "start_date"= '${start_date}',
      "end_date"= '${end_date}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.put(API_URL +"programs", query, { headers: authHeader() });
  }


// ВЗАИМОДЕЙСТВИЕ С ТАБЛИЦЕЙ PAY_GRAPH   
  getAllPayments(){
    const query = {
      query: `SELECT
      *, TO_CHAR(expiration_date, 'DD/MM/YYYY') AS expiration_date, TO_CHAR(date_40, 'DD/MM/YYYY') AS date_40 from pay_graph p
      JOIN contracts c ON p.contract_id=c.id;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }


  //Аудитории
  getAuditAsIdText(){
    const query = {
      query: `SELECT aud_id AS id, number AS text
      FROM "auditorium";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getSubjectAsIdText(){
    const query = {
      query: `SELECT subject_id AS id, subject_name AS text
      FROM "subjects";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getContractsAsIdText(){
    const query = {
      query: `SELECT id AS id, contr_number AS text
      FROM "contracts";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getTeachersAsIdText(){
    const query = {
      query: `SELECT teacher_id AS id, 
      CONCAT_WS(' ',last_name, first_name,patronymic) AS text
      FROM "teachers" ORDER BY 
      text ASC;;`,
      };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updatePaymentById(id, contract_id, expiration_date,date_40, all_sum, deposited_amount, left_to_pay, bank){
    const query = {
      query: `"contract_id" ='${contract_id}',
      "expiration_date" ='${expiration_date}',
      "date_40"=  '${date_40}',
      "all_sum"= '${all_sum}',
      "deposited_amount"= '${deposited_amount}',
      "left_to_pay"= '${left_to_pay}',
      "bank"= '${bank}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.put(API_URL +"pay_graph", query, { headers: authHeader() });
  }
  addPayment(contract_id, 
    expiration_date, date_40, all_sum,deposited_amount,left_to_pay,bank){
    const query = {
      query: `INSERT INTO "pay_graph" (
        "contract_id",
        "expiration_date",
        "date_40",
        "all_sum",
        "deposited_amount",
        "left_to_pay",
        "bank"
    ) VALUES (
        '${contract_id}',
        '${expiration_date}',
        '${date_40}',
        '${all_sum}',
        '${deposited_amount}',
        '${left_to_pay}',
        '${bank}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getPaymentsAsIdText(){
    const query = {
      query: `SELECT id, contr_number AS text
      FROM "contracts" ORDER BY 
      text ASC;`,

    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }


  getDaysAsIdText(){
    const query = {
      query: `SELECT day_id AS id, dayofweek AS text
      FROM "days";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  savesSchedule(aud_id, day_id, subject_id,  teacher_id){
    
      const query = {
        query: `INSERT INTO "schedule" (
          "aud_id",
          "day_id",
          "subject_id",
          "teacher_id"
      ) VALUES (
          '${aud_id}',
          '${day_id}',
          '${subject_id}',
          '${teacher_id}'
      );`,
      };
      return axios.post(API_URL, query, { headers: authHeader() });
    }

  getAllAudit(){
      const query = {
        query: `SELECT
       c.schedule_id,
       a.number,
       a.type,
       a.count,
       s.subject_name,
       d.dayofweek,
       CONCAT_WS(' ', t.last_name, t.first_name, t.patronymic) AS full_name
       
    FROM
      schedule c
      join
      auditorium a on c.aud_id=a.aud_id
      join
      subjects s on c.subject_id=s.subject_id
      join
      days d on c.day_id=d.day_id
      join 
      teachers t on c.teacher_id=t.teacher_id;
    `,
      };
      return axios.post(API_URL, query, { headers: authHeader() });
    }

    getAuditById(scheduleId){
      const query = {
        query: `SELECT * from schedule where 
        schedule_id='${scheduleId}';`,
      };
      return axios.post(API_URL, query, { headers: authHeader() });
    }

    updateScheduleById(scheduleId,day_id,subject_id,teacher_id,aud_id){
      const query = {
        query: `"day_id = '${day_id}',
        subject_id = '${subject_id}',
        teacher_id = '${teacher_id}',
        aud_id = '${aud_id}'
    WHERE
        "schedule_id" = '${scheduleId}';`,
      };
      
      return axios.put(API_URL+"schedule", query, { headers: authHeader() });
    }

    deleteScheduleById(schedule_id){
      const query = {
        query: `DELETE FROM schedule where "schedule_id" = '${schedule_id}'`,
      };
  
      return axios.post(API_URL, query, { headers: authHeader() });
    }

  
      clearTempKIT() {
    const query = {
      query: `TRUNCATE "temp_KIT";`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  clearTempKITdolj() {
    const query = {
      query: `TRUNCATE "temp_KIT_dolj" RESTART IDENTITY CASCADE;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  clearTempKITdeg() {
    const query = {
      query: `TRUNCATE "temp_KIT_deg" RESTART IDENTITY CASCADE;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  clearTempKITstatus() {
    const query = {
      query: `TRUNCATE "temp_KIT_status" RESTART IDENTITY CASCADE;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  insertTempKIT(str) {
    const query = {
      query: `INSERT INTO "temp_KIT" (
        "name1",
        "name2",
        "name3",
        "dolj_id",
        "deg_id",
        "status_id") 
        VALUES 
        ${str}
    ;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  insertTempKITDolj(name) {
    const query = {
      query: `INSERT INTO "temp_KIT_dolj" (
        "dolj") 
        VALUES
        ${name}
    ;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  insertTempKITDeg(name) {
    const query = {
      query: `INSERT INTO "temp_KIT_deg" (
        "deg") 
        VALUES
        ${name}
    ;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  insertTempKITStatus(name) {
    const query = {
      query: `INSERT INTO "temp_KIT_status" (
        "status") 
        VALUES
        ${name}
    ;`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getTempData(){
    const query = {
      query: `SELECT
      t.name1,
      t.name2,
      t.name3,
      d.dolj,
      de.deg,
      s.status
      FROM 
        "temp_KIT" AS t
      JOIN 
        "temp_KIT_dolj" AS d
      ON
        t.dolj_id = d.id
      JOIN 
        "temp_KIT_deg" AS de
      ON
        t.deg_id = de.id
      JOIN 
        "temp_KIT_status" AS s
      ON
        t.status_id = s.id;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  
}

export default new UserService();
