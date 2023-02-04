var items = JSON.parse(localStorage.getItem('items')) || [];
console.log(items);
var input = document.querySelector('.input input');
var addElement = document.querySelector('.add');
var resetBTN = document.querySelector('.reset');
var removeFinishedBTN = document.querySelector('.remove-finished');
function add() {
    if (input.value == null || input.value.trim() === '')
        return;
    items.push({
        name: input.value.trim(),
        isCheck: false
    });
}
addElement.addEventListener('click', function () {
    add();
    input.value = '';
    change();
});
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        add();
        input.value = '';
        change();
    }
});
var itemsContainer = document.querySelector('.items');
function change() {
    localStorage.setItem('items', JSON.stringify(items));
    itemsContainer.innerHTML = '';
    items.forEach(function (item, index) {
        itemsContainer.innerHTML += "\n            <div class=\"item ".concat(item.isCheck ? 'done' : '', "\">\n                <div class=\"name\">").concat(item.name, "</div>\n                <div class=\"item-controls\">\n                    <div data-index=\"").concat(index, "\" class=\"done\"><span class=\"material-icons\">\n                        done\n                        </span></div>\n                    <div data-index=\"").concat(index, "\" class=\"remove\"><span class=\"material-icons\">\n                        delete\n                        </span></div>\n                </div>\n            </div>\n        ");
    });
    var deleteBTNs = document.querySelectorAll('.remove');
    deleteBTNs.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var result = items.filter(function (item) { return items.indexOf(item) != parseInt(btn.dataset.index); });
            items = result;
            change();
        });
    });
    var checkBTNs = document.querySelectorAll('.done');
    checkBTNs.forEach(function (btn) {
        btn.addEventListener('click', function () {
            items[btn.dataset.index].isCheck = !items[btn.dataset.index].isCheck;
            change();
        });
    });
}
change();
function reset() {
    items = [];
    change();
}
resetBTN.addEventListener('click', reset);
function removeFinished() {
    var result = items.filter(function (item) { return item.isCheck == false; });
    items = result;
    change();
}
removeFinishedBTN.addEventListener('click', removeFinished);
