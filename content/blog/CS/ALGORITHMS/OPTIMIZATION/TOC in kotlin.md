---
title: TOC in kotlin
date: 2023-04-21 15:17:42
---

```kt
fun main(args: Array<String>) {
    println(fac(5))
    println(fac2(5))
}

tailrec fun fac(num: Int, output: Int = 1): Int{
    return if(num == 0) output;
    else fac(num - 1, output * num);
}

fun fac2(num: Int, output: Int = 1): Int {
    var _num = num;
    var _output = output;

    while(_num != 0) {
        _output *= _num;
        _num -= 1;
    }
    return _output
}
```