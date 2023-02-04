interface item {
    name : string,
    isCheck: boolean
}

let items:[item] = JSON.parse(localStorage.getItem('items')) || []

console.log(items)

let input = document.querySelector<HTMLInputElement>('.input input')
let addElement = document.querySelector<HTMLDivElement>('.add')
let resetBTN = document.querySelector<HTMLDivElement>('.reset')
let removeFinishedBTN = document.querySelector<HTMLDivElement>('.remove-finished')

function add(){
    if(input.value == null || input.value.trim() === '') return
    items.push(
        {
            name: input.value.trim(),
            isCheck: false
        }
    )
}
addElement.addEventListener('click',()=>{
    add()
    input.value = ''
    change()
})

input.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        add()
        input.value = ''
        change()
    }
})

let itemsContainer = document.querySelector<HTMLDivElement>('.items')
function change(){
    localStorage.setItem('items',JSON.stringify(items))
    itemsContainer.innerHTML = ''
    items.forEach((item,index)=>{
        itemsContainer.innerHTML += `
            <div class="item ${item.isCheck ? 'done':''}">
                <div class="name">${item.name}</div>
                <div class="item-controls">
                    <div data-index="${index}" class="done"><span class="material-icons">
                        done
                        </span></div>
                    <div data-index="${index}" class="remove"><span class="material-icons">
                        delete
                        </span></div>
                </div>
            </div>
        `
    })
    let deleteBTNs = document.querySelectorAll('.remove')

    deleteBTNs.forEach((btn)=>{
        btn.addEventListener('click',()=>{

            let result = items.filter((item)=>items.indexOf(item) != parseInt(btn.dataset.index))
            items = result
            change()
        })
    })

    let checkBTNs = document.querySelectorAll('.done')
    checkBTNs.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            items[btn.dataset.index].isCheck = !items[btn.dataset.index].isCheck
            change()
        })
    })
}
change()

function reset(){
    items = []
    change()
}
resetBTN.addEventListener('click',reset)



function removeFinished(){
    let result = items.filter(item=> item.isCheck == false)
    items = result
    change()
}

removeFinishedBTN.addEventListener('click',removeFinished)