import { result } from "./data.js"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const fullName = $('.content__fullname-input')
const genders = $$('.content__gender-radiobtn input')
const addItem = $('.content__btn.add')
const saveItem = $('.content__btn.save')
const listItem = $('.content__container')
const editItem = $('.content__container')
const contentNote = $('.content__note');
const noteGender = $('.content__note-gender');
const total = $('.total span');
const containerDivide = $('.content__container.divide')
const totalQuantity = $('.total__quantity')
const contentGroup = $('.content__group')
const inputGroup = $('.content__fullname-input--group')
const totalQuanti = $('.totalquanti span')
const listItems = $$('.content__list-items:last-child')
let datas = result
totalQuanti.innerHTML = 0
const renderData = (datas) => {
    const render = datas.map((value)=>{
        return `<div class="content__list-item">
        <div class="content__list-info">
            <img src="./assets/img/noimg.png" alt="" class="content__list-img">
        <div class="content__list-information">
            <h3 class="content__list--name">
                ${value.name}
            </h3>
            <p class="content__list--gender">
                ${value.gender}
            </p>
        </div>
        </div>
        <div class="content__list-action">
            <span class="content__list-btn edit" data-edit='${value.id}'>
                <i class="fas fa-edit"></i>
            </span>
            <span class="content__list-btn delete" data-delete='${value.id}'>
                <i class="fas fa-trash-alt"></i>
            </span>
        </div>
    </div>`
    }).join('')
    return render;
}

// Render
listItem.innerHTML = renderData(datas)
let totalLength = datas.length
total.innerHTML = totalLength


fullName.onblur=(e)=>{
    const valueInput = e.target.value.trim()
    contentNote.style.visibility = !valueInput?'visible': 'hidden'
    if(valueInput){
        const lenghtName = datas.filter(data=>{
            return data.name.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
        })
        console.log(lenghtName)
        const ln = Math.max(...lenghtName.map(nn=>{
            let test = nn.name.split(' ')
            const maxLength = Number(test[test.length-1])?test[test.length-1]:1
            return maxLength
        }))
        console.log(ln)
        e.target.value = lenghtName.length?`${e.target.value} ${ln+1}`:`${e.target.value}`
    }
}
fullName.oninput=(e)=>{
    const valueInput = e.target.value.trim()
    contentNote.style.visibility = !valueInput?'visible': 'hidden'
}
Array.from(genders).forEach(gender=>{
    gender.onclick =()=>{
        noteGender.style.visibility = 'hidden'
    }
})
let maxId = 0
addItem.onclick = ()=>{
    if(datas.length>0 ){
        maxId = Math.max(...datas.map(user => {
            return user.id;
        }))
    }
    else{
        maxId =0
    }
    contentNote.style.visibility = !fullName.value?'visible': 'hidden'
    let count = 0;
    let valuegender=''
    Array.from(genders).forEach(gender=>{
        if(gender.checked){
            count++
            valuegender = gender.value
        }   
    })
    noteGender.style.visibility = count===0?'visible': 'hidden'
    if( fullName.value&&count!==0){
        const data ={
            id:maxId+1,
            name:fullName.value,
            gender:valuegender
        }
        datas.push(data)
        listItem.innerHTML = renderData(datas)
        total.innerHTML = datas.length;
        fullName.value=''
        Array.from(genders).forEach(gender=>{
            gender.checked = false  
        })
        console.log(datas)
        toat({
            title: 'Thành công',
            message:'Thêm thành công',
            type: 'success',
            duration: 200   
        })
    }else{
        toat({
            title: 'Thất bại',
            message:'Thêm thất bại, mời bạn thêm lại',
            type: 'error',
            duration: 500   
        })
    } 
}
// Action
editItem.onclick=(e)=>{
    // Click edit
    if(e.target.closest('.content__list-btn.edit i')){
        const numberEdit = Number(e.target.parentElement.dataset.edit)
        datas.forEach(data=>{
            if(data.id === numberEdit){
                fullName.value = data.name
                Array.from(genders).forEach(gender=>{
                    if(gender.value===data.gender)
                    gender.checked=true
                })
                $('.count').innerHTML = data.id
            }
        })
        addItem.style.display='none'
        saveItem.style.display='block'
    }

    // Click delete
    if(e.target.closest('.content__list-btn.delete i')){
        const numberDelete = Number(e.target.parentElement.dataset.delete)
        console.log(numberDelete)
        datas = [...datas.filter(data=>{
            return data.id!==numberDelete
        })]
        listItem.innerHTML = renderData(datas)
        total.innerHTML = datas.length;
        toat({
            title: 'Thành công',
            message:'Xóa thành công',
            type: 'success',
            duration: 200   
        })
        console.log(datas)
    }
}
saveItem.onclick = ()=>{
    const currentItem = Number($('.count').innerHTML)
    datas.forEach(data=>{
        if(data.id === currentItem){
            data.name = fullName.value
            Array.from(genders).forEach(gende=>{
                if(gende.checked)
                data.gender = gende.value
            })
            toat({
                title: 'Thành công',
                message:'Lưu thành công',
                type: 'success',
                duration: 200   
            })
        }
    })
    addItem.style.display='block'
    saveItem.style.display='none'
    listItem.innerHTML = renderData(datas)
    total.innerHTML = datas.length;
        fullName.value=''
        Array.from(genders).forEach(gender=>{
            gender.checked = false  
        })
}

