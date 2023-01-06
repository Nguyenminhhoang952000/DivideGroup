// Toat logic xử lý thanh trượt thành công thất bại
export default function toat(option){
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