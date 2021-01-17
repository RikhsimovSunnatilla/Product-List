//HTML elementlarini tanlab olamiz
var addProductForm = document.querySelector('.addProductForm');
var addProductInput = addProductForm.querySelector('.addProductInput');
var addQuantInput = addProductForm.querySelector('.addQuantInput');
var addPriceInput = addProductForm.querySelector('.addPriceInput');
var addProductBtn = addProductForm.querySelector('.addProductBtn');
var checkForm = document.querySelector('.checkForm');
var checkInput = checkForm.querySelector('.checkInput');
var checkBtn = checkForm.querySelector('.checkBtn');
var tbody = document.querySelector('.tbody');

//Qidira olish uchun mahsulotlarning nomini array ichiga olamiz
var allProductsList = [];

//Mahsulotlarni raqamlab olamiz
var productCounter;



//Mahsulot qo'shish formasi submit qilinganda
addProductForm.addEventListener('submit', function(event) {
  event.preventDefault();

  //Input'larni value'larini to'g'irlab olamiz
  var addProductInputValue = addProductInput.value.trim();
  var addQuantInputValue = parseFloat(addQuantInput.value.trim(), 10);
  var addPriceInputValue = parseFloat(addPriceInput.value.trim(), 10);

  //Input'larni value'larini tekshirib olamiz
  var checkIsNaN = !isNaN(addProductInputValue);
  var checkEmpty = addQuantInput.value.trim() === "" || addPriceInput.value.trim() === "";
  var checkNegative = addQuantInput.value.trim() < 0 || addPriceInput.value.trim() < 0;
  if (checkIsNaN || checkEmpty || checkNegative) {
    alert("Iltimos, to'g'ri qiymat kiriting!");
    addProductInput.value = "";
    addQuantInput.value = "";
    addPriceInput.value = "";
    addProductInput.focus();
    return;
  }

  //Yangi mahsulotlar qo'shilganda, bo'sh jadvallarni o'chiramiz
  try {
    document.querySelectorAll('tr.empty').forEach(function(element) {
      element.remove();
    });
  }
  catch(err) {}

  //Yangi elementlar qo'shamiz
  //Yangi qator (tr)
  var newRow = document.createElement('tr');
  tbody.appendChild(newRow);

  //Mahsulot tartib raqamini bittaga oshirib boramiz
  var i;
  for (i = 1; i < document.querySelectorAll('tr').length; i++) {
    productCounter = i;
  }

  //Yangi mahsulot tartib raqami (th)
  var newProductNumber = document.createElement('th');
  newProductNumber.scope = "row";
  newRow.appendChild(newProductNumber);
  newProductNumber.textContent = productCounter;

  //Yangi mahsulot nomi (td)
  var newProductName = document.createElement('td');
  newRow.appendChild(newProductName);
  newProductName.textContent = addProductInputValue;
  allProductsList.push(addProductInputValue);

  //Yangi mahsulot miqdori (td)
  var newProductQuant = document.createElement('td');
  newRow.appendChild(newProductQuant);
  newProductQuant.textContent = addQuantInputValue;

  //Yangi mahsulot narxi
  var newProductPrice = document.createElement('td');
  newRow.appendChild(newProductPrice);
  newProductPrice.textContent = addPriceInputValue;

  //Yangi mahsulotni umumiy narxi
  var newTotalPrice = document.createElement('td');
  newRow.appendChild(newTotalPrice);
  newTotalPrice.textContent = Math.round(addQuantInputValue * addPriceInputValue);

  //Yangi mahsulotni o'chirish katagi
  var deleteProduct = document.createElement('td');
  newRow.appendChild(deleteProduct);
  deleteProduct.innerHTML = "<i class=\"far fa-trash-alt text-danger\" title=\"Mahsulotni o'chirish\"></i>";

  //Yangi mahsulot('tr')ni o'chirish tugmasi
  var deleteProductIcon = document.querySelectorAll('.fa-trash-alt');
  deleteProductIcon.forEach(function(icon) {
    icon.addEventListener('click', function(element) {
      element.target.parentElement.parentElement.remove();
      //Qaysidir mahsulot('tr') o'chirilganda, mahsulotni qaytadan tartiblab chiqamiz
      trList = document.querySelectorAll('tr');
      var j;
      for (j = 1; j < trList.length; j++) {
        trList[j].querySelector('th').textContent = j;
      }
    })
  });
  
  //Oxirida input'lar qiymat(value)larini "" ga tenglashtiramiz
  addProductInput.value = "";
  addQuantInput.value = "";
  addPriceInput.value = "";
  addProductInput.focus();
})



//Mahsulotni ro'yxatda bor yoki yo'qligini tekshiramiz
checkForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var checkInputValue = checkInput.value.trim();
  checkInput.value = "";

  //Agar mahsulot BOR bo'lsa, success alert chiqaramiz
  //Agar mahsulot YO'Q bo'lsa, danger alert chiqaramiz
  var alertYesNo = document.createElement('div');
  document.body.appendChild(alertYesNo);
  if (allProductsList.includes(checkInputValue)) {
    alertYesNo.className = "alert alert-success fade show text-center";
    alertYesNo.setAttribute("role", "alert");
    alertYesNo.innerHTML = "<strong>Bor.</strong> Qidirilgan mahsulot ro'yxatda mavjud :)";
  } else {
    alertYesNo.className = "alert alert-danger fade show text-center";
    alertYesNo.setAttribute("role", "alert");
    alertYesNo.innerHTML = "<strong>Yo\'q!</strong> Lekin qo\'shib qo\'yishingiz mumkin :)";
    addProductInput.value = checkInputValue;
    addQuantInput.focus();
  }
  //Alert'ni 3 sekunddan keyin berkitamiz
  //3.5 sekunddan keyin HTML DOM'dan ham o'chiramiz
  function removeAlert() {
    setTimeout(function(){
      alertYesNo.classList.remove("show");
    }, 3000);
    setTimeout(function(){
      alertYesNo.remove();
    }, 3500);
  }
  removeAlert();
})