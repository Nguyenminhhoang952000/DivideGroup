import { result } from "./data.js"
import toat from "./toat.js"

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
const listItems = $$('.content__list-items')
const clearAll = $('.clear__all')
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
let totalLength = datas.length
listItem.innerHTML = renderData(datas)
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
        totalLength=datas.length
        listItem.innerHTML = renderData(datas)
        total.innerHTML = totalLength;
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
// ClearAll
clearAll.onclick = ()=>{
    datas =[]
    totalLength=datas.length
    listItem.innerHTML = renderData(datas)
    total.innerHTML = datas.length;
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
        totalLength=datas.length
        total.innerHTML = totalLength;
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
    total.innerHTML = totalLength;
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
// add male or female -> groupHolow
const addRandomGroup = (arr,arrGroup,indexRandom)=>{
    const maleRandom = Math.floor(Math.random() * (arr.length));
    arr.length&&arrGroup[indexRandom].push(arr[maleRandom])
    arr.splice(maleRandom,1)
}
const groupRandom = (arr,n,x)=>{
    totalQuanti.innerHTML = n
    let groupHolow = []
    for(let i=1;i<=n;i++){
        groupHolow.push([])
    }
    console.log(groupHolow)
    let arrayFemale = arr.filter(ar=>ar.gender === "FEMALE")
    let arrayMale = arr.filter(ar=>ar.gender === "MALE")
    console.log(totalLength%x===0)
    if(totalLength%x === 0){
        [...arrayFemale].forEach(()=>{
            let arrayRandom = groupHolow.length>=1&&Math.floor(Math.random() * (groupHolow.length));
            while(groupHolow.length>=1&&groupHolow[arrayRandom].length >= 1){
                arrayRandom = Math.floor(Math.random() * (groupHolow.length));
            }
            if(x>1){
                for(let j = 1 ; j<x;j++){
                    const isFemale = groupHolow[arrayRandom].filter(gr=>{
                        return gr?.gender ==='FEMALE'
                    })
                    addRandomGroup(arrayMale,groupHolow,arrayRandom)
                    if(isFemale.length===0){
                        addRandomGroup(arrayFemale,groupHolow,arrayRandom)
                    }
                }
            }
            else{
                const isFemale = groupHolow[arrayRandom].filter(gr=>{
                    return gr?.gender ==='FEMALE'
                })
                if(isFemale.length===0){
                    addRandomGroup(arrayFemale,groupHolow,arrayRandom)
                }
            }
        })
        }
    else{
        [...arrayFemale].forEach(()=>{
            let arrayRandom = groupHolow.length>=1&&Math.floor(Math.random() * (groupHolow.length));
            while(groupHolow.length>=1&&groupHolow[arrayRandom].length >= 1){
                arrayRandom = Math.floor(Math.random() * (groupHolow.length));
            }
            for(let j = 1 ; j<x;j++){
                const isFemale = groupHolow[arrayRandom].filter(gr=>{
                    return gr?.gender ==='FEMALE'
                })
                if(arrayRandom!==groupHolow.length-1){
                    addRandomGroup(arrayMale,groupHolow,arrayRandom)
                }
                if(isFemale.length===0){
                    addRandomGroup(arrayFemale,groupHolow,arrayRandom)
                }
            }
        })
        }
        groupHolow.filter((holow,index)=>holow.length===0||(holow.length===1&&index===groupHolow.length-1)).forEach(group=>{
            for(let j = 1 ; j<=x;j++){
                const maleRandom = Math.floor(Math.random() * (arrayMale.length));
                arrayMale.length&&group.push(arrayMale[maleRandom])
                arrayMale.splice(maleRandom,1)
            }
        })
    console.log(groupHolow)
    return groupHolow
}
totalQuantity.onclick =()=>{
    const ValueInput = Number(inputGroup.value)
    const n = Math.ceil(totalLength/ValueInput);
    const female = datas.reduce((total,value)=>{
        if(value.gender==="FEMALE"){
            total++
        }
        return total
    },0)
    if(!inputGroup.value||!Number(inputGroup.value)||female>n||datas.length<1){
        console.log("false")
        toat({
            title: 'Thất bại',
            message:'Mời bạn nhập trường này',
            type: 'error',
            duration: 500   
        })  
        contentGroup.style.visibility = 'visible'
        containerDivide.innerHTML = "Không có giá trị nào thỏa mãn"
    }
    else{
        toat({
            title: 'Thành công',
            message:'Chia nhóm thành công',
            type: 'success',
            duration: 200   
        })
        console.log(totalLength)
        contentGroup.style.visibility = 'hidden'        
        const dataGroup = inputGroup.value&&groupRandom(datas,n,Number(inputGroup.value))
        inputGroup.value=''
        console.log(dataGroup)
        containerDivide.innerHTML =dataGroup&&divideGroup(dataGroup)

    }
}
inputGroup.onblur=(e)=>{
    contentGroup.style.visibility = !e.target.value&&!Number(e.target.value) ? 'visible': 'hidden'
}
inputGroup.oninput=(e)=>{
    contentGroup.style.visibility = !e.target.value&&!Number(e.target.value) ? 'visible': 'hidden'  
}