// Chia nhóm

// Render chia nhóm từ mảng đã random
const divideGroup = (arr)=>{
    let groups=[]
    Array.from(arr).forEach((ar,index)=>{
        let group =[]
        group.push(`
        <div class="content__list-title">Nhóm <span>${index+1}</span></div>
        `)
        ar.forEach(value=>{
            group.push(`
            <div class="content__list-item-group">
            <div class="content__list-info-group">
                <img src="./assets/img/noimg.png" alt="" class="content__list-img">
            <div class="content__list-information-group">
                <h3 class="content__list--name-group">
                    ${value?.name}
                </h3>
                <p class="content__list--gender-group">
                    ${value?.gender}
                </p>
            </div>
            </div>
            <div class="content__list-action-group">
                <span class="content__list-btn-group">
                    <i class="fas fa-edit"></i>
                </span>
                <span class="content__list-btn">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </div>
        </div>
            `)
        })
        groups.push(`<div class="content__list-items">${group.join('')}</div>`)
    })
    return groups.join('')
}
// Random chia nhóm

const groupRandom = (arr,x)=>{
    totalLength=arr.length
    const n = Math.ceil(totalLength/x);
    const female = arr.reduce((total,value)=>{
        if(value.gender==="Nữ"){
            total++
        }
        return total
    },0)
    if(female<=n){
        let data = [...arr]
        let result=[]
        totalQuanti.innerHTML = Math.ceil(arr.length/inputGroup.value)
        for(let i=1;i<=n;i++){
            let group=[];
            for(let j=1;j<=x;j++){
                if(data.length>=1){
                    let numberRandom = Math.floor(Math.random() * (data.length));
                    // filter female in array
                    const isFemale = group.filter(gr=>{
                        return gr?.gender ==='Nữ'
                    })
                    if(isFemale.length ===1&&data.length>1){
                        while(data[numberRandom]?.gender!=='Nam'){
                            numberRandom = Math.floor(Math.random() * (data.length));
                        }
                    }
                    group.push(data[numberRandom])
                    data.splice(numberRandom,1)
                }              
                }
                const isFemaleGroup = group.filter(gr=>{
                    return gr?.gender ==='Nữ'
                })
                if(isFemaleGroup.length>=2){
                    
                    toat({
                        title: 'Thất bại',
                        message:'Phân chia không hợp lệ, mời chia lại',
                        type: 'error',
                        duration: 500   
                    })
                }
            result.push(group)
        }
        console.log(result)
        return result
    }
    else{
        totalQuanti.innerHTML = 0
        containerDivide.innerHTML ='Không thỏa mãn'
        toat({
            title: 'Thất bại',
            message:'Phân chia không hợp lệ, mời chia lại',
            type: 'error',
            duration: 500   
        })
    }
}
totalQuantity.onclick =()=>{
    if(!inputGroup.value&&!Number(inputGroup.value)){
        toat({
            title: 'Thất bại',
            message:'Mời bạn nhập trường này',
            type: 'error',
            duration: 500   
        })  
        contentGroup.style.visibility = 'visible'
    }
    else{
        toat({
            title: 'Thành công',
            message:'Chia nhóm thành công',
            type: 'success',
            duration: 200   
        })
        contentGroup.style.visibility = 'hidden'        
        const dataGroup = inputGroup.value&&groupRandom(datas,Number(inputGroup.value))
        inputGroup.value=''
        containerDivide.innerHTML =dataGroup&&divideGroup(dataGroup)
        console.log(dataGroup)
    }
}
inputGroup.onblur=(e)=>{
    contentGroup.style.visibility = !e.target.value&&!Number(e.target.value) ? 'visible': 'hidden'
}
inputGroup.oninput=(e)=>{
    contentGroup.style.visibility = !e.target.value&&!Number(e.target.value) ? 'visible': 'hidden'  
}
// Group
// Toat logic xử lý thanh trượt thành công thất bại
function toat(option){
    const EToast= document.querySelector('#toast')
    if(EToast){
            let CreatDiv = document.createElement('div')
            CreatDiv.classList.add('toast',`toast--${option.type}`)
            const icons={
                    success: "fas fa-check-circle",
                    info: "fas fa-info-circle",
                    warning: "fas fa-exclamation-circle",
                    error: "fas fa-exclamation-circle"
            } 
            CreatDiv.style.animation='slideInLeft linear 0.4s'
            let check = icons[option.type]
            let ListToast = `<div class="toast__icon">
                                    <i class="${check}"></i>
                            </div>
                            <div class="toast__body">
                                    <h3 class="toast__title">${option.title}</h3>
                                    <p class="toast__msg">${option.message}</p>
                            </div>
                            <div class="toast__close">
                                    <i class="fas fa-times"></i>
                            </div>`
            CreatDiv.innerHTML = ListToast
            EToast.appendChild(CreatDiv)
            const call=setTimeout(() => {
                    EToast.removeChild(CreatDiv);
                    }, option.duration+1000);
            CreatDiv.onclick = function(clickToast){
                    if(clickToast.target.closest('.toast__close')){
                            setTimeout(function(){
                                    EToast.removeChild(CreatDiv)
                                    clearTimeout(call)
                            }, option.duration);

                    }
            }
    }
}