// createElement: 이 함수는 JSX를 js 객체로 변환합니다. 요소의 타입, 속성, 자식들을 받아서 객체로 생성합니다.
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

// createTextElement: 이 함수는 텍스트 노드를 생성합니다. 텍스트를 포함하는 객체를 반환합니다.
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// createDom : 이 함수는 주어진 node 객체에 따라 실제 DOM 요소를 생성합니다. 텍스트 요소인지 확인하고
// 그에 맞는 DOM 요소를 생성합니다. 이후 updateDom 함수를 호출하여 DOM 요소를 업데이트합니다.
function createDom(node) {
  const dom =
    node.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(node.type);

  updateDom(dom, {}, node.props);

  return dom;
}

const isEvent = (key) => key.startsWith("on"); // 이벤트 리스너인지 확인
const isProperty = (key) => key !== "children" && !isEvent(key); // 속성인지 확인
const isNew = (prev, next) => (key) => prev[key] !== next[key]; // 새로운 속성인지 확인
const isGone = (prev, next) => (key) => !(key in next); // 이전 속성이 존재하지 않는지 확인

// updateDom: 이 함수는 이전 속성과 새로운 속성을 비교하여 DOM을 업데이트합니다
// 이벤트 리스너를 제거하고, 이전 속성을 제거하고, 새로운 속성을 추가합니다.
function updateDom(dom, prevProps, nextProps) {
  console.log({
    dom,
    prevProps,
    nextProps,
  });
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

// commitRoot: 작업을 완료하고, 변경 사항을 DOM에 반영합니다. 삭제할 요소가 있으면 처리하고 자식 요소들을 커밋합니다
// deletions : 삭제할 요소들을 저장하는 배열
// rootNode : 현재 루트 요소
// workInProgressRoot : 작업 중인 루트 요소
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(workInProgressRoot.child);
  rootNode = workInProgressRoot;
  workInProgressRoot = null;
}

// commitWork : 주어진 node를 처리하여 실제 DOM을 업데이트합니다. 자식,형제요소를 순회하며 작업을 수행합니다.
function commitWork(node) {
  // node가 없으면 종료
  if (!node) {
    return;
  }

  let domParentNode = node.parent; // 부모 node를 찾음

  while (!domParentNode.dom) {
    // 부모 node의 DOM이 없으면 부모 node를 찾음
    domParentNode = domParentNode.parent;
  }

  const domParent = domParentNode.dom; // 부모 node의 DOM을 찾음

  if (node.effectTag === "PLACEMENT" && node.dom != null) {
    // node의 effectTag가 PLACEMENT이고 DOM이 존재하면 DOM을 추가
    domParent.appendChild(node.dom);
  } else if (node.effectTag === "UPDATE" && node.dom != null) {
    // node의 effectTag가 UPDATE이고 DOM이 존재하면 DOM을 업데이트
    updateDom(node.dom, node.alternate.props, node.props);
  } else if (node.effectTag === "DELETION") {
    // node의 effectTag가 DELETION이면 DOM을 삭제
    commitDeletion(node, domParent);
  }

  commitWork(node.child); // 자식 node를 처리
  commitWork(node.sibling); // 형제 node를 처리
}

// commitDeletion : 주어진 node를 삭제하고, 자식 node를 삭제합니다.
function commitDeletion(node, domParent) {
  if (node.dom) {
    domParent.removeChild(node.dom);
  } else {
    commitDeletion(node.child, domParent);
  }
}

// render : 주어진 요소를 렌더링할 준비를 합니다. 새로운 workInProgressRoot를 생성하고, 삭제할 요소를 초기화합니다.
function render(element, container) {
  workInProgressRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: rootNode,
  };
  deletions = [];
  nextTask = workInProgressRoot;
}

let nextTask = null; // 다음 작업 단위
let rootNode = null; // 현재 루트 요소
let workInProgressRoot = null; // 작업 중인 루트 요소
let deletions = null; // 삭제할 요소

