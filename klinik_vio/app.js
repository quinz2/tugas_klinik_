// Aplikasi Klinik sederhana dengan LocalStorage
const STORAGE_KEY = 'klinik_data_v1';

const defaultData = {
  dokter: [],
  pasien: [],
  rawatJalan: [],
  rawatInap: []
};

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultData;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let store = loadData();
const app = document.getElementById('app');
const navButtons = document.querySelectorAll('nav button');
navButtons.forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));

function showView(view) {
  if (view === 'dashboard') renderDashboard();
  if (view === 'dokter') renderDokter();
  if (view === 'pasien') renderPasien();
  if (view === 'rawat-jalan') renderRawatJalan();
  if (view === 'rawat-inap') renderRawatInap();
}

// DASHBOARD
function renderDashboard() {
  app.innerHTML = `
    <div class="card">
      <h2>Dashboard</h2>
      <p class="small">Ringkasan Data Klinik:</p>
      <ul>
        <li>Dokter: ${store.dokter.length}</li>
        <li>Pasien: ${store.pasien.length}</li>
        <li>Rawat Jalan: ${store.rawatJalan.length}</li>
        <li>Rawat Inap: ${store.rawatInap.length}</li>
      </ul>
      <button class="btn btn-danger" onclick="resetData()">Hapus Semua Data</button>
    </div>
  `;
}

// CRUD DOKTER
function renderDokter() {
  app.innerHTML = `
    <div class="card">
      <h2>Data Dokter</h2>
      <div class="form-row">
        <input id="dokter_nama" placeholder="Nama Dokter">
        <input id="dokter_spesialis" placeholder="Spesialis">
        <button class="btn btn-primary" onclick="addDokter()">Tambah</button>
      </div>
      <table class="table" id="tblDokter">
        <thead><tr><th>Nama</th><th>Spesialis</th><th>Aksi</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  updateDokterTable();
}

function updateDokterTable() {
  const tbody = document.querySelector('#tblDokter tbody');
  tbody.innerHTML = '';
  store.dokter.forEach((d, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${d.nama}</td>
      <td>${d.spesialis}</td>
      <td>
        <button onclick="editDokter(${i})">Edit</button>
        <button class="btn-danger" onclick="deleteDokter(${i})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addDokter() {
  const nama = document.getElementById('dokter_nama').value.trim();
  const spesialis = document.getElementById('dokter_spesialis').value.trim();
  if (!nama) return alert('Isi nama dokter!');
  store.dokter.push({ nama, spesialis });
  saveData(store);
  renderDokter();
}

function editDokter(i) {
  const d = store.dokter[i];
  const nama = prompt('Edit Nama Dokter', d.nama);
  const spesialis = prompt('Edit Spesialis', d.spesialis);
  if (nama !== null) store.dokter[i] = { nama, spesialis };
  saveData(store);
  renderDokter();
}

function deleteDokter(i) {
  if (confirm('Hapus dokter ini?')) {
    store.dokter.splice(i, 1);
    saveData(store);
    renderDokter();
  }
}

// CRUD PASIEN
function renderPasien() {
  app.innerHTML = `
    <div class="card">
      <h2>Data Pasien</h2>
      <div class="form-row">
        <input id="pasien_nama" placeholder="Nama Pasien">
        <input id="pasien_umur" placeholder="Umur">
        <input id="pasien_penyakit" placeholder="Nama Penyakit">
        <button class="btn btn-primary" onclick="addPasien()">Tambah</button>
      </div>
      <table class="table" id="tblPasien">
        <thead><tr><th>Nama</th><th>Umur</th><th>Penyakit</th><th>Aksi</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  updatePasienTable();
}

function updatePasienTable() {
  const tbody = document.querySelector('#tblPasien tbody');
  tbody.innerHTML = '';
  store.pasien.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.nama}</td>
      <td>${p.umur}</td>
      <td>${p.penyakit}</td>
      <td>
        <button class="btn btn-primary" onclick="editPasien(${i})">Edit</button>
        <button class="btn btn-danger" onclick="deletePasien(${i})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addPasien() {
  const nama = document.getElementById('pasien_nama').value.trim();
  const umur = document.getElementById('pasien_umur').value.trim();
  const penyakit = document.getElementById('pasien_penyakit').value.trim();
  if (!nama || !umur || !penyakit) return alert('Isi semua kolom!');
  store.pasien.push({ nama, umur, penyakit });
  saveData(store);
  renderPasien();
}

