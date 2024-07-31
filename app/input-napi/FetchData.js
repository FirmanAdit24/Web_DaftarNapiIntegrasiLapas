// import {listNapi} from "./NapiBebasScript.js"
const listNapi = document.getElementById("list-napi")

// baris untuk table data napi bebas
function fetchDataNapiBebas(noList,nama, tanggalBebas, ket, key){
  listNapi.innerHTML += (`
    <tr  >
    <td >${noList}</td>
    <td id="${key + "nama"}">${nama}</td>
    <td id="${key + "tanggalBebas"}">${tanggalBebas}</td>
    <td id="${key + "ket"}">${ket}</td>
    <td>
    <button class="btn btn-primary btn-sm" id="${key + "leftBtn"}"
     onclick="editDataNapiBebas('${key}nama', '${key}tanggalBebas', '${key}ket', '${nama}','${tanggalBebas}','${ket}','${key}leftBtn', '${key}rightBtn',  '${key}')"   
    >Edit</button>
    <button class="btn btn-danger btn-sm" 
     id="${key + "rightBtn"}"
     onclick="deleteData('${key}','daftarStatusNapi/NapiBebas')"
    >Hapus</button> 
    </td>
  </tr>
  `)

}

// baris untuk table pengajuan integrasi
function fetchDataPengajuanIntegrasi(noList,nama,perkara, pidana, ket, key){
  listNapi.innerHTML += (`
    <tr  >
        <td>${noList}</td>
        <td id="${key}nama">${nama}</td>
        <td id="${key}perkara">${perkara}</td>
        <td id="${key}pidana">${pidana}</td>
        <td id="${key}ket">${ket}</td>
    <td>
  <button class="btn btn-primary btn-sm" id="${key + "leftBtn"}"
     onclick="editDataPengajuanIntegrasi('${key}nama', '${key}perkara', '${key}pidana','${key}ket', '${nama}','${perkara}','${pidana}','${ket}','${key}leftBtn', '${key}rightBtn',  '${key}')"   
    >Edit</button>
    <button class="btn btn-danger btn-sm"  id="${key}rightBtn"
     onclick="deleteData('${key}','daftarStatusNapi/NapiPengajuanIntegrasi')"
    >Hapus</button> 
    </td>
  </tr>
  `)

}

// baris untuk table napi diproses
function fetchDataNapiDiProses(noList, nama,ket, key){
  listNapi.innerHTML += (`
                 <tr>
                  <td>${noList}</td>
                  <td id="${key}nama">${nama}</td>
                  <td id="${key}ket" >${ket}</td>
                  <td>
                     <button class="btn btn-primary btn-sm" id="${key + "leftBtn"}"
                     onclick="editDataNapiDiproses('${key}nama','${key}ket', '${nama}','${ket}','${key}leftBtn', '${key}rightBtn',  '${key}')"   
                     
                      >Edit</button>

                       <button class="btn btn-danger btn-sm"  
                       id="${key}rightBtn"
                        onclick="deleteData('${key}','daftarStatusNapi/NapiDiProses')"
                        >Hapus</button> 
                  </td>
                </tr>
    `)
}