// workLoop : 브라우저의 여유 시간에 맞춰 작업을 수행합니다. 할 일이 남아있으면 performUnitOfWork를 호출하여 다음 작업을 진행합니다.
function workLoop(deadline) {
  let shouldYield = false; // 현재 작업을 계속할지, 중단할지를 결정하는 플래그입니다.
  while (nextTask && !shouldYield) {
    // 다음 작업 단위가 있고, 브라우저의 여유 시간이 있으면 작업을 수행
    nextTask = performUnitOfWork(nextTask);
    // 브라우저의 여유 시간이 없으면 다음 루프에서 작업을 중단
    shouldYield = deadline.timeRemaining() < 1; // 제어시간이 1ms보다 작으면 true
  }

  if (!nextTask && workInProgressRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

// requestIdleCallback : 자바스크립트 내장 함수로, 브라우저의 여유 시간에 작업을 수행합니다.
requestIdleCallback(workLoop);

function performUnitOfWork(node) {
  const isFunctionComponent = node.type instanceof Function;
  if (isFunctionComponent) {
    //현재 처리 중인 node의 타입이 함수형 컴포넌트인지 확인합니다. 함수형 컴포넌트인 경우 updateFunctionComponent 함수를 호출하여 해당 컴포넌트를 업데이트합니다.
    updateFunctionComponent(node);
  } else {
    //그렇지 않으면 updateHostComponent를 호출하여 일반 DOM 요소를 업데이트합니다
    updateHostComponent(node);
  }
  if (node.child) {
    //현재 node에 자식 노드가 있다면, 그 자식을 다음 작업 단위로 설정하여 반환합니다. 이는 트리 구조를 깊이 우선 탐색하는 방식입니다.
    return node.child;
  }
  let nextNode = node;
  while (nextNode) {
    if (nextNode.sibling) {
      return nextNode.sibling; // 형제가 있으면 다음 형제로 이동
    }
    nextNode = nextNode.parent; // 형제가 없으면 부모로 이동
  }
}

let currentNode = null;
let currentHookIndex = null;

function updateFunctionComponent(node) {
  currentNode = node; // currentNode 변수를 현재 업데이트 중인 node로 설정합니다. 이 변수는 후속 작업에서 현재 node의 상태와 관련된 정보를 유지하는 데 사용됩니다.

  currentHookIndex = 0; // currentHookIndex를 0으로 초기화합니다. 이 인덱스는 현재 컴포넌트에서 훅을 추적하는 데 사용됩니다. 각 훅은 이 인덱스를 사용하여 고유하게 식별됩니다
  currentNode.hooks = []; // 현재 node의 훅 배열을 초기화합니다. 함수형 컴포넌트가 렌더링될 때마다 새로운 훅 배열이 생성되며, 이를 통해 상태와 효과를 관리합니다
  const children = [node.type(node.props)]; // 컴포넌트의 타입(함수)을 호출하여 자식 요소를 생성합니다. node.type은 컴포넌트 함수이고, node.props는 해당 컴포넌트에 전달된 속성입니다.

  reconcileChildren(node, children); //생성된 자식 요소를 기존의 자식과 비교하고 조정하기 위해 reconcileChildren 함수를 호출합니다. 이 함수는 새로운 요소와 이전 요소를 비교하여 필요한 업데이트를 수행합니다
}

function useState(initial) {
  const oldHook =
    currentNode.alternate &&
    currentNode.alternate.hooks &&
    currentNode.alternate.hooks[currentHookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    workInProgressRoot = {
      dom: rootNode.dom,
      props: rootNode.props,
      alternate: rootNode,
    };
    nextTask = workInProgressRoot;
    deletions = [];
  };

  currentNode.hooks.push(hook);
  currentHookIndex++;
  return [hook.state, setState];
}

function updateHostComponent(node) {
  if (!node.dom) {
    node.dom = createDom(node);
  }
  reconcileChildren(node, node.props.children);
}

function reconcileChildren(currentNode, elements) {
  let index = 0; // index는 현재 처리 중인 요소의 인덱스를 추적합니다
  let oldNode = currentNode.alternate && currentNode.alternate.child; // oldNode는 이전 렌더링에서의 자식 node를 가져옵니다. currentNode.alternate가 존재하는 경우에만 이전 node를 참조합니다.
  let prevSibling = null; //prevSibling은 새로 생성되는 node의 형제를 추적합니다

  //새로운 요소 배열(elements)의 길이보다 작거나 이전 node가 남아 있는 동안 반복합니다. 즉, 새로운 요소가 남아 있거나 이전 요소가 남아 있으면 계속 진행합니다.
  while (index < elements.length || oldNode != null) {
    const element = elements[index]; // 현재 인덱스에 해당하는 새로운 요소를 가져옵니다
    let newNode = null; // newNode는 새로 생성될 node를 저장할 변수입니다

    const sameType = oldNode && element && element.type == oldNode.type; // 현재 요소와 이전 node가 모두 존재하는 경우, 두 요소의 유형이 같은지 확인합니다.

    if (sameType) {
      newNode = {
        type: oldNode.type,
        props: element.props,
        dom: oldNode.dom,
        parent: currentNode,
        alternate: oldNode,
        effectTag: "UPDATE",
      };
      //두 요소의 유형이 같으면 기존의 oldNode 정보로 새로운 node를 생성하고 effectTag를 "UPDATE"로 설정합니다.
    }
    if (element && !sameType) {
      newNode = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: currentNode,
        alternate: null,
        effectTag: "PLACEMENT",
      };
      //유형이 다르고 새로운 요소가 존재하는 경우, 새로운 node를 생성하고 effectTag를 "PLACEMENT"로 설정합니다
    }
    if (oldNode && !sameType) {
      oldNode.effectTag = "DELETION";
      deletions.push(oldNode);
      //이전 요소가 존재하고 유형이 다르면, 이전 node의 effectTag를 "DELETION"으로 설정하고 deletions 배열에 추가합니다
    }

    if (oldNode) {
      oldNode = oldNode.sibling;
      //현재 oldNode가 존재하면 다음 형제로 이동합니다
    }

    if (index === 0) {
      currentNode.child = newNode;
    } else if (element) {
      prevSibling.sibling = newNode;
    }
    // 인덱스가 0인 경우, 현재 currentNode의 자식으로 새로 생성한 newNode를 설정합니다.
    // 그 외의 경우, 이전 형제(prevSibling)의 형제로 새 newNode를 연결합니다.

    prevSibling = newNode; // 현재 newNode를 prevSibling으로 설정하고, 인덱스를 증가시킵니다
    index++;
  }
}

const Didact = {
  createElement,
  render,
  useState,
};

/** @jsx Didact.createElement */
function Counter() {
  const [state, setState] = Didact.useState(1);
  return (
    <h1 onClick={() => setState((c) => c + 1)} style="user-select: none">
      Count: {state}
    </h1>
  );
}
const element = <Counter />;
const container = document.getElementById("app");
Didact.render(element, container);

// // 페이지 이동
// function navigateTo(url) {
//   window.history.pushState(null, null, url);
//   render();
// }

// // 뒤로가기, 앞으로가기
// window.addEventListener("popstate", render);

// // 페이지 로드
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM 로드 완료");
//   document.body.addEventListener("click", (e) => {
//     if (e.target.matches("[data-link]")) {
//       e.preventDefault();
//       navigateTo(e.target.href);
//     }
//   }); // 페이지 이동

//   Didact.render(element, container);
// });
