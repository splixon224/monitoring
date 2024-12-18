const suggestions = [
    "Mutia Zahro Utami", "Riva Maulina", "Adrio Welly Rolando", "Agung Pratama", "Dzaki Tristanto",
    "Madrufi", "Muhammad Attila Addarda", "Fatkhuroji", "Eki Panca Nugraha", "Lionel Caesar Walakandou",
    "Realdy Agsar Dwi Anggoro", "Dika Maryanto", "Suhardiansyah", "Annisa Rahmi", "Rika Jayang Sari",
    "Moch Rizal Rizky", "Asep Gunawan", "Wilorik Hamonangan Panggabean", "Bimo Anggoro Seno",
    "Ditha Emeralda Indyka", "Thoha Putra Kurnianda", "Ariq Hafizh Bariqi", "Febriyani", "Mohamad Alfiandy",
    "Jaya Abdullah", "Mikhael Ronaldo Hutapea", "Saidina Bima", "Agung Kurniawan", "Fahmi Nurrohman Sidiq",
    "Ananda Bagas Amarullah Tanjung", "Yavid Jaya Pradana", "Claudia Svetlana Ranti", "Adib Firdausi",
    "Fikram Igo Sabtu", "Asrul Akbar", "Fahrur Rozi", "Rasdhaty Oktaverlianda", "Marolop Samuel Napitupulu",
    "Dewi Mulka", "Bella Amalhia Sanfano Putri", "Lidya Devega", "Muhammad Raihan Mubaroq", "Yulia Sari",
    "Sari Rasul Putri", "Nechi Dwi Dianda", "Rahmat Fadillah", "Dicky Fredianto", "Afika Rahayu",
    "Khairun Nadya", "Roni Risaldi", "Muzammil Rabiawardana", "Annisaa Oceania Syaifullah", "Sabaril Nopri",
    "Ali Fathullah Harun", "Arief Firmansyah Putra", "Theresia Yolanda Br. Sihaloho", "Budi Bestara",
    "Rina Armestiani", "Wini Alfiani A"
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

    const form = document.getElementById("data-form");
    // const formData = new FormData(form);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyflm-VBdz1fZG9NqxtoQ6TJfcnk0X5Z86c2hOefHlj8PHDjykoKFs5EVQlnjQlZznW/exec'

      const btnKirim = document.getElementById('btnKirim')
      const btnLoading = document.getElementById('btnLoading')
      btnKirim.classList.toggle("hidden")
      btnLoading.classList.toggle("hidden")

      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          // reset from
          form.reset();
          // balikin section
          updateSection();
          //balikin  tanggal default ke today
          const dateInput = document.getElementById('date-input');
          dateInput.valueAsDate = new Date();
          // balikin btn
          btnKirim.classList.toggle("hidden")
          btnLoading.classList.toggle("hidden")

          alert(data.result + " : " + data.message)
        })
        .catch(error => {
          console.log(error.result, error.message)
          alert("Gagal mengirim data. Silakan coba lagi.");

          // balikin btn
          btnKirim.classList.toggle("hidden")
          btnLoading.classList.toggle("hidden")
        })
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

window.onload = function () {
    const dateInput = document.getElementById('date-input');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    dateInput.value = `${yyyy}-${mm}-${dd}`;
    dateInput.max = `${yyyy}-${mm}-${dd}`;

    const dateInputIN = document.getElementById('date-input-IN');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    dateInputIN.value = `${yyyy}-${mm}-${dd}T${hours}:${minutes}`;
};

window.checkSection = function () {
  const checkIn = document.getElementById('checkIn');
  const checkOut = document.getElementById('checkOut');
  const checkInSection = document.getElementById('checkInSection');
  const checkOutSection = document.getElementById('checkOutSection');
  const RekamWaktuIn = document.getElementById('RekamWaktuIn');
  const RekamWaktuOut = document.getElementById('RekamWaktuOut');

  checkIn.addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah perilaku default anchor
    checkInSection.classList.remove('hidden');
    checkOutSection.classList.add('hidden');
    RekamWaktuIn.value = 'Check In';
  });

  checkOut.addEventListener('click', (event) => {
    event.preventDefault(); // Mencegah perilaku default anchor
    checkOutSection.classList.remove('hidden');
    checkInSection.classList.add('hidden');
    RekamWaktuOut.value = 'Check Out';
  });
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
