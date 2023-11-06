---
title: postfix, infix, prefix를 알아보고 postfix js로 구현하기
date: 2023-11-05 21:09:26
coverURL: https://images.unsplash.com/photo-1626427223333-183395267453?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

# postfix 연산이란?

postfix 연산은 후위 표기연산입니다.


익숙한 중위 표기법을 먼저 확인합니다.
```js
3 + 4 * 5 // 23
```

postfix(후위 표기법)을 확인합니다.

```js
3 4 5 * +
```

위 방식의 계산은 연산자와 피연산자인 숫자를
각각의 스택에 넣어둔다고 생각하면 됩니다.

아래와 같은 흐름을 따르게 됩니다.

```js
const n = [3, 4, 5];
const o = ['*', '+'];
const s = [];

const n1 = n.pop(); // 5
const n2 = n.pop(); // 4
const o1 = o.pop();

switch (o1) {
    case'*': 
        s.push(n1 * n2); // [20]
        break;
    case '+':
        s.push(n1 + n2);
}
```

## postfix를 만들기

`3 * 2 + 3`을 infix라고 부릅니다.
물론 infix, postfix 모두 존재합니다.

prefix는 clojure의 바로 그 것입니다.
`+ * 3 2 3` 이렇게 작성 할 수 있습니다.

postfix로 변환하면
`3 2 * 3 +` 이렇습니다.

이제 순서대로 괄호를 활용해서 이해 가능하게 변환하는 방법을 알아보겠습니다.


### prefix 변환해보기

1. `3 * 2 + 3`을 연산자와 피연산자의 관계로 치환해보겠습니다.
    - `(피연산자 연산자 피연산자 연산자 피연산자)`
    - prefix는 `(연산자, 피연산자, 피연산자)` 쌍으로 묶이며 한 연산을 이룹니다.
2. 연산자와 피연산자를 다시 값으로 치환합니다.
    - `(3 * 2) -> (* 3 2)` (* 3 2)는 다시 연산자가 되어집니다.
    - `(+ (* 3 2) 3)` 
3. 괄호를 제거해줍니다.
    - `+ * 3 2 3`

### postfix 변환해보기

1. `3 * 2 + 3`을 연산자와 피연산자의 관계로 치환해보겠습니다.
    - `(피연산자 연산자 피연산자 연산자 피연산자)`
    - prefix는 `(연산자, 피연산자, 피연산자)` 쌍으로 묶이며 한 연산을 이룹니다.
2. 연산자와 피연산자를 다시 값으로 치환합니다.
    - `(3 * 2) -> (* 3 2)` (* 3 2)는 다시 연산자가 되어집니다.
    - `(+ (* 3 2) 3)` 
3. 괄호를 제거해줍니다.
    - `+ * 3 2 3`


### 되돌리기
1. `+ * 3 2 3` 
2. `(+ (* 3 2) 3)`
3. `(+ (3 * 2) 3)`
4. `((3 * 2) +  3)`
5. `3 * 2 +  3`



## 구현해보기

구현은 input으로 "3 - 4 * 7"을 입력 받았을 때,
postfix 형식으로 "347*-"를 반환하는 함수,
이를 계산하는 -25로 계산하는 함수를 만들어 보겠습니다.

```js
class InfixToPostfix {
  #precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  constructor(expression) {
    this.expression = expression;
  }

  isOperator(token) {
    return "+-*/".indexOf(token) !== -1;
  }

  higherPrecedence(oper1, oper2) {
    return this.#precedence[oper1] > this.#precedence[oper2];
  }

  translatePostfix(expression) {
    if (!expression) expression = this.expression;
    const stack = [];
    const output = [];

    const tokens = expression.match(/\d+|[+\-*/]/g);

    tokens.forEach((token) => {
      if (this.isOperator(token)) {
        while (
          stack.length > 0 && // opertator의 스택에 아무것도 없다면 연산자 우선순위를 계산 할 필요가 없음
          this.higherPrecedence(stack[stack.length - 1], token)
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          this.output.push(stack.pop());
        }
        stack.pop();
      } else {
        output.push(token);
      }
    });

    while (stack.length > 0) {
      output.push(stack.pop());
    }

    return output.join(" ");
  }
  // ...
}
```

translatePostfix 함수는 expression을 받습니다.

정규식을 통해 숫자와 사칙연산을 나누어 스택에 저장합니다.

```js
// d = decimal, [+\-*/]
'3 + 4'.match(/\d+|[+\-*/]/g) // ['3', '+', '4']
```

