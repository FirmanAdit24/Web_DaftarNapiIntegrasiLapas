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
      const path = "daftarStatusNapi/NapiBebas"
      const dbRef = ref(dbs, path)
      onValue(dbRef, (snapshot)=>{
        listNapi.innerHTML = ""
        let noList = 0
        snapshot.forEach((data)=> {
            noList +=1
            const date = new Date(data.val().tanggalBebas)
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
            fetchDataNapiBebas(noList, data.val().nama, formattedDate, data.val().ket, data.key)
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
   insertMultiData(newRef, "insertKet"+i, "insertNama"+i, "insertTanggalBebas"+i , i)
   
  }
  console.log(insertTable.rows.length)

  function insertMultiData(newRef, ketId, namaId, tanggalBebasId, i){
    if(document.getElementById(namaId).value != "" && document.getElementById(ketId).value != "" && document.getElementById(tanggalBebasId).value != "" ){
      set(newRef, {
        ket: document.getElementById(ketId).value,
        nama: document.getElementById(namaId).value,
        tanggalBebas: Date.parse(document.getElementById(tanggalBebasId).value),
     }).catch((error) => {
        console.error("Error", error);
     });
    }else{
      if(i == insertTable.rows.length - 1){
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
  remove(ref(dbs, "daftarStatusNapi/NapiBebas"))
  $('#confirmResetModal').modal('hide');
});
