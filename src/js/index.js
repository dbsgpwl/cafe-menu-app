
//$ 를 이용하여 querySelector에 들어오는 id값을 받아서  "=> document.querySelector(selector)" 값을 리턴
const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu){
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage(){
        localStorage.getItem("menu");
    },

}

function App(){
    // 상태(변할수 있는 데이터), 이 앱에서 변하는 것 : 메뉴명
    //-> 데이터는 꼭 관리해야하는 것만 최소한으로 관리해야함. 그렇지 않으면 복잡한 코드가 됨!
    // 메뉴명은 배열을 통해 저장, 갯수는 배열의 길이를 구하면 손쉽게 구할 수 있음
    this.menu = [];

    const updateMenuCount = () => {
        // 메뉴 카운트   
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length; // const 변수(menuCount) = li 개수를 카운팅하기 // querySelectorAll : li 태그에 있는 모든 것 가져오기
        $(".menu-count").innerText = `총 ${menuCount} 개`; //innerText : 문자값 바꾸기

    };

    const addMenuName = () => {
        if($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.");
            return;  //리턴을 해야 밑에 코드들이 실행되지 않음!
        }
                const espressoMenuName = $("#espresso-menu-name").value;
                this.menu.push({ name : espressoMenuName}); //push 할 때는 메뉴가 하나씩 추가됨
                store.setLocalStorage(this.menu)
                const template = this.menu
                .map((item) => {  //메뉴 아이템별로 화면 마크업 생성을 위해 map 매서드 사용 //item은 파라미터 명!
                    //각각의 메뉴별 li태그가 있어야 하므로 menu를 순회하며 li 태그 먼저 만들어주고, join 매서드로 만든 li 태그를 하나로 합치기 
                    return `
                    <li class="menu-list-item d-flex items-center py-2">
                        <span class="w-100 pl-2 menu-name">${item.name}</span>
                        <button                             
                            type="button"
                            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                        >
                        수정
                        </button>
                        <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-remove-button"
                        >
                        삭제
                        </button>
                    </li>`;
                })
                .join("");      //join 매서드 문자열을 하나로 합쳐줌! -> 배열형태로 있던 li태그가 하나의 마크업이 될 수 있음.
                                // ["<li>~</li>", "<li>~</li>", ...]; --> <li>~</li><li>~</li><li>~</li>

                //  <!-- beforebegin --> 
                // <p>
                // <!-- afterbegin -->
                // foo
                // <!-- beforeend -->
                // </p>
                // <!-- afterend -->

            // 메뉴 추가시, 위에서 아래로 순서대로 추가 표시
            // $("#espresso-menu-list").insertAdjacentHTML(    //innerAdjacentHTML : 태그 시작전, 시작 직후, 태그 끝나기 직전, 태그 끝난 이후
            //     'beforeend', menuItemTemplate(espressoMenuName)
            // );

            $("#espresso-menu-list").innerHTML = template;
            
            
            updateMenuCount();

            //input 박스 빈값으로 초기화 하기 -> 스크립트가 순서대로 읽기 때문!
            $("#espresso-menu-name").value = '';
            
    };

    const updateMenuName = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");//return li>span에 있는 menu-name 가져오기  //closest("li") : li 가져오는 기능
        const updatedMenuName= prompt(
                "메뉴명을 수정하세요",
                $menuName.innerText
            );
            $menuName.innerText = updatedMenuName;
    }

    const removeMenuName = (e) => {
        if(confirm("정말 삭제하시겠습니까?")){//confirm : 확인버튼 누르면 true를 return, 취소버튼 부르면 false를 return
            e.target.closest("li").remove();
            updateMenuCount(); //메뉴 카운트 update
          }
    }

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if(e.target.classList.contains("menu-edit-button")){
            updateMenuName(e);
        }

        if(e.target.classList.contains("menu-remove-button")){
            removeMenuName(e);
             
        }
    });


    $("#espresso-menu-form") //form 태그가 자동으로 전송되는 것을 막아준다.
        .addEventListener("submit", (e) => {
            e.preventDefault();
        })
    

    $("#espresso-menu-submit-button").addEventListener("click",  addMenuName);
    
    //메뉴의 이름을 입력 받기    
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        //input 박스가 빈값일 경우, 빈값이 추가 되지 않도록 Enter 예외 처리
        if(e.key !== "Enter"){  //Enter키가 아닐 땐 무조건 종료됨
            return;
        }
        addMenuName();
    });
}
App();