// Untuk edit data Napi Bebas
function editDataNapiBebas(namaId, tanggalBebasId, ketId, nama, tanggalBebas, ket, leftBtn,rightBtn,  key){
  const kolomNama = document.getElementById(namaId)
  const kolomTanggalBebas = document.getElementById(tanggalBebasId)
  const kolomKet = document.getElementById(ketId)
  const tomSimpan = document.getElementById(leftBtn)
  const tomBatal = document.getElementById(rightBtn)

  // set baris menjadi form input 
  kolomNama.innerHTML=`<input type="text" id="${namaId}input" class="form-control" placeholder="Nama Narapidana">`
  kolomTanggalBebas.innerHTML=`<input type="date" id="${tanggalBebasId}input" class="form-control">`
  kolomKet.innerHTML = (`
          <select class="form-control" id="${ketId}input">
            <option value="PB">PB</option>
            <option value="CMB">CMB</option>
            <option value="CB">CB</option>
            <option value="SUB">SUB</option>
          </select>
    `)

//  set tombol
    tomBatal.innerHTML = "Batal"
    tomSimpan.innerHTML = "Simpan"

// tombol simpan diklik 
    tomSimpan.onclick = () =>{
      const inputEditNama = document.getElementById(namaId+"input")
      const inputEditTanggal = document.getElementById(tanggalBebasId+"input")
      const inputEditKet = document.getElementById(ketId+"input")

      if(inputEditNama.value != "" && inputEditTanggal.value != ""){

        firebase.database().ref("daftarStatusNapi/NapiBebas").child(key).set({
          nama : inputEditNama.value,
          tanggalBebas : Date.parse(inputEditTanggal.value),
          ket : inputEditKet.value
        })
      }else{
        alert("Data tidak boleh kosong!")
      }
    }
    // Set example 26 november 2001 to 2001-11-26

    function convertMonthNameToNumber(montHName){
      const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
      
      return months.indexOf(montHName) + 1
    }

    let [day, month, year] = tanggalBebas.split(" ")
    let monthConverted = convertMonthNameToNumber(month)
    if(monthConverted < 10){
      monthConverted = "0" + monthConverted.toString()
    }
    if(parseInt(day) < 10 ){
      day = "0" + day.toString()
    }
    // Set nilai default form input
  document.getElementById(namaId+"input").setAttribute("value",nama)
  document.getElementById(tanggalBebasId+"input").setAttribute("value", `${year+"-"+monthConverted+'-'+day}`)
  document.getElementById(ketId+"input").value = ket
  

  // tombol batal diklik
    tomBatal.onclick = () => {
      // kembalikan keadaan
      kolomNama.innerHTML = nama
      kolomTanggalBebas.innerHTML = tanggalBebas
      kolomKet.innerHTML = ket
      tomSimpan.innerHTML = "Edit"
      tomBatal.innerHTML = "Hapus"
      
      tomSimpan.onclick = () =>{
        editDataNapiBebas(namaId, tanggalBebasId, ketId, nama, tanggalBebas, ket, leftBtn,rightBtn,  key)
      }
      tomBatal.onclick = ()=>{
        // alert(path)
        deleteData(key, "daftarStatusNapi/NapiBebas")
      }
    }  

}

// Untuk edit data pengajuan integrasi
function editDataPengajuanIntegrasi(namaId, perkaraId, pidanaId, ketId, nama, perkara, pidana, ket, leftBtn,rightBtn,  key){
    
  const kolomNama = document.getElementById(namaId)
  const kolomPerkara = document.getElementById(perkaraId)
  const kolomPidana = document.getElementById(pidanaId)
  const kolomKet = document.getElementById(ketId)
  const tomSimpan = document.getElementById(leftBtn)
  const tomBatal = document.getElementById(rightBtn)

  // set baris menjadi form input 
  kolomNama.innerHTML=`<input type="text" id="${namaId}input" class="form-control" placeholder="Nama Narapidana">`
  kolomPerkara.innerHTML=`<input type="text" id="${perkaraId}input" class="form-control" placeholder="Perkara">`
  kolomPidana.innerHTML = `<input type="text" id="${pidanaId}input" class="form-control" placeholder="Pidana">`
  kolomKet.innerHTML = (`
          <select class="form-control" id="${ketId}input">
                  <option value="Proses Persyaratan Integrasi">Proses Persyaratan Integrasi</option>
                  <option value="Penundaan">Penundaan</option>
          </select>
    `)

//  set tombol
    tomBatal.innerHTML = "Batal"
    tomSimpan.innerHTML = "Simpan"

// tombol simpan diklik 
    tomSimpan.onclick = () =>{
    firebase.database().ref("daftarStatusNapi/NapiPengajuanIntegrasi").child(key).set({
      nama : document.getElementById(namaId+"input").value,
      perkara : document.getElementById(perkaraId+"input").value,
      pidana : document.getElementById(pidanaId+"input").value,
      ket : document.getElementById(ketId+"input").value
    })
    }

    // Set nilai default form input
  document.getElementById(namaId+"input").setAttribute("value",nama)
  document.getElementById(perkaraId+"input").setAttribute("value",perkara)
  document.getElementById(pidanaId+"input").setAttribute("value",pidana)
  document.getElementById(ketId+"input").value = ket
  

  // tombol batal diklik
    tomBatal.onclick = () => {
      // kembalikan keadaan
      kolomNama.innerHTML = nama
      kolomPerkara.innerHTML = perkara
      kolomPidana.innerHTML = pidana
      kolomKet.innerHTML = ket
      tomSimpan.innerHTML = "Edit"
      tomBatal.innerHTML = "Hapus"
      
      tomSimpan.onclick = () =>{
        editDataPengajuanIntegrasi(namaId, perkaraId, pidanaId , ketId ,nama, perkara, pidana,ket, leftBtn,rightBtn,  key)
      }
      tomBatal.onclick = ()=>{
        // alert(path)
        deleteData(key, "daftarStatusNapi/NapiPengajuanIntegrasi")
      }
    }  
}

