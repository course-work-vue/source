<template>
  <div class="container">
    <p>
      <input type="file" @change="onFileChange">
    </p>
    <p>

    </p>
  </div>
</template>

<script>

import readXlsxFile from 'read-excel-file'
import { readSheetNames } from 'read-excel-file';

import UserService from "../services/user.service";

export default {
  name: 'Profile',

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {

    onFileChange(event) {

    let xlsxfile = event.target.files ? event.target.files[0] : null;
    let flagSostav = false
    let flagRaspr = false

    const p = new Promise(function(resolve) {
      readSheetNames(xlsxfile).then((sheetNames) => {
        for(let i = 0;i<sheetNames.length;i++) {
          if (sheetNames[i]=="Состав КИТ"){
            flagSostav=true
         }
         if (sheetNames[i]=="Распределение"){
           flagRaspr=true
         }
         if (i==sheetNames.length-1)
          resolve()
        }
      })
    })

    let name1 = []
    let name2 = []
    let name3 = []
    let dolj = []
    let deg = []
    let status = []
    let dolj_id, deg_id, status_id, insFlag1, insFlag2, insFlag3
    let temp = []
    let k = 0
    let doljStr = "", degStr = "", statusStr = "", mainStr = ""
    let startStr = 0
    
    let nameR1 = []
    let nameR2 = []
    let nameR3 = []
    let tempR = []


    p.then(() => {

      if (flagSostav==true||flagRaspr==true) {

        if (flagSostav==true) {
          UserService.clearTempKIT()
          UserService.clearTempKITdolj()
          UserService.clearTempKITdeg()
          UserService.clearTempKITstatus()

          readXlsxFile(xlsxfile, {sheet: "Состав КИТ"}).then((rows1) => {

          const p1 = new Promise(function(resolve1){
            k = 1
            while (rows1[k][9]!=null){
              dolj.push(rows1[k][9])
              if (rows1[k+1][9]!=null)
                doljStr = doljStr + "('" + rows1[k][9] + "'),"
              else{
                doljStr = doljStr + "('" + rows1[k][9] + "')"
              }
              k+=1
            }
          if (rows1[k][9]==null) {
            resolve1()
          }
          })
      
          p1.then(() => {
            UserService.insertTempKITDolj(doljStr)
          })

          const p2 = new Promise(function(resolve2){
            k = 1

            while (rows1[k][10]!=null){
              deg.push(rows1[k][10])
              if (rows1[k+1][10]!=null)
                degStr = degStr + "('" + rows1[k][10] + "'),"
              else{
                degStr = degStr + "('" + rows1[k][10] + "')"
              }
              k+=1
            }

            if (rows1[k][10]==null) {
              resolve2()
            }
          })
      
          p2.then(() => {
            UserService.insertTempKITDeg(degStr)
          })

          const p3 = new Promise(function(resolve3){
            k = 1
            while (rows1[k][11]!=null){
              status.push(rows1[k][11])
              if (rows1[k+1][11]!=null)
                statusStr = statusStr + "('" + rows1[k][11] + "'),"
              else{
                statusStr = statusStr + "('" + rows1[k][11] + "')"
              }
              k+=1
            }
            

          if (rows1[k][11]==null) {
            resolve3()
          }
          })
      
          p3.then(() => {
           UserService.insertTempKITStatus(statusStr)
          })

          const pf = new Promise(function(resolveF){
            for (let i = 1;i<rows1.length; i++) {
            if (rows1[i][0]!=null){
              temp = rows1[i][0].split(' ')
              name1.push(temp[0])
              name2.push(temp[1])
              name3.push(temp[2])        
            }
            else 
              i = rows1.length

          }

            for (let i = 0;i<name1.length; i++) {
              
              insFlag1 = false
              insFlag2 = false
              insFlag3 = false
              for (let j = 0;j<dolj.length;j++){
                if (rows1[i+1][1]==dolj[j]){
                  dolj_id = j+1
                  insFlag1 = true
                }
              }
              for (let j = 0;j<deg.length;j++){
                if (rows1[i+1][2]==deg[j]){
                  deg_id = j+1
                  insFlag2 = true
                }
              }
              for (let j = 0;j<status.length;j++){
                if (rows1[i+1][3]==status[j]){
                  status_id = j+1
                  insFlag3 = true
                }
              }

              if (insFlag1&&insFlag2&&insFlag3){
                if (startStr == 0) {
                  mainStr = mainStr + "('" + name1[i] +"','" + name2[i] +"','" + name3[i] +"'," + dolj_id +"," + deg_id +"," + status_id + ")"
                  startStr = 1
                }
                else {
                  mainStr = mainStr + ",('" + name1[i] +"','" + name2[i] +"','" + name3[i] +"'," + dolj_id +"," + deg_id +"," + status_id + ")"
                }
              }

              
            if (i==name1.length-1){
              setTimeout(resolveF, 1000);
            }
            }   
          })
          pf.then(() => {
            console.log(mainStr)
            UserService.insertTempKIT(mainStr)
          })

          })
        }

        if (flagRaspr==true) {
          readXlsxFile(xlsxfile, {sheet: "Распределение"}).then((rows2) => {
          for (let i = 9;i<rows2.length; i++) {
            if (rows2[i][0]!=null)
            tempR = rows2[i][0].split(' ', 3)
            if (tempR.length >= 3) {
              nameR1.push(temp[0])
              nameR2.push(temp[1])
              nameR3.push(temp[2])
            }
        }
      })
      }
    }
    this.navExcManage()
    })
  },
  navExcManage() {
    this.$router.push(`/ManageExcel`); // Navigate to the AddStudent route
}


}
}
</script>