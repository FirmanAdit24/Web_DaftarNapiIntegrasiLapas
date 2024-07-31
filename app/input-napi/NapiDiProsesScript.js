import {app} from "../../FirebaseConfig.js"

import {getDatabase, ref, onValue, set, push, remove} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
// import { fetchDataNapiBebas } from "./FetchData.js";
const auth = getAuth(app)
const dbs = getDatabase(app)

export const listNapi = document.getElementById("list-napi")

// alert(dbs)
onAuthStateChanged(auth, (user) =>{
   if(user){
      const path = "daftarStatusNapi/NapiDiProses"
      const dbRef = ref(dbs, path)
      onValue(dbRef, (snapshot)=>{
        listNapi.innerHTML = ""
        let noList = 0
        snapshot.forEach((data)=> {
            noList +=1

            // fetchDataNapiBebas(noList, data.val().nama, data.val().tanggalBebas, data.val().ket, data.key)
            // fetchDataPengajuanIntegrasi(noList, data.val().nama, data.val().perkara, data.val().pidana, data.val().ket, data.key)
            fetchDataNapiDiProses(noList, data.val().nama, data.val().ket, data.key)
            })
            
          
            const insertBtn = document.getElementById("insert-btn")
            insertBtn.onclick = ()=>{
                insertData(dbRef)
            }
        })
      

   }else{
    window.location.href ="../../login.html"
   }
})




function insertData(dbRef){
  const insertTable = document.getElementById("input-rows")
  
  for(var i = 0 ; i < insertTable.rows.length; i++){
    const newRef = push(dbRef)
   insertMultiData(newRef, "insertNama"+i,  "insertKet"+i, i )
   
  }
  console.log(insertTable.rows.length)

  function insertMultiData(newRef, namaId,ketId, i){
    if(document.getElementById(namaId).value !="" && document.getElementById(ketId).value != ""){
        set(newRef, {
         nama: document.getElementById(namaId).value,
         ket: document.getElementById(ketId).value
       }).catch((error) => {
          console.error("Error", error);
       });
    }else{
      if(i == insertTable.rows.length -1){
        alert("Lengkapi")
      }
    }
  }

}

 const resetBtn = document.getElementById("reset-data")

 // Ketika tombol reset diklik
resetBtn.addEventListener('click', () => {
  $('#confirmResetModal').modal('show');
});

// Ketika tombol konfirmasi reset ditekan
document.getElementById('confirmResetBtn').addEventListener('click', function() {
  remove(ref(dbs, "daftarStatusNapi/NapiDiProses"))
  $('#confirmResetModal').modal('hide');
});
 