function editPasien(i) {
  const p = store.pasien[i];
  const nama = prompt('Edit Nama Pasien', p.nama);
  const umur = prompt('Edit Umur Pasien', p.umur);
  const penyakit = prompt('Edit Penyakit', p.penyakit);
  if (nama !== null) store.pasien[i] = { nama, umur, penyakit };
  saveData(store);
  renderPasien();
}

function deletePasien(i) {
  if (confirm('Hapus pasien ini?')) {
    store.pasien.splice(i, 1);
    saveData(store);
    renderPasien();
  }
}

// CRUD RAWAT JALAN
function renderRawatJalan() {
  app.innerHTML = `
    <div class="card">
      <h2>Data Rawat Jalan</h2>
      <div class="form-row">
        <input id="rj_pasien" placeholder="Nama Pasien">
        <input id="rj_dokter" placeholder="Dokter Penanggung Jawab">
        <button class="btn btn-primary" onclick="addRawatJalan()">Tambah</button>
      </div>
      <table class="table" id="tblRawatJalan">
        <thead><tr><th>Pasien</th><th>Dokter</th><th>Aksi</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  updateRawatJalanTable();
}

function updateRawatJalanTable() {
  const tbody = document.querySelector('#tblRawatJalan tbody');
  tbody.innerHTML = '';
  store.rawatJalan.forEach((r, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.pasien}</td>
      <td>${r.dokter}</td>
      <td>
        <button onclick="editRawatJalan(${i})">Edit</button>
        <button class="btn-danger" onclick="deleteRawatJalan(${i})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addRawatJalan() {
  const pasien = document.getElementById('rj_pasien').value.trim();
  const dokter = document.getElementById('rj_dokter').value.trim();
  if (!pasien || !dokter) return alert('Isi nama pasien dan dokter!');
  store.rawatJalan.push({ pasien, dokter });
  saveData(store);
  renderRawatJalan();
}

function editRawatJalan(i) {
  const r = store.rawatJalan[i];
  const pasien = prompt('Edit Nama Pasien', r.pasien);
  const dokter = prompt('Edit Dokter', r.dokter);
  if (pasien !== null) store.rawatJalan[i] = { pasien, dokter };
  saveData(store);
  renderRawatJalan();
}

function deleteRawatJalan(i) {
  if (confirm('Hapus data ini?')) {
    store.rawatJalan.splice(i, 1);
    saveData(store);
    renderRawatJalan();
  }
}

// CRUD RAWAT INAP
function renderRawatInap() {
  app.innerHTML = `
    <div class="card">
      <h2>Data Rawat Inap</h2>
      <div class="form-row">
        <input id="ri_pasien" placeholder="Nama Pasien">
        <input id="ri_kamar" placeholder="Nomor Kamar">
        <button class="btn btn-primary" onclick="addRawatInap()">Tambah</button>
      </div>
      <table class="table" id="tblRawatInap">
        <thead><tr><th>Pasien</th><th>Kamar</th><th>Aksi</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  updateRawatInapTable();
}

function updateRawatInapTable() {
  const tbody = document.querySelector('#tblRawatInap tbody');
  tbody.innerHTML = '';
  store.rawatInap.forEach((r, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.pasien}</td>
      <td>${r.kamar}</td>
      <td>
        <button onclick="editRawatInap(${i})">Edit</button>
        <button class="btn-danger" onclick="deleteRawatInap(${i})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addRawatInap() {
  const pasien = document.getElementById('ri_pasien').value.trim();
  const kamar = document.getElementById('ri_kamar').value.trim();
  if (!pasien || !kamar) return alert('Isi nama pasien dan nomor kamar!');
  store.rawatInap.push({ pasien, kamar });
  saveData(store);
  renderRawatInap();
}

function editRawatInap(i) {
  const r = store.rawatInap[i];
  const pasien = prompt('Edit Nama Pasien', r.pasien);
  const kamar = prompt('Edit Kamar', r.kamar);
  if (pasien !== null) store.rawatInap[i] = { pasien, kamar };
  saveData(store);
  renderRawatInap();
}

function deleteRawatInap(i) {
  if (confirm('Hapus data ini?')) {
    store.rawatInap.splice(i, 1);
    saveData(store);
    renderRawatInap();
  }
}

function resetData() {
  if (confirm('Yakin ingin menghapus semua data?')) {
    localStorage.removeItem(STORAGE_KEY);
    store = JSON.parse(JSON.stringify(defaultData));
    renderDashboard();
  }
}

showView('dashboard');
