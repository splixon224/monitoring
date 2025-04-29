const suggestions = [
    "Mutia Zahro Utami", "Riva Maulina", "Adrio Welly Rolando", "Agung Pratama", "Dzaki Tristanto",
    "Madrufi","Fatkhuroji", "Eki Panca Nugraha", "Lionel Caesar Walakandou",
    "Realdy Agsar Dwi Anggoro", "Dika Maryanto", "Suhardiansyah", "Annisa Rahmi", "Rika Jayang Sari",
    "Moch Rizal Rizky", "Asep Gunawan", "Wilorik Hamonangan Panggabean", "Bimo Anggoro Seno",
    "Ditha Emeralda Indyka", "Thoha Putra Kurnianda", "Ariq Hafizh Bariqi", "Mohamad Alfiandy",
    "Jaya Abdullah", "Mikhael Ronaldo Hutapea", "Saidina Bima", "Agung Kurniawan", "Fahmi Nurrohman Sidiq",
    "Ananda Bagas Amarullah Tanjung", "Yavid Jaya Pradana", "Claudia Svetlana Ranti", "Adib Firdausi",
    "Fikram Igo Sabtu", "Asrul Akbar", "Fahrur Rozi", "Marolop Samuel Napitupulu",
    "Bella Amalhia Sanfano Putri", "Lidya Devega", "Muhammad Raihan Mubaroq", "Yulia Sari",
    "Sari Rasul Putri", "Nechi Dwi Dianda", "Rahmat Fadillah", "Dicky Fredianto", "Afika Rahayu",
    "Khairun Nadya", "Roni Risaldi", "Muzammil Rabiawardana", "Annisaa Oceania Syaifullah", "Sabaril Nopri",
    "Ali Fathullah Harun", "Arief Firmansyah Putra", "Theresia Yolanda Br. Sihaloho", "Budi Bestara",
    "Rina Armestiani", "Wini Alfiani A", "Muhammad Abdu","Irfan Yunadi","Prasetya Heryanto Shadiq","Gilbert E.M Hutajulu","Resza Pahlawan Wibowo",
"Eka Wahyu Nurhayati","Iva Alfiyanti","Rihan Maulana","Naufal Imam Maajid Perdana","Muhamad Kevin",
"Esmeralda Sarahny Pulina","Khalifa Lyan Bohemianda","Ardian Nugroho","Dio Aditia Pratama","Achmad Adam Pebrianto","Alfath Rohmah Citra Ginnia",
"Shafira Aulia Yasmine","Ricky Adrian","Fathur Rahman","Prayogi Aldino Fiqri","Atikah Suhaimah",
"Avida Meidina Ahmad","Azzah Afifah Veronica","Bryan Christian C","Carmelia Yunita Tambuwun","Danang Saputro Aji","Erna Wati","Marliana Dwi Putri",
"Nafisa Alia Putri","Raden Ayu Dela U. S","Rafiqro Setiawan","Rizki Arif Darmawan","Yovita Margareth A. P","Zahra Amelia","Raymond Jordan Sipayung","Rohman Rizki Wahyu Oetomo","Achmad Suryo Adi","Nabila Septiarina","Nur Fitriani","Tevin Chamboty","Agung Setiawan","Widya Surya Irawan","Siska Vinia Sihite","Shintia Nur Afifah","Rani Juli Zarni","Satria Darmawan","Reihan Pratama","Sarah Simanjuntak","Fauhan Nurfajrina","Palty Reno","Wahyu Anggara","Ahmad Faisal","Maruli Agustina Siagian","M. Ikhsan Haikal","Anjani Lumban Gaol","Siti Hardiyanti Astianti","Pito Khirahman","Anisa Nurul Safitri","Vina Yanuar P","Tesa Rizki L","M Faiz Satrio P","Mariana Sinaga","Nadia Utami","Teguh Ardama","Denisa Viola","Elsa Kurnia","Rahmalita","Delis Anggraeni Permana","Sri Mulyati","Larasati Arimi","Fariz Azzami","Karina Sekarasti",
"M arfan","Habib fauzan Akbar","M. Ilyasha","Egi istas pratama"

];

function showSuggestions(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    const filter = input.value.toLowerCase();

    list.style.display = filter ? 'block' : 'none';
    list.innerHTML = "";

    if (filter) {
        suggestions
            .filter(name => name.toLowerCase().includes(filter))
            .forEach(name => {
                const option = document.createElement("div");
                option.textContent = name;
                option.className = "p-2 cursor-pointer hover:bg-gray-200";
                option.onclick = () => {
                    input.value = name;
                    list.innerHTML = "";
                };
                list.appendChild(option);
            });
    }
}

