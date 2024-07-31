import {app} from "../../FirebaseConfig.js"

import {getDatabase, ref, onValue, set, push, remove} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const dbs = getDatabase(app)
const auth = getAuth(app)
const listNapiBebas = document.getElementById("list-napi-bebas")
const listNapiPengajuanIntegrasi = document.getElementById("list-pengajuan-integrasi")
const listProsesIntegrasi = document.getElementById("list-proses-integrasi")
onAuthStateChanged(auth, (user) =>{
   if(user){
      const pathNapiBebas = "daftarStatusNapi/NapiBebas"
      const dbRef = ref(dbs, pathNapiBebas)
      let snapshotSize = 0
      onValue(dbRef, (snapshot)=>{
        let noList = 0
        listNapiBebas.innerHTML = ""
        snapshot.forEach((data)=> {

            const date = new Date(data.val().tanggalBebas)
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = Intl.DateTimeFormat('id-ID', options).format(date);
            noList++
            listNapiBebas.innerHTML += (`
                        <tr>
                                <td style="width: 3%;">${noList}</td>
                                <td style="width: 52%;">${data.val().nama}</td>
                                <td style="width: 25%;">${formattedDate}</td>
                                <td style="width: 20%;">${data.val().ket}</td>
                            </tr>
                `)
 
            })
            if(snapshot.size == 0){
                listNapiBebas.innerHTML += (`
                    <tr style="display:none;">
                            <td style="width: 3%;">-</td>
                            <td style="width: 52%;">-</td>
                            <td style="width: 25%;">-</td>
                            <td style="width: 20%;">-</td>
                        </tr>
            `)
            }
                
                snapshotSize = snapshot.size
        })
        
        const pathPengajuanIntegrasi = "daftarStatusNapi/NapiPengajuanIntegrasi"
        const dbRefPI = ref(dbs, pathPengajuanIntegrasi)
        onValue(dbRefPI, (snapshot) =>{
            let noList = 0
            listNapiPengajuanIntegrasi.innerHTML = ""
            snapshot.forEach((data)=> {
                noList++
                listNapiPengajuanIntegrasi.innerHTML += (`
                            <tr>
                             <td style="width: 3%;">${noList}</td>
                                <td style="width: 32%;">${data.val().nama}</td>
                                <td style="width: 20%;">${data.val().perkara}</td>
                                <td style="width: 20%;">${data.val().pidana}</td>
                                <td style="width: 24%;">${data.val().ket}</td>
                                    </tr>
                    `)
             
                    
                })
                if(snapshot.size == 0){
                    listNapiPengajuanIntegrasi.innerHTML += (`
                        <tr style="display:none;">
                         <td style="width: 3%;">-</td>
                            <td style="width: 32%;">-</td>
                            <td style="width: 20%;">-</td>
                            <td style="width: 20%;">-</td>
                            <td style="width: 24%;">-</td>
                                </tr>
                `)
                }
                 if(snapshotSize < snapshot.size){
                    snapshotSize = snapshot.size
                 }
                
                
        })

        const pathNapiDiproses = "daftarStatusNapi/NapiDiProses"
        const dbRefNP = ref(dbs, pathNapiDiproses)
        onValue(dbRefNP, (snapshot) =>{
            let noList = 0
            listProsesIntegrasi.innerHTML = ""
            snapshot.forEach((data)=> {
                noList++
                listProsesIntegrasi.innerHTML += (`
                        <tr>
                                <td style="width: 3%;">${noList}</td>
                                <td style="width: 62%;">${data.val().nama}</td>
                                <td style="width: 35%;">${data.val().ket}</td>
                            </tr>
    
                    `)
             
                    
                })
                 if(snapshot.size == 0){
                    listProsesIntegrasi.innerHTML += (`
                        <tr style="display:none;">
                                <td style="width: 3%;">-</td>
                                <td style="width: 62%;">-</td>
                                <td style="width: 35%;">-</td>
                            </tr>
    
                    `)
             
                 }
                if(snapshotSize < snapshot.size){
                    playDisplay(snapshot.size)
                }else{
                    playDisplay(snapshotSize)
                 }
                
                
        })
   }else{
    window.location.href ="../../login.html"
   }
})