나누어진 중위표현식을 하나의 char 형식으로 변환 및 배열에 담았으니
이를 순회하면서 연산식과 피연산자로 나누겠습니다.

연산식은 stack에 추가하고,
피연산자인 숫자는 output에 추가합니다.

괄호가 있는 경우는 else if로 따로 처리해줍니다.

```js
    tokens.forEach((token) => {
      if (this.isOperator(token)) {
        while (
          stack.length > 0 && // opertator의 스택에 아무것도 없다면 연산자 우선순위를 계산 할 필요가 없음
          this.higherPrecedence(stack[stack.length - 1], token)
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          this.output.push(stack.pop());
        }
        stack.pop();
      } else {
        output.push(token);
      }
    });

    while (stack.length > 0) {
      output.push(stack.pop());
    }

    return output.join(" ");
  }
```

아래의 분기는
현재 token이 operator이면서,
- stack이 0 보다 큰 경우: operator를 담아두는 stack 배열에 또 다른 연산자가 있으면서
- stack의 top과 연산자 우선순위를 비교해서 top이 더 우선순위가 높을 경우
피연산자 stack에 연산자 top을 pop해서 넣고, 우선순위가 더 낮은 연산자를 stack에 밀어넣는다.

예를 들어 347*-를 만들기 위해서는
3 - 4 * 7을 해독하는데
문자열 순서상 - 연산자가 먼저 stack에 들어가 있을 수 밖에 없습니다.

-와 *의 우선순위는 *가 더 높으므로,
higherPrecedence의 값이 false로 나오게 됩니다.

stack에는 [-, *]순으로 쌓이게 되는데 어차피 stack은 pop으로 값을
꺼내기 때문에 이는 올바른 순서가 됩니다.
```js
      if (this.isOperator(token)) {
        while (
          stack.length > 0 && // opertator의 스택에 아무것도 없다면 연산자 우선순위를 계산 할 필요가 없음
          this.higherPrecedence(stack[stack.length - 1], token)
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      }
```

반대의 경우를 생각해보겠습니다.
*연산자가 먼저 stack에 들어와있는 경우 - 연산자가 나중에 들어오려고 할 때,
pop으로 값을 꺼내는 stack에서 이는 곤란한 경우입니다.
(연산자의 순서가 바뀌므로)

따라서 피연산자의 스택인 output에 연산자 top을 pop하고 그 값을
피연산자 스택에 밀어넣습니다.

`3 * 4 - 7`을 예로 들면

```
[*] <-- [-] // *을 pop하고 stack에 push
[3, 4]
```


```
[-] 
[3, 4, *]
```
위와 같은 형태가 됩니다.


연산 순서를 변경했으므로 연산하는 함수를 작성하면 끝입니다.
`evaluatePostfix` 메소드가 바로 그 함수입니다.

```js
class InfixToPostfix {
  #precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  constructor(expression) {
    this.expression = expression;
  }

  isOperator(token) {
    return "+-*/".indexOf(token) !== -1;
  }

  higherPrecedence(oper1, oper2) {
    return this.#precedence[oper1] > this.#precedence[oper2];
  }

  translatePostfix(expression) {
    // ...
  }

  evaluatePostfix(postfix) {
    const stack = [];
    const tokens = postfix.split(" ");
    const cases = {
      "+": (oper1, oper2) => stack.push(oper1 + oper2),
      "-": (oper1, oper2) => stack.push(oper1 - oper2),
      "*": (oper1, oper2) => stack.push(oper1 * oper2),
      "/": (oper1, oper2) => stack.push(oper1 / oper2),
    };

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
      } else if (this.isOperator(token)) {
        const oper2 = stack.pop();
        const oper1 = stack.pop();
        cases[token](oper1, oper2);
      }
    });

    return stack[0];
  }
}
```

인자인 postfix는 `3 2 +`처럼 space를 구분자로 들어온 문자열이기 때문에
split으로 나눠주면 다시 char 배열이 됩니다. `['2', '3', '+']`

나눠진 token들을 순회하며 숫자인 경우 피연산자, 아닌 경우 연산자이므로
연산자들을 stack에 쌓아줍니다.

postfix 스택을 인덱스 0부터 꺼내오므로 피연산자, 피연산자, 연산자 순으로 꺼내게 되는데
연산자를 꺼냈을 때, stack을 pop하면서 계산하고 다시 stack에 밀어 넣어줍니다.

연산이 모두 끝나고 남은 값은 마지막 계산 값이 되므로 stack[0]을 꺼내주면 끝입니다.

