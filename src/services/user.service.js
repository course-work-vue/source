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
  getAllStudents(){
    
    return axios.get(API_URL+"students", { headers: authHeader() });
  }

  getAllFormattedStudents(){
    const query = {
      query: `SELECT 
      s.student_id,
      CONCAT_WS(' ', s.last_name, s.first_name, s.patronymic) AS full_name,
      CONCAT(g.group_number, '/', s.subgroup) AS group_name,
      TO_CHAR(s.enrolled_date, 'DD.MM.YYYY') AS formatted_enrolled_date,
      s.enrollment_order,
      TO_CHAR(s.date_of_birth, 'DD.MM.YYYY') AS formatted_date_of_birth
  FROM 
      students s
  JOIN 
      groups g ON s.group_id = g.group_id
  ORDER BY 
      s.student_id ASC;`,
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

  updateStudentById(studentId,first_name,last_name,patronymic,gender,date_of_birth,passport_series_and_number,INN,SNILS,place_of_birth,email,student_login,enrollment_order,enrolled_date, course, group_id,subgroup){
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
      "course" = '${course}',
      "group_id" = '${group_id}',
      "subgroup" = '${subgroup}'
  WHERE
      "student_id" = '${studentId}';`,
    };
    
    return axios.put(API_URL+"students", query, { headers: authHeader() });
  }

  addStudent(first_name,last_name,patronymic,gender,date_of_birth,passport_series_and_number,INN,SNILS,place_of_birth,email,student_login,enrollment_order,enrolled_date, course, group_id,subgroup){
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
        "course",
        "group_id",
        "subgroup"
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
        '${course}',
        '${group_id}',
        '${subgroup}'
    );`,
    };

    return axios.post(API_URL, query, { headers: authHeader() });


  }

  getGroupsAsIdText(){
    const query = {
      query: `SELECT group_id AS id, group_number AS text
      FROM "groups";`,
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

  getAllDirections(){
    const query = {
      query: `SELECT * from directions;`,
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
      "directions" d ON p.prof_dir_id = d.dir_id;
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
      FROM "directions";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  getProfilesAsIdText(){
    const query = {
      query: `SELECT prof_id AS id, prof_name AS text
      FROM "profiles";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }


  getAllGroups(){
    const query = {
      query: `SELECT
      g.group_id,
      g.group_number,
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
      g.group_dir_id = d.dir_id;
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
  addGroup(group_dir_id, group_prof_id,group_number){
    const query = {
      query: `INSERT INTO "groups" (
        "group_dir_id",
        "group_prof_id",
        "group_number"
    ) VALUES (
        '${group_dir_id}',
        '${group_prof_id}',
        '${group_number}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateGroupById(group_id, group_dir_id, group_prof_id,group_number){
    const query = {
      query: `"group_dir_id" = '${group_dir_id}',
      "group_prof_id" = '${group_prof_id}',
      "group_number" = '${group_number}'
  WHERE
      "group_id" = '${group_id}';`,
    };
    return axios.put(API_URL +"groups", query, { headers: authHeader() });
  }
 
  getAllListeners(){
    const query = {
      query: `SELECT
      CONCAT(name, ' ', lastname, ' ', surname) AS full_name,
      phone_number,
      email,
      id
  FROM
      listeners;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }


  getListenerById(id){
    const query = {
      query: `SELECT *, TO_CHAR(issue_date , 'YYYY-MM-DD') AS issue_date from listeners where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addListener(name, surname,lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email){
    const query = {
      query: `INSERT INTO "listeners" (
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
        '${email}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateListenerById(id, name, surname,lastname, snils, passport, issued_by, issue_date, department_code, registration_address, phone_number, email){
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
    return axios.put(API_URL +"listeners", query, { headers: authHeader() });
  }


  getAllPayers(){
    const query = {
      query: `SELECT
      CONCAT(name, ' ', lastname, ' ', surname) AS full_name,
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



  
  getAllContracts(){
    const query = {
      query: `SELECT 
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
      contracts.required_amount,
      contracts.deposited_amount,
      TO_CHAR(contracts.expiration_date , 'DD-MM-YYYY') AS expiration_date
  FROM 
      contracts
  JOIN
      listeners ON contracts.listener_id = listeners.id
  JOIN
      payers ON contracts.payer_id = payers.id;
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }


  getContractById(id){
    const query = {
      query: `SELECT *, TO_CHAR(expiration_date , 'YYYY-MM-DD') AS expiration_date from contracts where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addContract(listener_id, payer_id,required_amount, expiration_date){
    const query = {
      query: `INSERT INTO contracts (listener_id, payer_id, required_amount, expiration_date)
      VALUES()
        '${listener_id}',
        '${payer_id}',
        '${required_amount}',
        '${expiration_date}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateContractById(id, listener_id, payer_id,required_amount, expiration_date){
    const query = {
      query: ` "listener_id" ='${listener_id}',
      "payer_id" ='${payer_id}',
      "required_amount"= '${required_amount}',
      "expiration_date"= '${expiration_date}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.put(API_URL +"contracts", query, { headers: authHeader() });
  }

  getPayersAsIdText(){
    const query = {
      query: `SELECT id AS id, CONCAT(lastname, ' ', name, ' ', surname) AS text
      FROM "payers";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  getListenersAsIdText(){
    const query = {
      query: `SELECT id AS id, CONCAT(lastname, ' ', name, ' ', surname) AS text
      FROM "listeners";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

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
      s.subgroup AS student_subgroup
  FROM
      course_work cw
  JOIN
      students s ON cw.course_work_student_id = s.student_id;
  
  `,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }


  getCwById(id){
    const query = {
      query: `SELECT *, TO_CHAR(expiration_date , 'YYYY-MM-DD') AS expiration_date from contracts where 
      id='${id}';`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }
  addCw(listener_id, payer_id,required_amount, expiration_date){
    const query = {
      query: `INSERT INTO contracts (listener_id, payer_id, required_amount, expiration_date)
      VALUES()
        '${listener_id}',
        '${payer_id}',
        '${required_amount}',
        '${expiration_date}'
    );`,
    };
    return axios.post(API_URL, query, { headers: authHeader() });
  }

  updateCwById(id, listener_id, payer_id,required_amount, expiration_date){
    const query = {
      query: ` "listener_id" ='${listener_id}',
      "payer_id" ='${payer_id}',
      "required_amount"= '${required_amount}',
      "expiration_date"= '${expiration_date}'
  WHERE
      "id" = '${id}';`,
    };
    return axios.put(API_URL +"contracts", query, { headers: authHeader() });
  }
  getStudentsAsIdText(){
    const query = {
      query: `SELECT student_id AS id, CONCAT(last_name, ' ', first_name, ' ', patronymic) AS text
      FROM "students";`,
    };
    
    return axios.post(API_URL, query, { headers: authHeader() });
  }

}

export default new UserService();