// Untuk edit data napi diproses
function editDataNapiDiproses(namaId, ketId, nama, ket, leftBtn, rightBtn, key){
  const kolomNama = document.getElementById(namaId)
  const kolomKet = document.getElementById(ketId)
  const tomSimpan = document.getElementById(leftBtn)
  const tomBatal = document.getElementById(rightBtn)

  // set baris menjadi form input 
  kolomNama.innerHTML=`<input type="text" id="${namaId}input" class="form-control" placeholder="Nama Narapidana">`
  kolomKet.innerHTML = (`
          <select class="form-control" id="${ketId}input">
                       <option value="Pengajuan Litmas">Pengajuan Litmas</option>
            <option value="Menunggu Hasil Litmas">Menunggu Hasil Litmas</option>
            <option value="Menunggu Sidang TPP">Menunggu Sidang TPP</option>
            <option value="Pengusulan Integrasi Ke Pusat">Pengusulan Integrasi Ke Pusat</option>
            <option value="Perbaikan Data">Perbaikan Data</option>
            <option value="Menunggu SK">Menunggu SK</option>
            <option value="SK Terbit">SK Terbit</option>
            <option value="Penundaan">Penundaan</option>
          </select>
    `)

//  set tombol
    tomBatal.innerHTML = "Batal"
    tomSimpan.innerHTML = "Simpan"

// tombol simpan diklik 
    tomSimpan.onclick = () =>{
    firebase.database().ref("daftarStatusNapi/NapiDiProses").child(key).set({
      nama : document.getElementById(namaId+"input").value,
      ket : document.getElementById(ketId+"input").value
    })
    }

    // Set nilai default form input
  document.getElementById(namaId+"input").setAttribute("value",nama)
  document.getElementById(ketId+"input").value = ket
  

  // tombol batal diklik
    tomBatal.onclick = () => {
      // kembalikan keadaan
      kolomNama.innerHTML = nama
      kolomKet.innerHTML = ket
      tomSimpan.innerHTML = "Edit"
      tomBatal.innerHTML = "Hapus"
      
      tomSimpan.onclick = () =>{
        editDataNapiDiproses(namaId,  ketId ,nama ,ket, leftBtn,rightBtn,  key)
      }
      tomBatal.onclick = ()=>{
        // alert(path)
        deleteData(key, "daftarStatusNapi/NapiDiProses")
      }
    }  
}



function deleteData(key, path){
  // alert(path)
  firebase.database().ref(path).child(key).remove()
}

