let localData = localStorage.getItem("productData");
const productData = localData ? JSON.parse(localData) : [];

const buttonAdd = $("#btn-add");
const buttonSortDate = $("#btn-sdate");
const buttonSortName = $("#btn-sname");
const buttonCheckQuantum = $("#btn-checkq");
const buttonCheckDeadline = $("#btn-checkd");
const buttonConfirm = $("#btn-confirm");
const buttonCancel = $("#btn-cancel");
const modalBody = $(".modal-body");
const modalTitle = $("#modal-title");
const modalWorking = $("#modal-working");
const tableDisplay = $("#table-displaying");
const dataName = $("#add-data-name");
const dataDate = $("#add-data-date");

function addItem() {
  const itemId = $("#input-id").val();
  const itemSp = $("#input-name").val();
  const quantitySp = $("#input-quan").val();
  const dateSp = $("#input-date").val();
  const sumItem = {
    id: itemId,
    idName: itemSp,
    idQuan: quantitySp,
    idDate: dateSp,
  };
  let index = taskList.findIndex((item) => {
    return item.id == sumItem.id;
  });
  if (itemId.length < 1) {
    alert("vui long nhap ID");
  } else if (itemSp.length < 1) {
    alert("vui long nhap Ten SP");
  } else if (quantitySp.length < 1) {
    alert("vui long nhap so luong sp");
  } else if (dateSp.length < 1) {
    alert("vui long nhap ngay thang");
  } else {
    if (index >= 0) {
      taskList.splice(index, 1, itemabc);
      render();
    } else {
      taskList.push(itemabc);
      render();
      localStorage.setItem("listSP", JSON.stringify(taskList));
    }
  }

  localStorage.setItem("list", JSON.stringify(taskList));
}

function render() {
  let table = `
<tr>
  <td>ID</td>
  <td>TenSP</td>
  <td>SỐ lượng</td>
  <td>Ngày tháng</td>
  <td>action</td>
</tr>`;
  taskList.forEach((item) => {
    table += `
  <tr class = "data-row">
      <td>${item.id}</td>
      <td>${item.tenSp} </td>
      <td>${item.quantity}</td>
      <td>${item.date}</td>
      <td>
      <button onClick="openEditModal('${item.id}')">
      <i class="fa-solid fa-wrench"></i>
      </button>
      <button onClick ="openDeleteModal('${item.id}')">
      <i class="fa-solid fa-trash"></i>
      </button>
      </td>
  
  </tr>`;
  });
  document.getElementById("task-table").innerHTML = table;
}

function openDeleteModal(id) {
  const task = taskList.find((item) => {
    return item.id == id;
  });

  $(".modal-title").html(task.id);
  $(".modal-body").html("ban co chac muon xoa");
  $("#modal-working").modal("show");
  document.querySelector(".btn btn-secondary").addEventListener("click", function (e) {
    taskList.forEach((item, index) => {
      if (item.id == id) {
        taskList.splice(index, 1);
        render();
        localStorage.setItem("listSP", JSON.stringify(taskList));
      }
    });
    $("#modal-working").modal("hide");