//step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [ ] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [ ] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
// - [ ] 추가되는 메뉴의 마크업은 `<ul id="espreeso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [ ] 총 메뉴 갯수를 count 하여 상단에 보여준다.
// - [ ] 메뉴가 추가되고 나면, input 은 빈 값으로 초기화한다.
// - [ ] 사용자 입력 값이 빈 값이라면 추가되지 않는다.

//$ 를 이용하여 querySelector에 들어오는 id값을 받아서  "=> document.querySelector(selector)" 값을 리턴
const $ = (selector) => document.querySelector(selector);

$("#espresso-menu-submit-button").addEventListener("click", () => {

});

function App(){
    // - [ ] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다.
    // - [ ] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if(e.target.classList.contains("menu-edit-button")){
            const $menuName = e.target.closest("li").querySelector(".menu-name");//return li>span에 있는 menu-name 가져오기  //closest("li") : li 가져오는 기능
            const updatedMenuName= prompt(
                "메뉴명을 수정하세요",
                $menuName.innerText
            );
            $menuName.innerText = updatedMenuName; 
        }

        if(e.target.classList.contains("menu-remove-button")){
            if(confirm("정말 삭제하시겠습니까?")){//confirm : 확인버튼 누르면 true를 return, 취소버튼 부르면 false를 return
              e.target.closest("li").remove();
            }
             
        }
    });


    $("#espresso-menu-form") //form 태그가 자동으로 전송되는 것을 막아준다.
        .addEventListener("submit", (e) => {
            e.preventDefault();
        })
    const AddMenuName = () => {
        if($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.");
            return;  //리턴을 해야 밑에 코드들이 실행되지 않음!
        }
                const espressoMenuName = $("#espresso-menu-name").value;
                const menuItemTemplate = (espressoMenuName) => {
                    return `
                    <li class="menu-list-item d-flex items-center py-2">
                        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
                 };

                //  <!-- beforebegin --> 
                // <p>
                // <!-- afterbegin -->
                // foo
                // <!-- beforeend -->
                // </p>
                // <!-- afterend -->

                 //innerAdjacentHTML : 태그 시작전, 시작 직후, 태그 끝나기 직전, 태그 끝난 이후
            $("#espresso-menu-list").insertAdjacentHTML(
                'beforeend', menuItemTemplate(espressoMenuName)
            );
            
            
            // 메뉴 카운트   
            const menuCount = $("#espresso-menu-list").querySelectorAll("li").length; // const 변수(menuCount) = li 개수를 카운팅하기 // querySelectorAll : li 태그에 있는 모든 것 가져오기
            $(".menu-count").innerText = `총 ${menuCount} 개`; //innerText : 문자값 바꾸기
            
            //input 박스 빈값으로 초기화 하기 -> 스크립트가 순서대로 읽기 때문!
            $("#espresso-menu-name").value = '';
            
    };

    $("#espresso-menu-submit-button").addEventListener("click", () => {
        AddMenuName();
    });  
    //메뉴의 이름을 입력 받기    
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        //input 박스가 빈값일 경우, 빈값이 추가 되지 않도록 Enter 예외 처리
        if(e.key !== "Enter"){  //Enter키가 아닐 땐 무조건 종료됨
            return;
        }
        AddMenuName();
    });
}
App();