window.handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.target;
    const formId = formElement.id;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyBwUFJiqUil-xhyYAZ3ehc_apai8Ok57fMBPYUhLVkGFHbXDQrPipGHZ6OKY0-fAuv1A/exec'

    const btnKirimCI = document.getElementById('btnKirimCI')
    const btnLoadingCI = document.getElementById('btnLoadingCI')
    const btnKirimCO = document.getElementById('btnKirimCO')
    const btnLoadingCO = document.getElementById('btnLoadingCO')
    const formData = new FormData(formElement);

    console.log("Form yang diproses : " + formId)

    if (formId === 'form-CheckIn') {
      btnKirimCI.classList.toggle("hidden")
      btnLoadingCI.classList.toggle("hidden")

      // alert("Mohon Maaf Fitur Check In Sedang Dalam Pengembangan !!!");
      // formElement.reset();
      // document.getElementById('previewImage').classList.add('hidden');
      // setDateTime();

      const file = document.getElementById("Swafoto").files[0];
      if(file){
        const fr = new FileReader();
        fr.onload = function() {
          const res = fr.result;
          const spt = res.split("base64,")[1];

          formData.append('base64', spt)
          formData.append('type', file.type)
          // formData.append('name', file.name)

          fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
              if (!response.ok) {
                  throw new Error('Server sedang mengalami kendala : ' + response.statusText);
              }
              btnKirimCI.classList.toggle("hidden")
              btnLoadingCI.classList.toggle("hidden")
              document.getElementById('previewImage').classList.add('hidden');
              setDateTime();
              return response.json();
            })
            .then(data => {
              formElement.reset();
              btnKirimCI.classList.toggle("hidden")
              btnLoadingCI.classList.toggle("hidden")

              alert(data.result + " : " + data.message);
              btnKirimCI.classList.toggle("hidden")
              btnLoadingCI.classList.toggle("hidden")
              document.getElementById('previewImage').classList.add('hidden');
              setDateTime();
            })
            .catch(error => {
              console.log(error)
              alert("Gagal mengirim data Check In. Silakan coba lagi.");

              // balikin btn
              btnKirimCI.classList.toggle("hidden")
              btnLoadingCI.classList.toggle("hidden")
              document.getElementById('previewImage').classList.add('hidden');
              setDateTime();
            })
        }
        fr.readAsDataURL(file);
      } else{
        alert('Anda Belum Mengunggah Swafoto !!!')
        btnKirimCI.classList.toggle("hidden")
        btnLoadingCI.classList.toggle("hidden")
        setDateTime();
        return;
      }

    } else if (formId === 'form-CheckOut') {
      btnKirimCO.classList.toggle("hidden")
      btnLoadingCO.classList.toggle("hidden")

      // const inputAktivitas = document.getElementById('aktivitas').value;
      // const inputKeterangan = document.getElementById('remark').value;
      //
      // if (validateInputActivity(inputAktivitas) || validateInputActivity(inputKeterangan)) {
      //   alert("AKTIVITAS atau KETERANGAN hanya berisi Spasi atau Tab, Mohon untuk isi dengan benar !!!")
      //   event.preventDefault(); // Hentikan proses pengiriman form
      //   btnKirimCO.classList.toggle("hidden")
      //   btnLoadingCO.classList.toggle("hidden")
      // } else {
        fetch(scriptURL, { method: 'POST', body: formData})
          .then(response => {
            if (!response.ok) {
                throw new Error('Server sedang mengalami kendala : ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            // reset from
            formElement.reset();
            // balikin section
            updateSection();
            //balikin  tanggal default ke today
            const dateInput = document.getElementById('date-input');
            dateInput.valueAsDate = new Date();
            // balikin btn
            btnKirimCO.classList.toggle("hidden")
            btnLoadingCO.classList.toggle("hidden")

            alert(data.result + " : " + data.message)
          })
          .catch(error => {
            console.log(error.result, error.message)
            alert("Gagal mengirim data Check Out. Silakan coba lagi.");

            // balikin btn
            btnKirimCO.classList.toggle("hidden")
            btnLoadingCO.classList.toggle("hidden")
          })
      // }
    }
};

window.updateSection = function () {
    const hadirRadio = document.getElementById('hadir');
    const tidakHadirRadio = document.getElementById('tidak-hadir');
    const section2 = document.getElementById('section-2');
    const section3 = document.getElementById('section-3');
    const remarkSection = document.getElementById('remark-section');
    const aktivitas = document.getElementById('aktivitas');
    const remark = document.getElementById('remark');
    const AlasanCuti = document.getElementById('cuti');

    section2.classList.add('hidden');
    section3.classList.add('hidden');
    remarkSection.classList.add('hidden');

    if (hadirRadio.checked) {
        section2.classList.remove('hidden');
        aktivitas.setAttribute('required', 'true');
        AlasanCuti.removeAttribute('required');
        remark.removeAttribute('required');
    } else if (tidakHadirRadio.checked) {
        section3.classList.remove('hidden');
        remarkSection.classList.remove('hidden');
        remark.setAttribute('required', 'true');
        aktivitas.removeAttribute('required');
    }
};

window.updateRemarkSection = function () {
    const remarkSection = document.getElementById('remark-section');
    const cutiRadio = document.getElementById('cuti');
    const sakitRadio = document.getElementById('sakit');
    const izinRadio = document.getElementById('izin');

    if (cutiRadio.checked || sakitRadio.checked || izinRadio.checked) {
        remarkSection.classList.remove('hidden');
    }
};

function setDateTime () {
    const dateInput = document.getElementById('date-input');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    //min
    const todayMin = new Date()
    todayMin.setDate(todayMin.getDate() - 7);
    const mdd = String(todayMin.getDate()).padStart(2, '0');
    const mmm = String(todayMin.getMonth() + 1).padStart(2, '0');
    const myyyy = todayMin.getFullYear();

    dateInput.value = `${yyyy}-${mm}-${dd}`;
    dateInput.max = `${yyyy}-${mm}-${dd}`;
    dateInput.min = `${myyyy}-${mmm}-${mdd}`;

    const dateInputIN = document.getElementById('date-input-IN');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    dateInputIN.value = `${yyyy}-${mm}-${dd}T${hours}:${minutes}`;
}

window.onload = function () {
    setDateTime();
};

window.checkSection = function (event) {
  const elementId = event.target.id;
  const checkIn = document.getElementById('checkIn');
  const checkOut = document.getElementById('checkOut');
  const checkInSection = document.getElementById('checkInSection');
  const checkOutSection = document.getElementById('checkOutSection');
  // const RekamWaktuIn = document.getElementById('RekamWaktuIn');
  // const RekamWaktuOut = document.getElementById('RekamWaktuOut');
  const fromCheckIn = document.getElementById('form-CheckIn');

  if(elementId == "checkIn"){
    checkInSection.classList.remove('hidden');
    checkOutSection.classList.add('hidden');
    fromCheckIn.classList.remove('hidden');
    // RekamWaktuIn.value = 'Check In';
  }
  else if (elementId == "checkOut") {
    checkOutSection.classList.remove('hidden');
    checkInSection.classList.add('hidden');
    fromCheckIn.classList.add('hidden');
    // RekamWaktuOut.value = 'Check Out';
  }
}

window.previewImage = function() {
  const file = event.target.files[0]; // Ambil file yang diunggah
  const preview = document.getElementById('swafoto'); // Ambil elemen gambar pratinjau
  const bingkai = document.getElementById('previewImage');

  bingkai.classList.remove('hidden');

  if (file) {
      const reader = new FileReader(); // Buat objek FileReader

      // Ketika file dibaca, atur src gambar pratinjau
      reader.onload = function(e) {
          preview.src = e.target.result; // Set src gambar pratinjau
          preview.style.display = 'block'; // Tampilkan gambar pratinjau
      };

      reader.readAsDataURL(file); // Baca file sebagai URL data
  } else {
      preview.src = ''; // Kosongkan src jika tidak ada file
      preview.style.display = 'none'; // Sembunyikan gambar pratinjau
  }
}

function validateInputName(event) {
    const char = String.fromCharCode(event.which);
    const regex = /^[A-Za-z\s]+$/;; // Hanya huruf

    if (!regex.test(char)) {
        event.preventDefault(); // Mencegah input jika bukan huruf
    }
}

function validateInputActivity(input) {
    // Ekspresi reguler untuk memeriksa apakah input hanya terdiri dari spasi atau tab
    const regex = /^[ \t]*$/;
    return regex.test(input);
}
