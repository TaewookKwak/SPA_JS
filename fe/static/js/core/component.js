// 컴포넌트를 받아서 컴포넌트 인스턴스를 생성하는 함수
function createComponent(component, props) {
  const componentInstance = component(props); // 예) App() 를 실행시키면 { element: "<div>...</div>" } 가 반환됨

  return componentInstance;
}

export default createComponent;
